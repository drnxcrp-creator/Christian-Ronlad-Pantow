import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw, Trophy, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QuizQuestion } from "../types";
import { LanguageCode, translations } from "../utils/translations";

interface KuisProps {
  lang: LanguageCode;
}

export default function KuisTrivia({ lang }: KuisProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const t = translations[lang] || translations.id;

  // Local trivia questions datasets in 6 languages
  const quizID: QuizQuestion[] = [
    {
      id: 1,
      question: "Berapakah perkiraan tinggi dari Air Terjun Tunan di Desa Talawaan?",
      options: ["Tinggi 25 Meter", "Tinggi 45 Meter", "Tinggi 86 Meter", "Tinggi 120 Meter"],
      correctIndex: 2,
      explanation: "Air Terjun Tunan adalah salah satu air terjun termegah di Sulawesi Utara dengan ketinggian mengagumkan mencapai kurang lebih 85-86 meter.",
    },
    {
      id: 2,
      question: "Apa istilah lokal masyarakat Minahasa untuk memanggil Kepala Desa mereka?",
      options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
      correctIndex: 0,
      explanation: "Masyarakat adat Minahasa secara turun-temurun menyematkan gelar terhormat 'Hukum Tua' kepada pemimpin administratif atau kepala desanya.",
    },
    {
      id: 3,
      question: "Apakah nama daun hutan alami pembungkus hidangan Nasi Kuning khas Manado?",
      options: ["Daun Pisang", "Daun Woka", "Daun Pandan Sawah", "Daun Jati"],
      correctIndex: 1,
      explanation: "Nasi kuning Manado dibungkus menggunakan daun Woka (sejenis daun palem hutan) yang memberikan aroma harum yang khas dan alami.",
    },
    {
      id: 4,
      question: "Filsafah Mapalus merupakan tradisi kental suku Minahasa yang berarti...",
      options: ["Seni Berperang", "Pesta Tari Panen Raya", "Gotong Royong Komunal", "Kerajinan Tenun Serat"],
      correctIndex: 2,
      explanation: "Mapalus adalah sistem kekerabatan gotong-royong terstruktur dalam pertanian, pembangunan fasilitas warga, hingga urusan bela duka kekeluargaan.",
    },
  ];

  const quizEN: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the approximate height of Tunan Waterfall located in Talawaan Village?",
      options: ["25 Meters high", "45 Meters high", "86 Meters high", "120 Meters high"],
      correctIndex: 2,
      explanation: "Tunan Waterfall stands majestically at about 85-86 meters tall, streaming pure, ice-cold volcanic waters down tropical peaks.",
    },
    {
      id: 2,
      question: "What is the traditional Minahasan honorary word used to address the Village Head?",
      options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
      correctIndex: 0,
      explanation: "Hukum Tua is the official title given to the elected administrative village leader across Minahasan custom councils.",
    },
    {
      id: 3,
      question: "What is the name of the traditional leaf used to wrap the fragrant yellow Turmeric Rice?",
      options: ["Banana Leaf", "Woka Leaf", "Pandan Leaf", "Teak Leaf"],
      correctIndex: 1,
      explanation: "Native woka leaves (a genus of wild palms) are used to package turmeric rice, infusing a distinctive rainforest aroma.",
    },
    {
      id: 4,
      question: "The traditional Mapalus values practiced inside Talawaan stand for...",
      options: ["Ancient Martial arts", "Harvest Ritual Dancing", "Structured Reciprocal Mutual Cooperation", "Bark fiber weaving craft"],
      correctIndex: 2,
      explanation: "Mapalus represents the ancestral mutual aid cooperative philosophy binding Minahasan villages in farming, building, and emergencies.",
    },
  ];

  const quizZH: QuizQuestion[] = [
    {
      id: 1,
      question: "图南瀑布的大致高度是多少？",
      options: ["25 米高", "45 米高", "86 米高", "120 米高"],
      correctIndex: 2,
      explanation: "图南瀑布立于美娜多森林之中，高达约85-86米，气势磅礴，泉水清冽凉爽。",
    },
    {
      id: 2,
      question: "闽那哈沙地区对“村长”的传统称呼是什么？",
      options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
      correctIndex: 0,
      explanation: "Hukum Tua是传统的闽那哈沙（Minahasa）社会里对民选行政管理首领的尊称。",
    },
    {
      id: 3,
      question: "用于包裹美娜多特色姜黄饭的传统树叶叫什么？",
      options: ["香蕉叶", "沃卡叶 (Daun Woka)", "斑兰叶", "柚木叶"],
      correctIndex: 1,
      explanation: "采用天然的沃卡叶（一种野生棕榈叶）包裹姜黄饭，能赋予其独特的森林自然香气。",
    },
    {
      id: 4,
      question: "马帕卢斯（Mapalus）哲学所代表的传统价值观是指...",
      options: ["传统武术", "丰收祭祀舞蹈", "有组织的互助合作传统", "树皮纤维编织"],
      correctIndex: 2,
      explanation: "Mapalus是闽那哈沙先祖传承下来的互助合作精神，把生活、耕作、建设等事务紧密联系在一起。",
    },
  ];

  const quizKO: QuizQuestion[] = [
    {
      id: 1,
      question: "탈라와안 마을의 투난 폭포의 대략적인 높이는 얼마입니까?",
      options: ["25 미터", "45 미터", "86 미터", "120 미터"],
      correctIndex: 2,
      explanation: "투난 폭포는 약 85-86미터의 멋진 높이에서 시원한 천연수가 떨어지는 미나하사의 상징적인 폭포입니다.",
    },
    {
      id: 2,
      question: "미나하사 부족이 '촌장(이장)'을 부를 때 사용하는 전통 칭호는 무엇입니까?",
      options: ["후쿰 투아 (Hukum Tua)", "루라 시필", "케팔라 자가", "상가디"],
      correctIndex: 0,
      explanation: "'후쿰 투아'는 미나하사 전통에 따라 선출된 행정 촌장을 일컫는 명예로운 관직명입니다.",
    },
    {
      id: 3,
      question: "미나하사에서 황금 노란 밥(나시 쿠닝)을 싸는 데 사용하는 전통 나뭇잎은 무엇입니까?",
      options: ["바나나 잎", "워카 잎 (Daun Woka)", "판단 잎", "티크 잎"],
      correctIndex: 1,
      explanation: "야생 야자나무의 일종인 워카 잎으로 밥을 싸서, 자연스럽고 향긋한 숲 향기를 더해줍니다.",
    },
    {
      id: 4,
      question: "탈라와안 마을에서 실천하는 전통 정신인 '마팔루스(Mapalus)'는 무엇을 뜻합니까?",
      options: ["전통 무술", "풍년 감사제 댄스", "체계적이고 호혜적인 상부상조 협동", "나무 섬유 직조"],
      correctIndex: 2,
      explanation: "마팔루스는 농업, 건설, 상호 장례 및 비상사태에서 공동체 협력을 도모하는 미나하사의 유서 깊은 상부상조 사상입니다.",
    },
  ];

  const quizVI: QuizQuestion[] = [
    {
      id: 1,
      question: "Chiều cao ước tính của Thác Tunan ở làng Talawaan là bao nhiêu?",
      options: ["Chiều cao 25 mét", "Chiều cao 45 mét", "Chiều cao 86 mét", "Chiều cao 120 mét"],
      correctIndex: 2,
      explanation: "Thác Tunan đứng sừng sững ở độ cao khoảng 85-86 mét, mang dòng nước mát lạnh từ núi cao chảy qua rừng rậm nhiệt đới.",
    },
    {
      id: 2,
      question: "Từ ngữ tôn kính truyền thống của người Minahasa dùng để gọi Trưởng Thôn là gì?",
      options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
      correctIndex: 0,
      explanation: "Hukum Tua là danh hiệu chính thức được trao cho trưởng thôn hành chính được bầu chọn theo luật tục Minahasa.",
    },
    {
      id: 3,
      question: "Tên của loại lá truyền thống được dùng để gói món Cơm Vàng thơm phức là gì?",
      options: ["Lá chuối", "Lá Woka", "Lá dứa", "Lá giá tỵ"],
      correctIndex: 1,
      explanation: "Lá woka tự nhiên (một loại cọ dại) được dùng để gói cơm vàng, mang lại hương rừng nhiệt phát thanh mát đặc trưng.",
    },
    {
      id: 4,
      question: "Giá trị truyền thống của Mapalus được thực hành ở Talawaan có nghĩa là gì?",
      options: ["Võ thuật truyền thống", "Điệu múa gặt mùa màng", "Sự hợp tác tương trợ lẫn nhau có tổ chức", "Nghề dệt sợi vỏ cây"],
      correctIndex: 2,
      explanation: "Mapalus đại diện cho triết lý hợp tác tương trợ lẫn nhau của tổ tiên kết nối các gia đình Minahasa trong canh tác, xây dựng và cứu trợ.",
    },
  ];

  const quizLA: QuizQuestion[] = [
    {
      id: 1,
      question: "Quanta est altitudo cataractae Tunan in vico Talawaan?",
      options: ["Altitudinis 25 Metrorum", "Altitudinis 45 Metrorum", "Altitudinis 86 Metrorum", "Altitudinis 120 Metrorum"],
      correctIndex: 2,
      explanation: "Cataracta Tunan altitudine circiter 86 metrorum eminet, inter silvas primævas aquam limpidissimam profundens.",
    },
    {
      id: 2,
      question: "Quo nomine patrio Minahasani principem vici appellant?",
      options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
      correctIndex: 0,
      explanation: "Hukum Tua est titulus honorabilis principi administrationis municipii tribui inditus.",
    },
    {
      id: 3,
      question: "Quomodo vocatur folium silvestre quo oryza lutea aromatica (Nasi Kuning) involvitur?",
      options: ["Folium Ariene", "Folium Woka", "Folium Pandani", "Folium Tectonae"],
      correctIndex: 1,
      explanation: "Oryza lutea foliis palmæ silvestris (Woka) involvitur ut odorem nativum ac iucundissimum silvarum spiret.",
    },
    {
      id: 4,
      question: "Quid sibi vult philosophia maiorum Mapalus in vico vigens?",
      options: ["Ars militaris", "Saltatio messis", "Labor ac cooperatio communis", "Textura textilis silvestris"],
      correctIndex: 2,
      explanation: "Mapalus est ratio cooperandi communis qua vicani in agris colendis ac auxiliis ferendis invicem iuvant.",
    },
  ];

  // Map appropriate language array
  const activeQuestions = (() => {
    switch(lang) {
      case "en": return quizEN;
      case "zh": return quizZH;
      case "ko": return quizKO;
      case "vi": return quizVI;
      case "la": return quizLA;
      default: return quizID;
    }
  })();

  const currentQuestion = activeQuestions[currentQIndex];

  const handleOptionSelect = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOptIndex(optIdx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOptIndex === null || isAnswered) return;

    if (selectedOptIndex === currentQuestion.correctIndex) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQ = () => {
    setIsAnswered(false);
    setSelectedOptIndex(null);

    if (currentQIndex + 1 < activeQuestions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOptIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Rank determination
  const getRank = () => {
    const total = activeQuestions.length;
    if (score === total) {
      return t.quizRankHukumTua;
    }
    if (score >= total - 1) {
      return t.quizRankKawanua;
    }
    if (score >= total - 2) {
      return t.quizRankExplorer;
    }
    return t.quizRankTourist;
  };

  return (
    <div id="section-quiz" className="bg-sand-100 py-16 sm:py-20 border-t border-b border-sand-250">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        
        {/* Decorative Badge */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-forest-600 text-sand-50 p-4 rounded-3xl shadow-xl w-14 h-14 flex items-center justify-center border-4 border-sand-100">
          <Trophy className="h-6 w-6 text-gold-500 animate-pulse" />
        </div>

        <div className="bg-white border border-sand-200 shadow-xl rounded-4xl p-8 sm:p-12 text-center mt-6">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              /* Active Kuis Screen */
              <motion.div
                key="active-quiz"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                {/* Header indicators */}
                <div className="flex justify-between items-center select-none">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-gold-600 tracking-widest bg-gold-50 px-2.5 py-1.5 rounded-full">
                    {t.quizBadge}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {lang === "id" ? `Pertanyaan ${currentQIndex + 1} dari ${activeQuestions.length}` : `Question ${currentQIndex + 1} of ${activeQuestions.length}`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden select-none">
                  <div
                    className="bg-forest-600 h-full transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 leading-snug text-left sm:text-center">
                  {currentQuestion.question}
                </h3>

                {/* Options panel */}
                <div className="grid gap-3.5 pt-2">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOptIndex === idx;
                    const showCorrectBorder = isAnswered && idx === currentQuestion.correctIndex;
                    const showIncorrectBorder = isAnswered && isSelected && idx !== currentQuestion.correctIndex;

                    return (
                      <button
                        key={idx}
                        id={`quiz-opt-${idx}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${
                          showCorrectBorder
                            ? "bg-forest-50 border-forest-600 text-forest-800 font-semibold"
                            : showIncorrectBorder
                            ? "bg-red-50 border-red-500 text-red-800 font-semibold"
                            : isSelected
                            ? "bg-sand-100 border-sand-800 text-gray-900 font-bold"
                            : "bg-sand-50/50 hover:bg-sand-50 border-sand-200 text-gray-600"
                        }`}
                      >
                        <span>{opt}</span>
                        {showCorrectBorder && <CheckCircle className="h-5 w-5 text-forest-700 shrink-0 ml-2" />}
                        {showIncorrectBorder && <XCircle className="h-5 w-5 text-red-700 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation block & Next buttons */}
                <div className="pt-4 border-t border-sand-150 flex flex-col items-stretch space-y-4">
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-sand-100 text-gray-700 rounded-2xl p-4 flex items-start space-x-2.5 text-xs text-left"
                    >
                      <BookOpen className="h-4.5 w-4.5 text-gold-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold uppercase tracking-wider text-gray-900 text-[10px] b-1">
                          {lang === "id" ? "Wawasan Tambahan" : "Folk Explanation"}
                        </strong>
                        <p className="leading-relaxed mt-0.5">{currentQuestion.explanation}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    {!isAnswered ? (
                      <button
                        id="quiz-submit-ans"
                        disabled={selectedOptIndex === null}
                        onClick={handleAnswerSubmit}
                        className="w-full bg-forest-600 hover:bg-forest-700 text-sand-50 disabled:opacity-40 rounded-xl py-3 font-semibold text-xs py-3.5 shadow-md flex items-center justify-center cursor-pointer select-none"
                      >
                        {lang === "id" ? "Kirim Jawaban" : "Verify Answer"}
                      </button>
                    ) : (
                      <button
                        id="quiz-next-q"
                        onClick={handleNextQ}
                        className="w-full bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl py-3 font-semibold text-xs py-3.5 shadow-md flex items-center justify-center cursor-pointer select-none"
                      >
                        <span>
                          {currentQIndex + 1 === activeQuestions.length
                            ? (lang === "id" ? "Selesaikan Kuis" : "Reveal Results")
                            : (lang === "id" ? "Pertanyaan Selanjutnya" : "Next Question")}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            ) : (
              /* Quiz Score Final page card */
              <motion.div
                key="quiz-finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 pt-4 text-center select-none"
              >
                <div className="bg-forest-50 p-6 rounded-full w-fit mx-auto border-4 border-forest-100">
                  <Trophy className="h-12 w-12 text-gold-500 animate-pulse" />
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase text-gold-600 tracking-widest font-mono">
                    {t.quizScoreBadge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
                    {t.quizTitle}
                  </h3>
                </div>

                <div className="border border-sand-200 rounded-3xl p-6 bg-sand-50/50 max-w-sm mx-auto space-y-2">
                  <span className="text-gray-500 font-medium text-xs block">
                    {t.quizPoinLabel}
                  </span>
                  <span id="quiz-final-score" className="text-4xl font-extrabold text-forest-700 block font-mono">
                    {score} / {activeQuestions.length}
                  </span>
                  <div className="h-px bg-sand-200 my-2" />
                  <span className="text-gray-500 font-medium text-xs block">
                    {t.quizRankLabel}
                  </span>
                  <span id="quiz-rank-badge" className="text-base font-bold text-gold-700 bg-white border border-gold-500/20 px-4 py-1.5 rounded-full inline-block mt-1 font-semibold">
                    {getRank()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
                  {t.quizCongrat}
                </p>

                <div className="pt-2">
                  <button
                    id="quiz-restart-btn"
                    onClick={handleRestartQuiz}
                    className="bg-forest-600 hover:bg-forest-700 text-sand-50 rounded-xl px-8 py-3 font-semibold text-xs flex items-center justify-center mx-auto shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>{lang === "id" ? "Coba Kuis Lagi" : "Restart Knowledge Test"}</span>
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
