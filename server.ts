import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure Gemini Client is initialized safely if key is available
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY" && API_KEY.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Google GenAI client successfully initialized.");
  } catch (err) {
    console.error("Error initializing Google GenAI client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Utilizing intelligent local KB fallback.");
}

const TALWAAN_KNOWLEDGE_BASE = `
Anda adalah "Mona", asisten virtual AI interaktif resmi untuk Desa Talawaan, Kabupaten Minahasa Utara, Sulawesi Utara.
Tugas Anda adalah membagikan keindahan, potensi, kebudayaan, kuliner, dan layanan publik Desa Talawaan dengan ramah, informatif, dan mengagumkan.

ATURAN SANGAT KETAT: Anda HANYA diizinkan menjawab pertanyaan yang berkaitan langsung dengan Desa Talawaan dan Air Terjun Tunan (termasuk wisata, sejarah, budaya, kuliner khas, adat, lokasi/peta, paket wisata, dan layanan administrasi desa Talawaan). Jika pengguna bertanya di luar topik ini (misalnya matematika umum, coding, sejarah dunia lain, sains umum, negara lain, sepak bola umum, dll), Anda HARUS menolak dengan sopan dalam bahasa Indonesia: "Maaf, sebagai asisten virtual Mona, saya diprogram khusus hanya untuk menjawab pertanyaan terkait Air Terjun Tunan dan informasi seputar Desa Talawaan. Silakan tanyakan hal-hal yang berkaitan dengan topik tersebut." secara konsisten.

Fakta Kunci Penting tentang Talawaan:
1. Lokasi & Akses:
   - Terletak di Kecamatan Talawaan, Kabupaten Minahasa Utara, Sulawesi Utara.
   - Sangat dekat dengan Bandara Internasional Sam Ratulangi Manado (sebagian areanya berbatasan langsung atau masuk wilayah Kecamatan Talawaan).
   - Berselang sekitar 30-40 menit berkendara dari pusat kota Manado.

2. Destinasi Wisata Utama:
   - Air Terjun Tunan (Tunan Waterfall): Air terjun megah berketinggian sekitar 85-86 meter. Airnya sangat dingin, bersih, dan segar, dikelilingi hutan tropis yang rimbun dan asri. Fasilitas lengkap: gazebo pelesir, toilet, jalur setapak beton yang nyaman, dan spot foto epik. Tiket masuk sangat terjangkau, yaitu Rp 10.000 per orang.
   - Agro-wisata Kelapa & Kopra: Pengunjung bisa melihat langsung pembuatan kopra kelapa tradisional Minahasa.
   - Lingkungan Hijau: Hamparan sawah berundak yang indah, aliran sungai jernih, dan petualangan trekking alam.

3. Kebudayaan & Tradisi:
   - Mapalus: Filsafat gotong royong khas suku Minahasa yang dipegang teguh oleh masyarakat Talawaan.
   - Alat Musik Kolintang: Alat musik perkusi kayu tradisional Minahasa yang suaranya sangat merdu dan sering dimainkan di acara adat.

4. Kuliner Khas Minahasa:
   - Tinutuan (Bubur Manado): Bubur labu/beras dicampur sayur-mayur segar, disajikan panas dengan sambal dabu-dabu atau sambal roa.
   - Klappertaart: Kue tart kustar kelapa muda panggang manis beraroma kayu manis dengan taburan kismis dan almond, peninggalan pengaruh kolonial Belanda yang legendaris.
   - Nasi Kuning wrapped in Woka: Nasi kuning gurih khas Manado yang dibungkus dengan daun woka (sejenis palem hutan) yang memberi aroma wangi yang khas, ditaburi suwiran ikan cakalang pedas.

5. Pemerintahan & Administratif:
   - Kepala Desa di Minahasa dipanggil dengan istilah "Hukum Tua".
   - Layanan administrasi mandiri di portal kami mencakup permohonan Surat Keterangan Domisili, Surat Pengantar Nikah, dan Surat Keterangan Usaha (SKU) secara langsung secara digital.

6. Paket Wisata Resmi Desa Talawaan:
   Kami menyediakan 4 pilihan paket wisata premium yang bisa dipesan langsung di situs:
   - Paket Petualangan Air Terjun Tunan (Rp 75.000 / orang): Hutan trekking, aman berenang di bawah air terjun 86m, pemandu lokal, makan siang masakan khas di tepi sungai, dan kelapa muda petik segar.
   - Paket Edukasi Gula Aren & Cap Tikus (Rp 120.000 / orang): Demonstrasi manjat pohon aren memanen nira manis, cara cetak gula merah batangan murni, melihat penyulingan minuman Cap Tikus Minahasa, & oleh-oleh botol sirup gula kelapa murni.
   - Paket Harmoni Kolintang & Seni Tari (Rp 150.000 / orang): Menyaksikan live orchestra musik perkusi kayu kolintang, kelas privat notasi tangga nada kolintang dipandu musisi desa, berfoto dengan pakaian adat lengkap, & kue dadih kelapa Klappertaart panggang belanda yang lezat.
   - Paket Live-in Homestay Kawanua (Rp 350.000 / malam): Menginap santai di rumah panggung adat kayu Minahasa, diajarkan resep makanan tradisional langsung, keliling desa naik sepeda gunung sejuk di pagi hari, & sarapan istimewa Nasi Kuning Daun Woka harum.
`;

