/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Wisata from "./components/Wisata";
import BudayaKuliner from "./components/BudayaKuliner";
import VirtualAssistant from "./components/VirtualAssistant";
import KuisTrivia from "./components/KuisTrivia";
import Footer from "./components/Footer";
import PaketWisata from "./components/PaketWisata";
import AdminPortal from "./components/AdminPortal";
import GaleriDrive from "./components/GaleriDrive";
import { LanguageCode, translations } from "./utils/translations";
// @ts-ignore
import monaAvatar from "./assets/images/mona_avatar_1781970146678.jpg";

// Quick navigation icons / panels for Home page teasers
import { Compass, Utensils, ArrowRight, Sparkles, Trophy, Star, Quote, ArrowUp, MessageSquare, Bot } from "lucide-react";

const reviewsData = [
  {
    name: "Andi Saputra",
    location: {
      id: "Jakarta, Indonesia",
      en: "Jakarta, Indonesia",
      zh: "雅加达，印度尼西亚",
      ko: "인도네시아 자카르타",
      vi: "Jakarta, Indonesia",
      la: "Iakarta, Indonesia"
    },
    rating: 5,
    date: "Mei 2026",
    avatarBg: "bg-emerald-100 text-emerald-800",
    initials: "AS",
    quote: {
      id: "Sangat luar biasa! Debit air terjunnya deras sekali dan udaranya begitu sejuk sampai radius 50 meter. Trek jalannya rapi dan dikelilingi hutan rimbun alami. Wajib dikunjungi bersama keluarga!",
      en: "Absolutely breathtaking! The waterfall is extremely powerful and the cool mist is so refreshing even from 50 meters away. The pathway is well-paved and surrounded by raw tropical jungle. A must-visit!",
      zh: "绝对令人叹为观止！瀑布流量极大，即使在50米开外也能感受到凉爽的水雾。步道修得很好，四周环绕着原始热带雨林。家庭游玩必去！",
      ko: "정말 숨이 멎을 정도로 웅장합니다! 물줄기가 아주 거세고 50미터 밖에서도 시원한 물보라가 날아옵니다. 보행로가 아주 잘 정비되어 있고 울창한 정글로 둘러싸여 있어 가족 휴양지로 강추합니다!",
      vi: "Hoàn toàn ngoạn mục! Thác nước chảy cực kỳ mạnh và hơi nước mát rượi lan tỏa xa tới 50 mét. Đường đi bộ được lát đá rất đẹp giữa rừng rậm nguyên sinh. Rất đáng trải nghiệm cùng gia đình!",
      la: "Profecto mirabile! Flumen cataractae validissimum est et nebula frigida reficit usque ad L metra. Via bene structa et silva densa circumdatur. Cum familia visitandum est!"
    }
  },
  {
    name: "Sarah Jenkins",
    location: {
      id: "Melbourne, Australia",
      en: "Melbourne, Australia",
      zh: "墨尔本，澳大利亚",
      ko: "호주 멜버른",
      vi: "Melbourne, Australia",
      la: "Melburnia, Australia"
    },
    rating: 5,
    date: "April 2026",
    avatarBg: "bg-amber-105 text-amber-850",
    initials: "SJ",
    quote: {
      id: "Air Terjun Tunan adalah permata tersembunyi di Sulawesi Utara. Aksesnya mudah dari jalan utama, rimbun, bersih, dan sangat menenangkan. Kami sempat mencoba berenang di area tepi kolamnya yang segar.",
      en: "Tunan Waterfall is a spectacular hidden gem in North Sulawesi. Exceptionally easy access from the main road, clean, lush, and peaceful. We loved dipping our feet in the pristine cool pool stream.",
      zh: "图南瀑布是北苏拉威西省一颗璀璨的隐藏明珠。从主干道出发交通十分便利，环境干净、葱郁而宁静。我们非常喜欢在清凉透亮的山泉溪流中嬉水。",
      ko: "북술라웨시의 숨겨진 보물 같은 곳입니다. 메인 도로에서 접근하기도 쉽고 깨끗하며 조용합니다. 시원하고 투명한 계곡물에 발을 담그고 힐링하는 시간이 정말 최고였습니다.",
      vi: "Thác Tunan là một viên ngọc ẩn giấu tuyệt vời ở Bắc Sulawesi. Lối đi vào cực kỳ thuận tiện từ đường lộ, không gian sạch sẽ, xanh mát và tĩnh lặng. Chúng tôi rất thích ngâm chân dưới dòng nước mát lạnh.",
      la: "Cataracta Tunan gemma celata est in Sulawesi Boreali. Aditus facilis est e via primaria, nitidus, silvester, et placidus. Libenter pedes in frigida aqua lavimus."
    }
  },
  {
    name: "Yuki Tanaka",
    location: {
      id: "Tokyo, Jepang",
      en: "Tokyo, Japan",
      zh: "东京，日本",
      ko: "일본 도쿄",
      vi: "Tokyo, Nhật Bản",
      la: "Tochium, Iaponia"
    },
    rating: 5,
    date: "Juni 2026",
    avatarBg: "bg-sky-100 text-sky-800",
    initials: "YT",
    quote: {
      id: "Masyarakat lokal sangat ramah dan memandu kami menyusuri jalur setapak dengan aman. Kebudayaan menenun dan kuliner tradisional kelapa muda (Klappertaart) setelah pulang dari wisata sungguh magis.",
      en: "The local guides were incredibly polite, helping us navigate safely. Checking out the local copra drying chambers and eating freshly baked warm Klappertaart on our return made the trip absolutely magical.",
      zh: "当地向导非常热情礼貌，帮助我们安全地游览。在回程中参观椰子烟熏烘烤室工艺，并品尝新鲜烤制的香甜椰子挞，让这段旅程充满了神奇的魅力。",
      ko: "마을 주민들이 아주 친절하고 안전하게 에스코트해 주었습니다. 관광을 마치고 돌아와 먹은 갓 구wn 코코넛 타르트(Klappertaart)와 독특한 농업 문화 체험은 마법 같은 추억이 되었습니다.",
      vi: "Người dân địa phương rất thân thiện và hướng dẫn chúng tôi đi lại an toàn. Thưởng thức chiếc bánh dừa nướng nóng hổi (Klappertaart) sau chuyến đi thác thật là trải nghiệm kỳ diệu.",
      la: "Incolae benignissimi sunt et nos tuto duxerunt. Gustare calidum crustulum Klappertaart et videre agriculturam loci post reditum vere magicum fuit."
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("beranda");
  const [lang, setLang] = useState<LanguageCode>("id");

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMonaBubble, setShowMonaBubble] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Localized dictionaries for Home Teasers 
  const getText = {
    quickAccess: {
      id: "AKSES CEPAT PORTAL",
      en: "FAST DIRECTORIES CONNECT",
      zh: "快速访问门户",
      ko: "빠른 포털 연결",
      vi: "TRUY CẬP NHANH CỔNG",
      la: "CONECTIO RAPIDA PORTAS"
    },
    title: {
      id: "Layanan & Penjelajahan Desa Sesuai Kebutuhan",
      en: "Tailored Portals & Travel Resources",
      zh: "按需提供服务与村庄探索资源",
      ko: "맞춤형 포털 및 여행 리소스",
      vi: "Dịch Vụ & Tài Nguyên Du Lịch Theo Nhu Cầu",
      la: "Portae et Oecologiae Instrumenta Optata"
    },
    teaser1Title: {
      id: "Daftar Destinasi & Rekreasi",
      en: "Wild Tourism Sights",
      zh: "目的地与休闲游玩列表",
      ko: "대표 명소 & 힐링 관광지",
      vi: "Danh Sách Điểm Đến & Giải Trí",
      la: "Index Locorum et Vacatio"
    },
    teaser1Desc: {
      id: "Dapatkan info lengkap Air Terjun Tunan berketinggian 86 meter, agrowisata pemrosesan kopra murni, hingga simulasi kalkulator biaya perjalanan wisata.",
      en: "Discover local primary waterfall heights, observe traditional copra smoke chambers, and calculate custom group travel budgets in Rupiah.",
      zh: "获取高达86米的图南瀑布完整信息、椰子肉干烘干室工艺，以及使用旅行费用计算器计算您的团队预计假期预算。",
      ko: "86m 높이의 웅장한 투난 폭포 요금, 코코넛 말리는 전통 가마 풍경, 그리고 똑똑한 예산 계산기로 실시간 여행 경비를 확인하십시오.",
      vi: "Nhận thông tin đầy đủ về Thác Tunan cao 86m, lò hun dừa khô truyền thống, và sử dụng công cụ tính toán chi phí hành trình thông minh.",
      la: "Siste de altitudine cataractae Tunan LXXXVI metrorum, processu coprae parandae, et computa sumptus in budget organo."
    },
    teaser1Btn: {
      id: "Jelajahi Wisata",
      en: "Explore Tourism",
      zh: "探索主要景点",
      ko: "대표 명소 둘러보기",
      vi: "Khám Phá Địa Danh",
      la: "Inspice Memorabilia"
    },
    teaser2Title: {
      id: "Kebudayaan & Cita Rasa",
      en: "Dining & Ancient Rituals",
      zh: "文化遗产与风味美食",
      ko: "향토 전통 음식 & 문화 유산",
      vi: "Văn Hóa & Cụm Ẩm Thực",
      la: "Cultus & Cibus"
    },
    teaser2Desc: {
      id: "Nikmati kelezatan Klappertaart murni kelapa muda peninggalan era Belanda, bubur gizi Tinutuan segar, serta kearifan falsafah gotong-royong Mapalus Minahasa.",
      en: "Bask in baked classic Klappertaart, whole vegetable Tinutuan savory plates, and experience local Mapalus mutual assistance values.",
      zh: "品尝经典的荷兰风味椰子挞、益气养生的万鸦老杂菜粥，并见证马帕卢斯村社团结互助制度的多彩脉搏。",
      ko: "입안에서 부드럽게 녹아내리는 가문의 오랜 코코넛 타르트, 영양이 풍부한 전통 야채죽, 그리고 이웃 간 상부상조하는 마팔루스 도풍을 직접 체험해 주십시오.",
      vi: "Thưởng thức chiếc bánh dừa nướng béo ngậy được kế thừa từ thời kỳ thuộc địa, bát cháo dinh dưỡng rau củ ấm lòng và tinh thần tương thân thương ái Mapalus của làng.",
      la: "Placide gusta crustula dulcia e lacte et dactylis, ius vegetabile salubre, et vide splendorem Mapalus caritatis."
    },
    teaser2Btn: {
      id: "Selami Kebudayaan",
      en: "Explore Culture",
      zh: "探索民俗文娱",
      ko: "식문화 & 풍습 탐험",
      vi: "Tìm Hiểu Văn Hóa",
      la: "Explore Cultus"
    },
    bannerTitle: {
      id: "Butuh Asistensi atau Rencana Liburan?",
      en: "Need Urgent Itineraries or Support?",
      zh: "需要旅行规划与即时协助？",
      ko: "상세한 여행 일정 혹은 전담 안내가 필요십니까?",
      vi: "Cần Lập Bản Đồ Hành Trình Hoặc Trợ Giúp?",
      la: "Egesne Itineribus aut Custodia Urgenti?"
    },
    bannerDesc: {
      id: "Hubungi asisten AI pintar kami Mona. Sedia 24 jam menjawab pertanyaan seputar penginapan di dekat air terjun, rute aman, hingga panduan administratif.",
      en: "Ask our resident virtual guide Mona. Live 24/7 assisting visitors on travel, accommodation, local custom schedules, and e-governance.",
      zh: "咨询我们的全天候 AI 虚拟莫娜。24小时陪伴，回答有关住宿路线、瀑布景区门票价格、当地餐馆推荐或任何其他问题。",
      ko: "24시간 대시 중인 AI 스마트 가이드 모나에게 질문해 주세요! 폭포 근처의 숙소 위치, 이동 경로 교통 안내 등 모든 궁금증을 실시간으로 재미있게 대답해 드립니다.",
      vi: "Gặp gỡ Trợ lý AI Mona hoạt động 24/7 của chúng tôi. Sẵn sàng giải đáp mọi thắc mắc về chỗ ở, lối bơi an toàn, quán ăn ngon và thông tin văn hóa.",
      la: "Roga machinam nostram AI Monam. Vigilans XXIV horas respondet ad quaestiones de hospitio prope cataractam, itineribus, et aliis rebus vici."
    },
    bannerBtn: {
      id: "Tanya Mona Sekarang",
      en: "Ping AI Guide Mona",
      zh: "咨询 AI 莫娜",
      ko: "모나 가이드에게 질문하기",
      vi: "Hỏi Trợ Lý Mona Ngay",
      la: "Ping AI Mona"
    }
  };

  const getTValue = (field: keyof typeof getText) => {
    return getText[field][lang] || getText[field]["id"];
  };

  // Renders the sub-feature page segments based on chosen tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "beranda":
        return (
          <div className="space-y-0" id="page-beranda">
            <Hero setActiveTab={setActiveTab} lang={lang} />
            
            {/* Quick Teaser Blocks on Home screen */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left relative z-10" id="home-teasers">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2 select-none">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gold-600 block">
                  {getTValue("quickAccess")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {getTValue("title")}
                </h2>
                <div className="bg-forest-600 w-16 h-1 rounded-full mx-auto mt-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Teaser 1: Wisata */}
                <div className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="bg-forest-50 p-3 rounded-2xl w-fit text-forest-700 mb-6 border border-forest-100">
                      <Compass className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                      {getTValue("teaser1Title")}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {getTValue("teaser1Desc")}
                    </p>
                  </div>
                  <button
                    id="teaser-goto-wisata"
                    onClick={() => setActiveTab("paket")}
                    className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-forest-700 hover:text-forest-900 group"
                  >
                    <span>{getTValue("teaser1Btn")}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Teaser 2: Kuliner/Budaya */}
                <div className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="bg-forest-50 p-3 rounded-2xl w-fit text-forest-700 mb-6 border border-forest-100">
                      <Utensils className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                      {getTValue("teaser2Title")}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {getTValue("teaser2Desc")}
                    </p>
                  </div>
                  <button
                    id="teaser-goto-budaya"
                    onClick={() => setActiveTab("budaya")}
                    className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-forest-700 hover:text-forest-900 group"
                  >
                    <span>{getTValue("teaser2Btn")}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Visitor Reviews Section */}
              <div className="mt-20 pt-16 border-t border-sand-200/80" id="section-visitor-reviews">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2 select-none">
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gold-600 block">
                    {lang === "id" ? "TESTIMONI WISATAWAN" : "TRAVELLER TESTIMONIALS"}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {lang === "id" ? "Apa Kata Pengunjung Tentang Air Terjun Tunan?" : "What Visitors Say About Tunan Waterfall?"}
                  </h2>
                  <div className="bg-forest-600 w-16 h-1 rounded-full mx-auto mt-3" />
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                  {reviewsData.map((review, idx) => (
                    <motion.div 
                      key={idx} 
                      className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative origin-center"
                      id={`visitor-review-card-${idx}`}
                      whileHover={{ 
                        y: -12,
                        scale: 1.025,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        borderColor: "#78350f" // accent border highlight on hover (amber-900 / sand / gold coordinate)
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 22 
                      }}
                    >
                      <div className="absolute top-6 right-6 text-forest-100/50 hidden sm:block">
                        <Quote className="h-10 w-10 opacity-30 transform scale-x-[-1]" />
                      </div>
                      
                      <div className="space-y-4">
                        {/* Rating stars */}
                        <div className="flex items-center space-x-1" id={`review-card-stars-${idx}`}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold-500 fill-gold-500 shrink-0" />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic relative z-10">
                          "{review.quote[lang] || review.quote["id"]}"
                        </p>
                      </div>

                      {/* Reviewer info */}
                      <div className="flex items-center space-x-3.5 mt-6 pt-4 border-t border-sand-100/80">
                        <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-bold font-mono text-xs shadow-inner shrink-0 ${review.avatarBg}`}>
                          {review.initials}
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-sm font-bold text-gray-950 truncate">{review.name}</span>
                          <span className="block text-[10px] sm:text-xs text-gray-500 truncate mt-0.5 font-medium">{review.location[lang] || review.location["id"]}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bot Guide Suggest Banner */}
              <div className="mt-16 bg-forest-50 rounded-4xl p-8 border border-forest-150 flex flex-col md:flex-row items-center md:justify-between text-left gap-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-white border border-forest-150 p-4 rounded-3xl text-forest-700 shrink-0">
                    <Sparkles className="h-6 w-6 text-gold-600 animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-forest-900 leading-tight">
                      {getTValue("bannerTitle")}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                      {getTValue("bannerDesc")}
                    </p>
                  </div>
                </div>
                <button
                  id="action-beranda-ask-mona"
                  onClick={() => setActiveTab("asisten")}
                  className="bg-forest-600 hover:bg-forest-700 text-sand-50 shadow hover:shadow-md px-6 py-3 rounded-xl font-semibold text-xs whitespace-nowrap grow-0 shrink-0 select-none cursor-pointer"
                >
                  {getTValue("bannerBtn")}
                </button>
              </div>
            </div>
          </div>
        );
      case "wisata":
        return <Wisata lang={lang} />;
      case "paket":
        return <PaketWisata lang={lang} />;
      case "budaya":
        return <BudayaKuliner lang={lang} />;
      case "drive":
        return <GaleriDrive lang={lang} />;
      case "asisten":
        return <VirtualAssistant lang={lang} />;
      case "kuis":
        return <KuisTrivia lang={lang} />;
      case "admin":
        return <AdminPortal lang={lang} setActiveTab={setActiveTab} />;
      default:
        return <Hero setActiveTab={setActiveTab} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-sand-50 font-sans text-gray-800" id="talawaan-portal-app">
      {/* Global Navigation Header Board */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Primary Page Canvas (Transitions mapped) */}
      <main className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Traditional Footer and Administration Registry Map coordinates */}
      <Footer lang={lang} setActiveTab={setActiveTab} />

      {/* Floating Action Buttons Stack (Back to Top & Tanya Mona AI) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 select-none" id="global-floating-controls">
        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              key="back-to-top"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={scrollToTop}
              id="btn-back-to-top"
              className="bg-white hover:bg-forest-600 text-forest-800 hover:text-white p-3 rounded-full shadow-lg border border-sand-200 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
              title={lang === "id" ? "Kembali ke Atas" : "Back to Top"}
            >
              <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform duration-250" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Tanya Mona AI Assistant Floating Action */}
        <div className="relative flex items-center justify-end" id="floating-mona-container">
          {/* Dismissible Speech Bubble */}
          <AnimatePresence>
            {showMonaBubble && (
              <motion.div
                key="mona-bubble"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-16 mr-3 bg-white text-gray-900 border border-sand-200/90 py-2.5 px-4 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-semibold whitespace-nowrap"
                id="mona-speech-bubble"
              >
                <Sparkles className="h-4 w-4 text-gold-500 animate-pulse shrink-0" />
                <div className="flex flex-col text-left leading-normal font-sans">
                  <span className="text-[10px] text-forest-700 tracking-wider font-mono font-bold uppercase leading-none mb-0.5">
                    {lang === "id" ? "Mona Asisten Virtual" : "Mona AI Assistant"}
                  </span>
                  <span className="text-gray-700 text-xs">
                    {lang === "id" ? "Ada yang bisa saya bantu?" : "Can I help you?"}
                  </span>
                </div>
                <button 
                  id="close-mona-bubble"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMonaBubble(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-0.5 rounded-md hover:bg-sand-50 shrink-0 ml-2 transition-colors cursor-pointer text-sm font-bold"
                >
                  &times;
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Assistant Avatar Button with Honda Style ripple ring */}
          <div className="relative">
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-forest-400/40 animate-ping opacity-75 z-0" />
            
            <button
              id="btn-floating-mona"
              onClick={() => {
                setActiveTab("asisten");
                scrollToTop();
                setShowMonaBubble(false);
              }}
              className="relative z-10 w-14 h-14 bg-gradient-to-br from-forest-700 to-forest-850 hover:from-forest-650 hover:to-forest-800 rounded-full shadow-2xl border-2 border-forest-500 hover:border-gold-400 transition-all duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer p-0 overflow-hidden"
              title={lang === "id" ? "Tanya Mona AI" : "Ask Mona AI"}
            >
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse z-20" />
              <img
                src={monaAvatar}
                alt="Mona Asisten Virtual"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
