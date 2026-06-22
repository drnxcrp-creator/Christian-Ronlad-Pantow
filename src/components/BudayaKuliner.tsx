import { useState } from "react";
import { Utensils, BookOpen, Clock, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageCode, translations } from "../utils/translations";

interface BudayaProps {
  lang: LanguageCode;
}

export default function BudayaKuliner({ lang }: BudayaProps) {
  const [filter, setFilter] = useState<"semua" | "kuliner" | "budaya">("semua");

  const t = translations[lang] || translations.id;

  // Cultural/Food Data Combined with translated keys
  const items = [
    {
      id: "klappertaart",
      type: "kuliner",
      name: lang === "la" ? "Placentula Klappertaart" : lang === "zh" ? "椰子挞 (Klappertaart)" : lang === "ko" ? "클라페르타르트 디저트" : lang === "vi" ? "Bánh Dừa Klappertaart" : lang === "en" ? "Klappertaart Talawaan" : "Klappertaart Talawaan",
      description: t.klapDesc,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600",
      tags: t.klapTags || (lang === "id" ? ["Manis", "Warisan Belanda", "Oleh-Oleh"] : ["Sweet", "Dutch Heritage", "Souvenir"]),
      tips: t.klapTips,
    },
    {
      id: "tinutuan",
      type: "kuliner",
      name: lang === "la" ? "Chondrus Tinutuan" : lang === "zh" ? "美娜多健康蔬菜粥" : lang === "ko" ? "티누투안 (미나하사 영양 완두죽)" : lang === "vi" ? "Cháo Rau Tinutuan" : lang === "en" ? "Tinutuan (Manado Porridge)" : "Tinutuan (Bubur Manado)",
      description: t.tinuDesc,
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
      tags: t.tinuTags || (lang === "id" ? ["Gurih", "Kaya Serat", "Sarapan Utama"] : ["Savory", "High Fiber", "Traditional Breakfast"]),
      tips: t.tinuTips,
    },
    {
      id: "nasi-kuning",
      type: "kuliner",
      name: lang === "la" ? "Oryza Flava Woka" : lang === "zh" ? "沃卡叶黄姜饭" : lang === "ko" ? "워카 잎 황금강반 (노란밥)" : lang === "vi" ? "Cơm Vàng Lá Woka" : lang === "en" ? "Nasi Kuning Daun Woka" : "Nasi Kuning Daun Woka",
      description: t.nasiDesc,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
      tags: t.nasiTags || (lang === "id" ? ["Padat Gurih", "Aroma Alami", "Bungkusan Unik"] : ["Rich Savory", "Herb Aroma", "Artisanal Wrapper"]),
      tips: t.nasiTips,
    },
    {
      id: "kolintang",
      type: "budaya",
      name: lang === "la" ? "Musica Kolintang" : lang === "zh" ? "木琴敲击乐 (Kolintang)" : lang === "ko" ? "콜린탕 전통 목판 타악" : lang === "vi" ? "Nhã Nhạc Gỗ Kolintang" : lang === "en" ? "Kolintang Wood Music" : "Seni Musik Kolintang",
      description: t.kolinDesc,
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600",
      tags: t.kolinTags || (lang === "id" ? ["Alat Musik Kayu", "Warisan Budaya", "Kesenian Rakyat"] : ["Timber Percussion", "National Heritage", "Traditional Folk"]),
      tips: t.kolinTips,
    },
    {
      id: "mapalus",
      type: "budaya",
      name: lang === "la" ? "Consociatio Mapalus" : lang === "zh" ? "“马帕卢斯”互助哲学" : lang === "ko" ? "마팔루스 상부상조 정신" : lang === "vi" ? "Triết Lý Cộng Đồng Mapalus" : lang === "en" ? "Traditional Plan of Mapalus" : "Filsafah Adat Mapalus",
      description: t.mapaDesc,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600",
      tags: t.mapaTags || (lang === "id" ? ["Gotong Royong", "Nilai Sosial", "Adat Leluhur"] : ["Mutual Aid", "Social Safety", "Ancestral Custom"]),
      tips: t.mapaTips,
    },
  ];

  const filteredItems = items.filter(
    (item) => filter === "semua" || item.type === filter
  );

  return (
    <div id="section-budaya" className="bg-sand-50 py-16 sm:py-20 relative overflow-hidden">
      
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest block">
            {t.budayaBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold">
            {t.budayaTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            {t.budayaSubtitle}
          </p>

          {/* Filter Controller buttons */}
          <div className="flex justify-center flex-wrap gap-2 pt-4">
            <button
              id="filter-btn-semua"
              onClick={() => setFilter("semua")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === "semua"
                  ? "bg-forest-600 text-sand-50 shadow-md"
                  : "bg-sand-100 text-gray-600 hover:bg-sand-200"
              }`}
            >
              {t.filterAll}
            </button>
            <button
              id="filter-btn-kuliner"
              onClick={() => setFilter("kuliner")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
                filter === "kuliner"
                  ? "bg-forest-600 text-sand-50 shadow-md"
                  : "bg-sand-100 text-gray-600 hover:bg-sand-200"
              }`}
            >
              <Utensils className="h-3.5 w-3.5" />
              <span>{t.filterCuisine}</span>
            </button>
            <button
              id="filter-btn-budaya"
              onClick={() => setFilter("budaya")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
                filter === "budaya"
                  ? "bg-forest-600 text-sand-50 shadow-md"
                  : "bg-sand-100 text-gray-600 hover:bg-sand-200"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{t.filterCulture}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          id="budaya-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                id={`card-item-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-sand-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-sand-50 border border-sand-300/40 text-[10px] font-bold uppercase tracking-widest text-forest-800 px-3 py-1 rounded-full shadow-sm">
                      {item.type === "kuliner" ? (lang === "id" ? "KULINER" : "CUISINE") : (lang === "id" ? "BUDAYA" : "FOLKLORE")}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-sand-100 text-gray-500 text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practical Tips Box */}
                <div className="p-6 pt-0">
                  <div className="bg-gold-50/50 rounded-2xl border border-gold-500/20 p-4 flex items-start space-x-2.5">
                    <Lightbulb className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="block text-[10px] font-extrabold uppercase text-gold-700 tracking-wider font-mono">
                        {t.tipBadge}
                      </span>
                      <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                        {item.tips}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Local Cacal fufu culinary tutorial quote */}
        <div className="mt-16 bg-forest-900 rounded-3xl text-sand-50 p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-forest-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10 text-left">
            <span className="text-[10px] font-mono tracking-widest text-gold-500 font-bold uppercase inline-flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {t.kitchenBadge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              {t.kitchenTitle}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-sand-100 leading-relaxed max-w-2xl">
              {t.kitchenDesc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
