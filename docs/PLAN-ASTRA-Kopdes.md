# PLAN UNTUK GPT ASTRA — Penyelarasan & Redesain UI Kopdes Management Web

Brief ini disusun dari pemeriksaan langsung `src.zip` (106 file). Semua angka dan nomor baris di bawah adalah hasil pengukuran kode asli.

---

## 0. Peran, Konteks, Aturan

**Peran:** front-end engineer + UI/UX designer senior.
**Tujuan:** menyelaraskan seluruh komponen, merapikan dashboard, memperbaiki drag di Android, menambah interaksi dan animasi.

**Aturan wajib**
1. Jangan ubah logika bisnis, skema (`features/schemas.ts`), API (`app/api/*`), atau `lib/server/*`.
2. Semua teks UI tetap bahasa Indonesia. Jangan hapus fitur (Ctrl+K, favorit, dark mode, tema warna `hub-color-style`, PIN).
3. Kerjakan per fase, satu commit per fase, laporkan setelah tiap fase (format di bagian 11).
4. Dilarang nilai hardcode (warna, px, radius, shadow) di komponen. Semua lewat token.
5. Keputusan ambigu: pilih opsi paling sederhana, catat di laporan, jangan berhenti bertanya.
6. Dependensi sudah diketahui (lihat bagian 1A). **Jangan upgrade** Next, React, Tailwind, atau lucide-react. Paket baru maksimal 1 (`@dnd-kit/core`, itu pun opsional, lihat 5A) dan 1 devDependency (`stylelint`); selain itu minta persetujuan dulu.

---

## 1. Temuan dari Kode Asli (Dasar Seluruh Rencana)

**Stack (terkonfirmasi dari `package.json`):** Next 16 (App Router) + React 19 + TypeScript 5.8, Tailwind **3.4** (hanya 3 direktif di `globals.css`), `lucide-react`, font Plus Jakarta Sans + Inter, `zod`, `@supabase/supabase-js`, `clsx`, `tailwind-merge`. Chart dibuat sendiri dengan SVG. Drag memakai HTML5 Drag & Drop bawaan browser.

### 1A. Implikasi `package.json`

| Fakta | Dampak ke plan |
|---|---|
| Tidak ada library drag | Fix Android = hook Pointer Events buatan sendiri (default) atau `@dnd-kit/core` (opsional) |
| Tidak ada library animasi atau chart | Animasi pakai CSS + Web Animations API + SVG yang sudah ada. **Tanpa Framer Motion/Recharts** |
| Tailwind 3.4 | **`@layer` dengan nama kustom (`legacy`, `components`-sendiri) akan error di Tailwind 3**, jadi strategi cascade layer di versi awal plan tidak dipakai (lihat bagian 2) |
| Tidak ada `stylelint` | Tambah sebagai devDependency untuk aturan larangan hardcode |
| Tidak ada Playwright | Regresi visual: pakai `vitest` + `@testing-library/react` (sudah ada) untuk uji komponen; screenshot manual per perangkat. Playwright hanya bila disetujui |
| Skrip `audit:source` sudah ada (`scripts/audit-source.mjs`, tidak ikut di zip) | Fase 1 **memperluas** skrip itu, bukan membuat baru. Baca isinya dulu |
| Skrip `lint`, `typecheck`, `test`, `format` ada | Jalankan `typecheck` + `lint` + `test` + `build` di akhir setiap fase |
| Folder `tests/` ada (tidak ikut di zip) | Tambah uji untuk DateField, Button, Badge, BottomNav, hook drag |
| React 19 + `inert` dipakai di AppShell | Aman; pertahankan |

**Akar masalah inkonsistensi: arsitektur CSS, bukan komponen individual.**

