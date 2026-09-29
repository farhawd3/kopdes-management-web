# Kopdes Management Web

Ruang kerja pribadi manajer KDMP Puntukrejo: rencana 90 hari, tugas, kesiapan gerai, koordinasi, dan laporan kerja.

**Status: penyiapan proyek baru. Kode lama menjadi dasar refaktor dan belum sesuai PRD baru.**

## Dokumentasi
- [Peta dokumen](docs/README.md)
- [Status pekerjaan](docs/STATUS.md)
- [Kebutuhan produk](docs/PRD.md)
- [Keputusan terbaru](docs/KEPUTUSAN.md)
- [Panduan AI](AGENTS.md)
- [Changelog](CHANGELOG.md)

## Pengembangan lokal
Prasyarat: Node.js dan npm.

```sh
npm ci
npm run dev
```

Buka http://localhost:3000. Konfigurasi lokal disimpan di `.env.local` dan tidak masuk Git. Konfigurasi database saat ini masih milik aplikasi lama; jangan menghubungkannya ke proyek baru sebelum migrasi dan layanan baru siap.

```sh
npm test
npm run typecheck
npm run build
```

Lint dan E2E belum dikonfigurasi. Stack: Next.js, React, TypeScript strict, Tailwind, Zod, Supabase. Target ponsel 360 px, tablet, dan desktop.

Repositori tujuan: `kopdes-management-web`. Supabase baru disiapkan terpisah; SQL cloud dijalankan setelah penjelasan dan persetujuan migrasi.
