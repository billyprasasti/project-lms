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

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: panggil API login di sini
    navigate("/beranda");
  };

  return (
    <>
      <TopBar />
      <main className="auth-wrap">
        <div className="auth-card">
          <h1>Masuk ke Akun</h1>
          <p className="auth-sub">Yuk, lanjutin belajarmu di videobelajar.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">E-Mail<span className="req">*</span></label>
              <input id="email" name="email" type="email"
                placeholder="nama@email.com"
                value={form.email} onChange={handleChange} required />
            </div>

            <div className="field field-password">
              <label htmlFor="password">Kata Sandi<span className="req">*</span></label>
              <input id="password" name="password"
                type={showPw ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={form.password} onChange={handleChange} required />
              <button type="button" className="toggle-pw"
                aria-label="Tampilkan kata sandi"
                onClick={() => setShowPw(!showPw)}>
                <EyeIcon />
              </button>
            </div>

            <a href="#" className="forgot-link">Lupa Password?</a>

            <button type="submit" className="btn btn-primary">Masuk</button>
            <Link to="/register" className="btn btn-secondary"
              style={{ textDecoration: "none" }}>Daftar</Link>

            <div className="divider">atau</div>

            <GoogleButton label="Masuk dengan Google" />
          </form>
        </div>
      </main>
    </>
  );
}
