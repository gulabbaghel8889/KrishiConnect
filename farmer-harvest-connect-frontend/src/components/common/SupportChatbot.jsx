import { useState, useRef, useEffect } from 'react';
import { HiOutlineChatAlt2, HiOutlineX, HiOutlineArrowLeft, HiOutlineSupport } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { FAQ_DATA } from '../../data/faqData';

export default function SupportChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const roleFaqs = FAQ_DATA[user?.role] || FAQ_DATA.farmer;

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { type: 'bot', text: `नमस्ते ${user?.name || ''}! मैं आपका कृषि कनेक्ट सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?` }
      ]);
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, selectedFaq]);

  const handleFaqClick = (faq) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: faq.question },
      { type: 'bot', text: faq.answer }
    ]);
    setSelectedFaq(faq);
  };

  const resetChat = () => {
    setSelectedFaq(null);
    setMessages([{ type: 'bot', text: 'क्या आपके पास कोई और सवाल है?' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-forest-600 hover:bg-forest-700 hover:scale-110'
        } text-white`}
      >
        {isOpen ? <HiOutlineX size={32} /> : <HiOutlineChatAlt2 size={32} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-forest-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-forest-600 p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <HiOutlineSupport size={24} />
            </div>
            <div>
              <h4 className="font-bold">कृषि सहायक (Support)</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Online Helping You</p>
            </div>
          </div>

          {/* Chat Body */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-forest-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-700 rounded-tl-none shadow-sm border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Predefined Questions */}
            {!selectedFaq && (
              <div className="space-y-2 pt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">एक प्रश्न चुनें:</p>
                {roleFaqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaqClick(faq)}
                    className="w-full text-left p-3 bg-white hover:bg-forest-50 border border-gray-100 rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-sm hover:border-forest-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            {selectedFaq && (
              <button
                onClick={resetChat}
                className="flex items-center gap-2 text-xs font-bold text-forest-600 hover:text-forest-800 p-2 mt-4"
              >
                <HiOutlineArrowLeft /> और सवाल पूछें
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-medium">Powering Sustainable Agriculture Connect</p>
          </div>
        </div>
      )}
    </div>
  );
}
