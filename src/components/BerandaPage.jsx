import { useState } from "react";
import { Link } from "react-router-dom";
// import "./beranda-extra.css";

const CATEGORIES = [
  { key: "semua", label: "Semua Kelas" },
  { key: "pemasaran", label: "Pemasaran" },
  { key: "desain", label: "Desain" },
  { key: "pengembangan", label: "Pengembangan Diri" },
  { key: "bisnis", label: "Bisnis" },
];

const COURSES = [
  { id: 1, cat: "bisnis", thumb: "g1", tag: "Bisnis", category: "Big 4 Auditor Financial Analyst", title: "Belajar Analisis Laporan Keuangan dari Nol", desc: "Kuasai teknik audit dan analisis finansial profesional yang langsung terpakai di dunia kerja.", mentor: "Jenna Ortega", rating: "4.9", reviews: "2.3rb", price: "Rp300K" },
  { id: 2, cat: "pemasaran", thumb: "g4", tag: "Pemasaran", category: "Digital Marketing Specialist", title: "Strategi Iklan Digital yang Efektif untuk Bisnis", desc: "Pelajari cara menyusun kampanye iklan digital yang tepat sasaran dan hemat biaya.", mentor: "Raka Pradana", rating: "4.8", reviews: "1.9rb", price: "Rp275K" },
  { id: 3, cat: "desain", thumb: "g3", tag: "Desain", category: "UI/UX Design Fundamental", title: "Merancang Antarmuka yang Mudah Digunakan", desc: "Dari riset pengguna hingga prototipe siap pakai, kuasai proses desain produk digital.", mentor: "Nadin Amizah", rating: "4.9", reviews: "3.1rb", price: "Rp320K" },
  { id: 4, cat: "pengembangan", thumb: "g7", tag: "Pengembangan Diri", category: "Personal Growth Coach", title: "Membangun Kebiasaan Produktif Setiap Hari", desc: "Teknik manajemen waktu dan fokus yang terbukti membantu mencapai target harian.", mentor: "Dimas Anggara", rating: "4.7", reviews: "1.4rb", price: "Rp199K" },
  { id: 5, cat: "bisnis", thumb: "g6", tag: "Bisnis", category: "Business Strategy Analyst", title: "Menyusun Rencana Bisnis yang Siap Investor", desc: "Pelajari kerangka kerja penyusunan business plan yang dipakai startup dan korporasi.", mentor: "Jenna Ortega", rating: "4.8", reviews: "2.0rb", price: "Rp350K" },
  { id: 6, cat: "pemasaran", thumb: "g9", tag: "Pemasaran", category: "Content Marketing Expert", title: "Menulis Konten yang Menjual di Media Sosial", desc: "Bangun strategi konten yang konsisten menarik audiens dan meningkatkan penjualan.", mentor: "Raka Pradana", rating: "4.6", reviews: "980", price: "Rp250K" },
  { id: 7, cat: "desain", thumb: "g5", tag: "Desain", category: "Graphic Design Mastery", title: "Desain Visual untuk Brand yang Konsisten", desc: "Kuasai prinsip warna, tipografi, dan layout untuk membangun identitas brand.", mentor: "Nadin Amizah", rating: "4.9", reviews: "2.7rb", price: "Rp290K" },
  { id: 8, cat: "pengembangan", thumb: "g8", tag: "Pengembangan Diri", category: "Public Speaking Coach", title: "Percaya Diri Berbicara di Depan Umum", desc: "Latihan praktis mengatasi grogi dan menyampaikan ide dengan jelas dan meyakinkan.", mentor: "Dimas Anggara", rating: "4.7", reviews: "1.6rb", price: "Rp225K" },
  { id: 9, cat: "bisnis", thumb: "g2", tag: "Bisnis", category: "Financial Planning Advisor", title: "Kelola Keuangan Bisnis Kecil dengan Tepat", desc: "Panduan praktis mengatur arus kas, anggaran, dan laporan keuangan sederhana.", mentor: "Jenna Ortega", rating: "4.8", reviews: "1.1rb", price: "Rp300K" },
];

