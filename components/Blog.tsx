
import React, { useRef, useState, useEffect } from 'react';
import { BlogPost, Language } from '../types';
import { Calendar, ChevronLeft, ChevronRight, User, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseHelper';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 علامات تدل على قرب انتهاء عمر بطارية سيارتك",
    title_en: "5 Signs Your Car Battery is Nearing the End of its Life",
    excerpt: "تعرف على الإشارات التحذيرية التي تخبرك بضرورة استبدال البطارية قبل أن تتوقف سيارتك بشكل مفاجئ.",
    excerpt_en: "Learn the warning signs that tell you to replace your battery before your car suddenly stops.",
    content: `هل لاحظت مؤخراً أن سيارتك تستغرق وقتاً أطول لتعمل؟ أو أن أضواء المصابيح تبدو خافتة؟ البطارية لا تتوقف عن العمل فجأة دون سابق إنذار، بل ترسل لك إشارات استغاثة. إليك أهم 5 علامات تدل على أن بطاريتك تلفظ أنفاسها الأخيرة:

1. بطء تشغيل المحرك (Slow Crank):
عندما تدير المفتاح، تشعر أن المحرك "ثقيل" ويستغرق وقتاً أطول من المعتاد للدوران. هذه هي العلامة الأكثر شيوعاً وتدل على أن البطارية فقدت قدرتها على توفير تيار البدء (CCA) اللازم.

2. ضعف الإضاءة والأنظمة الكهربائية:
البطارية مسؤولة عن تشغيل جميع الإلكترونيات في سيارتك. إذا لاحظت أن المصابيح الأمامية خافتة، أو أن زجاج النوافذ يتحرك ببطء، أو أن الراديو يتوقف عند التشغيل، فهذا دليل قوي على ضعف البطارية.

3. إضاءة لمبة البطارية في التابلوه:
لا تتجاهل أبداً الضوء الأحمر على شكل بطارية في لوحة القيادة. قد يعني هذا مشكلة في البطارية نفسها أو في نظام الشحن (الدينامو). في كلتا الحالتين، يجب فحص السيارة فوراً.

4. انتفاخ جسم البطارية:
تؤدي الحرارة الشديدة أحياناً إلى انتفاخ الهيكل الخارجي للبطارية. إذا فتحت غطاء المحرك ووجدت البطارية "منتفخة" أو متغيرة الشكل، فهذا يعني أنها تالفة داخلياً ويجب تغييرها حالاً لتجنب خطر الانفجار أو التسريب.

5. عمر البطارية الافتراضي:
حتى مع أفضل صيانة، للبطاريات عمر افتراضي. في الظروف العادية، تعيش البطارية من 2 إلى 4 سنوات. إذا مر على بطاريتك 3 سنوات، فقد حان الوقت لإجراء فحص دوري لها.

نصيحة السرجاني: لا تنتظر حتى تتوقف سيارتك في منتصف الطريق. مر علينا في أي وقت للكشف المجاني على البطارية والدينامو!`,
    content_en: `Have you recently noticed that your car takes longer to start? Or that the headlights seem dim? The battery doesn't just stop working suddenly without warning, but rather sends you distress signals. Here are the top 5 signs your battery is breathing its last:

1. Slow Crank:
When you turn the key, the engine feels "heavy" and takes longer than usual to turn over. This is the most common sign and indicates the battery has lost its ability to provide the necessary Cold Cranking Amps (CCA).

2. Dim Lights and Electrical Issues:
The battery is responsible for running all electronics in your vehicle. If you notice your headlights are dim, power windows move slowly, or the radio cuts out when starting, it's a strong indicator of a weak battery.

3. Battery Light on Dashboard:
Never ignore the red battery-shaped light on your dashboard. This could mean a problem with the battery itself or the charging system (alternator). In either case, the car should be inspected immediately.

4. Swollen Battery Case:
Extreme heat sometimes causes the battery's outer casing to swell. If you open the hood and find the battery "bloated" or deformed, it means it's damaged internally and must be replaced immediately to avoid the risk of explosion or leakage.

5. Battery Lifespan:
Even with the best maintenance, batteries have a lifespan. Under normal conditions, a battery lasts 2 to 4 years. If your battery is over 3 years old, it's time for a routine check-up.

El Sergany Advice: Don't wait until your car stalls in the middle of the road. Stop by anytime for a free battery and alternator check!`,
    date: "15 Oct 2023",
    image: "https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?auto=format&fit=crop&w=800&q=80",
    category: "صيانة",
    category_en: "Maintenance"
  },
  {
    id: 2,
    title: "الفرق بين البطارية الجافة والبطارية السائلة: أيهما تختار؟",
    title_en: "Dry vs. Liquid Battery: Which to Choose?",
    excerpt: "مقارنة شاملة تساعدك على اختيار النوع الأفضل لسيارتك وميزانيتك، ومميزات وعيوب كل نوع.",
    excerpt_en: "A comprehensive comparison to help you choose the best type for your car and budget, along with the pros and cons of each.",
    content: `عند شراء بطارية جديدة، السؤال الأشهر هو: "جافة ولا سائلة؟". الحقيقة أن المسميات قد تكون خادعة قليلاً، فكلاهما يحتوي على حمض وتفاعلات كيميائية، لكن الفرق يكمن في التكوين والصيانة. إليك التفاصيل:

أولاً: البطارية السائلة (Lead-Acid):
هي النوع التقليدي القديم. تحتوي على أغطية يمكن فتحها لتزويدها بالماء المقطر.
- المميزات: سعرها رخيص نسبياً ومتوفرة بكثرة.
- العيوب: تحتاج لصيانة دورية (متابعة مستوى الماء)، قد تسرب أحماضاً تسبب تآكل لأجزاء السيارة، وعمرها الافتراضي أقصر قليلاً إذا أهملت صيانتها.

ثانياً: البطارية الجافة (Maintenance Free / AGM):
هي النوع الحديث والأكثر انتشاراً الآن. هي مغلقة تماماً ولا تحتاج لأي تزويد مياه طوال فترة حياتها.
- المميزات: لا تحتاج صيانة (ركب وانسى)، تتحمل الاهتزازات بشكل أفضل، لا تسرب سوائل، وعمرها الافتراضي أطول في الغالب.
- العيوب: سعرها أغلى قليلاً من السائلة.

أيهما تختار؟
إذا كنت تبحث عن راحة البال ولا تريد فتح غطاء المحرك كل أسبوع للفحص، فالبطارية الجافة هي الخيار الأفضل بلا منازع. أما إذا كانت ميزانيتك محدودة جداً ولديك خبرة في صيانة السيارة، فالسائلة قد تفي بالغرض.

في السرجاني، ننصح دائماً بالبطاريات الجافة (تكنولوجيا ألمانية أو كورية) لأنها توفر أداءً ثابتاً وموثوقاً لسيارتك الحديثة المليئة بالحساسات والكمبيوترات.`,
    content_en: `When buying a new battery, the most common question is: "Dry or liquid?". The truth is the names can be a bit deceiving, as both contain acid and chemical reactions, but the difference lies in construction and maintenance. Here are the details:

First: Liquid Battery (Lead-Acid):
This is the traditional, older type. It has caps that can be opened to top it up with distilled water.
- Pros: Relatively cheap and widely available.
- Cons: Requires regular maintenance (checking water levels), may leak acids causing corrosion to car parts, and has a slightly shorter lifespan if maintenance is neglected.

Second: Dry Battery (Maintenance Free / AGM):
This is the modern and most widespread type today. It is completely sealed and doesn't require any water top-up throughout its life.
- Pros: No maintenance required (install and forget), better vibration resistance, no liquid leaks, and generally a longer lifespan.
- Cons: Slightly more expensive than the liquid type.

Which to choose?
If you're looking for peace of mind and don't want to open the hood every week for a check, the dry battery is undoubtedly the best choice. However, if your budget is very limited and you have experience in car maintenance, the liquid one might suffice.

At El Sergany, we always recommend dry batteries (German or Korean technology) because they provide stable and reliable performance for your modern car filled with sensors and computers.`,
    date: "02 Nov 2023",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    category: "نصائح",
    category_en: "Tips"
  },
  {
    id: 3,
    title: "كيف تحافظ على بطاريتك من الموت في فصل الشتاء؟",
    title_en: "How to Keep Your Battery from Dying in Winter?",
    excerpt: "الطقس البارد هو العدو الأول للبطاريات. إليك خطوات بسيطة وفعالة لحمايتها في الصباح البارد.",
    excerpt_en: "Cold weather is the number one enemy of batteries. Here are simple and effective steps to protect it on cold mornings.",
    content: `مع انخفاض درجات الحرارة في الشتاء، تزداد شكاوى السائقين من توقف السيارات صباحاً. البرد يبطئ التفاعلات الكيميائية داخل البطارية، مما يقلل من قدرتها على توليد الطاقة، وفي نفس الوقت يحتاج المحرك لطاقة أكبر ليدور بسبب لزوجة الزيت. معادلة صعبة، صحيح؟

إليك 4 نصائح ذهبية لحماية بطاريتك في الشتاء:

1. نظافة أقطاب البطارية (القواطيش):
التآكل والأملاح البيضاء التي تتكون على أقطاب البطارية تزيد من المقاومة وتمنع وصول التيار. نظف الأقطاب بانتظام بفرشاة وصودا الخبز والماء، أو زرنا في السرجاني لنقوم بذلك بدلاً منك.

2. لا تترك السيارة لفترات طويلة:
إذا كنت لا تستخدم سيارتك يومياً، حاول تشغيلها لمدة 15 دقيقة على الأقل كل يومين أو ثلاثة. هذا يعيد شحن البطارية ويحافظ على نشاطها الكيميائي.

3. أغلق كل شيء قبل التشغيل:
قبل إدارة المفتاح، تأكد من إغلاق المصابيح، الراديو، التكييف، وشواحن الهاتف. اجعل كل طاقة البطارية تذهب للمارش (بادئ الحركة) فقط في المحاولة الأولى.

4. افحص البطارية قبل الشتاء:
إذا كان عمر بطاريتك أكثر من 3 سنوات، فالشتاء هو الوقت الذي ستظهر فيه عيوبها. قم بزيارتنا لإجراء اختبار "الحمل" (Load Test) للتأكد من قدرتها على الصمود في الأيام الباردة.`,
    content_en: `With the drop in temperatures during winter, driver complaints about cars not starting in the morning increase. The cold slows down the chemical reactions inside the battery, reducing its ability to generate power, while at the same time the engine requires more power to turn over due to oil viscosity. A tough equation, right?

Here are 4 golden tips to protect your battery in winter:

1. Clean Battery Terminals:
Corrosion and white salts that form on battery terminals increase resistance and block current flow. Clean the terminals regularly with a brush, baking soda, and water, or visit us at El Sergany and we'll do it for you.

2. Don't leave the car for long periods:
If you don't use your car daily, try running it for at least 15 minutes every two or three days. This recharges the battery and keeps its chemical activity going.

3. Turn everything off before starting:
Before turning the key, make sure to turn off headlights, radio, AC, and phone chargers. Let all the battery's power go directly to the starter motor on the first attempt.

4. Test your battery before winter:
If your battery is more than 3 years old, winter is when its flaws will show. Visit us for a "Load Test" to ensure its ability to survive the cold days.`,
    date: "10 Dec 2023",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80",
    category: "مواسم",
    category_en: "Seasons"
  }
];

