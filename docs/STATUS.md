# Status proyek — 30 September 2026

## Fondasi selesai

- Repo privat `halimxn/kopdes-management-web` dibuat dengan commit awal tanpa induk dan berhasil dipush.
- Dokumen terbaru menggantikan docs lama; panduan AI tunggal, gitignore dan aturan akhir baris dirapikan.
- Kode, tes, SQL reset, dokumen, konfigurasi, dan riwayat lama diarsip lokal serta dikecualikan dari Git.
- Runtime lama diganti aplikasi baru. Modul anggota, omzet, stok dagang, dan integrasi kunci AI tidak digunakan.
- Supabase baru: `mqycnhebhzqaziouipet`, Free, Singapore. Migrasi enam tabel disetujui pemilik dan tabel cloud dapat dibaca.
- Setup PIN dan login berhasil (respons 200); Beranda dan 16 API domain berhasil dimuat. Database lama tidak diubah.

## Implementasi tersedia

- Beranda, Hari Ini, tugas daftar/papan/kalender, tambah cepat, subtugas, POAC, prasyarat, pengulangan.
- Proyek/bidang kerja: tujuan, PIC, tanggal, catatan, progres, milestone terkait, tugas dalam lingkup proyek. Filter prioritas dan pengurutan tugas.
- Tampilan baru terinspirasi workspace dokumen: latar hangat, aksen rose, ikon konsisten, sidebar berkelompok, shortcut, navigasi ponsel.
- Milestone dan Gantt awal; checklist, gerai, radar kesiapan.
- Kontak/interaksi, rapat/notulen/keputusan, tindak lanjut ke tugas, dokumen, risiko/isu, tim/pelatihan, jurnal.
- Snapshot laporan periode pilihan, cetak A4/PDF, salin teks WhatsApp.
- Profil, tema sistem/terang/gelap, kepadatan, cadangan/pemulihan.
- Template 43 tugas, enam milestone, tujuh bidang kerja, tujuh gerai. Seluruh status awal rencana.
- PIN scrypt, sesi acak HttpOnly, rate limit persisten, Zod, pembatasan origin, RLS default deny, pemeriksaan relasi database.

## Verifikasi

- Aplikasi baru: **51/51 tes lulus**, termasuk lingkup proyek, filter, aksi tugas, keamanan, dan PostgreSQL lokal.
- ESLint, TypeScript dan build produksi Next.js berhasil.
- Audit dependency terakhir: 0 kerentanan; audit sumber: 42/42 berkas terjangkau dari titik masuk aplikasi.
- Pemeriksaan singkat Beranda/Proyek pada viewport 360, 768, 1024, 1440 px: lebar dokumen sesuai layar, tanpa overflow halaman. Tema terang/gelap diperiksa; formulir proyek dapat dibuka/ditutup tanpa menyimpan data.
- Pemeriksaan browser memakai data cloud kosong. Alur proyek dengan data diisolasi melalui tes lokal, bukan data fiktif di produksi.
- Pemindaian pola rahasia tidak menemukan kandidat pada berkas yang akan masuk Git; env dan arsip diabaikan.

## Batas dan penerimaan berikutnya

- UAT data nyata, perangkat fisik Android/iOS/Safari, Lighthouse dan aksesibilitas menyeluruh belum dilakukan.
- Baseline/drag tanggal/jalur kritis Gantt, serta riwayat cakupan lengkap untuk burnup belum tersedia.
- Editor blok bebas dan kolaborasi real-time seperti Notion belum tersedia.
- PWA/offline, palet perintah, CSV, unggah berkas, tautan publik laporan belum tersedia.
- Anggaran belum diaktifkan, menunggu keputusan produk.
- Profil dan data operasional nyata diisi pemilik. Setelah profil lengkap, pemilik dapat memasang template atau membuat proyek sendiri.

## Panduan berikutnya

Buka **Proyek → Proyek baru** untuk ruang kerja manual, atau **Pengaturan** untuk profil dan template 90 hari. Ikuti [WORKFLOW.md](WORKFLOW.md). Kredensial dan SQL cloud tetap dilakukan pemilik mengikuti [SUPABASE.md](SUPABASE.md). Tidak perlu mengulang migrasi untuk halaman Proyek.
