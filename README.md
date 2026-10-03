# Kopdes Management Web

Ruang kerja pribadi manajer KDMP Puntukrejo: proyek fleksibel, tugas, kesiapan gerai, koordinasi, dokumen, risiko, dan laporan kerja.

**Status: workspace proyek aktif secara lokal; deployment produksi belum terverifikasi.** Fitur lanjutan dan penerimaan perangkat masih terbuka di [STATUS](docs/STATUS.md). Tidak ada data operasional tiruan.

## Mulai lokal

Prasyarat: Node.js 22.12+ dan npm.

```sh
npm ci
```

Salin `.env.example` menjadi `.env.local`, lalu ikuti [panduan Supabase dan PIN](docs/SUPABASE.md). Jangan memakai proyek database lama.

```sh
npm run dev
```

Buka `http://localhost:3000/pin`. Jika belum diinisialisasi, buat PIN pertama dengan token pengaturan server. Masuk, lengkapi profil, lalu buat proyek sendiri dengan tujuan dan jadwal pilihan Anda.

## Pemeriksaan

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Tes database memakai PostgreSQL lokal PGlite dan tidak mengubah Supabase cloud. `npm run format` merapikan kode. Pengujian perangkat nyata dan E2E cloud belum otomatis.

## Peta proyek

| Lokasi | Tanggung jawab |
|---|---|
| `src/app` | Rute Next.js, API, dan layout |
| `src/features/<domain>` | Modul tugas, proyek, dashboard, pencatatan, laporan, dan ruang kerja; kontrak/form bersama tetap di akar features |
| `src/components` | Navigasi, tombol, dan grafik bersama |
| `src/lib` | Tanggal, progres, timeline, tema, dan keamanan |
| `supabase/migrations` | Migrasi skema dan kompatibilitas secara berurutan; penerapan cloud mengikuti persetujuan |
| `tests/{unit,ui,database,security}` | Validasi domain, keamanan API, transaksi PostgreSQL |
| `docs` | Kebutuhan, keputusan, arsitektur, panduan, status |

Next.js 16, React 19, TypeScript strict, Tailwind 3, Zod, Supabase. Font Inter dan Plus Jakarta Sans dibundel lokal. Layout dirancang untuk ponsel 360 px, tablet, dan desktop; status pengujian ada di dokumentasi.

## Dokumentasi

- [Peta dokumen](docs/README.md) · [PRD](docs/PRD.md) · [Checklist](docs/CHECKLIST.md)
- [Arsitektur](docs/ARSITEKTUR.md) · [Supabase](docs/SUPABASE.md)
- [Panduan AI](AGENTS.md) · [Status](docs/STATUS.md) · [Changelog](CHANGELOG.md)

Repository: [halimxn/kopdes-management-web](https://github.com/halimxn/kopdes-management-web), privat, dimulai dengan riwayat baru. Arsip kode/dokumen/riwayat lama disimpan lokal dalam `.local-backup`, tidak diunggah. Rahasia hanya berada di environment server.

## Proyek dan tugas

Buka **Proyek** untuk membuat ruang kerja berisi tujuan, PIC, catatan, milestone dan tugas. Data proyek memakai domain `workstreams` yang kompatibel dengan data lama. Halaman **Tugas** menyediakan daftar, papan, kalender dan Gantt, pencarian, filter status/proyek/prioritas, serta pengurutan. Klik judul tugas untuk membuka detail.

Desain memakai latar hangat dan aksen rose, navigasi yang dikelompokkan, tema terang/gelap, serta navigasi bawah di ponsel. Catatan mendukung format sederhana. Editor blok drag-and-drop dan kolaborasi real-time belum tersedia.

## Pencatatan operasional

Area **Pencatatan** berisi Anggota, Buku kas, Barang, dan Stok opname. Aktivasi database harus mengikuti [panduan pencatatan](docs/PENCATATAN.md); migrasi kedua belum otomatis dijalankan di cloud. Navigasi cepat melalui Ctrl/⌘ K. Rapat mendukung tautan online/hybrid dan unduhan agenda .ics.
