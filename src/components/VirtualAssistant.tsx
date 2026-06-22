import React, { useState, useRef, useEffect } from "react";
import { Send, HelpCircle, Compass, Smile, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

interface ChatProps {
  lang: "id" | "en";
}

export default function VirtualAssistant({ lang }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Suggested Quick Chips
  const suggestionsID = [
    "Berapa tiket ke Air Terjun Tunan?",
    "Rekomendasi kuliner khas Talawaan",
    "Di mana lokasi desa & rute terdekat?",
    "Bagaimana mengurus surat domisili?",
  ];

  const suggestionsEN = [
    "How much is Tunan Waterfall fee?",
    "Best traditional food in Talawaan",
    "Where is the exact location & map?",
    "How do I apply for residence letters?",
  ];

  const suggestions = lang === "id" ? suggestionsID : suggestionsEN;

  // Initialize companion greeting on load
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: ChatMessage = {
        id: "greet-1",
        role: "assistant",
        content: lang === "id" 
          ? "Syalom! Halo kawanua dan pengunjung setia! Saya **Mona**, asisten AI virtual resmi Desa Talawaan, Minahasa Utara.\n\nAda yang bisa saya bantu hari ini? Anda boleh menanyakan info wisata Air Terjun Tunan, kuliner Klappertaart, kebudayaan daerah Tonsea, atau cara praktis pengisian form administrasi surat keterangan mandiri di website ini."
          : "Shalom! Hello traveler! I am **Mona**, your official AI Virtual Guide for Talawaan Village, North Minahasa.\n\nHow can I enrich your journey? Ask me about the gorgeous Tunan Waterfall (Rp 10,000 entrance), local copra farms, iconic Manado porridge (Tinutuan), or self-serve citizen administrative papers.",
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [lang]);

  // Keep scrolls at current bottom
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Re-map messages history as a simple array for the back-end
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (!res.ok) {
        throw new Error(lang === "id" ? "Gagal terhubung dengan server." : "Failed to retrieve from assistant.");
      }

      const data = await res.json();
      const replyText = data.reply || (lang === "id" ? "Mohon maaf, saya belum bisa merumuskan jawaban itu." : "Pardon me, I was unable to process that query.");

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content: replyText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat fetch failure:", err);
      setErrorText(lang === "id" 
        ? "Maaf, Mona saat ini sedang istirahat. Hubungi admin atau coba sesaat lagi!" 
        : "Sorry, Mona is briefly unresponsive. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div id="section-chat-asisten" className="bg-sand-50 py-16 sm:py-20 relative overflow-hidden">
      
      {/* Soft natural BG decorative circle */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-forest-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Assistant Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <div className="bg-forest-100 p-2.5 rounded-2xl text-forest-700 inline-flex shadow-inner">
            <Sparkles className="h-6 w-6 text-gold-600 animate-pulse" />
          </div>
          <span className="block font-mono text-xs uppercase tracking-widest font-bold text-gold-600">
            {lang === "id" ? "PANDUAN PINTAR GEMINI" : "GEMINI POWERED CONCIERGE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold">
            {lang === "id" ? "Sapa Mona - Pendamping Virtual Anda" : "Talk to Mona - AI Virtual Assistant"}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500">
            {lang === "id"
              ? "Pertanyaan dibatasi khusus hanya mengenai keindahan Air Terjun Tunan dan informasi seputar Desa Talawaan."
              : "Questions are strictly limited to Tunan Waterfall and information surrounding Talawaan Village."}
          </p>
        </div>

        {/* Core Chat Console Panel */}
        <div className="bg-white border border-sand-200 rounded-4xl shadow-xl flex flex-col h-[550px] overflow-hidden">
          
          {/* Header of the Console */}
          <div className="bg-forest-600 px-6 py-4 flex items-center justify-between shadow-md select-none shrink-0">
            <div className="flex items-center space-x-3 text-left">
              <div className="bg-sand-50 p-2 rounded-xl text-forest-700 animate-bounce">
                <Smile className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sand-50 text-base font-bold font-display leading-tight">
                  Mona
                </h4>
                <div className="flex items-center text-[10px] text-green-200 font-semibold tracking-wider uppercase mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-1.5 animate-ping" />
                  {lang === "id" ? "ASISTEN AKTIF • SIAP MEMBANTU" : "ACTIVE GUIDE • ONLINE"}
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-sand-100 bg-forest-800 border border-forest-500/40 px-2 rounded-md">
              v1.5
            </div>
          </div>

          {/* Messages Body wrapper */}
          <div className="grow overflow-y-auto p-6 space-y-4 bg-sand-50/40" id="chat-messages-container">
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const user = m.role === "user";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${user ? "justify-end" : "justify-start"} text-left`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                        user
                          ? "bg-forest-600 text-sand-50 rounded-br-none"
                          : "bg-white border border-sand-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start text-left"
                >
                  <div className="bg-white border border-sand-200 rounded-2xl rounded-bl-none p-4 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              {/* Error overlay alert */}
              {errorText && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}
            </AnimatePresence>
            <div ref={listEndRef} />
          </div>

          {/* Suggestions Tray */}
          <div className="px-6 py-3 border-t border-sand-250 bg-white flex flex-wrap gap-2 justify-start shrink-0 select-none">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                id={`sug-chip-${idx}`}
                disabled={isLoading}
                onClick={() => handleSendMessage(sug)}
                className="bg-sand-50 hover:bg-forest-100 border border-sand-200 hover:border-forest-600/30 text-gray-500 hover:text-forest-800 text-[11px] rounded-lg py-1.5 px-3 transition-all duration-200 text-left cursor-pointer disabled:opacity-50"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Form input console */}
          <div className="p-4 bg-white border-t border-sand-250 shrink-0 select-none">
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                id="chat-input-text"
                type="text"
                disabled={isLoading}
                placeholder={lang === "id" ? "Tanyakan hal baru seputar Talawaan..." : "Ask Mona anything about Talawaan..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="grow border border-sand-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-forest-600/60 bg-sand-50 focus:bg-white transition-colors duration-200 disabled:opacity-50"
              />
              <button
                id="chat-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-forest-600 hover:bg-forest-700 text-sand-50 p-3 rounded-xl shadow hover:shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-40 select-none touch-target shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
