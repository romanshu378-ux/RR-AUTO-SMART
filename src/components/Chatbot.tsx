
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { COMPANY_DETAILS } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am the RR AUTO SMART Assistant. How can I help you with your smart home or industrial IoT needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a helpful and professional customer support assistant for "RR AUTO SMART". 
          Company Details:
          Contact Person: ${COMPANY_DETAILS.name}
          Phone: ${COMPANY_DETAILS.phone}
          Address: ${COMPANY_DETAILS.address}
          Services: Smart Home Automation, Industrial IoT, Building Automation, Energy Management.
          Goal: Answer customer questions politely, explain IoT benefits, and encourage them to contact Romanshu Sharma for a quote. 
          Keep answers concise and professional. Use the company name RR AUTO SMART in your responses when appropriate.`,
        },
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI assistant. Please contact us directly via WhatsApp." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] shadow-2xl rounded-sm border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-brand-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-xs">RR</div>
              <div>
                <p className="font-bold text-sm tracking-wide">RR AUTO SMART AI</p>
                <p className="text-[10px] text-blue-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-sm ${
                  m.role === 'user' 
                  ? 'bg-brand-primary text-white rounded-l-lg rounded-tr-lg' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-r-lg rounded-tl-lg'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 shadow-sm border border-slate-100 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our services..." 
                className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-brand-primary"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-brand-primary text-white w-10 h-10 flex items-center justify-center rounded-sm hover:bg-brand-accent transition-colors disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl shadow-2xl hover:bg-brand-accent transition-all hover:scale-110"
          title="Chat with AI"
        >
          <i className="fa-solid fa-robot"></i>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
