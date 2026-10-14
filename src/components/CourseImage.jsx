import { useState } from "react";
import { THUMBS } from "../data/courses";

// Gambar kelas. Kalau belum ada gambar (atau gagal dimuat), tampil gradasi per kategori + ikon.
// `children` (label, tombol, dll) ditumpuk di atas gambar.
export default function CourseImage({ src, cat, className = "", children }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const show = Boolean(src) && failedSrc !== src;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${THUMBS[cat] ?? THUMBS.bisnis} ${className}`}>
      {show ? (
        <img src={src} alt="" loading="lazy" onError={() => setFailedSrc(src)}
          className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-1/3 max-h-12 w-1/3 max-w-[48px] -translate-x-1/2 -translate-y-1/2 text-white/40">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m21 16-5-5-8 8" />
        </svg>
      )}
      {children}
    </div>
  );
}
