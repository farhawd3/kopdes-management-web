# Pelaksanaan PLAN-ASTRA — 4 Oktober 2026

## Fase 1 — audit otomatis selesai

- Audit JSX memakai AST TypeScript, CSS memakai PostCSS. `AUDIT.md` memuat seluruh kontrol dengan file/baris, rute, overlay, nilai deklarasi dan selector berulang dalam konteks yang sama.
- Berkas: `scripts/audit-ui.mjs` baru; `package.json` menambah `audit:ui`; `AUDIT.md` hasil yang dapat dibuat ulang.
- Baseline: 250 button, 45 input, 4 select, 5 textarea; 289 kontrol di luar UI; 37 hex TSX, 946 hex CSS; CSS 603.721 byte, 2.353 important, 522 selector berulang.
- Verifikasi: 171 tes/23 berkas lulus; typecheck, lint, build, audit:source (74/74) dan audit:ui berhasil.
- Keputusan: angka di arsip rencana diganti pengukuran aktual. Duplikat selector adalah kandidat tinjauan, bukan izin menghapus aturan responsif. Perubahan awal personal.css, Settings.tsx, ThemeContext.tsx dipertahankan; snapshot lokal ada di artifacts/astra (diabaikan Git).
- [x] Semua kontrol mentah terdata.
- [x] Inventaris rute/overlay tersedia.
- [ ] Pemeriksaan visual baru: belum berlaku pada fase audit tanpa perubahan tampilan.

## Tahap berikutnya

Migrasi visual penuh, interaktivitas, animasi dan QA menyeluruh masih berjalan. Bukti perangkat fisik dan Lighthouse tidak boleh disimpulkan dari tes DOM/build.

## Fase 2 — fondasi token dan penjaga CSS

- `tokens.css` menambah empat radius, enam peran font, kontrol, spasi, ikon, motion dan alias warna ke pastel/tema aktif. `ui.css` menyiapkan primitive berawalan ui tanpa important/hex.
- Stylelint terpasang sebagai satu devDependency yang diizinkan rencana; `lint:ui` melarang hex, important dan radius/font tanpa token pada CSS baru. Legacy tetap diaudit terpisah agar utang lama tidak tersamarkan.
- Verifikasi: 171 tes/23 berkas, typecheck, lint, lint:ui dan build lulus. CSS baru memiliki empat nilai radius token dan enam peran font; belum ada klaim kontras seluruh tema.
- Keputusan: font isi mobile 14, bukan 13,5, mengikuti permintaan menghapus ukuran pecahan; kontrol mobile 48 menjaga minimum sentuh 44. Warna tidak diduplikasi. Pemeriksaan visual menyeluruh menyusul galeri komponen.
- [x] Fondasi token dan stylelint tersedia.
- [ ] Penjaga elemen mentah diaktifkan setelah migrasi fase 3.
- [ ] Normalisasi seluruh CSS legacy dan kontras seluruh tema.

## Fase 3 — paket kontrol dan navigasi

- Seluruh button/input/textarea pemanggil beralih ke primitive bersama; tiga select Editor beralih ke Select kustom. Handler, nilai form dan referensi dipertahankan. Tambahan Badge, Card, Field, DateNav, BottomNav dan permukaan dialog bersama.
- DateInput menampilkan satu tanggal dd/mm/yyyy; native tersembunyi menjaga validasi/form, invalid mengembalikan fokus ke pemicu. Kalender tetap membuka ke bawah dan memperhitungkan scrollbar viewport.
- DateNav dipakai kalender/Gantt; dock memakai lima struktur ikon/label setara. Modal berulang memakai dialog native dengan pemulihan fokus; tiga dialog lain memakai permukaan bersama tanpa mengganti lifecycle lama.
- Metrik: kontrol mentah luar UI 289 → 0; important 2.353 → 2.278; duplikat 522 → 519. CSS keseluruhan 603.721 → 609.077 byte karena lapisan transisi; belum mencapai target akhir pembersihan.
- Verifikasi: 175 tes/24 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 83/83 lulus. Galeri 360 terang/gelap: satu tanggal, popup, Escape, dock dan tanpa luapan; Beranda 360/768 terang diperiksa visual. Belum semua halaman/state/tema.
- Keputusan: aturan elemen legacy mengecualikan primitive baru; blok tanggal/dock yang sudah tidak dipanggil dihapus. Galeri `/dev/komponen` hanya tersedia pada mode development, tanpa data/database.
- [x] Nol kontrol mentah di luar UI, dijaga `check:ui`.
- [x] DateField, DateNav, BottomNav dan tes regresi.
- [ ] Migrasi lengkap Card/Badge/Field/Tabs/Toast/Tooltip/Legend ke semua pemanggil.
- [ ] Semua state/halaman pada 320 px ke atas.

