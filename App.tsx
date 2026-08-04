import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Header } from './components/Layout';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Clients } from './components/Clients';
import { Footer } from './components/Layout';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Blog } from './components/Blog';
import { AdminDashboard } from './components/AdminDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { ViewState, BlogPost, Language, Product } from './types';
import { Helmet } from 'react-helmet-async';
import { generateSlug } from './slugify';

const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      clients: 'Clients',
      blog: 'Blog',
      contact: 'Contact Us',
      orderNow: 'Order Now'
    },
    hero: {
      badge: 'Over 70 Years Experience',
      title1: 'Your Vehicle\'s',
      title2: 'Beating Heart',
      subtitle: 'Specialized in Car and Motorcycle batteries. Testing, installation, and replacement service wherever you are by professional technicians.',
      ctaPrimary: 'Choose Battery',
      ctaSecondary: 'Rescue Service',
      brandsTitle: 'Authorized Dealers for Top Brands',
      feature1Title: 'Free Testing',
      feature1Desc: 'Alternator & Battery check',
      feature2Title: 'Instant Install',
      feature2Desc: 'Delivery & Installation',
      feature3Title: 'Certified Warranty',
      feature3Desc: 'Instant replacement in warranty'
    },
    sectionTitles: {
      products: 'Best Battery Brands',
      productsDesc: 'Wide range of maintenance-free and acid batteries suitable for all cars and motorcycles.',
      blog: 'El Sergany Tips',
      blogDesc: 'Important information to maintain your vehicle electrics and extend battery life.',
      contact: 'Contact Us',
      contactDesc: 'Customer service all week long. Contact us to order a battery or request rescue service.'
    },
    about: {
      title: 'El Sergany Battery Services',
      subtitle: 'The leading name in Car and Motorcycle batteries in Egypt',
      whoWeAreTitle: 'Who We Are',
      whoWeAreDesc: 'El Sergany Company was established in 1951. Thanks to innovation and decades of experience, the company has become one of the prominent entities in Egypt in the field of battery distribution. Over the years, we have succeeded in building a strong reputation based on trust, quality, and meeting market needs. We currently distribute a wide range of batteries through a network of clients and partners. Our headquarters is located in El Manzala (Dakahlia), with a second branch in New Damietta.',
      visionTitle: 'Our Vision',
      visionDesc: 'We are proud of our achievements since the company\'s inception and look forward with ambitious plans to expand and reach new horizons. Through our network of distributors and partners and our strong market presence, we aim to be the premier and safe reference for every driver, providing an effective sales channel for leading auto parts suppliers.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'منتجاتنا',
      clients: 'عملائنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      orderNow: 'اطلب الآن'
    },
    hero: {
      badge: 'خبرة أكثر من ٧٠ عاماً',
      title1: 'القلب النابض',
      title2: 'لسيارتك',
      subtitle: 'متخصصون في بطاريات السيارات والموتوسيكلات. كشف، تركيب، وخدمة استبدال أينما كنت بأيدي فنيين محترفين.',
      ctaPrimary: 'اختر بطاريتك',
      ctaSecondary: 'خدمة الإنقاذ',
      brandsTitle: 'وكلاء معتمدون لكبرى الشركات',
      feature1Title: 'كشف مجاني',
      feature1Desc: 'فحص الدينامو والبطارية',
      feature2Title: 'تركيب فوري',
      feature2Desc: 'توصيل وتركيب أينما كنت',
      feature3Title: 'ضمان معتمد',
      feature3Desc: 'استبدال فوري داخل الضمان'
    },
    sectionTitles: {
      products: 'أفضل ماركات البطاريات',
      productsDesc: 'تشكيلة واسعة من البطاريات الجافة والسائلة تناسب جميع السيارات والموتوسيكلات.',
      blog: 'نصائح السرجاني',
      blogDesc: 'معلومات هامة للحفاظ على كهرباء سيارتك وإطالة عمر البطارية.',
      contact: 'اتصل بنا',
      contactDesc: 'خدمة العملاء طوال أيام الأسبوع. تواصل معنا لطلب بطارية أو طلب خدمة إنقاذ.'
    },
    about: {
      title: 'خدمات السرجاني للبطاريات',
      subtitle: 'الاسم الأول في عالم بطاريات السيارات والموتوسيكلات في مصر',
      whoWeAreTitle: 'من نحن',
      whoWeAreDesc: 'تأسست شركة السرجاني في عام 1951. بفضل الابتكار وعقود من الخبرة، أصبحت الشركة واحدة من الكيانات البارزة في مصر في مجال توزيع البطاريات. على مر السنين، نجحنا في بناء سمعة قوية مبنية على الثقة والجودة وتلبية احتياجات السوق. نقوم حالياً بتوزيع مجموعة واسعة من البطاريات عبر شبكة من العملاء والشركاء. يقع المقر الرئيسي في المنزلة (الدقهلية)، مع فرع ثانٍ في دمياط الجديدة.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'نفتخر بما حققناه منذ تأسيس الشركة ونتطلع بخطط طموحة للتوسع والوصول إلى آفاق جديدة. من خلال شبكة موزعينا وشركائنا وتواجدنا القوي في السوق، نهدف إلى أن نكون المرجع الأول والآمن لكل سائق، مع توفير قناة بيع فعالة لكبار موردي قطع غيار السيارات.'
    }
  }
};

