import axios from "axios";

// URL dasar API disimpan di file .env (REACT_APP_API_URL), bukan di-hardcode.
const baseURL = process.env.REACT_APP_API_URL;
const isDev = process.env.NODE_ENV === "development";

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// ---------- Interceptor request: cek konfigurasi, header, otorisasi, logging ----------
client.interceptors.request.use((config) => {
  if (!baseURL) {
    return Promise.reject(
      new Error(
        "REACT_APP_API_URL belum diatur. Salin .env.example menjadi .env, isi URL MockAPI, lalu restart npm start."
      )
    );
  }
  const token = localStorage.getItem("token"); // siap dipakai kalau nanti ada login sungguhan
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (isDev) console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data ?? "");
  return config;
});

// ---------- Interceptor response: log + pesan error yang ramah pengguna ----------
client.interceptors.response.use(
  (response) => {
    if (isDev) console.log(`[API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    let message = error.message;
    if (error.response) {
      const status = error.response.status;
      if (status === 404) message = "Data tidak ditemukan (404).";
      else if (status === 429) message = "Terlalu banyak permintaan ke server, coba lagi sebentar lagi (429).";
      else if (status >= 500) message = `Server sedang bermasalah (${status}).`;
      else message = `Permintaan gagal (${status}).`;
    } else if (error.request) {
      message = "Tidak dapat terhubung ke server. Periksa koneksi internet kamu.";
    }
    if (isDev) console.error("[API] error:", message);
    return Promise.reject(Object.assign(new Error(message), { status: error.response?.status }));
  }
);

export default client;
