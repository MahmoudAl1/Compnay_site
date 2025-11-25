import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
  title: string;
  subtitle: string;
}

export const Contact: React.FC<ContactProps> = ({ lang, title, subtitle }) => {
  return (
    <div className="py-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">{title}</h2>
          <p className="text-gray-400 text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-10 border-b border-slate-800 pb-4">{lang === 'ar' ? 'بيانات الاتصال' : 'Contact Info'}</h3>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'الهاتف' : 'Phone'}</h4>
                  <p className="text-gray-400 mb-1 font-mono text-sm" dir="ltr">+20 122 268 6167</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'العنوان' : 'Address'}</h4>
                  <p className="text-gray-400 leading-relaxed">{lang === 'ar' ? 'المنزلة، شارع الرياح، شارع عبد المنعم رياض' : 'El Manzala, El Riah St, Abdel Moneim Riad St'}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h4>
                  <p className="text-gray-400">info@elsergany-batteries.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}</h4>
                  <p className="text-gray-400">{lang === 'ar' ? 'يومياً من 9 صباحاً حتى 11 مساءً' : 'Daily 9:00 AM - 11:00 PM'}</p>
                  <p className="text-gray-500 text-sm mt-1">{lang === 'ar' ? 'الجمعة من 1 ظهراً حتى 11 مساءً' : 'Friday 1:00 PM - 11:00 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-8">{lang === 'ar' ? 'أرسل رسالة' : 'Send Message'}</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                    <option>{lang === 'ar' ? 'استفسار عام' : 'General Inquiry'}</option>
                    <option>{lang === 'ar' ? 'طلب صيانة' : 'Maintenance Request'}</option>
                    <option>{lang === 'ar' ? 'شراء بطارية' : 'Buy Battery'}</option>
                    <option>{lang === 'ar' ? 'شكوى' : 'Complaint'}</option>
                  </select>
                   <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black py-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                <Send size={18} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};