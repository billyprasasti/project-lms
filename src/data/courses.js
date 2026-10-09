export const CATEGORIES = [
  { key: "pemasaran", label: "Pemasaran" },
  { key: "digital", label: "Digital & Teknologi" },
  { key: "pengembangan", label: "Pengembangan Diri" },
  { key: "bisnis", label: "Manajemen Bisnis" },
  { key: "desain", label: "Desain" },
];

export const catLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label ?? key;

// Gradasi thumbnail per kategori (class Tailwind ditulis utuh agar ikut ter-generate)
export const THUMBS = {
  bisnis: "from-emerald-500 to-teal-700",
  pemasaran: "from-orange-400 to-rose-500",
  desain: "from-violet-500 to-indigo-600",
  pengembangan: "from-amber-400 to-orange-600",
  digital: "from-sky-400 to-blue-600",
};

export const PRICE_RANGES = [
  { key: "lt250", label: "Di bawah Rp250K", test: (p) => p < 250000 },
  { key: "250-300", label: "Rp250K - Rp300K", test: (p) => p >= 250000 && p <= 300000 },
  { key: "gt300", label: "Di atas Rp300K", test: (p) => p > 300000 },
];

export const DURATION_RANGES = [
  { key: "lt4", label: "Kurang dari 4 Jam", test: (d) => d < 4 },
  { key: "4-8", label: "4 - 8 Jam", test: (d) => d >= 4 && d <= 8 },
  { key: "gt8", label: "Lebih dari 8 Jam", test: (d) => d > 8 },
];

export const SORTS = [
  { key: "harga-rendah", label: "Harga Rendah", fn: (a, b) => a.price - b.price },
  { key: "harga-tinggi", label: "Harga Tinggi", fn: (a, b) => b.price - a.price },
  { key: "az", label: "A to Z", fn: (a, b) => a.title.localeCompare(b.title) },
  { key: "za", label: "Z to A", fn: (a, b) => b.title.localeCompare(a.title) },
  { key: "rating-tinggi", label: "Rating Tertinggi", fn: (a, b) => b.rating - a.rating },
  { key: "rating-rendah", label: "Rating Terendah", fn: (a, b) => a.rating - b.rating },
];

export const formatPrice = (n) =>
  n >= 1000 ? `Rp${Math.round(n / 1000)}K` : `Rp${n}`;

