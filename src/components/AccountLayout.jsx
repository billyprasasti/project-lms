import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

const I = (d) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">{d}</svg>;
const NAV = [
  { key: "profil", label: "Profil Saya", to: "/profil", icon: I(<><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></>) },
  { key: "kelas", label: "Kelas Saya", to: "/kelas-saya", icon: I(<><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3Z" /><path d="M5 17a3 3 0 0 1 3-3h11" /></>) },
  { key: "pesanan", label: "Pesanan Saya", to: "/pesanan", icon: I(<><path d="M3 9h18l-2 11H5Z" /><path d="M8 9l3-5M16 9l-3-5" /></>) },
];

export default function AccountLayout({ profile, active, title, subtitle, children }) {
  return (
    <PageLayout profile={profile}>
      <main className="mx-auto grid max-w-[1180px] gap-6 px-6 py-10 lg:grid-cols-[210px_1fr]">
        <div>
          <h1 className="mb-1 font-head text-base font-semibold">{title}</h1>
          <p className="mb-4 text-xs leading-relaxed text-inkSoft">{subtitle}</p>
          <nav aria-label="Menu akun" className="flex flex-col gap-2 rounded-[14px] border border-line bg-white p-3">
            {NAV.map((n) => (
              <Link key={n.key} to={n.to} aria-current={active === n.key ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] ${active === n.key ? "border-orange bg-[#FFF3D6] font-semibold text-ink" : "border-transparent text-inkSoft hover:bg-creamDeep"}`}>
                {n.icon}{n.label}
              </Link>
            ))}
          </nav>
        </div>
        <section className="h-fit min-w-0 rounded-[14px] border border-line bg-white p-5 shadow-card">{children}</section>
      </main>
    </PageLayout>
  );
}
