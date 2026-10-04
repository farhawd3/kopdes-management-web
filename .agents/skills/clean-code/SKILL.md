---
name: clean-code
description: Guidelines and best practices for writing clean, modular, bug-free, type-safe, and mobile-first code in Kopdes Manager Web. Use whenever refactoring, creating features, styling, or structuring components.
---

# Panduan Rekayasa Kode Bersih (Clean Code) — Kopdes Manager Web

Panduan ini mengatur standar arsitektur, penulisan kode TypeScript/React, tata letak mobile-first, dan konsistensi desain untuk memastikan kode selalu rapi, efisien, dan bebas bug.

---

## 1. Arsitektur Folder & Domain

Struktur direktori aplikasi memakai Next.js App Router. Enam kontrak/form lintas-domain tetap di akar features: schemas.ts, catalog.ts, query.ts, service.ts, Editor.tsx dan Records.tsx; struktur rinci ada di docs/ARSITEKTUR.md:

```
src/
├── app/                  # Rute tipis (App Router: page.tsx, layout.tsx, globals.css, personal.css)
├── components/           # Komponen UI bersama lintas-domain
│   ├── charts/           # Visualisasi data & metrik
│   ├── layout/           # AppShell, navigasi, topbar, dock mobile
│   └── ui/               # EmptyState, Select, DateField, CsvDropzone, SkeletonLoading
├── features/             # Modul domain independen (skema, kueri, UI fitur)
│   ├── <domain>/         # Komponen/utilitas dashboard, tasks, projects, operations, dsb.
│   ├── catalog.ts        # Katalog entitas, definisi bidang, navigasi
│   ├── schemas.ts        # Validasi Zod seluruh entitas
│   └── workspace/useWorkspace.ts # Hook dengan cache memori per lingkup dan validasi ulang
└── lib/                  # Utilitas murni & pustaka bersama
    ├── client.ts         # Wrapper API client & penanganan galat
    ├── date.ts           # Kalender bersama & kalkulasi tanggal zona Asia/Jakarta
    ├── progress.ts       # Satu-satunya sumber rumus progres & skor kesiapan
    └── task-status.ts    # Transisi status tugas & validasi
```

### Aturan Arsitektur:
1. **Rute Tipis**: `src/app/(app)/[slug]/page.tsx` hanya meneruskan parameter ke `features/workspace/WorkspacePage.tsx`. Hindari meletakkan logika bisnis di dalam `app/`.
2. **Hindari Abstraksi Spekulatif**: Jangan membuat generic repository atau factory yang tidak dibutuhkan. Gunakan fungsi konkret dengan nama yang menjelaskan aksi bisnis.
3. **Satu Sumber Progres**: Semua perhitungan persentase, bobot, dan kesiapan WAJIB memanggil `src/lib/progress.ts`. Dilarang menduplikasi rumus kalkulasi di komponen view.

---

## 2. Prinsip Mobile-First & Interaktivitas Native-App

Aplikasi ini diutamakan untuk penggunaan smartphone dan tablet di lapangan oleh manajer koperasi.

### Standar UI Mobile:
1. **Area Sentuh Minimal 44×44 px**: Seluruh tombol, link, tab, dan kontrol form harus memiliki target sentuh minimal 44 px agar mudah ditekan dengan satu ibu jari.
2. **Safe Area Inset**: Wajib memperhitungkan bilah navigasi ponsel modern:
   ```css
   padding-bottom: calc(64px + env(safe-area-inset-bottom));
   ```
3. **Mobile Bottom Sheet**: Dialog atau form kompleks pada mobile (`max-width: 768px`) harus dibuka sebagai *bottom sheet* dengan bilah pegangan (`.sheet-grab-bar`) dan tombol aksi yang mudah dijangkau.
4. **Active Press Micro-Feedback**: Elemen sentuh harus memberikan umpan balik taktil mikro yang halus:
   ```css
   button:active, a:active {
     transform: scale(0.97);
     transition: transform 0.08s ease;
   }
   ```
5. **Pencegahan Horizontal Overflow**: Dilarang menyebabkan *horizontal scroll leakage* pada halaman utama (`body { overflow-x: hidden; }`). Tabel data atau linimasa Gantt wajib dibungkus dalam kontainer ber-`overflow-x: auto` terisolasi.

