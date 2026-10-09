import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Avatar from "./Avatar";

const MENU = [
  ["Profil Saya", "/profil"],
  ["Kelas Saya", "/kelas-saya"],
  ["Pesanan Saya", "/pesanan"],
];

export default function SiteHeader({ profile }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center justify-between px-6">
        <Logo />
        <div className="relative flex items-center gap-5">
          <Link to="/kategori" className="text-sm font-semibold text-green hover:text-greenDark">Kategori</Link>
          <button aria-label="Menu akun" aria-expanded={open} onClick={() => setOpen(!open)}
            className="rounded-full border-0 bg-transparent p-0">
            <Avatar profile={profile} />
          </button>
          {open && (
            <ul className="absolute right-0 top-[54px] m-0 w-44 list-none rounded-lg border border-line bg-white p-1 shadow-pop">
              {MENU.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-[13px] hover:bg-greenPale">{label}</Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="block rounded-md px-3 py-2 text-[13px] text-red hover:bg-red/10">Keluar</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
