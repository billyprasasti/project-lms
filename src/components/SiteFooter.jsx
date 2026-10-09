import { Link } from "react-router-dom";
import Logo from "./Logo";

const cols = [
  { title: "Kategori", links: ["Digital & Teknologi", "Pemasaran", "Manajemen Bisnis", "Pengembangan Diri", "Desain"] },
  { title: "Perusahaan", links: ["Tentang Kami", "FAQ", "Kebijakan Privasi", "Ketentuan Layanan"] },
  { title: "Komunitas", links: ["Tips Sukses", "Blog", "Karier", "Partner"] },
];

const socials = [
  { label: "Instagram", d: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></> },
  { label: "Facebook", d: <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" /> },
  { label: "Twitter", d: <path d="M23 4.5c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4c-.9.5-1.8.9-2.8 1a4.3 4.3 0 0 0-7.3 3.9A12 12 0 0 1 3.7 3.5a4.3 4.3 0 0 0 1.3 5.7c-.7 0-1.4-.2-2-.5v.1a4.3 4.3 0 0 0 3.4 4.2c-.6.2-1.3.2-2 .1a4.3 4.3 0 0 0 4 3A8.6 8.6 0 0 1 2 17.9 12.1 12.1 0 0 0 8.6 20c7.9 0 12.2-6.6 12.2-12.2v-.6c.8-.6 1.6-1.3 2.2-2.2z" /> },
];

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-creamDeep">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 pb-8 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mb-1 mt-3.5 max-w-[280px] text-sm font-semibold leading-relaxed text-ink">
            Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
          </p>
          <p className="text-[13.5px] leading-relaxed text-inkSoft">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p className="text-[13.5px] text-inkSoft">+62-877-7123-1234</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-[13.5px] font-semibold">{col.title}</h3>
            <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
              {col.links.map((l) => (
                <li key={l}>
                  {col.title === "Kategori"
                    ? <Link to="/kategori" className="text-[13.5px] text-inkSoft hover:text-greenDark">{l}</Link>
                    : <a href="#top" className="text-[13.5px] text-inkSoft hover:text-greenDark">{l}</a>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-3 border-t border-line px-6 py-[18px] text-[12.5px] text-inkSoft sm:flex-row">
        <p className="m-0">@2023 Gerobak Sayur All Rights Reserved.</p>
        <div className="flex gap-2.5">
          {socials.map((s) => (
            <a key={s.label} href="#top" aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-inkSoft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">{s.d}</svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
