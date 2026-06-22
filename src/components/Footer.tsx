import { MapPin, Phone, Mail, Clock, Heart, Instagram, Facebook, Youtube } from "lucide-react";
import { LanguageCode, translations } from "../utils/translations";

interface FooterProps {
  lang: LanguageCode;
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ lang, setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations[lang] || translations.id;

  const getCraftedText = () => {
    switch (lang) {
      case "en": return "Crafted with";
      case "zh": return "精心制作于";
      case "ko": return "제작됨";
      case "vi": return "Thiết kế với";
      case "la": return "Manufactum cum";
      default: return "Dibuat dengan";
    }
  };

  const getInText = () => {
    switch (lang) {
      case "zh": return "";
      case "ko": return "에서";
      case "la": return "in";
      default: return "in";
    }
  };

  return (
    <footer className="bg-forest-950 text-sand-100 border-t border-forest-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
          
          {/* Logo Brand Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-gold-500 text-forest-950 p-2 rounded-xl">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block">
                  Desa Wisata <span className="text-gold-500 font-light">Talawaan</span>
                </span>
                <span className="block text-[9px] font-mono tracking-widest text-sand-300 uppercase leading-none mt-0.5">
                  Minahasa Utara, Sulawesi Utara
                </span>
              </div>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-sand-200 leading-relaxed max-w-sm font-medium">
              {t.footerSlogan}
            </p>

            {/* Social Media links */}
            <div className="pt-4 space-y-2 select-none" id="footer-socials">
              <span className="block text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                {lang === "id" ? "Ikuti Media Sosial Kami" : "Follow Our Socials"}
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-social-instagram"
                  className="bg-forest-900 hover:bg-forest-800 text-sand-100 hover:text-gold-400 p-2.5 rounded-xl border border-forest-900 hover:border-forest-850/80 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center cursor-pointer"
                  aria-label="Instagram Desa Talawaan"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-social-facebook"
                  className="bg-forest-900 hover:bg-forest-800 text-sand-100 hover:text-gold-400 p-2.5 rounded-xl border border-forest-900 hover:border-forest-850/80 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center cursor-pointer"
                  aria-label="Facebook Desa Talawaan"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-social-youtube"
                  className="bg-forest-900 hover:bg-forest-800 text-sand-100 hover:text-gold-400 p-2.5 rounded-xl border border-forest-900 hover:border-forest-850/80 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center cursor-pointer"
                  aria-label="YouTube Desa Talawaan"
                >
                  <Youtube className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Office Contact Directories */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gold-500 uppercase tracking-widest border-b border-forest-900 pb-2">
              {t.footerTitleTownhall}
            </h4>
            
            <ul className="space-y-2.5 text-xs text-sand-200 font-medium">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Jl. Air Terjun Tunan, Jaga I, Desa Talawaan, Minahasa Utara, Kode Pos 95373</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                <span>+62 812-4455-XXX (Hukum Tua Desa)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                <span>layanan@talawaan-info.desa.id</span>
              </li>
            </ul>
          </div>

          {/* Office hour timings */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gold-500 uppercase tracking-widest border-b border-forest-900 pb-2">
              {t.footerTitleHours}
            </h4>

            <div className="space-y-3.5 text-xs text-sand-200 font-medium">
              <div className="flex items-start space-x-2.5">
                <Clock className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">{t.footerHoursDays}</span>
                  <span className="block text-forest-200 mt-0.5">{t.footerHoursTimings}</span>
                </div>
              </div>
              <div className="text-[10px] text-forest-200 bg-forest-900/40 border border-forest-900/80 p-3 rounded-xl leading-relaxed font-normal">
                {t.footerHoursNote}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright banner */}
        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row justify-between items-center text-xs text-sand-300 space-y-4 sm:space-y-0">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span>&copy; {currentYear} Pemerintah Desa Talawaan. Indonesia. All rights reserved.</span>
            {setActiveTab && (
              <button 
                onClick={() => {
                  setActiveTab("admin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                id="footer-admin-login-link"
                className="hover:text-gold-400 font-bold tracking-widest transition-colors inline-flex items-center space-x-1 cursor-pointer select-none text-[10px] uppercase font-mono text-sand-400 mt-1.5"
              >
                <span>&bull; {lang === "id" ? "Portal Verifikasi Admin" : "Admin Verification Portal"}</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-wider bg-forest-900/50 px-3 py-1.5 rounded-full border border-forest-900 text-sand-200">
            <span>{getCraftedText()}</span>
            <Heart className="h-3 w-3 text-red-500 fill-current animate-bounce" />
            <span>{getInText()} Minahasa Utara</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
