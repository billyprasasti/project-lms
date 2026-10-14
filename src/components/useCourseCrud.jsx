import { useState } from "react";
import CourseFormModal from "./CourseFormModal";
import Modal from "./Modal";
import useToast from "./useToast";
import { btnPrimary, btnOutline } from "./ui";

// Dialog Create / Update / Delete. Aksi memanggil API (lewat context), jadi async.
export default function useCourseCrud({ onAdd, onUpdate, onDelete }) {
  const [form, setForm] = useState({ open: false, course: null });
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const { notify, toastNode } = useToast();

  const close = () => setForm({ open: false, course: null });

  const run = async (action, okMessage, after) => {
    setBusy(true);
    try {
      await action();
      notify(okMessage);
      after();
    } catch (e) {
      notify(`Gagal: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };

  const save = (data) =>
    form.course
      ? run(() => onUpdate(form.course.id, data), "Kelas berhasil diperbarui.", close)
      : run(() => onAdd(data), "Kelas baru berhasil ditambahkan.", close);

  const confirmDelete = () =>
    run(() => onDelete(toDelete.id), "Kelas berhasil dihapus.", () => setToDelete(null));

  const dialogs = (
    <>
      {form.open && <CourseFormModal course={form.course} onSubmit={save} onClose={close} busy={busy} />}
      {toDelete && (
        <Modal title="Hapus kelas?" onClose={() => setToDelete(null)}>
          <p className="mb-5 text-sm text-inkSoft">
            Kelas <strong className="text-ink">{toDelete.title}</strong> akan dihapus dari daftar.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setToDelete(null)} disabled={busy} className={btnOutline}>Batal</button>
            <button onClick={confirmDelete} disabled={busy} className={`${btnPrimary} !bg-red disabled:opacity-60`}>
              {busy ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </Modal>
      )}
      {toastNode}
    </>
  );

  return {
    openAdd: () => setForm({ open: true, course: null }),
    openEdit: (course) => setForm({ open: true, course }),
    askDelete: setToDelete,
    dialogs,
  };
}
