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

## Fase 6 — animasi saat terlihat

- Grafik memakai IntersectionObserver sekali saat terlihat dengan cleanup/fallback; counter berjalan 400 ms dan menyediakan nilai sebenarnya pada accessible name. Sparkline memakai stroke reveal, titik opacity. Kartu/tombol memakai transform/opacity bertoken; progress/SVG mengisi 400 ms.
- Reduced-motion terpusat satu blok tokens.css; sembilan blok lama dihapus. Tiga important hanya untuk menghentikan animasi legacy. Duplikat identik permukaan dialog baru dihapus.
- Metrik saat ini: important 2.268, duplikat selector 517, CSS 611.635 byte, elemen mentah luar UI 0.
- Verifikasi: 187 tes/29 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 88/88 lulus. Beranda gelap 360 diperiksa visual; N membuka formulir dan ditutup tanpa menyimpan.
- [x] Observer, count-up, motion bertoken dan reduced-motion terpusat.
- [ ] Animasi semua modul, pengukuran 60fps dan perangkat reduced-motion fisik.

## Fase 7A — pembersihan CSS yang dapat dibuktikan

- Skrip clean-css menghapus deklarasi identik yang ditimpa deklarasi selector/konteks sama, mempertahankan important dan fallback nilai berbeda. Selector statistik lama tanpa pemanggil dihapus; selector gabungan :is/:not dipertahankan.
- Ukuran keseluruhan 603.721 → sekitar 575.961 byte; important 2.353 → 2.058; duplikat 522 → 457; radius/font legacy 59/60 masih bervariasi.
- Verifikasi: 187 tes/29 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 88/88 lulus. Beranda gelap 360 diperiksa tanpa luapan.
- [x] Pembersihan deklarasi identik dan statistik yang sudah termigrasi.
- [ ] personal.css dihapus, important <20, nol duplikat dan normalisasi seluruh geometri legacy.

## Fase 7B — token geometri legacy

- 852 deklarasi font dan 796 radius numerik/alias dipetakan ke token bersama; sudut nol dan susunan sudut khusus dipertahankan. Font deklarasi menjadi enam token; radius mencakup empat token dan susunan sudut khusus.
- QA menemukan overflow filter rentang dan tanggal Gantt sempit. Filter sekarang grid, tanggal tersusun penuh di bawah 390 px, label tidak uppercase, selected button memakai warna semantik. Tugas 320/768 tidak meluap.
- Verifikasi: 187 tes/29 berkas, typecheck, lint, lint:ui dan build lulus. CSS tetap lebih kecil dibanding awal; important dan duplikat belum mencapai target.
- [x] Normalisasi font/radius dan perbaikan Gantt sempit.
- [ ] Seluruh state/tema/halaman dan penghapusan personal.css.

## Paket lanjutan fase 3/4 — pilihan dan grafik

- SegmentedControl mengganti pilihan tampilan tugas/kegiatan; Legend mengganti legenda donut/radar. Progress dipakai Meter dengan transform scaleX; null tetap tanpa aria-valuenow dan teks Belum dinilai. EmptyState memakai Button.
- Galeri mengubah tema root sementara untuk menguji CSS yang benar dan memulihkan atribut saat keluar; tidak mengubah preferensi tersimpan. Galeri 320 tidak meluap.
- Kontras teks primer (terang/gelap): peach 5,75/8,44; lavender 5,05/8,25; sage 4,88/8,38; sky 4,69/7,45; lime 12,36/13,20. Ini hanya tombol primer, bukan bukti semua teks sudah memenuhi kontras.
- Verifikasi: 190 tes/30 berkas, typecheck, lint, lint:ui, check:ui, build dan audit sumber 91/91 lulus.
- [x] Pilihan tampilan, legenda donut/radar dan progres bersama.
- [ ] Seluruh label form/tooltip/card, seluruh tema/state dan kontras teks selain primer.

## Fase 7C dan QA sementara

- Skrip prune-css memakai string AST seluruh sumber dan prefix/suffix dinamis untuk mengenali kelas; selector kompleks :is/:not/:where/:has serta selector escape dipertahankan. Selector sederhana tanpa pemanggil dipangkas (253 kelas personal, 39 globals, sebagian beririsan). Ini bukan penghapusan semua CSS legacy.
- Field umum input/textarea Editor memakai label/id bersama. Nilai input color bawaan memakai default skema yang sah; token presentasi tidak dipakai sebagai data tersimpan. Tes regresi proyek ditambahkan.
- Metrik awal → terakhir: CSS 603.721 → 517.624 byte (turun sekitar 14%); important 2.353 → 1.979; selector berulang 522 → 384; font 60 → 6; radius 59 → 9 termasuk variasi sudut; kontrol mentah luar UI 289 → 0. Hex TSX 24 masih berada pada konfigurasi palet pemilik yang dipertahankan.
- Verifikasi: 191 tes/30 berkas, typecheck, lint, lint:ui, build, check:ui, audit sumber 91/91 lulus.
- Galeri gelap diperiksa ukuran halaman 320/360/390/768/1024/1280/1440/1920: scrollWidth sama dengan clientWidth. Screenshot galeri terang/gelap 360 tersimpan lokal di artifacts/astra. Kontras primer lima tema diperiksa sebelumnya.
- QA halaman berdata terhenti pada /pin setelah sesi 12 jam kedaluwarsa. Login pengguna diperlukan untuk melanjutkan pemeriksaan visual tersebut; PIN tidak diminta/disimpan.
- [x] Pangkas selector sederhana tanpa pemanggil dan perbaiki Field/data warna.
- [x] QA ukuran galeri dan screenshot 360 terang/gelap.
- [ ] Seluruh halaman/state/kontras/tema, perangkat fisik, Firefox/Edge dan Lighthouse ≥90.
- [ ] personal.css dihapus, important <20, nol duplikat serta nol hex TSX.

## Pekerjaan berikutnya

1. Setelah pengguna masuk kembali, periksa rute/data aktif pada 320/360/768/1024/1440, terutama Editor, tugas/papan dan semua domain pencatatan.
2. Lanjutkan migrasi Card/Badge/Field khusus, Tooltip, empty state dan semua legenda; jangan menghitung tes lama sebagai penerimaan fitur baru.
3. Pecah aturan yang masih aktif menjadi base/components/fitur dan turunkan important melalui perbaikan cascade disertai QA; jangan menghapus/merename personal.css untuk sekadar memenuhi nama target.
4. Lengkapi QA fisik/performa dan audit tanpa sisa sebelum menyatakan PLAN-ASTRA selesai.
