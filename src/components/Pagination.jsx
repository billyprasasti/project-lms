const base = "flex h-8 w-8 items-center justify-center rounded-md border-0 text-[13px] font-medium";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Halaman" className="mt-8 flex justify-center gap-2">
      <button className={`${base} bg-white text-inkSoft disabled:opacity-40`} disabled={page === 1}
        onClick={() => onChange(page - 1)} aria-label="Sebelumnya">‹</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}
          className={`${base} ${n === page ? "bg-orange text-white" : "bg-white text-inkSoft"}`}>{n}</button>
      ))}
      <button className={`${base} bg-white text-inkSoft disabled:opacity-40`} disabled={page === totalPages}
        onClick={() => onChange(page + 1)} aria-label="Berikutnya">›</button>
    </nav>
  );
}
