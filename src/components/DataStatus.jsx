// Menampilkan loading / error; kalau data siap, tampilkan children
export default function DataStatus({ loading, error, onRetry, children }) {
  if (loading)
    return (
      <div role="status" className="flex items-center justify-center gap-3 rounded-[14px] border border-line bg-white p-10 text-sm text-inkSoft">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-green border-t-transparent" />
        Memuat data kelas...
      </div>
    );
  if (error)
    return (
      <div role="alert" className="rounded-[14px] border border-red/40 bg-white p-8 text-center">
        <p className="mb-3 text-sm text-red">{error}</p>
        <button onClick={onRetry}
          className="h-9 rounded-md border-0 bg-green px-5 text-[13px] font-semibold text-white hover:bg-greenDark">
          Coba lagi
        </button>
      </div>
    );
  return <>{children}</>;
}
