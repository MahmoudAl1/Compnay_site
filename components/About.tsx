
import React from 'react';
import { Language } from '../types';
import { ShieldCheck, Target, Users, Zap } from 'lucide-react';

interface AboutProps {
  lang: Language;
  translations: any;
}

export const About: React.FC<AboutProps> = ({ lang, translations }) => {
  const t = translations[lang].about;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1950&q=80" 
          alt="Workshop" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-4">{t.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-10">
        
        {/* Who We Are */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-sm font-bold mb-4 border border-blue-500/20">
                {lang === 'ar' ? 'قصتنا' : 'Our Story'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.whoWeAreTitle}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg mb-6">
                {t.whoWeAreDesc}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-800 p-3 rounded-lg text-blue-500">
                    <Users size={24} />
                  </div>
                  <span className="font-bold text-gray-300">{lang === 'ar' ? 'فريق متخصص' : 'Expert Team'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-800 p-3 rounded-lg text-blue-500">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-bold text-gray-300">{lang === 'ar' ? 'ضمان موثوق' : 'Trusted Warranty'}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-3 opacity-20 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1000&q=80" 
                alt="Our Team" 
                className="relative rounded-3xl shadow-2xl border border-slate-800 w-full"
              />
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
           <div className={`relative ${lang === 'ar' ? 'md:order-1' : ''}`}>
               <div className="absolute inset-0 bg-cyan-500 rounded-3xl -rotate-3 opacity-10 blur-lg"></div>
               <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80" 
                alt="Vision" 
                className="relative rounded-3xl shadow-2xl border border-slate-800 w-full"
              />
            </div>
            <div className={lang === 'ar' ? 'md:order-2' : ''}>
               <div className="inline-block bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-sm font-bold mb-4 border border-cyan-500/20">
                {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.visionTitle}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg mb-6">
                {t.visionDesc}
              </p>
               <div className="space-y-4">
                 <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg shrink-0">
                     <Target size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-white mb-1">{lang === 'ar' ? 'الريادة' : 'Leadership'}</h4>
                     <p className="text-sm text-gray-500">{lang === 'ar' ? 'أن نكون الخيار الأول لحلول الطاقة في مصر.' : 'To be the first choice for energy solutions in Egypt.'}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg shrink-0">
                     <Zap size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-white mb-1">{lang === 'ar' ? 'الابتكار' : 'Innovation'}</h4>
                     <p className="text-sm text-gray-500">{lang === 'ar' ? 'توفير أحدث تكنولوجيا البطاريات والطاقة النظيفة.' : 'Providing the latest battery technology and clean energy.'}</p>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};
