import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("menampilkan halaman login secara default", () => {
  renderAt("/login");
  expect(screen.getByText(/Masuk ke Akun/i)).toBeInTheDocument();
});

test("beranda menampilkan kelas dan bisa menghapus (CRUD)", () => {
  renderAt("/beranda");
  expect(screen.getByText(/Revolusi Pembelajaran/i)).toBeInTheDocument();
  const before = screen.getAllByRole("article").length;
  fireEvent.click(screen.getAllByLabelText(/^Hapus /)[0]);
  fireEvent.click(screen.getByRole("button", { name: "Hapus" }));
  expect(screen.getAllByRole("article").length).toBe(before - 1);
});

test("alur beli: detail kelas -> checkout -> berhasil", () => {
  renderAt("/kelas/2");
  fireEvent.click(screen.getByText("Beli Sekarang"));
  fireEvent.click(screen.getByLabelText(/Bank BCA/));
  fireEvent.click(screen.getByText("Bayar Sekarang"));
  fireEvent.click(screen.getByText("Bayar Sekarang"));
  expect(screen.getByText(/Pembayaran Berhasil/)).toBeInTheDocument();
});
