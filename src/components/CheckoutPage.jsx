import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./Logo";
import PurchaseCard from "./PurchaseCard";
import useToast from "./useToast";
import { ADMIN_FEE, formatRupiah } from "../data/courses";
import { PAYMENT_GROUPS, ALL_METHODS, vaNumber, howTo } from "../data/payments";

const TIMER_START = 60 * 60; // 1 jam
const card = "rounded-[14px] border border-line bg-white p-5 shadow-card";
const STEPS = ["Pilih Metode", "Bayar", "Selesai"];

function Stepper({ current }) {
  return (
    <ol className="m-0 flex list-none items-center gap-2 p-0 text-xs">
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-2" aria-current={i === current ? "step" : undefined}>
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i < current ? "bg-green text-white" : i === current ? "border-2 border-green bg-white" : "bg-gray-300"}`}>
            {i < current ? "✓" : i === current ? <span className="h-2 w-2 rounded-full bg-green" /> : null}
          </span>
          <span className={i === current ? "font-semibold" : "text-inkSoft"}>{s}</span>
          {i < STEPS.length - 1 && <span className={`hidden h-0.5 w-10 sm:block ${i < current ? "bg-green" : "bg-gray-300"}`} />}
        </li>
      ))}
    </ol>
  );
}

function MethodBadge({ m }) {
  return (
    <span className={`flex h-6 min-w-[40px] items-center justify-center rounded px-1.5 text-[10px] font-bold text-white ${m.color} ${m.id === "mandiri" ? "!text-ink" : ""}`}>
      {m.short}
    </span>
  );
}

function Summary({ course }) {
  const total = course.price + ADMIN_FEE;
  return (
    <>
      <div className="flex justify-between gap-6 text-[13px] text-inkSoft">
        <span>Video Learning: {course.title}</span><span className="flex-none">{formatRupiah(course.price)}</span>
      </div>
      <div className="mt-3 flex justify-between border-b border-line pb-4 text-[13px] text-inkSoft">
        <span>Biaya Admin</span><span>{formatRupiah(ADMIN_FEE)}</span>
      </div>
      <div className="mt-4 flex justify-between text-[13px] font-semibold">
        <span>Total Pembayaran</span><span className="text-base text-green">{formatRupiah(total)}</span>
      </div>
    </>
  );
}

function Illustration({ ok }) {
  return (
    <svg viewBox="0 0 240 150" className="mx-auto mb-5 h-36 w-56" aria-hidden="true">
      <path d="M28 44 90 10l102 10 28 70-46 52H50Z" fill="#EFEFEF" />
      <rect x="82" y="24" width="84" height="116" rx="10" fill="#FFE2A8" stroke="#2B2B2B" strokeWidth="2.5" />
      <path d="M82 38h84l-6-14H88Z" fill="#2B2B2B" />
      <rect x="104" y="54" width="40" height="40" rx="6" fill="#fff" />
      <circle cx="124" cy="74" r="11" fill={ok ? "#3FA65A" : "#F2B84A"} />
      {ok ? <path d="m118 74 5 5 8-9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" /> : <path d="M124 68v7m0 4v1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />}
      <rect x="96" y="104" width="56" height="5" rx="2.5" fill="#fff" />
      <rect x="96" y="116" width="56" height="5" rx="2.5" fill="#fff" />
      <rect x="40" y="86" width="52" height="34" rx="5" fill="#2B2B2B" transform="rotate(-24 66 103)" />
      <circle cx="190" cy="52" r="9" fill="#F2B84A" />
      <path d="M190 62v38M180 100h20v30h-20Z" stroke="#2B2B2B" strokeWidth="3" fill="#F2B84A" />
    </svg>
  );
}

export default function CheckoutPage({ courses, onOrder }) {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === id);

  const [step, setStep] = useState(0); // 0 pilih, 1 bayar, 2 selesai
  const [methodId, setMethodId] = useState(null);
  const [openGroup, setOpenGroup] = useState("bank");
  const [error, setError] = useState("");
  const [left, setLeft] = useState(TIMER_START);
  const [result, setResult] = useState("Berhasil");
  const [openHow, setOpenHow] = useState(0);
  const { notify, toastNode } = useToast();

  const method = ALL_METHODS.find((m) => m.id === methodId);

  const finish = (status) => {
    onOrder({ status, courseId: course.id, title: course.title, cat: course.cat, price: course.price });
    setResult(status);
    setStep(2);
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  // hitung mundur di langkah "Bayar"
  useEffect(() => {
    if (step !== 1) return;
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  // waktu habis -> pembayaran tertunda
  useEffect(() => {
    if (step === 1 && left === 0) finishRef.current("Belum Bayar");
  }, [step, left]);

  if (!course) {
    return (
      <main className="px-6 py-24 text-center">
        <p className="mb-3 text-inkSoft">Kelas tidak ditemukan.</p>
        <Link to="/beranda" className="font-semibold text-green">Kembali ke beranda</Link>
      </main>
    );
  }

  const goPay = () => {
    if (!method) { setError("Pilih metode pembayaran terlebih dahulu."); return; }
    setError("");
    setLeft(TIMER_START);
    setOpenHow(0);
    setStep(1);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(vaNumber(method).replace(/\s/g, "")); } catch { /* abaikan */ }
    notify("Nomor berhasil disalin.");
  };

  const hh = String(Math.floor(left / 3600)).padStart(2, "0");
  const mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const greenBtn = "flex h-10 flex-1 items-center justify-center rounded-md border-0 bg-green px-4 text-[13px] font-semibold text-white hover:bg-greenDark";

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between gap-4 px-6">
          <Logo />
          <Stepper current={step} />
        </div>
        {step === 1 && (
          <div role="timer" className="flex items-center justify-center gap-3 bg-[#FDEBD3] py-2.5 text-[13px]">
            Selesaikan pemesanan dalam
            <span className="flex items-center gap-1 font-semibold text-white">
              {[hh, mm, ss].map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="rounded bg-red px-1.5 py-1">{v}</span>{i < 2 && <span className="text-red">:</span>}
                </span>
              ))}
            </span>
          </div>
        )}
      </header>

      {step === 2 ? (
        <main className="px-6 py-14">
          <div className="mx-auto max-w-[420px] rounded-[14px] border border-line bg-white px-6 py-10 text-center shadow-card">
            <Illustration ok={result === "Berhasil"} />
            <h1 className="mb-2 font-head text-lg font-semibold">
              {result === "Berhasil" ? "Pembayaran Berhasil!" : "Pembayaran Tertunda!"}
            </h1>
            <p className="mb-5 text-[13px] leading-relaxed text-inkSoft">
              Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.
            </p>
            <Link to="/pesanan" className="inline-flex h-9 items-center rounded-md bg-green px-5 text-xs font-semibold text-white hover:bg-greenDark">
              Lihat Detail Pesanan
            </Link>
          </div>
        </main>
      ) : (
        <main className="mx-auto grid max-w-[1180px] gap-6 px-6 py-8 lg:grid-cols-[1fr_300px]">
          <div className="flex min-w-0 flex-col gap-6">
            {step === 0 && (
              <>
                <section className={card}>
                  <h1 className="mb-4 font-head text-base font-semibold">Ringkasan Belanja</h1>
                  <div className="flex justify-between text-[13px] text-inkSoft"><span>Total Harga (1 barang)</span><span>{formatRupiah(course.price)}</span></div>
                  <div className="mt-3 flex justify-between border-b border-line pb-4 text-[13px] text-inkSoft"><span>Biaya Admin</span><span>{formatRupiah(ADMIN_FEE)}</span></div>
                  <div className="mt-4 flex justify-between text-[13px] font-semibold"><span>Total Pembayaran</span><span className="text-base text-green">{formatRupiah(course.price + ADMIN_FEE)}</span></div>
                </section>

                <section className={card}>
                  <h2 className="mb-4 font-head text-base font-semibold">Metode Pembayaran</h2>
                  <div className="flex flex-col gap-3">
                    {PAYMENT_GROUPS.map((g) => (
                      <div key={g.key} className="rounded-lg border border-line">
                        <button type="button" aria-expanded={openGroup === g.key}
                          onClick={() => setOpenGroup(openGroup === g.key ? "" : g.key)}
                          className="flex w-full items-center justify-between border-0 bg-transparent px-3.5 py-3 text-[13px] font-semibold">
                          {g.title}<span className={`text-inkSoft transition-transform ${openGroup === g.key ? "rotate-180" : ""}`}>⌄</span>
                        </button>
                        {openGroup === g.key && (
                          <ul className="m-0 list-none border-t border-line p-0">
                            {g.methods.map((m) => (
                              <li key={m.id} className="border-b border-line last:border-b-0">
                                <label className="flex cursor-pointer items-center gap-3 px-3.5 py-3 text-[13px]">
                                  <MethodBadge m={m} />
                                  <span className="flex-1">{m.name}</span>
                                  <input type="radio" name="method" checked={methodId === m.id}
                                    onChange={() => { setMethodId(m.id); setError(""); }}
                                    className="h-4 w-4 accent-green" />
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  {error && <p role="alert" className="mb-0 mt-3 text-xs text-red">{error}</p>}
                  <button onClick={goPay} className={`${greenBtn} mt-5 w-full flex-none`}>Bayar Sekarang</button>
                </section>
              </>
            )}

            {step === 1 && (
              <>
                <section className={card}>
                  <h1 className="mb-4 font-head text-base font-semibold">Metode Pembayaran</h1>
                  <div className="mb-6 rounded-lg border border-line px-4 py-5 text-center">
                    <div className="mb-3 flex justify-center"><MethodBadge m={method} /></div>
                    <p className="mb-2 text-[13px] font-semibold">
                      {method.group === "bank" ? `Bayar Melalui Virtual Account ${method.short}` : `Bayar Melalui ${method.name}`}
                    </p>
                    {method.group !== "card" && (
                      <p className="m-0 text-[13px]">
                        {vaNumber(method)}{" "}
                        <button onClick={copy} className="border-0 bg-transparent p-0 text-xs font-semibold text-red">Salin</button>
                      </p>
                    )}
                  </div>

                  <h2 className="mb-4 font-head text-base font-semibold">Ringkasan Pesanan</h2>
                  <Summary course={course} />

                  <div className="mt-5 flex gap-3">
                    <button onClick={() => setStep(0)}
                      className="flex h-10 flex-1 items-center justify-center rounded-md border border-green bg-white text-[13px] font-semibold text-green">
                      Ganti Metode Pembayaran
                    </button>
                    <button onClick={() => finish("Berhasil")} className={greenBtn}>Bayar Sekarang</button>
                  </div>
                  <button onClick={() => finish("Belum Bayar")}
                    className="mx-auto mt-3 block border-0 bg-transparent text-xs text-inkSoft underline">
                    Bayar nanti
                  </button>
                </section>

                <section className={card}>
                  <h2 className="mb-4 font-head text-base font-semibold">Tata Cara Pembayaran</h2>
                  <div className="flex flex-col gap-3">
                    {howTo(method).map((h, i) => (
                      <div key={h.title} className="rounded-lg border border-line">
                        <button aria-expanded={openHow === i} onClick={() => setOpenHow(openHow === i ? -1 : i)}
                          className="flex w-full items-center justify-between border-0 bg-transparent px-3.5 py-3 text-xs font-semibold">
                          {h.title}<span className={`text-inkSoft transition-transform ${openHow === i ? "rotate-180" : ""}`}>⌃</span>
                        </button>
                        {openHow === i && (
                          <ol className="m-0 list-decimal border-t border-line py-3 pl-9 pr-4 text-xs leading-relaxed text-inkSoft">
                            {h.steps.map((s) => <li key={s}>{s}</li>)}
                          </ol>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
          <PurchaseCard course={course} />
        </main>
      )}
      {toastNode}
    </div>
  );
}
