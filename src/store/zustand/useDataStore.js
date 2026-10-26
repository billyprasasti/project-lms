import { create } from "zustand";
import * as api from "../../services/api/courseService";

// Zustand store: satu-satunya sumber data kelas (courses) di seluruh aplikasi.
// Semua komponen membaca state dari sini; semua perubahan data lewat action di bawah,
// yang memanggil fungsi API di services/api lalu menyinkronkan hasilnya ke state.
const useDataStore = create((set, get) => ({
  // ---------- State ----------
  courses: [],
  loading: true, // true sejak awal supaya tidak ada kedipan "data kosong" sebelum fetch pertama
  error: "",

  // ---------- GET ----------
  // Mengambil semua kelas dari API dan menyimpannya ke state.
  // `signal` (opsional) dari AbortController: kalau dibatalkan, state tidak diubah.
  fetchData: async (signal) => {
    set({ loading: true, error: "" });
    try {
      const data = await api.getCourses(signal);
      if (!signal?.aborted) set({ courses: data, loading: false });
    } catch (e) {
      if (!signal?.aborted) set({ error: e.message, loading: false });
    }
  },

  // ---------- ADD ----------
  // POST ke API; setelah berhasil, data baru langsung ditaruh di paling atas state.
  addData: async (data) => {
    const created = await api.createCourse({ ...data, reviews: "0" });
    set((state) => ({ courses: [created, ...state.courses] }));
    return created;
  },

  // ---------- EDIT ----------
  // PUT ke API; setelah berhasil, item dengan id yang sama diganti di state.
  updateData: async (id, data) => {
    const existing = get().courses.find((c) => c.id === id);
    const updated = await api.updateCourse(id, { ...existing, ...data });
    set((state) => ({ courses: state.courses.map((c) => (c.id === id ? updated : c)) }));
    return updated;
  },

  // ---------- DELETE ----------
  // DELETE ke API; setelah berhasil, item dibuang dari state.
  deleteData: async (id) => {
    await api.deleteCourse(id);
    set((state) => ({ courses: state.courses.filter((c) => c.id !== id) }));
  },
}));

export default useDataStore;
