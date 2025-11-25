
import React, { useRef, useState } from 'react';
import { BlogPost, Language } from '../types';
import { Calendar, ChevronLeft, ChevronRight, User, ArrowRight, ArrowLeft, Clock } from 'lucide-react';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 علامات تدل على قرب انتهاء عمر بطارية سيارتك",
    excerpt: "تعرف على الإشارات التحذيرية التي تخبرك بضرورة استبدال البطارية قبل أن تتوقف سيارتك بشكل مفاجئ.",
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
    date: "15 Oct 2023",
    image: "https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?auto=format&fit=crop&w=800&q=80", // Dashboard close up (reliable)
    category: "صيانة"
  },
  {
    id: 2,
    title: "الفرق بين البطارية الجافة والبطارية السائلة: أيهما تختار؟",
    excerpt: "مقارنة شاملة تساعدك على اختيار النوع الأفضل لسيارتك وميزانيتك، ومميزات وعيوب كل نوع.",
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
    date: "02 Nov 2023",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80", // Car engine/battery
    category: "نصائح"
  },
  {
    id: 3,
    title: "كيف تحافظ على بطاريتك من الموت في فصل الشتاء؟",
    excerpt: "الطقس البارد هو العدو الأول للبطاريات. إليك خطوات بسيطة وفعالة لحمايتها في الصباح البارد.",
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
    date: "10 Dec 2023",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80", // Car in cold/snow (reliable)
    category: "مواسم"
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

const BlogPostCard = ({ post, index, onReadMore, lang }: { post: BlogPost; index: number; onReadMore: (post: BlogPost) => void; lang: Language }) => {
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
          {post.category}
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
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
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

  if (activePost) {
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
            <img src={activePost.image} alt={activePost.title} className="w-full h-64 md:h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
            <div className="absolute bottom-6 right-6 md:right-8 left-6 md:left-8">
               <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  {activePost.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                  {activePost.title}
                </h1>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 border-b border-slate-800 pb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-500" />
              {activePost.date}
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
            <p className="font-bold text-xl text-white mb-6 leading-relaxed opacity-90">{activePost.excerpt}</p>
            <div className="w-20 h-1 bg-blue-500/50 rounded-full mb-8"></div>
            <p className="whitespace-pre-wrap opacity-80 text-lg leading-9">{activePost.content}</p>
            
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
          {BLOG_POSTS.map((post, index) => (
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