| Temuan | Angka |
|---|---|
| `app/personal.css` | **24.562 baris**, 575 KB, 4 sheet hasil gabungan (`workspace` baris 7, `studio` 1240, `polish` 20513, `responsive-finish` 21903) |
| Pemakaian `!important` | **2.340** kali (perang spesifisitas antar sheet) |
| Deklarasi `border-radius` | 785, dengan sekitar 12+ nilai berbeda (5, 6, 8, 9, 10, 12, 14, 16, 18, 20, 50%, 9999px, `--radius-pill`) |
| Ukuran font | 155× 12px, 135× 11px, 117× 13px, 63× 12.5px, 60× 11.5px, 31× 10.5px, 24× 10px, 21× 13.5px, dan lainnya |
| Warna hex di CSS | 868; di TSX 37; inline `style={{` 85 |
| Aturan duplikat | `.date-field` 3×, `.date-input` 2×, `.bottom-nav` 5×, `.primary` 9× |
| Elemen mentah di TSX | `<button>` 250, `<input>` 45, `<select>` 4, `<textarea>` 5; komponen `<Button>` dipakai **1×** saja |
| Komponen `Select` kustom | dipakai 33× (sudah bagus, jadikan standar) |
| `touch-action` | **0** pemakaian |
| `@keyframes` | 14 di personal.css; `prefers-reduced-motion` ada di 3 tempat (tidak terpusat) |

**Penyebab bug yang terlihat di screenshot**

1. **Tanggal ganda** (`components/ui/DateField.tsx`, baris ±77–116): komponen merender `<input type="date">` native **dan** `<button>` yang menampilkan `formatDate(value)` / "Pilih tanggal" di atasnya. Keduanya tampil bersamaan, ditambah `.date-field`/`.date-input` yang didefinisikan 3 kali di CSS. Itulah teks `03/10/2026` tumpang tindih dengan `3 Okt 2026` dan kotak "Pilih tanggal" terpisah.
2. **Tombol "Hari ini" terpotong** (`features/tasks/TaskTimeline.tsx` baris 87): `<button>` polos tanpa kelas, mengikuti aturan toolbar yang bentrok, tidak ada `white-space: nowrap` dan tinggi tidak disamakan dengan tombol panah.
3. **Bottom nav tidak seragam** (`components/layout/AppShell.tsx` baris ±533–578, kelas `manager-dock`, `dock-center-action`): "Aksi" memakai markup berbeda (`dock-center-circle` + `<span>`) dari item lain, "Menu" adalah `<button>` bukan `<Link>`. Gaya `.bottom-nav` dan `.manager-dock` tersebar di banyak tempat sehingga font/ukuran berbeda. Ikon `size={19}` tetapi ikon Aksi `size={22}`.
4. **Drag tidak jalan di Android**: `ScrumBoardView.tsx` (baris ±270, 444, 474) dan `Records.tsx` (baris ±409, 896, 1122) memakai `draggable` + `onDragStart` + `onDrop` (HTML5 DnD) yang tidak mengirim event dari sentuhan di Chrome/WebView Android. Tidak ada `touch-action`, tidak ada handle, tidak ada long-press.
5. **Warna menusuk di dashboard** (`features/dashboard/Dashboard.tsx`, `components/charts/DashboardCharts.tsx`): variabel `--late`, `--warn`, `--ok` jenuh (`#ef4444`, `#f59e0b`) dipakai sebagai latar/border kartu (contoh `variant="rose"` baris ±272, `var(--danger)` baris ±186; **verifikasi apakah `--danger` terdefinisi**, di `globals.css` yang terlihat adalah `--late`). Aksen lime `#d5f935` pada tombol/aktif sangat terang di mode terang.

**Aset yang bisa dipakai ulang (jangan dibuat ulang)**
- `globals.css` sudah punya token: `--brand`, `--surface`, `--canvas`, `--line`, `--ink*`, `--ok/--late/--warn`, token `--pastel-{emerald,blue,amber,purple,rose}-{bg,border,text,accent}` untuk light dan dark. Ini fondasi palet lembut; tinggal dijadikan satu-satunya sumber warna.
- `components/ui/Select.tsx` + `usePopoverPlacement.ts` (popover kustom), `EmptyState.tsx`, `SkeletonLoading.tsx`.
- `DashboardCharts.tsx` sudah punya animasi dasar (donut `stroke-dashoffset`, sparkline, bar `transitionDelay` stagger). Perluas, jangan tulis ulang.
- Dark mode via kelas `.dark` + `data-theme`; tema warna via `data-theme-color`.

