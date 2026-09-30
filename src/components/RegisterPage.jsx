import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import GoogleButton from "./GoogleButton";

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Kata sandi dan konfirmasi kata sandi tidak sama.");
      return;
    }
    // TODO: panggil API register di sini
    navigate("/login");
  };

  return (
    <>
      <TopBar />
      <main className="auth-wrap">
        <div className="auth-card">
          <h1>Pendaftaran Akun</h1>
          <p className="auth-sub">Yuk, daftarkan akunmu sekarang juga!</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Nama Lengkap<span className="req">*</span></label>
              <input id="name" name="name" type="text"
                placeholder="Masukkan nama lengkap"
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="email">E-Mail<span className="req">*</span></label>
              <input id="email" name="email" type="email"
                placeholder="nama@email.com"
                value={form.email} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="phone">No. Hp<span className="req">*</span></label>
              <div className="phone-field">
                <span className="phone-flag">
                  <span className="flag"></span> +62
                </span>
                <input id="phone" name="phone" type="tel"
                  placeholder="8xxxxxxxxx"
                  value={form.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="field field-password">
              <label htmlFor="password">Kata Sandi<span className="req">*</span></label>
              <input id="password" name="password"
                type={showPw ? "text" : "password"}
                placeholder="Buat kata sandi"
                value={form.password} onChange={handleChange} required />
              <button type="button" className="toggle-pw"
                aria-label="Tampilkan kata sandi"
                onClick={() => setShowPw(!showPw)}>
                <EyeIcon />
              </button>
            </div>

            <div className="field field-password">
              <label htmlFor="confirm">Konfirmasi Kata Sandi<span className="req">*</span></label>
              <input id="confirm" name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi kata sandi"
                value={form.confirm} onChange={handleChange} required />
              <button type="button" className="toggle-pw"
                aria-label="Tampilkan kata sandi"
                onClick={() => setShowConfirm(!showConfirm)}>
                <EyeIcon />
              </button>
            </div>

            <a href="#" className="forgot-link">Lupa Password?</a>

            <button type="submit" className="btn btn-primary">Daftar</button>
            <Link to="/login" className="btn btn-secondary"
              style={{ textDecoration: "none" }}>Masuk</Link>

            <div className="divider">atau</div>

            <GoogleButton label="Daftar dengan Google" />
          </form>
        </div>
      </main>
    </>
  );
}
