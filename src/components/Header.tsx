import { useState } from "react";
import { Menu, X, Globe, Leaf, ChevronDown, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageCode } from "../utils/translations";
// @ts-ignore
import logoDesa from "../assets/images/logo_desa_wisata_1781965528807.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
}

export default function Header({ activeTab, setActiveTab, lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { id: "beranda", labelID: "Beranda", labelEN: "Home", labelZH: "首页", labelKO: "홈페이지", labelVI: "Trang Chủ", labelLA: "Initium" },
    { id: "paket", labelID: "Paket Wisata", labelEN: "Tour Packages", labelZH: "特色旅游套餐", labelKO: "투어 패키지", labelVI: "Gói Du Lịch", labelLA: "Hospitia Itinerum" },
    { id: "budaya", labelID: "Budaya & Kuliner", labelEN: "Culture & Dining", labelZH: "文化美食", labelKO: "문화 & 먹거리", labelVI: "Văn Hóa", labelLA: "Cultus & Cibus" },
    { id: "drive", labelID: "Uploader & Drive", labelEN: "Uploader & Drive", labelZH: "云存储与网盘", labelKO: "업로더 & 드라이브", labelVI: "Bộ Nhớ & Drive", labelLA: "Uploader & Drive" },
    { id: "kuis", labelID: "Kuis Trivia", labelEN: "Trivia Quiz", labelZH: "问答测试", labelKO: "퀴즈 대결", labelVI: "Câu Hỏi Vui", labelLA: "Probatio" },
  ];

  const languagesList: { code: LanguageCode; label: string; flag: string; short: string }[] = [
    { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩", short: "ID" },
    { code: "en", label: "English", flag: "🇺🇸", short: "EN" },
    { code: "zh", label: "中文 (Chinese)", flag: "🇨🇳", short: "ZH" },
    { code: "ko", label: "한국어 (Korean)", flag: "🇰🇷", short: "KO" },
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", short: "VI" },
    { code: "la", label: "Latina (Latin)", flag: "🏛️", short: "LA" },
  ];

  const currentLangObj = languagesList.find((l) => l.code === lang) || languagesList[0];

  const handleMobileClick = (itemId: string) => {
    setActiveTab(itemId);
    setMobileMenuOpen(false);
  };

  const getMenuLabel = (item: typeof menuItems[0]) => {
    switch (lang) {
      case "zh": return item.labelZH;
      case "ko": return item.labelKO;
      case "vi": return item.labelVI;
      case "la": return item.labelLA;
      case "en": return item.labelEN;
      default: return item.labelID;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-sand-50/90 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab("beranda")} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="logo-brand"
          >
            <div className="h-12 w-12 rounded-full overflow-hidden border border-sand-300 shadow-md group-hover:scale-110 transition-all duration-300 flex items-center justify-center bg-white">
              <img 
                src={logoDesa} 
                alt="Logo Desa Wisata Talawaan" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="block text-[10px] font-sans font-bold tracking-widest text-gold-600 uppercase leading-none mb-0.5">
                DESA WISATA
              </span>
              <span className="block font-display text-lg font-extrabold tracking-wider text-forest-800 uppercase leading-none">
                TALAWAAN
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" id="desktop-nav">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                    active 
                      ? "text-forest-700 font-semibold" 
                      : "text-gray-600 hover:text-forest-600 hover:bg-forest-50"
                  }`}
                >
                  {getMenuLabel(item)}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-forest-600 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Actions: Language Dropdown Selector */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Admin Portal Gateway */}
            <button
              id="desktop-admin-portal-btn"
              onClick={() => setActiveTab("admin")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-sm border transition-all duration-200 cursor-pointer ${
                activeTab === "admin"
                  ? "bg-forest-600 text-white border-forest-600"
                  : "bg-white hover:bg-sand-100/50 text-gray-700 hover:text-forest-700 border-sand-200"
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>{lang === "id" ? "Portal Admin" : "Admin Portal"}</span>
            </button>

            <button
              id="desktop-lang-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              className="flex items-center space-x-2 px-3 py-2 bg-white hover:bg-sand-100/80 text-gray-700 hover:text-forest-700 rounded-xl border border-sand-200 text-xs font-semibold shadow-sm transition-all duration-200"
            >
              <Globe className="h-4 w-4 text-forest-600 animate-spin-slow" />
              <span>{currentLangObj.flag} {currentLangObj.label}</span>
              <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 top-12 w-52 bg-white border border-sand-200 rounded-2xl shadow-xl py-2 z-50 class-lang-dropdown"
                >
                  {languagesList.map((l) => (
                    <button
                      key={l.code}
                      id={`lang-select-${l.code}`}
                      onClick={() => {
                        setLang(l.code);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-3 transition-colors duration-250 ${
                        lang === l.code
                          ? "bg-forest-50 text-forest-800 font-bold"
                          : "text-gray-600 hover:bg-sand-50"
                      }`}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile controllers */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Lang cycler or inline flag drawer drawer toggle */}
            <button
              id="lang-btn-mobile-toggle"
              onClick={() => {
                // Cycle through languages: id -> en -> zh -> ko -> vi -> la -> id
                const idx = languagesList.findIndex((item) => item.code === lang);
                const nextIdx = (idx + 1) % languagesList.length;
                setLang(languagesList[nextIdx].code);
              }}
              className="p-2 text-gray-600 hover:text-forest-600 bg-sand-100 hover:bg-forest-50 rounded-xl border border-sand-200 flex items-center space-x-1 transition-all duration-200"
            >
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="text-[10px] uppercase font-mono font-extrabold">{currentLangObj.short}</span>
            </button>

            {/* Hamburger menu */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-forest-600 bg-sand-100 hover:bg-forest-50 rounded-xl border border-sand-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden border-t border-sand-200 bg-sand-50 px-4 pt-2 pb-6 space-y-4 shadow-lg"
          id="mobile-drawer"
        >
          {/* Main active subpages */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => handleMobileClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-smooth flex items-center ${
                    active
                      ? "bg-forest-600 text-sand-50 shadow-sm"
                      : "text-gray-600 hover:bg-forest-50 hover:text-forest-600"
                  }`}
                >
                  {getMenuLabel(item)}
                </button>
              );
            })}
          </div>

          {/* Quick Select Grid for Mobile Languages */}
          <div className="border-t border-sand-200/60 pt-4">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2 md:px-2">
              {lang === "id" ? "PILIH BAHASA" : "CHOOSE LANGUAGE"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {languagesList.map((item) => (
                <button
                  key={item.code}
                  id={`mobile-lang-select-${item.code}`}
                  onClick={() => setLang(item.code)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                    lang === item.code
                      ? "bg-forest-100 border-forest-300 text-forest-800 font-bold"
                      : "bg-white border-sand-200 text-gray-600 hover:bg-sand-100"
                  }`}
                >
                  <span className="text-sm leading-none">{item.flag}</span>
                  <span>{item.short} — {item.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Admin link for mobile */}
          <div className="border-t border-sand-200/60 pt-4 flex flex-col">
            <button
              id="mobile-admin-portal-btn"
              onClick={() => handleMobileClick("admin")}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "admin"
                  ? "bg-forest-600 border-forest-600 text-white"
                  : "bg-white border-sand-200 text-gray-700 hover:bg-sand-100"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>{lang === "id" ? "Portal Admin (Verifikasi)" : "Admin Portal (Verify)"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
