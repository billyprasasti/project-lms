import { INITIAL_COURSES, ADMIN_FEE } from "./courses";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export const formatDateTime = (ts) => {
  const d = new Date(ts);
  const tgl = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const jam = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return `${tgl}, ${jam}`;
};

const mkOrder = (id, courseId, status, ts) => {
  const c = INITIAL_COURSES.find((x) => x.id === courseId);
  return { id, invoice: `HEL/VI/1006202${id}`, courseId, title: c.title, cat: c.cat, price: c.price, total: c.price + ADMIN_FEE, ts, status };
};
const T = (d, h, m) => new Date(2023, 5, d, h, m).getTime();

export const INITIAL_ORDERS = [
  mkOrder(1, 1, "Berhasil", T(10, 14, 17)),
  mkOrder(2, 2, "Gagal", T(10, 13, 5)),
  mkOrder(3, 3, "Belum Bayar", T(9, 20, 41)),
  mkOrder(4, 4, "Berhasil", T(8, 9, 30)),
  mkOrder(5, 5, "Berhasil", T(7, 16, 2)),
  mkOrder(6, 8, "Berhasil", T(5, 11, 48)),
];

// id kelas dibuat oleh server, jadi data awal "Kelas Saya" dicocokkan lewat judul kelas
export const ENROLLMENT_SEEDS = [
  { title: "Belajar Analisis Laporan Keuangan dari Nol", done: 12, total: 12 },
  { title: "Merancang Antarmuka yang Mudah Digunakan", done: 4, total: 12 },
  { title: "Membangun Website Interaktif dengan React", done: 3, total: 12 },
];

export const INITIAL_PROFILE = {
  name: "Jennie Ruby Jane",
  email: "rubyjane@gmail.com",
  code: "+62",
  phone: "81234567890",
  photo: "",
};
