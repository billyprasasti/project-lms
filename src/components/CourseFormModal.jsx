import { useState } from "react";
import Modal from "./Modal";
import CourseImage from "./CourseImage";
import { fileToDataUrl } from "../utils/image";
import { Field } from "./Field";
import { CATEGORIES, catLabel } from "../data/courses";
import { inputCls, btnPrimary, btnOutline } from "./ui";

const EMPTY = {
  title: "", category: "", cat: "bisnis", desc: "", image: "",
  mentor: "", role: "", company: "",
  price: "", duration: "", rating: "",
};

export default function CourseFormModal({ course, onSubmit, onClose, busy = false }) {
  const isEdit = Boolean(course);
  const [v, setV] = useState(course ?? EMPTY);
  const [err, setErr] = useState({});
  const [imgBusy, setImgBusy] = useState(false);
  const image = v.image || "";

  const set = (e) => setV({ ...v, [e.target.name]: e.target.value });

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // supaya file yang sama bisa dipilih lagi
    if (!file) return;
    const fail = (msg) => setErr((x) => ({ ...x, image: msg }));
    if (!file.type.startsWith("image/")) return fail("File harus berupa gambar.");
    if (file.size > 8 * 1024 * 1024) return fail("Ukuran file maksimal 8 MB.");
    setImgBusy(true);
    try {
      const url = await fileToDataUrl(file);
      setV((cur) => ({ ...cur, image: url }));
      setErr((x) => ({ ...x, image: undefined }));
    } catch (ex) {
      fail(ex.message);
    } finally {
      setImgBusy(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!v.title.trim()) er.title = "Judul wajib diisi.";
    if (image && !/^(https?:\/\/|data:image\/)/i.test(image)) er.image = "URL gambar harus diawali http:// atau https://";
    if (!v.mentor.trim()) er.mentor = "Nama mentor wajib diisi.";
    if (!(Number(v.price) > 0)) er.price = "Harga harus lebih dari 0.";
    if (!(Number(v.duration) > 0)) er.duration = "Durasi harus lebih dari 0.";
    const rating = Number(v.rating || 0);
    if (rating < 0 || rating > 5) er.rating = "Rating antara 0 sampai 5.";
    setErr(er);
    if (Object.keys(er).length) return;

    onSubmit({
      ...v,
      title: v.title.trim(),
      category: v.category.trim() || catLabel(v.cat),
      mentor: v.mentor.trim(),
      role: v.role.trim() || "Mentor",
      company: v.company.trim() || "videobelajar",
      price: Number(v.price),
      duration: Number(v.duration),
      rating,
    });
  };

  return (
    <Modal title={isEdit ? "Edit Kelas" : "Tambah Kelas Baru"} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <Field id="title" label="Judul Kelas" required value={v.title} onChange={set}
          placeholder="Contoh: Belajar React dari Nol" error={err.title} />
        <Field id="category" label="Sub-judul / Profesi" value={v.category} onChange={set}
          placeholder="Contoh: Frontend Web Developer" />

        <div className="mb-[18px]">
          <label htmlFor="cat" className="mb-1.5 block text-[13.5px] font-semibold">Bidang Studi</label>
          <select id="cat" name="cat" value={v.cat} onChange={set} className={`${inputCls} border-line focus:border-green`}>
            {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>

        <div className="mb-[18px]">
          <span className="mb-1.5 block text-[13.5px] font-semibold">Gambar Kelas</span>
          <CourseImage src={image} cat={v.cat} className="mb-3 aspect-[16/9] w-full rounded-lg" />
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <label className="flex h-9 cursor-pointer items-center rounded-md border border-green bg-white px-4 text-[13px] font-semibold text-green hover:bg-greenPale">
              {imgBusy ? "Memproses..." : "Upload gambar"}
              <input type="file" accept="image/*" onChange={pickFile} disabled={imgBusy} className="sr-only" aria-label="Upload gambar kelas" />
            </label>
            {image && (
              <button type="button" onClick={() => setV({ ...v, image: "" })}
                className="border-0 bg-transparent p-0 text-xs font-semibold text-red">Hapus gambar</button>
            )}
            {image.startsWith("data:") && <span className="text-xs text-inkSoft">Gambar dari file terpilih</span>}
          </div>
          <input id="image" name="image" type="text" aria-label="URL gambar" placeholder="Atau tempel URL gambar (https://...)"
            value={image.startsWith("data:") ? "" : image} onChange={set}
            className={`${inputCls} ${err.image ? "border-red" : "border-line focus:border-green"}`} />
          {err.image && <p className="mt-1 text-xs text-red">{err.image}</p>}
        </div>

        <div className="mb-[18px]">
          <label htmlFor="desc" className="mb-1.5 block text-[13.5px] font-semibold">Deskripsi</label>
          <textarea id="desc" name="desc" rows={3} value={v.desc} onChange={set}
            className="w-full rounded-lg border border-line p-3.5 text-[14.5px] focus:border-green focus:outline-none" />
        </div>

        <div className="grid gap-x-3 sm:grid-cols-2">
          <Field id="mentor" label="Nama Mentor" required value={v.mentor} onChange={set} error={err.mentor} />
          <Field id="role" label="Jabatan Mentor" value={v.role} onChange={set} />
          <Field id="company" label="Perusahaan" value={v.company} onChange={set} />
          <Field id="price" label="Harga (Rp)" required type="number" min="0" value={v.price} onChange={set} error={err.price} />
          <Field id="duration" label="Durasi (jam)" required type="number" min="0" value={v.duration} onChange={set} error={err.duration} />
          <Field id="rating" label="Rating (0-5)" type="number" step="0.1" min="0" max="5" value={v.rating} onChange={set} error={err.rating} />
        </div>

        <div className="mt-2 flex gap-3">
          <button type="button" onClick={onClose} className={btnOutline}>Batal</button>
          <button type="submit" disabled={busy} className={`${btnPrimary} disabled:opacity-60`}>
            {busy ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Kelas"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
