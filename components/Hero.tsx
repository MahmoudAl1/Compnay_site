
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Zap, Mail, Phone, Car } from 'lucide-react';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseHelper';

interface HeroProps {
  onAction: (view: ViewState) => void;
  lang: Language;
  translations: any;
}

// Updated Images: Ensure all links are high-quality and reliable
export const IMAGES: string[] = [];

// اللوجوهات المستوردة (السطر الأول)
const IMPORTED_BRANDS = [
  { 
    name: "Brand 1", 
    color: "#dc2626", 
    // ضع مسار الصورة للوجو المستورد الأول هنا
    logo: "/images/vol.png" 
  },
  { 
    name: "Brand 2", 
    color: "#2563eb", 
    // ضع مسار الصورة للوجو المستورد الثاني هنا
    logo: "/images/2.png" 
  },
  { 
    name: "Brand 3", 
    color: "#16a34a", 
    // ضع مسار الصورة للوجو المستورد الثالث هنا
    logo: "/images/vol.png"
  },
  { 
    name: "Brand 4", 
    color: "#3b82f6", 
    // ضع مسار الصورة للوجو المستورد الرابع هنا
    logo: "/images/feza.png"
  },
   { 
    name: "Brand 10", 
    color: "#3b82f6", 
    // ضع مسار الصورة للوجو المستورد الرابع هنا
    logo: "/images/asya.png"
  }
];

// اللوجوهات المحلية (السطر الثاني)
const LOCAL_BRANDS = [
   { 
    name: "Brand 9", 
    color: "#ca8a04", 
    // ضع مسار الصورة للوجو المحلي الأول هنا
    logo: "/images/1.png"
  },
  { 
    name: "Brand 5", 
    color: "#ca8a04", 
    // ضع مسار الصورة للوجو المحلي الأول هنا
    logo: "/images/german.png"
  },
  { 
    name: "Brand 6", 
    color: "#f97316", 
    // ضع مسار الصورة للوجو المحلي الثاني هنا
    logo: "/images/fulda.png" 
  },
  { 
    name: "Brand 7", 
    color: "#06b6d4", 
    // ضع مسار الصورة للوجو المحلي الثالث هنا
    logo: "/images/bosh.png"
  },
  {
    name: "Brand 8",
    color: "#000080",
    // ضع مسار الصورة للوجو المحلي الرابع هنا
    logo: "/images/varta.png"
  },
  { 
    name: "Brand 9", 
    color: "#ca8a04", 
    // ضع مسار الصورة للوجو المحلي الأول هنا
    logo: "/images/3.png"
  }
];

const BrandItem = ({ brand }: { brand: any }) => {
  return (
    <div className="relative w-40 h-20 flex items-center justify-center transition-transform duration-500 rounded-lg group">
      <img 
        src={brand.logo} 
        alt={brand.name} 
        referrerPolicy="no-referrer"
        className="relative z-0 max-w-full max-h-full object-contain transition-transform duration-300"
      />
      {/* Shine Effect Masked to Image Shape */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `url(${brand.logo})`,
          maskImage: `url(${brand.logo})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center'
        }}
      >
        <div className="absolute top-0 -left-[150%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] blur-[2px] animate-shine" />
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onAction, lang, translations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('heroImages_cache');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return IMAGES;
  });
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    let hasLoadedCollection = false;

    const unsubHeroImages = onSnapshot(query(collection(db, 'heroImages'), orderBy('order')), snapshot => {
      if (!snapshot.empty) {
        hasLoadedCollection = true;
        const newImages = snapshot.docs.map(doc => doc.data().url);
        setHeroImages(newImages);
        localStorage.setItem('heroImages_cache', JSON.stringify(newImages));
        setIsLoadingImages(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'heroImages');
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (!hasLoadedCollection) {
          if (data.heroImages && data.heroImages.length > 0) {
            setHeroImages(data.heroImages);
            localStorage.setItem('heroImages_cache', JSON.stringify(data.heroImages));
          } else {
            setHeroImages(IMAGES);
          }
        }
      } else {
        if (!hasLoadedCollection) setHeroImages(IMAGES);
      }
      if (!hasLoadedCollection) setIsLoadingImages(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
      if (!hasLoadedCollection) {
        setHeroImages(IMAGES);
        setIsLoadingImages(false);
      }
    });

    return () => {
      unsubHeroImages();
      unsubSettings();
    };
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="relative bg-slate-950 overflow-hidden flex flex-col">
      {/* Slider Section */}
      <div className="relative w-full bg-slate-900 overflow-hidden flex items-center justify-center min-h-[40vh]">
        {isLoadingImages && heroImages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-slate-800"></div>
            <div className="absolute flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`${index === 0 ? "relative" : "absolute inset-0"} transition-opacity duration-1000 ease-in-out w-full h-full ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index}`} 
              className="w-full h-auto block"
              fetchpriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-blue-500' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Brand Marquee Section - Logos & High Contrast */}
      <div className="bg-slate-950 py-12 overflow-hidden relative z-20">
        {/* First scrolling container - Moves left */}
        <div dir="ltr" className="w-full inline-flex flex-nowrap overflow-hidden ">
          <ul className="flex items-center w-max [&_li]:mx-6 animate-scroll">
            {[...IMPORTED_BRANDS, ...IMPORTED_BRANDS, ...IMPORTED_BRANDS, ...IMPORTED_BRANDS, ...IMPORTED_BRANDS, ...IMPORTED_BRANDS].map((brand, index) => (
              <li key={`top-${index}`} className="flex items-center">
                 <BrandItem brand={brand} />
              </li>
            ))}
          </ul>
        </div>

        {/* Second scrolling container - Moves right */}
        <div dir="ltr" className="w-full inline-flex flex-nowrap overflow-hidden  mt-2">
          <ul className="flex items-center w-max [&_li]:mx-6 animate-scroll-reverse">
            {[...LOCAL_BRANDS, ...LOCAL_BRANDS, ...LOCAL_BRANDS, ...LOCAL_BRANDS, ...LOCAL_BRANDS, ...LOCAL_BRANDS].map((brand, index) => (
              <li key={`bottom-${index}`} className="flex items-center">
                 <BrandItem brand={brand} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 text-white group hover:bg-slate-800/50 p-4 rounded-xl transition">
              <div className="bg-slate-800 p-3 rounded-full text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature1Title}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature1Desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group hover:bg-slate-800/50 p-4 rounded-xl transition">
              <div className="bg-slate-800 p-3 rounded-full text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature2Title}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature2Desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group hover:bg-slate-800/50 p-4 rounded-xl transition">
              <div className="bg-slate-800 p-3 rounded-full text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature3Title}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature3Desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group hover:bg-slate-800/50 p-4 rounded-xl transition">
              <div className="bg-slate-800 p-3 rounded-full text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                <Car size={24} />
              </div>
              <div>
                <h4 className="font-bold">{t.hero.feature4Title || (lang === 'ar' ? 'جميع الموديلات' : 'All Models')}</h4>
                <p className="text-sm text-gray-400">{t.hero.feature4Desc || (lang === 'ar' ? 'حلول بطاريات تناسب مختلف احتياجاتك' : 'Battery solutions to fit your needs')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