---

## 2. Strategi Inti

**Jangan menambal personal.css. Ganti arsitektur secara bertahap (strangler):**

1. Buat lapisan baru yang bersih: `app/tokens.css`, `app/ui.css` (komponen baru). Impor setelah `personal.css` di `layout.tsx`. **Jangan pakai `@layer` kustom** (Tailwind 3 akan error "no matching @tailwind directive").
2. Semua komponen baru memakai **awalan kelas `ui-`** (`ui-btn`, `ui-input`, `ui-badge`, `ui-card`, `ui-modal`) yang belum pernah ada di `personal.css`, sehingga aturan lama tidak mengenai mereka. Untuk aturan elemen lama (`button, input { border-radius: 10px }` dan yang ber-`!important`), naikkan spesifisitas dengan menggandakan kelas (`.ui-btn.ui-btn`) atau bungkus `:where()` di sisi legacy. Hindari menambah `!important` baru.
3. Migrasikan komponen satu per satu ke komponen baru + CSS baru, lalu **hapus blok CSS lama yang sudah tidak terpakai** setelah tiap migrasi.
4. Target akhir: `personal.css` kosong dan dihapus; `!important` < 20 (hanya untuk utilitas dan reduced-motion).

Ukur kemajuan dengan skrip (lihat Fase 1) yang mencetak: jumlah `!important`, jumlah nilai radius/font unik, jumlah elemen mentah, ukuran CSS.

---

## 3. Fase 1 — Audit Otomatis (Tidak Boleh Ada Sisa)

1. Baca `scripts/audit-source.mjs` (sudah ada, jalankan `npm run audit:source`), lalu perluas atau tambah `scripts/audit-ui.mjs` yang menghasilkan `AUDIT.md`:
   - Hitung: `<button`, `<input`, `<select`, `<textarea`, `type="date"`, `style={{`, hex di TSX/CSS, `!important`, nilai `border-radius`/`font-size`/`height` unik, selector duplikat.
   - Daftar **per file TSX**: elemen mentah yang ditemukan (nomor baris).
   - Daftar selector yang didefinisikan lebih dari sekali beserta barisnya.
2. Inventaris setiap halaman dan fitur: `beranda`, `hari-ini`, `tugas` (daftar, papan/Scrum, kalender, timeline), `proyek`, `perlu perhatian`, `jurnal/kegiatan`, ringkasan buku, buku kas, barang dagangan, laporan, pengaturan, PIN, `[slug]`, serta overlay: `TaskDetailDrawer`, `SprintModal`, `RecursiveScheduleModal`, `ManagerActionModal`, `WorkspaceSearch`, menu mobile.
3. Buat tabel: **komponen · file:baris · varian saat ini · masalah · komponen pengganti · status**.
4. Fokus file besar yang paling banyak elemen mentah: `features/Records.tsx` (2.479 baris), `features/Editor.tsx` (1.575), `Dashboard.tsx`, `AppShell.tsx`, `Operations.tsx`, `TaskDetailDrawer.tsx`, `Settings.tsx`, `Reports.tsx`.

**Selesai bila:** setiap `<button>/<input>/<select>/<textarea>` terdata dengan file dan baris.

---

## 4. Fase 2 — Design Tokens

Buat `app/tokens.css`. Perluas token yang sudah ada di `globals.css`, jangan buat paralel.

**Tipografi** (font tetap Plus Jakarta Sans). Kurangi belasan ukuran menjadi 6:

| Token | Ukuran/Weight | Pakai untuk |
|---|---|---|
| `--fs-title` | 24 (mobile 20) / 700 | judul halaman |
| `--fs-h2` | 18 (mobile 16) / 600 | judul kartu |
| `--fs-body` | 14 (mobile 13.5) / 400 | isi, input, tombol |
| `--fs-label` | 13 / 500 | label form (tidak uppercase) |
| `--fs-caption` | 12 / 400 | bantuan, meta, badge |
| `--fs-overline` | 11 / 600 | label statistik saja |

