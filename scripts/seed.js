/* Mengisi resource "courses" di MockAPI dengan data awal.
 *
 * Pemakaian:
 *   npm run seed                       (membaca REACT_APP_API_URL dari .env)
 *   npm run seed -- https://xxx.mockapi.io/api/v1
 *   npm run seed -- --force            (tetap menambah walau resource sudah berisi)
 *
 * Data dikirim dari yang TERAKHIR ke yang pertama, karena aplikasi mengurutkan
 * dari id terbesar (terbaru di atas). Dengan begitu tampilan awal sama dengan urutan di file.
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const readEnvFile = () => {
  try {
    const text = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
    const m = text.match(/^REACT_APP_API_URL=(.+)$/m);
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
  } catch {
    return "";
  }
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const base = (args.find((a) => a.startsWith("http")) || process.env.REACT_APP_API_URL || readEnvFile()).replace(/\/$/, "");

if (!base) {
  console.error("REACT_APP_API_URL belum diatur. Isi file .env atau beri URL: npm run seed -- https://xxx.mockapi.io/api/v1");
  process.exit(1);
}

const courses = require("./seed-courses.json");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const { data: existing } = await axios.get(`${base}/courses`);
  if (existing.length > 0 && !force) {
    console.log(`Resource "courses" sudah berisi ${existing.length} data. Dihentikan. Pakai --force untuk tetap menambah.`);
    return;
  }
  for (const c of [...courses].reverse()) {
    const { data } = await axios.post(`${base}/courses`, c);
    console.log(`OK  id=${data.id}  ${c.title}`);
    await sleep(250); // hindari rate limit MockAPI
  }
  console.log(`Selesai: ${courses.length} kelas ditambahkan.`);
})().catch((e) => {
  console.error("Gagal:", e.response ? `${e.response.status} ${JSON.stringify(e.response.data)}` : e.message);
  process.exit(1);
});