// Helper for local rule-based fallback responses
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("paket") || q.includes("tour") || q.includes("packages") || q.includes("pesan") || q.includes("booking")) {
    return "Desa Wisata Talawaan menyediakan **4 Pilihan Paket Wisata Resmi** yang siap dipesan langsung secara digital:\n\n" +
      "1. 🌲 **Paket Tunan Adventure (Rp 75.000/Pax):** Sudah termasuk tiket masuk air terjun 86m, pelampung safety, pemandu lokal, makan siang Tinutuan di saung sungai, & kelapa muda utuh.\n" +
      "2. 🍯 **Paket Gula Aren & Cap Tikus (Rp 120.000/Pax):** Belajar memanen nira/saguer asli, mencetak gula merah aren tempurung kelapa, & melihat proses channelling uap Cap Tikus.\n" +
      "3. 🎵 **Paket Harmoni Kolintang (Rp 150.000/Pax):** VIP concert musik kayu kolintang live, latihan memukul melodi bersama maestro, foto pakaian adat Minahasa, & camilan Klappertaart panggang buatan rumah.\n" +
      "4. 🏡 **Paket Live-in Homestay (Rp 350.000/Malam):** Pengalaman 2 Hari 1 Malam menginap di rumah panggung khas Minahasa, kelas memasak rahasia, sarapan Nasi Kuning Woka harian.\n\n" +
      "Anda dapat memilih tab **'Paket Wisata'** pada bilah menu di atas untuk menghitung rancangan anggaran secara cermat berbasis jumlah orang dan menerbitkan Boarding Pass tiket digital resmi Anda!";
  }
  
  if (q.includes("halo") || q.includes("hi ") || q.includes("hello") || q.includes("selamat") || q.includes("siapa")) {
    return "Syalom! Halo Kawanua dan pengunjung setia! Saya **Mona**, asisten virtual interaktif Desa Talawaan. Senang sekali bisa menyambut Anda! Ada yang bisa saya bantu terkait profil desa, destinasi wisata eksotis seperti Air Terjun Tunan, kuliner legendaris, atau urusan layanan administrasi desa?";
  }
  
  if (q.includes("tunan") || q.includes("air terjun") || q.includes("wisata") || q.includes("waterfall")) {
    return "Air Terjun Tunan adalah mutiara wisata tersembunyi di Desa Talawaan! Berketinggian kurang lebih 85-86 meter, air terjun ini menawarkan pancaran air jernih yang dikelilingi belantara rimbun nan sejuk.\n\n✨ **Fakta Penting Wisata Tunan:**\n- **Tiket Masuk:** Rp 10.000 saja per orang.\n- **Fasilitas:** Jalur setapak beton yang aman, gazebo santai, toilet umum, jembatan pandang, dan warung lokal.\n- **Akses:** Berjarak sekitar 25 km dari Manado (sekitar 40 menit perjalanan mobil/motor). Sangat direkomendasikan untuk berenang tipis-tipis atau berfoto bernuansa petualangan alam murni!";
  }
  
  if (q.includes("makan") || q.includes("kuliner") || q.includes("klapper") || q.includes("tinutuan") || q.includes("resep") || q.includes("khas")) {
    return "Wah, mencicipi kuliner khas adalah kewajiban di Talawaan! Berikut yang wajib Anda coba:\n\n1. **Tinutuan (Bubur Manado):** Bubur sehat kaya sayur, labu kuning, jagung, dan disajikan hangat bersama dabu-dabu roa.\n2. **Klappertaart Talawaan:** Kustar lembut berbahan susu, kuning telur, dan kelapa muda murni dengan wangi rum serta kayu manis.\n3. **Nasi Kuning Daun Woka:** Nasi kuning beraroma khas woka dengan lauk cakalang fufu rabe-rabe dan soun goreng.\n\nSemuanya diproses dari bahan segar perkebunan dan laut Sulawesi Utara!";
  }

  if (q.includes("lokasi") || q.includes("peta") || q.includes("akses") || q.includes("bandara") || q.includes("manado") || q.includes("dimana") || q.includes("di mana")) {
    return "Desa Talawaan terletak di Kecamatan Talawaan, Kabupaten Minahasa Utara, Sulawesi Utara.\n\n✈️ **Keunggulan Geografis:**\n- Hanya berselang sekitar 15-20 menit berkendara dari Bandara Internasional Sam Ratulangi Manado.\n- Sekitar 30-40 menit dari pusat kota Manado.\n- Merupakan gerbang alam yang subur di kaki bukit Minahasa Utara, dikelilingi kebun kelapa hijau yang luas.";
  }

  if (q.includes("surat") || q.includes("layanan") || q.includes("administrasi") || q.includes("domisili") || q.includes("nikah") || q.includes("usaha")) {
    return "Untuk mempermudah administrasi masyarakat, kami menyediakan fitur **Layanan Mandiri** di situs ini! Anda dapat menuju ke tab **'Layanan Desa'** di mana Anda dapat mengisi formulir Surat Keterangan Domisili, Surat Pengantar Nikah, atau Surat Keterangan Usaha (SKU). Sistem kami akan langsung menghasilkan draf surat resmi ber-kop desa lengkap dengan QR Code validasi yang siap diunduh dan dicetak.";
  }

  if (q.includes("budaya") || q.includes("kolintang") || q.includes("mapalus") || q.includes("sejarah")) {
    return "Kebudayaan Desa Talawaan sangat kental dengan nilai kekeluargaan suku Minahasa:\n\n- **Falsafah Mapalus:** Budaya tolong-menolong secara gotong-royong aktif dalam bertani, membangun rumah, maupun upacara kekeluargaan.\n- **Kolintang:** Instrumen musik perkusi kayu yang sangat populer di Talawaan. Musik kolintang mengalun merdu untuk mengisi pesta rakyat, penyambutan tamu, maupun ibadah gereja.";
  }

  return "Terima kasih atas pertanyaannya! Desa Talawaan memiliki pesona alam luar biasa seperti Air Terjun Tunan berketinggian 85 meter dengan harga tiket Rp 10.000, kuliner khas Tinutuan & Klappertaart, serta tradisi adat Mapalus yang kental. \n\nAda aspek khusus yang ingin Anda ketahui lebih dalam tentang desa kami, misalnya rute transportasi, fasilitas gazebo, atau simulasi urat menyurat desa?";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe env inspect endpoint
  app.get("/api/debug-env", (req, res) => {
    const keys = Object.keys(process.env);
    const googleKeys = keys.filter(k => k.toLowerCase().includes("google") || k.toLowerCase().includes("oauth") || k.toLowerCase().includes("client") || k.toLowerCase().includes("project"));
    res.json({
      googleKeys,
      NODE_ENV: process.env.NODE_ENV,
      APP_URL: process.env.APP_URL,
      PORT: process.env.PORT,
      hasClientId: !!(process.env.GOOGLE_CLIENT_ID || process.env.OAUTH_CLIENT_ID || process.env.CLIENT_ID),
      hasClientSecret: !!(process.env.GOOGLE_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET || process.env.CLIENT_SECRET || process.env.client_secret)
    });
  });

  // API endpoint for Chatbot Assistant using Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Pesan tidak boleh kosong" });
      }

      // Check if the query is related to Air Terjun Tunan or Desa Talawaan
      const q = message.toLowerCase();
      const allowedKeywords = [
        "tunan", "talawaan", "air", "terjun", "waterfall", "cascade",
        "desa", "village", "kampung", "kecamatan", "minahasa", "kawanua",
        "wisata", "tour", "paket", "booking", "pesan", "reservasi", "tiket", "tarif", "harga", "biaya",
        "kuliner", "makan", "minum", "resep", "khas", "tinutuan", "klapper", "woka", "nasi kuning", "saguer", "cap tikus", "gula", "aren",
        "lokasi", "peta", "map", "akses", "bandara", "manado", "dimana", "di mana", "rute", "alamat", "sulawesi",
        "surat", "layanan", "administrasi", "domisili", "nikah", "usaha", "sku", "hukum tua",
        "budaya", "kolintang", "mapalus", "sejarah", "tari", "kabasaran", "adat", "tradisi",
        "halo", "hi", "hello", "selamat", "siapa", "mona", "kabar", "pagi", "siang", "sore", "malam", "syalom", "tanya", "ask"
      ];

      const isAllowed = allowedKeywords.some(keyword => q.includes(keyword));
      if (!isAllowed) {
        return res.json({ 
          reply: "Maaf, sebagai asisten virtual Mona, saya diprogram khusus hanya untuk menjawab pertanyaan terkait Air Terjun Tunan dan informasi seputar Desa Talawaan (wisata, kuliner, budaya, paket wisata, dan administrasi desa). Silakan tanyakan hal-hal yang berkaitan dengan topik tersebut!" 
        });
      }

      // If we have an active Gemini client, use it
      if (ai) {
        try {
          const contents: any[] = [];
          
          // Reconstruct simple chat history for Gemini if present
          if (history && Array.isArray(history)) {
            history.forEach((chatEntry: any) => {
              contents.push({
                role: chatEntry.role === "assistant" ? "model" : "user",
                parts: [{ text: chatEntry.content }],
              });
            });
          }
          
          // Append current user message
          contents.push({
            role: "user",
            parts: [{ text: message }],
          });

          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
              systemInstruction: TALWAAN_KNOWLEDGE_BASE,
              temperature: 0.7,
            },
          });

          const replyText = response.text || "Mohon maaf, terjadi kendala saat merumuskan tanggapan.";
          return res.json({ reply: replyText });
        } catch (geminiErr: any) {
          console.error("Gemini API call failed, falling back to local chat:", geminiErr);
          const fallbackText = getLocalFallbackResponse(message);
          return res.json({ 
            reply: fallbackText,
            note: "Menggunakan KB lokal cerdas karena kendala API." 
          });
        }
      } else {
        // Fallback option directly
        const fallbackText = getLocalFallbackResponse(message);
        return res.json({ reply: fallbackText });
      }
    } catch (err: any) {
      console.error("Endpoint general failure:", err);
      res.status(500).json({ error: "Terjadi kesalahan internal pada server kami." });
    }
  });

  // Serve static assets or mount Vite server depending on environment
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files from ${distPath} in production mode.`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://0.0.0.0:${PORT}`);
  });
}

startServer();