Hapus semua `10px`, `10.5px`, `11.5px`, `12.5px`, `13.5px`. Pemetaan: 10–11.5 → caption/overline; 12.5 → 12 atau 13; 13.5 → 14.

**Radius:** `--r-sm 6` (badge), `--r-md 10` (tombol, input, select), `--r-lg 16` (kartu, sheet), `--r-full` (pill, avatar). Petakan 5/8/9 → 6 atau 10; 12/14 → 10 atau 16; 18/20 → 16; `9999px`/`50%`/`--radius-pill` → `--r-full`.

**Kontrol:** tinggi `--h-sm 32`, `--h-md 40`, `--h-lg 48` (target sentuh mobile; semua tombol/input/select/date satu tinggi).
**Spasi:** kelipatan 4. **Shadow:** `sm`, `md`, `lg`. **Ikon:** lucide, stroke 1.75, ukuran 16/20/24 (hapus 19, 18, 22 campur aduk).
**Motion:** `--dur-fast 150ms`, `--dur-base 250ms`, `--dur-slow 400ms`, `--ease-out cubic-bezier(0.16,1,0.3,1)`, `--ease-spring`.

**Warna semantik (satu sumber):** `--tone-{neutral,brand,info,success,warn,danger}-{bg,border,text,accent}`, dipetakan dari token pastel yang sudah ada. Redam dua hal:
- Aksen lime `#d5f935` hanya untuk tombol primer, indikator aktif kecil, dan fokus. **Jangan dipakai sebagai latar luas.** Pastikan teks di atas lime memakai `--brand-contrast` (kontras ≥ 4.5:1).
- `--late`, `--warn`, `--ok` jenuh dipakai hanya pada ikon, titik, dan angka; latar dan border memakai `--tone-*-bg/border`.

Sediakan padanan dark mode untuk setiap token dan pastikan 5 pilihan tema warna (`data-theme-color`) tetap bekerja tanpa mengubah komponen.

**Penjaga:** pasang `stylelint` (devDependency baru, satu-satunya) dengan konfigurasi (larang hex, larang `!important` kecuali daftar putih, larang radius/font di luar token) dan aturan ESLint/skrip untuk melarang `<button>/<input>` mentah di luar `components/ui`.

**Selesai bila:** `tokens.css` ada, `AUDIT` menunjukkan nilai radius unik ≤ 4 dan font unik ≤ 6 pada CSS baru.

---

## 5. Fase 3 — Pustaka Komponen Seragam (`components/ui/`)

Bangun satu kali, lalu ganti seluruh pemakaian dari hasil audit.

