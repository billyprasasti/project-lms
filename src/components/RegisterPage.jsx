import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import GoogleButton from "./GoogleButton";
import { Field, PasswordField } from "./Field";
import { btnPrimary, btnSecondary, inputCls } from "./ui";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      <main className="flex min-h-[calc(100vh-69px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px] rounded-[22px] border border-line bg-white px-[22px] py-[30px] shadow-card sm:px-9 sm:pb-9 sm:pt-10">
          <h1 className="mb-1.5 font-head text-[26px] font-semibold">Pendaftaran Akun</h1>
          <p className="mb-7 text-[14.5px] text-inkSoft">Yuk, daftarkan akunmu sekarang juga!</p>

          <form onSubmit={handleSubmit}>
            <Field id="name" label="Nama Lengkap" required type="text" placeholder="Masukkan nama lengkap"
              value={form.name} onChange={handleChange} />
            <Field id="email" label="E-Mail" required type="email" placeholder="nama@email.com"
              value={form.email} onChange={handleChange} />

            <div className="mb-[18px]">
              <label htmlFor="phone" className="mb-1.5 block text-[13.5px] font-semibold">
                No. Hp<span className="ml-0.5 text-red">*</span>
              </label>
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <span className="flex h-[46px] flex-none items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-sm text-inkSoft">
                  <span className="flag-id h-[13px] w-[18px] flex-none rounded-sm" /> +62
                </span>
                <input id="phone" name="phone" type="tel" required placeholder="8xxxxxxxxx"
                  value={form.phone} onChange={handleChange}
                  className={`${inputCls} flex-1 border-line focus:border-green`} />
              </div>
            </div>

            <PasswordField id="password" label="Kata Sandi" placeholder="Buat kata sandi"
              value={form.password} onChange={handleChange} />
            <PasswordField id="confirm" label="Konfirmasi Kata Sandi" placeholder="Ulangi kata sandi"
              value={form.confirm} onChange={handleChange} />

            <button type="submit" className={btnPrimary}>Daftar</button>
            <Link to="/login" className={`${btnSecondary} mt-3`}>Masuk</Link>

            <div className="my-[22px] mb-[18px] flex items-center gap-3.5 text-[13px] text-inkSoft before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
              atau
            </div>

            <GoogleButton label="Daftar dengan Google" />
          </form>
        </div>
      </main>
    </>
  );
}
