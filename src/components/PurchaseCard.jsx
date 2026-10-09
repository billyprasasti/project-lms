import { THUMBS, formatPrice } from "../data/courses";

const INCLUDES = ["Ujian Akhir", "49 Video", "7 Dokumen", "Sertifikat", "Pretest"];

export default function PurchaseCard({ course, offer = false, action = null }) {
  return (
    <aside className="rounded-[14px] border border-line bg-white p-3.5 shadow-card lg:sticky lg:top-24">
      <div className={`mb-3 aspect-[16/10] rounded-lg bg-gradient-to-br ${THUMBS[course.cat]}`} />
      <h2 className="mb-2 font-head text-sm font-semibold leading-snug">{course.title}</h2>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="font-head text-base font-semibold text-green">{formatPrice(course.price)}</span>
        <span className="text-xs text-inkSoft line-through">{formatPrice(course.price * 2)}</span>
        <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-white">Diskon 50%</span>
      </div>
      {offer && <p className="mb-3 text-xs text-sky-600">Penawaran spesial tersisa 2 hari lagi!</p>}
      {action}

      <h3 className="mb-2 mt-4 text-xs font-semibold">Kelas Ini Sudah Termasuk</h3>
      <ul className="m-0 mb-4 grid list-none grid-cols-2 gap-x-2 gap-y-2 p-0 text-[11.5px] text-inkSoft">
        {INCLUDES.map((i) => (
          <li key={i} className="flex items-center gap-1.5"><span className="text-[8px] text-green">◆</span>{i}</li>
        ))}
      </ul>
      <h3 className="mb-1.5 text-xs font-semibold">Bahasa Pengantar</h3>
      <p className="m-0 text-[11.5px] text-inkSoft">Bahasa Indonesia</p>
    </aside>
  );
}
