
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Zap, Mail, Phone } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseHelper';

interface HeroProps {
  onAction: (view: ViewState) => void;
  lang: Language;
  translations: any;
}

// Updated Images: Ensure all links are high-quality and reliable
export const IMAGES = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Mechanic looking at engine
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Big Heavy Truck (New Request)
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Car close up dark
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Car hood open
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Motorcycle
  "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Mechanic working under hood
  "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Clean Engine Bay / Maintenance
];

// Brand data with specific hex colors and logos
const BRANDS = [
  { 
    name: "BOSCH", 
    color: "#dc2626", 
    logo: "/images/Bosch-logo.svg" 
  },
  { 
    name: "VARTA", 
    color: "#2563eb", 
    logo: "/images/varta.png" 
  },
  { 
    name: "TopLite", 
    color: "#16a34a", 
    logo: "/images/toplite.png"
  },
  { 
    name: "Fullstark", 
    color: "#3b82f6", 
    logo: "/images/fullstark.png"
  },
  { 
    name: "GERMAN", 
    color: "#ca8a04", 
    logo: "/images/german.png"
  },
  { 
    name: "Autolite", 
    color: "#f97316", 
    logo: "/images/autolite.png" 
  },
  { 
    name: "Voltronic", 
    color: "#06b6d4", 
    logo: "/images/voltronic.png"
  },
  {
    name: "FULDA",
    color: "#000080",
    logo: "/images/fulda.png"
  }
];

const BrandItem = ({ brand }: { brand: any }) => {
  return (
    <div className="relative w-40 h-20 flex items-center justify-center transition-transform duration-500 overflow-hidden rounded-lg">
      <img 
        src={brand.logo} 
        alt={brand.name} 
        referrerPolicy="no-referrer"
        className="relative z-0 w-full h-full object-contain transition-transform duration-300"
      />
      {/* Shine Effect */}
      <div className="absolute top-0 -left-[150%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] blur-[2px] animate-shine pointer-events-none z-10" />
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onAction, lang, translations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(IMAGES);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.heroImages !== undefined) {
          setHeroImages(data.heroImages);
        } else {
          setHeroImages(IMAGES);
        }
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings/global'));
    return () => unsub();
  }, []);

  useEffect(() => {
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
      <div className="relative h-[600px] md:h-[700px] w-full">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content Replaced with empty space or removed completely */}

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
        <div dir="ltr" className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center w-max [&_li]:mx-6 animate-scroll">
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
              <li key={`top-${index}`} className="flex items-center">
                 <BrandItem brand={brand} />
              </li>
            ))}
          </ul>
        </div>

        {/* Second scrolling container - Moves right */}
        <div dir="ltr" className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-2">
          <ul className="flex items-center w-max [&_li]:mx-6 animate-scroll-reverse">
            {[...BRANDS].reverse().concat([...BRANDS].reverse(), [...BRANDS].reverse(), [...BRANDS].reverse()).map((brand, index) => (
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
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};
