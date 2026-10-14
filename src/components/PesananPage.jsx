import CourseImage from "./CourseImage";
import { useState } from "react";
import AccountLayout from "./AccountLayout";
import Tabs from "./Tabs";
import Pagination from "./Pagination";
import { formatRupiah } from "../data/courses";
import { formatDateTime } from "../data/account";

const PER_PAGE = 5;
const TABS = [
  { key: "semua", label: "Semua Pesanan" },
  { key: "Belum Bayar", label: "Menunggu" },
  { key: "Berhasil", label: "Berhasil" },
  { key: "Gagal", label: "Gagal" },
];
const BADGE = {
  Berhasil: "bg-green/15 text-green",
  Gagal: "bg-red/15 text-red",
  "Belum Bayar": "bg-orange/20 text-[#C9741F]",
};
const SORTS = {
  terbaru: (a, b) => b.ts - a.ts,
  terlama: (a, b) => a.ts - b.ts,
  "harga-rendah": (a, b) => a.total - b.total,
  "harga-tinggi": (a, b) => b.total - a.total,
};

export default function PesananPage({ orders, profile }) {
  const [tab, setTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);

  const q = search.trim().toLowerCase();
  const list = orders
    .filter((o) => tab === "semua" || o.status === tab)
    .filter((o) => !q || o.title.toLowerCase().includes(q) || o.invoice.toLowerCase().includes(q))
    .sort(SORTS[sort]);
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <AccountLayout profile={profile} active="pesanan" title="Daftar Pesanan"
      subtitle="Informasi terperinci mengenai pembelian">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <Tabs tabs={TABS} value={tab} onChange={(k) => { setTab(k); setPage(1); }} className="flex-1 border-b-0" />
        <div className="flex gap-2">
          <input type="search" placeholder="Cari Kelas" aria-label="Cari pesanan" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-9 w-36 rounded-lg border border-line px-3 text-xs focus:border-green focus:outline-none" />
          <select aria-label="Urutkan" value={sort} onChange={(e) => setSort(e.target.value)}
            className="h-9 rounded-lg border border-line bg-white px-2 text-xs text-inkSoft">
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
            <option value="harga-rendah">Harga Rendah</option>
            <option value="harga-tinggi">Harga Tinggi</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line p-10 text-center text-sm text-inkSoft">Belum ada pesanan.</p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {visible.map((o) => (
            <li key={o.id} className="overflow-hidden rounded-lg border border-line">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line px-4 py-3 text-xs">
                <span>No. Invoice: <strong className="text-sky-600 underline">{o.invoice}</strong></span>
                <span className="text-inkSoft">Waktu Pembayaran: {formatDateTime(o.ts)}</span>
                <span className={`ml-auto rounded-md px-2.5 py-1 text-[11px] font-semibold ${BADGE[o.status]}`}>{o.status}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <CourseImage src={o.image} cat={o.cat} className="h-9 w-9 flex-none rounded-md" />
                <span className="flex-1 text-[13px] font-medium">{o.title}</span>
                <div className="hidden border-l border-line pl-4 text-xs sm:block">
                  <div className="text-inkSoft">Harga</div>
                  <div className="font-semibold">{formatRupiah(o.price)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-greenPale/60 px-4 py-2.5 text-xs">
                <span className="text-inkSoft">Total Pembayaran</span>
                <span className="font-head text-sm font-semibold text-green">{formatRupiah(o.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={current} totalPages={totalPages} onChange={setPage} />
    </AccountLayout>
  );
}
