import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BerandaPage from "./components/BerandaPage";
import KategoriPage from "./components/KategoriPage";
import KelasDetailPage from "./components/KelasDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import BelajarPage from "./components/BelajarPage";
import PesananPage from "./components/PesananPage";
import KelasSayaPage from "./components/KelasSayaPage";
import ProfilPage from "./components/ProfilPage";
import useDataStore from "./store/zustand/useDataStore";
import { ADMIN_FEE } from "./data/courses";
import { INITIAL_ORDERS, ENROLLMENT_SEEDS, INITIAL_PROFILE, ROMAN } from "./data/account";

function AppRoutes() {
  // Data kelas ada di Zustand store (diambil dari API). State lain masih lokal.
  const courses = useDataStore((s) => s.courses);
  const loading = useDataStore((s) => s.loading);
  const fetchData = useDataStore((s) => s.fetchData);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [enrollments, setEnrollments] = useState([]);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const seeded = useRef(false);

  // GET: ambil data kelas dari API sekali saat aplikasi dibuka, simpan ke store
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  // Isi "Kelas Saya" awal sekali, setelah data kelas dari API selesai dimuat
  useEffect(() => {
    if (loading || seeded.current || courses.length === 0) return;
    seeded.current = true;
    setEnrollments(
      ENROLLMENT_SEEDS.map((s) => {
        const c = courses.find((x) => x.title === s.title);
        return c ? { courseId: c.id, done: s.done, total: s.total } : null;
      }).filter(Boolean)
    );
  }, [loading, courses]);

  // Pesanan baru dari checkout; kalau berhasil, kelas masuk ke "Kelas Saya"
  const addOrder = (o) => {
    const ts = Date.now();
    const invoice = `HEL/${ROMAN[new Date(ts).getMonth()]}/${String(ts).slice(-8)}`;
    setOrders((prev) => [{ ...o, id: ts, invoice, ts, total: o.price + ADMIN_FEE }, ...prev]);
    if (o.status === "Berhasil")
      setEnrollments((prev) =>
        prev.some((e) => e.courseId === o.courseId) ? prev : [...prev, { courseId: o.courseId, done: 0, total: 12 }]
      );
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/beranda" element={<BerandaPage profile={profile} />} />
      <Route path="/kategori" element={<KategoriPage profile={profile} />} />
      <Route path="/kelas/:id" element={<KelasDetailPage enrollments={enrollments} profile={profile} />} />
      <Route path="/checkout/:id" element={<CheckoutPage onOrder={addOrder} />} />
      <Route path="/belajar/:id" element={<BelajarPage />} />
      <Route path="/pesanan" element={<PesananPage orders={orders} profile={profile} />} />
      <Route path="/kelas-saya" element={<KelasSayaPage enrollments={enrollments} profile={profile} />} />
      <Route path="/profil" element={<ProfilPage profile={profile} onSave={setProfile} />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
