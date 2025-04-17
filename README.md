# QR Code Generator

Aplikasi web untuk membuat dan mengelola QR code aman, dibuat dengan React.js, Hono.js, dan Supabase.

## 🤖 Demo URL

- https://qrku-lyart.vercel.app/

## 📋 Deskripsi

QR Code Generator adalah aplikasi web modern yang memungkinkan pengguna membuat QR code dengan proteksi kata sandi untuk keamanan tambahan. Aplikasi ini menggunakan React.js untuk antarmuka, Hono.js untuk backend, dan Supabase untuk penyimpanan data. Data QR code otomatis dihapus setiap hari pukul 00:00 WIB via cron job.

## ✨ Fitur

- Membuat QR code dengan keamanan kata sandi yang di encrypt
- Menampilkan daftar QR code yang tersimpan
- Proteksi kata sandi untuk melihat dan menghapus QR code
- QR code automatis terhapus pada pukul (00:00 WIB)
- Tampilan responsif untuk HP dan desktop

## 🚀 Cara Menjalankan

1. **Install Bun (jika belum)**

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependensi**

   ```bash
   bun install
   ```

3. **Atur variabel lingkungan**

   - Buat file `.dev.vars` di `packages/hono/`:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_KEY=your-service-role-key
     ```

4. **Jalankan aplikasi**

   - Frontend:
     ```bash
     cd apps/web
     bun run dev
     ```
   - Backend:
     ```bash
     cd apps/api
     bun run dev 
     ```

  - Atau Jalankan Pararel dari Root Project, Navigasikan ke root proyek: 
     ```bash
     cd qrku
     ```
     ```bash
     bun run dev 
     ```

## 📋 Persyaratan Sistem

- Bun runtime
- Akun Cloudflare (untuk deployment)
- Akun Supabase
- Koneksi internet untuk Supabase  

## 🛠️ Teknologi yang Digunakan

- React.js
- Hono.js
- Supabase (PostgreSQL)
- Cloudflare Workers
- Bun
- Tailwind CSS

## 📝 Penggunaan

1. Buka aplikasi di browser (`http://localhost:5173`).
2. Masukkan nilai dan kata sandi.
3. Klik "Generate QR" untuk membuat QR code.
4. Lihat atau hapus QR code dari daftar.

## 🔄 API Endpoints

- `POST /api/qr-codes` - Membuat QR code baru
- `GET /api/qr-codes` - Mendapatkan daftar QR code
- `DELETE /api/qr-codes` - Menghapus QR code tertentu

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 🙏 Terima Kasih

Terima kasih kepada Supabase dan Cloudflare yang mendukung pengembangan aplikasi ini.

---

Dibuat dengan ❤️ untuk membuat QR code yang aman dan mudah
