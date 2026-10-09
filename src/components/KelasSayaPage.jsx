import { useState } from "react";
import { Link } from "react-router-dom";
import AccountLayout from "./AccountLayout";
import Tabs from "./Tabs";
import Pagination from "./Pagination";
import { THUMBS } from "../data/courses";

const PER_PAGE = 3;
const TABS = [
  { key: "semua", label: "Semua Kelas" },
  { key: "berjalan", label: "Sedang Berjalan" },
  { key: "selesai", label: "Selesai" },
];

export default function KelasSayaPage({ courses, enrollments, profile }) {
  const [tab, setTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const q = search.trim().toLowerCase();
  // gabungkan enrollment dengan data kelas (kelas yang sudah dihapus dilewati)
  const items = enrollments
    .map((e) => ({ ...e, course: courses.find((c) => c.id === e.courseId) }))
    .filter((e) => e.course)
    .map((e) => ({ ...e, finished: e.done >= e.total, pct: Math.round((e.done / e.total) * 100) }))
    .filter((e) => tab === "semua" || (tab === "selesai") === e.finished)
    .filter((e) => !q || e.course.title.toLowerCase().includes(q) || e.course.category.toLowerCase().includes(q));

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = items.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <AccountLayout profile={profile} active="kelas" title="Daftar Kelas"
      subtitle="Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <Tabs tabs={TABS} value={tab} onChange={(k) => { setTab(k); setPage(1); }} className="flex-1 border-b-0" />
        <input type="search" placeholder="Cari Kelas" aria-label="Cari kelas saya" value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-9 w-40 rounded-lg border border-line px-3 text-xs focus:border-green focus:outline-none" />
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line p-10 text-center text-sm text-inkSoft">
          Belum ada kelas. <Link to="/kategori" className="font-semibold text-green">Cari kelas</Link>
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {visible.map(({ course, done, total, pct, finished }) => (
            <li key={course.id} className="overflow-hidden rounded-lg border border-line">
              <div className={`flex items-center justify-between px-4 py-2.5 text-xs ${finished ? "bg-greenPale" : "bg-[#FFF8EC]"}`}>
                <span className="font-medium">{done} / {total} Modul Terselesaikan</span>
                <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${finished ? "bg-green/15 text-green" : "bg-orange/20 text-[#C9741F]"}`}>
                  {finished ? "Selesai" : "Sedang Berjalan"}
                </span>
              </div>
              <div className="flex gap-4 px-4 py-4">
                <span className={`hidden h-28 w-28 flex-none rounded-lg bg-gradient-to-br sm:block ${THUMBS[course.cat]}`} />
                <div className="min-w-0">
                  <h3 className="mb-1 font-head text-sm font-semibold">{course.category}</h3>
                  <p className="mb-2 text-xs leading-relaxed text-inkSoft">{course.desc}</p>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-7 w-7 flex-none rounded-md bg-gradient-to-br from-orange to-red" />
                    <div className="text-xs leading-tight">
                      <div className="font-medium">{course.mentor}</div>
                      <div className="text-[11px] text-inkSoft">{course.role} di <strong className="text-ink">{course.company}</strong></div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[11px] text-inkSoft"><span>▤ {total} Modul</span><span>◷ 360 Menit</span></div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t border-line px-4 py-3">
                <span className="text-xs">Progres Kelas: <strong>{pct}%</strong></span>
                <span className="h-1.5 min-w-[80px] flex-1 overflow-hidden rounded-full bg-orange/20" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <span className="block h-full rounded-full bg-gradient-to-r from-red to-orange" style={{ width: `${pct}%` }} />
                </span>
                {finished ? (
                  <>
                    <button onClick={() => alert("Sertifikat diunduh!")}
                      className="h-8 rounded-md border border-green bg-white px-4 text-xs font-semibold text-green">Unduh Sertifikat</button>
                    <Link to={`/kelas/${course.id}`} className="flex h-8 items-center rounded-md bg-green px-4 text-xs font-semibold text-white hover:bg-greenDark">Lihat Detail Kelas</Link>
                  </>
                ) : (
                  <Link to={`/belajar/${course.id}`} className="flex h-8 items-center rounded-md bg-green px-4 text-xs font-semibold text-white hover:bg-greenDark">Lanjutkan Pembelajaran</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={current} totalPages={totalPages} onChange={setPage} />
    </AccountLayout>
  );
}