| Komponen | Spesifikasi dan catatan dari kode |
|---|---|
| `Button` | Sudah ada (`Button.tsx`, 656 byte, baru dipakai 1×). Perluas: varian `primary/secondary/ghost/danger-soft`, ukuran `sm/md/lg`, `loading`, `iconOnly` (40×40), `nowrap`. Ganti 250 `<button>` mentah. Di modal: Simpan = primary, Batal = ghost. |
| `IconButton` | Persegi 40×40 (32 pada `sm`), `aria-label` wajib. |
| `Field` | Pembungkus label (13/500, di atas), kontrol, helper, error (12px). Dipakai semua form. |
| `Input`, `Textarea` | 40px, radius 10, fokus ring 2px token brand. Ganti 45 `<input>` dan 5 `<textarea>`. |
| `Select` | Sudah ada; samakan tinggi/radius/ikon dengan Input. Ganti 4 `<select>` native yang tersisa. |
| `DateField` | **Tulis ulang struktur.** Satu elemen tampil saja: tombol/field dengan teks `dd/mm/yyyy` (atau placeholder) dan ikon kalender di dalam kolom, popup kalender yang sudah ada dipertahankan. Hapus `<input type="date">` yang terlihat (boleh dijadikan `sr-only` untuk form/validasi), hapus label ganda "Pilih tanggal" di samping. Dukung mode rentang (Mulai–Sampai) dengan tinggi sama. Hapus 3 definisi CSS lama `.date-field/.date-input`. |
| `Badge` | Tinggi 24, radius 6, 12/500, varian dari `--tone-*`. Dipakai untuk status, prioritas, jumlah ("1 tugas"), tenggat ("Lewat 1 hari"). |
| `Card` + `CardHeader` | Radius 16, border 1px, shadow-sm, padding 20 (16 mobile). Header: ikon 20–24 + judul `h2` + badge. Satu aksen warna per kartu. |
| `SegmentedControl` / `Tabs` | Untuk pemilih tampilan (papan/daftar/kalender/timeline) dan filter. |
| `DateNav` | Grup `[‹] [Hari ini] [›]` satu tinggi, `nowrap`. Dipakai di `TaskTimeline.tsx:87` dan toolbar kalender. |
| `Modal` / `Sheet` | Desktop dialog tengah, mobile bottom sheet. Header dan footer sticky, `overflow-x: hidden`, `min-width: 0`. Satukan `TaskDetailDrawer`, `SprintModal`, `RecursiveScheduleModal`, `ManagerActionModal` ke komponen ini. |
| `BottomNav` | Ekstrak dari `AppShell.tsx` (`manager-dock`). 5 item lebar sama, markup identik (ikon 22 + label 11) untuk semua, termasuk "Aksi" (FAB bulat di tengah, tetap menonjol sedikit) dan "Menu". Konten diberi `padding-bottom: calc(tinggi nav + env(safe-area-inset-bottom))` agar tidak tertimpa. Hapus 5 definisi `.bottom-nav` lama. |
| `Sidebar` item | Tinggi 40, ikon 20, aktif memakai latar soft (bukan `border-left` 3px). |
| `Toast`, `Tooltip`, `Legend`, `EmptyState`, `Skeleton` | Satu gaya masing-masing; `EmptyState` dan `SkeletonLoading` sudah ada, samakan token. |
| `Meter`/`Progress` | Dari `Charts.tsx`, token warna dan animasi isi. |

**Perbaikan teks terpotong:** label "PENANGGUNG JAWAB" menjadi "Penanggung jawab" dengan `Field` (label di atas nilai pada layar sempit).

**Urutan migrasi** (agar aman): `Button` → `Field/Input/Select/DateField` → `Badge/Card` → `Modal/Sheet` → `BottomNav/Sidebar/Topbar` → halaman: Dashboard → TodayView → DailyTasksView → ScrumBoardView → TaskTimeline/TaskCalendar → Projects → Records → Editor → Operations → Reports → Settings → lainnya.

**Selesai bila:** audit menunjukkan nol `<button>/<input>/<select>/<textarea>` di luar `components/ui`, nol scrollbar horizontal pada lebar 320px ke atas, dan halaman `/dev/komponen` menampilkan semua komponen dalam state default/hover/focus/active/disabled/error/loading, light dan dark.

---

## 6. Fase 4 — Redesain Dashboard (Bersih, Lembut, Lengkap)

File: `features/dashboard/Dashboard.tsx`, `TodayView.tsx`, `components/charts/DashboardCharts.tsx`, `Charts.tsx`, `ReadinessRadar.tsx`.

1. **Kartu statistik:** latar `--surface`, angka 24/700, label overline abu, ikon dalam lingkaran tint. Warna hanya pada ikon dan indikator kecil. Tambahkan delta atau sparkline (sudah ada komponen sparkline, gunakan). Kartu "Perlu Diperhatikan" tidak lagi bernuansa merah penuh: putih + ikon/angka danger-soft.
2. **Tugas Terlambat:** kartu putih standar, ikon peringatan soft di header, baris tugas = list item standar, tenggat sebagai `Badge danger-soft` ("Lewat 1 hari"), prioritas `Badge warn-soft`. Hapus border kiri oranye dan latar merah muda.
3. **Panel kanan (Rapat Hari Ini, Menyusul 7 Hari):** gaya kartu sama, empty state seragam (ikon abu 40px, judul, deskripsi, satu aksi).
4. **Grafik** (donut, sparkline, bar, radar, risk matrix): palet dari `--tone-*`, grid tipis, tooltip dan legenda seragam, font caption 12px. Warna lengkap dan informatif tetap ada, hanya dilembutkan (tint 6–10% + teks gelap sehue).
5. **Legenda status** satu komponen (Sedang berjalan, Selesai, Belum dimulai, Milestone) dipakai di semua halaman.
6. **Layout:** ≥1280px dua kolom (2/3 + 1/3), tablet satu kolom, mobile statistik 2×2.
7. **Semua informasi yang kini tampil harus tetap ada.** Bandingkan sebelum/sesudah per kartu.

