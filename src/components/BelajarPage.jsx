import DataStatus from "./DataStatus";
import useDataStore from "../store/zustand/useDataStore";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Stars from "./Stars";
import Modal from "./Modal";
import ExamView from "./ExamView";
import { SECTIONS } from "../data/courses";
import { btnPrimary } from "./ui";

const TYPE_ICON = { video: "▶", summary: "▤", quiz: "✎", pretest: "✎" };

function ItemIcon({ type, done }) {
  if (done)
    return (
      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-green text-[10px] font-bold text-white">✓</span>
    );
  return <span className="mt-0.5 w-4 flex-none text-center text-sm text-inkSoft">{TYPE_ICON[type]}</span>;
}

export default function BelajarPage() {
  const { id } = useParams();
  const courses = useDataStore((s) => s.courses);
  const loading = useDataStore((s) => s.loading);
  const error = useDataStore((s) => s.error);
  const fetchData = useDataStore((s) => s.fetchData);
  const reload = () => fetchData();
  const course = courses.find((c) => String(c.id) === id);

  const [activeId, setActiveId] = useState("p1");
  const [done, setDone] = useState(["v1"]);
  const [playing, setPlaying] = useState(false);
  const [openSec, setOpenSec] = useState(["s1"]);
  const [showProgress, setShowProgress] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [draft, setDraft] = useState({ rating: 0, text: "" });

  if (loading || error) {
    return (
      <main className="mx-auto max-w-[600px] px-6 py-24">
        <DataStatus loading={loading} error={error} onRetry={reload} />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-inkSoft">Kelas tidak ditemukan.</p>
        <Link to="/beranda" className="font-semibold text-green">Kembali ke beranda</Link>
      </main>
    );
  }

  const items = SECTIONS.flatMap((s) => s.items);
  const idx = items.findIndex((i) => i.id === activeId);
  const active = items[idx];
  const pct = Math.round((done.length / items.length) * 100);
  const isDone = (itemId) => done.includes(itemId);

  const markDone = (itemId) => setDone((d) => (d.includes(itemId) ? d : [...d, itemId]));
  const toggleDone = (itemId) =>
    setDone((d) => (d.includes(itemId) ? d.filter((x) => x !== itemId) : [...d, itemId]));
  const toggleSection = (sid) =>
    setOpenSec((o) => (o.includes(sid) ? o.filter((x) => x !== sid) : [...o, sid]));

  const select = (itemId) => {
    setActiveId(itemId);
    setPlaying(false);
    const sec = SECTIONS.find((s) => s.items.some((i) => i.id === itemId));
    setOpenSec((o) => (o.includes(sec.id) ? o : [...o, sec.id]));
  };
  const go = (step) => items[idx + step] && select(items[idx + step].id);

  const submitReview = (e) => {
    e.preventDefault();
    if (draft.rating === 0) return;
    setReviews([{ id: Date.now(), name: "Kamu", ...draft }, ...reviews]);
    setDraft({ rating: 0, text: "" });
    setReviewOpen(false);
  };

  const MarkDoneButton = (
    <button onClick={() => toggleDone(activeId)}
      className={`h-10 rounded-full px-5 text-[13.5px] font-semibold ${isDone(activeId) ? "border border-line bg-white text-inkSoft" : "border-0 bg-green text-white"}`}>
      {isDone(activeId) ? "Batalkan selesai" : "Tandai selesai"}
    </button>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="relative z-20 border-b border-line bg-white">
        <div className="flex h-14 items-center justify-between px-5">
          <div className="flex min-w-0 items-center gap-4">
            <Link to="/kelas-saya" aria-label="Kembali" className="text-lg text-inkSoft">←</Link>
            <h1 className="m-0 truncate font-head text-sm font-medium">{course.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-2 w-[150px] overflow-hidden rounded-full bg-gray-200 sm:block">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <button onClick={() => setShowProgress(!showProgress)} aria-expanded={showProgress}
              className="border-0 bg-transparent text-sm font-semibold text-green">
              {done.length}/{items.length} ⌄
            </button>
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-orange to-red" />
          </div>
        </div>

        {showProgress && (
          <div className="absolute right-5 top-[52px] w-[270px] rounded-lg border border-line bg-white p-4 shadow-pop">
            <h2 className="m-0 border-b border-line pb-2 font-head text-sm font-semibold">{pct}% Modul Telah Selesai</h2>
            <p className="my-3 text-xs text-inkSoft">Selesaikan Semua Modul Untuk Mendapatkan Sertifikat</p>
            <button disabled={pct < 100} onClick={() => alert("Sertifikat diunduh!")}
              className="h-9 w-full rounded-md border-0 bg-green text-[13px] font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400">
              Ambil Sertifikat
            </button>
          </div>
        )}
      </header>

      <div className="grid flex-1 lg:grid-cols-[1fr_320px]">
        <main className="min-w-0">
          {/* key = id modul, supaya state ujian ter-reset saat pindah modul */}
          {(active.type === "pretest" || active.type === "quiz") && (
            <ExamView key={active.id} kind={active.type} onFinish={() => markDone(active.id)} />
          )}

          {active.type === "summary" && (
            <div className="mx-auto max-w-2xl px-6 py-8">
              <h2 className="mb-3 font-head text-xl font-semibold">{active.title}</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-inkSoft">
                Ringkasan materi {course.category}: konsep utama, istilah penting, dan contoh penerapan
                yang sudah dibahas pada video sebelumnya.
              </p>
              {MarkDoneButton}
            </div>
          )}

          {active.type === "video" && (
            <>
              <div className="flex aspect-video max-h-[420px] w-full items-center justify-center bg-neutral-700">
                {playing ? (
                  <div className="text-center text-white">
                    <p className="mb-4 text-sm">Memutar: {active.title}</p>
                    <button onClick={() => setPlaying(false)} aria-label="Jeda"
                      className="h-16 w-16 rounded-full border-0 bg-white text-2xl text-ink">❚❚</button>
                  </div>
                ) : (
                  <button onClick={() => setPlaying(true)} aria-label="Putar video"
                    className="h-[66px] w-[66px] rounded-full border-0 bg-white pl-1 text-2xl text-ink">▶</button>
                )}
              </div>

              <div className="mx-auto max-w-3xl px-6 py-6">
                <h2 className="mb-2 font-head text-xl font-semibold">{course.category}</h2>
                <p className="mb-5 text-[15px] text-inkSoft">{course.desc}</p>

                <div className="mb-4 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange to-red" />
                  <div className="leading-tight">
                    <div className="text-sm font-medium">{course.mentor}</div>
                    <div className="text-xs text-inkSoft">{course.role} di <strong className="text-ink">{course.company}</strong></div>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-2 text-sm">
                  <Stars value={course.rating} size="text-lg" />
                  <span className="text-inkSoft underline">{course.rating} ({course.reviews})</span>
                </div>

                <div className="mb-8">{MarkDoneButton}</div>

                {reviews.length > 0 && (
                  <section aria-label="Ulasan">
                    <h3 className="mb-3 font-head text-base font-semibold">Ulasan kamu</h3>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {reviews.map((r) => (
                        <li key={r.id} className="rounded-lg border border-line p-3.5">
                          <Stars value={r.rating} />
                          {r.text && <p className="mb-0 mt-1.5 text-[13.5px] text-inkSoft">{r.text}</p>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </>
          )}
        </main>

        <aside className="flex flex-col border-l border-line">
          <h2 className="m-0 border-b border-line px-5 py-4 font-head text-sm font-semibold">Daftar Modul</h2>
          <div className="flex-1 overflow-y-auto p-4">
            {SECTIONS.map((s) => (
              <div key={s.id} className="mb-4">
                <button onClick={() => toggleSection(s.id)} aria-expanded={openSec.includes(s.id)}
                  className="mb-2 flex w-full items-center justify-between border-0 bg-transparent p-0 font-head text-sm font-semibold">
                  {s.title}
                  <span className={`transition-transform ${openSec.includes(s.id) ? "rotate-180" : ""}`}>⌃</span>
                </button>
                {openSec.includes(s.id) && (
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {s.items.map((it) => (
                      <li key={it.id}>
                        <button onClick={() => select(it.id)}
                          className={`flex w-full items-start gap-2.5 rounded-lg border p-3 text-left ${it.id === activeId ? "border-green bg-greenPale" : "border-line bg-white"}`}>
                          <ItemIcon type={it.type} done={isDone(it.id)} />
                          <span>
                            <span className={`block text-[13px] font-medium ${it.id === activeId || isDone(it.id) ? "text-ink" : "text-inkSoft"}`}>{it.title}</span>
                            <span className="block text-xs text-inkSoft">{it.meta}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setReviewOpen(true)}
            className="flex h-12 items-center justify-center gap-2 border-0 bg-amber-400 text-sm font-semibold text-white">
            ☆ Beri Review &amp; Rating
          </button>
        </aside>
      </div>

      {/* Bar navigasi bawah: modul sebelumnya / berikutnya */}
      <nav aria-label="Navigasi modul" className="sticky bottom-0 z-10 flex h-14 items-center justify-between bg-green px-5 text-white">
        <button onClick={() => go(-1)} disabled={idx === 0} aria-label={`Sebelumnya: ${items[idx - 1]?.title ?? ""}`}
          className="flex items-center gap-4 border-0 bg-transparent text-sm font-semibold text-white disabled:opacity-40">
          <span className="text-xl">‹</span><span className="truncate">{course.title}</span>
        </button>
        <button onClick={() => go(1)} disabled={idx === items.length - 1} aria-label={`Berikutnya: ${items[idx + 1]?.title ?? ""}`}
          className="flex items-center gap-4 border-0 bg-transparent text-sm font-semibold text-white disabled:opacity-40">
          <span className="truncate">{course.title}</span><span className="text-xl">›</span>
        </button>
      </nav>

      {reviewOpen && (
        <Modal title="Beri Review & Rating" onClose={() => setReviewOpen(false)}>
          <form onSubmit={submitReview}>
            <div className="mb-4">
              <Stars value={draft.rating} size="text-3xl" onChange={(n) => setDraft({ ...draft, rating: n })} />
            </div>
            <textarea rows={4} value={draft.text} placeholder="Ceritakan pengalaman belajarmu"
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
              className="mb-4 w-full rounded-lg border border-line p-3.5 text-sm focus:border-green focus:outline-none" />
            <button type="submit" disabled={draft.rating === 0} className={`${btnPrimary} disabled:opacity-50`}>
              Kirim Ulasan
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
