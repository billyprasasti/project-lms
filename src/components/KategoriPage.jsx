import { useState } from "react";
import PageLayout from "./PageLayout";
import FilterSidebar from "./FilterSidebar";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import useCourseCrud from "./useCourseCrud";
import { PRICE_RANGES, DURATION_RANGES, SORTS } from "../data/courses";

const PER_PAGE = 6;
const NO_FILTER = { cat: [], price: [], duration: [] };

const matchRange = (ranges, keys, value) =>
  keys.length === 0 || ranges.some((r) => keys.includes(r.key) && r.test(value));

export default function KategoriPage({ courses, profile, onAdd, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState(NO_FILTER);
  const [page, setPage] = useState(1);
  const crud = useCourseCrud({ onAdd, onUpdate, onDelete });

  const toggleFilter = (group, key) => {
    setFilters((f) => ({
      ...f,
      [group]: f[group].includes(key) ? f[group].filter((k) => k !== key) : [...f[group], key],
    }));
    setPage(1);
  };

  const q = search.trim().toLowerCase();
  const filtered = courses
    .filter((c) => filters.cat.length === 0 || filters.cat.includes(c.cat))
    .filter((c) => matchRange(PRICE_RANGES, filters.price, c.price))
    .filter((c) => matchRange(DURATION_RANGES, filters.duration, c.duration))
    .filter((c) => !q || [c.title, c.category, c.mentor].some((t) => t.toLowerCase().includes(q)));
  const sorted = sort ? [...filtered].sort(SORTS.find((s) => s.key === sort).fn) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <PageLayout profile={profile}>
      <main className="mx-auto max-w-[1180px] px-6 pt-10">
        <h1 className="mb-1.5 font-head text-[28px] font-semibold">Koleksi Video Pembelajaran Unggulan</h1>
        <p className="mb-7 text-sm text-inkSoft">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar filters={filters} onToggle={toggleFilter}
            onReset={() => { setFilters(NO_FILTER); setPage(1); }} />

          <section>
            <div className="mb-5 flex flex-wrap items-center gap-3 sm:justify-end">
              <div className="relative">
                <button type="button" aria-haspopup="listbox" aria-expanded={sortOpen}
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex h-10 min-w-[140px] items-center justify-between gap-3 rounded-lg border border-line bg-white px-3.5 text-[13px] text-inkSoft">
                  {sort ? SORTS.find((s) => s.key === sort).label : "Urutkan"} <span>⌄</span>
                </button>
                {sortOpen && (
                  <ul role="listbox" className="absolute left-0 top-11 z-10 m-0 w-44 list-none rounded-lg border border-line bg-white p-1 shadow-pop">
                    {SORTS.map((s) => (
                      <li key={s.key}>
                        <button role="option" aria-selected={sort === s.key}
                          onClick={() => { setSort(s.key); setSortOpen(false); setPage(1); }}
                          className={`w-full rounded-md border-0 px-3 py-2 text-left text-[13px] hover:bg-greenPale ${sort === s.key ? "bg-greenPale font-semibold text-greenDark" : "bg-transparent text-ink"}`}>
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input type="search" placeholder="Cari Kelas" value={search} aria-label="Cari kelas"
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-full flex-1 rounded-lg border border-line bg-white px-3.5 text-[13px] focus:border-green focus:outline-none sm:w-52 sm:flex-none" />

              <button onClick={crud.openAdd}
                className="h-10 rounded-full border-0 bg-green px-5 text-[13.5px] font-semibold text-white hover:bg-greenDark">
                + Tambah Kelas
              </button>
            </div>

            <p className="mb-4 text-[13px] text-inkSoft">Menampilkan {sorted.length} dari {courses.length} kelas</p>

            {visible.length === 0 ? (
              <div className="rounded-[14px] border border-dashed border-line bg-white p-10 text-center text-sm text-inkSoft">
                Tidak ada kelas yang cocok. Ubah filter atau tambah kelas baru.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {visible.map((c) => (
                  <CourseCard key={c.id} course={c} onEdit={crud.openEdit} onDelete={crud.askDelete} />
                ))}
              </div>
            )}

            <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
          </section>
        </div>
      </main>
      {crud.dialogs}
    </PageLayout>
  );
}
