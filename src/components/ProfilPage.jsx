import { useRef, useState } from "react";
import AccountLayout from "./AccountLayout";
import Avatar from "./Avatar";
import { Field } from "./Field";
import useToast from "./useToast";
import { inputCls } from "./ui";

const CODES = ["+62", "+60", "+65", "+1", "+44"];

export default function ProfilPage({ profile, onSave }) {
  const [form, setForm] = useState(profile);
  const [err, setErr] = useState({});
  const fileRef = useRef(null);
  const { notify, toastNode } = useToast();

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const pickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm({ ...form, photo: URL.createObjectURL(file) });
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Nama wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Format e-mail tidak valid.";
    if (!/^\d{8,13}$/.test(form.phone)) er.phone = "No. Hp harus 8-13 digit angka.";
    setErr(er);
    if (Object.keys(er).length) return;
    onSave({ ...form, name: form.name.trim() });
    notify("Profil berhasil disimpan.");
  };

  return (
    <AccountLayout profile={profile} active="profil" title="Ubah Profil" subtitle="Ubah data diri Anda">
      <div className="mb-6 flex items-center gap-4">
        <Avatar profile={form} size="h-16 w-16" text="text-xl" />
        <div>
          <div className="font-head text-base font-semibold">{form.name || "Nama Lengkap"}</div>
          <div className="mb-0.5 text-[13px] text-inkSoft">{form.email}</div>
          <button type="button" onClick={() => fileRef.current.click()}
            className="border-0 bg-transparent p-0 text-xs font-semibold text-red">Ganti Foto Profil</button>
          <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} className="hidden" aria-label="Pilih foto profil" />
        </div>
      </div>

      <form onSubmit={submit} noValidate>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field id="name" label="Nama Lengkap" required value={form.name} onChange={set} error={err.name} />
          <Field id="email" label="E-Mail" required type="email" value={form.email} onChange={set} error={err.email} />
        </div>
        <div className="mb-[18px]">
          <label htmlFor="phone" className="mb-1.5 block text-[13.5px] font-semibold">No. Hp<span className="ml-0.5 text-red">*</span></label>
          <div className="flex gap-2">
            <select name="code" aria-label="Kode negara" value={form.code} onChange={set}
              className={`${inputCls} w-24 flex-none border-line`}>
              {CODES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={set}
              className={`${inputCls} flex-1 ${err.phone ? "border-red" : "border-line focus:border-green"}`} />
          </div>
          {err.phone && <p className="mt-1 text-xs text-red">{err.phone}</p>}
        </div>
        <div className="flex justify-end">
          <button type="submit" className="h-10 rounded-md border-0 bg-green px-8 text-[13px] font-semibold text-white hover:bg-greenDark">Simpan</button>
        </div>
      </form>
      {toastNode}
    </AccountLayout>
  );
}
