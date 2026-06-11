
import { useState, useEffect } from 'react';
import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Clients } from './components/Clients';
import { ChatAssistant } from './components/ChatAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { ViewState, BlogPost, Language } from './types';

// Simple translation dictionary
const TRANSLATIONS = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      clients: 'عملائنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      orderNow: 'اطلب الآن'
    },
    hero: {
      badge: 'خبرة أكثر من 70 عاماً',
      title1: 'قلب سيارتك',
      title2: 'النابض بالحياة',
      subtitle: 'متخصصون في بطاريات السيارات والموتوسيكلات. خدمة كشف وتركيب واستبدال البطارية أينما كنت بأيدي فنيين محترفين.',
      ctaPrimary: 'اختر بطاريتك',
      ctaSecondary: 'خدمة الإنقاذ',
      brandsTitle: 'وكلاء كبرى الشركات العالمية',
      feature1Title: 'كشف مجاني',
      feature1Desc: 'فحص الدينامو والبطارية',
      feature2Title: 'تركيب فوري',
      feature2Desc: 'خدمة ديليفري وتركيب',
      feature3Title: 'ضمان معتمد',
      feature3Desc: 'استبدال فوري في الضمان'
    },
    sectionTitles: {
      products: 'أفضل أنواع البطاريات',
      productsDesc: '',
      blog: 'اعرف اكتر عن بطاريتك',
      blogDesc: 'معلومات تهمك للحفاظ على كهرباء سيارتك وإطالة عمر البطارية.',
      contact: 'تواصل معنا',
      contactDesc: 'خدمة عملاء طوال أيام الأسبوع. تواصل معنا لطلب بطارية أو خدمة إنقاذ.'
    },
    about: {
      title: 'السرجاني لخدمات البطاريات',
      subtitle: 'الاسم الأول في عالم بطاريات السيارات والموتوسيكلات في مصر',
      whoWeAreTitle: 'من نحن',
      whoWeAreDesc: 'تأسست شركة السرجاني عام 1951، وبفضل الابتكار والخبرة الممتدة لعقود طويلة، أصبحت الشركة واحدة من الكيانات البارزة في مصر في مجال توزيع البطاريات. وعلى مدار سنوات عملنا، نجحنا في بناء سمعة قوية قائمة على الثقة والجودة وتلبية احتياجات السوق. توزع شركة السرجاني حالياً تشكيلة واسعة من قطع البطاريات عبر شبكة من العملاء والشركاء، ونسعى باستمرار إلى توسيع محفظة العلامات التجارية التي نمثلها وزيادة حصتنا السوقية، مستندين إلى خبرتنا العميقة في السوق المصرية. شركة السرجاني هي موزّع متخصص ذو قيمة مضافة، ويقع مقرها الرئيسي في مدينة المنزلة – محافظة الدقهلية، والفرع الثاني في محافظة دمياط الجديدة.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'نفتخر بما حققناه من إنجازات منذ تأسيس الشركة، ونتطلع بخطط طموحة إلى التوسع والوصول إلى آفاق جديدة في أعمالنا. من خلال شبكتنا من الموزعين والشركاء ووجودنا القوي في السوق، نسعى لأن نكون المرجع الأول والآمن لكل قائد سيارة، ونوفر قناة مبيعات فعّالة لموردي قطع غيار السيارات الرائدين.'
    }
  },
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
  }
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [activeNavView, setActiveNavView] = useState<ViewState>(ViewState.HOME);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (currentView === ViewState.POST_DETAIL || currentView === ViewState.PRODUCT_DETAIL || currentView === ViewState.ADMIN_DASHBOARD) return;
      
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
          // Check if top is past half screen
          if (rect.top <= window.innerHeight / 2 - 50) {
            setActiveNavView(section.view);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeBlogPost, activeProduct]);

  const handleReadMore = (post: BlogPost) => {
    setActiveBlogPost(post);
    setCurrentView(ViewState.POST_DETAIL);
  };

  const handleProductSelect = (product: Product) => {
    setActiveProduct(product);
    setCurrentView(ViewState.PRODUCT_DETAIL);
  };

  const scrollToSection = (id: string, view: ViewState) => {
    // If not on HOME, switch to HOME first then scroll
    if (currentView !== ViewState.HOME && view !== ViewState.POST_DETAIL && view !== ViewState.PRODUCT_DETAIL && view !== ViewState.ADMIN_DASHBOARD) {
      setCurrentView(ViewState.HOME);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80; // Header offset
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else if (view === ViewState.POST_DETAIL || view === ViewState.PRODUCT_DETAIL || view === ViewState.ADMIN_DASHBOARD) {
      setCurrentView(view);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80; // Header offset
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

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <div id="hero"><Hero onAction={handleNavClick} lang={lang} translations={TRANSLATIONS} /></div>
            <div id="about"><About lang={lang} translations={TRANSLATIONS} /></div>
            <div id="products"><Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => handleNavClick(ViewState.CONTACT)} onProductSelect={handleProductSelect} /></div>
            <div id="clients"><Clients lang={lang} /></div>
            <div id="blog"><Blog onReadMore={handleReadMore} activePost={null} onBack={() => {}} lang={lang} title={TRANSLATIONS[lang].sectionTitles.blog} subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} /></div>
            <div id="contact"><Contact lang={lang} title={TRANSLATIONS[lang].sectionTitles.contact} subtitle={TRANSLATIONS[lang].sectionTitles.contactDesc} /></div>
          </>
        );
      case ViewState.ABOUT:
         return <About lang={lang} translations={TRANSLATIONS} />;
      case ViewState.PRODUCTS:
        return <Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => handleNavClick(ViewState.CONTACT)} onProductSelect={handleProductSelect} />
      case ViewState.PRODUCT_DETAIL:
        return <Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => handleNavClick(ViewState.CONTACT)} activeProduct={activeProduct} onBack={() => setCurrentView(ViewState.PRODUCTS)} onProductSelect={handleProductSelect} />
      case ViewState.BLOG:
        return <Blog onReadMore={handleReadMore} activePost={null} onBack={() => {}} lang={lang} title={TRANSLATIONS[lang].sectionTitles.blog} subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} />;
      case ViewState.POST_DETAIL:
        return <Blog onReadMore={handleReadMore} activePost={activeBlogPost} onBack={() => setCurrentView(ViewState.BLOG)} lang={lang} title={TRANSLATIONS[lang].sectionTitles.blog} subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} />;
      case ViewState.CONTACT:
        return <Contact lang={lang} title={TRANSLATIONS[lang].sectionTitles.contact} subtitle={TRANSLATIONS[lang].sectionTitles.contactDesc} />;
      case ViewState.ADMIN_DASHBOARD:
        return <AdminDashboard lang={lang} onBack={() => setCurrentView(ViewState.HOME)} />;
      default:
        return <Hero onAction={handleNavClick} lang={lang} translations={TRANSLATIONS} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header currentView={activeNavView} onChangeView={handleNavClick} lang={lang} setLang={setLang} translations={TRANSLATIONS} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer lang={lang} onChangeView={handleNavClick} />
      <ChatAssistant lang={lang} onAdminAccess={() => setCurrentView(ViewState.ADMIN_DASHBOARD)} />
    </div>
  );
}

export default App;