interface BlogProps {
  onReadMore: (post: BlogPost) => void;
  activePost: BlogPost | null;
  onBack: () => void;
  lang: Language;
  title: string;
  subtitle: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onReadMore: (post: BlogPost) => void;
  lang: Language;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index, onReadMore, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const ReadMoreIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 150}ms`,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full opacity-0 animate-fade-in-up will-change-transform"
    >
      <div className="relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: isHovered 
              ? `scale(1.1) translateX(${-rotation.y * 1.5}px) translateY(${rotation.x * 1.5}px)` 
              : 'scale(1)',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.7s ease-out'
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg z-10">
          {lang === 'ar' ? post.category : (post.category_en || post.category)}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative bg-slate-900 z-10">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
          {lang === 'ar' ? post.title : (post.title_en || post.title)}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {lang === 'ar' ? post.excerpt : (post.excerpt_en || post.excerpt)}
        </p>
        <button
          onClick={() => onReadMore(post)}
          className="group/btn w-full bg-slate-800 hover:bg-blue-600 text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
        >
          {lang === 'ar' ? 'اقرأ المقال' : 'Read Article'}
          <ReadMoreIcon
            size={16}
            className={`transition-transform duration-300 ${lang === 'ar' ? 'group-hover/btn:-translate-x-1' : 'rotate-180 group-hover/btn:translate-x-1'}`}
          />
        </button>
      </div>
    </div>
  );
};

export const Blog: React.FC<BlogProps> = ({ onReadMore, activePost, onBack, lang, title, subtitle }) => {
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), snapshot => {
      const dbPosts: BlogPost[] = [];
      snapshot.forEach(doc => dbPosts.push({ id: doc.id as any, ...doc.data() } as BlogPost));
      if (dbPosts.length > 0) {
        setPosts(dbPosts);
      } else {
        setPosts([]);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'posts'));
    return () => unsub();
  }, []);

  const fullActivePost = activePost ? (posts.find(p => p.id == activePost.id) || activePost) : null;

  if (fullActivePost && fullActivePost.title) {
    return (
      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-400 hover:text-blue-500 mb-8 font-bold transition-colors"
          >
            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-blue-500/10 transition-colors">
               <BackIcon size={20} />
            </div>
            {lang === 'ar' ? 'العودة للمقالات' : 'Back to Articles'}
          </button>
          
          <div className="rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-black/50 border border-slate-800 relative animate-fade-in-up">
            <img src={fullActivePost.image} alt={fullActivePost.title} className="w-full h-64 md:h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
            <div className="absolute bottom-6 right-6 md:right-8 left-6 md:left-8">
               <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  {lang === 'ar' ? fullActivePost.category : (fullActivePost.category_en || fullActivePost.category)}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                  {lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)}
                </h1>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 border-b border-slate-800 pb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-500" />
              {fullActivePost.date}
            </span>
             <span className="flex items-center gap-2">
              <User size={18} className="text-blue-500" />
              Admin
            </span>
             <span className="flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              5 min read
            </span>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-loose animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <p className="font-bold text-xl text-white mb-6 leading-relaxed opacity-90">{lang === 'ar' ? fullActivePost.excerpt : (fullActivePost.excerpt_en || fullActivePost.excerpt)}</p>
            <div className="w-20 h-1 bg-blue-500/50 rounded-full mb-8"></div>
            <p className="whitespace-pre-wrap opacity-80 text-lg leading-9">{lang === 'ar' ? fullActivePost.content : (fullActivePost.content_en || fullActivePost.content)}</p>
            
            <div className="mt-12 p-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-start gap-4">
               <div className="bg-blue-500/10 p-3 rounded-full text-blue-500 shrink-0">
                  <Clock size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-white mb-2">
                    {lang === 'ar' ? 'هل لديك استفسار تقني؟' : 'Have a technical question?'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {lang === 'ar' 
                      ? 'للحصول على مزيد من المعلومات التقنية الدقيقة، يمكنك دائماً سؤال "مساعد السرجاني" الموجود أسفل الشاشة!'
                      : 'For more precise technical information, you can always ask "El Sergany Assistant" at the bottom of the screen!'}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{title}</h2>
          <p className="text-gray-400 text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              index={index} 
              onReadMore={onReadMore} 
              lang={lang} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
