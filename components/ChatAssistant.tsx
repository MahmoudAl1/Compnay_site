import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, BatteryCharging } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAssistantProps {
  lang: Language;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset welcome message when language changes
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: lang === 'ar' 
          ? 'مرحباً بك في السرجاني للبطاريات! 🚗⚡ كيف يمكنني مساعدتك اليوم في اختيار بطاريتك أو صيانتها؟' 
          : 'Welcome to El Sergany Batteries! 🚗⚡ How can I help you choose your battery or maintain it today?',
        timestamp: new Date()
      }
    ]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 z-50 flex flex-col items-end pointer-events-none ltr:right-6 rtl:left-6" style={{ [lang === 'ar' ? 'left' : 'right']: '1.5rem', [lang === 'ar' ? 'right' : 'left']: 'auto' }}>
      {/* Chat Window */}
      <div 
        className={`bg-slate-900 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 pointer-events-auto border border-slate-700 ${
          isOpen ? 'opacity-100 translate-y-0 mb-4' : 'opacity-0 translate-y-10 h-0 mb-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-white" />
            <div>
              <h3 className="font-black text-lg leading-none">{lang === 'ar' ? 'مساعد السرجاني' : 'El Sergany Bot'}</h3>
              <span className="text-[10px] font-bold opacity-80 uppercase">{lang === 'ar' ? 'متصل الآن - ذكاء اصطناعي' : 'Online - AI Assistant'}</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-full transition text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="h-96 overflow-y-auto p-4 bg-slate-950 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 max-w-[90%] ${
                msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' ? 'bg-slate-800 border-slate-700 text-gray-300' : 'bg-blue-600 border-blue-600 text-white'
                }`}
              >
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-tl-none border border-slate-700'
                    : 'bg-slate-900 text-gray-200 border border-slate-800 rounded-tr-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 self-start">
               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <BatteryCharging size={16} className="animate-pulse" />
              </div>
              <div className="bg-slate-900 p-3 rounded-2xl rounded-tr-none border border-slate-800">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={lang === 'ar' ? "اسأل عن بطاريتك..." : "Ask about your battery..."}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none placeholder-gray-600 transition"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/10"
          >
            <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white p-4 rounded-full shadow-lg shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2 group border border-blue-400/20"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-black text-sm">
          {lang === 'ar' ? 'اسأل الخبير' : 'Ask Expert'}
        </span>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};