import CourseImage from "./CourseImage";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import { catLabel, formatPrice } from "../data/courses";

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-full border-0 bg-white/90 p-0 text-ink shadow-card hover:bg-white";

export default function CourseCard({ course, onEdit, onDelete }) {
  const manage = Boolean(onEdit && onDelete);
  return (
    <article className="flex flex-col overflow-hidden rounded-[14px] border border-line bg-white shadow-card">
      <CourseImage src={course.image} cat={course.cat} className="aspect-[16/10]">
        <Link to={`/kelas/${course.id}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] text-white">
          {catLabel(course.cat)}
        </span>
        {manage && (
          <div className="absolute right-3 top-3 z-10 flex gap-1.5">
            <button onClick={() => onEdit(course)} aria-label={`Edit ${course.title}`} className={iconBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button onClick={() => onDelete(course)} aria-label={`Hapus ${course.title}`} className={`${iconBtn} text-red`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        )}
      </CourseImage>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 text-xs font-semibold text-greenDark">{course.category}</div>
        <h3 className="mb-2 font-head text-base font-semibold leading-snug">
          <Link to={`/kelas/${course.id}`} className="hover:text-greenDark">{course.title}</Link>
        </h3>
        <p className="mb-3.5 line-clamp-2 text-[13px] leading-relaxed text-inkSoft">{course.desc}</p>

        <div className="mb-3 flex items-center gap-2">
          <span className="h-[30px] w-[30px] flex-none rounded-full bg-gradient-to-br from-orange to-red" />
          <div className="leading-tight">
            <div className="text-[13px] font-medium">{course.mentor}</div>
            <div className="text-[11.5px] text-inkSoft">{course.role} di <strong className="text-ink">{course.company}</strong></div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="flex items-center gap-1.5 text-[12.5px] text-inkSoft">
            <Stars value={course.rating} />
            <span className="underline">{course.rating} ({course.reviews})</span>
          </span>
          <span className="font-head text-lg font-semibold text-green">{formatPrice(course.price)}</span>
        </div>
        <div className="mt-1 text-[11.5px] text-inkSoft">Durasi {course.duration} jam</div>
      </div>
    </article>
  );
}
