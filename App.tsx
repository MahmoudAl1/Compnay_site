
import { useState, useEffect } from 'react';
import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { ChatAssistant } from './components/ChatAssistant';
import { ViewState, BlogPost, Language } from './types';

// Simple translation dictionary
const TRANSLATIONS = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
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
      productsDesc: 'تشكيلة واسعة من البطاريات الجافة والسائلة المناسبة لجميع أنواع السيارات والموتوسيكلات.',
      blog: 'نصائح السرجاني',
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
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeBlogPost]);

  const handleReadMore = (post: BlogPost) => {
    setActiveBlogPost(post);
    setCurrentView(ViewState.POST_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero onAction={setCurrentView} lang={lang} translations={TRANSLATIONS} />
            <Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => setCurrentView(ViewState.CONTACT)} />
          </>
        );
      case ViewState.ABOUT:
         return <About lang={lang} translations={TRANSLATIONS} />;
      case ViewState.PRODUCTS:
        return <Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => setCurrentView(ViewState.CONTACT)} />
      case ViewState.BLOG:
        return <Blog onReadMore={handleReadMore} activePost={null} onBack={() => {}} lang={lang} title={TRANSLATIONS[lang].sectionTitles.blog} subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} />;
      case ViewState.POST_DETAIL:
        return <Blog onReadMore={handleReadMore} activePost={activeBlogPost} onBack={() => setCurrentView(ViewState.BLOG)} lang={lang} title={TRANSLATIONS[lang].sectionTitles.blog} subtitle={TRANSLATIONS[lang].sectionTitles.blogDesc} />;
      case ViewState.CONTACT:
        return <Contact lang={lang} title={TRANSLATIONS[lang].sectionTitles.contact} subtitle={TRANSLATIONS[lang].sectionTitles.contactDesc} />;
      default:
        return <Hero onAction={setCurrentView} lang={lang} translations={TRANSLATIONS} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header currentView={currentView} onChangeView={setCurrentView} lang={lang} setLang={setLang} translations={TRANSLATIONS} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer lang={lang} onChangeView={setCurrentView} />
      <ChatAssistant lang={lang} />
    </div>
  );
}

export default App;
