import useDataStore from "../store/zustand/useDataStore";
import { useState } from "react";
import PageLayout from "./PageLayout";
import ListView from "./ListView";
import Tabs from "./Tabs";
import useCourseCrud from "./useCourseCrud";
import useToast from "./useToast";
import { CATEGORIES } from "../data/courses";

const TABS = [{ key: "semua", label: "Semua Kelas" }, ...CATEGORIES];

export default function BerandaPage({ profile }) {
  const [cat, setCat] = useState("semua");
  const [email, setEmail] = useState("");
  const courses = useDataStore((s) => s.courses);
  const addData = useDataStore((s) => s.addData);
  const updateData = useDataStore((s) => s.updateData);
  const deleteData = useDataStore((s) => s.deleteData);
  const crud = useCourseCrud({ onAdd: addData, onUpdate: updateData, onDelete: deleteData });
  const { notify, toastNode } = useToast();

  // READ: data dari Zustand store, difilter per kategori lalu ditampilkan oleh ListView
  const list = cat === "semua" ? courses : courses.filter((c) => c.cat === cat);

  const subscribe = (e) => {
    e.preventDefault();
    notify("Terima kasih! Kamu akan menerima newsletter dari videobelajar.");
    setEmail("");
  };

  return (
    <PageLayout profile={profile}>
      <main>
        <section className="mx-auto mt-7 max-w-[1180px] px-6">
          <div className="hero-bg rounded-[22px] px-6 py-14 text-center text-white sm:px-14 sm:py-16">
            <h1 className="mx-auto mb-4 max-w-[640px] font-head text-[27px] font-semibold leading-tight sm:text-[40px]">
              Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
            </h1>
            <p className="mx-auto mb-7 max-w-[560px] text-[14.5px] leading-relaxed text-[#D7D2C4]">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
              Anda juga dapat berbagi ilmu dan meningkatkan pemahaman Anda.
            </p>
            <a href="#courses"
              className="inline-flex h-10 items-center rounded-md bg-green px-6 text-[13px] font-semibold text-white hover:bg-greenDark">
              Temukan Video Course untuk Dipelajari!
            </a>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-[1180px] px-6 pt-16">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="mb-1.5 font-head text-[26px] font-semibold">Koleksi Video Pembelajaran Unggulan</h2>
              <p className="m-0 text-sm text-inkSoft">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
            </div>
            {/* CREATE */}
            <button onClick={crud.openAdd}
              className="h-10 rounded-full border-0 bg-green px-5 text-[13.5px] font-semibold text-white hover:bg-greenDark">
              + Tambah Kelas
            </button>
          </div>

          <Tabs tabs={TABS} value={cat} onChange={setCat} className="mb-7" />

          {/* UPDATE (ikon pensil) & DELETE (ikon sampah) ada di setiap kartu */}
          <ListView courses={list} onEdit={crud.openEdit} onDelete={crud.askDelete}
            emptyText="Belum ada kelas di kategori ini. Klik “+ Tambah Kelas” untuk membuat yang baru." />
        </section>

        <section className="mx-auto mt-20 max-w-[1180px] px-6">
          <div className="rounded-[22px] bg-gradient-to-br from-[#17231C] to-[#101813] px-6 py-12 text-center text-white sm:px-10">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-[#C9C3B5]">NEWSLETTER</p>
            <h2 className="mb-2 font-head text-2xl font-semibold">Mau Belajar Lebih Banyak?</h2>
            <p className="mx-auto mb-6 max-w-[480px] text-sm text-[#C9C3B5]">
              Daftarkan dirimu dan dapatkan informasi terbaru seputar update kelas terbaru dari videobelajar.
            </p>
            <form onSubmit={subscribe} className="mx-auto flex max-w-[460px] flex-col gap-2.5 sm:flex-row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email" aria-label="Email"
                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-[#8C877A] focus:border-orange focus:outline-none" />
              <button type="submit"
                className="h-12 rounded-full border-0 bg-orange px-6 text-sm font-semibold text-white hover:bg-[#DD8636]">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      {crud.dialogs}
      {toastNode}
    </PageLayout>
  );
}
