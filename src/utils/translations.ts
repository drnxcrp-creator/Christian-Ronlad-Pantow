/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = "id" | "en" | "zh" | "ko" | "vi" | "la";

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navWisata: string;
  navBudaya: string;
  navAsisten: string;
  navKuis: string;
  selectLanguage: string;

  // Hero Section
  heroBadge: string;
  heroTitleRegular1: string;
  heroTitleItalic: string;
  heroTitleRegular2: string;
  heroSubtitle: string;
  heroBtnExplore: string;
  heroBtnAI: string;
  heroTunanCaption: string;
  heroAreaLabel: string;
  heroAreaDesc: string;
  heroPopLabel: string;
  heroPopDesc: string;
  heroWaterLabel: string;
  heroWaterDesc: string;
  heroAirLabel: string;
  heroAirDesc: string;
  historyBadge: string;
  historyTitle: string;
  historyDesc1: string;
  historyDesc2: string;

  // Wisata Section
  wisataBadge: string;
  wisataTitle: string;
  wisataSubtitle: string;
  selectDestLabel: string;
  calcPriceLabel: string;
  calcDistanceLabel: string;
  deepReviewLabel: string;
  bestTimeLabel: string;
  airportConveyLabel: string;
  airportConveyText: string;
  airportConveyUnit: string;
  amenitiesLabel: string;
  tunanDesc: string;
  tunanLong: string;
  tunanBestTime: string;
  tunanDistance: string;
  tunanFacilities: string[];
  agroDesc: string;
  agroLong: string;
  agroBestTime: string;
  agroDistance: string;
  agroFacilities: string[];
  kaliDesc: string;
  kaliLong: string;
  kaliBestTime: string;
  kaliDistance: string;
  kaliFacilities: string[];

  // Cost Calculator
  calcBadge: string;
  calcTitle: string;
  calcSubtitle: string;
  groupSizeLabel: string;
  groupPaxUnit: string;
  transLabel: string;
  transOwn: string;
  transMotor: string;
  transCar: string;
  addonsLabel: string;
  gazeboLabel: string;
  guideLabel: string;
  foodLabel: string;
  billTitle: string;
  billEntrance: string;
  billTransport: string;
  billGazebo: string;
  billGuide: string;
  billFood: string;
  billTotal: string;
  billTip: string;

  // Budaya & Kuliner Section
  budayaBadge: string;
  budayaTitle: string;
  budayaSubtitle: string;
  filterAll: string;
  filterCuisine: string;
  filterCulture: string;
  tipBadge: string;
  klapDesc: string;
  klapTips: string;
  klapTags: string[];
  tinuDesc: string;
  tinuTips: string;
  tinuTags: string[];
  nasiDesc: string;
  nasiTips: string;
  nasiTags: string[];
  kolinDesc: string;
  kolinTips: string;
  kolinTags: string[];
  mapaDesc: string;
  mapaTips: string;
  mapaTags: string[];
  kitchenBadge: string;
  kitchenTitle: string;
  kitchenDesc: string;

  // Virtual Assistant Section
  aiBadge: string;
  aiTitle: string;
  aiSubtitle: string;
  aiConsoleTitle: string;
  aiStatus: string;
  aiGreeting: string;
  aiReplyErrorFallback: string;
  aiApiErrorFallback: string;
  aiInputPlaceholder: string;
  sugChips: string[];

  // Trivia Section
  quizBadge: string;
  quizTitle: string;
  quizSubtitle: string;
  quizQuestionIndicator: string;
  quizWawasan: string;
  quizVerifyBtn: string;
  quizNextBtn: string;
  quizFinishedBtn: string;
  quizScoreBadge: string;
  quizFinishedTitle: string;
  quizPoinLabel: string;
  quizRankLabel: string;
  quizCongrat: string;
  quizRestartBtn: string;
  quizRankHukumTua: string;
  quizRankKawanua: string;
  quizRankExplorer: string;
  quizRankTourist: string;
  quizData: Array<{
    question: string;
    options: string[];
    explanation: string;
  }>;

  // Footer Section
  footerSlogan: string;
  footerTitleTownhall: string;
  footerTitleHours: string;
  footerHoursDays: string;
  footerHoursTimings: string;
  footerHoursNote: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  id: {
    navHome: "Beranda",
    navWisata: "Destinasi Wisata",
    navBudaya: "Budaya & Kuliner",
    navAsisten: "Tanya AI Mona",
    navKuis: "Kuis Trivia",
    selectLanguage: "Pilih Bahasa",

    heroBadge: "Desa Wisata Unggulan Minut",
    heroTitleRegular1: "Pesona Alam & ",
    heroTitleItalic: "Harmoni Budaya",
    heroTitleRegular2: " Desa Talawaan",
    heroSubtitle: "Selamat datang di portal informasi resmi Desa Talawaan. Surga tersembunyi berjarak sepelemparan batu dari Bandara Manado yang menawarkan keanggunan Air Terjun Tunan setinggi 86 meter, perkebunan kelapa hijau membentang, kuliner legendaris Nusantara, hingga tradisi Mapalus Minahasa yang asri.",
    heroBtnExplore: "Jelajahi Wisata Utama",
    heroBtnAI: "Tanya Virtual Guide",
    heroTunanCaption: "86 Meter • Desa Talawaan, Sulawesi Utara",
    heroAreaLabel: "Luas Wilayah",
    heroAreaDesc: "Kawasan subur kaki bukit Minahasa",
    heroPopLabel: "Jumlah Penduduk",
    heroPopDesc: "Masyarakat Mapalus yang ramah",
    heroWaterLabel: "Tinggi Air Terjun Tunan",
    heroWaterDesc: "Pancaran air murni hutan tropis",
    heroAirLabel: "Dari Bandara",
    heroAirDesc: "Sangat dekat dari Bandara Sam Ratulangi",
    historyBadge: "SEJARAH SINGKAT",
    historyTitle: "Kearifan Leluhur Minahasa",
    historyDesc1: "Desa Talawaan didirikan sebagai perkampungan adat Minahasa yang subur di utara bumi Tonsea. Penamaan 'Talawaan' diyakini berakar dari kosa kata bahasa lokal yang menggambarkan sumber air mengalir atau kebun rindang di mana para penjelajah beristirahat di bawah bayangan dedaunan rimbun.",
    historyDesc2: "Hingga kini, warga Talawaan menjunjung kearifan 'Mapalus'—gotong royong komunal—dalam berbagai sendi kehidupan, merekatkan kerukunan beragama antar warga, meningkatkan hasil bumi kelapa (kopra) dan pertanian, serta menyulap aset alami mereka sebagai atraksi wisata ecotourism kebanggaan Sulawesi Utara.",

    wisataBadge: "INDONESIA DEEP TRAVEL",
    wisataTitle: "Ekowisata & Keindahan Abadi",
    wisataSubtitle: "Jelajahi keajaiban pemandangan alam tropis Sulawesi Utara di Talawaan. Kunjungi mata air terjun kami yang tinggi, jelajahi agro-wisata kelapa tradisional, dan nikmati petualangan alam murni.",
    selectDestLabel: "PILIH DESTINASI",
    calcPriceLabel: "Harga Tiket",
    calcDistanceLabel: "Jarak",
    deepReviewLabel: "Tinjauan Mendalam",
    bestTimeLabel: "Waktu Kunjungan Terbaik",
    airportConveyLabel: "Aksesibilitas Bandara",
    airportConveyText: "Dekat gerbang, berselang ",
    airportConveyUnit: " dengan taksi/motor.",
    amenitiesLabel: "Fasilitas Tersedia",
    tunanDesc: "Air terjun legendaris berketinggian 86 meter di tengah hutan belantara murni.",
    tunanLong: "Mutiara kebanggaan Desa Talawaan, memancarkan air sejuk nan deras dari tebing vertikal setinggi 86 meter. Alirannya dikelilingi vegetasi paku-pakuan purba dan hutan tropis basah yang rimbun. Jalur menuju air terjun berupa jalan beton kokoh sepanjang 200 meter yang dihiasi pemandangan sungai jernih berbatu, memudahkan akses bagi segala jenjang usia.",
    tunanBestTime: "Pagi hari (08:00 - 11:00 WITA) sebelum matahari tinggi",
    tunanDistance: "15-20 Menit",
    tunanFacilities: ["Gazebo Istirahat", "Jalur Setapak Beton", "Warung Kuliner", "Toilet & Kamar Bilas", "Lahan Parkir"],
    agroDesc: "Belajar membuat kopra secara tradisional dan mencicipi air kelapa muda segar langsung di kebun.",
    agroLong: "Hamparan perkebunan kelapa tradisional yang luas membentang di perbatasan bukit Talawaan. Di sini pengunjung dapat berdiskusi langsung dengan petani kelapa Minahasa, melihat proses unik pemilahan sabut kelapa, proses pengeringan daging kelapa (pembuatan kopra) di rumah asap khas Sulawesi, serta menikmati kelapa muda segar yang dipanjat langsung dari batang pohon.",
    agroBestTime: "Sore Hari (15:00 - 17:00 WITA) di mana cuaca mulai sejuk",
    agroDistance: "10 Menit",
    agroFacilities: ["Pemandu Lokal", "Kebun Rindang", "Demonstrasi Kopra", "Gazebo Kelapa Muda", "Jalur Sepeda Alam"],
    kaliDesc: "Air terjun tersembunyi dengan kolam alami yang asri dan tenang, ideal untuk relaksasi sunyi.",
    kaliLong: "Destinasi tersembunyi yang bersemayam lebih jauh di kerimbunan lembah hutan Talawaan. Dinamakan demikian karena letaknya di percabangan mata air sungai Kali. Memiliki ketinggian sekitar 15 meter, dengan pancuran bertingkat yang membentuk penampungan air jernih berkilau kehijauan, menjadikannya surga privat bagi pecinta meditasi dan pemandian alam sunyi.",
    kaliBestTime: "Tengah hari (11:00 - 14:00 WITA) saat cahaya menembus kanopi pohon",
    kaliDistance: "25 Menit",
    kaliFacilities: ["Jalur Trekking Alami", "Kolam Berenang Alami", "Tempat Duduk Kayu", "Spot Foto Liar"],

    calcBadge: "Simulasi Pengeluaran Nyata",
    calcTitle: "Kalkulator Estimasi Biaya Perjalanan",
    calcSubtitle: "Rencanakan petualangan Anda secara transparan. Sesuaikan preferensi di bawah untuk melihat estimasi pengeluaran ke destinasi terpilih.",
    groupSizeLabel: "Jumlah Orang",
    groupPaxUnit: "Pengunjung",
    transLabel: "Transportasi (PP dari Manado)",
    transOwn: "Bawa Kendaraan Sendiri",
    transMotor: "Sewa Sepeda Motor - Rp 75rb",
    transCar: "Sewa Mobil & Sopir - Rp 350rb",
    addonsLabel: "LAYANAN TAMBAHAN (OPSIONAL)",
    gazeboLabel: "Sewa Gazebo",
    guideLabel: "Pemandu Lokal",
    foodLabel: "Paket Makan Khas",
    billTitle: "RINCIAN ESTIMASI BIAYA",
    billEntrance: "Tiket Masuk",
    billTransport: "Sewa Kendaraan PP",
    billGazebo: "Biaya Sewa Gazebo",
    billGuide: "Sewa Pemandu Hutan",
    billFood: "Paket Konsumsi Khas",
    billTotal: "ESTIMASI TOTAL",
    billTip: "Rekomendasi Kami: Bawa baju ganti, sandal gunung anti-selip, uang tunai secukupnya karena sinyal di kawah tebing terkadang fluktuatif.",

    budayaBadge: "IDENTITAS TONSEA",
    budayaTitle: "Cita Rasa & Warisan Leluhur",
    budayaSubtitle: "Selami kebudayaan luhur kami. Nikmati paduan klappertaart lumer peninggalan era klasik, sarapan tinutuan bergizi, hingga dentingan kolintang yang mengharmonisasikan ketenangan desa.",
    filterAll: "Semua",
    filterCuisine: "Kuliner",
    filterCulture: "Budaya & Adat",
    tipBadge: "Saran Penyajian",
    klapDesc: "Kue tart manis bertekstur sangat lembut dari telur, susu, kenari, dan irisan daging kelapa muda segar.",
    klapTips: "Paling nikmat disajikan dingin langsung dari lemari es untuk sensasi kustar kelapa yang lumer di lidah.",
    klapTags: ["Manis / Sweet", "Warisan Belanda", "Oleh-Oleh"],
    tinuDesc: "Bubur sehat kaya gizi berbahan dasar beras yang dimasak dengan labu kuning, singkong, kangkung, bayam, dan daun gedi.",
    tinuTips: "Tambahkan perasan jeruk nipis, cakalang fufu rabe-rabe (suwiran tongkol pedas), serta dabu-dabu roa untuk kenikmatan maksimal.",
    tinuTags: ["Gurih / Savory", "Kaya Serat", "Sarapan Utama"],
    nasiDesc: "Nasi kuning wangi gurih dibungkus daun woka berbentuk silinder panjang, disajikan dengan suwiran cakalang dan soun kecap.",
    nasiTips: "Daun woka memberi pengawetan alami dan aroma esensial hutan lindung yang tidak bisa digantikan bungkus plastik.",
    nasiTags: ["Padat Gurih", "Aroma Alami", "Bungkusan Unik"],
    kolinDesc: "Instrumen musik perkusi kayu tradisional Minahasa yang diukir dari kayu lokal pilihan dan menghasilkan harmoni nada merdu.",
    kolinTips: "Sering dipentaskan pada festival penyambutan turis, peribadatan di gereja Talawaan, serta pesta penikahan adat Tonsea.",
    kolinTags: ["Alat Musik Kayu", "Warisan Budaya", "Kesenian Rakyat"],
    mapaDesc: "Jiwa gotong royong terstruktur berakar dari leluhur Minahasa sebagai kesadaran tolong-menolong komunal tanpa pamrih.",
    mapaTips: "Mapalus bukan sekadar kerja sukarela, melainkan komitmen moral yang mengikat erat kerukunan antar umat di Talawaan.",
    mapaTags: ["Gotong Royong", "Nilai Sosial", "Adat Leluhur"],
    kitchenBadge: "MAPALUS DI BALIK DAPUR",
    kitchenTitle: "Di Mana Masakan Adalah Hasil Upaya Kekeluargaan",
    kitchenDesc: "Masyarakat Talawaan secara tradisional mengolah hidangan pesta adat secara komunal. Saat pernikahan Tonsea dihelat, para ibu bersatu di dapur umum memilin woka untuk nasi kuning, membakar batok kelapa kering untuk kopra tumpeng, sementara para pria meramu tinutuan segar porsi raksasa. Inilah perpaduan Mapalus spiritual yang menghangatkan perut dan batin warga.",

    aiBadge: "PANDUAN PINTAR GEMINI",
    aiTitle: "Sapa Mona - Pendamping Virtual Anda",
    aiSubtitle: "Tanyakan segala hal tentang tiket masuk Tunan, rute berenang teraman, kelezatan Klappertaart panggang, hingga detail layanan administrasi warga.",
    aiConsoleTitle: "Mona - AI Guide",
    aiStatus: "ASISTEN AKTIF • SIAP MEMBANTU",
    aiGreeting: "Syalom! Halo kawanua dan pengunjung setia! Saya **Mona**, asisten AI virtual resmi Desa Talawaan, Minahasa Utara.\n\nAda yang bisa saya bantu hari ini? Anda boleh menanyakan info wisata Air Terjun Tunan, kuliner Klappertaart, kebudayaan daerah Tonsea, atau hal-hal menarik lainnya tentang kami.",
    aiReplyErrorFallback: "Mohon maaf, saya belum bisa merumuskan jawaban itu.",
    aiApiErrorFallback: "Maaf, Mona saat ini sedang istirahat. Hubungi admin atau coba sesaat lagi!",
    aiInputPlaceholder: "Tanyakan hal baru seputar Talawaan...",
    sugChips: [
      "Berapa tiket ke Air Terjun Tunan?",
      "Rekomendasi kuliner khas Talawaan",
      "Di mana lokasi desa & rute terdekat?",
      "Ceritakan adat Mapalus Minahasa",
    ],

    quizBadge: "KUIS TRIVIA TALAWAAN",
    quizTitle: "Trivia Desa Talawaan",
    quizSubtitle: "Pertanyaan",
    quizQuestionIndicator: "dari",
    quizWawasan: "Wawasan Tambahan",
    quizVerifyBtn: "Kirim Jawaban",
    quizNextBtn: "Pertanyaan Selanjutnya",
    quizFinishedBtn: "Selesaikan Kuis",
    quizScoreBadge: "HASIL EVALUASI KAMU",
    quizFinishedTitle: "Kuis Trivia Talawaan Selesai!",
    quizPoinLabel: "Poin Akumulasi",
    quizRankLabel: "Peringkat Kearifan Lokal",
    quizCongrat: "Hebat sekali! Melalui kuis ini Anda telah menjelajahi kearifan adat, ikon alam, dan kuliner legendaris Desa Talawaan, Sulawesi Utara.",
    quizRestartBtn: "Coba Kuis Lagi",
    quizRankHukumTua: "Hukum Tua Kehormatan 👑",
    quizRankKawanua: "Kawanua Sejati ✨",
    quizRankExplorer: "Petualang Berbakat 🎒",
    quizRankTourist: "Turis Pemula 🚶",
    quizData: [
      {
        question: "Berapakah perkiraan tinggi dari Air Terjun Tunan di Desa Talawaan?",
        options: ["Tinggi 25 Meter", "Tinggi 45 Meter", "Tinggi 86 Meter", "Tinggi 120 Meter"],
        explanation: "Air Terjun Tunan adalah salah satu air terjun termegah di Sulawesi Utara dengan ketinggian mengagumkan mencapai kurang lebih 85-86 meter.",
      },
      {
        question: "Apa istilah lokal masyarakat Minahasa untuk memanggil Kepala Desa mereka?",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Masyarakat adat Minahasa secara turun-temurun menyematkan gelar terhormat 'Hukum Tua' kepada pemimpin administratif atau kepala desanya.",
      },
      {
        question: "Apakah nama daun hutan alami pembungkus hidangan Nasi Kuning khas Manado?",
        options: ["Daun Pisang", "Daun Woka", "Daun Pandan Sawah", "Daun Jati"],
        explanation: "Nasi kuning Manado dibungkus menggunakan daun Woka (sejenis daun palem hutan) yang memberikan aroma harum yang khas dan alami.",
      },
      {
        question: "Filsafah Mapalus merupakan tradisi kental suku Minahasa yang berarti...",
        options: ["Seni Berperang", "Pesta Tari Panen Raya", "Gotong Royong Komunal", "Kerajinan Tenun Serat"],
        explanation: "Mapalus adalah sistem kekerabatan gotong-royong terstruktur dalam pertanian, pembangunan fasilitas warga, hingga urusan bela duka kekeluargaan.",
      },
    ],

    footerSlogan: "Portal informasi swadaya dan eko-katalog wisata Desa Talawaan. Menghubungkan pesona air terjun purba dan kuliner Minahasa yang asri.",
    footerTitleTownhall: "KANTOR PEMERINTAH DESA",
    footerTitleHours: "JAM LAYANAN FISIK",
    footerHoursDays: "Senin - Jumat",
    footerHoursTimings: "08:00 - 15:30 WITA (GMT+8)",
    footerHoursNote: "* Kehadiran fisik diperlukan di kantor desa untuk urusan resmi atau penandatanganan dokumen basah.",
  },
  en: {
    navHome: "Home",
    navWisata: "Tourism Sights",
    navBudaya: "Culture & Dining",
    navAsisten: "Ask AI Mona",
    navKuis: "Trivia Quiz",
    selectLanguage: "Language",

    heroBadge: "Premier Tourist Village of North Minahasa",
    heroTitleRegular1: "Natural Splendor & ",
    heroTitleItalic: "Cultural Harmony",
    heroTitleRegular2: " in Talawaan",
    heroSubtitle: "Welcome to the official information portal of Talawaan Village. A tropical botanical sanctuary lying just a stone's throw from Manado International Airport. Bask in the majestic spray of the 86-meter Tunan Waterfall, lush green coconut rows, local epicurean heritage, and genuine Minahasan hospitality.",
    heroBtnExplore: "Explore Top Sights",
    heroBtnAI: "Ask Virtual Guide",
    heroTunanCaption: "86 Meters • Talawaan Village, North Sulawesi",
    heroAreaLabel: "Total Area",
    heroAreaDesc: "Fertile foothills of North Minahasa",
    heroPopLabel: "Population",
    heroPopDesc: "Friendly local community of Mapalus",
    heroWaterLabel: "Tunan Waterfall Height",
    heroWaterDesc: "Pristine cascade from tropical forest",
    heroAirLabel: "From Airport",
    heroAirDesc: "Extremely close to Sam Ratulangi Airport",
    historyBadge: "BRIEF HISTORY",
    historyTitle: "Minahasan Ancestral Wisdom",
    historyDesc1: "Talawaan was founded as a fertile Minahasan traditional settlement in the northern Tonsea territory. The name 'Talawaan' is believed to originate from a local tribal term describing flowing springs or shaded groves where travelers lay under dense cooling foliage.",
    historyDesc2: "To this day, the villagers of Talawaan uphold the 'Mapalus' spirit—reciprocal communal mutual aid—in farming, public development, and celebratory life events, maintaining pristine community harmony and establishing Talawaan as Sulawesi's pride for ecotourism.",

    wisataBadge: "INDONESIA DEEP TRAVEL",
    wisataTitle: "Ecotourism & Timeless Wilderness",
    wisataSubtitle: "Discover the breathtaking geography of North Sulawesi in Talawaan. Trek to towering cooling waterfalls, interact with friendly coconut farmers, and calculate your custom journey with our smart, transparent widget.",
    selectDestLabel: "SELECT DESTINATION",
    calcPriceLabel: "Ticket Price",
    calcDistanceLabel: "Distance",
    deepReviewLabel: "Detailed Insight",
    bestTimeLabel: "Optimal Visitor Hours",
    airportConveyLabel: "Airport Conveyance",
    airportConveyText: "Very proximate, lies near airport, outer gate is just ",
    airportConveyUnit: " journey.",
    amenitiesLabel: "Available Amenities",
    tunanDesc: "A legendary 86-meter waterfall nestled inside pristine, primary jungle canopy.",
    tunanLong: "The jewel of Talawaan, streaming cold pure water from a vertical volcanic cliff. Framed by primeval ferns and canopy flora. A secure, scenic 200m concrete path tracks along a shallow river stream, ensuring accessible trekking for children and elders alike.",
    tunanBestTime: "Morning times (08:00 AM - 11:00 AM) for ideal daylight filters",
    tunanDistance: "15-20 Minutes",
    tunanFacilities: ["Gazebo Rest Houses", "Concrete Pathway", "Local Food Kiosks", "Showers & Restrooms", "Secure Parking Area"],
    agroDesc: "Observe traditional copra drying huts and relish chilled coconut water straight from tree groves.",
    agroLong: "Lush coconut plantations extending along the sunny ridges of Talawaan. Meet traditional farmers, witness coconut husk spinning, observe copra drying smoke shelters, and refresh yourself with freshly harvested sweet coconut water prepared on demand.",
    agroBestTime: "Late afternoon (03:00 PM - 05:00 PM) for comfortable breezes",
    agroDistance: "10 Minutes",
    agroFacilities: ["Local Farmer Guides", "Shading Groves", "Copra Huts Demo", "Fresh Coconut Shelter", "Mountain Biking Path"],
    kaliDesc: "A secluded cascade feeding clear forest lagoons, ideal for solitary quietude.",
    kaliLong: "A hidden gem nestled deep inside riverine gulches. Standing around 15 meters tall, its tiered cascade forms a crystal natural basin shimmering in mineral-green hues, serving as a private heaven for nature-baths and serene meditation.",
    kaliBestTime: "Midday (11:00 AM - 02:00 PM) when sunrays pierce through forest tall oaks",
    kaliDistance: "25 Minutes",
    kaliFacilities: ["Wild Trekking Path", "Natural Swimmable lagoon", "Rustic Timber benches", "Wild Jungle Backdrop"],

    calcBadge: "Transparent Budgeting",
    calcTitle: "Trip Cost and Budget Estimator",
    calcSubtitle: "Plan your Minahasa expedition with zero hidden fees. Tune the fields below to see draft total expenses.",
    groupSizeLabel: "Group Size",
    groupPaxUnit: "Pax",
    transLabel: "Transportation (Round Trip from Manado)",
    transOwn: "Self Driving / Walking",
    transMotor: "Rent Motorcycle - Rp 75k",
    transCar: "Rent Car & Driver - Rp 350k",
    addonsLabel: "OPTIONAL AMENITIES & ADDONS",
    gazeboLabel: "Gazebo Rental",
    guideLabel: "Local Guide",
    foodLabel: "Local Meal Box",
    billTitle: "PRICE DESCRIPTION BREAKDOWN",
    billEntrance: "Entrance Tickets",
    billTransport: "Transit Rental",
    billGazebo: "Gazebo Rental",
    billGuide: "Forest Ranger Guide",
    billFood: "Minahasan Meal Box",
    billTotal: "ESTIMATED TOTAL",
    billTip: "Tip of the Day: Pack a dry towel, slide-resistant hiking sandals, and physical cash since electronic signal may fluctuate underneath volcanic cliffs.",

    budayaBadge: "TONSEA HERITAGE IDENTITY",
    budayaTitle: "Epicurean Custard & Ancestral Customs",
    budayaSubtitle: "Immerse yourself in authentic North Sulawesi flavors. Taste our legacy coconut custard, healthy vegetable soup porridge, and experience the communal rhythm of Mapalus solidarity.",
    filterAll: "Show All",
    filterCuisine: "Local Cuisine",
    filterCulture: "Rituals & Guilds",
    tipBadge: "Local Tip",
    klapDesc: "A legendary creamy coconut custard baked with milk, cinnamon, nutmeg, raisins, and young almonds.",
    klapTips: "Best served chilled from the refrigerator to experience absolute melt-in-the-mouth custard layers.",
    klapTags: ["Sweet Tooth", "Dutch Colonial Accent", "Souvenir Highlight"],
    tinuDesc: "A highly wholesome vegetable-centric rice porridge steamed with pumpkin, cassava, sweet potatoes, and leafy greens.",
    tinuTips: "Add a squeeze of fresh lime juice, crushed crispy shallots, and spicy smoke cakalang roa chili paste.",
    tinuTags: ["Savory Spice", "High Fiber", "Breakfast Choice"],
    nasiDesc: "Rich savory turmeric rice bundled inside a cylindrical woka leaf wrapper (forest palm), served with skipjack tuna.",
    nasiTips: "Avoid reheating in plastic; steaming with its enclosing woka leaf amplifies its organic rainforest scent.",
    nasiTags: ["Savory", "Herb-Scented", "Artisanal Wrapping"],
    kolinDesc: "A highly revered traditional timber xylophone instrument carved from local lightweight softwoods.",
    kolinTips: "Often showcased live in tourist welcoming receptions, local church choirs, and traditional wedding banquets.",
    kolinTags: ["Wooden Percussion", "National Heritage", "Folk Orchestral"],
    mapaDesc: "A structured, ancestral reciprocal mutual aid system reflecting direct collective cooperation.",
    mapaTips: "Mapalus represents both simple help and a moral contract ensuring high social safety for all families.",
    mapaTags: ["Mutual Benefit", "Social Values", "Ancestral Custom"],
    kitchenBadge: "MAKING FARE WITH MAPALUS",
    kitchenTitle: "A Culinary Bond Forged Over Shared Fires",
    kitchenDesc: "In Talawaan, dining is a community-forged action. For weddings and regional milestones, grandmas congregate in communal kitchen lines folding woka leaves, grandpas stack dry coconut shells for smoke heaters, while teenagers boil huge pots of steaming tinutuan greens. It is practical Mapalus at its best, feeding thousands of guest lines.",

    aiBadge: "GEMINI POWERED CONCIERGE",
    aiTitle: "Talk to Mona - AI Virtual Assistant",
    aiSubtitle: "Ask me anything about accommodation directions, waterfall ticketing, local dishes, or how to navigate our beautiful village.",
    aiConsoleTitle: "Mona - AI Guide",
    aiStatus: "ACTIVE GUIDE • ONLINE",
    aiGreeting: "Shalom! Hello traveler! I am **Mona**, your official AI Virtual Guide for Talawaan Village, North Minahasa.\n\nHow can I enrich your journey? Ask me about the gorgeous Tunan Waterfall (Rp 10,000 entrance), local copra farms, iconic Manado porridge (Tinutuan), or any other local interest.",
    aiReplyErrorFallback: "Pardon me, I was unable to process that query.",
    aiApiErrorFallback: "Sorry, Mona is briefly unresponsive. Please try again in a moment.",
    aiInputPlaceholder: "Ask Mona anything about Talawaan...",
    sugChips: [
      "How much is Tunan Waterfall fee?",
      "Best traditional food in Talawaan",
      "Where is the exact location & map?",
      "Explain the Mapalus heritage",
    ],

    quizBadge: "TALAWAAN TRIVIA QUIZ",
    quizTitle: "Talawaan Village Trivia",
    quizSubtitle: "Question",
    quizQuestionIndicator: "of",
    quizWawasan: "Folk Explanation",
    quizVerifyBtn: "Verify Answer",
    quizNextBtn: "Next Question",
    quizFinishedBtn: "Reveal Results",
    quizScoreBadge: "EVALUATION SCORES REACHED",
    quizFinishedTitle: "Folklore Quiz Complete!",
    quizPoinLabel: "Accuracy Points",
    quizRankLabel: "Minahasan Wisdom Rank",
    quizCongrat: "Excellent! You have successfully enriched your traveler awareness regarding North Minahasa boundaries and customs.",
    quizRestartBtn: "Restart Knowledge Test",
    quizRankHukumTua: "Honorary Hukum Tua 👑",
    quizRankKawanua: "True Kawanua Local ✨",
    quizRankExplorer: "Skillful Explorer 🎒",
    quizRankTourist: "Tourist Newcomer 🚶",
    quizData: [
      {
        question: "What is the approximate height of Tunan Waterfall located in Talawaan Village?",
        options: ["25 Meters high", "45 Meters high", "86 Meters high", "120 Meters high"],
        explanation: "Tunan Waterfall stands majestically at about 85-86 meters tall, streaming pure, ice-cold volcanic waters down tropical peaks.",
      },
      {
        question: "What is the traditional Minahasan honorary word used to address the Village Head?",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Hukum Tua is the official title given to the elected administrative village leader across Minahasan custom councils.",
      },
      {
        question: "What is the name of the traditional leaf used to wrap the fragrant yellow Turmeric Rice?",
        options: ["Banana Leaf", "Woka Leaf", "Pandan Leaf", "Teak Leaf"],
        explanation: "Native woka leaves (a genus of wild palms) are used to package turmeric rice, infusing a distinctive rainforest aroma.",
      },
      {
        question: "The traditional Mapalus values practiced inside Talawaan stand for...",
        options: ["Ancient Martial Arts", "Harvest Ritual Dancing", "Structured Reciprocal Mutual Cooperation", "Bark fiber weaving craft"],
        explanation: "Mapalus represents the ancestral mutual aid cooperative philosophy binding Minahasan villages in farming, building, and emergencies.",
      },
    ],

    footerSlogan: "Self-service town hall template and ecological catalog of Talawaan Village. Connecting historic volcanic trails with delicious Minahasan fare.",
    footerTitleTownhall: "TOWNHALL HEADQUARTERS",
    footerTitleHours: "TIMINGS & OFFICE HOURS",
    footerHoursDays: "Monday - Friday",
    footerHoursTimings: "08:00 - 15:30 WITA (GMT+8)",
    footerHoursNote: "* Physical attendance with official identity copies is recommended at the Townhall office for verified queries.",
  },
  zh: {
    navHome: "首页",
    navWisata: "游览景点",
    navBudaya: "文化与美食",
    navAsisten: "咨询 AI 莫娜",
    navKuis: "问答测试",
    selectLanguage: "选择语言",

    heroBadge: "北米纳哈萨顶级示范旅游村",
    heroTitleRegular1: "自然奇观与 ",
    heroTitleItalic: "文化和谐",
    heroTitleRegular2: " 交融的塔拉万村",
    heroSubtitle: "欢迎来到塔拉万村 (Talawaan) 官方信息门户。这是一处距离万鸦老沙姆·拉图兰吉国际机场仅一步之遥的绿意天堂。在这里，您可以感受高达86米的图南瀑布 (Tunan Waterfall) 飞瀑直下、一望无际的椰子林、传奇印尼美食以及最淳朴的米纳哈萨地区马帕卢斯 (Mapalus) 互助传统。",
    heroBtnExplore: "探索主要景点",
    heroBtnAI: "咨询 AI 助手",
    heroTunanCaption: "86米高度 • 印尼北苏拉威西省塔拉万村",
    heroAreaLabel: "总土地面积",
    heroAreaDesc: "北米纳哈萨肥沃的山麓地带",
    heroPopLabel: "总人口数",
    heroPopDesc: "实践马帕卢斯互助精神的居民",
    heroWaterLabel: "图南瀑布高度",
    heroWaterDesc: "来自热带雨林的纯净瀑布",
    heroAirLabel: "机场距离",
    heroAirDesc: "极度邻近沙姆·拉图兰吉国际机场",
    historyBadge: "简短历史",
    historyTitle: "米纳哈萨祖先的智慧",
    historyDesc1: "塔拉万村最初是作为汤塞阿 (Tonsea) 北部肥沃的米纳哈萨传统定居点而建立的。“Talawaan”一词被认为起源于当地部落语言，描述源源不断的清泉或绿树成荫、可供旅人休憩的舒适森林庇护所。",
    historyDesc2: "直到今天，塔拉万村的村民在农业耕作、公共发展和各种重要生活仪式中，依然秉持着马帕卢斯 (Mapalus) 互助精神，维持着完美的社区和谐，使塔拉万村成为整个苏拉威西省生态旅游的骄傲。",

    wisataBadge: "印尼深度探索",
    wisataTitle: "生态旅游与永恒自然",
    wisataSubtitle: "探索印尼北苏拉威西省塔拉万村令人叹为观止的地理风貌。徒步直达宏伟的山林飞瀑，结识热情的椰子农人，或使用我们智能透明的组件来定制和预估您的行程费用。",
    selectDestLabel: "选择旅行目的地",
    calcPriceLabel: "入场门票",
    calcDistanceLabel: "机场距离",
    deepReviewLabel: "深度见解说明",
    bestTimeLabel: "最佳游览时段",
    airportConveyLabel: "机场交通便利度",
    airportConveyText: "非常邻近，度假村就在机场外大门，仅需 ",
    airportConveyUnit: " 车程即可抵达。",
    amenitiesLabel: "提供配套设施",
    tunanDesc: "隐藏在未开发的热带雨林树冠之下的传奇 86 米瀑布。",
    tunanLong: "图南瀑布是塔拉万村的璀璨明珠。瀑布从86米高垂直的火山熔岩峭壁一泻而下，水质清澈冰甜。两旁生长着古老的蕨类植物。景区建有完好的 200 米水泥石板路，沿小溪蜿蜒而上，确保老人和孩子都可以安全登山观景。",
    tunanBestTime: "早上时段 (08:00 AM - 11:00 AM) 光线极佳，非常适合拍照",
    tunanDistance: "15-20分钟车程",
    tunanFacilities: ["凉亭休息室", "混凝土石板步道", "本地风景小吃店", "淋浴室与洗手间", "备有保安的停车场"],
    agroDesc: "了解传统椰干烟熏干燥技术，并现场品尝新鲜砍下的香甜椰子水。",
    agroLong: "向阳山脊上舒展着大片翠绿的椰子林。在这里，游客可以与当地农民面对面，亲眼观看坚韧的椰壳剥皮，了解北苏拉威西传统的熏房工艺（烘干椰肉制作椰子油原料），并品尝刚刚从树上采摘并现场砍开的香甜椰青。",
    agroBestTime: "午后凉爽时分 (03:00 PM - 05:00 PM) 伴着山风游览最佳",
    agroDistance: "10分钟车程",
    agroFacilities: ["本地农夫导游", "荫凉椰林", "椰干烟熏房演示", "新鲜椰子接待点", "山地自行车骑道"],
    kaliDesc: "深藏在森林迷雾峡谷之中的隐秘瀑布，拥有水质澄明、可游泳的翠绿水泡，适合静思禅修。",
    kaliLong: "深藏在塔拉万溪谷森林最深处的隐秘瀑布，约15米高。瀑布分级落入一潭如绿宝石般的清澈天然水池中。这里几乎没有任何外界喧嚣，是绝佳的水疗、山林冥想以及独自聆听自然之音的天然秘密避难所。",
    kaliBestTime: "中午时分 (11:00 AM - 02:00 PM) 阳光可以刚好穿透森林繁茂的树冠",
    kaliDistance: "25分钟车程",
    kaliFacilities: ["野外登山徒步道", "可游泳天然绿藻水潭", "质朴原木休息椅", "野生热带森林背景墙"],

    calcBadge: "旅行预算透明模拟",
    calcTitle: "旅行费用与预算模拟计算器",
    calcSubtitle: "透明合理地计划您的米纳哈萨森林探险，无任何隐藏费用。调整下方选项查看您团队的预计基础开支。",
    groupSizeLabel: "团队总人数",
    groupPaxUnit: "位游客",
    transLabel: "交通工具（往返万鸦老）",
    transOwn: "自驾前往 / 徒步",
    transMotor: "租赁摩托车 - 约 7.5万 印尼盾",
    transCar: "包车（含司机） - 约 35万 印尼盾",
    addonsLabel: "增值附加服务 (可选)",
    gazeboLabel: "预订专属凉亭",
    guideLabel: "雇用本地向导",
    foodLabel: "米纳哈萨风味便当",
    billTitle: "预估旅行账单细则",
    billEntrance: "总入场门票",
    billTransport: "往返包车费用",
    billGazebo: "林间凉亭租赁费",
    billGuide: "本地森林向导服务",
    billFood: "纯正特色风味餐食",
    billTotal: "预计总支出",
    billTip: "友情小贴士：建议带上干净的换洗衣物、防滑防刮的徒步鞋，并带上足够的印尼盾现金，因为在瀑布山谷的信号可能会有波动。",

    budayaBadge: "汤塞阿非凡物质遗产",
    budayaTitle: "令人流连忘返的椰挞与百年民俗",
    budayaSubtitle: "饱览原汁原味的北苏拉威西文化。品尝经典的荷兰风味椰子挞、益气养生的米纳哈萨清晨杂菜粥，并见证马帕卢斯村社团结互助制度的多彩脉搏。",
    filterAll: "显示全部",
    filterCuisine: "特色餐饮美食",
    filterCulture: "传统仪式与艺术",
    tipBadge: "品尝建议",
    klapDesc: "荷兰殖民时期留下的传奇甜点，由新鲜椰肉、牛奶、肉桂、豆蔻、葡萄干和香脆杏仁制成的松软椰挞。",
    klapTips: "直接从冰箱里冷藏后食用最佳，能感受到如慕斯般冰凉清甜、入口即化的美妙层次感。",
    klapTags: ["甜美可口", "荷兰殖民风情", "极佳伴手礼推荐"],
    tinuDesc: "极具营养的万鸦老杂菜粥，由大米、红薯、南瓜、木薯以及当地特有的草本植物羽叶洋参等炖煮而成。",
    tinuTips: "推荐挤入一点新鲜青柠汁，并撒上本地著名的香辣红葱炒金枪鱼松，或伴上罗亚鱼辣椒酱食用。",
    tinuTags: ["鲜美咸香", "富含高纤维", "推荐早餐之选"],
    nasiDesc: "用当地野生的香叶（Woka叶）包裹成圆柱形的黄金姜黄饭，配以鲜美的烟熏金枪鱼和炒粉丝。",
    nasiTips: "请勿用塑料饭盒或微波炉直接加热，用Woka原味叶子包裹在锅里隔水蒸热，能最好地激发出雨林棕榈特有的清新木香。",
    nasiTags: ["美味主食", "热带纯天然香气", "独特手工叶包工艺"],
    kolinDesc: "米纳哈萨地区备受尊崇的传统原木打琴。选用本地精选轻质红木雕刻，音色空灵优美、和谐悦耳。",
    kolinTips: "经常在各类隆重的欢迎国宾仪式、当地大教堂唱诗班伴奏，以及汤塞阿族人的传统户外婚礼宴席上演奏。",
    kolinTags: ["打击乐木琴", "国家非物质文化遗产", "民俗乐团管弦乐"],
    mapaDesc: "一种高度结构化的、源自米纳哈萨祖先的传统社会协作制度，体现出村民之间无条件的自发互助。",
    mapaTips: "马帕卢斯不仅仅代表自愿援助，还是一条具有神圣约束力的道德互助契约，确保每个村民家庭都能得到安全与温饱。",
    mapaTags: ["自愿互惠互利", "社会核心凝聚价值", "宗族传承习俗"],
    kitchenBadge: "马帕卢斯土灶精神",
    kitchenTitle: "在共享炊烟中熔铸的宗族情谊",
    kitchenDesc: "在塔拉万村，聚餐从来都是一项村社集体的集体协作行动。在举办婚礼、洗礼或全村重大盛会时，全村的妇人会聚在一起用 Woka 叶包裹姜黄饭，男人们则用干椰子壳点燃熏窑，或者熬煮满满几大锅热气腾腾的杂菜粥。这种马帕卢斯精神，用爱温饱了一代又一代塔拉万的子孙。",

    aiBadge: "双子座人工智能指南",
    aiTitle: "对话莫娜 - 您的虚拟导游助手",
    aiSubtitle: "询问有关住宿路线、瀑布景区门票价格、当地餐馆推荐或如何游览这个美丽村落的指南。",
    aiConsoleTitle: "莫娜 - 您的线上助手",
    aiStatus: "向导服务在线 • 竭诚为您服务",
    aiGreeting: "沙洛姆 (Shalom)！万鸦老的旅人，您好！我是莫娜，是印尼北苏拉威西省北米纳哈萨塔拉万村的官方 AI 虚拟向导。\n\n今天有什么可以帮您的？不论是图南瀑布游玩攻略（门票仅需1.0万印尼盾）、马帕卢斯文化起源，还是关于万鸦老特色美食（Tinutuan 杂菜粥和 Klappertaart 椰挞），都可以随时向我提问！",
    aiReplyErrorFallback: "非常抱歉，我目前对这个特定问题有些困惑，我正在努力学习中。",
    aiApiErrorFallback: "很抱歉，莫娜网络有一点丢包，正在林间重连，请您在一两分钟后再次发送！",
    aiInputPlaceholder: "请输入您关于塔拉万村的疑问...",
    sugChips: [
      "请问图南瀑布门票是多少钱？",
      "塔拉万村有什么推荐美食？",
      "具体的地理位置和驾车路线是什么？",
      "能给我讲讲传统的马帕卢斯文化吗？",
    ],

    quizBadge: "塔拉万文化娱乐问答",
    quizTitle: "塔拉万民俗趣味知识问答",
    quizSubtitle: "测试题目",
    quizQuestionIndicator: "/",
    quizWawasan: "民俗知识详解",
    quizVerifyBtn: "提交答案",
    quizNextBtn: "下一题",
    quizFinishedBtn: "查看评估结果",
    quizScoreBadge: "恭喜您完成测试！您的得分情况如下",
    quizFinishedTitle: "塔拉万文化趣味知识问答圆满结束！",
    quizPoinLabel: "答对题目总数",
    quizRankLabel: "村民文化理解等级",
    quizCongrat: "非常出色！通过本次问答，您已经深入探究了印尼北苏拉威西塔拉万村流传百年的祖先智慧、美丽的自然景观和传奇的地道美食。",
    quizRestartBtn: "重新开始测试",
    quizRankHukumTua: "荣誉 Hukum Tua (荣誉村委首领) 👑",
    quizRankKawanua: "真正的 Kawanua (万鸦老当地通) ✨",
    quizRankExplorer: "博学的热带探险家 🎒",
    quizRankTourist: "初来乍到的观光客 🚶",
    quizData: [
      {
        question: "塔拉万村（Talawaan）引以为傲的图南飞瀑大约有多高？",
        options: ["约25米高", "约45米高", "约86米高", "约120米高"],
        explanation: "图南瀑布高度约为85-86米，水流湍急清凉，从巍峨的火山岩石上直泻入热带林谷，壮美异常。",
      },
      {
        question: "米纳哈萨（Minahasa）人自古以来对选举出的尊贵村长的官方称谓是什么？",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Hukum Tua 是米纳哈萨语，几个世纪以来一直作为传统选拔或委任的行政村委首脑的尊称。",
      },
      {
        question: "塔拉万当地用于包装香气四溢的黄金姜黄饭的天然野叶名称是什么？",
        options: ["香蕉叶", "Woka叶 (野生棕榈)", "斑斓叶", "柚木叶"],
        explanation: "万鸦老的黄色姜黄饭包装采用野生的 Woka 叶（一种高大雨林棕榈叶），隔水蒸热时能散发出令人沉醉的天然幽香。",
      },
      {
        question: "在塔拉万村代代传承的“马帕卢斯（Mapalus）”精神指的是什么？",
        options: ["古代部族的丛林武术", "丰收欢庆舞蹈仪式", "高度组织性、互惠平等的村社共同互助合作", "树皮纤维纺织手工"],
        explanation: "马帕卢斯是米纳哈萨地区祖辈传下来的宗族社会契约，包含了村民在农忙插秧、修路建房以及白事丧礼中的无条件集体共同协助。",
      },
    ],

    footerSlogan: "塔拉万村自主设计生态旅游信息门户。旨在为您串联起震撼心灵的热带瀑布探险与古老醇厚的米纳哈萨人文情怀。",
    footerTitleTownhall: "塔拉万村委会行政总部",
    footerTitleHours: "公共办公与接待时间",
    footerHoursDays: "星期一 至 星期五",
    footerHoursTimings: "08:00 AM - 03:30 PM (中部印尼时间 / GMT+8)",
    footerHoursNote: "* 如果有正式文书需要加盖村委会公章或进行实名信息核验证明，建议提前复印身份证，并在上午办公时段前往村委会办理。",
  },
  ko: {
    navHome: "홈페이지",
    navWisata: "관광 명소",
    navBudaya: "문화 & 먹거리",
    navAsisten: "AI 모나에게 묻기",
    navKuis: "퀴즈 대결",
    selectLanguage: "언어 선택",

    heroBadge: "노스 미나하사의 프리미엄 우수 관광 마을",
    heroTitleRegular1: "수려한 자연 & ",
    heroTitleItalic: "문화적 조화",
    heroTitleRegular2: "가 숨쉬는 탈라완 마을",
    heroSubtitle: "탈라완(Talawaan) 마을의 공식 포털 사이트에 오신 것을 환영합니다. 마나도 국제공항에서 매우 인접한 이곳은 86m 높이의 웅장한 투난 폭포(Tunan Waterfall), 끝없이 펼쳐진 푸른 야자수 숲, 대대로 내려오는 전통 미식, 그리고 이웃 간 협동 정신인 마팔루스(Mapalus) 문화를 직접 느끼고 체험할 수 있는 최적의 생태 관광 허브입니다.",
    heroBtnExplore: "대표 명소 둘러보기",
    heroBtnAI: "AI 가이드에게 질문하기",
    heroTunanCaption: "86 미터 높이 • 인도네시아 북술라웨시주 탈라완 마을",
    heroAreaLabel: "총 토지 면적",
    heroAreaDesc: "북미나하사의 비옥한 산기슭 지대",
    heroPopLabel: "인구 수",
    heroPopDesc: "따뜻한 정과 마팔루스 정신을 나르는 주민들",
    heroWaterLabel: "투난 폭포 높이",
    heroWaterDesc: "열대우림속 차갑고 깨끗한 계곡물",
    heroAirLabel: "공항 거리",
    heroAirDesc: "삼 라툴랑이 국제공항과 매우 인접",
    historyBadge: "역사 요약",
    historyTitle: "미나하사 선조들의 지혜",
    historyDesc1: "탈라완 마을은 원래 역사적인 톤세아(Tonsea) 북부의 비옥하고 풍요로운 미나하사 원주민 정착지로 시작되었습니다. 'Talawaan'이란 단어는 현지 부족의 고대 언어에서 유래했으며, 숲길을 지나는 나그네들이 무성한 나뭇잎 그늘 아래 서늘하게 쉬어갈 수 있는 청량한 샘물터를 의미합니다.",
    historyDesc2: "오늘날까지 탈라완 주민들은 농업, 공동체 발전, 가문의 대사 등 삶의 전반에서 선조들의 상부상조 사상인 '마팔루스(Mapalus)'를 성실히 실천하며, 다채로운 인류애적 조화와 평화를 구현하고 있습니다.",

    wisataBadge: "인도네시아 깊은 탐험",
    wisataTitle: "생태 관광 & 영원한 자연의 미",
    wisataSubtitle: "인도네시아 북술라웨시주 탈라완 마을의 환상적인 비밀 관광지를 탐험해 보세요. 하늘로 뻗은 시원한 열대 우림 폭포를 만나고, 현지 코코넛 농부들과 이야기를 나누며 똑똑한 계산기로 맞춤형 여행 경비를 미리 확인하십시오.",
    selectDestLabel: "목적지 선택",
    calcPriceLabel: "관광지 입장료",
    calcDistanceLabel: "공항 거리",
    deepReviewLabel: "상세 해설 및 특징",
    bestTimeLabel: "최적의 관람 시간대",
    airportConveyLabel: "공항 교통 연계성",
    airportConveyText: "매우 가깝습니다. 마나도 공항 외곽 게이트에서 단 ",
    airportConveyUnit: " 거리입니다.",
    amenitiesLabel: "현장 편의 시설",
    tunanDesc: "때묻지 않은 원시 열대 우림 깊숙한 곳에 수줍게 숨겨진 86m의 비밀 거대 폭포.",
    tunanLong: "탈라완의 가장 찬란한 보석인 투난 폭포는 86m 높이의 수직 화산암 절벽에서 차가운 계곡수가 웅장하게 폭포수를 이루며 쏟아져 내립니다. 주위는 희귀 주라기 양치식물들이 감싸고 있습니다. 접근성이 좋은 200m 길이의 평평한 시멘트 산책로를 갖추고 있어 모든 연령층의 관광객들이 안전하게 삼림욕을 즐길 수 있습니다.",
    tunanBestTime: "오전 시간대 (오전 08:00 - 오전 11:00) 따사로운 햇살과 밝은 광량 하에 멋진 사진 촬영 가능",
    tunanDistance: "15-20분 소요",
    tunanFacilities: ["휴식용 전통 원두막", "쾌적한 콘크리트 인도", "향토 요리 점포", "샤워실 & 화장실", "안전 주차 구역"],
    agroDesc: "코코넛을 전통적인 건조 가마에서 말리는 훈증 과정을 배우고, 갓 딴 시원하고 달콤한 야자수 물을 시음합니다.",
    agroLong: "탈라완 구릉지 위로 넓은 코코넛 숲이 장관을 이룹니다. 이곳에서 미나하사의 일류 코코넛 농부들과 대화하고 전통 훈제 가마에서 코코넛 생육을 말려 기름 원료(코프라)를 제조하는 흥미진진한 주거 가마 풍경을 참관하며 신선한 코코넛 주스를 만끽하실 수 있습니다.",
    agroBestTime: "시원한 산바람이 부는 오후 시간대 (오후 15:00 - 오후 17:00) 추천",
    agroDistance: "10분 소요",
    agroFacilities: ["현지 농부 전문 가이드", "울창한 야자수 그늘", "전통 코프라 건조실 시연", "야자수 핑거 푸드 부스", "마운틴 하이킹 바이크 길"],
    kaliDesc: "숲속 아늑한 골짜기에 감춰진 조용한 폭포로, 물놀이가 가능한 비취색 천연 풀장과 요가 명상의 은신처입니다.",
    kaliLong: "탈라완 심산유곡 깊은 계곡에 숨어 있는 15m 높이의 아담한 폭포입니다. 폭포수가 층층이 흘러 맑고 깨끗한 천연 비취 빛깔 여울을 만듭니다. 주위에 상업 시설이 없어 오직 물소리와 새소리만 들을 수 있는 아주 고요한 휴식터이자 자연 치유 명소입니다.",
    kaliBestTime: "한낮 시간대 (오전 11:00 - 오후 14:00) 햇살이 빽빽한 나무 잎사귀 사이를 예쁘게 투과하는 시간",
    kaliDistance: "25분 소요",
    kaliFacilities: ["야생 삼림 도보 트레킹로", "수영이 가능한 청정 풀장", "간이 목조 벤치", "자연 열대 우림 포토 존"],

    calcBadge: "합리적 예산 투명 산출기",
    calcTitle: "여행 경비 시뮬레이션 계산기",
    calcSubtitle: "숨겨진 비용 없이 알뜰하게 술라웨시 하이킹 계획을 계산해 보세요. 인원과 세부 차량 및 addons 옵션을 변경해 예상 지출안을 확인하십시오.",
    groupSizeLabel: "단체 인원수",
    groupPaxUnit: "명 가족/친구",
    transLabel: "이동 수단 (마나도 시내 왕복)",
    transOwn: "자차 이용 / 하이킹",
    transMotor: "오토바이 대여 - 약 75,000 루피아",
    transCar: "기사 포함 렌터카 하루 - 약 350,000 루피아",
    addonsLabel: "추가 부가 서비스 (선택 사항)",
    gazeboLabel: "숲속 방갈로 원두막 대여",
    guideLabel: "현지 산림 해설사 동행",
    foodLabel: "탈라완 수제 웰빙 도시락",
    billTitle: "예상 지출 견적서 영수증",
    billEntrance: "총 관광지 입장료",
    billTransport: "왕복 렌트 교통비",
    billGazebo: "원두막 대여료",
    billGuide: "현지 아웃도어 가이드비",
    billFood: "미나하사 전통 도시락비",
    billTotal: "예상 총합계 지출액",
    billTip: "여행 정보: 폭포 계곡 아래는 울창한 나무 그늘이 져 서늘하므로 가벼운 겉옷을 준비하시고, 통신 전파 신호가 일시적으로 약할 수 있으니 소정의 현금을 바지에 안전하게 휴대하는 것을 권장합니다.",

    budayaBadge: "톤세아의 위대한 인류 문명사",
    budayaTitle: "부드럽고 달콤한 옐로우 푸드 & 전통 유산",
    budayaSubtitle: "북술라웨시 식문화의 정수를 느껴보세요. 입안에서 부드럽게 녹아내리는 가문의 오랜 코코넛 타르트, 영양이 풍부한 전통 야채죽, 그리고 이웃 간 상부상조하는 마팔루스 도풍을 직접 체험해 주십시오.",
    filterAll: "전체 보기",
    filterCuisine: "향토 전통 음식",
    filterCulture: "민속 춤 & 전통 의례",
    tipBadge: "현지인 추천 팁",
    klapDesc: "네덜란드 식민지 시대부터 이어져 온 전설적인 디저트로 우유, 계란, 육계가루, 건포도 및 쫄깃한 어린 야자 속살로 만든 촉촉한 코코넛 타르트.",
    klapTips: "냉장고에 넣어 차갑게 드시면 입안에서 부드러운 푸딩처럼 스르르 안개처럼 흩어지는 최상의 풍미를 만끽하실 수 있습니다.",
    klapTags: ["달콤한 디저트", "네덜란드식 아로마", "추천 기념품 1위"],
    tinuDesc: "영양이 가득한 전통 마나도 야채죽으로 단호박, 고구마, 쌀, 옥수수 등을 현지 특산 허브 잎사귀와 함께 오랜 시간 고은 영양 식.",
    tinuTips: "신선한 라임 즙이나 다진 고추를 올린 훈제 참치 플레이크, 또는 전통 로아 생선 고추장 소스(Sambal Roa)를 곁들여 먹는 것을 선호합니다.",
    tinuTags: ["감칠맛과 담백함", "천연 고식이섬유", "아침 대표 식사"],
    nasiDesc: "천연 야생 보카(Woka) 야자수 잎사귀로 동그랗고 길게 포장한 노란 강황 밥으로, 매콤한 갈치 또는 참치구이와 당면볶음을 곁들입니다.",
    nasiTips: "플라스틱 그릇이나 전자레인지에 바로 돌리지 마시고, 보카 나뭇잎에 싸인 채로 찜기에서 쪄내시면 은은하고 독특한 정글의 나무 향이 극대화됩니다.",
    nasiTags: ["맛있는 주식", "정글 숲속 본연의 나무 향", "독특한 천연 잎사귀 포장 공예"],
    kolinDesc: "현지 산림 속에서 엄선된 연목을 조각하여 웅장하고 청아한 멜로디 파형을 선율하는 미나하사의 대표 목조 타악기.",
    kolinTips: "외국 국빈 환송 행사, 성당 크리스마스 성가대 아카펠라 합창, 그리고 이웃 마을 간의 활기찬 전통 혼례 잔치에 단골로 연주됩니다.",
    kolinTags: ["목조 실로폰 타악기", "국가 비물질 문화재", "오케스트라 악단"],
    mapaDesc: "수백 년간 미나하사 조상 대대로 내조한 상부상조 복지 체계이자 자율적으로 실행되는 연대 공동체 연대.",
    mapaTips: "단순 봉사 뿐만 아니라, 영적인 의무감을 짊어진 전 도민 간의 암묵적인 부조 약속으로 사회 안전망의 핵심 역할을 수행합니다.",
    mapaTags: ["자율 연대 상부상조", "사회 심장적 가치", "선조의 종족 풍습"],
    kitchenBadge: "부엌 가마솥 마팔루스 정신",
    kitchenTitle: "피어오르는 모락모락 장작 연기 속에 다져진 우정",
    kitchenDesc: "탈라완 마을에서 대규모 잔치 요리는 결코 혼자서 소유하는 요리가 아닙니다. 큰 결혼식이 열리는 날에는 온 동네 어머니들이 마당에 나와 보카 야자 잎으로 밥을 싸고, 청년과 삼촌들은 훈연 가마솥에 불을 올려 엄청난 가마솥에 야채죽을 끓여 냅니다. 온 마을을 따스하게 포용해 주는 따뜻하고 맛있는 밥상의 평화주의입니다.",

    aiBadge: "제미나이 기반 인공지능 컨시어지",
    aiTitle: "모나와 대화하기 - 당신의 AI 가이드봇",
    aiSubtitle: "비밀 소풍 경로, 숙소 예약처, 매표소 입장 요금, 맛집 위치 정보 및 아름다운 전통 마을 문화에 필요한 알짜 정보를 질문해 주세요.",
    aiConsoleTitle: "모나 - 당신의 온라인 AI 도우미",
    aiStatus: "정상 작동 중 • 언제나 도와드릴 준비가 되어있습니다",
    aiGreeting: "샬롬(Shalom)! 수려한 북술라웨시를 방문해 주신 여행자 여러분 반갑습네다! 저는 노스 미나하사 탈라완 마을의 공식 인공지능 가이드 모나(Mona)입니다.\n\n산림 하이킹(입장료 단 10,000 루피아), 명물 코코넛 타르트 파는 전문 제과점 추천, 또는 마을 대대로 내려오는 이웃 사랑 공동체 마팔루스 문화에 관해 상식 전반을 재미있게 실시간 학습식으로 알려드릴 수 있으니 마음껏 물어봐주세요!",
    aiReplyErrorFallback: "죄송합니다. 현재 복잡하게 정렬된 해당 단어들의 맥락을 온전히 분석해내지 못해 열심히 데이터베이스 트레이싱 학습 중에 있습니다.",
    aiApiErrorFallback: "어머나, 정글 속 통신 기지국에 수풀 연기가 껴 신호 감쇠가 일어났습니다. 1-2분 뒤에 다시 상냥하게 메시지를 보내주시면 감사하겠습니다!",
    aiInputPlaceholder: "탈라완 관광 및 여행 관련 궁금증을 질문해 주세요...",
    sugChips: [
      "투난 폭포 기본 입장료는 얼마입니까?",
      "탈라완 현지 전통 디저트를 소개해 줄래?",
      "마을 공무원 및 시내에서 찾아가는 이동 경로 및 맵 안내",
      "미나하사 전통 '마팔루스'는 무엇입니까?",
    ],

    quizBadge: "탈라완 전통 문화 퀴즈 오락관",
    quizTitle: "탈라완 민속 상식 백과 퀴즈",
    quizSubtitle: "수수께끼 번호",
    quizQuestionIndicator: "/",
    quizWawasan: "민속 지식 해설 코너",
    quizVerifyBtn: "내 답안 제출하기",
    quizNextBtn: "다음 문제로 출동",
    quizFinishedBtn: "나의 성적표 받기",
    quizScoreBadge: "축하합니다! 퀴즈 완주에 성공하셨습니다",
    quizFinishedTitle: "탈라완 상식 퀴즈 마당 종료!",
    quizPoinLabel: "내가 맞춘 총 정답수",
    quizRankLabel: "나의 마을 명예 주민 등급",
    quizCongrat: "대단하십니다! 퀴즈 여정을 통해 인도네시아 북술라웨시주 탈라완 마을에 서려 있는 아름다운 정글 폭포, 이웃 사랑 연대 풍습, 전설의 맛있는 미식을 완벽히 이해하셨습니다.",
    quizRestartBtn: "상식 도전 다시 시작하기",
    quizRankHukumTua: "명예 Hukum Tua (마을 존경받는 족장) 👑",
    quizRankKawanua: "마나도 최고의 소식통 Kawanua ✨",
    quizRankExplorer: "만물박사 밀림 탐험가 🎒",
    quizRankTourist: "귀여운 호기심 많은 여행 꿈나무 🚶",
    quizData: [
      {
        question: "탈라완 마을의 명물 수려한 투난 폭포의 높이는 대략 얼마일까요?",
        options: ["약 25m 높이", "약 45m 높이", "약 86m 높이", "약 120m 높이"],
        explanation: "투난 폭포는 대략 85-86m 높이로, 우뚝 솟은 화산석 바위절벽 틈 사이로 한여름의 냉동고처럼 얼음장 계곡물을 끝없이 퍼붓듯이 흘려 보냅니다.",
      },
      {
        question: "미나하사 톤세아 원주민들이 민주적으로 추대한 고결한 명예 마을 이장을 부르는 현지 부족어 칭호는?",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Hukum Tua는 미나하사 고어로서, 족장 및 오늘날 행정 부서에서 가장 덕망 높은 영적 마을 최고 대표를 예우하여 부르던 신성한 명치입니다.",
      },
      {
        question: "만도인들이 좋아하는 향긋하고 윤기 있는 황금색 강황 밥을 찔 때 밥그릇 대용으로 유용하게 덮어 싸던 야생 나뭇잎 이름은?",
        options: ["바나나 잎사귀", "보카 (야생 팜 잎사귀)", "파스텔 카라멜 잎", "티크 나무 잎사귀"],
        explanation: "만도 황금 강황 밥은 보카(Woka)라고 부르는 대형 정글 잎사귀에 싸서 찜기에서 찌게 되는데, 이때 정글 식물 특유의 기품 있고 향긋한 피톤치드 아로마가 밥알 깊숙이 배게 됩니다.",
      },
      {
        question: "탈라완 가구 대대로 보존 전수해 온 '마팔루스(Mapalus)'는 무엇을 지향하고 실현합니까?",
        options: ["전통 정글 맹수 무술 기술", "추수 감사 댄스 의례 페스티벌", "고도의 조직적이고 조화로우며 공감 및 소통하는 이웃 상부상조 협동 체계", "원목 껍질 탈착 수공예 방적 기법"],
        explanation: "마팔루스는 농번기 벼 베기, 마을 공공 도로 보수 공사, 그리고 아기 돌잔치나 상여 화장 장례식 행사에 일체의 주저함 없이 전 마을 주민이 한마음 한뜻으로 자발적으로 투입되어 일손을 거들어 주던 아름다운 정통 무형 복지 규범입니다.",
      },
    ],

    footerSlogan: "탈라완 마을 자율 생태관광 온라인 대변인. 수려한 열대우림 폭포와 수백년 유구한 이웃 사랑이 어우러진 마나도로의 조화로운 여정을 안내합니다.",
    footerTitleTownhall: "탈라완 자치 마을회 본관",
    footerTitleHours: "행정 업무 및 서비스 운영 시간",
    footerHoursDays: "월요일 - 금요일",
    footerHoursTimings: "오전 08:00 - 오후 15:30 (마나도 표준시 / GMT+8)",
    footerHoursNote: "* 공식 증명 날인 및 실명 토지 증명 등이 필요한 공식 출장 방문 시에는 주민등록 복사본을 지참하시고 오전 11시 전에 도착해 접수하는 것을 권장합니다.",
  },
  vi: {
    navHome: "Trang Chủ",
    navWisata: "Khu Du Lịch",
    navBudaya: "Văn Hóa & Ẩm Thực",
    navAsisten: "Hỏi AI Mona",
    navKuis: "Câu Hỏi Vui",
    selectLanguage: "Ngôn Ngữ",

    heroBadge: "Làng Du Lịch Sinh Thái Tiên Phong North Minahasa",
    heroTitleRegular1: "Kỳ Quan Thiên Nhiên & ",
    heroTitleItalic: "Hòa Quyện Văn Hóa",
    heroTitleRegular2: " tại Làng Talawaan",
    heroSubtitle: "Chào mừng quý khách đến với cổng thông tin du lịch chính thức của làng Talawaan. Một thiên đường sinh thái hoang sơ chỉ cách sân bay quốc tế Manado vài phút di chuyển, nổi tiếng với ngọn thác kỳ vĩ Tunan cao 86m, những cánh rừng dừa rợp bóng, hương vị ẩm thực Minahasa độc đáo và tinh thần đoàn kết Mapalus ấm áp.",
    heroBtnExplore: "Khám Phá Địa Danh",
    heroBtnAI: "Trò Chuyện AI Mona",
    heroTunanCaption: "Chiều cao 86m • Làng Talawaan, Bắc Sulawesi",
    heroAreaLabel: "Tổng diện tích đất",
    heroAreaDesc: "Vùng chân đồi trù phú của North Minahasa",
    heroPopLabel: "Tổng dân số",
    heroPopDesc: "Những người con Mapalus thân thiện, hiếu khách",
    heroWaterLabel: "Chiều cao thác Tunan",
    heroWaterDesc: "Dòng thác tinh khiết từ rừng rậm nhiệt đới",
    heroAirLabel: "Khoảng cách sân bay",
    heroAirDesc: "Cực kỳ gần Sân bay Quốc tế Sam Ratulangi",
    historyBadge: "SƠ LƯỢC LỊCH SỬ",
    historyTitle: "Trí Tuệ Cổ Xưa Của Tổ Tiên Minahasa",
    historyDesc1: "Làng Talawaan được hình thành như một vùng định cư màu mỡ của người Minahasa ở phía bắc lãnh thổ Tonsea trù phú. Cái tên 'Talawaan' được coi là xuất phát từ tiếng bộ lạc bản địa cổ, mô tả dòng suối mát lành mát rượi chảy qua tán rừng rậm rạp che bóng mát cho các đoàn người dừng chân nghỉ ngơi.",
    historyDesc2: "Cho đến ngày nay, cộng đồng cư dân Talawaan vẫn gìn giữ vẹn nguyên văn hóa 'Mapalus'—hình thức tương trợ giúp đỡ lẫn nhau bằng đạo đức cộng đồng tự nguyện trong canh tác lúa nước, dựng nhà hay hiếu hỷ chia buồn gia đình.",

    wisataBadge: "KHÁM PHÁ CHI TIẾT INDONESIA",
    wisataTitle: "Du Lịch Sinh Thái & Kỳ Quan Vĩnh Hằng",
    wisataSubtitle: "Chiêm ngưỡng địa hình thiên nhiên hoang dã của Bắc Sulawesi tại Talawaan. Băng qua những khu rừng nguyên sinh để đến các ngọn thác mát lành và tính toán chi phí hành trình thông minh, minh bạch.",
    selectDestLabel: "LỰA CHỌN ĐIỂM ĐẾN",
    calcPriceLabel: "Vé Vào Cửa",
    calcDistanceLabel: "Khoảng Cách",
    deepReviewLabel: "Phân Tích Chi Tiết",
    bestTimeLabel: "Khung Giờ Khám Phá Lý Tưởng",
    airportConveyLabel: "Thuận Lợi Giao Thông Sân Bay",
    airportConveyText: "Rất gần, ngay phía cổng ngoài sân bay, chỉ mất tầm ",
    airportConveyUnit: " lái xe dạo mát.",
    amenitiesLabel: "Tiện Ích Có Sẵn Tại Chỗ",
    tunanDesc: "Thác nước huyền thoại cao 86m ẩn sâu dưới tán rừng nhiệt đới trù phú hoang sơ.",
    tunanLong: "Thác Tunan là vương miện tự hào của Talawaan. Ngọn thác đổ dòng nước trong vắt, mát lạnh từ vách đá núi lửa thẳng đứng cao 86 mét, bao quanh là các loài dương xỉ cổ thụ từ kỷ Jura. Lối tiếp cận là đường bê tông phẳng hoàn toàn, dài 200m men theo khe suối, giúp người già và trẻ nhỏ đi lại dễ dàng.",
    tunanBestTime: "Sáng sớm (08:00 AM - 11:00 AM) để ghi lại bức ảnh lung linh dưới ánh sáng mặt trời",
    tunanDistance: "15-20 phút di chuyển",
    tunanFacilities: ["Chòi Nghỉ Mát", "Đường Đi Bộ Bê Tông", "Quầy Ăn Bản Địa", "Nhà Tắm & Phòng Vệ Sinh", "Bãi Đỗ Xe An Toàn"],
    agroDesc: "Học cách sấy dừa khô thủ công truyền thống và trực tiếp thưởng thức nước dừa ngọt mát thơm phức.",
    agroLong: "Trải dài trên những sườn núi đón nắng của Talawaan là các dồn điền dừa bạt ngàn. Tại đây du khách sẽ gặp gỡ những người nông dân hiền lành, xem kỹ nghệ gõ vỏ dừa khéo léo, khám phá lò hun dừa để lấy cơm dừa khô (để ép dầu dừa) và thưởng thức trái dừa tươi ngon ngọt dịu lịm.",
    agroBestTime: "Nên đi chiều mát (03:00 PM - 05:00 PM) để vừa đi dạo râm mát vừa đón gió núi",
    agroDistance: "10 phút di chuyển",
    agroFacilities: ["Nông Dân Bản Địa Dẫn Đường", "Vườn Dừa Rợp Bóng", "Biểu Diễn Lò Hun Dừa", "Trạm Dừa Tươi Đón Tiếp", "Lối Đạp Xe Địa Hình"],
    kaliDesc: "Ngọn thác thanh bình ẩn mình trong thung lũng sương mù, có hồ nước trong mát để đắm mình thiền định.",
    kaliLong: "Một ngọn thác nhỏ cao tầm 15 mét, ẩn mình biệt lập giữa thung lũng rừng thẳm Talawaan. Nước đổ xuống tạo thành lòng hồ màu xanh lục bảo khoáng đạt đầy mê hoặc. Nơi đây cách biệt hoàn toàn khỏi nhịp sống phố thị, thích hợp tuyệt đối cho việc ngâm mình thư giãn và thiền định yên tĩnh nghe tiếng róc rách chim kêu.",
    kaliBestTime: "Giữa trưa (11:00 AM - 02:00 PM) khi ánh nắng mặt trời xuyên qua các tán lá cây cổ thụ",
    kaliDistance: "25 phút di chuyển",
    kaliFacilities: ["Đường Quốc Lộ Đi Bộ Rừng", "Hồ Bơi Tự Nhiên Trong Vắt", "Ghế Ngồi Bằng Gỗ Mộc", "Khung Cảnh Chụp Ảnh Nhiệt Đới"],

    calcBadge: "Minh Bạch Chi Phí Hành Trình",
    calcTitle: "Công Cụ Ước Tính & Tính Toán Ngân Sách",
    calcSubtitle: "Thu xếp chuyến hành trình của bạn mà không có bất kỳ khoản phí ẩn nào. Nhấp điều chỉnh các tùy chọn bên dưới để xem dự toán ngân sách chuyến đi.",
    groupSizeLabel: "Số Lượng Thành Viên",
    groupPaxUnit: "Khách du lịch",
    transLabel: "Phương Tiện Đi Lại (Khứ hồi Manado)",
    transOwn: "Tự lái xe / Đi bộ",
    transMotor: "Thuê Xe Máy - khoảng 75k Rp",
    transCar: "Thuê Ô Tô Kèm Tài Xế - khoảng 350k Rp",
    addonsLabel: "DỊCH VỤ BỔ SUNG (TÙY CHỌN)",
    gazeboLabel: "Thuê Chòi Nghỉ Mát",
    guideLabel: "Thuê Hướng Dẫn Bản Địa",
    foodLabel: "Suất Ăn Đặc Sản Minahasa",
    billTitle: "BẢNG KÊ QUY ĐỔI CHI TIẾT",
    billEntrance: "Tổng Vé Vào Cổng",
    billTransport: "Phí Thuê Xe Khứ Hồi",
    billGazebo: "Chi Phí Thuê Chòi",
    billGuide: "Chi Phí Hướng Dẫn Viên",
    billFood: "Suất Ăn Bản Địa Trọn Vị",
    billTotal: "NGÂN SÁCH DỰ TÍNH",
    billTip: "Lời khuyên: Khuyên mang theo quần áo khô để thay, giày leo núi chống trơn trượt tốt và mang theo tiền mặt Indonesia Rupiah vì trong thung lũng thác thỉnh thoảng sẽ bị mất sóng vô tuyến.",

    budayaBadge: "DI SẢN PHI VẬT THỂ TONSEA",
    budayaTitle: "Hương Vị Bánh Dừa Cổ Điển & Phong Tục Đầy Nhân Văn",
    budayaSubtitle: "Trải nghiệm chiều sâu văn hóa Bắc Sulawesi. Thưởng thức chiếc bánh dừa nướng béo ngậy được kế thừa từ thời kỳ thuộc địa, bát cháo dinh dưỡng rau củ ấm lòng và tinh thần tương thân thương ái Mapalus của làng.",
    filterAll: "Xem Tất Cả",
    filterCuisine: "Hương Vị Đặc Sản",
    filterCulture: "Nghệ Thuật & Tập Tục",
    tipBadge: "Mách Bạn Thưởng Thức",
    klapDesc: "Chiếc bánh ngọt ngào mang dấn ấn thời gian chế biến từ sữa, trứng gà, hạt óc chó cay nóng và dừa non, mang phong vị ẩm thực Hà Lan đặc biệt.",
    klapTips: "Dùng trực tiếp sau khi để tủ lạnh lạnh ngắt để trải nghiệm lớp thạch dừa kem trứng mềm tan một cách trọn vẹn và tinh tế nhất.",
    klapTags: ["Ngọt Ngào Đậm Vị", "Phong Cách Châu Âu", "Góc Quà Lưu Niệm Đầy Ý Nghĩa"],
    tinuDesc: "Bát cháo dinh dưỡng lâu đời nấu từ gạo, khoai lang, bí đỏ, hạt bắp mật và các thảo mộc lá xanh bổ dưỡng.",
    tinuTips: "Nên vắt chút tắc tươi, rắc cá ngừ đại dương sấy khô giòn, ăn kèm nước xốt Roa ớt cá nướng ngon vô cùng.",
    tinuTags: ["Thơm Ngon Thanh Đạm", "Nguồn Chất Xơ Tự Nhiên dồi dào", "Món Ăn Sáng Quốc Dân"],
    nasiDesc: "Cơm vàng nghệ dẻo thơm được bọc mộc mạc hình ống tròn bằng chiếc lá Woka hoang dã, dùng cùng cá ngừ xé sợi cay và sợi miến xào.",
    nasiTips: "Đừng sử dụng nilon hay bỏ lò vi sóng trực tiếp, hấp cả bọc lá Woka thơm trong nồi hơi sẽ giúp tạo mùi hương mộc dịu kỳ diệu.",
    nasiTags: ["Tinh Hoa Ẩm Thực", "Hương Thơm Lá Rừng Tự Nhiên", "Kỹ Nghệ Gói Thủ Công Độc Đáo"],
    kolinDesc: "Nhạc cụ gõ gỗ Minahasa danh giá đẽo gọt tỉ mỉ từ gỗ rừng siêu nhẹ, mang âm thanh du dương, trong sương gió núi.",
    kolinTips: "Thường được trình diễn xướng trong các lễ đón tiếp đại sứ, ca đoàn nhà thờ Công giáo và các tiệc cưới sân vườn ngoài trời Tonsea.",
    kolinTags: ["Bộ Đập Gõ Xylophone", "Hồn Quốc Gia Di Sản", "Dàn Hợp Xướng Dân Gian"],
    mapaDesc: "Hệ thống kết cấu cộng đồng ràng buộc bằng đạo đức xã hội tự nguyện, thể hiện qua nghĩa cử tương trợ ấm áp giữa các cư dân.",
    mapaTips: "Không chỉ dừng lại ở sự giúp đỡ thường nhật, đây là lời hứa danh dự vô hình đùm bọc các gia tộc làng lúc khó khăn, tang chế hay dựng mùa.",
    mapaTags: ["Tương Trợ Đồng Lòng", "Giá Trị Thâm Tâm", "Phong Tục Tập Quán Lâu Đời"],
    kitchenBadge: "BẾP LỬA MAPALUS ẤM NỒNG",
    kitchenTitle: "Tình Nghĩa Sắt Son Nhen Nhóm Từ Khói Bếp Chung",
    kitchenDesc: "Ở làng Talawaan, những mâm tiệc chưa bao giờ là công sức cô độc của một người. Vào ngày cưới đại hỷ, các bà các mẹ sẽ quây quần gói bánh Woka vàng rực, thanh niên chẻ củi nhen lò dừa sấy khô, đàn ông hầm nồi cháo rau củ khổng lồ. Đó chính là sự tương trợ Mapalus ấm nồng nhen nhóm từ khói sương bếp lò, nuôi dưỡng nhân phẩm con em Talawaan qua bao thế hệ.",

    aiBadge: "HƯỚNG DẪN AI CHAT THÔNG MINH",
    aiTitle: "Hỏi Mona - Trợ Lý Du Lịch Ảo Cho Chuyến Đi",
    aiSubtitle: "Giải đáp mọi thắc mắc của bạn về lộ trình bơi lội an toàn, giá vé tham quan thác nước, quán ăn ngon và lịch sinh hoạt văn hóa làng.",
    aiConsoleTitle: "Mona - Sứ Giả Số",
    aiStatus: "HƯỚNG DẪN VIÊN HOẠT ĐỘNG • SẴN SÀNG GIÚP ĐỠ",
    aiGreeting: "Shalom (Xin chào)! Người lữ hành phương xa mến khách! Tôi là Mona, sứ giả trợ lý AI ảo chính thức của làng sinh thái Talawaan, North Minahasa.\n\nHân hạnh được đón tiếp bạn! Hãy hỏi tôi về lộ trình đi thác Tunan (vé siêu rẻ chỉ 10.000 Rp), bí kíp ăn cháo vàng nghệ lá Woka thơm dẻo hay văn hóa giúp đỡ lẫn nhau Mapalus lâu đời của chúng tôi nhé!",
    aiReplyErrorFallback: "Tôi chưa tổng hợp đủ cơ sở dữ liệu để giải đáp câu hỏi sâu sắc này của bạn, tôi đang tra cứu và học thêm.",
    aiApiErrorFallback: "Ôi dào, một nhánh cây rậm vừa che mất cột phát sóng viễn thông thung lũng, vui lòng đợi lát và thử lại nhé bạn!",
    aiInputPlaceholder: "Nhập câu hỏi của bạn về du lịch Talawaan...",
    sugChips: [
      "Vé đi thác Tunan bao nhiêu tiền một người?",
      "Làng Talawaan có đặc sản gì ngon?",
      "Bản đồ vị trí địa lý của làng ở đâu?",
      "Kể cho tôi nghe về phong tục Mapalus",
    ],

    quizBadge: "KHO TÀNG CÂU HỎI VUI TALAWAAN",
    quizTitle: "Kuis Trivia Adat Talawaan",
    quizSubtitle: "Khảo sát câu số",
    quizQuestionIndicator: "trên tổng số",
    quizWawasan: "Kiến Thức Bản Địa Sâu Sắc",
    quizVerifyBtn: "Gửi Đáp Án",
    quizNextBtn: "Câu Hỏi Tiếp Theo",
    quizFinishedBtn: "Xem Điểm Đánh Giá",
    quizScoreBadge: "XIN CHÚC MỪNG HOÀN THÀNH",
    quizFinishedTitle: "Cuộc Thi Tìm Hiểu Văn Hóa Đã Xong!",
    quizPoinLabel: "Số Câu Trả Lời Đúng",
    quizRankLabel: "Huy Hiệu Am Hiểu Địa Phương",
    quizCongrat: "Tuyệt mỹ! Bạn đã xuất sắc hoàn thành xuất sắc bài trắc nghiệm nhanh, thấu hiểu trọn vẹn văn minh làng du lịch xanh Talawaan.",
    quizRestartBtn: "Chinh Phục Lại Từ Đầu",
    quizRankHukumTua: "Danh Dự Hukum Tua (Tù Trưởng Làng Quý Tộc) 👑",
    quizRankKawanua: "Kawanua Thực Thụ (Thổ Địa Sành Điệu) ✨",
    quizRankExplorer: "Nhà Thám Hiểm Rừng Sâu 🎒",
    quizRankTourist: "Du Khách Tò Mò Mới Đến 🚶",
    quizData: [
      {
        question: "Ngọn thác Tunan trứ danh nằm ở địa bàn làng Talawaan cao bao nhiêu mét?",
        options: ["Khoảng 25 mét", "Khoảng 45 mét", "Khoảng 86 mét", "Khoảng 120 mét"],
        explanation: "Thác nước Tunan cao sừng sững khoảng 85-86 mét, chảy từ khe núi lửa dốc đứng xuống thung lũng sâu, mang dòng nước trong veo mát lành giải nhiệt ngày hè cực đã.",
      },
      {
        question: "Từ cổ chí kim, người Minahasa dùng danh xưng kính trọng nào để bầu vị trưởng làng hành chính tối cao?",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Hukum Tua là danh xưng Minahasa cổ tôn kính dùng để gọi vị trưởng làng đại biểu có đức có tài gánh vác việc chung.",
      },
      {
        question: "Món cơm vàng nghệ nổi vị ngọt béo bùi của Manado dùng loại lá tự nhiên nào gói để giữ mùi lâu?",
        options: ["Lá Chuối Quen Thuộc", "Lá Woka (Dừa Rừng Cổ)", "Lá Dứa Thơm", "Lá Tếch Già"],
        explanation: "Cơm vàng nghệ trứ danh được gói tỉ mỉ bằng lá Woka tự nhiên (lá cọ bụi rừng sâu), khi hấp nóng hơi nước kích hoạt tinh dầu tỏa ra hương thơm dịu nhẹ say lòng.",
      },
      {
        question: "Tinh thần bất khuất 'Mapalus' cổ truyền kết hợp trong đời sống làng đại biểu cho điều gì?",
        options: ["Võ thuật rừng thiêng cổ đại", "Múa lễ nghi cầu mùa màng thắng lợi", "Sự tương trợ hợp tác cộng đồng có tính tổ chức và tôn trọng lẫn nhau", "Dệt vải sợi vỏ cây thủ công mỹ nghệ"],
        explanation: "Mapalus là định chế xã hội lâu đời của tổ tiên vùng, quy định sự góp sức tập thể không vụ lợi của toàn dân làng từ khi cấy cày gặt hái, cho đến lúc gia đình có việc hiếu tang lễ ma chay.",
      },
    ],

    footerSlogan: "Cổng thông tin du lịch tự quản sinh thái làng Talawaan. Kết nối kỳ quan thác nước núi rừng hoang dã với nền giao lưu rực rỡ Minahasa.",
    footerTitleTownhall: "Trụ Sở Ủy Ban Nhân Dân Làng",
    footerTitleHours: "Khung Giờ Đón Tiếp Hành Chính",
    footerHoursDays: "Thứ Hai đến Thứ Sáu",
    footerHoursTimings: "08:00 AM - 03:30 PM (Múi Giờ Quốc Gia / GMT+8)",
    footerHoursNote: "* Nếu có hồ sơ tài liệu cần phê duyệt trực tiếp ký tên phê duyệt mộc đỏ hạt hành chính, khuyến nghị đem bản sao giấy căn cước và đến xếp hàng trước 11 giờ sáng nhé.",
  },
  la: {
    navHome: "Initium",
    navWisata: "Loca Sacra",
    navBudaya: "Cultus & Cibus",
    navAsisten: "AI Mona",
    navKuis: "Probatio",
    selectLanguage: "Ligula Latina",

    heroBadge: "Eximius Vicus Oecologiae Minahasensis",
    heroTitleRegular1: "Splendor Naturae & ",
    heroTitleItalic: "Concordia Morum",
    heroTitleRegular2: " in Talawaan",
    heroSubtitle: "Benevenisti ad paginam publicam vici Talawaan. Portus oecologiae tropicae iuxta aeroportum Manado situs. Ubi cataracta Tunan LXXXVI metrorum ex alto vertice ruit, palmeta cocorum per colles expanduntur, ac prisca Mapalus hospitalitas omnes comiter excipit.",
    heroBtnExplore: "Inspice Memorabilia",
    heroBtnAI: "Roga AI Custodem",
    heroTunanCaption: "LXXXVI Metra • Vicus Talawaan, Sulawesi Septentrionalis",
    heroAreaLabel: "Area Universa",
    heroAreaDesc: "Uberes collis ac rura Minahasensia",
    heroPopLabel: "Habitantium Numerus",
    heroPopDesc: "Civitas pacifica caritate Mapalus coniuncta",
    heroWaterLabel: "Altitudo Cataractae Tunan",
    heroWaterDesc: "Dona aqua limpida e silva tropicali",
    heroAirLabel: "Via Aeroportu",
    heroAirDesc: "Valde propinquus portui aerio Sam Ratulangi",
    historyBadge: "BREVIS HISTORIA",
    historyTitle: "Prisca Ancestralium Memoria",
    historyDesc1: "Pagus Talawaan conditus est tamquam uberrima colonorum Minahasensium sedes in septentrionali Tonsea agro. Nomen 'Talawaan' ortum putatur ex priscis indigenae verbis referentibus ad fontes iuges aut nemora frigida in quibus viatores ab aestu sub frondibus quiescebant.",
    historyDesc2: "Adhuc hodie, cives pietatem 'Mapalus'—auxilium mutuum ac commune—maxime colunt, concordiam foventes, copram colentes, ac patriam terram omnibus advenis hilari vultu commonstrantes.",

    wisataBadge: "INDONESIA PROFUNDA",
    wisataTitle: "Oecologia & Aeterna Sylvae Decora",
    wisataSubtitle: "Inspice mira rura tropica Sulawesi Septentrionalis in pago Talawaan. Pete cataractam frigidam et calcula sumptus itineris tui organo nostro perlucido.",
    selectDestLabel: "DELIGE ITER",
    calcPriceLabel: "Pretium Tesserae",
    calcDistanceLabel: "Longinquitas",
    deepReviewLabel: "Descriptio Plena",
    bestTimeLabel: "Horae Optimae Visitandi",
    airportConveyLabel: "Propinquitas Aeroportus",
    airportConveyText: "Propinqua est via, ad limites aerii portus solum ",
    airportConveyUnit: " navigatione abest.",
    amenitiesLabel: "Ambiendi Usus Hic Praebiti",
    tunanDesc: "Nobilis cataracta LXXXVI metrorum altitudine inter silvas inaccessas tropicas.",
    tunanLong: "Splendidum vici Talawaan signum, quod ex LXXXVI metrorum altissimo saxo vulcanico gelidissimas emittit undas. Flora antiqua e raris filicibus circumfunditur. Via caementitia firmata, et CC metra longa, iuxta amnem ducit, quapropter senes et pueri secure ambulare possunt.",
    tunanBestTime: "Mane (VIII:00 AM - XI:00 AM) cum rutilant radii solis et claritas optima est ad picturas",
    tunanDistance: "XV-XX Minutae",
    tunanFacilities: ["Dichas Restituti (Tabernacula)", "Via Caementitia Secura", "Popinae Locales", "Lavatoria ac Balnea", "Aream Custoditam Curribus"],
    agroDesc: "Disce modum priscum exsiccandi carnem cocorum subtili fumo ac gusta aquam dactyli frigidam.",
    agroLong: "Per aprica Talawaan iuga patent horti vasti cocorum arboribus repleti. Illic agricolas sedulos vultu affari licet, et processum astutum parandi copram (oleum dactyli) in fumo vapore observare, ac novissime dulcem aquam dactyli ab arbore statim dempti haurire.",
    agroBestTime: "Ad vesperum (III:00 PM - V:00 PM) aura miti flante e montibus",
    agroDistance: "X Minutae",
    agroFacilities: ["Ducem Agricolam Localem", "Umbracula Arborum", "Regiam Fumi Cocorum", "Excipiendi Portum cum Dactylis", "Tramites Birotis Agendis"],
    kaliDesc: "Antiqua parva cataracta in valle umbrosa abscondita, ubi lagona crystallina placide meditari sinit.",
    kaliLong: "Parva cataracta XV metrorum, quae inter abditas vici Talawaan fauces et amnem Kali sese occulit. Undae e saxo deiectae lacum mineralem nitenti viriditate efficiunt. Nihil ibi obstrepit nisi murmur aquae, propterea est optimus locus silentium petentibus et animam purgantibus.",
    kaliBestTime: "Meridie (XI:00 AM - II:00 PM) cum sol altissimus per folia vetustarum arborum penetrat",
    kaliDistance: "XXV Minutae",
    kaliFacilities: ["Tramites Trekking in Silva", "Lacus Limpidus Meditando", "Scamna Rustica e Ligno Facta", "Picturae Sylvestres Admirandae"],

    calcBadge: "Computatio Sumptuum Sine Fraude",
    calcTitle: "Organum Metiendi et Calculandi Budget",
    calcSubtitle: "Praepara iter tuum sine ulla fallacia aut sumptibus occultis. Muta personas vel servitia infra ut videas summas.",
    groupSizeLabel: "Numerus Viatorum",
    groupPaxUnit: "Viatores",
    transLabel: "Vehiculum (Ad Manado et Retrorsum)",
    transOwn: "Proprio Vehiculo / Pedibus",
    transMotor: "Rent Birotam Automariam - LXXV Milia Rp",
    transCar: "Rent Auto cum Rectore - CCCL Milia Rp",
    addonsLabel: "SERVIZIA ADDITA (OPTIONAL)",
    gazeboLabel: "Sewa Gazebo (Chiron)",
    guideLabel: "Ducis Localis Custodiam",
    foodLabel: "Cibum Proprium localem",
    billTitle: "RATIO SUMPTUUM DISCRIMINATA",
    billEntrance: "Tesserae Adeundi",
    billTransport: "Rent Vehiculo ad Transportandum",
    billGazebo: "Pretium Tabernaculi Rent",
    billGuide: "Ducis Auxilium Solutum",
    billFood: "Cibi Gustandi Sumptus",
    billTotal: "SUMMA TOTIUS BUDGET",
    billTip: "Monitio Sapiens: Porta vestimenta arida ad mutandum, calceos ad trekking aptos ne labaris, ac pecuniam numeratam para, quoniam signa telephonica in imis faucibus silvae interdum deficiunt.",

    budayaBadge: "NOTIO SOCIALIS TONSEAE",
    budayaTitle: "Dulcissimus Custard Cocorum & Prisca Sodalis Fides",
    budayaSubtitle: "Pete radices cultus Sulawesi Septentrionalis. Gusta placide crustula dulcia Batave tradita, ius vegetabile salubre, et vide splendorem Mapalus caritatis vici nostri.",
    filterAll: "Monstra Omnia",
    filterCuisine: "Culinaris Ars",
    filterCulture: "Ritus & Fides Advena",
    tipBadge: "Aestimandis Gustandi Modus",
    klapDesc: "Nobilis crustula 'Klappertaart' e lacte, ovis, cynnamomo, nucleisque dactyli teneri, more Batavorum antiquo pistum.",
    klapTips: "Gelidissimum ex frigidario sumere oportet ut sentias mollitiam placentae quasi in ore liquescentis.",
    klapTags: ["Dulcis Sapor", "Batavica Elegantia", "Dona Memorabilia Optima"],
    tinuDesc: "Wholesome 'Tinutuan' ius e cucurbita, oryza, batata, cannis, ac folia gedi viridissima coctum.",
    tinuTips: "Adde acidum limonis, thynnum fumatum cum pipere, et liquamen traditionalem e sambal roa.",
    tinuTags: ["Sapor Salsus & Sanus", "Summa Fibra", "Cibus Matutinus Solubilis"],
    nasiDesc: "Oryza lutea croca wrapped in Woka frondibus in formam cylindri longa, data cum thynno ac vermiculis frixis.",
    nasiTips: "Cave ne calefacias in plastico; vapore fovens cum fronde Woka odorem ligni in silva profundae optimo modo emittit.",
    nasiTags: ["Saporis Copia", "Naturae Fragrantia", "Ars Textilis Manuum"],
    kolinDesc: "Musica lignea 'Kolintang' e raris arboribus lectis caelata, quae harmoniam dulcissimam canit.",
    kolinTips: "Saepe in solemnibus spectaculis festorum, in ecclesiis Talawaan canendo, ac in conviviis nuptiarum Tonseae percutitur.",
    kolinTags: ["Ligneum Xylophone", "Hereditas Nationalis", "Cantus Populi Sodalis"],
    mapaDesc: "Anima communitatis 'Mapalus'—auxilium mutuum ac commune—qua cives se invicem sine pecunia defendunt.",
    mapaTips: "Non est solum labor gratuitus, sed officium morale ac sociale, quod pacem ac victum omnibus familiis in vico spondet.",
    mapaTags: ["Mutua Fides", "Valor Socialis", "Patrium Sollemne Custodia"],
    kitchenBadge: "MAPALUS IN PENU COCORUM",
    kitchenTitle: "Ubi Cibus Ex Coquinis Communibus Redditur Amico",
    kitchenDesc: "In pago Talawaan, epulae sollemnes nunquam ab uno homine parantur. Cum nuptiae Tonseenses celebrantur, matres simul colligunt frondes Woka pro oryza lutea, patres ligna cremant pro fumo fimo, dum iuvenes tinutuan maximum in lebetibus coquunt. Haec est Mapalus spiritualis cibus pariter et pacis custodia.",

    aiBadge: "GEMINI DUPLICATA CUSTODIA",
    aiTitle: "Alloquere AI Monam - Virtualem Fautricem",
    aiSubtitle: "Inquire de itineribus, pretiis, cibis localibus vel aliis rebus vici ad oecologiam pertinentibus.",
    aiConsoleTitle: "Mona - Auxilium Online",
    aiStatus: "CUSTOS IMPIGER • SI QUIRITAS PARATA",
    aiGreeting: "Shalom! Salve amice advena! Ego sum Mona, machina virtualis AI ac custos officialis vici Talawaan.\n\nQuid tibi hodie afferam? Roga me de Tunan cataractae pretio (solum X Milibus Rp), more legendarii chiri, aut Mapalus consuetudine antiquissima.",
    aiReplyErrorFallback: "Ignosce mihi, hanc rem tam subtilem nondum in memoria mea bene ordinatam habeo.",
    aiApiErrorFallback: "Folia silvae forte interceperunt undas aetherias. Quaeso, rursus post paululum roga Monam!",
    aiInputPlaceholder: "Scribe hic quod vis scire de Talawaan...",
    sugChips: [
      "Quid constat tessera ad Cataractam Tunan?",
      "Qui cibi sunt optimi in pago Talawaan?",
      "Ubi est locus exactus in tabulis geographicis?",
      "Explica mihi Mapalus morem patriis",
    ],

    quizBadge: "LUDUM TRIVIA TALAWAAN",
    quizTitle: "Trivia Pagi Talawaan",
    quizSubtitle: "Quaestio",
    quizQuestionIndicator: "ex",
    quizWawasan: "Explicatio Historica",
    quizVerifyBtn: "Mitte Responsum",
    quizNextBtn: "Quaestio Proxima",
    quizFinishedBtn: "Vide Calculum Probati",
    quizScoreBadge: "RATIONES ACQUISITAE",
    quizFinishedTitle: "Probatio Pagi Finita Est!",
    quizPoinLabel: "Puncta Recta",
    quizRankLabel: "Gradus Scientiae Patriae",
    quizCongrat: "Optime! Per hunc ludum omnes ritus, monumenta naturae, ac cibos vici Talawaan egregie didicisti.",
    quizRestartBtn: "Rursus Experire",
    quizRankHukumTua: "Honestus Hukum Tua (Caput Vici Nobilitatus) 👑",
    quizRankKawanua: "Verissimus Kawanua Localis ✨",
    quizRankExplorer: "Sodalis Investigator Audentior 🎒",
    quizRankTourist: "Viator Rudis Advena 🚶",
    quizData: [
      {
        question: "Quanta est altitudo suspensa Cataractae Tunan in pago Talawaan?",
        options: ["XXV Metra", "XLV Metra", "LXXXVI Metra", "CXX Metra"],
        explanation: "Cataracta Tunan in summis montibus Sulawesi Septentrionalis circiter LXXXV-LXXXVI metra ex alto emittit aquas frigidissimas.",
      },
      {
        question: "Quo patrio nomine cives Minahasenses caput administrativem sui vici vocant?",
        options: ["Hukum Tua", "Lurah Sipil", "Kepala Jaga", "Sangadi"],
        explanation: "Hukum Tua est titulus honorabilis ac officialis quo praesides vici in concilio Minahasensi appellantur.",
      },
      {
        question: "Qua fronde silvestri involvitur aroma oryzae luteae (Nasi Kuning) Manadensis?",
        options: ["Banana Leaf (Frons Musa)", "Woka Leaf", "Pandan Sawah", "Daun Jati"],
        explanation: "Oryza lutea foliis Woka (palmae silvestris) involvitur, quae odorem silvestrem fragrantissimum calore emittit.",
      },
      {
        question: "Quid revera significat 'Mapalus' consuetudo inter gentes Minahasenses?",
        options: ["Ars Militaris Vetusta", "Saltatio Sacra Communi", "Ordinatum Commune et Auxilium Mutuum", "Ars Contextilis e Cortice"],
        explanation: "Mapalus est ratio socialis ac moralis auxilii mutui in colendis agris, extruendis aedibus, aut ferendis auxiliis in mortis vel laetitiae casu.",
      },
    ],

    footerSlogan: "Página oecologica ac index vici Talawaan, ubi cataractae immanes cum dulci hospitalitate Minahasensi iunguntur.",
    footerTitleTownhall: "PRAESIDIUM DECURIONUM LOCI",
    footerTitleHours: "HORAE ADITU PUBLICO",
    footerHoursDays: "Dies Lunae - Dies Veneris",
    footerHoursTimings: "VIII:00 AM - III:30 PM (Zona Horaria / GMT+8)",
    footerHoursNote: "* Si chartas signandas habes vel sigillum officiale requiritur, commendamus tabulas et KTP copias mane secum portare ad tabularium.",
  },
};
