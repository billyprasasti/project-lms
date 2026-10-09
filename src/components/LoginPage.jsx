import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import GoogleButton from "./GoogleButton";
import { Field, PasswordField } from "./Field";
import { btnPrimary, btnSecondary } from "./ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: panggil API login di sini
    navigate("/beranda");
  };

  return (
    <>
      <TopBar />
      <main className="flex min-h-[calc(100vh-69px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px] rounded-[22px] border border-line bg-white px-[22px] py-[30px] shadow-card sm:px-9 sm:pb-9 sm:pt-10">
          <h1 className="mb-1.5 font-head text-[26px] font-semibold">Masuk ke Akun</h1>
          <p className="mb-7 text-[14.5px] text-inkSoft">Yuk, lanjutin belajarmu di videobelajar.</p>

          <form onSubmit={handleSubmit}>
            <Field id="email" label="E-Mail" required type="email" placeholder="nama@email.com"
              value={form.email} onChange={handleChange} />
            <PasswordField id="password" label="Kata Sandi" placeholder="Masukkan kata sandi"
              value={form.password} onChange={handleChange} />

            <a href="#top" className="-mt-1.5 mb-5 block text-right text-[13.5px] text-inkSoft hover:text-greenDark hover:underline">
              Lupa Password?
            </a>

            <button type="submit" className={btnPrimary}>Masuk</button>
            <Link to="/register" className={`${btnSecondary} mt-3`}>Daftar</Link>

            <div className="my-[22px] mb-[18px] flex items-center gap-3.5 text-[13px] text-inkSoft before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
              atau
            </div>

            <GoogleButton label="Masuk dengan Google" />
          </form>
        </div>
      </main>
    </>
  );
}