export const INITIAL_COURSES = [
  { id: 1, cat: "bisnis", category: "Big 4 Auditor Financial Analyst", title: "Belajar Analisis Laporan Keuangan dari Nol", desc: "Kuasai teknik audit dan analisis finansial profesional yang langsung terpakai di dunia kerja.", mentor: "Jenna Ortega", role: "Senior Accountant", company: "Gojek", rating: 4.9, reviews: "2.3rb", price: 300000, duration: 6 },
  { id: 2, cat: "pemasaran", category: "Digital Marketing Specialist", title: "Strategi Iklan Digital yang Efektif untuk Bisnis", desc: "Pelajari cara menyusun kampanye iklan digital yang tepat sasaran dan hemat biaya.", mentor: "Raka Pradana", role: "Marketing Lead", company: "Tokopedia", rating: 4.8, reviews: "1.9rb", price: 275000, duration: 5 },
  { id: 3, cat: "desain", category: "UI/UX Design Fundamental", title: "Merancang Antarmuka yang Mudah Digunakan", desc: "Dari riset pengguna hingga prototipe siap pakai, kuasai proses desain produk digital.", mentor: "Nadin Amizah", role: "Product Designer", company: "Traveloka", rating: 4.9, reviews: "3.1rb", price: 320000, duration: 8 },
  { id: 4, cat: "pengembangan", category: "Personal Growth Coach", title: "Membangun Kebiasaan Produktif Setiap Hari", desc: "Teknik manajemen waktu dan fokus yang terbukti membantu mencapai target harian.", mentor: "Dimas Anggara", role: "Life Coach", company: "Ruangguru", rating: 4.7, reviews: "1.4rb", price: 199000, duration: 3 },
  { id: 5, cat: "bisnis", category: "Business Strategy Analyst", title: "Menyusun Rencana Bisnis yang Siap Investor", desc: "Pelajari kerangka kerja penyusunan business plan yang dipakai startup dan korporasi.", mentor: "Jenna Ortega", role: "Senior Accountant", company: "Gojek", rating: 4.8, reviews: "2.0rb", price: 350000, duration: 9 },
  { id: 6, cat: "pemasaran", category: "Content Marketing Expert", title: "Menulis Konten yang Menjual di Media Sosial", desc: "Bangun strategi konten yang konsisten menarik audiens dan meningkatkan penjualan.", mentor: "Raka Pradana", role: "Marketing Lead", company: "Tokopedia", rating: 4.6, reviews: "980", price: 250000, duration: 4 },
  { id: 7, cat: "desain", category: "Graphic Design Mastery", title: "Desain Visual untuk Brand yang Konsisten", desc: "Kuasai prinsip warna, tipografi, dan layout untuk membangun identitas brand.", mentor: "Nadin Amizah", role: "Product Designer", company: "Traveloka", rating: 4.9, reviews: "2.7rb", price: 290000, duration: 7 },
  { id: 8, cat: "pengembangan", category: "Public Speaking Coach", title: "Percaya Diri Berbicara di Depan Umum", desc: "Latihan praktis mengatasi grogi dan menyampaikan ide dengan jelas dan meyakinkan.", mentor: "Dimas Anggara", role: "Life Coach", company: "Ruangguru", rating: 4.7, reviews: "1.6rb", price: 225000, duration: 2 },
  { id: 9, cat: "bisnis", category: "Financial Planning Advisor", title: "Kelola Keuangan Bisnis Kecil dengan Tepat", desc: "Panduan praktis mengatur arus kas, anggaran, dan laporan keuangan sederhana.", mentor: "Jenna Ortega", role: "Senior Accountant", company: "Gojek", rating: 4.8, reviews: "1.1rb", price: 300000, duration: 6 },
  { id: 10, cat: "digital", category: "Frontend Web Developer", title: "Membangun Website Interaktif dengan React", desc: "Pelajari komponen, state, dan routing untuk membuat aplikasi web modern.", mentor: "Bagas Saputra", role: "Frontend Engineer", company: "Bukalapak", rating: 4.8, reviews: "1.3rb", price: 340000, duration: 10 },
];

export const SECTIONS = [
  {
    id: "s1",
    title: "Introduction to HR",
    items: [
      { id: "p1", type: "pretest", title: "Pre-Test: Introduction to HR", meta: "10 Pertanyaan" },
      { id: "v1", type: "video", title: "Video: Introduction to HR", meta: "12 Menit" },
      { id: "v2", type: "video", title: "Video: Introduction to HR", meta: "12 Menit" },
      { id: "v3", type: "video", title: "Video: Introduction to HR", meta: "12 Menit" },
      { id: "v4", type: "video", title: "Video: Introduction to HR", meta: "12 Menit" },
      { id: "r1", type: "summary", title: "Rangkuman: Introduction to HR", meta: "12 Menit" },
      { id: "q1", type: "quiz", title: "Quiz: Introduction to HR", meta: "10 Pertanyaan" },
    ],
  },
  {
    id: "s2",
    title: "Recruitment Basics",
    items: [
      { id: "v5", type: "video", title: "Video: Recruitment Basics", meta: "15 Menit" },
      { id: "v6", type: "video", title: "Video: Interview Techniques", meta: "10 Menit" },
      { id: "r2", type: "summary", title: "Rangkuman: Recruitment", meta: "8 Menit" },
      { id: "q2", type: "quiz", title: "Quiz: Recruitment", meta: "8 Pertanyaan" },
    ],
  },
];

