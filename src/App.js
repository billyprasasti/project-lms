import { useState } from "react";
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
import { INITIAL_COURSES, ADMIN_FEE } from "./data/courses";
import { INITIAL_ORDERS, INITIAL_ENROLLMENTS, INITIAL_PROFILE, ROMAN } from "./data/account";

function App() {
  // Semua state utama (array of object) ada di parent, lalu di-passing lewat props.
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  // CRUD kelas
  const addCourse = (data) =>
    setCourses((prev) => [{ ...data, id: Date.now(), reviews: "0" }, ...prev]);
  const updateCourse = (id, data) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  const deleteCourse = (id) =>
    setCourses((prev) => prev.filter((c) => c.id !== id));

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

  const crud = { courses, profile, onAdd: addCourse, onUpdate: updateCourse, onDelete: deleteCourse };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/beranda" element={<BerandaPage {...crud} />} />
      <Route path="/kategori" element={<KategoriPage {...crud} />} />
      <Route path="/kelas/:id" element={<KelasDetailPage courses={courses} enrollments={enrollments} profile={profile} />} />
      <Route path="/checkout/:id" element={<CheckoutPage courses={courses} onOrder={addOrder} />} />
      <Route path="/belajar/:id" element={<BelajarPage courses={courses} />} />
      <Route path="/pesanan" element={<PesananPage orders={orders} profile={profile} />} />
      <Route path="/kelas-saya" element={<KelasSayaPage courses={courses} enrollments={enrollments} profile={profile} />} />
      <Route path="/profil" element={<ProfilPage profile={profile} onSave={setProfile} />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