const ProductWrapper = ({ lang, translations, onInquire }: any) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Fake a product object to trigger detail view in Products component
  // Products component will find the actual product using this ID
  const activeProduct = { id: slug } as any;

  return (
    <>
      <Helmet>
        <title>{`Elsergany Company | Product`}</title>
        <meta name="description" content={`Check out this product from Elsergany Company.`} />
      </Helmet>
      <Products 
        lang={lang} 
        title={translations[lang].sectionTitles.products} 
        subtitle={translations[lang].sectionTitles.productsDesc} 
        onInquire={onInquire} 
        activeProduct={activeProduct} 
        onBack={() => navigate('/')} 
        onProductSelect={(p) => navigate(`/product/${generateSlug(lang === 'ar' ? p.name : (p.name_en || p.name))}`)} 
      />
    </>
  );
};

const BlogWrapper = ({ lang, translations }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const activePost = { id: slug } as any;

  return (
    <>
      <Helmet>
        <title>{`Elsergany Company | Blog Post`}</title>
        <meta name="description" content={`Read this post on Elsergany Company's blog.`} />
      </Helmet>
      <Blog 
        onReadMore={(p) => navigate(`/blog/${generateSlug(lang === 'ar' ? p.title : (p.title_en || p.title))}`)} 
        activePost={activePost} 
        onBack={() => navigate('/')} 
        lang={lang} 
        title={translations[lang].sectionTitles.blog} 
        subtitle={translations[lang].sectionTitles.blogDesc} 
      />
    </>
  );
};

function App() {
  const [activeNavView, setActiveNavView] = useState<ViewState>(ViewState.HOME);
  const [lang, setLang] = useState<Language>('ar');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = [
        { id: 'contact', view: ViewState.CONTACT },
        { id: 'blog', view: ViewState.BLOG },
        { id: 'clients', view: ViewState.CLIENTS },
        { id: 'products', view: ViewState.PRODUCTS },
        { id: 'about', view: ViewState.ABOUT },
        { id: 'hero', view: ViewState.HOME },
      ];
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 - 50) {
            setActiveNavView(section.view);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const scrollToSection = (id: string, view: ViewState) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (view: ViewState) => {
    let sectionId = 'hero';
    if (view === ViewState.HOME) sectionId = 'hero';
    if (view === ViewState.ABOUT) sectionId = 'about';
    if (view === ViewState.PRODUCTS) sectionId = 'products';
    if (view === ViewState.CLIENTS) sectionId = 'clients';
    if (view === ViewState.BLOG) sectionId = 'blog';
    if (view === ViewState.CONTACT) sectionId = 'contact';
    
    scrollToSection(sectionId, view);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>Elsergany Company</title>
        <meta name="description" content="Elsergany Company - The leading provider of car and motorcycle batteries in Egypt. Authorized dealer for top global brands." />
      </Helmet>
      
      <Header currentView={activeNavView} onChangeView={handleNavClick} lang={lang} setLang={setLang} translations={TRANSLATIONS} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <div id="hero"><Hero onAction={handleNavClick} lang={lang} translations={TRANSLATIONS} /></div>
              <div id="about"><About lang={lang} translations={TRANSLATIONS} /></div>
              <div id="products">
                <Products 
                  lang={lang} 
                  title={TRANSLATIONS[lang].sectionTitles.products} 
                  subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} 
                  onInquire={() => handleNavClick(ViewState.CONTACT)} 
                  onProductSelect={(p) => navigate(`/product/${generateSlug(lang === 'ar' ? p.name : (p.name_en || p.name))}`)} 
                />
              </div>
              <div id="clients"><Clients lang={lang} /></div>
              <div id="blog">
                <Blog 
                  onReadMore={(p) => navigate(`/blog/${generateSlug(lang === 'ar' ? p.title : (p.title_en || p.title))}`)} 
                  activePost={null} 
                  onBack={() => {}} 
                  lang={lang} 
                  title={TRANSLATIONS[lang].sectionTitles.blog} 
                  subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} 
                />
              </div>
              <div id="contact">
                <Contact lang={lang} title={TRANSLATIONS[lang].sectionTitles.contact} subtitle={TRANSLATIONS[lang].sectionTitles.contactDesc} />
              </div>
            </>
          } />
          
          <Route path="/product/:slug" element={<ProductWrapper lang={lang} translations={TRANSLATIONS} onInquire={() => handleNavClick(ViewState.CONTACT)} />} />
          <Route path="/blog/:slug" element={<BlogWrapper lang={lang} translations={TRANSLATIONS} />} />
          <Route path="/admin" element={<AdminDashboard lang={lang} onBack={() => navigate('/')} />} />
        </Routes>
      </main>

      <Footer lang={lang} onChangeView={handleNavClick} />
      <ChatAssistant lang={lang} onAdminAccess={() => navigate('/admin')} />
    </div>
  );
}

export default App;