// Bank soal untuk Pre-Test & Quiz: [pertanyaan, [pilihan], indeksJawabanBenar]
// (kunci jawaban hanya contoh, silakan sesuaikan)
const RAW_QUESTIONS = [
  ["Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat yang mengurangi kepanikan pada user adalah pengertian dari ...", ["Memikirkan tentang default", "Mempertimbangkan page layout berdasarkan suatu tujuan tertentu", "Memastikan bahwa sistem berjalan sesuai dengan apa yang terjadi saat itu juga", "Menciptakan konsistensi dan menggunakan elemen UI umum"], 0],
  ["Tahap pertama dalam proses design thinking adalah ...", ["Prototype", "Empathize", "Test", "Ideate"], 1],
  ["Tujuan utama dari user research adalah ...", ["Mempercantik tampilan", "Memahami kebutuhan dan perilaku pengguna", "Mempercepat loading", "Mengurangi biaya server"], 1],
  ["Wireframe digunakan untuk ...", ["Menentukan warna akhir", "Menggambar kerangka tata letak halaman", "Menguji performa server", "Menulis kode"], 1],
  ["Prinsip konsistensi dalam UI berarti ...", ["Setiap halaman tampil berbeda", "Elemen serupa berperilaku dan tampil serupa", "Menggunakan banyak font", "Menghindari ikon"], 1],
  ["Usability testing dilakukan untuk ...", ["Mengamati pengguna memakai produk", "Menghitung jumlah baris kode", "Memilih nama produk", "Menentukan harga"], 0],
  ["Kontras warna yang cukup penting untuk ...", ["Aksesibilitas dan keterbacaan", "Ukuran file", "Kecepatan animasi", "SEO"], 0],
  ["Persona pengguna berfungsi untuk ...", ["Menggantikan riset", "Merepresentasikan kelompok pengguna target", "Membuat logo", "Menentukan teknologi"], 1],
  ["Pesan error yang baik sebaiknya ...", ["Berisi kode teknis saja", "Menjelaskan masalah dan cara memperbaikinya", "Menyalahkan pengguna", "Disembunyikan"], 1],
  ["Prototype interaktif bermanfaat karena ...", ["Dapat diuji sebelum dikembangkan penuh", "Menggantikan developer", "Tidak perlu desain", "Otomatis rilis ke publik"], 0],
];

export const QUESTIONS = RAW_QUESTIONS.map(([text, options, answer], i) => ({
  id: i + 1,
  text,
  options,
  answer,
}));

export const ADMIN_FEE = 7000;
export const formatRupiah = (n) => "Rp " + n.toLocaleString("id-ID");

// Konten halaman detail kelas (dipakai bersama oleh semua kelas)
export const DETAIL = {
  description: [
    "Kelas ini membantumu memahami dasar-dasar materi secara runtut, mulai dari konsep inti, studi kasus nyata, sampai latihan yang bisa langsung dipraktikkan di pekerjaan atau bisnismu.",
    "Setiap modul disusun bersama praktisi industri, dilengkapi video, dokumen ringkasan, pretest, dan ujian akhir. Setelah menyelesaikan seluruh modul, kamu berhak mendapatkan sertifikat.",
  ],
  extraTutor: {
    name: "Gregorius Edrik Lewanta",
    role: "Senior Talent Acquisition Specialist di Wings Group Indonesia",
    bio: "Berkarier di bidang HR selama lebih dari 8 tahun, dengan fokus pada rekrutmen dan pengembangan talenta di berbagai industri.",
  },
  curriculum: [
    { title: "Introduction to Course 2: Foundations of User Experience Design", items: [
      { title: "The basics of user experience design", min: "12 Menit" },
      { title: "Jobs in the field of user experience", min: "12 Menit" },
      { title: "The product development life cycle", min: "12 Menit" },
    ] },
    { title: "Universal design, inclusive design, and equity-focused design", items: [
      { title: "Prinsip desain universal", min: "10 Menit" },
      { title: "Desain inklusif dalam praktik", min: "14 Menit" },
    ] },
    { title: "Introduction to design sprints", items: [
      { title: "Apa itu design sprint", min: "9 Menit" },
      { title: "Tahapan design sprint", min: "15 Menit" },
    ] },
    { title: "Introduction to UX research", items: [
      { title: "Metode riset pengguna", min: "11 Menit" },
      { title: "Menyusun pertanyaan wawancara", min: "13 Menit" },
    ] },
  ],
  reviews: [
    { name: "Gregorius Edrik Lewanta", role: "Alumni Batch 2", rating: 3.5, text: "Materinya runtut dan mudah dipahami. Studi kasusnya relevan, sehingga saya bisa langsung menerapkannya di pekerjaan saya." },
    { name: "Gregorius Edrik Lewanta", role: "Alumni Batch 3", rating: 4, text: "Mentornya komunikatif dan contoh-contohnya nyata. Sertifikatnya juga membantu saat melamar pekerjaan baru." },
  ],
};
