import React, { useState } from "react";
import { 
  Compass, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Minus, 
  Award, 
  Info, 
  Maximize2, 
  Send, 
  Music, 
  Flame, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  X,
  CreditCard,
  QrCode
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageCode } from "../utils/translations";
import { saveReservation } from "../lib/dbService";

interface PaketProps {
  lang: LanguageCode;
}

interface TourPackage {
  id: string;
  category: "petualangan" | "edukasi" | "live-in";
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  price: number;
  priceSuffix: Record<LanguageCode, string>;
  duration: Record<LanguageCode, string>;
  image: string;
  rating: string;
  reviews: string;
  highlights: Record<LanguageCode, string[]>;
  itinerary: Record<LanguageCode, { time: string; activity: string }[]>;
  facilities: Record<LanguageCode, string[]>;
}

export default function PaketWisata({ lang }: PaketProps) {
  const [filter, setFilter] = useState<"semua" | "petualangan" | "edukasi" | "live-in">("semua");
  const [expandedItineraryId, setExpandedItineraryId] = useState<string | null>(null);
  
  // Booking Modal States
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>("2026-07-15");
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  
  // Optional Add-ons state
  const [addonAirport, setAddonAirport] = useState<boolean>(false);
  const [addonDocumentation, setAddonDocumentation] = useState<boolean>(false);
  const [addonDoubleKlap, setAddonDoubleKlap] = useState<boolean>(false);

  // Success Ticket State
  const [bookingTicket, setBookingTicket] = useState<any | null>(null);

  const packages: TourPackage[] = [
    {
      id: "tunan-adventure",
      category: "petualangan",
      title: {
        id: "Paket Petualangan Air Terjun Tunan",
        en: "Tunan Waterfall Adventure Quest",
        zh: "图南御临瀑布森林远足套餐",
        ko: "투난 폭포 익스트림 어드벤처 패키지",
        vi: "Gói Khám Phá Trải Nghiệm Thác Tunan",
        la: "Hospitium Cataractae Tunan Agrestis"
      },
      subtitle: {
        id: "Jelajahi keagungan air terjun 86 meter dengan pemandu lokal berpengalaman dan makan siang kuliner Minahasa.",
        en: "Trek through pure volcanic rainforest streams, enjoy fresh coconut water, and savor authentic Minahasan lunch spreads.",
        zh: "在资深向导的带领下，徒步原始森林，感受86米高空飞流的震憾，并享用美娜多传统风味午餐。",
        ko: "86미터 높이의 웅장한 천연 폭포 밑에서 시원한 다이빙을 즐기고, 미나하사 부족의 웰빙 요리를 맛보는 모험을 시작하세요.",
        vi: "Băng rừng vượt suối thác Tunan khổng lồ cao 86m dưới sự dẫn đường tinh tế của dân bản địa, thưởng thức ẩm thực Minahasa truyền thống.",
        la: "Inspice altitugines cataractae Tunan LXXXVI metrorum cum duce indigena et prandio rustico Minahasano."
      },
      price: 75000,
      priceSuffix: {
        id: "/ Orang",
        en: "/ Person",
        zh: "/ 每人",
        ko: "/ 1인당",
        vi: "/ Khách",
        la: "/ In Singulos"
      },
      duration: {
        id: "4 - 5 Jam",
        en: "4 - 5 Hours",
        zh: "约 4-5 小时",
        ko: "반나절 소요 (4-5시간)",
        vi: "Khoảng 4 - 5 Giờ",
        la: "IV - V Horae"
      },
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=650",
      rating: "4.9",
      reviews: "142",
      highlights: {
        id: ["Air Terjun Tunan 86m", "Kuliner Tradisional Tinutuan", "Pemandu Lokal Berlisensi", "Segarnya Kelapa Muda Petik Langsung"],
        en: ["Tunan Cascade Dive Site", "Fresh Bamboo Claypot Tinutuan", "Accredited Local Guide", "Directly Farm-picked Young Coconut"],
        zh: ["86米高图南奇观瀑布", "传统美娜多特色杂菜蔬菜粥", "村委会官方认证专属向导", "农夫现摘多汁鲜椰子"],
        ko: ["86m 투난 폭포 자연 입수", "가마에서 끓여낸 미나하사 야채죽", "원주민 공인 로컬 가이드 가이딩", "밭에서 바로 딴 천연 야자수"],
        vi: ["Bể bơi thiên nhiên Thác Tunan 86m", "Ăn trưa cháo rau nấm Tinutuan", "Hướng dẫn viên bản địa chu đáo", "Thưởng thức dừa xiêm ngọt lịm hái tại chỗ"],
        la: ["Cataracta Tunan LXXXVI M.", "Cibus Tinutuan traductus", "Dux officialis vici", "Cocos recens de palmis deiectus"]
      },
      itinerary: {
        id: [
          { time: "08:00 - 08:30", activity: "Berkumpul di Gazebo Desa Talawaan & Welcome Drink teh jahe hangat asli." },
          { time: "08:30 - 09:30", activity: "Trekking santai dipandu warga lokal melewati kebun aren & kelapa rindang." },
          { time: "09:30 - 11:30", activity: "Tiba di Tunan, menikmati kesegaran air terjun, foto bersama, & berenang aman." },
          { time: "11:30 - 13:00", activity: "Makan siang prasmanan Tinutuan hangat & kelapa muda segar di tepi saung sungai." }
        ],
        en: [
          { time: "08:00 - 08:30", activity: "Assembly at Talawaan Village Hub, welcome briefing & warm ginger palm tea." },
          { time: "08:30 - 09:30", activity: "Light tropical trekking across spice woods and palm-sugar farms." },
          { time: "09:30 - 11:30", activity: "Arrival at Tunan Pool, cool jungle swim, photo sessions & waterfall mist breeze." },
          { time: "11:30 - 13:00", activity: "Feast on piping hot Tinutuan porridge and organic coconuts near the river pavilion." }
        ],
        zh: [
          { time: "08:00 - 08:30", activity: "在塔拉瓦安村长办公室集合，享用迎宾生姜棕榈红茶及文化简报。" },
          { time: "08:30 - 09:30", activity: "轻步椰子树与阿瑞棕榈林间，踏着晨光享受天然森林氧吧。" },
          { time: "09:30 - 11:30", activity: "抵达瀑布潭，体验极速避暑森林泳，在冰凉清澈泉水中摄影漫游。" },
          { time: "11:30 - 13:00", activity: "在河畔林间凉亭落座，享用热腾腾的美娜多蔬菜粥与现开甘甜椰青。" }
        ],
        ko: [
          { time: "08:00 - 08:30", activity: "탈라와안 만남의 정원에서 집합, 특산 생강차와 웰컴 스낵 증정." },
          { time: "08:30 - 09:30", activity: "아열대 코코넛 벌판과 대자연 피톤치드 길을 걷는 소프트 정글 트레킹." },
          { time: "09:30 - 11:30", activity: "투난 폭폭 도착, 천연 계곡 물놀이 및 인생샷 전용 촬영 지원." },
          { time: "11:30 - 13:00", activity: "계곡 사우각 정자 밑에서 갓 지어낸 야채죽과 미나하사 요리로 즐기는 점심 식사." }
        ],
        vi: [
          { time: "08:00 - 08:30", activity: "Tập trung tại văn phòng du lịch Talawaan, dùng nước gừng mật ong chào đón." },
          { time: "08:30 - 09:30", activity: "Tản bộ xuyên rừng dừa rợp bóng và tham quan vườn trồng nông nghiệp hữu cơ." },
          { time: "09:30 - 11:30", activity: "Đến chân thác Tunan hoành tráng, tự do bơi lội dưới làn nước dồi dào, chụp ảnh lưu niệm." },
          { time: "11:30 - 13:00", activity: "Thưởng thức tiệc buffet cháo nóng Tinutuan dọn trong ống tre và dừa xiêm hái bên bờ suối." }
        ],
        la: [
          { time: "08:00 - 08:30", activity: "Conventus in foro vici Talawaan, potatio collyrii zinziberis." },
          { time: "08:30 - 09:30", activity: "Iter pedestre per agros et silvas palmarum amoenissimas." },
          { time: "09:30 - 11:30", activity: "Adventus ad cataractam, natatio libera et photography in aqua limpidissima." },
          { time: "11:30 - 13:00", activity: "Prandium ex calido iusculi Tinutuan et cocis dulcibus in tabernaculo fluminis." }
        ]
      },
      facilities: {
        id: ["Tiket Objek Wisata", "Peralatan Pelampung Safety", "Pemandu Bersertifikat", "Makan Siang & Kelapa Muda", "Jas Hujan Darurat"],
        en: ["Entrance Entry Permits", "Jacket Safety Harness", "Certified Local Escort", "All-You-Can-Eat Buffet Lunch", "Emergency Poncho Rainwear"],
        zh: ["景点门票全包", "专业安全救生衣/装备", "村庄中文/英文专属持证向导", "自助特色大餐与森林果实", "急救药品与一次性雨衣"],
        ko: ["폭포 입장권 일체", "안전 라이프 자켓 제공", "로컬 전담 베테랑 현지 가이드", "점심 뷔페 및 신선 야자수 한통", "구급 상자 및 비옷 지원"],
        vi: ["Toàn bộ vé vào cổng địa danh", "Áo phao cứu sinh an toàn", "Hướng dẫn viên du lịch chuyên nghiệp", "Bữa trưa ẩm thực vùng cao và dừa", "Áo mưa và hộp y tế khẩn cấp"],
        la: ["Tributum introitus ad cataractam", "Instrumenta salutis", "Dux peritus vici", "Prandium ac dactylorun nectari", "Pluviale praesidium emergency"]
      }
    },
    {
      id: "agro-sugar",
      category: "edukasi",
      title: {
        id: "Paket Edukasi Gula Aren & Cap Tikus",
        en: "Palm Sweetener & Cap Tikus Workshop",
        zh: "棕榈甜汁与“卡提库斯”传统酿酒科教套餐",
        ko: "아렌 설탕 & 전통 증류주(캅 티쿠스) 양조 교육 투어",
        vi: "Gói Trải Nghiệm Đường Thốt Nốt & Rượu Nếp Cap Tikus",
        la: "Hospitium Saccharo Aren ac Distillationis Cap Tikus"
      },
      subtitle: {
        id: "Belajar langsung memanen nira manis dari pohon aren liar bersama penderes lokal, serta mengolah gula aren cetak murni tradisi leluhur Minahasa.",
        en: "Sip raw fresh sweet palm sap, discover the double distillation craft of Cap Tikus, and pour warm liquid sugar into traditional wood molds.",
        zh: "拜访当地老木农，目睹徒手爬树割取天然甜汁的惊人绝活，探秘美娜多神秘火山白酒的木桶酿造配方，并手工制作属于您的棕榈红糖。",
        ko: "숲속 야생 아렌 나무에서 이슬 같은 단 수액(니라)을 채취하는 전통 기술을 참관하고, 민속 전통 소주인 '캅 티쿠스(Cap Tikus)' 액체 가마 가공 과정을 참관해 보세요.",
        vi: "Học cách trèo dừa gạt lấy mật hoa sâm nira cùng nông dân, trực tiếp tham gia xưởng đun đường thốt nốt đúc khuôn gỗ thủ công độc đáo.",
        la: "Disce nectaris dulcis de palmis aren colligendi artem et distillationis nobilis liquidi patriae Cap Tikus."
      },
      price: 120000,
      priceSuffix: {
        id: "/ Orang",
        en: "/ Person",
        zh: "/ 每人",
        ko: "/ 1인당",
        vi: "/ Khách",
        la: "/ In Singulos"
      },
      duration: {
        id: "3 Jam",
        en: "3 Hours",
        zh: "约 3 小时",
        ko: "3시간 정도 소요",
        vi: "Khoảng 3 Giờ",
        la: "III Horae"
      },
      image: "https://images.unsplash.com/photo-1595971295024-551041a92e67?auto=format&fit=crop&q=80&w=650",
      rating: "5.0",
      reviews: "98",
      highlights: {
        id: ["Panen Air Nira (Saguer)", "Eksperimen Cetak Gula Merah", "Pencicipan Nira Aren Murni", "Oleh-oleh Sirup Aren Botol Kaca"],
        en: ["Live Sap Harvesting Demo", "Artisanal Sugar Casting", "Warm Sweet Sap Tastings", "Glass-bottled Souvenir Syrup"],
        zh: ["现场展示攀爬割蜜汁工艺", "红糖古法泥火熬煮浇筑体验", "试喝无添加冰爽生鲜甜树汁", "赠送一小瓶本地原榨红糖浆"],
        ko: ["전통 아렌 단수액 실시간 채취 시연", "목형 벌꿀 붉은 설탕 굳히기 놀이", "달콤한 무자극 신선 수액 원액 무료 시음", "직접 채운 갈색 아렌 설탕 시럽 기념품 병 선물"],
        vi: ["Học phương pháp đo dòng mật rỉ nira", "Đổ đường lỏng vào khuôn gỗ dừa", "Nếm thử nước hoa dừa thanh mát tuyệt vời", "Quà tặng chai thủy tinh đường mật nguyên chất"],
        la: ["Collectio nectaris arboris Aren", "Formatio sacchari nativi", "Gustatio suci purissimi silvestris", "Munus vitrum syrupi de vico"]
      },
      itinerary: {
        id: [
          { time: "09:00 - 09:30", activity: "Edukasi jenis pohon aren di perkebunan konservasi lokal Talawaan." },
          { time: "09:30 - 10:15", activity: "Menyaksikan penderes memanjat pohon kelapa tanpa alat & menyadap nira manis." },
          { time: "10:15 - 11:15", activity: "Membantu menapis nira, merebus di tungku tanah, serta menuangnya ke cetakan tempurung kelapa." },
          { time: "11:15 - 12:00", activity: "Workshop rahasia pemurnian bambu beringkat yang menghasilkan sulingan Cap Tikus, serta pembagian souvenir." }
        ],
        en: [
          { time: "09:00 - 09:30", activity: "Botanical briefing on palm trees in the agroforestry preservation sector." },
          { time: "09:30 - 10:15", activity: "Observe acrobatic climbing where farmers tap palm sugar liquids without ropes." },
          { time: "10:15 - 11:15", activity: "Participate in boiling sap on high-fire stoves and pour into standard coconut-shell molds." },
          { time: "11:15 - 12:00", activity: "An exclusive look at traditional bamboo steam distillers producing crystal clear Cap Tikus." }
        ],
        zh: [
          { time: "09:00 - 09:30", activity: "抵达塔拉瓦安植物生态保护区，听阿瑞棕榈树如何撑起村民生计的科教讲解。" },
          { time: "09:30 - 10:15", activity: "观摩高空非凡爬树特技，农夫在无保护绳状态下割花苞引蜜汁。" },
          { time: "10:15 - 11:15", activity: "亲自动手在大铁锅前搅拌蜂蜜树汁，在其将要凝固时倒入特制天然椰壳模具中。" },
          { time: "11:15 - 12:00", activity: "走进烟雾缭绕的森林蒸馏炉，解密竹筒分阶蒸馏出高纯度椰树白酒的科学。" }
        ],
        ko: [
          { time: "09:00 - 09:30", activity: "탈라와안 아렌 영양 삼림 보존 구역 입장 및 식생 세미나 안내." },
          { time: "09:30 - 10:15", activity: "로컬 농부가 도구 없이 원시 기법으로 거대 야자수를 정복하고 수액을 거두는 시범 관전." },
          { time: "10:15 - 11:15", activity: "끓고 있는 갈색 가마솥을 다루며 야자 단수액을 거르고 장식용 코코넛 껍질 모형에 붓는 과정 실습." },
          { time: "11:15 - 12:00", activity: "대나무 다단 필터를 통해 이슬처럼 떨어지는 전통 소주 원액 증류 기법 체험 및 기념 패키징 교부." }
        ],
        vi: [
          { time: "09:00 - 09:30", activity: "Đón tiếp bằng chuyên đề hệ thực vật họ dừa tại trung tâm nông nghiệp Talawaan." },
          { time: "09:30 - 10:15", activity: "Xem thực tế nông dân trèo cây thẳng đứng lấy nhựa hoa thốt nốt mật sâm tự nhiên." },
          { time: "10:15 - 11:15", activity: "Khuấy mật đường lỏng trên bếp củi bừng cháy, thực hành đóng gói đường bánh khuôn dừa." },
          { time: "11:15 - 12:00", activity: "Khám phá mật thuật cất rượu thơm Cap Tikus bằng hệ ống chưng cất tre dốc và đóng chai mật dâng tặng." }
        ],
        la: [
          { time: "09:00 - 09:30", activity: "Introductio ad silvas palmarum in agro Talawaan." },
          { time: "09:30 - 10:15", activity: "Spectatio egregia agricolarum palmas ascendendi et nectare potandi." },
          { time: "10:15 - 11:15", activity: "Auxilium ferendo in coctura nectaris et formatio sacchari in testis dactylorum." },
          { time: "11:15 - 12:00", activity: "Distillationis Cap Tikus secretorum demonstratio in bambusae cannis et oblatio syrupi vici." }
        ]
      },
      facilities: {
        id: ["Bahan Baku Workshop Lengkap", "Alat Pelindung Diri Keamanan", "Sampel Gratis Gula & Nira", "Penyejuk & Welcome Drink", "Sertifikat Mini Peserta"],
        en: ["Raw Workshop Ingredients", "Gloves & Protection Gears", "Complimentary Sap Bottle", "Airy Rest Stops & Tea Boost", "Cultural Certificate of Discovery"],
        zh: ["工坊全套原材料与炊具", "防烫工作手套及围裙", "新鲜阿瑞树汁样品（可饮）", "森林遮阳棚茶休体验", "村庄定制迷你研学结业证书"],
        ko: ["워크숍 식자재 및 실습도구 일체", "화상 예방용 위생 목장갑 및 안전 대책", "방금 깎은 야자 설탕 미니 샘플 제공", "전통 야외 다과 그늘막 쉼터", "체험 완료 교육 주니어 인증서 발급 (Hukum Tua 날인)"],
        vi: ["Đầy đủ nguyên vật liệu làm tại xưởng", "Bảo hộ lao động tạp dề chống nhiệt găng tay", "Sử dụng dùng thử sản phẩm mật nira ngọt ngào", "Bàn trà dã ngoại mái lá nghỉ mát", "Giấy chứng nhận trải nghiệm mộc mạc lưu niệm"],
        la: ["Omnia materia ad laborandum", "Manicae ac vestimenta salutis", "Gustatio libera nectaris et sacchari", "Locus amoenis reficiendi", "Charta confirmationis artis peractatae"]
      }
    },
    {
      id: "kolintang-music",
      category: "edukasi",
      title: {
        id: "Paket Harmoni Kolintang & Seni Tari",
        en: "Interactive Wood Kolintang Heritage Tour",
        zh: "木琴古乐传统演艺艺术工作坊套餐",
        ko: "콜린탕 오케스트라 전통 공연 & 악기 레슨 패키지",
        vi: "Gói Trải Nghiệm Nhạc Cụ Gỗ Kolintang & Vũ Đạo",
        la: "Hospitium Oratoris Kolintang ac Saltationis Patriae"
      },
      subtitle: {
        id: "Saksikan live performa ansambel musik kayu purba kolintang di balai adat, lalu ikuti pelatihan privat memukul melodi langsung bersama para maestro musik desa Talawaan.",
        en: "Experience high-energy live timber percussion performances and take step-by-step hands-on coordinates lessons from local gold medalist musicians.",
        zh: "在竹篷演艺厅饱览木琴管弦合奏《美娜多情歌》，在村庄乐器大师的精心辅导下亲自动手敲击出欢快流畅的印尼传统交响乐章。",
        ko: "마을의 자랑인 '콜린탕(Kolintang)' 나무 타악 오케스트라의 신명나는 연주를 명당석에서 직전 감상하고, 마스터 연주자의 개별 코치를 통하여 한 곡 완성 레슨을 수료하세요.",
        vi: "Xem màn hòa nhạc hòa nhạc trực tiếp đỉnh cao của di sản đàn gỗ Kolintang, học chơi bản nhạc cổ cùng các nghệ sĩ lớn tuổi của ngôi làng mộc mạc.",
        la: "Audi symphonias mirabiles orbis lignei Kolintang in balneo communi, et exerce percutere melodiam cum magistris loci."
      },
      price: 150000,
      priceSuffix: {
        id: "/ Orang",
        en: "/ Person",
        zh: "/ 每人",
        ko: "/ 1인당",
        vi: "/ Khách",
        la: "/ In Singulos"
      },
      duration: {
        id: "3 Jam",
        en: "3 Hours",
        zh: "约 3 小时",
        ko: "3시간 정도 소요",
        vi: "Khoảng 3 Giờ",
        la: "III Horae"
      },
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=650",
      rating: "4.9",
      reviews: "75",
      highlights: {
        id: ["Pementasan Live Orkes Kolintang", "Kursus Privat Musik Kayu", "Sesi Foto Baju Adat Minahasa", "Kue Klappertaart Belanda Hangat"],
        en: ["Live Concert Performance", "One-on-One Music Lesson", "Traditional Minahasan Costume Trial", "Oven-fresh Sweet Dutch Klappertaart dessert"],
        zh: ["国家金奖级木琴交响乐现场演出", "零基础乐器伴奏敲击法点拨", "穿着隆重的闽那哈沙华丽古装拍照", "享用刚烤好的金黄香软椰子挞糕点（加茶水）"],
        ko: ["국가 콩쿠르 수상 경력 음악가들의 연주 직관", "완전 초보자 전용 1:1 맞춤형 타격 주법 전수", "화려한 가바사란 부족 전사 갑옷 또는 화전가 의복 입기 사진전", "갓 구워내 치즈가 가득한 클라페르타르트 제공 (미나하사 생강 가루 차 포함)"],
        vi: ["Hòa nhạc trực tiếp của nhóm nhạc điệu", "Khóa đào tạo gõ đàn gỗ một kèm một", "Chụp ảnh cổ phục lễ hội Minahasa thêu kim tuyến", "Thưởng thức đĩa bánh dừa nướng mật và nước trà hoa vàng"],
        la: ["Pementatio viva musices Kolintang", "Cursus privatus lignei organi", "Imago indumentis Minahasanis decorata", "Crustulum dulce e lacte factum"]
      },
      itinerary: {
        id: [
          { time: "13:30 - 14:00", activity: "Registrasi di Balai Sanggar & jamuan teh rempah pedesaan." },
          { time: "14:00 - 14:45", activity: "Konser mini live ansambel kolintang membawakan lagu daerah & nasional klasik." },
          { time: "14:45 - 16:00", activity: "Workshop musik kolintang (membaca notasi angka, koordinasi pukulan melodi & bas)." },
          { time: "16:00 - 16:30", activity: "Sesi berfoto megah dengan pakaian adat leluhur Minahasa & sesi hidangan Klappertaart murni." }
        ],
        en: [
          { time: "13:30 - 14:00", activity: "Registration at the village music arena & rustic herbal tea hospitality." },
          { time: "14:00 - 14:45", activity: "Live mini concert of traditional & international melodies parsed by Kolintang keys." },
          { time: "14:45 - 16:00", activity: "Hands-on musical masterclass (striking scales, tempo coordination, and chord patterns)." },
          { time: "16:00 - 16:30", activity: "Majestic Minahasan heritage costume photoshoot & dessert degustation of fresh Klappertaart." }
        ],
        zh: [
          { time: "13:30 - 14:00", activity: "在演艺工坊大厅签到，并享用本地有机草药茶歇。" },
          { time: "14:00 - 14:45", activity: "民乐艺术家联袂呈现现场微型音乐会，演绎经典传统音乐及世界名曲。" },
          { time: "14:45 - 16:00", activity: "木琴大师一对一教学，带您读懂爪哇简谱并亲自动手演奏一首欢快乐曲。" },
          { time: "16:00 - 16:30", activity: "穿戴传统美娜多贵族刺绣华服拍照，享用新鲜出炉的椰子挞下午茶。" }
        ],
        ko: [
          { time: "13:30 - 14:00", activity: "전통 음악 전수당에서 접수 및 환영 농가 보리 야자나무 차 배부." },
          { time: "14:00 - 14:45", activity: "콜린탕 오케스트라 전통 민요 및 현대 트렌드 음악 편곡 라이브 감상." },
          { time: "14:45 - 16:00", activity: "원주민 작곡가 주최 음악 원데이 클래스 (채채 읽기 및 파트별 실습 연주)." },
          { time: "16:00 - 16:30", activity: "민족 대례복 착용 가바사란 부족 포토존 체험 및 코코넛 타르트 우아한 실버 서비스." }
        ],
        vi: [
          { time: "13:30 - 14:00", activity: "Làm thủ tục tại nhà văn hóa làng, đón bằng ly trà sâm sả hữu cơ." },
          { time: "14:00 - 14:45", activity: "Đại nhạc hội mini do các thiếu niên trong làng hòa tấu mộc hữu tình." },
          { time: "14:45 - 16:00", activity: "Thực hành lớp gỗ nhạc cổ (tập đọc nhịp gõ chính, bài tập liên nốt âm giai căn bản)." },
          { time: "16:00 - 16:30", activity: "Thay trang phục thêu thủ công lễ tết hoàng kim chụp hình kỉ niệm, ăn xế bánh dừa." }
        ],
        la: [
          { time: "13:30 - 14:00", activity: "Inscriptio in balneo communi ac potatio zinziberis." },
          { time: "14:00 - 14:45", activity: "Concertus mini vivi instrumenti ad canendum carmina patria." },
          { time: "14:45 - 16:00", activity: "Exercitatio melodiae lignei organi sub tutela magistri loci." },
          { time: "16:00 - 16:30", activity: "Sessiones photographiae indumentis maiorum patriis vestitus ac degustatio placentae." }
        ]
      },
      facilities: {
        id: ["Kursi Penonton VIP Sanggar", "Penggunaan Set Kolintang Profesional", "Kostum Adat Istiadat Lengkap", "Kue Klappertaart Oven & Teh", "Pemberkatan Souvenir Sumpit Kayu"],
        en: ["Front-row Pavilion Seating", "Access to Professional Timber Sets", "Full Heritage Fabric & Prop Chest", "Freshly baked Klappertaart & Brewed tea", "Engraved Timber Chopsticks Token"],
        zh: ["演艺演播厅前排贵宾软座", "共享专业级优质重木琴器材", "全套华丽舞台民族服饰租赁", "椰肉蛋白挞点心拼盘、茶饮一套", "赠送一双塔拉瓦安手作雕花木质筷礼盒"],
        ko: ["공연실 전열 VIP 전용 좌석 안착", "전문 연주자용 최상급 콜린탕 1인당 1세트 배정", "고급 자수 및 창검 부족 전사 전통의상 착장 일체", "오븐 베이킹 디저트와 프리미엄 유기 자바티 제공", "정성껏 조각한 명품 목제 젓가락 기념 패키지 증정"],
        vi: ["Băng ghế VIP trực diện sân khấu", "Thực hành trên bộ âm mộc chuyên nghiệp", "Hệ trang phục thủ công và giáo cụ Kabasaran", "Buffet bánh Klappertaart béo ngọt trà thảo mộc", "Quà tặng đôi đũa khảm dừa chạm khắc tay tinh xảo"],
        la: ["Sella VIP in concertu orbis", "Usus organi lignei optimi", "Indumenta historica et gladii theatrales", "Placentula de lacte ac potus calidus", "Munus ligneorum bacillorum sculptorum vici"]
      }
    },
    {
      id: "livein-homestay",
      category: "live-in",
      title: {
        id: "Paket Live-in Homestay Mandiri Kawanua ",
        en: "Minahasan Homestay & Traditional Live-in Experience",
        zh: "美娜多“卡瓦努亚”原乡宿营特色生活体验套餐",
        ko: "카완우아 정겨운 농가 민박 (2일 1야 숙박 체험 패키지)",
        vi: "Gói Trải Nghiệm Homestay Kawanua & Nhịp Sống Bản Bản",
        la: "Hospitium Habitationis Kawanua ac Vitae Rusticae"
      },
      subtitle: {
        id: "Rasakan kearifan hidup damai di rumah panggung kayu adat Minahasa, membuat masakan lezat bersama keluarga lokal, serta bersepeda pagi sejuk.",
        en: "Spend 2D1N hosted inside stilted custom timber villas, harvest organic vegetables, cook handmade sweets, and cycle along sunrise lanes.",
        zh: "住进村民原生态松木高脚楼内，当一天塔拉瓦安荣誉村民。清晨迎着鸟鸣在椰林村道中骑车晃悠，晚上随村民阿姨学做经典甜品椰子挞，治愈心灵。",
        ko: "숲속 호젓하게 서 있는 전통 원목 고각 가옥에서 하룻밤 힐링을 가집니다. 주인집 어머님과 달콤한 전통 과자를 함께 굽고 자전거로 아침 안개 낀 언덕 골목을 여행하십시오.",
        vi: "Trải nghiệm 2 ngày 1 đêm sinh hoạt tại nhà sàn gỗ truyền thống ấm cúng, tự tay chuẩn bị nguyên liệu lúa vàng và xe đạp dạo quanh thung lũng dừa xanh mát.",
        la: "Habita in aedibus ligneis maiorum patriorum una nocte, para cibos optimos cum familia vici, et vehere birotula mane."
      },
      price: 350000,
      priceSuffix: {
        id: "/ Malam",
        en: "/ Night",
        zh: "/ 每晚",
        ko: "/ 1박 기준",
        vi: "/ Đêm",
        la: "/ In Singulas Noctes"
      },
      duration: {
        id: "2 Hari 1 Malam",
        en: "2 Days 1 Night",
        zh: "2 天 1 晚",
        ko: "2일 1박 숙박 코스",
        vi: "2 Ngày 1 Đêm",
        la: "II Dies I Nox"
      },
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=650",
      rating: "5.0",
      reviews: "60",
      highlights: {
        id: ["Rumah Panggung Kayu Adat", "Kursus Masak Kuliner Tradisional", "Sepeda Santai Keliling Desa", "Sarapan Nasi Kuning Daun Woka"],
        en: ["Traditional Wooden Stilt House", "Home Culinary Cooking Class", "Bicycle Rental Village Ride", "Woka Leaf Yellow Rice Breakfast"],
        zh: ["百年传承传统精雕松木高脚别墅", "私房菜厨房实操课（椰肉挞烘烤）", "清早骑联排单车穿行薄雾森林", "由房东母亲亲手熬制的纯叶姜黄饭"],
        ko: ["세월의 혼이 담긴 전원 원목 고각 주택 숙박", "방동 안방 주방 원데이 가정요리 쿠킹 클래스", "마을 풍경 정취 속 자전거 라이딩 지원", "아침 보약이 되는 전통 워카 잎 노란 황금밥 일체 제공"],
        vi: ["Nhà sàn cổ rêu phong mát rợp tre dừa", "Lớp dạy nấu súp và làm bánh dừa tại gia", "Dịch vụ thuê xe đạp điền dã thung lũng", "Bữa sáng truyền thống súp cay gói lá Woka"],
        la: ["Domus lignea vetusta communis", "Cursus culinarius domesticus", "Birotula ad vici valles videndas", "Jentaculum oryzae luteae in foliis involvutale"]
      },
      itinerary: {
        id: [
          { time: "Hari 1 - 14:00", activity: "Penyambutan dengan kalung kain tenun adat di Homestay bapak angkat." },
          { time: "Hari 1 - 16:00", activity: "Private Cooking Lesson membuat Klappertaart murni oven arang tradisi." },
          { time: "Hari 1 - 19:00", activity: "Makan malam bersama keluarga (berbagi kisah rakyat Minahasa & sejarah klan)." },
          { time: "Hari 2 - 06:30", activity: "Sepeda santai melihat kabut pagi kebun cengkeh & perkebunan kelapa." },
          { time: "Hari 2 - 08:00", activity: "Sarapan megah Nasi Kuning Daun Woka legendaris yang pulen gurih." }
        ],
        en: [
          { time: "Day 1 - 14:00", activity: "Arrival & warm welcome with Minahasan fabric sash by your host family." },
          { time: "Day 1 - 16:00", activity: "Private baking session preparing customized stove-baked sweet desserts." },
          { time: "Day 1 - 19:00", activity: "Family dinner, listening to Minahasan mythology tales and custom songs." },
          { time: "Day 2 - 06:30", activity: "Rise early for a bike cruise across fog-laden clove and coconut heights." },
          { time: "Day 2 - 08:00", activity: "Enjoy a handmade rich yellow turmeric rice parcel wrapped in rainforest woka leaves." }
        ],
        zh: [
          { time: "第1天 - 14:00", activity: "入住接待，房东在自家高脚屋中为您佩戴象征尊贵祝福的编织围巾。" },
          { time: "第1天 - 16:00", activity: "在后院厨房上一节私人家常菜课，在大铁锅前熬煮红糖，烘焙热烘烘的椰子挞。" },
          { time: "第1天 - 19:00", activity: "与一家人坐在木屋走廊下面吃晚餐，听热情老村长讲解民俗典故与传说。" },
          { time: "第2天 - 06:30", activity: "骑车探索晨露未消的椰林与丁香小道，与当地早起劳作割蜜汁的农夫热烈招手。" },
          { time: "第2天 - 08:00", activity: "回到木屋露台，享用房东精心熬煮、香甜油润的芭蕉沃卡叶生姜黄姜饭。" }
        ],
        ko: [
          { time: "1일차 - 14:00", activity: "마을 진구의 집에 체크인, 대문 앞 전통 원목 환영 화목 목도리 전달식." },
          { time: "1일차 - 16:00", activity: "엄마의 비공개 가보 요리 레시피에 따르는 아렌 시럽 마카롱 쿠킹 수업." },
          { time: "1일차 - 19:00", activity: "호스트 패밀리와 대청마루에서 가정식 저녁 식사 및 미나하사 부족의 영혼 신화 담소." },
          { time: "2일차 - 06:30", activity: "아침 안개 자욱한 언덕배기 정원길을 따라 펼쳐지는 숲 산책용 무료 자전거 드라이빙." },
          { time: "2일차 - 08:00", activity: "모락모락 김나는 명문가의 솜씨가 담긴 워카 잎 노란 보약 밥과 생과 요리로 아침 충전." }
        ],
        vi: [
          { time: "Ngày 1 - 14:00", activity: "Check-in làm quen cùng gia chủ, nhận dải quấn sẫm dệt tay chào mừng." },
          { time: "Ngày 1 - 16:00", activity: "Cùng bà chủ homestay đun mật hoa dừa nira làm bánh nướng dừa xiêm." },
          { time: "Ngày 1 - 19:00", activity: "Ăn cơm chung thân mật gia đình bản xứ, trải lòng nghe các tích truyện xưa." },
          { time: "Ngày 2 - 06:30", activity: "Đạp xe ngắm mặt trời mọc xuyên ngàn dừa và tìm bình yên giữa lá bay." },
          { time: "Ngày 2 - 08:00", activity: "Bữa sáng tuyệt mĩ cơm thốt nốt vàng nghệ nấu dừa nạo và trà thanh tâm." }
        ],
        la: [
          { time: "Dies I - 14:00", activity: "Adventus ad domum et acceptio hospitalis cum textile patriae." },
          { time: "Dies I - 16:00", activity: "Cursus culinarius privatus in thermis pro placentis de lacte." },
          { time: "Dies I - 19:00", activity: "Cenatio communis cum familia loci et fabulae patriotarum auditio." },
          { time: "Dies II - 06:30", activity: "Vehere birotula ad videndam matutinam nebulam super agros clavorum caryophyllicorum." },
          { time: "Dies II - 08:00", activity: "Jentaculum egregium oryzae flavae patriae in foliis palmarum involvutale." }
        ]
      },
      facilities: {
        id: ["Rumah Kamar Tidur Bersih & AC/Fan", "Alat Mandi & Amenities Organik", "Sarapan Bersama Keluarga", "Sewa Sepeda Gunung Gratis", "Pelajaran Memasak Tradisional"],
        en: ["Clean Wooden Room with Fan/AC", "Soft Bedding & Forest Soap Toolkit", "Home-made Authentic Breakfasts", "Free Cruising Trail Bicycles", "All baking ingredients & molds included"],
        zh: ["干净通风的原松木双人间（配风扇/空调）", "优质洗漱全套用品（含椰子花提取皂）", "每日房东妈妈掌勺的精美风情早餐", "24小时免费使用的坚固山地自行车", "烹饪课全套原材料教材与围裙一份"],
        ko: ["깨끗하게 정돈된 실내 에어컨 가동 친환경 룸", "수제 천연 코코넛 오일 수건 및 세면도구 세트", "정성이 깃든 아침 밥상 식비 공짜", "투숙 기간 무료 제공되는 알루미늄 자전거 대여", "요리 주방 시설 사용료 및 버터 식자재 소모품비 일체 포함"],
        vi: ["Phòng đơn gỗ sạch thoáng mát quạt điều hóa", "Chăn gối rơm dệt dừa thơm và bộ dầu gội thiên nhiên", "Ẩm thực bữa sáng tinh tế từ nếp nương", "Mượn xe đạp địa hình dã ngoạn không thu phí", "Chi phí lớp dạy làm thủ công bánh thốt nốt"],
        la: ["Cubiculi lignei mundi praesidium", "Balnei instrumenta bio-organica de vico", "Jentaculum integrum domesticum", "Birotula montana gratuita", "Omnia pro cursu coquinaria"]
      }
    }
  ];

  const filtered = packages.filter(
    (p) => filter === "semua" || p.category === filter
  );

  const tLocal = {
    badge: { id: "Program Resmi Desa Wisata", en: "Certified Village Tourism Packages", zh: "印尼观光部官方认证 · 塔拉瓦安民俗体验", ko: "인도네시아 관광부 공인 · 탈라와안 패키지", vi: "Trực Thuộc Ban Quản Lí Du Lịch Làng Talawaan", la: "Hospitia Publica Vici Talawaan" },
    title: { id: "Paket Wisata & Edukasi", en: "Vibrant Eco & Heritage Packages", zh: "特色旅游与自然研学套餐", ko: "체험형 에코 & 전통 투어 패키지", vi: "Gói Trải Nghiệm Du Lịch & Khoa Giáo", la: "Hospitia Itinerum ac Scientiae" },
    desc: { 
      id: "Rangkuman program paket wisata otentik berdasar promosi Komite Desa Wisata Talawaan Sulawesi Utara. Ikuti kegiatannya, hitung biayanya secara teliti, serta klaim tiket boarding pass digital Anda secara langsung.",
      en: "Discover real curated tour bundles summarized from the official Desa Wisata Talawaan board. Select a custom campaign, dynamically estimate your complete coordinates, and fetch your validated ticket offline check-in pass.",
      zh: "汇总自苏拉威西省塔拉瓦安（Talawaan）观光大厅官方推荐。选择适合您的特色路线，并使用即时计算器计算并定制附加服务，即可生成离线验证款数字登机牌。",
      ko: "북술라웨시 미나하사 탈라와안 마을 위원회에서 배포하는 공인 패키지를 한눈에 확인하고 예약 인원에 따른 실시간 예산 연산과 모바일 디지털 승차권을 즉시 발권받으세요.",
      vi: "Bản tổng hợp chi tiết các tùy chọn hành trình được bảo chứng bởi Ủy ban Phát triển Du lịch Làng Talawaan. Kính mời quý khách trải nghiệm, tính toán ngân sách và nhận mã số check-in tàu xe điện tử.",
      la: "Conspectus rationum publicarum de consilio municipis Talawaan. Accipe consilia, computa sumptus, et obtine chartam computatoris digitalem."
    },
    filterAll: { id: "Semua Paket", en: "All Experiencies", zh: "全部套餐", ko: "전체 목록", vi: "Tất Cả", la: "Omnia" },
    filterAdventure: { id: "Petualangan", en: "Adventures", zh: "户外探险", ko: "폭포 어드벤처", vi: "Phiêu Lưu", la: "Agrestis" },
    filterEdu: { id: "Edukasi & Budaya", en: "Cuisine & Heritage Workshop", zh: "非遗与手作研学", ko: "전통문화 & 아그로", vi: "Khoa Giáo & Nhã Nhạc", la: "Cultus ac Scientia" },
    filterStay: { id: "Live-in Homestay", en: "Cozy Homestays", zh: "原村民房宿营", ko: "전원 주택 1박", vi: "Homestay Bản Địa", la: "Habitato Domestica" },
    durationLabel: { id: "Durasi", en: "Duration", zh: "游玩时长", ko: "소요 시간", vi: "Thời Lượng", la: "Tempus" },
    priceLabel: { id: "Mulai dari", en: "Starts at", zh: "超值价仅", ko: "체험 요금", vi: "Giá Cực Tốt", la: "Pretium" },
    highlightsLabel: { id: "Fasilitas Utama", en: "Bundle Highlights", zh: "精彩看点", ko: "핵심 혜택", vi: "Điểm Nhấn Gói", la: "Precipua Beneficia" },
    btnItineraryShow: { id: "Lihat Rencana Perjalanan", en: "View Scenic Itinerary", zh: "查看行程详细时间表", ko: "상세 스케줄 노선 보기", vi: "Xem Lịch Trình Chi Tiết", la: "Inspice Tempus Itineris" },
    btnItineraryHide: { id: "Tutup Rencana Perjalanan", en: "Hide Scenic Itinerary", zh: "隐藏行程时间表", ko: "상세 스케줄 숨기기", vi: "Ẩn Lịch Trình Chi Tiết", la: "Celare Tempus Itineris" },
    btnBookNow: { id: "Reservasi Paket Ini", en: "Book This Experience", zh: "立即在线定制预约", ko: "이 패키지 예약하기", vi: "Đặt Gói Trải Nghiệm Ngay", la: "Siste Hospitium Hoc" },
    
    // Modal Booking Translate
    modalTitle: { id: "Formulir Booking Wisata Resmi", en: "Official Visitor Booking Portal", zh: "印尼塔拉瓦安村旅游部 · 预约信息单", ko: "탈라와안 마을 관광부 · 패키지 맞춤 예약서", vi: "Đơn Đăng Ký Đặt Hành Trình Làng Talawaan", la: "Charta Booking Officialis Vici" },
    modalSubtitle: { id: "Simulasikan rencana tanggal dan tambahkan layanan opsional untuk mendapatkan tanda masuk resmi.", en: "Customize options, add premium facilities flat fees, and generate your printable receipt pass.", zh: "随心自选日期与人数，配置接送或航拍等尊享升级服务，系统可秒速计算总账并为您生成正式电子确认书。", ko: "인도네시아 전통 패키지 인원 설정 및 셔틀버스, 드론 찰영 등 세부 옵션을 조율하고 가상 발권을 개시하세요.", vi: "Tùy chỉnh các hạng mục dịch vụ cộng thêm, xác định ngày khởi hành để in hóa đơn điện tử tự động.", la: "Modifica options ad libitum et obtine chartam confirmationis pro ingressu." },
    labelName: { id: "Nama Wisatawan", en: "Primary Guest Name", zh: "游客姓名", ko: "예약자 본명", vi: "Tên Khách Hàng Đại Diện", la: "Nomen Viatoris" },
    placeholderName: { id: "Tulis nama lengkap sesuai paspor/KTP", en: "Enter full legal name", zh: "请输入您的中文/拼音姓名", ko: "신분증과 동일한 실명을 입력해 주세요", vi: "Nhập họ và tên đầy đủ theo căn cước", la: "Scribe nomen secundum tabulas" },
    labelPhone: { id: "Nomor WhatsApp / Kontak", en: "WhatsApp / Contact Mobile", zh: "联系电话 (微信/WhatsApp)", ko: "연락처 (WhatsApp/전화번호)", vi: "Số Điện Thoại Trực", la: "Numerus Coniunctionis" },
    placeholderPhone: { id: "Contoh: +62 812-4455-XXX", en: "Example: +1 415-555-0199", zh: "例如: +86 139-0000-0000", ko: "예시: +82 10-1234-5678", vi: "Ví dụ: +84 905-123-xxx", la: "Exemplum: +62..." },
    labelDate: { id: "Tanggal Kunjungan", en: "Check-in / Tour Date", zh: "拟定游览日期", ko: "투어 참가 일자", vi: "Ngày Đi Tour", la: "Dies Visiti" },
    labelGuests: { id: "Jumlah Anggota Grup", en: "Total Passengers / Guests", zh: "出发旅客人数", ko: "참가 총 인원", vi: "Số Lượng Thành Viên", la: "Numerus Viatorum" },
    labelAddons: { id: "Layanan Ekstra & Fasilitas Opsional", en: "Available Premium Upgrades & Add-ons", zh: "可选专车接送与豪华配套增值服务", ko: "탈라와안 유료 프리미엄 부가 서비스", vi: "Dịch Vụ Nâng Cấp Tùy Chọn", la: "Dona ac Hospitia Extra Optionis" },
    
    addonAirportDesc: { id: "Antar-Jemput Bandara Sam Ratulangi (Manado - PP) Flat", en: "Sam Ratulangi Airport (MDC) Two-way Private Shuttle Flat", zh: "万鸦老机场（MDC）往返私人双程专车接送（平价收取）", ko: "마나도 삼 라툴랑이 공항 (MDC) 왕복 차량 단독 드롭/픽업 플랫", vi: "Đưa đón sân bay Sam Ratulangi khứ hồi bằng xe hơi riêng", la: "Vectura ad aeroportum Sam Ratulangi flat" },
    addonDocDesc: { id: "Dokumentasi Foto & Drone Video Profesional (+Rp 100K/pax)", en: "HD Photography & Premium Drone Footage (+Rp 100K/guest)", zh: "专业摄影级单反高清航拍和航拍剪辑服务 (+每人 100K印尼盾)", ko: "전문 스틸 컷 & 시네마틱 드론 무비 패키징 (+1인당 100K)", vi: "Hỗ trợ chụp hình quay phim Drone lấy ngay (+100K/khách)", la: "Luce expressa ac drone video professionalis (+Rp 100K/pax)" },
    addonKlapDesc: { id: "Box Doos Ekstra Klappertaart Premium bawa pulang (+Rp 35K/box)", en: "Sweet Oven-baked Klappertaart Gift Box for Souvenir (+Rp 35K/box)", zh: "私房现烤椰子挞伴手礼盒（250g大号装） (+每盒 35K印尼盾)", ko: "포장 전용 수제 클라페르타르트 대용량 기프트 박스 (+박스당 35K)", vi: "Bánh dừa Klappertaart hộp quà tặng mang về (+35K/hộp)", la: "Box extra Placentulae e lacte pro munere (+Rp 35K/box)" },
    
    totalCalc: { id: "Kalkulasi Estimasi Biaya", en: "Total Estimated Budget Breakdown", zh: "定制预算财务清细账单", ko: "예산 회계 청구 내역서", vi: "Bảng Chi Nhánh Dự Toán Ngân Sách", la: "Ratio Sumptuum Totalis" },
    baseBill: { id: "Tarif Dasar Paket ({0} orang):", en: "Base Bundle Fare ({0} travelers):", zh: "原定套票底价 ({0} 人):", ko: "기본 패키지 요금 ({0} 인):", vi: "Giá gốc gói du lịch ({0} khách):", la: "Pretium Hospitii Base ({0} pers):" },
    addonTotal: { id: "Akumulasi Biaya Tambahan Opsional:", en: "Chosen Premium Upgrades:", zh: "选购附加服务费用合计:", ko: "추가 선택 편의 옵션 요금:", vi: "Phí dịch vụ tùy chọn cộng thêm:", la: "Summa Optionum Extra:" },
    grandTotal: { id: "Total Pembayaran (Simulasi):", en: "Grand Total Booking Est (Simulated):", zh: "预计结算总金额 (系统模拟):", ko: "최종 예상 청구 금액 (가상 연산):", vi: "TỔNG CHI PHÍ DỰ KIẾN (GIẢ LẬP):", la: "Summa Finalis Solvenda (M):" },
    btnConfirm: { id: "Konfirmasi & Terbitkan Boarding Pass", en: "Confirm & Generate Digital Boarding Ticket", zh: "确认并一键生成数字盖章登机牌", ko: "예약 확정 및 디지털 보딩 티켓 발행", vi: "Xác nhận & Khởi Tạo Vé Lên Tàu Điện Tử", la: "Confirma ac Creare Chartam Introitus" },
    btnCancel: { id: "Batal", en: "Close", zh: "取消", ko: "취소", vi: "Hủy Bỏ", la: "Cancel" },

    // Ticket View translations
    ticketTitle: { id: "TIKET BOARDING PASS DESA WISATA", en: "OFFICIAL TOURIST BOARDING PASS", zh: "大印尼国家观光部 · 塔拉瓦安登机确认牌", ko: "인도네시아 관광부 · 탈라와안 보딩 마일리지 패스", vi: "VÉ CHIẾC XE LÊN TÀU DU LỊCH TALAWAAN", la: "TABULA INTROITIS OFFICIALIS SECTORIS" },
    ticketStatus: { id: "STATUS: MENUNGGU VERIFIKASI OFFLINE", en: "STATUS: UNPAID SIMULATION PASSPORT", zh: "验证状态: 模拟离线待签到", ko: "예약 상태: 가상 현장 확인 예정", vi: "TRẠNG THÁI: CHỜ VÉ CHÍNH THỨC TẠI CHỖ", la: "STATUS: CONFIRMANDUS IN VICO" },
    ticketNotice: { id: "Bawa screenshoot halaman ini ke Kantor Balai Desa Talawaan atau tunjukkan ke pos penjaga Air Terjun Tunan untuk pembayaran dan penukaran tiket gelang asli sesuai harga simulasi.", en: "Save this dynamic voucher page! Present the validated snapshot at the Talawaan Townhall Committee or Tunan entry post to process cash payment at the simulated rates.", zh: "请将本页面截图保存！抵达塔拉瓦安村长公所（Balai Desa）或图南瀑布售票亭时出示，即可按照本系统算好的平民折扣价格支付现金，兑换纸质彩条手环大门票。", ko: "이 화면을 반드시 캡처해 주세요! 탈라와안 보건소 앞 매표소 또는 투난 폭포 안내데스크 직원에게 캡처본을 보여주시면 즉시 가상 계산된 특별 할인가로 현장 결제하고 공식 입장 팔찌로 교환해 드립니다.", vi: "Vui lòng chụp màn hình vé điện tử này! Trình vé khi đến Văn phòng thị trấn Talawaan hoặc quầy vé Thác Tunan để mua thẻ đeo cổ tay chính thức với giá ưu đãi giả định này.", la: "Serva hanc tabulam! Ostende hanc imaginem in foro vici Talawaan aut ad cataractam ut solvas pretium et accipias tesserae verae." },
    btnCloseReceipt: { id: "Selesai & Cetak Tiket Baru", en: "Done & Plan Another Journey", zh: "完成并开始新一轮预订", ko: "인쇄 및 새 여행 설계하기", vi: "Hoàn Tất & Lên Lịch Trình Mới", la: "Finitum ac Creare Novum" }
  };

  const getTVal = (key: keyof typeof tLocal) => {
    return tLocal[key][lang] || tLocal[key]["id"];
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleOpenBooking = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setBookingName("");
    setBookingPhone("");
    setGuestCount(2);
    setAddonAirport(false);
    setAddonDocumentation(false);
    setAddonDoubleKlap(false);
    setBookingTicket(null);
  };

  // Live total sum algorithm
  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    let base = selectedPackage.price * guestCount;
    let addonSum = 0;
    if (addonAirport) addonSum += 150000; // Flat Shuttle 
    if (addonDocumentation) addonSum += 100000 * guestCount; // Per person picture drone 
    if (addonDoubleKlap) addonSum += 35000 * guestCount; // Box per person souvenir
    return base + addonSum;
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) {
      alert(lang === "id" ? "Mohon tuliskan nama lengkap Anda" : "Please input your full tourist name");
      return;
    }
    const ticket = {
      id: "TLW-" + Math.floor(100000 + Math.random() * 900000),
      packageName: selectedPackage?.title[lang] || selectedPackage?.title["id"],
      packageCategory: selectedPackage?.category,
      guestName: bookingName,
      guestPhone: bookingPhone || "N/A",
      date: bookingDate,
      guests: guestCount,
      addons: {
        airport: addonAirport,
        documentation: addonDocumentation,
        extraKlap: addonDoubleKlap
      },
      duration: selectedPackage?.duration[lang],
      grandTotal: calculateTotal(),
      status: "pending" as const,
      timestamp: Date.now()
    };

    // Save using dbService to ensure consistency with real-time firestore or localStorage
    saveReservation(ticket).catch((err) => console.error("Firestore reservation failed:", err));

    setBookingTicket(ticket);
  };

  return (
    <div id="section-paket" className="bg-sand-50 py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative Radial Grid BG */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-forest-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-gold-100/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Masthead Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-100/60 border border-gold-200/40 px-3 py-1.5 rounded-full inline-block">
            {getTVal("badge")}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-gray-900 font-extrabold tracking-tight">
            {getTVal("title")}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold max-w-2xl mx-auto">
            {getTVal("desc")}
          </p>

          {/* Category Filter Pills */}
          <div className="flex justify-center flex-wrap gap-2.5 pt-6">
            <button
              id="pkg-filter-semua"
              onClick={() => setFilter("semua")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 flex items-center space-x-1.5 shadow-sm ${
                filter === "semua"
                  ? "bg-forest-700 text-sand-50 border border-forest-800"
                  : "bg-white text-gray-600 border border-sand-200 hover:bg-sand-100"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{getTVal("filterAll")}</span>
            </button>
            <button
              id="pkg-filter-petualangan"
              onClick={() => setFilter("petualangan")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 flex items-center space-x-1.5 shadow-sm ${
                filter === "petualangan"
                  ? "bg-forest-700 text-sand-50 border border-forest-800"
                  : "bg-white text-gray-600 border border-sand-200 hover:bg-sand-100"
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-gold-500" />
              <span>{getTVal("filterAdventure")}</span>
            </button>
            <button
              id="pkg-filter-edukasi"
              onClick={() => setFilter("edukasi")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 flex items-center space-x-1.5 shadow-sm ${
                filter === "edukasi"
                  ? "bg-forest-700 text-sand-50 border border-forest-800"
                  : "bg-white text-gray-600 border border-sand-200 hover:bg-sand-100"
              }`}
            >
              <Music className="h-3.5 w-3.5 text-gold-500" />
              <span>{getTVal("filterEdu")}</span>
            </button>
            <button
              id="pkg-filter-live-in"
              onClick={() => setFilter("live-in")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 flex items-center space-x-1.5 shadow-sm ${
                filter === "live-in"
                  ? "bg-forest-700 text-sand-50 border border-forest-800"
                  : "bg-white text-gray-600 border border-sand-200 hover:bg-sand-100"
              }`}
            >
              <Home className="h-3.5 w-3.5 text-gold-500" />
              <span>{getTVal("filterStay")}</span>
            </button>
          </div>
        </div>

        {/* Tourism Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="packages-cards-layout">
          {filtered.map((pkg) => {
            const isItineraryOpen = expandedItineraryId === pkg.id;
            return (
              <div 
                key={pkg.id} 
                id={`pkg-card-${pkg.id}`}
                className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Aspect cover photo */}
                  <div className="h-64 sm:h-72 overflow-hidden relative select-none">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title[lang]} 
                      className="w-full h-full object-cover transform hover:scale-105 duration-700 pointer-events-none"
                    />
                    
                    {/* Floating Info Tag badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="bg-forest-900/90 text-sand-50 text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1.5 rounded-xl backdrop-blur-sm self-start">
                        {pkg.category === "petualangan" ? "Adventure" : pkg.category === "edukasi" ? "Workshop" : "Staycation"}
                      </span>
                      <span className="bg-white/95 border border-sand-300/40 text-gray-800 text-[10px] font-bold tracking-widest px-3 py-1 rounded-xl shadow-sm flex items-center gap-1 self-start">
                        <Clock className="h-3 w-3 text-gold-600" />
                        {pkg.duration[lang]}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md border border-sand-100 text-xs font-semibold text-gray-800 flex items-center gap-1 flex-row">
                      <Award className="h-3.5 w-3.5 text-gold-500" />
                      <span>{pkg.rating} ({pkg.reviews} {lang === "id" ? "Ulasan" : "Reviews"})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                      {pkg.title[lang] || pkg.title.id}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {pkg.subtitle[lang] || pkg.subtitle.id}
                    </p>

                    <div className="border-t border-b border-sand-100 py-4 space-y-3">
                      <span className="block text-[10px] font-mono font-bold text-gold-600 uppercase tracking-widest">
                        {getTVal("highlightsLabel")}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.highlights[lang].map((hl, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-gray-700 font-medium">
                            <CheckCircle2 className="h-4 w-4 text-forest-600 shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Collapsible Itinerary and Core CTA */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 space-y-4">
                  {/* Collapsible Itinerary Box */}
                  <div>
                    <button
                      id={`btn-toggle-iti-${pkg.id}`}
                      onClick={() => setExpandedItineraryId(isItineraryOpen ? null : pkg.id)}
                      className="w-full bg-sand-50 hover:bg-sand-100/80 border border-sand-200/60 rounded-xl px-4 py-3 text-xs font-bold text-gray-600 hover:text-forest-800 flex items-center justify-between transition-colors duration-200 select-none cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-forest-600" />
                        <span>{isItineraryOpen ? getTVal("btnItineraryHide") : getTVal("btnItineraryShow")}</span>
                      </div>
                      {isItineraryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    <AnimatePresence>
                      {isItineraryOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-2 bg-gradient-to-r from-sand-50/50 to-sand-100/20 border border-sand-200/50 rounded-xl p-4 text-xs space-y-3 text-left shadow-inner"
                        >
                          <div className="relative border-l-2 border-forest-300 ml-2 pl-4 py-1 space-y-4">
                            {pkg.itinerary[lang].map((step, idx) => (
                              <div key={idx} className="relative">
                                {/* Timeline Dot indicator overlay */}
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-forest-600 border border-white rounded-full" />
                                <span className="block text-[10px] font-mono font-bold text-forest-600 tracking-wider">
                                  {step.time}
                                </span>
                                <p className="text-gray-600 mt-0.5 leading-relaxed font-medium">
                                  {step.activity}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Core Price & Book button Row */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 pt-2">
                    <div className="self-start sm:self-auto select-none">
                      <span className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                        {getTVal("priceLabel")}
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-mono font-extrabold text-forest-800">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold">
                          {pkg.priceSuffix[lang]}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`btn-book-pkg-${pkg.id}`}
                      onClick={() => handleOpenBooking(pkg)}
                      className="w-full sm:w-auto bg-forest-700 hover:bg-forest-800 text-sand-50 border border-forest-800 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5 select-none"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-bounce" />
                      <span>{getTVal("btnBookNow")}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Booking & Receipt Dialog Overlay */}
      <AnimatePresence>
        {selectedPackage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-10 bg-black/60 backdrop-blur-sm overflow-y-auto"
            id="booking-overlay"
          >
            {/* Modal Body Card backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border border-sand-200 shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
              id="booking-modal-card"
            >
              
              {/* Header Title Bar */}
              <div className="bg-forest-950 text-sand-50 p-6 flex justify-between items-start border-b border-forest-900 select-none">
                <div className="text-left">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold-400">
                    {getTVal("modalTitle")}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                    {selectedPackage.title[lang]}
                  </h3>
                </div>
                <button 
                  id="btn-close-booking-modal"
                  onClick={() => setSelectedPackage(null)}
                  className="bg-forest-900 text-forest-300 hover:text-white p-2 rounded-xl border border-forest-800 hover:bg-forest-800 transition-smooth"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Collapsible main container scroll */}
              <div className="overflow-y-auto p-6 sm:p-8 text-left space-y-6 grow">
                
                {!bookingTicket ? (
                  /* Form Input & Live budget estimation mode */
                  <form onSubmit={handleCreateTicket} className="space-y-6">
                    <div>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-semibold">
                        {getTVal("modalSubtitle")}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider font-sans">
                          {getTVal("labelName")} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="book-form-name"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder={getTVal("placeholderName")}
                          className="w-full border border-sand-250 bg-sand-50/50 hover:bg-sand-50 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:border-forest-600 focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Phone / Whatsapp */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider font-sans">
                          {getTVal("labelPhone")} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          id="book-form-phone"
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder={getTVal("placeholderPhone")}
                          className="w-full border border-sand-250 bg-sand-50/50 hover:bg-sand-50 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm font-medium focus:border-forest-600 focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Trip Date */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider font-sans">
                          {getTVal("labelDate")}
                        </label>
                        <div className="relative">
                          <input 
                            type="date" 
                            id="book-form-date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full border border-sand-250 bg-sand-50/50 hover:bg-sand-50 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-800 focus:border-forest-600 focus:outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Pax Stepper Counter Counter */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider font-sans">
                          {getTVal("labelGuests")}
                        </label>
                        <div className="flex items-center text-left bg-sand-50 border border-sand-250 rounded-xl p-1 w-full justify-between">
                          <button
                            type="button"
                            id="book-pax-dec"
                            disabled={guestCount <= 1}
                            onClick={() => setGuestCount(guestCount - 1)}
                            className="bg-white border border-sand-200 text-gray-600 hover:bg-sand-100 disabled:opacity-40 p-2.5 rounded-lg font-bold transition-all duration-200 cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span id="book-pax-count" className="font-mono text-sm font-bold text-gray-800">
                            {guestCount} {lang === "id" ? "Orang" : "Guests"}
                          </span>
                          <button
                            type="button"
                            id="book-pax-inc"
                            disabled={guestCount >= 20}
                            onClick={() => setGuestCount(guestCount + 1)}
                            className="bg-white border border-sand-200 text-gray-600 hover:bg-sand-100 disabled:opacity-40 p-2.5 rounded-lg font-bold transition-all duration-200 cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Premium Addons Options Checklist */}
                    <div className="space-y-3 pb-3 border-b border-sand-100">
                      <h4 className="block text-[11px] font-mono font-bold text-gold-600 uppercase tracking-widest">
                        {getTVal("labelAddons")}
                      </h4>

                      <div className="space-y-2.5">
                        {/* Shuttle flat box */}
                        <label 
                          htmlFor="addon-toggle-airport"
                          className={`flex items-start p-3.5 border rounded-2xl cursor-pointer select-none transition-all duration-200 ${
                            addonAirport 
                              ? "bg-forest-50/40 border-forest-500/35" 
                              : "bg-sand-50/30 border-sand-200 hover:bg-sand-50"
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            id="addon-toggle-airport"
                            checked={addonAirport}
                            onChange={(e) => setAddonAirport(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5 border-sand-300 mt-1 cursor-pointer shrink-0"
                          />
                          <div className="ml-3 text-left">
                            <span className="block text-xs font-bold text-gray-800">
                              {lang === "id" ? "Layanan Antar-Jemput Bandara (+Rp 150.000 FLAT)" : "Private Sam Ratulangi Airport Private Shuttle (+Rp 150,000 FLAT)"}
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                              {getTVal("addonAirportDesc")}
                            </span>
                          </div>
                        </label>

                        {/* Professional drone picture */}
                        <label 
                          htmlFor="addon-toggle-doc"
                          className={`flex items-start p-3.5 border rounded-2xl cursor-pointer select-none transition-all duration-200 ${
                            addonDocumentation 
                              ? "bg-forest-50/40 border-forest-500/35" 
                              : "bg-sand-50/30 border-sand-200 hover:bg-sand-50"
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            id="addon-toggle-doc"
                            checked={addonDocumentation}
                            onChange={(e) => setAddonDocumentation(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5 border-sand-300 mt-1 cursor-pointer shrink-0"
                          />
                          <div className="ml-3 text-left">
                            <span className="block text-xs font-bold text-gray-800">
                              {lang === "id" ? "Dokumentasi Foto & Drone Profesional (+Rp 100.000 / Org)" : "Premium Photo & Cinematic Drone Pack (+Rp 100,000 / Guest)"}
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                              {getTVal("addonDocDesc")}
                            </span>
                          </div>
                        </label>

                        {/* Extra Klappertart Box */}
                        <label 
                          htmlFor="addon-toggle-klap"
                          className={`flex items-start p-3.5 border rounded-2xl cursor-pointer select-none transition-all duration-200 ${
                            addonDoubleKlap 
                              ? "bg-forest-50/40 border-forest-500/35" 
                              : "bg-sand-50/30 border-sand-200 hover:bg-sand-50"
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            id="addon-toggle-klap"
                            checked={addonDoubleKlap}
                            onChange={(e) => setAddonDoubleKlap(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5 border-sand-300 mt-1 cursor-pointer shrink-0"
                          />
                          <div className="ml-3 text-left">
                            <span className="block text-xs font-bold text-gray-800">
                              {lang === "id" ? "Box Doos Ekstra Klappertaart Premium (+Rp 35.000 / Box)" : "Oven Klappertaart Traditional Takeaway Box (+Rp 35,000 / Box)"}
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                              {getTVal("addonKlapDesc")}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Dynamic Price Breakdown Receipt */}
                    <div className="bg-sand-100 p-5 rounded-2xl border border-sand-200 space-y-3.5">
                      <div className="flex items-center space-x-1.5 border-b border-sand-200 pb-2">
                        <Info className="h-4.5 w-4.5 text-forest-700" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 font-serif">
                          {getTVal("totalCalc")}
                        </h4>
                      </div>

                      <div className="space-y-2 text-xs md:px-1">
                        <div className="flex justify-between text-gray-500 font-semibold">
                          <span>{getTVal("baseBill").replace("{0}", guestCount.toString())}</span>
                          <span className="font-mono text-gray-800 font-bold">{formatPrice(selectedPackage.price * guestCount)}</span>
                        </div>
                        
                        {(addonAirport || addonDocumentation || addonDoubleKlap) && (
                          <div className="flex justify-between text-gray-500 font-semibold">
                            <span>{getTVal("addonTotal")}</span>
                            <span className="font-mono text-gray-800 font-bold">
                              {formatPrice(
                                (addonAirport ? 150000 : 0) + 
                                (addonDocumentation ? 100000 * guestCount : 0) + 
                                (addonDoubleKlap ? 35000 * guestCount : 0)
                              )}
                            </span>
                          </div>
                        )}

                        <div className="h-px bg-sand-205 md:my-3" />

                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-xs text-forest-850 font-bold uppercase tracking-wide">
                            {getTVal("grandTotal")}
                          </span>
                          <span id="booking-grand-total" className="text-xl sm:text-2xl font-mono font-extrabold text-forest-700">
                            {formatPrice(calculateTotal())}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Bar Action Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        id="btn-close-booking-form"
                        onClick={() => setSelectedPackage(null)}
                        className="w-full sm:w-1/3 bg-sand-100 hover:bg-sand-200 text-gray-700 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer text-center"
                      >
                        {getTVal("btnCancel")}
                      </button>

                      <button
                        type="submit"
                        id="btn-submit-booking-confirm"
                        className="w-full sm:w-2/3 bg-forest-600 hover:bg-forest-700 text-sand-50 border border-forest-700 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>{getTVal("btnConfirm")}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Formal Digital Boarding Pass Ticket receipt generated */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center select-none"
                    id="booking-ticket-view"
                  >
                    {/* Retro Ticket board */}
                    <div className="border-2 border-dashed border-forest-500/40 rounded-3xl bg-forest-950 text-white p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
                      
                      {/* Left and right notch cutouts for boarding pass design */}
                      <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white border border-sand-200 rounded-full" />
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-sand-200 rounded-full" />

                      {/* Masthead ticket metadata */}
                      <div className="flex flex-col sm:flex-row sm:justify-between items-center border-b border-forest-800/80 pb-4 gap-4">
                        <div className="text-left">
                          <span className="block text-[10px] font-mono tracking-widest text-gold-400 font-extrabold uppercase mb-0.5">
                            {getTVal("ticketTitle")}
                          </span>
                          <span className="text-lg font-mono font-bold tracking-tight text-white block">
                            TALAWAAN TOURS
                          </span>
                        </div>
                        <div className="bg-gold-500 text-forest-950 px-3 py-1.5 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest">
                          ID: {bookingTicket.id}
                        </div>
                      </div>

                      {/* Content breakdown layout grids */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans text-xs">
                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">NAME OF PASSENGER</span>
                            <span id="ticket-guest-name" className="text-medium font-bold text-white text-sm block mt-0.5">{bookingTicket.guestName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">CONTACT PHONE</span>
                            <span className="text-medium text-forest-100 font-semibold block mt-0.5">{bookingTicket.guestPhone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">TOUR INITIATION DATE</span>
                            <span id="ticket-guest-date" className="text-medium text-gold-400 font-extrabold block mt-0.5 font-mono text-sm">{bookingTicket.date}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">SELECTED TOUR PACKAGE</span>
                            <span className="text-xs text-white font-bold block mt-0.5 leading-snug">{bookingTicket.packageName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">GUEST COUNT</span>
                              <span className="text-xs text-forest-100 font-bold block mt-0.5">{bookingTicket.guests} {lang === "id" ? "Orang" : "Guests"}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">DURATION</span>
                              <span className="text-xs text-forest-100 font-bold block mt-0.5">{bookingTicket.duration}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-forest-400 font-mono uppercase tracking-wider block">TOTAL PAYABLE BILL EXCLUDING TIP</span>
                            <span id="ticket-grand-total" className="text-lg font-mono font-extrabold text-gold-400 block mt-0.5">{formatPrice(bookingTicket.grandTotal)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Separator line with small dash line */}
                      <div className="border-t border-dashed border-forest-800 my-2" />

                      {/* Mini QR representation Mock box and barcode scan notice */}
                      <div className="flex flex-col md:flex-row items-center md:justify-between text-left gap-4 bg-forest-900/60 p-4 rounded-2xl border border-forest-800">
                        <div className="bg-white p-2.5 rounded-xl shrink-0">
                          <QrCode className="h-12 w-12 text-forest-950" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-gold-500 font-bold uppercase tracking-wider">
                            {getTVal("ticketStatus")}
                          </span>
                          <p className="text-[10px] text-forest-300 leading-relaxed mt-1">
                            {lang === "id" ? "Gunakan barcode kelereng digital ini untuk pengisian lembar daftar tamu setibanya di kantor Hukum Tua." : "Voucher validated on offline ledger. Show this mock QR to security posts inside Talawaan sector."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Explanatory text instructions */}
                    <div className="bg-gold-50/70 border border-gold-500/20 p-5 rounded-2xl flex items-start space-x-3 text-xs text-left leading-relaxed">
                      <Send className="h-5 w-5 text-gold-600 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <strong className="block text-gray-900 font-extrabold text-[10px] uppercase font-mono tracking-wider mb-1">
                          {lang === "id" ? "Panduan Kedatangan & Penukaran Gelang" : "How To Redeem Your Passage"}
                        </strong>
                        <span className="text-gray-600 font-semibold">{getTVal("ticketNotice")}</span>
                      </div>
                    </div>

                    {/* Done and close */}
                    <button
                      type="button"
                      id="btn-done-receipt-close"
                      onClick={() => {
                        setSelectedPackage(null);
                        setBookingTicket(null);
                      }}
                      className="bg-forest-700 hover:bg-forest-800 text-sand-50 border border-forest-800 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center mx-auto"
                    >
                      <span>{getTVal("btnCloseReceipt")}</span>
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
