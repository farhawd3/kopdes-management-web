# Changelog

### Perbaikan origin Vercel

- Normalisasi konfigurasi origin dan kenali domain deployment resmi dari metadata server Vercel.
- Tetap tolak origin asing/kosong, domain Vercel lain, downgrade HTTP, serta pemalsuan Host/Forwarded.
- Tambahkan 16 pengujian origin dan panduan konfigurasi domain produksi.

## 0.2.0 — Workspace fleksibel

- Hapus program 90 hari dari runtime; proyek dibuat dengan tujuan dan durasi sendiri.
- Tambahkan status/prioritas proyek, filter, catatan terformat dan pratinjau.
- Tambahkan Gantt interaktif bersama: rentang/skala, geser jadwal, resize tenggat, review/simpan, milestone dan peringatan prasyarat.
- Sediakan pengaturan tanggal dengan keyboard dan form pada ponsel.
- Segarkan dashboard, lapisan kartu, sidebar, tabel, papan, form dan tema.
- Arsipkan spesifikasi lama; pertahankan data cloud dan kompatibilitas cadangan tanpa migrasi tambahan.
## 0.1.0 — Fondasi Manager Hub, 30 September 2026

- Mulai repo privat `kopdes-management-web` dengan riwayat baru dan gitignore untuk rahasia/arsip.
- Ganti dokumentasi aktif dengan PRD terbaru, keputusan, arsitektur, panduan Supabase, checklist, dan panduan AI.
- Ganti runtime lama dengan ruang kerja perencanaan, kesiapan gerai, koordinasi, dan laporan manajer.
- Tambahkan halaman proyek dengan tujuan, catatan, PIC, progres, dan tugas terhubung; daftar tugas menyerupai workspace dokumen dengan filter prioritas dan pengurutan.
- Segarkan bentuk web dengan sidebar berkelompok, ikon Lucide, latar hangat, aksen rose, dan shortcut kerja.
- Tambahkan template 43 tugas/6 milestone, tugas berulang, checklist, grafik, snapshot laporan, cadangan/pemulihan.
- Perkuat PIN/sesi, validasi server, rate limit persisten, RLS, relasi, dan transaksi database.
- Tambahkan pengujian PostgreSQL lokal dan keamanan; perbarui Next.js/Vitest untuk menutup temuan dependency.

Implementasi awal belum berarti seluruh target PRD atau UAT selesai. Batas dan hasil verifikasi terbaru ada di `docs/STATUS.md`.

## 1 Oktober 2026 — Studio, kalender dan pencatatan

- Susun ulang navigasi Kerja/Catat, tema studio, pencarian halaman, kalender tugas/pemilih tanggal, dropdown dan teks UI.
- Tambah anggota, buku kas, barang dan opname beserta filter, ringkasan, CSV aman, validasi dan gerbang aktivasi migrasi.
- Tambah rapat online/hybrid, tautan bergabung, durasi dan ekspor ICS; checklist subtugas langsung di kartu.
- Siapkan migrasi kedua tanpa mengubah SQL terpasang; pemasangan cloud menunggu persetujuan pemilik.
