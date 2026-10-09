import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import PurchaseCard from "./PurchaseCard";
import CourseCard from "./CourseCard";
import Stars from "./Stars";
import { THUMBS, DETAIL, catLabel } from "../data/courses";

const card = "rounded-[14px] border border-line bg-white p-5 shadow-card";
const buyBtn = "flex h-10 w-full items-center justify-center rounded-md bg-green text-[13px] font-semibold text-white hover:bg-greenDark";

export default function KelasDetailPage({ courses, enrollments, profile }) {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === id);
  const [openIdx, setOpenIdx] = useState(0);

  if (!course) {
    return (
      <PageLayout profile={profile}>
        <main className="px-6 py-24 text-center">
          <p className="mb-3 text-inkSoft">Kelas tidak ditemukan atau sudah dihapus.</p>
          <Link to="/beranda" className="font-semibold text-green">Kembali ke beranda</Link>
        </main>
      </PageLayout>
    );
  }

  const enrolled = enrollments.some((e) => e.courseId === course.id);
  const related = courses
    .filter((c) => c.id !== course.id)
    .sort((a, b) => Number(b.cat === course.cat) - Number(a.cat === course.cat))
    .slice(0, 3);
  const tutors = [
    { name: course.mentor, role: `${course.role} di ${course.company}`, bio: DETAIL.extraTutor.bio },
    DETAIL.extraTutor,
  ];

  const action = enrolled ? (
    <Link to={`/belajar/${course.id}`} className={buyBtn}>Lanjutkan Belajar</Link>
  ) : (
    <Link to={`/checkout/${course.id}`} className={buyBtn}>Beli Sekarang</Link>
  );

  return (
    <PageLayout profile={profile}>
      <main className="mx-auto max-w-[1180px] px-6 pt-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-[11px] text-inkSoft">
          <Link to="/beranda" className="hover:text-green">Beranda</Link> /{" "}
          <Link to="/kategori" className="hover:text-green">{catLabel(course.cat)}</Link> /{" "}
          <span className="text-ink">{course.title}</span>
        </nav>

        <section className={`relative overflow-hidden rounded-[22px] bg-gradient-to-br ${THUMBS[course.cat]}`}>
          <div className="bg-ink/70 px-6 py-14 text-white sm:px-14">
            <h1 className="mb-3 max-w-[560px] font-head text-2xl font-semibold leading-tight sm:text-[32px]">{course.title}</h1>
            <p className="mb-3 max-w-[420px] text-sm text-[#D7D2C4]">
              Belajar bersama tutor profesional di Video Course. Kapanpun, di manapun.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <Stars value={course.rating} size="text-base" />
              <span>{course.rating} ({course.reviews})</span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="order-last flex min-w-0 flex-col gap-6 lg:order-none lg:col-start-1 lg:row-start-1">
            <section className={card}>
              <h2 className="mb-3 font-head text-base font-semibold">Deskripsi</h2>
              {DETAIL.description.map((p, i) => (
                <p key={i} className="mb-3 text-[13px] leading-relaxed text-inkSoft last:mb-0">{i === 0 ? `${course.desc} ${p}` : p}</p>
              ))}
            </section>

            <section className={card}>
              <h2 className="mb-4 font-head text-base font-semibold">Belajar bersama Tutor Profesional</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {tutors.map((t, i) => (
                  <div key={i} className="rounded-lg border border-line p-3.5">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span className="h-9 w-9 flex-none rounded-lg bg-gradient-to-br from-orange to-red" />
                      <div className="leading-tight">
                        <div className="text-[13px] font-semibold">{t.name}</div>
                        <div className="text-[11px] text-inkSoft">{t.role}</div>
                      </div>
                    </div>
                    <p className="m-0 text-xs leading-relaxed text-inkSoft">{t.bio}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={card}>
              <h2 className="mb-4 font-head text-base font-semibold">Kamu akan Mempelajari</h2>
              <div className="flex flex-col gap-3">
                {DETAIL.curriculum.map((sec, i) => (
                  <div key={sec.title} className="rounded-lg border border-line">
                    <button aria-expanded={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                      className="flex w-full items-center justify-between gap-3 border-0 bg-transparent px-3.5 py-3 text-left text-[13px] font-semibold text-green">
                      {sec.title}
                      <span className={`transition-transform ${openIdx === i ? "rotate-180" : ""}`}>⌃</span>
                    </button>
                    {openIdx === i && (
                      <ul className="m-0 flex list-none flex-col gap-2 px-3.5 pb-3.5 pt-0">
                        {sec.items.map((it) => (
                          <li key={it.title} className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2.5 text-xs">
                            <span>{it.title}</span>
                            <span className="flex flex-none gap-3 text-inkSoft"><span>▶ Video</span><span>◷ {it.min}</span></span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={card}>
              <h2 className="mb-4 font-head text-base font-semibold">Rating dan Review</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {DETAIL.reviews.map((r, i) => (
                  <div key={i} className="rounded-lg border border-line p-3.5">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span className="h-9 w-9 flex-none rounded-lg bg-gradient-to-br from-orange to-red" />
                      <div className="leading-tight">
                        <div className="text-[13px] font-semibold">{r.name}</div>
                        <div className="text-[11px] text-inkSoft">{r.role}</div>
                      </div>
                    </div>
                    <p className="mb-2 text-xs leading-relaxed text-inkSoft">{r.text}</p>
                    <div className="flex items-center gap-1.5 text-xs text-inkSoft"><Stars value={r.rating} /> {r.rating}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-start-2 lg:row-start-1">
            <PurchaseCard course={course} offer action={action} />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-1.5 font-head text-[22px] font-semibold">Video Pembelajaran Terkait Lainnya</h2>
          <p className="mb-6 text-sm text-inkSoft">Eksplorasi pengetahuan Anda melalui pilihan spesial kami!</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