**Selesai bila:** tidak ada latar penuh jenuh, kontras teks ≥ 4.5:1 pada light/dark dan semua 5 tema warna.

---

## 7. Fase 5 — Interaktivitas

### 5A. Perbaikan drag Android (prioritas tertinggi)

Lokasi: `ScrumBoardView.tsx` (kartu baris ±270; kolom drop ±193, ±444, ±474), `Records.tsx` (±363, ±409, ±896, ±1122), `TaskTimeline.tsx` (sudah memakai `onPointerDown`, jadikan acuan).

1. **Default: tulis hook `useDragSort` sendiri** dengan Pointer Events + `setPointerCapture` (tanpa paket baru; `TaskTimeline.tsx` sudah memakai `onPointerDown` sebagai contoh di codebase). Long-press 220ms, toleransi gerak 8px. **Alternatif bila hook sendiri terlalu rumit:** `@dnd-kit/core` (kompatibel React 19) dengan `PointerSensor` + `TouchSensor` + `KeyboardSensor`. Pilih satu, catat alasannya di laporan.
2. Tambah **handle drag** (ikon `GripVertical`) pada kartu. `touch-action: none` + `user-select: none` + `-webkit-touch-callout: none` hanya pada handle; badan kartu tetap `touch-action: pan-y` agar scroll berfungsi.
3. Gunakan `DragOverlay` (kartu terangkat: scale 1.03, shadow-lg, miring ±1.5°), placeholder tempat jatuh, auto-scroll tepi layar, `navigator.vibrate(10)` bila ada.
4. Ganti semua `draggable`/`onDragStart`/`onDrop` HTML5 pada papan dan daftar. Pertahankan `CsvDropzone` (file drop dari desktop, memang pakai HTML5).
5. Sediakan alternatif non-drag di mobile: menu "Pindahkan ke…" pada kartu (jaminan bila sentuhan gagal).
6. Uji: Chrome Android, Samsung Internet, WebView/PWA, iOS Safari, desktop mouse.

### 5B. Interaksi tambahan
- **Swipe kartu tugas (mobile):** kanan = selesai, kiri = jadwalkan ulang/hapus, latar aksi terungkap.
- **Centang cepat** + animasi coret + **undo toast** 5 detik.
- **"Ke Hari Ini":** kartu meluncur ke "Tugas Hari Ini" (optimistic UI).
- **Drag antar daftar:** Terlambat → Hari Ini → Menyusul, dan antar status di papan.
- **Kartu dashboard** dapat diciutkan dan diurutkan, tersimpan lewat `usePreference` (sudah ada di `lib/usePreference.ts`).
- **Klik angka statistik** membuka daftar terfilter; **filter chip** animatif.
- **Pintasan:** Ctrl+K tetap; tambah `N` (tugas baru), `T` (ke Hari Ini), `?` (bantuan).
- **Pull-to-refresh** mobile; **skeleton** dan state error ramah.
- **Grafik interaktif:** tooltip hover/tap, klik legenda menyembunyikan seri, klik batang/irisan membuka daftar terfilter (drill-down).

---

## 8. Fase 6 — Animasi

Prinsip: 150–400ms, ease-out, hanya `transform` dan `opacity`. Satu blok `prefers-reduced-motion` terpusat di `tokens.css` yang mematikan/menyederhanakan semuanya (ganti 3 blok tersebar). Perluas animasi yang sudah ada di `DashboardCharts.tsx`.

