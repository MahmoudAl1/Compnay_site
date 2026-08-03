import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLang } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing.' });
  }

  try {
    const aiClient = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text to ${targetLang}. Return ONLY the translated text, without any additional comments or quotes:\n\n${text}`,
      config: {
        temperature: 0.1,
      }
    });

    res.json({ translatedText: (response.text || '').trim() });
  } catch (error: any) {
    console.error("Gemini Translation Error:", error.message || error);
    res.status(500).json({ error: 'Translation failed.' });
  }
}
