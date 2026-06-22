import { MapPin, Plane, Award, Users, Compass } from "lucide-react";
import { motion } from "motion/react";
import { LanguageCode, translations } from "../utils/translations";
// @ts-ignore
import tunanHero from "../assets/images/tunan_waterfall_original_aspect_1781966838445.jpg";

interface HeroProps {
  setActiveTab: (tab: string) => void;
  lang: LanguageCode;
}

export default function Hero({ setActiveTab, lang }: HeroProps) {
  const t = translations[lang] || translations.id;

  // Stats data
  const stats = [
    {
      id: "stat-1",
      icon: <Compass className="h-6 w-6 text-forest-600" />,
      value: "18.5 km²",
      labelVal: t.heroAreaLabel,
      desc: t.heroAreaDesc,
    },
    {
      id: "stat-2",
      icon: <Users className="h-6 w-6 text-forest-600" />,
      value: "~3,560",
      labelVal: t.heroPopLabel,
      desc: t.heroPopDesc,
    },
    {
      id: "stat-3",
      icon: <Award className="h-6 w-6 text-forest-600" />,
      value: "86 M",
      labelVal: t.heroWaterLabel,
      desc: t.heroWaterDesc,
    },
    {
      id: "stat-4",
      icon: <Plane className="h-6 w-6 text-forest-600" />,
      value: "15 Min",
      labelVal: t.heroAirLabel,
      desc: t.heroAirDesc,
    },
  ];

  return (
    <motion.div
      id="section-hero"
      className="relative overflow-hidden bg-sand-50 py-16 lg:py-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Decorative leafy/gradient bubble */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-forest-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gold-50/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Welcoming Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-forest-700 animate-bounce" />
              <span>
                {t.heroBadge}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
              {t.heroTitleRegular1}
              <span className="italic font-normal text-forest-700">{t.heroTitleItalic}</span>
              {t.heroTitleRegular2}
            </h1>

            <p className="font-sans text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => setActiveTab("paket")}
                className="bg-forest-600 hover:bg-forest-700 text-sand-50 hover:shadow-lg px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {t.heroBtnExplore}
              </button>
              <button
                id="hero-ai-chat-btn"
                onClick={() => setActiveTab("asisten")}
                className="bg-transparent hover:bg-sand-100 text-forest-700 border border-forest-600/30 hover:border-forest-600/80 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300"
              >
                {t.heroBtnAI}
              </button>
            </div>
          </div>

          {/* Visual Presentation Card Column */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 relative">
            <div className="aspect-3/2 rounded-3xl overflow-hidden hover:shadow-2xl shadow-xl border-4 border-white/60 transition-all duration-500 transform hover:scale-[1.01]">
              <img
                src={tunanHero}
                alt="Tropical Forest Waterfall"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="font-serif text-white text-xl font-bold tracking-wide">
                  Air Terjun Tunan
                </span>
                <span className="text-sand-100 text-xs font-mono tracking-wider">
                  {t.heroTunanCaption}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Highlight grid */}
        <div id="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white border border-sand-100 hover:border-forest-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-forest-50 p-3 rounded-xl w-fit mb-4">
                {stat.icon}
              </div>
              <span className="block font-display text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="block text-xs font-semibold text-forest-800 uppercase tracking-wider mt-1">
                {stat.labelVal}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Narrative introduction card */}
        <div className="mt-16 bg-white border border-sand-100 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-forest-100/30 blur-2xl" />
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold uppercase text-gold-600 tracking-widest">
                {t.historyBadge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                {t.historyTitle}
              </h3>
            </div>
            <div className="lg:col-span-8 text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                {t.historyDesc1}
              </p>
              <p>
                {t.historyDesc2}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
