import { useState } from "react";
import { QUESTIONS } from "../data/courses";

const INFO = {
  pretest: {
    label: "Pre-Test",
    intro: "Kerjakan pretest dengan sebaik mungkin untuk mengukur pemahaman awalmu terkait materi yang akan kamu pelajari",
    pass: "-",
    minutes: 5,
    note: "Jangan khawatir, total skor tidak akan memengaruhi kelulusan dan penilaian akhirmu dalam rangkaian kelas ini",
  },
  quiz: {
    label: "Quiz",
    intro: "Kerjakan quiz dengan teliti untuk menguji pemahamanmu setelah mempelajari materi pada modul ini",
    pass: "70",
    minutes: 10,
    note: "Nilai quiz akan memengaruhi kelulusanmu, jadi pastikan semua jawaban sudah benar sebelum mengakhiri.",
  },
};

function RulesBanner() {
  return (
    <div className="relative h-[200px] overflow-hidden bg-gradient-to-b from-sky-200 to-sky-300 sm:h-[246px]" aria-hidden="true">
      <div className="absolute -left-10 top-16 h-48 w-80 rounded-full bg-lime-700" />
      <div className="absolute left-40 top-20 h-48 w-96 rounded-full bg-green-700" />
      <div className="absolute -left-6 top-32 h-24 w-48 rounded-full bg-teal-800" />
      <div className="absolute right-24 top-6 h-24 w-48 rounded-t-full bg-amber-400" />
      <div className="absolute right-[8.5rem] top-[7.5rem] h-16 w-1 bg-orange" />
      <div className="absolute inset-x-0 bottom-0 h-14 bg-cyan-400" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rules-text font-head text-6xl font-black sm:text-8xl">RULES</span>
      </div>
    </div>
  );
}

function Rules({ info, onStart }) {
  return (
    <div>
      <RulesBanner />
      <div className="mx-auto max-w-2xl px-6 py-8 text-[15px] leading-relaxed text-inkSoft">
        <h2 className="mb-2 font-head text-base font-semibold text-ink">Aturan</h2>
        <p className="mb-5">{info.intro}</p>
        <p className="mb-5">
          Syarat Nilai Kelulusan: {info.pass}<br />
          Durasi Ujian: {info.minutes} Menit
        </p>
        <p className="mb-6">{info.note}</p>
        <button onClick={onStart}
          className="h-10 rounded-md border-0 bg-green px-6 text-[13px] font-semibold text-white hover:bg-greenDark">
          Mulai {info.label}
        </button>
      </div>
    </div>
  );
}

function Result({ info, answers, onRetry }) {
  const correct = QUESTIONS.filter((q) => answers[q.id] === q.answer).length;
  const score = Math.round((correct / QUESTIONS.length) * 100);
  const passed = info.pass === "-" || score >= Number(info.pass);
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <h2 className="mb-2 font-head text-2xl font-semibold">{info.label} selesai</h2>
      <p className="mb-1 font-head text-5xl font-semibold text-green">{score}</p>
      <p className="mb-2 text-sm text-inkSoft">{correct} dari {QUESTIONS.length} soal benar</p>
      <p className={`mb-6 text-sm font-semibold ${passed ? "text-greenDark" : "text-red"}`}>
        {info.pass === "-" ? "Skor tidak memengaruhi kelulusan." : passed ? "Kamu lulus." : `Nilai minimal ${info.pass}. Coba lagi ya.`}
      </p>
      <button onClick={onRetry}
        className="h-10 rounded-md border border-line bg-white px-6 text-[13px] font-semibold">
        Ulangi {info.label}
      </button>
    </div>
  );
}

// kind: "pretest" | "quiz"; onFinish dipanggil saat semua soal selesai dijawab & diakhiri
export default function ExamView({ kind, onFinish }) {
  const info = INFO[kind];
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // { idSoal: indeksPilihan }

  const q = QUESTIONS[current];
  const answeredAll = Object.keys(answers).length === QUESTIONS.length;
  const isLast = current === QUESTIONS.length - 1;

  const retry = () => {
    setAnswers({}); setCurrent(0); setFinished(false); setStarted(false);
  };
  const finish = () => { setFinished(true); onFinish(); };

  if (!started) return <Rules info={info} onStart={() => setStarted(true)} />;
  if (finished) return <Result info={info} answers={answers} onRetry={retry} />;

  return (
    <div className="grid min-h-full md:grid-cols-[260px_1fr]">
      <aside className="border-b border-line p-5 md:border-b-0 md:border-r">
        <h2 className="mb-4 font-head text-sm font-semibold">List Soal</h2>
        <div className="mb-4 grid grid-cols-5 gap-3">
          {QUESTIONS.map((item, i) => {
            const state =
              i === current ? "border-orange bg-orange/10 text-ink"
              : answers[item.id] !== undefined ? "border-green bg-greenPale text-greenDark"
              : "border-line bg-white text-ink";
            return (
              <button key={item.id} onClick={() => setCurrent(i)}
                aria-label={`Soal ${item.id}`} aria-current={i === current ? "true" : undefined}
                className={`h-9 w-9 rounded-md border text-xs font-medium ${state}`}>
                {item.id}
              </button>
            );
          })}
        </div>
        <div className="rounded-md border border-sky-400 bg-sky-50 p-3 text-xs text-sky-600">
          Selesaikan semua soal untuk mengakhiri quiz
        </div>
      </aside>

      <section className="flex flex-col px-6 py-8 md:px-10">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          <h2 className="mb-2 font-head text-xl font-semibold">Pertanyaan {q.id}</h2>
          <p className="mb-5 text-[15px] leading-relaxed text-inkSoft">{q.text}</p>

          <div role="radiogroup" aria-label={`Pilihan jawaban soal ${q.id}`} className="flex flex-col gap-2.5">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <label key={i}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-3 text-[13px] ${selected ? "border-green text-green" : "border-line text-ink"}`}>
                  <input type="radio" name={`q-${q.id}`} checked={selected}
                    onChange={() => setAnswers({ ...answers, [q.id]: i })}
                    className="h-4 w-4 flex-none accent-green" />
                  {opt}
                </label>
              );
            })}
          </div>

          <div className="mt-auto flex gap-3 pt-10">
            <button disabled={current === 0} onClick={() => setCurrent(current - 1)}
              className="h-10 flex-1 rounded-md border border-line bg-neutral-100 text-[13px] font-semibold text-inkSoft disabled:cursor-not-allowed disabled:opacity-60">
              ← Sebelumnya
            </button>
            {isLast ? (
              <button disabled={!answeredAll} onClick={finish}
                className="h-10 flex-1 rounded-md border-0 bg-green text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                Selesai
              </button>
            ) : (
              <button onClick={() => setCurrent(current + 1)}
                className="h-10 flex-1 rounded-md border-0 bg-green text-[13px] font-semibold text-white hover:bg-greenDark">
                Selanjutnya →
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
