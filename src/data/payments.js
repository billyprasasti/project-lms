export const PAYMENT_GROUPS = [
  { key: "bank", title: "Transfer Bank", methods: [
    { id: "bca", name: "Bank BCA", short: "BCA", color: "bg-blue-600", prefix: "11739" },
    { id: "bni", name: "Bank BNI", short: "BNI", color: "bg-orange", prefix: "88080" },
    { id: "bri", name: "Bank BRI", short: "BRI", color: "bg-sky-700", prefix: "26215" },
    { id: "mandiri", name: "Bank Mandiri", short: "Mandiri", color: "bg-amber-400", prefix: "88608" },
  ] },
  { key: "ewallet", title: "E-Wallet", methods: [
    { id: "dana", name: "Dana", short: "DANA", color: "bg-sky-500", prefix: "39358" },
    { id: "ovo", name: "OVO", short: "OVO", color: "bg-violet-600", prefix: "93210" },
    { id: "linkaja", name: "LinkAja", short: "LinkAja", color: "bg-red", prefix: "70012" },
    { id: "shopeepay", name: "ShopeePay", short: "ShopeePay", color: "bg-orange", prefix: "19922" },
  ] },
  { key: "card", title: "Kartu Kredit/Debit", methods: [
    { id: "card", name: "Kartu Kredit/Debit", short: "Kartu", color: "bg-ink", prefix: "" },
  ] },
];

export const ALL_METHODS = PAYMENT_GROUPS.flatMap((g) => g.methods.map((m) => ({ ...m, group: g.key })));

export const vaNumber = (m) => `${m.prefix} 081234567890`;

// Tata cara pembayaran per metode
export function howTo(m) {
  if (m.group === "bank")
    return [
      { title: `ATM ${m.short}`, steps: [
        `Masukkan kartu ATM dan PIN ${m.short} Anda`,
        'Di menu utama, pilih "Transaksi Lainnya", lalu pilih "Transfer"',
        `Pilih "Ke ${m.short} Virtual Account"`,
        "Masukkan nomor Virtual Account",
        "Pastikan data Virtual Account sudah benar, lalu masukkan nominal yang perlu dibayarkan",
        'Cek konfirmasi pembayaran di layar, lalu pilih "Ya"',
        "Transaksi Anda sudah selesai",
      ] },
      { title: `Mobile Banking ${m.short}`, steps: [
        `Buka aplikasi ${m.short} Mobile`,
        'Pilih menu "Transfer", lalu pilih "Virtual Account"',
        "Masukkan nomor Virtual Account, lalu pilih OK",
        "Periksa nominal pembayaran dan detail tujuan transfer",
        "Masukkan PIN Anda untuk mengotorisasi transaksi",
        "Transaksi Anda telah selesai",
      ] },
      { title: `Internet Banking ${m.short}`, steps: [
        `Login ke internet banking ${m.short} Anda`,
        'Pilih menu "Transfer", lalu "Virtual Account"',
        "Masukkan nomor Virtual Account",
        'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
        "Masukkan kode otorisasi yang diminta, lalu klik kirim",
        "Pembayaran telah selesai",
      ] },
    ];
  if (m.group === "ewallet")
    return [
      { title: `Aplikasi ${m.name}`, steps: [
        `Buka aplikasi ${m.name} di ponselmu`,
        'Pilih menu "Bayar" lalu masukkan kode pembayaran',
        "Periksa nominal dan detail pesanan",
        "Konfirmasi dengan PIN atau biometrik",
        "Pembayaran selesai",
      ] },
    ];
  return [
    { title: "Kartu Kredit/Debit", steps: [
      "Masukkan nomor kartu, tanggal kedaluwarsa, dan kode CVV",
      "Periksa nominal pembayaran",
      "Masukkan kode OTP yang dikirim ke ponselmu",
      "Pembayaran selesai",
    ] },
  ];
}
