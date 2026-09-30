# Menyiapkan Supabase baru

Proyek tujuan: **kopdes-management-web**, ID **mqycnhebhzqaziouipet**, Free, Singapore.
Proyek lama tidak digunakan atau diubah oleh aplikasi baru.

## 1. Konfirmasi migrasi

Berkas: `supabase/migrations/20260930000001_manager_hub.sql`.

Migrasi membuat enam tabel:

| Tabel | Isi |
|---|---|
| hub_records | 16 jenis catatan kerja, setiap jenis divalidasi Zod |
| manager_security | Hash PIN dan batas percobaan persisten |
| manager_sessions | Hash token sesi dengan kedaluwarsa |
| manager_reports | Snapshot laporan yang tidak berubah ketika pekerjaan diedit |
| activity_log | Jejak tindakan dan waktu, tanpa isi catatan pribadi |
| template_runs | Penanda agar template tidak terpasang dua kali |

SQL juga membuat indeks, pemeriksaan relasi/dependensi, log perubahan, transaksi template/pemulihan/tugas berulang, dan fungsi keamanan. Semua tabel memakai RLS. Anon dan authenticated tidak diberi akses; server menggunakan kunci layanan setelah memeriksa sesi. PIN awal tidak ditulis di SQL. Tidak ada penghapusan database lama atau data lama.

Fungsi pemulihan baru menghapus dan mengganti data ketika **fitur Pulihkan** digunakan; membuat fungsi ini tidak menjalankan pemulihan. Fungsi pergantian PIN mencabut sesi ketika diminta dari aplikasi.

**Sebelum eksekusi cloud, pemilik harus menyetujui berkas dan proyek tujuan ini.**

## 2. Jalankan oleh pemilik

1. Buka proyek `kopdes-management-web` pada Supabase, pastikan ID `mqycnhebhzqaziouipet`.
2. Buka SQL Editor → New query.
3. Salin seluruh isi berkas migrasi di atas, lalu Run setelah Anda menyetujuinya.
4. Pastikan hasil sukses. Jangan menjalankannya pada proyek lama atau mengulang migrasi yang sudah berhasil.
5. Beri tahu AI bahwa migrasi selesai, atau salin pesan error tanpa kunci rahasia.

Migrasi telah diuji dengan PostgreSQL lokal (PGlite). Hasil lokal tidak menggantikan verifikasi cloud.

## 3. Isi konfigurasi lokal

Buka `.env.local`:

- `HUB_SUPABASE_URL`: URL proyek baru, sudah disiapkan.
- `HUB_SUPABASE_SERVICE_KEY`: isi kunci server/secret key proyek baru dari Settings → API Keys. Jangan gunakan publishable/anon key.
- `HUB_SETUP_TOKEN`: token acak untuk pengaturan PIN pertama, sudah dibuat secara lokal. Jangan kirim di chat.
- `HUB_APP_ORIGIN`: `http://localhost:3000` saat pengembangan; domain HTTPS tepat saat hosting.

Simpan berkas dan jalankan ulang server setelah mengubah env. Nama variabel HUB sengaja berbeda agar kredensial lama tidak terpakai tanpa sengaja. `.env.local` dan arsipnya diabaikan Git.

## 4. PIN dan data awal

1. Jalankan `npm run dev`, buka `http://localhost:3000/pin`.
2. Klik Pengaturan PIN pertama kali.
3. Masukkan PIN baru 6–12 digit dan token dari `HUB_SETUP_TOKEN`.
4. Simpan lalu masuk dengan PIN. Hapus `HUB_SETUP_TOKEN` dari konfigurasi hosting setelah inisialisasi sukses.
5. Isi profil dan tanggal mulai di Pengaturan; pasang template 90 hari.
6. Seluruh tugas belum selesai. Sesuaikan dengan keadaan nyata; jangan menandai selesai hanya untuk mengisi dashboard.

Pemulihan PIN yang hilang dilakukan melalui administrator server/database. Tidak ada PIN bawaan atau tombol membuka akses tanpa pemeriksaan.

## Sebelum hosting

Gunakan HTTPS, isi origin dan kunci server pada environment hosting, jalankan seluruh pemeriksaan, lalu verifikasi login/logout, kedaluwarsa sesi, simpan data, cadangan dan pemulihan pada proyek uji. Jangan mengaktifkan paket berbayar atau integrasi migrasi otomatis.
