import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import * as api from "./services/api/courseService";
import useDataStore from "./store/zustand/useDataStore";

// Service API di-mock supaya test tidak memanggil jaringan.
// (fungsi biasa, bukan jest.fn, karena CRA me-reset mock di tiap test)
jest.mock("./services/api/courseService", () => {
  const { INITIAL_COURSES } = jest.requireActual("./data/courses");
  let db = INITIAL_COURSES.map((c) => ({ ...c }));
  return {
    getCourses: async () => db.map((c) => ({ ...c })).sort((a, b) => b.id - a.id),
    createCourse: async (p) => { const c = { ...p, id: Date.now() }; db = [c, ...db]; return c; },
    updateCourse: async (id, p) => { const c = { ...p, id }; db = db.map((x) => (x.id === id ? c : x)); return c; },
    deleteCourse: async (id) => { db = db.filter((x) => x.id !== id); return id; },
  };
});

// Store Zustand bersifat global, jadi dikembalikan ke kondisi awal sebelum tiap test.
beforeEach(() => useDataStore.setState(useDataStore.getInitialState(), true));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("menampilkan halaman login secara default", async () => {
  renderAt("/login");
  expect(screen.getByText(/Masuk ke Akun/i)).toBeInTheDocument();
});

test("beranda memuat kelas dari API lalu bisa menghapus (CRUD)", async () => {
  renderAt("/beranda");
  expect(screen.getByRole("status")).toHaveTextContent(/Memuat/);
  const cards = await screen.findAllByRole("article");
  const before = cards.length;

  fireEvent.click(screen.getAllByLabelText(/^Hapus /)[0]);
  fireEvent.click(screen.getByRole("button", { name: "Hapus" }));
  await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(before - 1));
});

test("menampilkan pesan error dan tombol coba lagi saat API gagal", async () => {
  const spy = jest.spyOn(api, "getCourses").mockRejectedValueOnce(new Error("Server sedang bermasalah (500)."));
  try {
    renderAt("/beranda");
    expect(await screen.findByRole("alert")).toHaveTextContent(/Server sedang bermasalah/);
    fireEvent.click(screen.getByText("Coba lagi"));
    expect((await screen.findAllByRole("article")).length).toBeGreaterThan(0);
  } finally {
    spy.mockRestore();
  }
});

test("alur beli: detail kelas -> checkout -> berhasil", async () => {
  renderAt("/kelas/2");
  fireEvent.click(await screen.findByText("Beli Sekarang"));
  fireEvent.click(screen.getByLabelText(/Bank BCA/));
  fireEvent.click(screen.getByText("Bayar Sekarang"));
  fireEvent.click(screen.getByText("Bayar Sekarang"));
  expect(screen.getByText(/Pembayaran Berhasil/)).toBeInTheDocument();
});

test("menambah kelas dengan URL gambar menampilkan gambar di kartu", async () => {
  const { container } = renderAt("/beranda");
  await screen.findAllByRole("article");

  fireEvent.click(screen.getByText("+ Tambah Kelas"));
  fireEvent.change(screen.getByLabelText(/Judul Kelas/), { target: { value: "Kelas Bergambar" } });
  fireEvent.change(screen.getByLabelText(/Nama Mentor/), { target: { value: "Budi" } });
  fireEvent.change(screen.getByLabelText(/Harga/), { target: { value: "100000" } });
  fireEvent.change(screen.getByLabelText(/Durasi/), { target: { value: "3" } });
  fireEvent.change(screen.getByLabelText("URL gambar"), { target: { value: "https://example.com/a.jpg" } });
  fireEvent.click(screen.getByRole("button", { name: "Tambah Kelas" }));

  await waitFor(() => expect(container.querySelector('img[src="https://example.com/a.jpg"]')).toBeInTheDocument());
});

test("URL gambar yang tidak valid ditolak", async () => {
  renderAt("/beranda");
  await screen.findAllByRole("article");
  fireEvent.click(screen.getByText("+ Tambah Kelas"));
  fireEvent.change(screen.getByLabelText("URL gambar"), { target: { value: "bukan-url" } });
  fireEvent.click(screen.getByRole("button", { name: "Tambah Kelas" }));
  expect(await screen.findByText(/URL gambar harus diawali/)).toBeInTheDocument();
});
