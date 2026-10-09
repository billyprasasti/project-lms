import { useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={title}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[22px] bg-white p-6 shadow-pop">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-head text-xl font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Tutup"
            className="border-0 bg-transparent text-2xl leading-none text-inkSoft">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
