# videobelajar (React + Tailwind + MockAPI)

## 1. Pasang & jalankan
```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
# isi REACT_APP_API_URL di .env (lihat langkah 2), lalu:
npm run seed              # sekali saja: mengisi data awal ke MockAPI
npm start
```

## 2. Siapkan MockAPI (https://mockapi.io)
1. Daftar/login, klik **New Project** (nama bebas), lalu buka project-nya.
2. **Endpoint** = URL di bagian atas project, contoh `https://6650abcd.mockapi.io/api/v1`.
3. Klik **New Resource**, beri nama persis `courses`, lalu tambahkan field berikut:

| Field | Tipe |
|---|---|
| cat, category, title, desc, mentor, role, company, reviews, image | String |
| rating, price, duration | Number |

4. Salin endpoint ke `.env`:
```
REACT_APP_API_URL=https://6650abcd.mockapi.io/api/v1
```
5. Restart `npm start` setiap kali `.env` diubah.

## 3. Struktur lapisan API
```
src/
├── services/api/client.js         # instance Axios + interceptor, baseURL dari .env
├── services/api/courseService.js  # getCourses, getCourse, createCourse, updateCourse, deleteCourse
├── store/zustand/useDataStore.js    # Zustand store: state courses + loading/error + fetchData, addData, updateData, deleteData
├── components/ListView.jsx            # menampilkan daftar kelas dari store
└── components/DataStatus.jsx      # tampilan loading / error + tombol "Coba lagi"
scripts/seed.js                    # mengisi data awal ke MockAPI
```

## 3b. State management (Zustand)
Data kelas disimpan di satu store: `src/store/zustand/useDataStore.js`
(state `courses`, `loading`, `error`; action `fetchData`, `addData`, `updateData`, `deleteData`).
`fetchData` dipanggil sekali di `App.js`; halaman membaca data lewat `useDataStore((s) => s.courses)`
dan daftar kelas ditampilkan oleh `components/ListView.jsx`.
Setelah menarik project ini, jalankan `npm install` agar `zustand` terpasang.

## 4. Gambar kelas
Di form tambah/edit kelas, gambar bisa diisi dengan **upload file** atau **tempel URL**.
File dikecilkan (maks 640px, JPEG) lalu disimpan sebagai teks di field `image`.
Untuk data awal, isi `image` di `scripts/seed-courses.json` dengan URL gambar sebelum menjalankan `npm run seed`.
