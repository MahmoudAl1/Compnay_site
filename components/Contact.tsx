
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
  title: string;
  subtitle: string;
}

export const Contact: React.FC<ContactProps> = ({ lang, title, subtitle }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const subject = formData.subject || (lang === 'ar' ? 'استفسار عام' : 'General Inquiry');

    try {
      await fetch("https://formsubmit.co/ajax/elserganycompany@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New message from El Sergany Website: ${subject}`,
            _template: "box",
            name: formData.name,
            email: formData.email,
            Phone: formData.phone,
            Subject: subject,
            Message: formData.message
        })
      });

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert(lang === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Error sending message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'الفرع الرئيسي' : 'Main Branch'}</h4>
                  <p className="text-gray-400 leading-relaxed">{lang === 'ar' ? 'دمياط، دمياط الجديدة، أمام نادي المستقبل' : 'Damietta, New Damietta, In front of Future Club'}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'الفرع الآخر' : 'The Other Branch'}</h4>
                  <p className="text-gray-400 leading-relaxed">{lang === 'ar' ? 'الدقهلية، المنزلة، شارع عبد المنعم رياض' : 'Dakahlia, El Manzala, Abdel Moneim Riad St'}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h4>
                  <p className="text-gray-400">elserganycompany@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'الهاتف' : 'Phone'}</h4>
                  <p className="text-gray-400 mb-1 font-mono text-sm" dir="ltr">+201014137107</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-8">{lang === 'ar' ? 'أرسل رسالة (البريد الإلكتروني)' : 'Send Message (Email)'}</h3>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
                <div className="bg-green-500/20 text-green-500 p-4 rounded-full mb-4">
                  <CheckCircle size={48} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}</h4>
                <p className="text-gray-400">{lang === 'ar' ? 'سنتواصل معك في أقرب وقت ممكن.' : 'We will get back to you as soon as possible.'}</p>
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
                <div className="relative">
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  >
                    <option value="">{lang === 'ar' ? 'اختر الموضوع...' : 'Select Subject...'}</option>
                    <option value="General Inquiry">{lang === 'ar' ? 'استفسار عام' : 'General Inquiry'}</option>
                    <option value="Maintenance Request">{lang === 'ar' ? 'طلب صيانة' : 'Maintenance Request'}</option>
                    <option value="Buy Battery">{lang === 'ar' ? 'شراء بطارية' : 'Buy Battery'}</option>
                    <option value="Complaint">{lang === 'ar' ? 'شكوى' : 'Complaint'}</option>
                  </select>
                   <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                ></textarea>
              </div>

              <button disabled={isLoading} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black py-4 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                    <Send size={18} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </>
                )}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
