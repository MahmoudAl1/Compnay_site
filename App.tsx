import React, { useState, useEffect } from 'react';
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
      products: 'البطاريات',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      orderNow: 'اطلب الآن'
    },
    hero: {
      badge: 'خبرة أكثر من 20 عاماً',
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
      whoWeAreDesc: 'نحن مركز متخصص في بيع وصيانة واستبدال بطاريات السيارات والدراجات النارية. منذ تأسيسنا، ونحن نلتزم بتقديم أجود أنواع البطاريات العالمية مع خدمة فنية متميزة. ندرك أن البطارية هي قلب المركبة، لذا نوفر لعملائنا الراحة من خلال خدمات الكشف المنزلي والتركيب الفوري.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'نسعى لأن نكون المرجع الأول والآمن لكل قائد سيارة أو دراجة نارية يواجه مشكلة في البطارية، من خلال توفير حلول سريعة، موثوقة، وبأسعار تنافسية تضمن استمرار رحلتك بسلام.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Batteries',
      blog: 'Blog',
      contact: 'Contact Us',
      orderNow: 'Order Now'
    },
    hero: {
      badge: 'Over 20 Years Experience',
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
      whoWeAreDesc: 'We are a specialized center for selling, maintaining, and replacing car and motorcycle batteries. Since our establishment, we are committed to providing the best global battery brands with outstanding technical service. We understand that the battery is the heart of the vehicle, so we offer home testing and instant installation services.',
      visionTitle: 'Our Vision',
      visionDesc: 'We aim to be the first and safe reference for every car or motorcycle driver facing a battery problem, by providing fast, reliable, and competitive solutions to ensure your journey continues safely.'
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
        return <Products lang={lang} title={TRANSLATIONS[lang].sectionTitles.products} subtitle={TRANSLATIONS[lang].sectionTitles.productsDesc} onInquire={() => setCurrentView(ViewState.CONTACT)} />;
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