# Kopdes Management Web

Ruang kerja pribadi manajer KDMP Puntukrejo: rencana 90 hari, tugas, kesiapan gerai, koordinasi, dokumen, risiko, dan laporan kerja.

**Status: implementasi awal baru; aktivasi dan pemeriksaan cloud sedang berlangsung.** Fitur lanjutan dan penerimaan perangkat masih terbuka di [STATUS](docs/STATUS.md). Tidak ada data operasional tiruan.

## Mulai lokal

Prasyarat: Node.js 22.12+ dan npm.

```sh
npm ci
```

Salin `.env.example` menjadi `.env.local`, lalu ikuti [panduan Supabase dan PIN](docs/SUPABASE.md). Jangan memakai proyek database lama.

```sh
npm run dev
```

Buka `http://localhost:3000/pin`. Buat PIN pertama dengan token pengaturan server, masuk, lengkapi profil, lalu pasang template 90 hari. Template berisi 43 tugas, 6 milestone, 7 bidang kerja, dan 7 gerai rencana; semuanya belum selesai.

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
| `src/features` | Skema domain, layanan data, form, dan halaman kerja |
| `src/components` | Navigasi, tombol, dan grafik bersama |
| `src/lib` | Tanggal, progres, tema, keamanan, dan template |
| `supabase/migrations` | Satu migrasi awal khusus proyek baru |
| `tests` | Validasi domain, keamanan API, transaksi PostgreSQL |
| `docs` | Kebutuhan, keputusan, arsitektur, panduan, status |

Next.js 16, React 19, TypeScript strict, Tailwind 3, Zod, Supabase. Font Inter dan Plus Jakarta Sans dibundel lokal. Layout dirancang untuk ponsel 360 px, tablet, dan desktop; status pengujian ada di dokumentasi.

## Dokumentasi

- [Peta dokumen](docs/README.md) · [PRD](docs/PRD.md) · [Checklist](docs/CHECKLIST.md)
- [Arsitektur](docs/ARSITEKTUR.md) · [Supabase](docs/SUPABASE.md)
- [Panduan AI](AGENTS.md) · [Status](docs/STATUS.md) · [Changelog](CHANGELOG.md)

Repository: [halimxn/kopdes-management-web](https://github.com/halimxn/kopdes-management-web), privat, dimulai dengan riwayat baru. Arsip kode/dokumen/riwayat lama disimpan lokal dalam `.local-backup`, tidak diunggah. Rahasia hanya berada di environment server.

## Proyek dan tugas

Buka **Proyek** untuk membuat ruang kerja berisi tujuan, PIC, catatan, milestone dan tugas. Data proyek memakai bidang kerja yang sama dengan template 90 hari. Halaman **Tugas** menyediakan daftar, papan dan kalender, pencarian, filter status/proyek/prioritas, serta pengurutan. Klik judul tugas untuk membuka detail.

Desain memakai latar hangat dan aksen rose, navigasi yang dikelompokkan, tema terang/gelap, serta navigasi bawah di ponsel. Editor blok bebas dan kolaborasi real-time belum tersedia.