| Elemen | Animasi |
|---|---|
| Kartu saat dimuat | fade + naik 8px, stagger 60ms |
| Hover kartu | naik 2px + shadow-md (hanya `@media (hover:hover)`) |
| Tekan tombol/kartu | scale 0.97 |
| Angka statistik | count-up dari 0 |
| Progress/ring | mengisi dengan easing |
| Donut | irisan mengisi berputar (`stroke-dashoffset`) |
| Sparkline/line | garis tergambar, titik muncul bergantian |
| Bar | tumbuh dari dasar, stagger |
| Tooltip chart | fade + scale kecil |
| Drag | terangkat, miring, kartu lain bergeser mulus |
| Centang | centang tergambar, teks tercoret, kartu keluar |
| Modal/sheet | naik dengan spring, backdrop fade |
| Empty state | ikon melayang halus |
| Skeleton | shimmer lembut |
| Pindah halaman | crossfade 200ms |

Jalankan animasi chart saat elemen masuk viewport (`IntersectionObserver`), bukan saat load, agar hemat di Android kelas menengah. Gunakan CSS, Web Animations API, dan SVG. **Jangan menambah Framer Motion/Motion One/library chart**; bundle tetap ramping dan semua chart sudah SVG buatan sendiri.

---

## 9. Fase 7 — Pembersihan CSS Legacy

1. Setelah komponen termigrasi, hapus blok CSS lama di `personal.css` yang selectornya tidak lagi dipakai (cek dengan skrip: selector vs className di TSX).
2. Hapus duplikat selector (`.date-field`, `.date-input`, `.bottom-nav`, `.primary`, dan lainnya).
3. Turunkan `!important` dari 2.340 ke < 20.
4. Hapus `sidebar`/`topbar` kelas lama yang tak terpakai (`.sidebar nav a[aria-current] border-left`, gradasi ungu `#b9a7d5`, dan sejenisnya).
5. Target: `personal.css` dihapus dan `layout.tsx` hanya mengimpor `tokens.css`, `base.css`, `components.css`, plus CSS fitur kecil.

**Laporkan metrik sebelum → sesudah:** ukuran CSS, `!important`, radius/font unik, elemen mentah.

---

## 10. Fase 8 — QA

- **Per komponen:** tinggi, radius, font, warna, semua state, light/dark, 5 tema warna.
- **Perangkat:** Android (Chrome, Samsung Internet, WebView/PWA), iOS Safari, desktop Chrome/Edge/Firefox; lebar 320, 360, 390, 768, 1280, 1920.
- **Aksesibilitas:** kontras ≥ 4.5:1, target sentuh ≥ 44px, fokus terlihat, navigasi keyboard, ARIA pada ikon-tombol, reduced-motion.
- **Performa:** animasi 60fps, Lighthouse mobile ≥ 90, CSS lebih kecil dari sebelumnya.
- **Regresi:** uji `vitest` untuk komponen baru (state, aksesibilitas, DateField hanya satu field tampil), screenshot manual halaman utama (light/dark, mobile/desktop). Wajib hijau: `npm run typecheck`, `lint`, `test`, `build`, `audit:source`.
- **Cek akhir "tanpa sisa":** jalankan ulang `audit-ui.mjs`. Hasil wajib: nol elemen mentah, nol hex di TSX/komponen, nol scrollbar horizontal, nol selector duplikat.

---

## 11. Format Laporan per Fase

1. Ringkasan (maks. 5 baris)
2. File diubah (dengan jumlah baris +/−)
3. Metrik sebelum → sesudah
4. Cara menguji
5. Risiko / keputusan yang diambil
6. Checklist kriteria selesai (✔ / ✘)

---

## 12. Urutan Eksekusi

| Fase | Isi |
|---|---|
| 1 | Audit otomatis |
| 2 | Token + lint penjaga |
| 3 | Pustaka komponen + migrasi |
| 4 | Dashboard |
| 5 | Interaktivitas + fix drag Android |
| 6 | Animasi | 1–2 hari |
| 7 | Pembersihan CSS legacy |
| 8 | QA |
| **Total** | |

**Prioritas bila waktu terbatas:** (1) DateField, DateNav, BottomNav (bug yang terlihat), (2) drag Android, (3) token + Button/Input/Badge, (4) dashboard, (5) animasi, (6) pembersihan legacy.