---

## 3. Kinerja & Stale-While-Revalidate (SWR) Caching

1. **In-Memory Cache**: Hindari flash loading/skeleton berulang saat berpindah tab dengan memanfaatkan cache memori `workspaceCache` di `useWorkspace.ts`.
2. **Bacaan cache saat navigasi**: Saat bernavigasi antar-halaman yang sudah pernah dibuka, tampilkan data dari cache secara instan, lalu lakukan validasi ulang (`refresh()`) secara senyap di latar belakang.
3. **Invalidasi Tepat**: Ketika mutasi (POST, PATCH, DELETE) berhasil, lakukan pembaruan data lokal atau panggil `refresh()` untuk menyinkronkan state global dan memicu event `hub-workspace`.

---

## 4. Konsistensi Desain Visual & Warna Pastel

Untuk Dunia Koperasi, arahan terbaru pemilik mengutamakan video biru-putih dan scene 3D. Baca `docs/DUNIA-KOPERASI.md` dan `docs/DESAIN-ANTARMUKA.md`; palet dunia dimiliki world.css/world-objects.ts, terisolasi dari tema halaman operasional. Maskot animatif adalah visualisasi dan cuaca adalah simulasi. Pedoman pastel di bawah tetap berlaku pada halaman operasional.

Aplikasi menggunakan palet tema modern (arang, hijau zamrud, lavender, pastel):

### Variabel Pastel Global (`globals.css`):
Gunakan token warna pastel resmi untuk kartu informasi, tag, dan badge:
- **Emerald** (`--pastel-emerald-bg`, `--pastel-emerald-border`, `--pastel-emerald-text`): Untuk hal tuntas, siap buka, sukses, verifikasi.
- **Blue** (`--pastel-blue-bg`, `--pastel-blue-border`, `--pastel-blue-text`): Untuk status aktif, informasi umum, tugas berjalan.
- **Amber** (`--pastel-amber-bg`, `--pastel-amber-border`, `--pastel-amber-text`): Untuk peringatan, penundaan, jatuh tempo dekat, kendala ringan.
- **Purple** (`--pastel-purple-bg`, `--pastel-purple-border`, `--pastel-purple-text`): Untuk perencanaan, strategi, sasaran periode, milestone.
- **Rose** (`--pastel-rose-bg`, `--pastel-rose-border`, `--pastel-rose-text`): Untuk risiko kritis, pembatalan, terlambat.

### Standardisasi Empty State:
Jangan membuat `<div className="empty">` mentah. Selalu gunakan komponen terpadu:
```tsx
import { EmptyState } from '@/components/ui/EmptyState';

<EmptyState
  title="Belum ada catatan"
  description="Mulai tambahkan data atau periksa filter Anda."
  tone="emerald"
  action={{
    label: "Tambah Baru",
    onClick: () => handleCreate(),
  }}
/>
```

---

## 5. TypeScript Strict & Validasi Data

1. **Dilarang Menggunakan `any`**: Selalu gunakan tipe konkret, Zod schema infer, atau generic terikat.
2. **Defensive Parsing Tanggal**: Operasi tanggal harus melewati `src/lib/date.ts` dengan penanganan nilai `undefined` atau string kosong untuk mencegah `RangeError: Invalid time value`.
3. **Penanganan Error Bersih**: Error API atau database tidak boleh bocor menjadi angka palsu (misal menampilkan `0` saat data gagal dimuat). Tampilkan banner pesan galat atau penanda status yang jelas bagi pengguna.

---

## 6. Disiplin Verifikasi & Uji Coba

Setiap perubahan kode WAJIB melewati 3 tahapan verifikasi sebelum dilaporkan:
1. `npm run typecheck` (`tsc --noEmit`) → Harus 0 error.
2. `npm test` (`vitest run`) → Seluruh rangkaian tes yang tersedia wajib lulus.
3. `npm run build` (`next build`) → Seluruh rute statis & dinamis harus sukses teroptimasi.

*Catatan Lingkungan*: Di Windows gunakan `npm.cmd` jika diperlukan. Jalankan perintah dengan izin bawaan; minta eskalasi melalui parameter alat yang tersedia hanya jika sandbox benar-benar menghalangi pekerjaan. Jangan memakai parameter `BypassSandbox` yang tidak tersedia.
