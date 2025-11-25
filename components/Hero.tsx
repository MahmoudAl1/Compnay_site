
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';

interface HeroProps {
  onAction: (view: ViewState) => void;
  lang: Language;
  translations: any;
}

// Updated Images: Ensure all links are high-quality and reliable
const IMAGES = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Mechanic looking at engine
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Car close up dark
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Car hood open
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Motorcycle
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Large Truck/Semi on road
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Blue Truck on road (Reliable Link)
  "https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"  // Heavy Truck Front (Reliable Link)
];

// Brand data with specific hex colors for effects
const BRANDS = [
  { name: "BOSCH", color: "#dc2626" },    // Red-600 (Vibrant)
  { name: "VARTA", color: "#2563eb" },    // Blue-600 (Vibrant)
  { name: "TAB", color: "#e11d48" },      // Rose-600
  { name: "TopLite", color: "#16a34a" },  // Green-600
  { name: "Fullstark", color: "#ea580c" },// Orange-600
  { name: "GERMAN", color: "#ca8a04" },   // Yellow-600 (Darker for contrast)
  { name: "ACDelco", color: "#0284c7" },  // Sky-600
  { name: "Energizer", color: "#d97706" },// Amber-600
  { name: "Exide", color: "#4f46e5" },    // Indigo-600
];

export const Hero: React.FC<HeroProps> = ({ onAction, lang, translations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="relative bg-slate-950 overflow-hidden flex flex-col">
      {/* Slider Section */}
      <div className="relative h-[600px] md:h-[700px] w-full">
        {IMAGES.map((img, index) => (
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

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-start">
          <div className="max-w-2xl mt-10">
            <div className="inline-block bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1 mb-6 backdrop-blur-sm animate-pulse">
              <span className="text-blue-400 font-bold text-sm tracking-wide">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              {t.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {t.hero.title2}
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl drop-shadow-md">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onAction(ViewState.PRODUCTS)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
              >
                {t.hero.ctaPrimary}
                <ArrowIcon size={20} />
              </button>
              <button 
                onClick={() => onAction(ViewState.CONTACT)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {IMAGES.map((_, idx) => (
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

      {/* Brand Marquee Section - High Contrast & Vibrant */}
      <div className="bg-slate-950 py-12 overflow-hidden relative z-20">
        <div className="container mx-auto px-4 mb-10 text-center">
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">{t.hero.brandsTitle}</p>
        </div>
        
        {/* The scrolling container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-6 ${lang === 'ar' ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
              <li key={index} className="flex items-center">
                 <div 
                   className="group relative w-56 h-28 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 hover:scale-110 cursor-pointer"
                   style={{
                     background: `linear-gradient(135deg, ${brand.color}E6, ${brand.color}66, #0f172a)`, // Heavy vibrant color gradient
                     boxShadow: `0 10px 40px -10px ${brand.color}66`, // Strong glowing shadow matching brand color
                     border: `1px solid ${brand.color}88` // Visible border
                   }}
                 >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                    
                    {/* Content */}
                    <span 
                      className="text-2xl font-black tracking-wider uppercase font-sans z-10 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:tracking-widest"
                      style={{ color: '#ffffff' }}
                    >
                       {brand.name}
                    </span>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"></div>
                 </div>
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
