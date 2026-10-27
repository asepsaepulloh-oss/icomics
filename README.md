# 📖 iComic — Modern Neumorphism Manga & Comic Reader

iComic adalah platform baca komik (Manga, Manhwa, Manhua) modern dengan desain **Neumorphism / Soft UI** yang terintegrasi langsung dengan live REST API `https://apis.louiv.me/api`.

---

## ✨ Fitur Utama

- **🎨 Neumorphic Design System (Soft UI)**: Antarmuka elegan dengan dual-tone soft shadows, tactile inset inputs & raised buttons, serta Dark/Light mode toggle.
- **🚀 Live Manga API Integration**: Data live dari `https://apis.louiv.me/api` untuk daftar komik populer, chapter terbaru, detail manga, dan pencarian judul.
- **🖼️ Image Proxy Built-in**: Seluruh gambar halaman komik dimuat melalui proxy API aman untuk mengatasi kendala hotlink protection.
- **📖 Dual-Mode Reader**:
  - **Long Strip Mode**: Membaca komik secara vertikal dari atas ke bawah (cocok untuk webtoon/manhwa).
  - **Single Page Mode**: Membaca per halaman dengan navigasi tombol atau klik.
  - Pengaturan lebar bacaan (*Max Width adjustment*).
- **📚 LocalStorage Persistence**: Riwayat bacaan (*Reading History*) & komik favorit (*Favorites*) tersimpan otomatis di perangkat pengguna tanpa registrasi akun.
- **📱 Fully Responsive**: Pengalaman membaca nyaman di smartphone, tablet, maupun monitor desktop.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Custom Neumorphism Shadows)
- **Icons**: Lucide React

---

## 🚀 Local Development

```bash
git clone https://github.com/asepsaepulloh-oss/icomics.git
cd icomics
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## 📦 Deployment ke Vercel

```bash
npm run build
```

Environment Variable:
```env
NEXT_PUBLIC_MANGA_API_BASE_URL=https://apis.louiv.me/api
```

---

## 📄 Lisensi

MIT License © 2026 [Asep Saepulloh](https://github.com/asepsaepulloh-oss)
