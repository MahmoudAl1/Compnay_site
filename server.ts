import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';

const SYSTEM_INSTRUCTION = `
أنت المساعد الذكي والخبير التقني لشركة "السرجاني للبطاريات" (El Sergany Batteries).
مهمتك هي مساعدة العملاء في اختيار البطارية المناسبة لسياراتهم أو دراجاتهم النارية من *قائمة منتجاتنا المتاحة فقط*.

🛑 **قواعد صارمة جداً (Inventory Rules):**
1. **لا ترشح أبداً** أي علامة تجارية أو منتج لا نبيعه.
2. إذا طلب العميل بطارية غير موجودة لدينا، اعتذر بلطف واقترح "البديل المتاح لدينا" من القائمة أدناه.

📋 **قائمة منتجاتنا المتاحة (المخزون):**

**🇪🇬 بطاريات محلية (Local Batteries):**
1. **فولستارك (Fullstark):** جودة عالية، مناسبة للأجواء المصرية، متوفرة بقدرات مختلفة (70/80 أمبير).
2. **جرمن (German):** اعتمادية واقتصادية، الأكثر مبيعاً.
3. **سي دي ماكس (ACD Max):** قوة تحمل شاقة، مناسبة للسيارات التي تعمل لفترات طويلة.
4. **فولدا (Fulda):** أداء مستقر.
5. **أوتولايت (Autolite):** تكنولوجيا حديثة.
6. **تايجر (Tiger):** قوة وكفاءة عالية.

**🌍 بطاريات مستوردة (Imported Batteries) - (تشمل سيارات وموتوسيكلات):**
1. **توب لايت (TopLite):** (موتوسيكل وسيارات) تكنولوجيا أوروبية، الأفضل للموتوسيكلات الصيني والدايون، وكذلك السيارات.
2. **فارتا (Varta):** (سيارة) ألماني، الخيار الأول للسيارات الأوروبية.
3. **بوش (Bosch):** (سيارة) ألماني، تكنولوجيا أوروبية.
4. **فولترونك (Voltronic):** (سيارة) استقرار عالي.

**🏷️ العلامات التجارية (Brands) التي نوكيلها فقط:**
Bosch, Varta, TopLite, Fullstark, German, ACD Max, Fulda, Autolite, Tiger, Voltronic.

**🏢 معلومات الشركة والخدمات:**
- **تاريخنا:** تأسست الشركة عام 1951 (خبرة أكثر من 70 عاماً).
- **المقر الرئيسي:** الدقهلية، المنزلة، شارع عبد المنعم رياض.
- **الفرع الثاني:** دمياط الجديدة.
- **الهاتف:** 01204002646
- **الخدمات المجانية:** كشف مجاني على الدينامو والبطارية.
- **خدمات أخرى:** تركيب فوري، خدمة توصيل (ديليفري) وإنقاذ، استبدال البطارية القديمة بالجديدة.
- **الضمان:** متاح (يختلف حسب النوع والسعة).

**💬 أسلوب الرد:**
- تحدث بلهجة مصرية بيضاء مهذبة ومحترفة.
- إذا سأل العميل عن بطارية سيارة، رشح له الأنواع المحلية (فولستارك، جرمن، تايجر، إلخ) أو المستوردة (بوش، فارتا، فولترونك).
- إذا سأل عن موتوسيكل، رشح له المستوردة (توب لايت).
- اختم دائماً بدعوة العميل للاتصال بنا أو زيارة الفرع للكشف المجاني.
`;

let ai: GoogleGenAI | null = null;
let chatSession: any = null;

function initAi() {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set.');
    return;
  }
  
  try {
    ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    chatSession = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });
  } catch (error) {
    console.error('Failed to initialize AI:', error);
  }
}

initAi();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!ai || !chatSession) {
    // Attempt re-init
    initAi();
    if (!ai || !chatSession) {
      return res.status(500).json({ error: 'عذراً، لم يتم إعداد مفتاح API. يرجى التأكد من الإعدادات.' });
    }
  }

  try {
    const response = await chatSession.sendMessage({ message });
    res.json({ text: response.text || "عذراً، لم أستطع فهم طلبك." });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    // Restart session on error
    initAi();
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
