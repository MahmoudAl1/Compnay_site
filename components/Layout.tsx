
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { Menu, X, Phone, MapPin, Facebook, Instagram, Twitter, Globe } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  translations: any;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView, lang, setLang, translations }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang];

  const navItems = [
    { label: t.nav.home, view: ViewState.HOME },
    { label: t.nav.about, view: ViewState.ABOUT },
    { label: t.nav.products, view: ViewState.PRODUCTS },
    { label: t.nav.blog, view: ViewState.BLOG },
    { label: t.nav.contact, view: ViewState.CONTACT },
  ];

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleLogoClick = () => {
    setIsAnimating(true);
    onChangeView(ViewState.HOME);
    // Reset animation after it plays
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-black/50' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo Section */}
          <button 
            className="flex items-center gap-3 cursor-pointer group focus:outline-none" 
            onClick={handleLogoClick}
          >
            <div className={`relative w-12 h-12 flex items-center justify-center transition-transform duration-700 ${isAnimating ? 'scale-125 rotate-[360deg]' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${isAnimating ? 'animate-pulse bg-blue-400' : ''}`}></div>
              <div className="absolute inset-0 bg-slate-900 rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 border border-slate-700 flex items-center justify-center">
                 <svg 
                  viewBox="0 0 24 24" 
                  className={`w-7 h-7 text-blue-500 transition-colors duration-300 ${isAnimating ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              {/* Electric spark effect on click */}
              {isAnimating && (
                <div className="absolute inset-0 rounded-xl ring-4 ring-blue-400 opacity-0 animate-[ping_0.5s_ease-out]"></div>
              )}
            </div>
            <div className="flex flex-col items-start">
              <h1 className={`text-2xl font-black text-white leading-none tracking-tight font-sans transition-all duration-300 ${isAnimating ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white' : ''}`}>
                {lang === 'ar' ? 'السرجاني' : 'EL SERGANY'}
              </h1>
              <div className="flex items-center gap-1">
                <div className={`h-0.5 bg-blue-500 rounded-full transition-all duration-300 ${isAnimating ? 'w-full shadow-[0_0_10px_#3b82f6]' : 'w-4'}`}></div>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  {lang === 'ar' ? 'للبطاريات' : 'BATTERIES'}
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center bg-slate-900/50 backdrop-blur-md px-2 p-1.5 rounded-full border border-white/5 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onChangeView(item.view)}
                className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                  currentView === item.view 
                    ? 'text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-gray-300 hover:text-white font-bold text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition border border-white/5"
            >
              <Globe size={14} className="text-blue-500" />
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            <button 
              onClick={() => onChangeView(ViewState.CONTACT)}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-xl text-sm font-black transition-transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <span className="relative z-10">{t.nav.orderNow}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white bg-white/10 p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onChangeView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl font-bold transition-all ${
                   currentView === item.view 
                   ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                   : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
                {currentView === item.view && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
              </button>
            ))}
            <div className="h-px bg-slate-800 my-2"></div>
            <button 
              onClick={() => {
                toggleLang();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-800 text-white font-bold"
            >
              <Globe size={16} />
              {lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            </button>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content overlap */}
      <div className="h-24 hidden md:block"></div> 
    </>
  );
};

interface FooterProps {
  lang: Language;
  onChangeView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onChangeView }) => {
  const quickLinks = [
    { label: lang === 'ar' ? 'من نحن' : 'About Us', view: ViewState.ABOUT },
    { label: lang === 'ar' ? 'منتجاتنا' : 'Products', view: ViewState.PRODUCTS },
    { label: lang === 'ar' ? 'المدونة' : 'Blog', view: ViewState.BLOG },
    { label: lang === 'ar' ? 'فروعنا' : 'Branches', view: ViewState.CONTACT },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight">{lang === 'ar' ? 'السرجاني' : 'EL SERGANY'}</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-slate-800 pl-4">
              {lang === 'ar' 
                ? 'نقدم أفضل حلول الطاقة لسيارتك. خبرة تمتد لأكثر من 20 عاماً في مجال البطاريات.'
                : 'We provide the best energy solutions for your car. Over 20 years of experience in batteries.'}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/SerganyForBatteries/?locale=ar_AR" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 p-3 rounded-xl transition-all duration-300 text-gray-400 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800 hover:bg-pink-600 hover:text-white hover:border-pink-600 p-3 rounded-xl transition-all duration-300 text-gray-400 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800 hover:bg-sky-500 hover:text-white hover:border-sky-500 p-3 rounded-xl transition-all duration-300 text-gray-400 group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onChangeView(item.view)}
                    className="flex items-center gap-2 hover:text-blue-400 transition group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 group">
                <div className="bg-slate-900 p-2 rounded-lg text-gray-500 group-hover:text-blue-400 transition-colors">
                   <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">{lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}</h4>
                  <span className="text-sm">{lang === 'ar' ? 'الدقهلية، المنزلة، شارع عبد المنعم رياض' : 'Dakahlia, El Manzala, Abdel Moneim Riad St'}</span>
                </div>
              </li>
              <li className="flex items-center gap-4 text-gray-400 group">
                <div className="bg-slate-900 p-2 rounded-lg text-gray-500 group-hover:text-blue-400 transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                   <h4 className="text-white text-sm font-bold mb-1">{lang === 'ar' ? 'اتصل بنا' : 'Call Us'}</h4>
                   <span dir="ltr" className="text-sm hover:text-white transition">+20 120 400 2646</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} {lang === 'ar' ? 'السرجاني للبطاريات. جميع الحقوق محفوظة.' : 'El Sergany Batteries. All rights reserved.'}</p>
          <div className="flex gap-6">
            <button onClick={() => onChangeView(ViewState.CONTACT)} className="hover:text-white transition">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</button>
            <button onClick={() => onChangeView(ViewState.CONTACT)} className="hover:text-white transition">{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
