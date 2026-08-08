
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BlogPost, Language } from '../types';
import { generateSlug } from '../slugify';
import { Calendar, ChevronLeft, ChevronRight, User, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseHelper';

const BLOG_POSTS: BlogPost[] = [];

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
        <Link
          to={`/blog/${generateSlug(lang === 'ar' ? post.title : (post.title_en || post.title))}`}
          className="group/btn w-full bg-slate-800 hover:bg-blue-600 text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
        >
          {lang === 'ar' ? 'اقرأ المقال' : 'Read Article'}
          <ReadMoreIcon
            size={16}
            className={`transition-transform duration-300 ${lang === 'ar' ? 'group-hover/btn:-translate-x-1' : 'rotate-180 group-hover/btn:translate-x-1'}`}
          />
        </Link>
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

  const fullActivePost = activePost ? (posts.find(p => String(p.id) === String(activePost.id) || generateSlug(p.title) === activePost.id || generateSlug(p.title_en || '') === activePost.id) || activePost) : null;

  if (fullActivePost && fullActivePost.title) {
    return (
      <>
      <Helmet>
        <title>{lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title)} | El Sergany Company</title>
        <meta name="description" content={lang === 'ar' ? fullActivePost.excerpt : (fullActivePost.excerpt_en || fullActivePost.excerpt)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": lang === 'ar' ? fullActivePost.title : (fullActivePost.title_en || fullActivePost.title),
            "image": fullActivePost.image.startsWith('http') ? fullActivePost.image : `https://elserganycompany.com${fullActivePost.image}`,
            "datePublished": fullActivePost.date,
            "description": lang === 'ar' ? fullActivePost.excerpt : (fullActivePost.excerpt_en || fullActivePost.excerpt),
            "author": {
              "@type": "Organization",
              "name": "El Sergany Company"
            }
          })}
        </script>
      </Helmet>
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
    </>
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