function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className={`course-thumb ${course.thumb}`}>
        <span className="tag">{course.tag}</span>
      </div>
      <div className="course-body">
        <div className="course-cat">{course.category}</div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.desc}</p>
        <div className="course-mentor">
          <span className="mentor-dot"></span>
          <span className="mentor-name">{course.mentor}</span>
        </div>
        <div className="course-foot">
          <span className="course-rating">★ <strong>{course.rating}</strong> ({course.reviews})</span>
          <span className="course-price">{course.price}</span>
        </div>
      </div>
    </article>
  );
}

export default function BerandaPage() {
  const [activeCat, setActiveCat] = useState("semua");
  const [email, setEmail] = useState("");

  const filtered =
    activeCat === "semua"
      ? COURSES
      : COURSES.filter((c) => c.cat === activeCat);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Terima kasih! Kamu akan menerima newsletter dari videobelajar.");
    setEmail("");
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="container">
          <Link to="/beranda" className="logo">
            <span className="video">video</span>
            <span className="belajar">belajar</span>
          </Link>
          <button className="avatar-btn" aria-label="Profil saya">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <span className="hero-eyebrow">Platform video pembelajaran</span>
            <h1>Revolusi pembelajaran: temukan ilmu baru melalui video interaktif</h1>
            <p>
              Temukan ilmu baru yang menarik dari mentor terbaik di industrinya.
              Belajar kapan saja, di mana saja, dengan video yang dirancang untuk
              cara belajar yang lebih efektif.
            </p>
            <a href="#courses" className="btn btn-primary" style={{ display: "inline-flex" }}>
              Temukan Video untuk Dipelajari
            </a>
          </div>
        </section>

        {/* Courses */}
        <section className="section" id="courses">
          <div className="section-head">
            <h2>Koleksi video pembelajaran unggulan</h2>
            <p>Jelajahi kelas pembelajaran pilihan kami</p>
          </div>

          <nav className="cat-nav">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`cat-btn ${activeCat === c.key ? "active" : ""}`}
                onClick={() => setActiveCat(c.key)}
              >
                {c.label}
              </button>
            ))}
          </nav>

          <div className="course-grid">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <div className="newsletter-inner">
            <h2>Mau belajar lebih banyak?</h2>
            <p>Daftarkan dirimu mendapatkan informasi terbaru seputar update kelas terbaru dari videobelajar.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Masukkan email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Berlangganan</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/beranda" className="logo">
              <span className="video">video</span>
              <span className="belajar">belajar</span>
            </Link>
            <p>Gali potensi anda melalui pembelajaran video di videobelajar.id. Belajar kapan saja, di mana saja bersama mentor terbaik di bidangnya.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 4.5c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4c-.9.5-1.8.9-2.8 1a4.3 4.3 0 0 0-7.3 3.9A12 12 0 0 1 3.7 3.5a4.3 4.3 0 0 0 1.3 5.7c-.7 0-1.4-.2-2-.5v.1a4.3 4.3 0 0 0 3.4 4.2c-.6.2-1.3.2-2 .1a4.3 4.3 0 0 0 4 3A8.6 8.6 0 0 1 2 17.9 12.1 12.1 0 0 0 8.6 20c7.9 0 12.2-6.6 12.2-12.2v-.6c.8-.6 1.6-1.3 2.2-2.2z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Kategori</h3>
            <ul>
              <li><a href="#">Digital &amp; Teknologi</a></li>
              <li><a href="#">Pemasaran</a></li>
              <li><a href="#">Manajemen Bisnis</a></li>
              <li><a href="#">Pengembangan Diri</a></li>
              <li><a href="#">Desain</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Perusahaan</h3>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Ketentuan Layanan</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Kontak Kami</h3>
            
            <ul>
              <li><a href="#">Hubungi Kami</a></li>
              <li><a href="#">Karier</a></li>
              <li><a href="#">Media &amp; Press</a></li>
              <li><a href="#">Partner</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 videobelajar. Semua hak dilindungi.</p>
        </div>
      </footer>
    </>
  );
}