## Fase 4 — kartu dashboard netral

- Empat statistik memakai permukaan netral, angka/judul bertoken dan ikon tint; ring/progres serta tautan daftar tetap tersedia. Kartu perhatian netral; kartu tugas tanpa garis kiri dekoratif. Baris terlambat Hari Ini memakai badge danger dan permukaan netral.
- Tata letak statistik 2×2 mobile/tablet, empat kolom desktop; isi satu kolom hingga 1280 lalu rasio 2:1. Dropdown bersama diperbaiki agar warna gelap mengikuti token.
- Berkas utama: Dashboard +5/−5, TodayView +6/−5, DashboardCharts +13/−13, FollowUps +3/−2, ui.css serta Select. Hex presentasi TSX 37 → 24; sisanya konfigurasi palet ThemeContext yang sudah diubah pemilik sebelum sesi.
- Verifikasi: 175 tes/24 berkas, typecheck, lint, lint:ui, check:ui dan build lulus. Beranda terang 360/768/1024/1440 tanpa luapan; gelap 1440 diperiksa visual. Dropdown gelap terukur memakai latar/teks gelap yang sesuai token.
- [x] Statistik netral, informasi/tautan dan layout adaptif.
- [ ] Legenda semua grafik, seluruh empty state dan audit kontras seluruh lima tema.

## Fase 5A — drag Pointer Events

- Hook `useDragSort` mengganti HTML5 drag pada papan tugas/kegiatan: long-press 220 ms, toleransi awal 8 px, pointer capture, Escape/pointercancel/lost capture, zona terbatas pada papan, gulir tepi dan vibrasi opsional. Touch-action none hanya pada handle; badan kartu pan-y.
- Overlay kartu tampil melalui portal; zona tujuan ditandai outline. Dropdown “Pindahkan … ke” menyediakan pemindahan tanpa drag/keyboard. Pemindahan tugas tetap memakai aturan status domain dan kegiatan tetap memakai aturan tanggal sebelumnya. Galat kegiatan kini terlihat.
- Atribut drag pada kartu daftar/kalender yang tidak memiliki target drop dihapus. CsvDropzone tetap memakai HTML5 file drop.
- Verifikasi: 181 tes/26 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 85/85 lulus. Tes baru memeriksa long-press, scroll awal, sekali kirim, Escape/cancel, busy, batas papan, tanggal selesai dan galat server. Galeri browser desktop membuktikan kartu contoh berpindah rencana → proses tanpa database.
- [x] Drag berbasis pointer, handle, overlay, auto-scroll dan alternatif tanpa drag.
- [ ] Placeholder posisi urut di dalam kolom (papan saat ini memindahkan status/tanggal, bukan urutan manual).
- [ ] Chrome Android, Samsung Internet, WebView dan iOS Safari fisik.
- [ ] Interaksi tambahan bagian 5B.

## Fase 5B — interaksi tugas

- Pintasan N membuat tugas, T membuka Hari Ini, ? membuka bantuan; form, listbox, modal dan modifier dikecualikan. Panel grafik/rutinitas mengingat buka/tutup.
- Swipe horizontal mobile kanan menyelesaikan tugas dan kiri membuka penyunting; scroll vertikal/kontrol tetap aman. Setelah perubahan status/tanggal berhasil, toast Batalkan berlaku 5 detik dan memulihkan hanya bidang terkait dari snapshot; data terbaru lainnya dipertahankan.
- Verifikasi: 185 tes/28 berkas, typecheck, lint, lint:ui, check:ui dan build lulus. Tes baru memeriksa undo, galat API, swipe/scroll dan klik detail.
- [x] Pintasan, preferensi panel, swipe dan undo.
- [ ] Pratinjau gestur swipe serta QA sentuh fisik.
