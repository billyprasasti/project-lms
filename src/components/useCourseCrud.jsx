import { useState } from "react";
import CourseFormModal from "./CourseFormModal";
import Modal from "./Modal";
import useToast from "./useToast";
import { btnPrimary, btnOutline } from "./ui";

// Mengelola dialog Create / Update / Delete untuk array `courses` (state ada di App.js)
export default function useCourseCrud({ onAdd, onUpdate, onDelete }) {
  const [form, setForm] = useState({ open: false, course: null });
  const [toDelete, setToDelete] = useState(null);
  const { notify, toastNode } = useToast();

  const close = () => setForm({ open: false, course: null });

  const save = (data) => {
    if (form.course) {
      onUpdate(form.course.id, data);
      notify("Kelas berhasil diperbarui.");
    } else {
      onAdd(data);
      notify("Kelas baru berhasil ditambahkan.");
    }
    close();
  };

  const confirmDelete = () => {
    onDelete(toDelete.id);
    setToDelete(null);
    notify("Kelas berhasil dihapus.");
  };

  const dialogs = (
    <>
      {form.open && <CourseFormModal course={form.course} onSubmit={save} onClose={close} />}
      {toDelete && (
        <Modal title="Hapus kelas?" onClose={() => setToDelete(null)}>
          <p className="mb-5 text-sm text-inkSoft">
            Kelas <strong className="text-ink">{toDelete.title}</strong> akan dihapus dari daftar.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setToDelete(null)} className={btnOutline}>Batal</button>
            <button onClick={confirmDelete} className={`${btnPrimary} !bg-red`}>Hapus</button>
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
