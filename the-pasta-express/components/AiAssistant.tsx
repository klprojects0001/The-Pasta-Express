
import React, { useState, useRef, useEffect } from 'react';
import { getFoodRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Pasta Buddy. Tell me what you are in the mood for, and I will recommend the perfect dish!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const recommendation = await getFoodRecommendation(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: recommendation }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-amber-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🍝</div>
              <div>
                <h3 className="font-bold leading-tight">Pasta Buddy</h3>
                <p className="text-[10px] text-amber-200 uppercase tracking-widest">AI Concierge</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-amber-800 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-2">
                  <div className="w-2 h-2 bg-amber-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for a recommendation..."
                className="flex-grow px-4 py-3 bg-slate-50 border-none focus:ring-2 focus:ring-amber-800 rounded-xl text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-amber-800 text-white p-3 rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-amber-800 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <span className="text-3xl">🍝</span>
          <div className="absolute -top-12 right-0 bg-white text-slate-800 text-xs px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Hungry? Ask me!
          </div>
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
