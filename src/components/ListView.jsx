import DataStatus from "./DataStatus";
import CourseCard from "./CourseCard";
import useDataStore from "../store/zustand/useDataStore";

// ListView: menampilkan daftar kelas dari Zustand store.
// - Status loading/error dibaca langsung dari store (+ tombol "Coba lagi" memanggil fetchData).
// - `courses` (opsional): daftar yang sudah difilter/diurutkan oleh halaman; default-nya seluruh data store.
// - `children`: konten tambahan di bawah daftar (mis. pagination), ikut tersembunyi saat loading/error.
// Karena membaca dari store, tampilan otomatis ter-update saat add / edit / delete.
export default function ListView({
  courses,
  onEdit,
  onDelete,
  emptyText = "Belum ada kelas.",
  gridClass = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  children,
}) {
  const storeCourses = useDataStore((s) => s.courses);
  const loading = useDataStore((s) => s.loading);
  const error = useDataStore((s) => s.error);
  const fetchData = useDataStore((s) => s.fetchData);

  const list = courses ?? storeCourses;

  return (
    <DataStatus loading={loading} error={error} onRetry={() => fetchData()}>
      {list.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-line bg-white p-10 text-center text-sm text-inkSoft">
          {emptyText}
        </div>
      ) : (
        <div className={gridClass}>
          {list.map((c) => (
            <CourseCard key={c.id} course={c} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
      {children}
    </DataStatus>
  );
}
