# Status proyek — 3 Oktober 2026

## Pembersihan Aturan Layout Navigasi (3 Oktober 2026)

- Menghapus blok `@media (min-width: 768px) and (max-width: 1100px)` ganda pada `src/app/personal.css` yang menetapkan `margin-left: 205px` dan `width: 205px` untuk sidebar. Blok tersebut sudah tertimpa penuh oleh blok tablet-rail yang lebih akhir (sidebar 280px overlay + rail 76px + `margin-left: 76px`), sehingga menjadi aturan mati yang membingungkan.
- Memindahkan satu-satunya aturan yang masih berlaku dari blok lama (`.home-grid` satu kolom di tablet) ke blok tablet-rail yang menang, agar tata letak beranda tidak sempit setelah rail 76px.
- Hasil: satu breakpoint = satu aturan untuk `.manager-topbar`, `.manager-main`, dan `.manager-sidebar`; tidak ada lagi dua blok media dengan rentang penuh yang sama saling menimpa.
- Verifikasi: 147 tes (19 berkas) lulus, `tsc --noEmit` 0 error, `next build` sukses. Pemeriksaan visual pasca-login pada 360/768/1024/1440 px masih memerlukan PIN pemilik.

## Rombak Total Tampilan Agenda Kalender: Eliminasi Header Ganda & Kartu Tugas Modern Elegan (3 Oktober 2026)

- **Eliminasi Redundansi Header Box-in-a-Box (`TaskCalendar.tsx` & `personal.css`)**:
  - Mengatasi masalah duplikasi header pada tampilan tanggal terpilih (*selected date view*), di mana tanggal dan jumlah catatan sebelumnya ditampilkan dua kali secara bertumpuk (pada bilah header atas dan pada kartu pembungkus `.calendar-agenda-day-head`).
  - Menghilangkan bingkai kotak bersarang (*nested box*) dengan menerapkan mode `.is-selected-view` yang bersih, flat, dan menyatu langsung dengan aliran kartu tugas.
  - Memperbarui bilah header agenda dengan kotak ikon kalender modern (`.calendar-agenda-header-icon`), tipografi judul tebal 17px yang jelas, pill hitungan catatan beraksen pastel, dan tombol aksi terpadu (`+ Tambah tugas` & `Semua tanggal`).
- **Desain Ulang Kartu Tugas Agenda Kalender (`Records.tsx` & `personal.css`)**:
  - Menggantikan tampilan kartu lama yang kaku, kosong, dan tidak beraturan dengan kartu tugas terpadu (`.calendar-task-card`):
    - **Header Metadata**: Checkbox lingkaran cepat (`.task-round-check` 22px), kode monospace tugas (`TGS-F2A4`), pill proyek terhubung dengan titik warna indikator, lencana tingkat prioritas berikon (`Flame` / `AlertCircle`), serta status pill dinamis.
    - **Judul & Cuplikan Deskripsi**: Judul tugas tebal 15.5px interaktif (membuka laci detail tugas `TaskDetailDrawer` saat diklik), efek coret saat selesai, dan cuplikan deskripsi jika ada.
    - **Daftar Subtugas**: Mini progress bar horizontal persentase penyelesaian, ringkasan `done/total`, dan checkbox bulat subtugas (`.subtask-round-check` 18px) interaktif dengan efek coret teks tanpa muat ulang halaman.
    - **Footer Aksi Terpadu**: Avatar inisial penanggung jawab (`Manajer`), pill tanggal tenggat berikon, tombol penundaan cepat `+1 hari`, tombol buka rincian `Buka catatan` (`<ExternalLink size={13} />`), tombol status utama `✓ Selesai` / `↺ Buka lagi`, serta menu dropdown melayang titik tiga (`<MoreHorizontal />`) untuk opsi `+1 minggu` dan `Hapus tugas`.
- **Dukungan Dark Mode Penuh**:
  - Seluruh komponen kartu agenda kalender memiliki penataan warna dan kontras tinggi di mode gelap (`.dark` dan `[data-theme='dark']`).
- **Verifikasi Kualitas**:
  - Menambahkan pengujian khusus `Records mode kalender menampilkan agenda terpilih dan calendar-task-card modern` di `tests/redesign.test.tsx`.
  - Seluruh 147 unit test (19 berkas) lulus 100%.
  - Pemeriksaan tipe TypeScript (`tsc --noEmit`) 0 error.
  - Kompilasi produksi Next.js (`npm run build`) sukses tanpa kendala.


- **Sinkronisasi Selector Atribut Ganda (`ThemeContext.tsx` & `AppShell.tsx`)**:
  - Memperbaiki `ThemeProvider` agar menyetel atribut `data-theme="dark"` pada `document.documentElement` secara simultan dengan class `.dark`. Sebelumnya, ketiadaan atribut `data-theme` menyebabkan puluhan selektor bertarget `[data-theme='dark']` gagal diaplikasikan.
  - Memperbaiki script inisialisasi awal di `layout.tsx` (`<head>`) untuk membaca `localStorage` dan preferensi sistem sebelum hidrasi, sehingga transisi tema bebas kedip (*flash-free*).
  - Menyinkronkan tombol pengubah tema bilah atas dan bilah bawah mobile dengan status tema aktif riil (`theme` vs `preference`), menampilkan ikon Matahari (<Sun />) saat mode gelap dan Bulan (<Moon />) saat mode terang.
- **Perbaikan Kontras Ekstrem & Teks Tak Terbaca (`personal.css` & `polish.css`)**:
  - Mengeliminasi penggunaan warna teks gelap statis (`var(--brand-text)` / `#111215`) di atas kontainer gelap dalam mode malam:
    - `.routine-time`, `.journal-join-link`, `.journal-join-chip`, `.j-meeting`, `.journal-view-all` kini menggunakan warna terang kontras tinggi (`var(--brand)`).
    - `.quick-add-icon`, `.member-pill`, `.item-pill`, `.round-arrow`, `.range-days-pill`, `.action-modal-badge` disesuaikan kontrasnya agar tajam dan terbaca sempurna.
  - Memperbaiki lencana status tabel dan pencatatan (`.badge-active`, `.badge-income`, `.badge-expense`, `.badge-diff-zero`, `.badge-diff-minus`, `.badge-diff-plus`, `.badge-late`, `.table-amount`, `.table-num`, `.table-btn-done`) dengan warna latar lembut gelap dan teks berpendar kontras.
  - Memperbaiki dropdown `CustomSelect` (`.custom-select-menu`, `.custom-select-option:hover`, `.is-selected`, `.custom-select-check`) agar menggunakan palet permukaan gelap `#181922` dan bingkai `#2e3242`.
  - Mengimplementasikan penataan lengkap komponen `.csv-dropzone` untuk mode terang dan gelap dengan garis putus-putus beraksen, teks bantuan abu-abu seimbang, dan badge konfirmasi hijau emerald kontras.
  - Menyesuaikan indikator pemilih waktu `input[type="time"]::-webkit-calendar-picker-indicator` dengan filter invert pada dark mode.
- **Verifikasi Kualitas**:
  - Seluruh 146 unit pengujian vitest (19 berkas) lulus 100%.
  - Pemeriksaan tipe TypeScript (`tsc --noEmit`) 0 error.
  - Kompilasi produksi Next.js (`npm run build`) sukses tanpa kendala.


- **Perbaikan Bentuk Sel Tanggal Mobile Sempurna Simetris (`polish.css` & `personal.css`)**:
  - Mengatasi masalah kapsul hitam dan kapsul lime lonjong 28px x 44px yang sebelumnya menempel canggung di sisi kiri setiap sel tanggal akibat konflik aturan CSS (`max-width: 28px` vs `height: 44px` dan `background: var(--canvas)`).
  - Menstandarkan sel tanggal mobile berdimensi `height: 52px` dengan tata letak flex terpusat simetris dan lingkaran angka tanggal bundar sempurna `26px x 26px`.
  - Memberikan indikator hari ini (*Today*) berupa lingkaran pastel aksen bertema emerald lembut, dan indikator tanggal terpilih (*Selected*) berupa lingkaran solid dengan kontras tinggi serta kartu aktif bercahaya halus.
  - Memperbaiki jarak antar-sel grid dari `1px` menjadi `4px` sehingga setiap kotak tanggal memiliki batas kartu yang bersih, terpisah, dan tidak berhimpitan.
- **Penyajian Info Tugas Langsung pada Kalender Mobile (`TaskCalendar.tsx`, `polish.css`, & `personal.css`)**:
  - Menghilangkan masalah kalender mobile yang sebelumnya tidak menampilkan informasi tugas apapun akibat disembunyikan total (`display: none`).
  - Menambahkan indikator titik tugas mobile (`.calendar-mobile-dots`) tepat di bawah angka tanggal untuk setiap hari yang memiliki aktivitas:
    - Titik **Merah** (`.dot-urgent`): Tugas mendesak / tenggat terlewat.
    - Titik **Amber** (`.dot-high`): Tugas prioritas tinggi.
    - Titik **Emerald** (`.dot-normal`): Tugas reguler aktif / dalam proses.
    - Titik **Biru** (`.dot-done`): Tugas selesai.
    - Lencana angka `+N` jika terdapat lebih dari 3 tugas dalam satu tanggal.
- **Penyempurnaan Header & Kontrol Agenda Tanggal Terpilih (`TaskCalendar.tsx` & `personal.css`)**:
  - Menyediakan ringkasan jumlah tugas pada tanggal terpilih (`N catatan`) dan tombol pintasan `Semua tanggal` untuk kembali ke ikhtisar penuh bulan ini.
- **Verifikasi Kualitas**:
  - Menambahkan pengujian `menampilkan indikator titik tugas mobile dan ringkasan info agenda` di `tests/calendar.test.tsx`.
  - Seluruh 146 unit tes lulus 100% (19 berkas), 0 kesalahan TypeScript, dan kompilasi produksi Next.js sukses tanpa error.

## Penataan Ulang Kartu Tugas Papan (Scrum/Kanban) Lebih Efisien, Rapi & Elegan (3 Oktober 2026)

- **Restrukturisasi Layout Kartu 3 Bagian Terpadu (`ScrumBoardView.tsx` & `personal.css`)**:
  - Mengeliminasi penumpukan baris ganda yang memboroskan ruang vertikal (~50% pemangkasan tinggi kartu yang berlebihan, dari ~190px–210px menjadi ~95px–105px).
  - **Bilah Header Metadata Terpadu**: Menggabungkan kode tugas (`TGS-F2A4` dalam monospace badge ringkas) dan lencana proyek di sebelah kiri, berdampingan dengan pill tingkat prioritas berikon (`Tinggi` / `Mendesak`) serta tenggat tanggal berikon kalender di sebelah kanan.
  - **Badan Kartu Fokus**: Judul tugas tampil menonjol, tegas, dan mudah dibaca tanpa garis pemisah (*divider*) yang kaku, disertai cuplikan deskripsi jika tersedia.
  - **Bilah Footer Tunggal & Seimbang**: Menggabungkan avatar inisial manajer (`M`) dan nama penanggung jawab, indikator progres subtugas ringkas (`☑ 0/1` dengan mini progress bar 28px), serta tombol aksi cepat status (`Mulai Kerja →` / `← Rencana` & `✓ Selesai` / `↺ Buka Lagi`) dalam satu baris horizontal tanpa kekosongan ruang.
- **Penyelarasan Desain & Konsistensi Multiplatform (`personal.css` & `polish.css`)**:
  - Standarisasi lencana kode `.card-task-code` berdimensi `padding: 1.5px 6px` dan radius `5px`.
  - Tombol aksi cepat `.card-quick-move-btn` berdimensi kompak `height: 25px` dengan aksen warna tema emerald/biru yang halus.
  - Penyesuaian responsif `flex-wrap: wrap` sehingga kartu tetap rapi pada layar ponsel maupun tablet/desktop.
- **Verifikasi Kualitas**:
  - Menambahkan pengujian `ScrumBoardView menampilkan kartu tugas dengan indikator subtugas dan tombol status yang tepat` di `tests/redesign.test.tsx`.
  - Seluruh 144 unit tes lulus 100% (19 berkas), 0 kesalahan TypeScript, dan kompilasi Next.js sukses.

## Penyempurnaan Detail Tugas: Dropdown Prioritas Rapi, Kartu Bukti Pengumpulan Bersih & Konsistensi Kotak Centang (3 Oktober 2026)

- **Perapihan Dropdown Prioritas & Status (`TaskDetailDrawer.tsx` & `personal.css`)**:
  - Mengatasi teks bertumpuk, ikon bendera mepet, dan garis dobel pada dropdown prioritas dengan menerapkan kontrol pill terpadu berdimensi `height: 32px`, `padding: 0 28px 0 28px` (jarak aman untuk ikon bendera di kiri dan panah dropdown di kanan).
  - Menyelaraskan warna ikon bendera dinamis sesuai tingkat urgensi (Rendah: slate `#64748b`, Normal: biru `#0284c7`, Tinggi: amber `#b45309`, Mendesak: merah `#dc2626`).
  - Menstandarkan dropdown status dan prioritas dengan bingkai halus tunggal dan latar warna pastel yang serasi dengan tema.
- **Rombak Total Bagian Link Pengumpulan / Bukti Hasil (`TaskDetailDrawer.tsx` & `personal.css`)**:
  - Mengeliminasi tombol ganda yang sebelumnya muncul bertumpuk (*+ Pasang link pengumpulan* dan *+ Tambah Link Bukti / Hasil* pada saat bersamaan).
  - Mengubah bagian link pengumpulan menjadi kartu metadata mandiri berbingkai rapi (`.task-submission-card`) lengkap dengan lencana status ("Terpasang" / "Belum Ada Tautan").
  - Menghadirkan kotak kosong (*empty state box*) dengan deskripsi informatif dan satu tombol utama yang elegan: `+ Pasang Link Pengumpulan`.
  - Menyediakan tombol aksi terpadu saat link terpasang: Buka Hasil ↗, Salin Tautan (dengan toast konfirmasi), Ubah Link, dan Hapus Link.
- **Perapihan Bilah Tanggal Tenggat & Kotak Centang Subtugas (`TaskDetailDrawer.tsx` & `personal.css`)**:
  - Mengubah bilah tenggat dari pil hitam raksasa menjadi kartu metadata rapi berlatar `var(--surface)` dengan input tanggal berbingkai rapi.
  - Mengunci kotak centang subtugas (`.subtask-check-circle`) menjadi lingkaran presisi `18px x 18px` dan menonaktifkan pseudo-element `::after` yang sebelumnya menyebabkan bentuk lonjong.
- **Verifikasi Kualitas**:
  - Seluruh 144 unit tes lulus 100% (19 berkas), 0 error TypeScript, dan kompilasi Next.js sukses.

## Rombak Desain Tugas Harian Tanpa Dropdown & Koreksi Checkbox Bulat Sempurna (3 Oktober 2026)

- **Desain Tugas Harian Tanpa Dropdown / Accordion (`DailyTasksView.tsx` & `personal.css`)**:
  - Mengganti sistem pelipatan accordion dropdown kebawah dengan perencana harian terbuka (*Open Day-Planner*): seluruh tugas hari terpilih langsung tersaji terbuka, jelas, dan modern tanpa perlu mengklik panah ekspansi.
  - Menghilangkan seluruh tombol chevron lipat-buka (`<ChevronDown>`, `<ChevronRight>`, `.toggle-collapse-btn`) pada hari kerja, tugas terlewat, dan tugas mendatang.
  - Menambahkan kontrol lompat hari cepat (`← Hari Sebelumnya`, tombol `Hari Ini`, dan `→ Hari Berikutnya`) serta bilah tab 7-hari interaktif yang otomatis tersinkronisasi dengan pekan aktif.
  - Menghadirkan dua mode tampilan: **Fokus Hari** (tampilan utama kartu hari aktif lengkap dengan judul tanggal bahasa Indonesia `Sabtu, 3 Oktober 2026`, lencana status, indikator progress bar penyelesaian, dan tombol `+ Tambah Tugas`), serta **Semua Pekan** (seluruh 7 hari ditampilkan mengalir terbuka tanpa dropdown).
  - Menyajikan bagian tugas terlewat (*overdue*) dan tugas mendatang (*upcoming*) dalam kartu peringatan terbuka yang selalu terlihat dan tidak berisiko terlewatkan.
- **Koreksi Bentuk Checkbox Bulat Sempurna (`personal.css`)**:
  - Mengatasi bentuk lonjong / oval pada checkbox tugas utama yang sebelumnya terjadi karena elemen `<button>` mewarisi `min-height: 44px` dari aturan global.
  - Menerapkan kuncian dimensi lingkaran presisi `22px x 22px` (`aspect-ratio: 1 / 1 !important`, `min-width: 22px !important`, `min-height: 22px !important`, `border-radius: 50% !important`, `padding: 0 !important`).
  - Menghapus pseudo-element `::after` yang bertabrakan dengan ikon SVG `<Check />` dari Lucide, sehingga ikon centang tampil bersih dan pas di tengah.
  - Menyelaraskan checkbox subtugas (`.subtask-round-check`) menjadi lingkaran presisi `18px x 18px` dengan konektor pohon subtugas yang lembut dan terpadu.
- **Verifikasi Kualitas & Unit Test (`tests/redesign.test.tsx`)**:
  - Menambahkan pengujian khusus `DailyTasksView menggunakan desain terbuka tanpa dropdown accordion`.
  - 144/144 unit tes lulus 100% (19 berkas), 0 kesalahan TypeScript (`tsc --noEmit`), dan kompilasi produksi Next.js berjalan sukses tanpa kendala.

## Paket Perombakan UI & Interaksi: Pintasan Terhubung, Navigasi Multiplatform, Perampingan Tugas, dan Desain Dashboard Pastel (3 Oktober 2026)

- **Pintasan Cepat Buat Baru pada Formulir Terhubung (`Editor.tsx`)**:
  - Menambahkan tombol pintasan inline *+ Proyek Baru*, *+ Mitra Baru*, *+ Milestone Baru*, *+ Rapat Baru*, *+ Dokumen Baru*, serta *+ Tugas Baru* (pada form Kegiatan) di samping field caption relasi.
  - Membuka form mikro inline langsung di tempat, memvalidasi dengan Zod, dan memilih item baru secara otomatis tanpa perlu berpindah halaman.
  - Mengelompokkan pilihan proyek pada dropdown menjadi `<optgroup label="Proyek Aktif">` (proyek yang sedang berjalan) dan `<optgroup label="Riwayat / Selesai">` (proyek selesai/arsip).
- **Aksi Cepat & Penyempurnaan Animasi Laci Detail Tugas (`TaskDetailDrawer.tsx` & `personal.css`)**:
  - Mengganti animasi buka laci kaku dengan `@keyframes drawerOpenSmooth` (translasi lembut 42px dengan scale 0.985 ke 1 dan opacity fade-in cubic bezier).
  - Menambahkan pengubah status langsung (Rencana, Dikerjakan, Selesai, Dibatalkan) tanpa perlu membuka form ubah penuh.
  - Menambahkan pengubah prioritas langsung (Rendah, Normal, Tinggi, Mendesak) dengan penanda warna visual.
  - Menambahkan pengubah tanggal tenggat langsung (*inline date input*) dengan format kalender rapi.
  - Mengamankan aksi hapus tugas dengan soft-cancellation berstatus `dibatalkan` untuk mencegah error HTTP 405.
- **Navigasi Multiplatform Tablet & Desktop (`AppShell.tsx` & `personal.css`)**:
  - Mengaktifkan kembali bilah rel tablet (`tablet-rail`) berlebar 72px yang ergonomis dengan ikon, teks keterangan berlabel (Beranda, Hari Ini, Tugas, Kegiatan, Menu), dan indikator aktif bernuansa pastel.
  - Menambahkan tombol pembuka menu universal (`topbar-nav-menu-btn`) di bilah atas untuk tablet, mobile, dan desktop ketika bilah sisi sedang disembunyikan.
- **Perampingan Halaman Tugas (`Records.tsx`)**:
  - Mengisolasi kartu target periode (sprint), formulir input cepat draf, tampilan tersimpan (*saved views*), dan aksi massal (*task batch actions*) agar hanya tampil di mode `daftar`.
  - Tampilan `harian` dan `papan` kini sepenuhnya bebas dari tumpukan komponen yang membingungkan dan langsung fokus pada rencana kerja hari itu serta kolom Kanban.
  - Menyembunyikan bilah filter ganda pada mode `harian` untuk menghindari redundansi dengan kontrol bawaan `DailyTasksView`.
- **Navigator Mingguan Interaktif Tugas Harian (`DailyTasksView.tsx` & `personal.css`)**:
  - Menambahkan bilah navigator mingguan 7 hari (*Interactive Weekly Strip*) lengkap dengan nama hari, tanggal, dot indikator tugas belum tuntas, serta tombol pintas "Hari Ini Saja" dan "Buka Semua".
- **Paket Tema Warna Pastel & Kartu Swatch Modern (`Settings.tsx` & `personal.css`)**:
  - Menata ulang pemilihan warna di Pengaturan menjadi kartu paket palet pastel modern: Mint & Sage, Lavender Mist, Peach & Oat, Pastel Sky, Matcha & Lime, serta Charcoal & Slate.
  - Menampilkan strip 3 warna (Utama, Pendamping, Lembut), badge status aktif, dan keterangan nuansa kerja.
- **Rombak Total Grafik Dashboard (`DashboardCharts.tsx` & `personal.css`)**:
  - Memperbarui `WeekBarChart` dengan metrik 28px tebal, badge rata-rata harian, pill hari puncak, dan chip reset filter terpilih.
  - Menata ulang batang grafik penyelesaian 7 hari dengan tinggi 160px, rounded track 10px, gradient pastel lembut, dan penanda tanggal hari ini.
  - Memoles `TaskDonutChart` dengan diagram lingkaran SVG 120px, total tugas tebal di tengah, dan kartu legenda status berbentuk pill interaktif.
- **Penataan Font Dropdown & Kuncian Popover Kalender (`personal.css`)**:
  - Menstandarkan `vertical-align: middle !important` dan perataan tengah di semua dropdown tanpa kecuali.
  - Mengunci kontainer `.date-field` dan popover `.date-picker` secara eksplisit (`top: calc(100% + 6px) !important; bottom: auto !important;`) sehingga popover kalender selalu konsisten terbuka ke arah bawah.
- **Verifikasi Kualitas**: 143/143 tes lulus (19 berkas), 0 error TypeScript, Next.js Turbopack build sukses 100%.

## Paket Perapihan Menyeluruh, Harmonisasi Judul & Optimalisasi Antarmuka Mobile (2 Oktober 2026)

- **Eliminasi Judul Halaman Redundan (`WorkspacePage.tsx`, `Settings.tsx`, `personal.css`)**:
  - Menghapus blok `page-heading` dobel di `WorkspacePage.tsx` yang sebelumnya mencetak judul ganda (seperti "Kegiatan" di atas "Kegiatan", atau "Tugas" di atas "Tugas").
  - Menjadikan `section-head` milik masing-masing fitur (`Records`, `Operations`, `Projects`, `Reports`, `FollowUps`, `Settings`, dsb.) sebagai satu-satunya kepala halaman kanonik lengkap dengan deskripsi dan tombol aksi.
  - Memberikan `section-head` resmi pada `Settings.tsx` agar selaras dengan seluruh halaman sistem.
- **Perapihan Banner Form Tugas (`Editor.tsx` & `polish.css`)**:
  - Membatasi lebar banner intro `.task-form-intro` agar kompak (`max-width: 580px; margin: 4px 0 14px;`) pada desktop dan responsive rapi pada mobile.
  - Memperpendek redaksi tombol menjadi *"Detail lainnya: opsi lanjutan, kendala & subtugas"*, menghilangkan tombol run-on yang sebelumnya melebar canggung.
- **Standarisasi Tipografi Dropdown Global (`personal.css`, `globals.css`, `workspace.css`)**:
  - Menyelaraskan seluruh elemen `select`, `select option`, `select optgroup`, `.custom-select-trigger`, `.custom-select-option`, `.field-select`, dan `.task-status-select` ke `var(--font-sans)` ukuran 13.5px dengan anti-aliasing tajam.
  - Menghapus rendering font bawaan browser pada Chrome base-select.
- **Pemberian Gaya Lengkap Input Kalender / Tanggal (`personal.css`, `globals.css`)**:
  - Memberikan gaya visual konsisten untuk semua `input[type="date"]`, `input[type="month"]`, dan `input[type="time"]` di seluruh modal (`SprintModal`, `Reports`, `TaskTimeline`, `TaskBatchActions`, `Editor`).
  - Menambahkan border halus, tinggi kontrol standar 42px, radius 10px, font sans serasi, indikator kalender webkit dengan invert gelap otomatis di tema dark mode.
- **Perbaikan Dropdown Toolbar "Perlu Perhatian" di Mobile (`FollowUps.tsx` & `personal.css`)**:
  - Menata ulang `.follow-up-toolbar` dan `.follow-up-filter-group` pada layar $\le 768$px menjadi tumpukan vertikal bersih dengan dropdown seleksi selebar 100%, menghilangkan terpotongnya dropdown filter di ponsel.
- **Penyelarasan Tombol Aksi Dock Ponsel (`AppShell.tsx` & `polish.css`)**:
  - Menghilangkan bulatan neon mengambang setinggi `-8px` / `-12px` yang mencolok sendiri di bilah bawah.
  - Menyelaraskan tombol aksi cepat ke tinggi standar 48px dengan aksen pastel lembut `var(--brand-soft)` yang rapi dan serasi dengan 4 tombol dock lainnya (Beranda, Tugas, Kegiatan, Menu).
- **Perbaikan Penataan "Tugas Baru" & Riwayat Selesai di Mobile (`personal.css`)**:
  - Menghilangkan hack margin negatif `-52px` pada header `.task-database` di ponsel.
  - Menata ulang `.task-database > .section-head` di mobile dengan judul, deskripsi, dan tombol `+ Tugas baru` yang tertata proporsional.
  - Memperbaiki layout `.completed-archive-header` dan linimasa `.completed-github-timeline` di mobile: padding disesuaikan (20px), tombol buka kembali tertata tanpa menabrak judul, dan tombol kembali ke tugas aktif memenuhi lebar ponsel dengan nyaman.
- **Pemberian Jarak Bawah pada Status "Semua Terkendali" (`FollowUps.tsx` & `personal.css`)**:
  - Membungkus status bersih dengan `.follow-up-compact-container` dan memberikan `margin-bottom: 20px;` pada `.follow-up-compact-bar.is-clean` agar tidak mepet dengan kartu ringkasan di bawahnya.
- **Koreksi Tautan Logo Topbar (`AppShell.tsx`)**:
  - Memperbaiki tautan avatar / emblem profil di bilah navigasi atas dari `/pengaturan` kembali ke `/beranda`.
- **Verifikasi Kualitas**: 143/143 tes lulus (19 berkas), 0 error TypeScript, Next.js Turbopack build sukses 100%.

## Rombak Navigasi Mobile-First (Mobile App Sheet Hub), Skill Clean Code & Interaktivitas Native Mobile (2 Oktober 2026)

- **Pembentukan Skill Clean Code (`.agents/skills/clean-code/SKILL.md`)**:
  - Menyimpan panduan rekayasa kode bersih, modular, type-safe, dan efisien untuk agen AI: arsitektur domain (`src/features/<domain>`), standar mobile-first (area sentuh min 44px, safe area insets, pencegahan horizontal overflow), rumus tunggal progres di `lib/progress.ts`, variabel pastel universal, SWR in-memory caching di `useWorkspace.ts`, dan disiplin verifikasi 3 lapis.
- **Rombak Total Navigasi Mobile ("Mobile App Sheet Hub") (`AppShell.tsx` & `personal.css`)**:
  - Menggantikan sidebar desktop kaku yang meluncur di layar ponsel dengan **Mobile App Sheet Hub** interaktif yang meluncur halus dari bawah (*slide-up bottom sheet*).
  - Dilengkapi bilah pegangan sentuh (*drag handle*), chip profil manajer & cabang koperasi, tombol pencarian instan (⌘K), dan tombol tutup 1-ketuk.
  - Kartu navigasi dikelompokkan ke dalam 4 domain operasional utama dengan aksen warna pastel, ikon cerah, dan deskripsi singkat 1 baris:
    - **Pekerjaan & Proyek** (Hari Ini, Tugas & Papan, Proyek Strategis, Linimasa Gantt, Perlu Perhatian)
    - **Pencatatan Buku** (Ringkasan Buku, Buku Kas, Stok Opname, Barang Dagangan, Buku Anggota)
    - **Operasional Gerai** (Unit Toko, Checklist Kesiapan, Risiko & Isu, Laporan Kerja)
    - **Koordinasi & Berkas** (Rapat & Notula, Dokumen Resmi, Mitra & Kontak, Petugas & Tim)
  - Footer utilitas cepat terintegrasi: Ganti Mode Terang/Gelap, Kunci Aplikasi PIN, dan Panduan.
- **Penyederhanaan Navigasi Desktop**:
  - Mengelompokkan ulang 22 menu flat menjadi hirarki domain logis yang tidak membingungkan bagi manajer.
- **Interaktivitas Mikro Ramah Sentuh (Mobile Touch Micro-Interactions)**:
  - Menerapkan umpan balik sentuhan taktil (*active press scale* `0.96`) pada seluruh kartu menu, tombol dock, tombol aksi cepat, dan empty state.
  - Memastikan seluruh kontrol interaktif memenuhi area sentuh ergonomis minimal 44×44 px.
  - Menyesuaikan laci detail tugas (`TaskDetailDrawer`) agar memanfaatkan lebar penuh layar ponsel (`100vw`) dengan bantalan aman `env(safe-area-inset-bottom)`.
  - Mengubah dialog aksi manajer (`ManagerActionModal`) menjadi bottom-sheet modern pada layar ponsel.
- **Verifikasi Kualitas**: 143/143 tes lulus (19 berkas), 0 error TypeScript, Next.js Turbopack build sukses 100%.

## Paket Pembaruan Mobile-First, Kecepatan SWR Cache, Form Terpadu & Redesain Visual (2 Oktober 2026)

- **Mobile Rutinitas di Urutan Teratas (`personal.css`)**:
  - Pada tampilan mobile (`@media (max-width: 768px)`), kartu "Rutinitas Manajer" (`.home-routine-card`) diberi `order: -1` dan kontainer ringkasan `.home-overview` dijadikan `display: contents`.
  - Rutinitas harian manajer gerai kini langsung muncul di bagian paling atas beranda saat dibuka dari smartphone, tanpa harus menggulir ke bawah.
- **Pembersihan Redundansi Header & Identitas Sidebar (`AppShell.tsx` & `personal.css`)**:
  - Menghapus tulisan nama manajer yang redundan di sebelah badge avatar pada topbar desktop & mobile, menyisakan chip profil inisial yang rapi dan elegan.
  - Mengubah subjudul sidebar dari "KDMP Puntukrejo" yang berulang dengan judul utama menjadi deskripsi peran yang jelas: *"Ruang Kerja Manajer"*.
  - Mengubah tautan emblem logo di navigasi mobile agar langsung membuka `/pengaturan` untuk kemudahan kustomisasi.
- **Tombol Tambah Cepat Minimalis (`AppShell.tsx` & `personal.css`)**:
  - Menghapus label teks "Tambah" dari tombol aksi cepat di topbar (`.quick-action-hub-btn`), mengubahnya menjadi tombol ikon 36×36 px seragam dengan animasi hover dan fokus yang halus.
- **Redesain Total "Penyelesaian 7 Hari" (`DashboardCharts.tsx` & `personal.css`)**:
  - Mengubah grafik menjadi kartu eksekutif: metrik total penyelesaian besar dan tebal, indikator kecepatan rata-rata harian (`⌀ X/hari`), pill penanda hari puncak (`Puncak: Sen (X)`), dan chip reset filter interaktif.
  - Batang grafik dirancang ulang dengan sudut membulat elegan, gradien hijau segar, pill tanggal di bawah nama hari (misal `Jum 02`), dan titik penanda hari ini (*today indicator*).
- **Pembuatan Rekor Terkait Langsung dari Form Modal (`Editor.tsx` & `personal.css`)**:
  - Menambahkan pembuat inline pada form:
    - **Rapat Online**: Manajer dapat langsung membuat jadwal rapat daring lengkap dengan link Google Meet / Zoom tanpa meninggalkan form kegiatan atau tugas.
    - **Dokumen**: Memungkinkan pembuatan dokumen pendukung baru langsung di tempat.
    - **Tugas Tindak Lanjut**: Form kegiatan kini menyediakan tombol pembuatan tugas terkait secara inline.
  - Rekor yang baru dibuat otomatis tersinkronisasi ke daftar opsi referensi dan langsung terpilih.
- **Perbaikan Bug Latar Belakang Hitam Modal Periode Kerja (`SprintModal.tsx` & `personal.css`)**:
  - Memperbaiki bug di mana backdrop gelap modal periode kerja (sprint) hanya mencakup kotak konten di layar tertentu.
  - Menggunakan `createPortal(modalContent, document.body)` dan styling CSS `position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999 !important;` sehingga backdrop menjamin penutupan 100% viewport.
- **Redesain Relasi Tindak Lanjut pada Kegiatan (`Records.tsx`)**:
  - Pada tampilan tabel kegiatan (`JournalTableView`), relasi tugas tindak lanjut diperbarui: jika ada tugas terkait, tampil sebagai chip status interaktif dengan badge status dan tautan langsung ke detail tugas (`/tugas?task=...`); jika belum ada, tersedia tombol 1-klik `+ Tindak Lanjut` yang ramah jempol.
- **Skeleton Loading Adaptif Cerdas (`SkeletonLoading.tsx` & `WorkspacePage.tsx`)**:
  - Menggantikan skeleton statis tunggal dengan skeleton adaptif yang membaca slug halaman aktif:
    - Halaman Tugas & Kegiatan (`tugas`, `jurnal`): Menampilkan skeleton tabel dengan header kolom dan baris placeholder.
    - Halaman Proyek (`proyek`): Menampilkan skeleton kartu proyek dengan badge, bilah progres, dan pill meta.
    - Halaman Beranda (`beranda`): Menampilkan skeleton dasbor lengkap dengan kartu metrik dan grafik.
- **Peningkatan Kecepatan & Performa Pemuatan (SWR Cache di `useWorkspace.ts`)**:
  - Mengimplementasikan *in-memory cache* dengan pola *stale-while-revalidate*.
  - Navigasi antar-halaman utama (`/beranda`, `/tugas`, `/proyek`, `/jurnal`) langsung menyajikan data dari memori dalam 0 ms tanpa kedipan layar (*loading flicker*) atau jeda skeleton kosong, lalu melakukan sinkronisasi latar belakang secara tenang.
- **Standardisasi Desain Visual & Komponen Empty State (`EmptyState.tsx`, `globals.css`, `personal.css`)**:
  - Mendefinisikan token warna pastel terpadu pada CSS variabel global (`--pastel-emerald-*`, `--pastel-blue-*`, `--pastel-amber-*`, `--pastel-purple-*`, `--pastel-rose-*`) untuk tema terang dan gelap.
  - Membuat komponen `EmptyState` standar dengan variasi pastel, ikon bersih, judul ringkas, dan tombol aksi terstruktur.
  - Menggantikan semua placeholder kosong mentah di `Records.tsx`, `Projects.tsx`, dan `TaskTimeline.tsx` dengan komponen `EmptyState`.
  - Menerapkan aksen garis pastel pada kartu proyek dan kartu pengaturan.
- **Papan Tugas Ramah Sentuh & Ponsel (`ScrumBoardView.tsx` & `personal.css`)**:
  - Menambahkan tombol aksi geser status instan pada setiap kartu Scrum (`Mulai Kerja →`, `← Rencana`, `✓ Selesai`, `↺ Buka Lagi`).
  - Memudahkan manajer memindahkan tugas antar-tahapan pada layar ponsel/tablet tanpa terganggu oleh gestur geser kolom horizontal atau keterbatasan sentuh drag-and-drop HTML5.
- **Verifikasi Kualitas**: 143/143 tes lulus (19 berkas), 0 error TypeScript, Next.js Turbopack build sukses 100% (9/9 route).

## Pembaruan UI/UX Komprehensif, Pemisahan Kegiatan & Skrip Reset Database Bersih (2 Oktober 2026)

- **Warna & Visual Tugas Hari Ini (`TodayView.tsx` & `personal.css`)**:
  - Menambahkan aksen warna prioritas spesifik pada kartu tugas hari ini:
    - `priority-mendesak`: Garis aksen merah kirmizi dengan latar gradien halus kemerahan.
    - `priority-tinggi`: Garis aksen kuning amber hangat.
    - `priority-sedang`: Garis aksen hijau zamrud brand KDMP.
    - `priority-rendah`: Garis aksen lavender lembut.
  - Kartu tugas terlambat diberi penanda visual yang jelas tanpa membebani mata.
- **Tombol Tambah Menarik & Floating Action Button (FAB) Mobile (`TodayView.tsx`)**:
  - Di layar seluler/ponsel (`max-width: 768px`), ditambahkan tombol aksi mengambang **FAB (+ Tugas Baru)** di sudut kanan bawah dengan elevasi bayangan modern, mudah dijangkau dengan satu ibu jari.
  - Tombol submit cepat di bagian atas dilengkapi ikon Plus dan gradien tombol yang lebih menarik.
- **Penyederhanaan Redundansi Nama & Profil Manajer (`AppShell.tsx` & `Dashboard.tsx`)**:
  - Menghapus tulisan berulang "Ruang kerja pribadi" di topbar. Profil kini berwujud chip ramping: avatar inisial berwarna dan nama manajer.
  - Mengubah eyebrow dasbor menjadi "Dasbor Manajer — KDMP Puntukrejo".
- **Penyingkatan Otomatis Nama Koperasi pada Logo Sidebar (`AppShell.tsx`)**:
  - Menambahkan fungsi `getCoopShortName()`: nama panjang seperti *"Koperasi Desa Mandiri Penuh Puntukrejo"* otomatis diringkas menjadi *"KDMP Puntukrejo"* pada header sidebar, dengan nama lengkap tetap tersedia saat kursor diarahkan (*tooltip title*).
- **Redesain Grafik Penyelesaian 7 Hari (`DashboardCharts.tsx` & `personal.css`)**:
  - Menambahkan kartu ringkasan di atas grafik: metrik angka besar penyelesaian 7 hari dan pill reset filter aktif.
  - Batang grafik dipercantik dengan gradien hijau modern, pill tanggal di bawah nama hari (misal: "Jum 02"), indikator titik khusus untuk hari ini, dan interaksi klik filter yang presisi.
- **Pembedaan Kegiatan: Daftar vs Linimasa & Perampingan Kalender (`Records.tsx` & `TaskCalendar.tsx`)**:
  - Mengeliminasi redundansi antara tampilan Daftar dan Linimasa pada Kegiatan (`/jurnal`):
    - **Daftar**: Menggunakan tabel kompak terstruktur (`JournalTableView`) dengan kolom Tanggal, Uraian Temuan Lapangan, Keterhubungan (Gerai, Tugas, Mitra), Tautan Rapat, dan tombol aksi Buka.
    - **Linimasa**: Tetap menyajikan alur naratif kronologis garis vertikal (*spine timeline*).
  - Merampingkan sel kalender dari `min-height: 104px` menjadi `78px` yang lebih proporsional, serta merapikan daftar agenda di bawah kalender.
- **Pembersihan Teks Berlebih pada Laporan Kerja (`Reports.tsx`)**:
  - Menghapus paragraf instruksi panjang dan remah roti alur kerja yang membingungkan.
  - Mengubah status draf menjadi banner ramping.
  - Mengganti kalimat kosong yang berulang di 6 bagian laporan menjadi indikator ringkas seperti *"Nihil pada periode ini"*.
- **Evaluasi Form Input Tugas & Kegiatan (`Editor.tsx`)**:
  - Memasukkan kolom bukti hasil (`link`) langsung ke kolom utama tugas tanpa harus membuka detail lanjutan.
  - Mempertahankan label aksesibel standar untuk integrasi pengujian dan pembaca layar, sembari menambahkan panduan teks bantuan (*field-helper*) yang jelas pada setiap relasi tugas dan kegiatan.
- **Alternatif Kompak "Perlu Perhatian" di Dasbor (`FollowUps.tsx` & `personal.css`)**:
  - Di dasbor, modul tindak lanjut diubah menjadi *compact ticker bar* ramping setinggi ~46 px (menghemat lebih dari 200 px ruang vertikal).
  - Menampilkan badge jumlah mendesak, ringkasan catatan teratas, tombol Buka/Tutup Rincian, dan tautan langsung ke halaman tindak lanjut.
- **Link Pengumpulan / Bukti Hasil untuk Tugas (`TaskDetailDrawer.tsx` & `Editor.tsx`)**:
  - Menambahkan kartu khusus "Bukti Pengumpulan & Tautan Hasil" di laci tugas dengan tombol cepat *Buka Hasil ↗* dan editor tautan instan.
- **Pemisahan Database & Skrip Reset Bersih (`supabase/reset/RESET_DATABASE_FORCE_CLEAN.sql`)**:
  - Menyediakan berkas SQL lengkap dan terverifikasi yang menghapus seluruh tabel lama tanpa terhenti oleh data uji sebelumnya, lalu memasang skema bersih dengan pemisahan tegas entitas `work-items` dan `journal`, indeks khusus, trigger integritas relasional, dan proteksi sesi.
- **Verifikasi Kualitas**: 143/143 tes vitest lulus 100% (19 berkas), 0 error TypeScript, build produksi Next.js Turbopack sukses penuh (9/9 halaman).

## Penyederhanaan Kartu Proyek, Perbaikan Menu Lainnya, Pengaturan Rutinitas & Pemindahan Rutinitas ke Kanan (2 Oktober 2026)

- **Penyederhanaan Kartu Proyek Menjadi Kompak (`Projects.tsx` & `personal.css`)**:
  - Mengubah kartu proyek yang awalnya sangat besar/tinggi (~380 px dengan margin luas) menjadi format padat horizontal-vertikal yang ringkas (~160 px).
  - Menyederhanakan header kartu dengan klaster tag kode (`OPS`), badge status, dan panah tautan sudut kanan.
  - Deskripsi proyek dibatasi 1 baris (*clamped*).
  - Bilah progres disederhanakan menjadi garis tunggal dengan persentase di sisi kanan.
  - Statistik meta diubah menjadi pill kecil yang rapi (`{selesai}/{total} tugas`, status kendala, tanggal target) serta indikator tugas berikutnya yang tidak lagi memakan ruang vertikal berlebih.
- **Perbaikan Dropdown "Lainnya" Tidak Tertutup/Terpotong (`Records.tsx` & `personal.css`)**:
  - **Penyebab**: Elemen `.database-views` memiliki properti `overflow-x: auto` dengan ketinggian terbatas. Menu popover absolut dari tombol "Lainnya" sebelumnya terpotong oleh batas vertikal kontainer gulir tersebut.
  - **Solusi**: Memisahkan kontainer horizontal ke dalam `.database-views-bar`. Tombol `<details className="view-extra-actions">` ditempatkan di luar kontainer gulir dengan `z-index: 90` dan menu popover `.view-extra-menu` diberi `z-index: 100`.
  - Menambahkan *click-outside listener* sehingga popover otomatis tertutup saat pengguna mengklik area luar layar.
- **Fitur Kustomisasi "Atur Rutinitas" Manajer (`Dashboard.tsx` & `personal.css`)**:
  - Sebelumnya rutinitas manajer di-hardcode kaku sehingga pengguna tidak dapat menyesuaikan daftar kegiatan harian gerainya.
  - Menambahkan tombol aksi **"Atur"** berikon slider pada header kartu rutinitas.
  - Menyediakan modal dialog kustomisasi rutinitas yang memungkinkan manajer untuk:
    - Menambah rutinitas baru dengan waktu spesifik (misal: `09:00` - *Cek suhu showcase pendingin*).
    - Menghapus rutinitas yang tidak diperlukan.
    - Mengembalikan ke 6 rutinitas bawaan operasional gerai KDMP dengan satu klik ("Kembalikan Bawaan").
    - Persistensi otomatis ke `localStorage` (`kdmp_manager_routine_config`), tersinkronisasi dengan checklist harian per tanggal.
- **Pemindahan Rutinitas ke Kolom Kanan Dasbor (`Dashboard.tsx`)**:
  - Sesuai arahan pengguna (*"rutinitas taruh di kanan"*), kartu Rutinitas Manajer dipindahkan dari kolom kiri (`.home-work`) ke kolom kanan (`.home-overview`).
  - Efek UX: Kolom kiri kini langsung menyajikan **Agenda Rapat** dan **Kartu Tugas Pilihan / Tugas Aktif** di posisi teratas tanpa terdorong ke bawah oleh checklist rutinitas, sehingga kartu tugas lainnya langsung kelihatan di layar tanpa perlu menggulir.
- **Perampingan Kontrol Dasbor (`.dashboard-controls`)**:
  - Mengurangi padding dan margin kontrol filter proyek di bagian atas dasbor agar kartu dan statistik di bawahnya langsung terlihat di layar (*above the fold*).
- **Verifikasi Kualitas**: 143 tes unit & integrasi lulus 100% (19 berkas), 0 error TypeScript, build produksi Next.js Turbopack sukses penuh (9/9 halaman statis/dinamis).

## Redesain Menu Proyek, Jalur Capaian Milestone, Persistensi Tampilan Bawaan & Perbaikan UI Riwayat (2 Oktober 2026)

- **Eliminasi Redundant Empty State pada Riwayat Selesai**:
  - Memperbaiki tumpang-tindih evaluasi kondisi `!rows.length && !isCompletedArchive` pada `Records.tsx` sehingga tidak lagi merender dua kartu "Belum ada tugas selesai" yang bertumpuk. Riwayat Selesai kini hanya menampilkan kartu linimasa kosong tunggal yang berikon centang elegan.
- **Perbaikan Ukuran Tombol "Lainnya" yang Melompat (`.view-extra-actions`)**:
  - **Penyebab**: Elemen `<details>` sebelumnya merender tombol aksi langsung secara inline ketika `[open]`, yang memperluas kontainer horizontal dan mengubah padding serta ukuran tombol `summary`.
  - **Solusi**: Membungkus menu opsi ke dalam `.view-extra-menu` mengambang (*floating popover*) berposisi absolut dengan bayangan lembut dan z-index tinggi. Tombol `summary` dipatok pada tinggi 32 px sejajar dengan tombol tampilan lainnya sehingga ukurannya tidak pernah bergeser saat diklik.
- **Pengaturan Tampilan Bawaan (Default View Persistence)**:
  - Mengintegrasikan persistensi preferensi tampilan bawaan pengguna melalui `localStorage` (`preferred_view_work-items` dan `preferred_view_journal`).
  - Ketika pengguna memilih tampilan (Daftar, Papan, Kalender, atau Linimasa), sistem otomatis mengingat pilihan tersebut. Navigasi berikutnya ke `/tugas` atau `/jurnal` akan langsung membuka tampilan bawaan yang disukai pengguna.
- **Redesain Menyeluruh Menu Proyek (`Projects.tsx`)**:
  - **Ringkasan KPI Inisiatif**: Menambahkan kartu ringkasan di bagian atas yang menampilkan Total Proyek, Proyek Berjalan, Proyek Selesai, dan Tugas Terhubung.
  - **Bilah Alat Terpadu**: Menggabungkan kotak pencarian proyek (dengan tombol hapus pencarian instan) dan tab filter status dalam satu baris yang rapi.
  - **Penghapusan Persentase Ganda**: Menghilangkan duplikasi teks `0%` dengan mengganti komponen generik menjadi bilah progres tunggal yang proporsional.
  - **Kartu Proyek Modern**: Dilengkapi tag kode inisiatif (`OPS`, `DEV`), badge status berwarna tematik, grid statistik tugas ({selesai}/{total}), chip mitigasi kendala, indikator langkah berikutnya, dan tanggal target.
- **Penjelasan & Redesain UI/UX Milestone (`MilestoneTracker.tsx` & `Roadmap.tsx`)**:
  - **Fungsi Milestone**: Dijelaskan sebagai tonggak capaian kunci tanpa durasi (checkpoint nol hari) untuk memantau keberhasilan tahapan penting sebuah proyek (misalnya: *Izin Usaha Terbit*, *PKS Agrinas Ditandatangani*, *Grand Opening Gerai*), terpisah dari tugas harian berdurasi.
  - **Komponen Jalur Capaian Visual (`MilestoneTracker`)**: Menggantikan tampilan tabel mentah `Records` di bawah Linimasa Gantt dengan pelacak capaian checkpoint yang memiliki filter status (Semua, Mendatang, Tercapai), hitung mundur tanggal target (*X hari lagi* / *Terlewat*), indikator tugas terhubung, dan tombol aksi instan satu-klik **"Tandai Tercapai ✓"** atau **"Buka Kembali ↩"**.
- **Verifikasi Kualitas**: 143 tes unit & integrasi lulus 100% (19 berkas), 0 error TypeScript, build produksi Next.js Turbopack sukses penuh.


- **Pemisahan Tegas Tugas (`work-items`) dan Kegiatan (`journal`)**:
  - Memastikan kedua domain memiliki batas kerja yang terisolasi sepenuhnya: Tugas berfokus pada perencanaan eksekusi target dan status pekerjaan, sedangkan Kegiatan berfokus pada pencatatan peristiwa lapangan, rapat, dan dokumentasi operasional.
  - Memperbarui sistem navigasi dan perutean agar tidak terjadi tumpang tindih data.
- **Multi-Tampilan untuk Kegiatan (`/jurnal`)**:
  - Memperluas pemilih tampilan di halaman kegiatan sehingga mendukung 4 mode visual:
    - **Daftar**: Tabel dokumentasi kegiatan kronologis dengan ringkasan catatan dan tautan rapat.
    - **Papan (Kanban Kegiatan)**: 3 kolom status berbasis waktu pelaksanaan (**Terjadwal / Rencana**, **Hari Ini**, **Terdokumentasi**) dengan dukungan seret-lepas (drag-and-drop) tanggal.
    - **Kalender**: Tampilan grid bulanan yang mendukung pemetaan tanggal kegiatan (`date`). Memperbaiki penanganan tanggal agar tidak menyebabkan `RangeError: Invalid time value` ketika entitas kegiatan (yang tidak memiliki `due_date`) dimuat di tampilan kalender.
    - **Linimasa (Timeline Kegiatan)**: Rangkaian kronologis kegiatan dengan alur garis vertikal dan tautan pertemuan.
- **Validasi Tanggal Defensif (`src/lib/date.ts` & `TaskCalendar.tsx`)**:
  - Menambahkan pengaman `isNaN(parsed.getTime())` dan penolakan nilai `'undefined'` / `'null'` pada fungsi `formatDate` sehingga selalu mengembalikan `'Belum ditentukan'` alih-alih melempar galat runtime waktu.
  - Memperbarui `TaskCalendar` agar memetakan tanggal agenda menggunakan helper `getItemDate(item)` yang seragam untuk tugas (`due_date`) maupun kegiatan (`date`).
- **Kerapian Tombol Batal & Simpan Judul & Deskripsi Tugas (`TaskDetailDrawer.tsx`)**:
  - Memperbaiki tata letak tombol aksi inline pada drawer detail tugas. Tombol **Batal** (sekunder, outline halus) kini diletakkan di sisi kiri dan tombol **Simpan** (primer, aksen hijau brand) di sisi kanan.
  - Menambahkan dukungan navigasi keyboard: tombol `Enter` untuk menyimpan langsung dan tombol `Escape` untuk membatalkan perubahan.
  - Menghilangkan ketidaksejajaran ukuran font dan padding pada kontrol pengeditan cepat.
- **Linimasa Riwayat Selesai ala GitHub (`CompletedTimelineView`)**:
  - Menghilangkan tab tampilan horizontal (Harian, Papan, Kalender, Linimasa) yang tidak fungsional pada halaman arsip riwayat selesai (`/tugas?status=selesai`).
  - Menghadirkan tampilan linimasa bergaya GitHub: alur konektor garis vertikal kontinu (*spine*), simpul status centang hijau, pengelompokan tanggal arsip yang jelas, pemisah visual antar-kartu tugas yang bersih, serta tombol aksi cepat **"Buka Kembali ↩"** untuk mengembalikan tugas ke siklus aktif seketika.
- **Pembersihan Tugas Aktif & Zona Drop Interaktif pada Papan**:
  - Filter daftar utama tugas (`/tugas`) kini secara ketat hanya menyajikan tugas berstatus `rencana` dan `proses` (`isActiveTask`). Tugas yang sudah selesai maupun dibatalkan tidak lagi muncul di daftar aktif dan terbaru.
  - Pada Papan Scrum, fokus utama diarahkan pada kolom kerja berjalan (**Rencana** dan **Dikerjakan**).
  - Menambahkan **Zona Drop Interaktif** di bagian bawah papan:
    - Target drop **Selesai**: pengguna cukup menyeret kartu tugas ke area ini untuk menandai selesai dan langsung memindahkannya ke arsip riwayat selesai.
    - Target drop **Dibatalkan**: pengguna dapat menyeret tugas yang tidak jadi dieksekusi.
    - Opsi toggle "Tampilkan Kolom Selesai di Papan" tetap disediakan bagi pengguna yang ingin melihat kolom arsip di dalam grid papan.
- **Penyelarasan Istilah "Linimasa Gantt" vs "Gantt"**:
  - Menghilangkan ambiguitas istilah dengan menyatukan seluruh label menjadi **"Linimasa"** pada katalog rute (`/roadmap`), navigasi, dan tombol pemilih tampilan.
- **Redesain `@manager-location-wrap` & Solusi Ruang Kosong Kanan (`.workspace-page`)**:
  - Menghapus pemusatan canggung di tengah bilah atas (`margin: auto`). Lokasi sekarang berpadu elegan di sebelah kiri sebagai breadcrumb modern: `[Profil KDMP] / [Ikon Lokasi + Judul Halaman ⭐]`.
  - Mengatasi masalah ruang kosong di sisi kanan layar lebar: mengubah batas kaku `max-width: 1400px` menjadi layout fluid `max-width: 100% !important; margin: 0;`. Seluruh lebar layar kini dimanfaatkan secara optimal, dan konten tidak lagi melompat canggung saat sidebar ditutup/dibuka.
- **Verifikasi**: 143 tes lulus (19 berkas pengujian), typecheck bersih 0 kesalahan, build produksi Next.js Turbopack sukses penuh.


- **Masalah Teridentifikasi**:
  - Pengguna melaporkan tugas yang awalnya ditandai selesai kemudian diubah statusnya (misalnya kembali ke rencana atau sedang dikerjakan) masih muncul di halaman Arsip Riwayat Selesai (`/tugas?status=selesai`).
  - **Penyebab**: Logika penyaringan baris di `Records.tsx` sebelumnya mengevaluasi `(view === 'papan' || ...)` terlebih dahulu. Ketika pengguna menavigasi ke arsip selesai dari tampilan papan, nilai `view` yang masih `'papan'` menyebabkan seluruh tugas (termasuk tugas aktif dan rencana) lolos dari filter `effectiveFilter === 'selesai'`. Selain itu, pengelompokan tanggal arsip kronologis belum memiliki pengaman status eksplisit per item.
- **Perbaikan yang Diterapkan**:
  - **Isolasi Arsip Selesai Ketat (`isCompletedArchive`)**: Logika penyaringan baris di `Records.tsx` kini memprioritaskan pemeriksaan arsip selesai: `isCompletedArchive ? row.data.status === 'selesai' : ...`. Tugas yang statusnya bukan `'selesai'` dipastikan 100% gugur dari daftar arsip riwayat selesai.
  - **Failsafe Guard di Grup Kronologis**: Menambahkan `if (r.data.status !== 'selesai') return false;` pada seluruh generator grup (Pekan Ini, Pekan Lalu, Arsip Sebelumnya) sehingga tidak ada celah bagi tugas aktif atau dibuka kembali untuk masuk ke baris pengelompokan.
  - **Aksi Cepat "Buka Kembali ↩" di Tabel Riwayat Selesai**: Menambahkan tombol aksi langsung `.table-btn-reopen` pada baris tugas arsip selesai. Saat diklik, status tugas langsung beralih ke `rencana`, tanggal `completed_at` dibersihkan, dan tugas seketika berpindah kembali ke daftar tugas aktif tanpa perlu membuka laci atau dropdown berkali-kali.
  - **Sinkronisasi Ruang Lingkup & URL**: Memastikan URL query `?status=selesai` tersinkronisasi otomatis dengan `taskScope` (`history` vs `current`) di `WorkspacePage.tsx` dan responsif saat beralih lewat tombol navigasi rentang tugas.
  - **Reaktivitas Laci Detail Tugas**: Menyimpan salinan reaktif `taskData` di `TaskDetailDrawer.tsx` agar perubahan status langsung diperbarui pada UI lokal sebelum maupun sesudah pemanggilan refresh server.
- **Verifikasi**: 143 tes lulus (19 berkas pengujian), typecheck bersih 0 kesalahan, build produksi Next.js Turbopack sukses penuh.

## Penyempurnaan Dropdown Status, Chip Tenggat, Penanggung Jawab, Sistem ID TGS/KGT & Sinkronisasi Papan (2 Oktober 2026)

- **Perbaikan Dropdown Status Mepet (`.task-status-select`)**:
  - Menyesuaikan padding kanan dari 24px ke 32px (`padding: 0 32px 0 12px`) dan posisi panah chevron ke `right: 10px center`.
  - Menetapkan lebar minimum `min-width: 120px` dan memperlebar kolom status di tabel (`.col-task-status` dari 135px ke 145px) sehingga ikon panah dropdown memiliki jarak lega dan tidak lagi menempel atau bertabrakan dengan teks status.
- **Styling Tenggat Waktu (`.task-due-chip`)**:
  - Mengubah tampilan tanggal jatuh tempo yang sebelumnya berupa teks polos menjadi chip/pill modern (`.task-due-chip`) dengan sudut bulat penuh (radius 9999px) dan tata letak flex sejajar dengan ikon kalender.
  - Membedakan skema warna visual:
    - **Hari Ini**: Chip hijau lembut (`rgba(34, 197, 94, 0.12)`) dengan border dan teks hijau kontras.
    - **Terlewat**: Chip merah lembut (`rgba(239, 68, 68, 0.1)`) penanda urgensi.
    - **Mendatang / Normal**: Chip netral elegan terintegrasi warna tema.
    - **Selesai**: Chip abu-abu tenang dengan tanggal penyelesaian nyata.
- **Perbaikan Bug Penanggung Jawab "AAgrinas" (`.task-assignee-pill`)**:
  - **Penyebab**: Kode sebelumnya merender huruf pertama `{assigneeName[0].toUpperCase()}` di dalam elemen `<span>` tanpa spasi atau gaya khusus tepat sebelum nama lengkap (`Agrinas`), sehingga terbaca ganda sebagai `AAgrinas`.
  - **Solusi**: Menghapus elemen inisial avatar tersebut (yang juga melanggar panduan AGENTS.md terkait larangan avatar tim palsu) dan menggantinya dengan `.task-assignee-pill` elegan dengan batas teks rapi.
- **Standarisasi Sistem ID Tugas (`TGS-xxxx`) dan Kegiatan (`KGT-xxxx`)**:
  - Menggantikan format lama yang panjang dan tidak estetik (seperti `MENGU-123456780000` atau `RAPAT-ABCDEF010000`) dengan format standar:
    - **Tugas**: `TGS-` diikuti 4 karakter heksadesimal/alfanumerik unik (mis. `TGS-1234`, `TGS-8F2A`).
    - **Kegiatan**: `KGT-` diikuti 4 karakter unik (mis. `KGT-ABCD`, `KGT-4F82`).
  - Menyediakan utilitas `formatDisplayCode` untuk menormalisasi kode historis maupun fallback ID saat ditampilkan di tabel, kalender, drawer, dan kartu dashboard.
  - Menambahkan kolom `code` opsional pada skema `journal` dan generator `makeActivityCode` otomatis saat kegiatan dicatat.
- **Kesinambungan Papan (Scrum Board) & Riwayat Selesai**:
  - **Filter Kolom Papan Utuh**: Memperbaiki logika penyaringan baris tugas saat `view === 'papan'` sehingga filter status tunggal tidak menghapus kartu di kolom status lainnya. Seluruh 4 kolom papan (Rencana, Dikerjakan, Dibatalkan, Selesai) selalu tampil lengkap dan dapat dipindahkan antar-kolom.
  - **Jembatan Papan ke Riwayat Selesai**: Menambahkan tautan footer di bagian bawah kolom "Selesai" di Papan: `Buka Riwayat Selesai ({count}) →` yang mengarahkan langsung ke arsip riwayat kronologis lengkap (`/tugas?status=selesai`).
  - **Penghapusan Avatar Palsu di Kartu Papan**: Mengganti lingkaran inisial avatar (`.scrum-user-avatar`) dengan badge nama penanggung jawab asli (`.scrum-assignee-pill`).
- **Verifikasi**: 143 tes lulus (19 berkas pengujian), typecheck bersih 0 kesalahan, build produksi Next.js Turbopack sukses penuh.

## Perbaikan Form Tugas di Ponsel & Perombakan Navigasi Mobile (2 Oktober 2026)

- **Perbaikan Form Tugas (`.task-form-intro`) Menutup Input di Ponsel**:
  - **Penyebab**: Sebelumnya `.task-form-intro` diletakkan di luar kontainer gulir (`.form-grid`), sehingga kartu intro setinggi ~140px menjadi elemen statis yang terpaku di bawah header dialog. Pada layar ponsel (<640px) dan saat keyboard virtual muncul, kartu ini memakan area vertikal berlebih dan menimpa baris isian pertama form.
  - **Solusi**: Membungkus seluruh isi form di antara header modal dan footer aksi ke dalam `.editor-form-scroll` dengan `overflow-y: auto` dan `-webkit-overflow-scrolling: touch`. Kartu intro kini berada di dalam alur dokumen gulir yang sama dan akan tergulir alami saat pengguna mengisi form.
  - **Redesain Mobile `.task-form-intro`**: Pada layar ponsel (≤640px), layout diubah menjadi kartu satu baris yang sangat ramping (padding 8px, tombol ringkas 36px) sehingga tidak memboroskan ruang layar.
  - **Tinggi Maksimum Fleksibel**: Dialog modal diatur ke `max-height: calc(100dvh - 16px)` di mobile dengan batas padding yang aman.
- **Perombakan Navigasi Mobile Dock (`.manager-dock`)**:
  - **Glassmorphic Floating Dock**: Mengubah bilah navigasi bawah ponsel menjadi dock mengambang modern berlatar semi-transparan (`backdrop-filter: blur(20px)`, radius 28px) dengan palet tema token terpadu, menghilangkan kontras warna keras dan sudut kaku.
  - **Aksi Tengah (FAB) Terangkat**: Tombol aksi cepat tengah (`.dock-center-action`) kini terangkat elegan dengan efek bayangan halus, ukuran 44x44px ramah jempol, dan penyelarasan vertikal tanpa terpotong.
  - **Indikator Tab Aktif Jelas**: Tab rute yang sedang aktif (`[aria-current='page']`) ditandai dengan latar belakang aksen halus (`--brand-soft`) dan ikon berkontras tinggi sehingga manajer mudah mengetahui posisinya.
  - **Pembaruan Item Navigasi**: Slot navigasi ke-4 diperbarui dari pencatatan menjadi **Kegiatan** (`/jurnal`), sehingga 5 item dock mencakup: **Beranda**, **Tugas**, **Aksi (+)**, **Kegiatan**, dan **Menu (Drawer)**.
  - **Padding Aman Konten**: `main.manager-main` disesuaikan dengan `padding-bottom: calc(92px + env(safe-area-inset-bottom))` agar konten halaman tidak tertutup oleh navigasi bawah.

## Redesain Beranda, Rutinitas Kerja Manajer, Riwayat Selesai Kronologis, dan Pembersihan UI (2 Oktober 2026)

- **Redesain Beranda (Dashboard) Manajer**:
  - Menambahkan kartu interaktif "Rutinitas Harian Manajer KDMP" (Pagi: 07:30-09:00, Siang: 12:00-13:30, Sore: 16:00-17:00 hingga Pulang) tersimpan di `localStorage` dilengkapi progres persentase harian dinamis.
  - Kartu sorotan rapat hari ini dengan tombol gabung langsung `Masuk Rapat Online ↗` untuk rapat Google Meet/Zoom/hybrid yang sah.
  - Umpan balik "Kegiatan Lapangan Terbaru" terintegrasi langsung dengan catatan lapangan dan chip gabung rapat daring.
  - Metrik analitik buku kas dan stok opname berdampingan untuk ikhtisar cepat manajer.
- **Pembedaan Tegas Menu Kegiatan Lapangan & Daftar Tugas**:
  - Menu samping (`AppShell`) kini memisahkan kategori `Tugas & Proyek` (`/beranda`, `/hari-ini`, `/tugas`, `/tindak-lanjut`, `/proyek`, `/roadmap`) dengan `Kegiatan Lapangan` (`/jurnal`).
  - Halaman Kegiatan dilengkapi filter relasi (Gerai, Mitra/Pemangku, Rapat Terkait) serta tombol aksi langsung `+ Tindak lanjut` ke manajemen tugas.
- **Riwayat Selesai Terkelompok Kronologis (Tanpa Menu Horizontal)**:
  - Mengeliminasi menu horizontal view switcher (`database-views`) dan preset tersimpan (`SavedTaskViews`) pada status Selesai yang tidak diperlukan untuk arsip riwayat.
  - Menggantikannya dengan **Header Arsip Khusus** berikon centang, rekap jumlah tugas tuntas, dan tombol kembali ke tugas aktif (`← Kembali ke Tugas Aktif`).
  - Mengelompokkan riwayat tugas selesai secara otomatis ke dalam baris kronologis: **Pekan Ini** (7 hari terakhir), **Pekan Lalu** (8–14 hari lalu), dan **Arsip Sebelumnya** (> 14 hari lalu).
  - Menyembunyikan input cepat pembuatan tugas baru dari arsip riwayat selesai untuk mencegah kekeliruan input.
- **Pembersihan & Kompaksi Visual**:
  - **Papan Scrum**: Mengganti tombol dashed 52px yang memanjang ke bawah dengan tombol tambah cepat di header kolom (`.scrum-col-add-btn`) dan membatasi tinggi internal kartu agar tidak memanjang jauh ke bawah.
  - **Centang Subtugas**: Mengunci dimensi `.subtask-check-circle` ke 20x20px simetris murni (`aspect-ratio: 1/1`, `border-radius: 50%`) dan menghapus karakter ASCII `└──`/`├──`.
  - **Kalender**: Menghapus tampilan raw id/kode di sel kalender, mengutamakan keterbacaan judul tugas dengan titik status berwarna.
  - **Pill Proyek (`.card-project-pill`)**: Redesain menjadi squircle bersih (radius 6px) dengan aksen titik warna proyek.
  - **Tombol Navigasi Tugas**: Mengubah tombol sebelumnya/selanjutnya menjadi bentuk squircle simetris 36x36px.
  - **Animasi Modal**: Mengganti animasi diagonal melompat menjadi skala pusat halus (0.96 ke 1) dengan fade opacity.
- **Verifikasi Kualitas**:
  - `npm test`: **142/142 tes lulus (19 berkas pengujian)**.
  - `npm run typecheck`: **0 kesalahan**.
  - `npm run build`: **Next.js Turbopack build sukses** (9/9 rute teroptimasi penuh).

## Pembersihan kegiatan/tugas, kalender, dan detail visual (2 Oktober 2026)

- Menu kegiatan sekarang bernama **Kegiatan** (sebelumnya "Jurnal Kerja") sehingga berbeda tegas dari **Daftar Tugas**. Formulir, judul halaman, dan deskripsi mengikuti nama baru.
- "Gabung rapat" tersedia pada detail tugas dan baris kegiatan bila referensi rapat valid online/hybrid dengan URL http(s); tidak ada tombol kosong untuk rapat tatap muka atau data rusak. Kegiatan kini dapat menautkan rapat melalui isian `meeting_id` opsional (kompatibel dengan data lama tanpa migrasi).
- Kalender: judul tugas tampil utama, kode menjadi metadata mono kecil. Semua tanda kode tugas memakai gaya seragam.
- Centang subtugas di laci dan tampilan Harian dirapikan: lingkaran jelas, posisi teks sejajar, area sentuh diperluas, fokus keyboard terlihat.
- Tombol ikon sebelumnya/berikutnya di laci tugas bukan lagi lingkaran penuh, melainkan sudut membulat 12 px.
- Animasi dialog bergerak naik lembut dari bawah; drawer tetap dari kanan. reduced-motion menonaktifkan animasi.
- Beranda: tombol "Buat tugas"/"Catat kegiatan" dan bagian "Kegiatan terbaru". Kegiatan dimuat melalui scope halaman Beranda.
- SQL: ketujuh berkas migrasi masih dirujuk oleh `tests/database.test.ts`, `tests/install-schema.test.ts`, `tests/reset-database.test.ts`, dan generator reset/instalasi; **tidak ada yang dapat dihapus tanpa merusak audit**. `INSTALL_SCHEMA_KOSONG.sql` dan `RESET_DATABASE_KOSONG.sql` tetap menjadi gabungan untuk skema kosong.
- Perbaikan lanjutan setelah audit: scope halaman `jurnal` dan `beranda` diperluas ke `journal/work-items/stakeholders/units/meetings` supaya relasi tampil, bukan "tidak ditemukan"; tautan "Gabung rapat" pada kegiatan memakai chip `.journal-join-link`; `.home-journal` masuk daftar kartu; tombol aksi Beranda dua kolom di ≤480 px; tombol ciutkan sidebar tidak lagi `opacity: 0`; tes baru `tests/kegiatan.test.tsx` menutup pemisahan menu, keamanan URL rapat, dan relasi kegiatan.
- Verifikasi paket: **134 tes lulus (18 berkas)**, typecheck 0 kesalahan, lint 0 masalah, build produksi berhasil. UI nyata pada 360/768/1024/1440 px belum diperiksa untuk paket ini.

## Penjelasan kegiatan/tugas dan SQL instalasi

- `KEGIATAN-DAN-TUGAS.md` membedakan Jurnal Kerja (kejadian) dari Tugas (pekerjaan) dan mencatat arah Beranda yang lebih informatif; perubahan dashboard belum diimplementasikan.
- Semua tujuh migrasi SQL masih dirujuk oleh tes dan generator reset. Tidak ada migrasi yang dihapus. `INSTALL_SCHEMA_KOSONG.sql` adalah gabungan untuk instalasi baru pada skema kosong saja, bukan untuk cloud yang sudah berjalan; uji pemasangan dan penolakan ulang lulus di PGlite.

## Paket lanjutan

- Default Harian yang selalu membuka Selasa diperbaiki di `DailyTasksView.tsx`; pemeriksaan UI langsung setelah perubahan masih diperlukan.
- Matriks audit hubungan fitur dan alur Git beberapa AI tercatat di `LANJUTAN-AI.md` dan `GIT-KERJA-PARALEL.md`. Pekerjaan dalam panduan itu belum dianggap selesai.
- Sesudah perubahan ini, 129 tes, typecheck, lint, dan build lulus. Pemeriksaan UI langsung serta audit data lintas halaman masih diperlukan.

## Pemeriksaan ponsel terbaru

- Input cepat tugas pada lebar 360 px kini memakai dua baris sehingga judul dan tombol tidak saling menekan.
- Beranda, Hari Ini, dan Tugas diperiksa pada viewport 360 px tanpa luapan horizontal halaman. Pemeriksaan tablet dan desktop menyeluruh masih perlu dilakukan; jangan anggap semua alur selesai hanya dari pemeriksaan ini.

## Perapian Priority Badge & Toggle Menu Samping Layar Lebar (Desktop)

- **Perapian Lencana Prioritas (`.priority-badge.priority-normal`)**:
  - Mengatasi tampilan tidak rapi pada lencana prioritas normal dan kosong:
    - Memberikan fallback aman `row.data.priority || 'normal'` di tabel tugas (`Records.tsx`) sehingga tidak pernah merender badge kosong atau `priority-undefined`.
    - Menetapkan tinggi presisi `height: 22px; padding: 0 9px; line-height: 1; border-radius: var(--radius-pill); font-size: 11px; font-weight: 600;` dengan `display: inline-flex; align-items: center; justify-content: center;` untuk perataan vertikal sempurna di sel tabel maupun detail drawer.
    - Menyelaraskan warna latar dan border lencana `priority-normal`: warna slate halus yang bersih (`rgba(100, 116, 139, 0.08)` dengan border `rgba(100, 116, 139, 0.2)` di mode terang, dan `rgba(148, 163, 184, 0.14)` di mode gelap).
    - Menetapkan lebar kolom tabel eksplisit (`col-task-title`, `col-task-status`, `col-task-priority: 105px`, `col-task-due: 130px`, `col-task-assignee: 145px`, `col-task-action: 44px`) agar tabel tugas simetris dan stabil tanpa pergeseran kolom saat prioritas berubah.
- **Toggle Bilah Samping untuk Tampilan Layar Lebar (`min-width: 1024px`)**:
  - Menyediakan kemampuan menutup dan membuka menu samping pada desktop untuk memaksimalkan ruang kerja horizontal (misal saat membaca tabel tugas lebar, linimasa Gantt, atau buku kas pencatatan):
    - **Tombol Toggle Topbar (`.desktop-sidebar-toggle`)**: Ditempatkan di sisi kiri atas topbar dengan ikon `PanelLeftClose` (saat terbuka) dan `PanelLeftOpen` (saat tertutup), memudahkan buka/tutup kapan saja.
    - **Tombol Ciutkan di Header Sidebar (`.desktop-sidebar-collapse-btn`)**: Ditempatkan di samping emblem brand koperasi dalam sidebar.
    - **Pintasan Keyboard (`Ctrl+B` / `Cmd+B`)**: Pengguna dapat menekan kombinasi tombol `Ctrl+B` untuk beralih antara tampilan menu samping penuh atau ruang kerja maksimal.
    - **Penyimpanan Preferensi Persisten**: Status ciut/buka disimpan di `localStorage` melalui hook `usePreference('hub-sidebar-desktop-collapsed')`, sehingga preferensi pengguna tetap terjaga saat beralih halaman atau memuat ulang.
    - **Transisi Halus & Kompatibilitas Multiplatform**: Animasi transisi pergeseran `0.22s cubic-bezier(0.16, 1, 0.3, 1)` untuk sidebar, topbar, dan area utama. Navigasi tablet (`tablet-rail`) dan ponsel (`drawer/floating dock`) tetap bekerja independen tanpa terganggu.
- **Verifikasi Kualitas**:
  - `npm test`: **129/129 tes lulus (16 file pengujian)**.
  - `npm run typecheck`: **0 kesalahan**.
  - `npm run lint`: **0 kesalahan / 0 peringatan**.
  - `npm run build`: **Next.js Turbopack build sukses** (9/9 rute teroptimasi penuh).

## Animasi Halaman Lengkap, Area Klik Luas (Tugas & Proyek), dan Perbaikan Pop-up Modal

- **Animasi Kedatangan & Transisi Halus Halaman**:
  - Menambahkan animasi kedatangan halus (`workspace-arrive` & `pageSectionFadeIn`) ke seluruh halaman yang sebelumnya belum memiliki animasi:
    - **Hari Ini (`/hari-ini` & Tab Harian `/tugas`)**: Animasi masuk untuk `.today-view-wrapper`, `.today-header-card`, `.today-quick-add-card`, `.today-grid-layout`, dan kartu tugas harian `.daily-tasks-container`.
    - **Perlu Perhatian (`/tindak-lanjut`)**: Animasi masuk untuk `.follow-up-wrapper`, `.follow-up-panel`, dan kartu-kartu evaluasi `.follow-up-card`.
    - **Linimasa Gantt (`/roadmap`)**: Animasi masuk untuk `.module-intro`, `.task-timeline`, dan kontainer grid kalender `.timeline-container`.
    - **Pencatatan (`/pencatatan`, `/buku-kas`, `/barang`, `/stok-opname`, `/buku-anggota`)**: Animasi masuk untuk tab navigasi `.recording-tabs`, toolbar, indeks buku `.notebook-layout`, kartu metrik keuangan/stok `.ledger-metrics`, dan tabel pencatatan `.ledger-wrap`.
    - **Pengaturan (`/pengaturan`)**: Animasi masuk untuk `.settings-container`, bilah tab `.settings-tabs-row`, dan panel kartu pengaturan `.settings-card`.
  - Tetap mendukung dan mematuhi `@media (prefers-reduced-motion: reduce)` dan preferensi pengguna (`data-motion='minimal'`).
- **Perluasan Area Klik (Hit-Target) Tugas dan Proyek**:
  - **Tabel Tugas (`Records.tsx`)**: Mengubah tombol `.task-title-btn` menjadi tombol blok fleksibel mencakup seluruh sel judul dan sub-konteks proyek (`width: 100%`, `min-height: 48px`, padding `6px 10px`, margin kompensasi `-4px -8px`). Mengklik di mana saja pada judul tugas, kode, maupun nama proyek di dalam sel langsung membuka detail tugas secara responsif tanpa perlu mengarahkan kursor ke teks kecil.
  - **Tautan Proyek Sidebar (`AppShell.tsx`)**: Memperbesar `.manager-project-link` dari `32px` menjadi `42px` (`min-height: 42px`, padding `8px 12px`, radius `10px`) agar mudah diklik dan disentuh pada ponsel maupun desktop.
  - **Item Navigasi Sidebar (`.sidebar-nav-item`)**: Memastikan tinggi sentuh nyaman minimal 42px di seluruh layar.
  - **Laci Detail Tugas (`TaskDetailDrawer.tsx`)**: Mengubah badge proyek menjadi tautan interaktif (`.project-badge-link`) yang langsung mengarahkan ke halaman proyek terkait dengan area sentuh nyaman.
  - **Area Centang Tugas Harian (`.task-round-check`)**: Menambahkan zona sentuh diperluas (pseudo-element hit area) agar centang tugas harian mudah diklik tanpa presisi milimeter.
- **Perbaikan Bug Efek Pop-up Modal (Kejutan Kiri ke Kanan)**:
  - Mengidentifikasi akar masalah Chromium / WebKit layout pass pada elemen `<dialog>` dengan `margin: auto`: browser awalnya merender dialog pada koordinat `left: 0` sebelum `margin: auto` menghitung perataan tengah, sehingga saat animasi `scale()` dijalankan, modal tampak meluncur/melompat dari kiri ke kanan ("efek kejutan").
  - Memperbaiki seluruh modal dialog (`dialog.editor`, `.manager-action-dialog`, `dialog.command-dialog`, `dialog.export-dialog`, `.sprint-modal-card`):
    - Mengunci posisi tengah menggunakan koordinat deterministik: `position: fixed !important; top: 50% !important; left: 50% !important; translate: -50% -50% !important; margin: 0 !important;`.
    - Menetapkan `transform-origin: center center !important;`.
    - Menyempurnakan `@keyframes modalCardScale` agar tumbuh halus dan simetris dari titik pusat (`scale: 0.97` ke `1`) tanpa pergeseran horizontal maupun lonjakan sumbu Y.
    - Hasil: Modal terbuka tepat di tengah layar dengan transisi pudar dan perbesaran mikro yang lembut tanpa jeda visual atau lompatan horizontal.
- **Verifikasi Kualitas**:
  - `npm test`: **129/129 tes lulus (16 file pengujian)**.
  - `npm run typecheck`: **0 kesalahan**.
  - `npm run lint`: **0 kesalahan / 0 peringatan**.
  - `npm run build`: **Next.js Turbopack build sukses** (9/9 rute teroptimasi penuh).

## Sistem Variabel Global (Design Tokens) & Harmonisasi Simetri Komponen

- **Design System Global Variables (`personal.css`)**:
  - Membangun token global lengkap di level `:root` dan `.dark`:
    - **Tipografi**: `--font-sans`, `--font-mono`, skala ukuran `--font-size-2xs` hingga `--font-size-2xl`, serta bobot `--font-weight-normal/medium/semibold/bold/extrabold`.
    - **Form Controls & Dropdowns**: `--control-font`, `--control-height-sm/md/lg`, `--control-padding-sm/md/lg`, `--control-radius-sm/md/lg`, `--control-border`, `--control-border-hover`, `--control-border-focus`, `--control-shadow-focus`, serta ikon chevron inline SVG (`--select-chevron-icon` dan `--select-chevron-dark-icon`).
    - **Tombol & Proporsi Simetris**: `--btn-font`, `--btn-height-sm/md/lg`, `--btn-padding-sm/md/lg`, `--btn-font-size-sm/md/lg`, `--btn-radius-sm/md/pill`.
    - **Tabel**: `--table-th-height`, `--table-th-padding`, `--table-td-padding`, `--table-border`, `--table-radius`, `--table-row-hover`.
- **Perbaikan Simetri & Tombol Jadwal Berulang (`RecursiveScheduleModal` & `SprintModal`)**:
  - Mengatasi huruf tombol simpan yang sebelumnya terlalu besar dan tidak proporsional:
    - Menambahkan aturan `.sprint-form-actions`, `.btn-cancel`, dan `.btn-save-sprint` yang terikat pada variabel `--btn-height-md` (38px), `--btn-font-size-md` (13.5px), `--btn-radius-md`, dan padding simetris.
    - Tombol "Batal" dan "Simpan pengulangan" kini sejajar rapi, proporsional, dan seimbang secara visual.
  - Menyelaraskan seluruh input teks, tanggal, dan waktu dalam modal ke token kontrol global (`--control-height-md`, padding, radius).
- **Penyelarasan Dropdown & Tabel Tugas (`task-table-wrap`)**:
  - Menyelaraskan dropdown status (`.task-status-select`) dengan font sistem `Plus Jakarta Sans` (`--control-font`), tinggi 32px (`--control-height-sm`), ikon chevron SVG, dan aksen warna semantik status yang halus.
  - Menyelaraskan seluruh dropdown native `<select>` dan custom `<Select>` di seluruh aplikasi agar memiliki tinggi, font, padding, dan chevron yang seragam dan konsisten.
- **Verifikasi Kualitas**:
  - `npm test`: **129/129 tes lulus (16 file pengujian)**.
  - `npm run typecheck`: **0 kesalahan**.
  - `npm run lint`: **0 kesalahan / 0 peringatan**.
  - `npm run build`: **Next.js Turbopack build sukses** (9/9 rute teroptimasi penuh).

## Penyederhanaan & Harmonisasi Tabel Tugas (`task-table-wrap`) Clean Design

- **Pembersihan Elemen Membingungkan & Harmonisasi Visual**:
  - **Menghapus lingkaran di sisi paling kiri (`task-row-checkbox`)**: Menghilangkan lingkaran/checkbox tak berlabel yang membingungkan pengguna. Penyelesaian tugas tetap mudah dan eksplisit via tombol "Selesai" di kolom aksi dan selektor status.
  - **Menghilangkan tabrakan warna & badge berlebihan**:
    - Menghilangkan badge berwarna mencolok dengan border ganda (`task-code-badge`, `task-project-pill`, `task-subtasks-pill`, `task-recurrence-pill`) dan tumpukan ikon kecil yang saling bertabrakan.
    - Judul tugas kini bersih dan dominan; konteks proyek, jumlah subtugas, dan penanda perulangan ditampilkan sebagai teks sekunder yang tenang (`--ink-muted`) di bawah judul tugas.
    - Selektor status disederhanakan menjadi kontrol form native yang rapi tanpa kontainer pill tebal dan titik neon bercahaya.
    - Badge prioritas distandarisasi dengan warna pastel lembut sistem tanpa ikon api atau seruan yang berisik.
    - Kolom tenggat menggunakan teks tipografis yang jelas tanpa tumpukan ikon kalender/peringatan.
    - Kolom penanggung jawab ditampilkan dalam format teks yang bersih tanpa avatar inisial berwarna-warni yang bersaing dengan kolom lain.
    - Menghapus tombol kotak `ArrowUpRight` yang redundan karena judul tugas sudah berfungsi langsung membuka laci detail tugas.
    - Menghapus bilah footer statistik tabel yang berisik di dalam kartu tabel agar tampilan tetap fokus dan minimalis.
- **Verifikasi Kualitas**:
  - `npm test`: **129/129 tes lulus (16 file pengujian)**.
  - `npm run typecheck`: **0 kesalahan**.
  - `npm run lint`: **0 kesalahan / 0 peringatan**.
  - `npm run build`: **Next.js Turbopack build sukses** (9/9 rute teroptimasi penuh).

## Perapian Menu, Eliminasi Redundansi & Relasi Database Dokumen

- **Eliminasi Redundansi Menu & Navigasi**:
  - Menyelesaikan kebingungan peran antara tugas harian, master tugas, dan audit masalah.
  - Menu `/tugas` dipertegas menjadi **Daftar Tugas** (bank/backlog tugas, kanban, kalender, filter status).
  - Menu `/tindak-lanjut` dipertegas menjadi **Perlu Perhatian** dengan ikon peringatan `AlertCircle` (pusat audit anomali: tugas macet, dokumen kedaluwarsa, isu blocker, dan review mingguan).
  - Menu `/roadmap` dipertegas menjadi **Linimasa Gantt** (visualisasi linimasa jadwal proyek).
  - Menu `/pencatatan` dipertegas menjadi **Ringkasan Buku** (hub ringkasan data dari 4 buku operasional).
  - Menu operasional dan koordinasi diperjelas: **Buku Kas**, **Barang Dagangan**, **Stok Opname**, **Buku Anggota**, **Unit Gerai**, **Kesiapan Gerai**, **Risiko & Isu**, **Laporan Kerja**, **Rapat & Keputusan**, **Mitra & Kontak**, **Tim & Petugas**.
  - Urutan kelompok sidebar disesuaikan secara logis: Pekerjaan → Pencatatan → Operasional → Koordinasi → Lainnya. Semua 22 URL rute asli tetap 100% kompatibel tanpa tautan rusak.
- **Integritas Relasi Database (SQL Migration 7)**:
  - Berkas baru: `supabase/migrations/20261002000007_document_relation_check.sql`.
  - Memperbarui fungsi PostgreSQL `hub_check_relations()` agar secara ketat memvalidasi referensi `document_id` pada tugas ke entitas `documents`. Menambahkan indeks pencarian cepat `hub_task_document_idx`.
  - Berkas reset `supabase/reset/RESET_DATABASE_KOSONG.sql` dibangun ulang melalui `scripts/build-reset.mjs` dengan menyertakan migrasi 7.
- **Verifikasi Kualitas**:
  - `npm test`: **129/129 tes lulus (16 suites)** termasuk pengujian PGlite lokal untuk validasi relasi `document_id`.
  - `npm run typecheck`: **0 kesalahan TypeScript**.
  - `npm run lint`: **0 kesalahan / 0 peringatan** ESLint.
  - `npm run build`: **Next.js 16.3.7 Turbopack berhasil**, 9/9 rute teroptimasi penuh.

## Detail tugas kembali terbuka setelah pindah tampilan

- Parameter `task` pada URL sebelumnya tertinggal saat detail tugas ditutup. Ketika halaman dipasang ulang, parameter itu membuka tugas yang sama. Penutupan kini menghapus parameter sambil mempertahankan filter URL lain.
- Alur URL tugas → tutup lewat Escape/tombol → pindah ke Papan diperiksa di browser lokal; dialog tetap tertutup. Tes regresi menutup lalu memasang ulang tampilan lulus.
- Verifikasi paket: 129 tes, typecheck, lint, dan build lulus.

## Perbaikan dari anotasi tampilan

- Riwayat tugas mendapat kartu per peristiwa; tombol tutup pusat aksi dan centang Hari Ini diperjelas. Tajuk lokasi, pilihan status, metadata tugas, pintasan tindak lanjut, input cepat, dan grafik tujuh hari dirapikan.
- Warna prioritas pada kartu Beranda memakai empat warna semantik tetap. Grafik kosong menyebutkan bahwa belum ada tugas selesai, tanpa mengarang jumlah.
- Tugas baru mendapat kode otomatis dari kata pertama judul dan 12 karakter UUID; kode historis tetap. Tugas dapat menunjuk satu Mitra atau kontak serta satu Dokumen atau kontrak yang sudah dicatat. Tidak ada migrasi SQL untuk tambahan referensi JSONB ini.
- Tampilan Beranda, Tugas, dan Hari Ini diperiksa di browser lokal pada desktop; Hari Ini diukur pada 360 px tanpa luapan halaman. Pemeriksaan fisik tablet/ponsel dan semua keadaan interaksi belum lengkap.
- Pemeriksaan kode paket anotasi: 128 tes lulus, typecheck, lint, dan build produksi lulus.

## Login lokal setelah pesan migrasi keamanan

- Pemeriksaan baca saja ke proyek `mqycnhebhzqaziouipet`: tabel `manager_security` dan `hub_records` tersedia, kunci server dapat membacanya, dan metadata serta satu panggilan diagnostik fungsi `reserve_pin_attempt` berhasil. **Migrasi keamanan tidak hilang**.
- Server pengembangan sebelumnya berjalan tanpa akses jaringan, sehingga panggilan Supabase gagal tetapi ditampilkan sebagai “Migrasi keamanan belum tersedia”. Server lokal dijalankan ulang dengan akses jaringan; pemilik mengonfirmasi berhasil masuk memakai PIN.
- Pesan galat login kini membedakan fungsi hilang, izin fungsi, koneksi server, dan galat database. PIN dan hash tidak dicetak. Panggilan diagnostik memakai satu jatah percobaan sementara; tidak ada PIN yang dicoba.
- Verifikasi paket ini: 126 tes lulus, typecheck, lint, dan build lulus.

## Alur tugas dan ponsel

- Form tugas baru menampilkan isian pokok lebih dulu, dengan **Detail lainnya** untuk isian lanjutan. Tugas menautkan Mitra atau kontak, Rapat, dan Kendala; milestone terkunci sampai proyek dipilih dan hanya menampilkan milestone proyek itu. Kode tugas tidak wajib diisi dan tidak ditampilkan bila kosong.
- Jadwal berulang dimulai dari **Tidak berulang**. Jam dan batas tanggal terkunci sampai pola dipilih; tugas berikutnya hanya dibuat saat tugas sekarang diselesaikan dan batas tanggal belum lewat. Jam tidak mengirim pengingat otomatis.
- Pada stok opname, jumlah buku diambil dari barang terpilih dan tidak bisa diketik ulang; kolom hitung baru aktif setelah barang dipilih.
- Kalender ponsel memakai sel tanggal ringkas agar tujuh hari muat dalam lebar layar; Gantt ponsel mulai dari daftar tanggal, dengan bagan mendatar sebagai pilihan. Navigasi bawah dipindah ke tepi layar dan ruang konten ditambah.
- Tes baru mencakup penguncian input, pilihan mitra, dan milestone. Pemeriksaan kode paket sebelumnya: **125 tes lulus**, typecheck, lint, dan build lulus. Setelah login, halaman Tugas diperiksa pada 360/768/1024/1440 px. Luapan horizontal ponsel dan tombol Tugas baru yang menimpa pilihan rentang diperbaiki; Kalender dan Gantt ponsel diperiksa tanpa luapan halaman. Pengujian visual halaman lain belum menyeluruh.

## Navigasi, kontak, dan data bertahap

- Pemeriksaan kode: 123 tes lulus, typecheck, lint, dan build lulus. Kueri daftar tugas dibaca langsung dari Supabase setelah reset. Pemeriksaan visual halaman pribadi pada semua ukuran belum dilakukan karena sesi browser pemeriksaan kedaluwarsa.
- Halaman kini meminta domain yang dibutuhkan saja, maksimal 50 catatan per permintaan. Tugas aktif dan selesai terbaru dipisah dari riwayat selesai lama; tombol **Muat 50 lagi** tersedia. Beranda memberi tahu saat ringkasan berasal dari data parsial.
- Cache bacaan 60 detik menggabungkan permintaan serentak dan dibersihkan setelah perubahan. Uji baca langsung Supabase berhasil dan menemukan satu tugas setelah reset. Uji visual halaman login diperlukan untuk melihat data pribadi; sesi browser pemeriksaan sudah kedaluwarsa.
- Menu **Terakhir** dihapus; menu **Mitra & kontak** menggantikan label lama. Kategori Agrinas ditambah tanpa data orang rekaan. Warna Lime lebih tegas dan gaya kartu/tombol/tab dirapikan di `polish.css`.
- Panduan contoh pengisian rundown tersedia di `docs/PANDUAN-ONBOARDING.md`.
- Migrasi indeks `20261002000006_paged_records.sql` disiapkan dan diuji lokal. Pemilik menyetujui dan akan menjalankannya melalui SQL Editor. **Hasil cloud belum dikonfirmasi**; data tetap bisa dibaca tanpa indeks ini, tetapi performa data besar belum dioptimalkan di cloud.

## Reset proyek Supabase saat ini

- Pemilik memilih reset proyek `mqycnhebhzqaziouipet`, bukan membuat proyek baru.
- Berkas manual: `supabase/reset/RESET_DATABASE_KOSONG.sql`; panduan: `docs/RESET-DATABASE.md`. Versi terbaru menggabungkan migrasi 1–6 dalam satu transaksi, menghapus PIN/sesi, dan menolak reset jika catatan atau laporan sudah ada. Saat reset cloud sebelumnya dijalankan, berkas mencakup migrasi 1–5.
- Pengujian PostgreSQL lokal lulus: pemasangan bersih, reset ulang, RLS/izin anonim, tabel lain tetap ada, serta pembatalan ketika catatan/laporan ditemukan.
- Pemilik mengonfirmasi SQL reset berhasil dijalankan di cloud. Tidak ada perubahan URL/kunci Supabase. Pembuatan ulang PIN dan uji simpan setelah reset belum dikonfirmasi.
- Reset database bukan bukti performa data besar; migrasi indeks cloud belum dikonfirmasi.

## Paket Perapian Detail Kecil (2 Oktober 2026)

- **Verifikasi Kualitas Kode**:
  - `npm test`: **118/118 pengujian lulus** — termasuk perbaikan tes TodayView yang sebelumnya gagal karena tanggal hardcoded.
  - `npm run typecheck`: **0 kesalahan TypeScript**.
  - `npm run lint`: **0 kesalahan / 0 peringatan** ESLint.
  - `npm run build`: **Next.js 16.3.7 Turbopack berhasil**, 9/9 rute teroptimasi.

- **Perbaikan Rinci**:
  - **Sidebar tidak rapi**: Tinggi terkunci `100vh`, hanya `.manager-sidebar-nav-scroll` yang bergulir. Scrollbar tipis 4px. `.sidebar-group-toggle` lebih kompak (32px, huruf kapital kecil).
  - **Tindak Lanjut tidak rapi**: `<select>` raw diganti `Select` terpadu. Filter tersusun dalam `.follow-up-toolbar`. Empty state menggunakan `ShieldCheck`. Panel tidak lagi memiliki judul ganda.
  - **Card mepet ke parent**: Seluruh card utama mendapat `border: 1.5px`, `border-radius: 20px`, `padding: 24px 28px`, `margin-bottom: 24px`. `.manager-main` mendapat `padding: 28px 36px 48px`.
  - **Pengaturan mepet ke kiri**: `settings-container` kini `width: 100%; max-width: 100%`. Grid warna, pengaturan tampilan, dan cadangan mengisi lebar penuh secara responsif.
  - **Select seragam**: `TaskTimeline` (skala Gantt) dan `TaskBatchActions` (ubah massal) kini memakai komponen `Select` terpadu.
  - **Tes tanggal rapuh**: `redesign.test.tsx` kini menggunakan `today()` dan `addDays()` sehingga tidak gagal saat dijalankan di luar tanggal hardcoded.

## Paket Estetika & Perapian UI Menyeluruh (Oktober 2026)

- **Verifikasi Kualitas Kode**:
  - `npm test`: **118/118 pengujian lulus (11 suites)** tanpa kegagalan.
  - `npm run typecheck`: **0 kesalahan tipe TypeScript** (`tsc --noEmit`).
  - `npm run lint`: **0 kesalahan linting / 0 peringatan** (`eslint src tests`).
  - `npm run build`: **Next.js 16.3.7 Turbopack production build berhasil**, 9/9 rute teroptimasi penuh.

- **Perbaikan Rinci Sesuai Masukan Manajer**:
  - **Perapian Tanggal di Atas (`.home-date-chip`)**: Mengatasi masalah ikon kalender dan teks tanggal yang bertumpuk canggung di kanan atas beranda. Menambahkan kontainer pill horizontal rapi (`display: inline-flex; align-items: center; gap: 8px`), border 1.5px tegas, latar kartu, dan bayangan halus.
  - **Peningkatan Popup Modal & Border Jelas**: Memperkuat wadah dialog (`dialog.editor`, `.manager-action-dialog`) dengan border 1.5px bertegasan tinggi (`var(--line-strong)`), bayangan ganda (*dual-stage shadow*), dan latar belakang *backdrop blur* (8px). Menyeragamkan seluruh input form (`.field-input`, `.field-select`, `.field-textarea`) dengan garis tepi 1.5px yang serasi dan cincin fokus halus tanpa garis hitam pekat kasar. Tombol silang penutup modal diperjelas dengan kontras tinggi dan efek hover tegas.
  - **Sidebar Hemat Tempat**: Mengompresi kartu `Favorit` dan `Terakhir Dibuka` dari wadah besar ~300px menjadi baris chip ringkas (`.sidebar-recents-compact` dan `.sidebar-favorites-compact`) setinggi ~35px. Jika tidak ada item favorit disematkan, bagian favorit tidak memakan tempat sama sekali, mencegah scrollbar yang tidak perlu pada menu utama.
  - **Penyelesaian Misteri "Garis Hitam" pada Kartu**: Menghilangkan garis hitam mendatar yang muncul saat data penyelesaian tugas bernilai 0. Masalah ini disebabkan oleh *polyline SparkLine* statis pada koordinat `y=33`. Komponen digantikan oleh `RadialProgressRing` interaktif dengan animasi lingkaran progres melingkar, serta ikon squircle bernuansa badge untuk kartu tugas aktif, terlambat, dan rapat.
  - **Kartu & Grafik Lebih Unik & Beranimasi**:
    - **Radial Progress Ring**: Animasi lingkaran SVG SVG stroke-dashoffset halus (0.8s) dengan persentase di tengah.
    - **WeekBarChart**: Pilar grafik kini memakai gradien lembut, efek hover interaktif, dan penanda berpendar (*glow effect*) untuk hari ini (`bar-today`).
    - **TaskDonutChart**: Transisi segmen donat interaktif yang membesar saat kursor diarahkan, serta center counter dengan tipografi tegas.
    - **Project Progress**: Bar kemajuan proyek kini beranimasi bertahap (*staggered delay*).
  - **Penyederhanaan Desain Aksi Cepat**: Menghilangkan tombol pintasan duplikat di bawah judul beranda. Mengelompokkan 9 tindakan di modal aksi manajer menjadi 2 seksi logis teratur (*Pencatatan Operasional* dan *Pekerjaan & Evaluasi*), menghapus teks pengulangan "Buka formulir →", dan menambahkan tombol silang `<X>` yang jelas dengan dukungan tombol `Esc`.
  - **Pembersihan Total Emoji**: Menghapus seluruh karakter emoji mentah pada berkas `Editor.tsx`, `Operations.tsx`, `Records.tsx`, `ProjectNotes.tsx`, `Reports.tsx`, dan `catalog.ts`. Seluruhnya digantikan oleh ikon SVG Lucide yang konsisten dan selaras dengan tema aplikasi.

## Paket Karakter Halaman, Navigasi Terstruktur & Ruang Kerja Editorial

- **Verifikasi Kualitas Kode**:
  - `npm test`: **118/118 pengujian lulus (11 suites)** tanpa kegagalan (seluruh pengujian database, timeline, security, redesign, kalender, dan operasi lulus).
  - `npm run typecheck`: **0 kesalahan tipe TypeScript** (`tsc --noEmit`).
  - `npm run lint`: **0 kesalahan linting** (`eslint src tests`).
  - `npm run build`: **Next.js 16.3.7 Turbopack production build berhasil**, 9/9 rute teroptimasi penuh.

- **Penyelarasan Komponen Menyeluruh & Perbaikan Bug Visual (Oktober 2026)**:
  - **Tombol Tutup Modal (Silang Pop Up)**: Memperbaiki masalah hilangnya tombol silang pada popup Jurnal Kerja dan modal form dengan menghapus offset sticky negatif (`top: -28px` / `top: -16px`) warisan di CSS yang sebelumnya menarik header ke luar area `overflow: hidden`. Memperkuat posisi, ukuran (36px), kontras, dan ketahanan tombol tutup di semua ukuran layar.
  - **Solusi Dropdown Terhimpit Kartu**: Mengatasi masalah dropdown yang terpotong atau tertutup kartu di bawahnya (`.filters`, `.dashboard-controls`, dan `.record-options`) dengan menetapkan stacking context dan `z-index: 500+` ketika dropdown terbuka, serta menata drawer opsi kartu agar rapi dan tidak sempit.
  - **Perapian Tampilan "Terakhir Dibuka" di Sidebar**: Mendesain ulang wadah dan chip riwayat navigasi terakhir dengan kontainer terstruktur, tipografi rapi, ikon halaman yang sesuai, status aktif, dan efek hover yang lembut.
  - **Harmonisasi Ikon Menyeluruh**: Mengganti emoji mentah (`📅`, `📁`, `🔴`, `🟡`, `🟢`, `⚪`) pada header bagian rapat dan status kedaluwarsa dokumen dengan ikon Lucide yang senada (`CalendarDays`, `FolderArchive`, `AlertCircle`, `Clock`, `CheckCircle2`, `ShieldCheck`), serta melengkapi ikon `ArrowRightCircle` untuk rute `/tindak-lanjut`.


- **Header Ringkas & Pusat Aksi Terpadu**:
  - Tombol `+ Aksi` dan `+ Tugas baru` yang sebelumnya hadir bersamaan di header disatukan menjadi satu tombol `+ Tambah` yang ringkas di topbar desktop/tablet dan dock mengambang ponsel.
  - Membuka modal aksi cepat (`ManagerActionModal`) dengan 9 opsi kontekstual (Kas, Anggota, Barang, Opname, Tugas, Rapat, Laporan, Risiko).

- **Navigasi Sidebar Terstruktur & Pintas**:
  - **Favorit**: Fitur sematkan halaman favorit (`hub-favorites`) dengan tombol bintang interaktif di setiap item menu.
  - **Terakhir Dibuka**: Menampilkan chip riwayat navigasi terakhir secara dinamis untuk perpindahan cepat antar-halaman kerja.
  - **Kelompok Menu Kolapsibel**: Kelompok menu (Pekerjaan, Koordinasi, Operasional, Pencatatan, Lainnya) dapat dilipat/dibuka secara independen.

- **Karakter Visual Tiap Halaman**:
  - **Beranda (`/beranda`)**: Mendahulukan bagian "Perlu Perhatian" (`FollowUps`) dan Agenda Rapat/Fokus harian tepat di bawah strip aksi cepat.
  - **Proyek (`/proyek`)**: Kartu menonjolkan ringkasan tujuan, progres, indikator kendala/isu terbuka, dan langkah tenggat berikutnya. Halaman detail menyatukan tugas, catatan terformat, milestone, dokumen terkait, dan keputusan formal terkait.
  - **Dokumen (`/dokumen`)**: Kartu menampilkan nomor dokumen, jenis dokumen, status kelengkapan (Tersedia / Diproses / Belum Ada), serta masa berlaku berwarna (🔴 Kadaluwarsa, 🟡 <30 hari, 🟢 Valid).
  - **Risiko (`/risiko`)**: Tampilan tingkat keparahan terstruktur 3-level (Bahaya Kritis, Perlu Waspada, Terkendali), skor dampak/probabilitas (x/25), rencana mitigasi, dan jadwal tinjau berkala.
  - **Rapat (`/rapat`)**: Pemisahan jelas antara rapat "Akan Datang & Hari Ini" dengan "Riwayat Rapat Selesai". Urutan kartu mengikuti alur logis: Agenda Pembahasan → Notulen Hasil → Keputusan Terkait → Tindak Lanjut (+ tombol buat tugas langsung & tautan online menonjol).
  - **Pengaturan (`/pengaturan`)**: Dibagi menjadi 4 tab terfokus (Tampilan & Tema, Profil Koperasi, Keamanan PIN, dan Cadangan & Pemulihan), dilengkapi **Kartu Pratinjau Tema Langsung** (*Live Component Preview Stage*) yang memperlihatkan contoh tombol, tugas interaktif, status badge, dan bar progres nyata dalam palet tema terpilih.

- **Penyelarasan 5 Tema Warna Editorial**:
  - Lime & Ink (bawaan): Hijau lembut `#CEDD86` & lavender `#B5A8D6` pada latar `#F6F7F3`.
  - Sage: Hijau `#759887` & pasir `#DCCDB5` pada latar `#F4F6F2`.
  - Lavender: Ungu `#9688BF` & biru abu `#A9BBCB` pada latar `#F7F5FA`.
  - Peach: Terakota `#C98267` & krem `#E8D6B8` pada latar `#FBF6F1`.
  - Sky: Biru `#628BAA` & mint `#ADD1C2` pada latar `#F3F7FA`.
  - Teks arang gelap kontras tinggi, penanda status dengan teks eksplisit di semua tema, dan mode gelap tetap terjaga penuh.

## Paket Superapp Manajer & Manajemen Draf Laporan

- **Alur Laporan Lengkap & Tombol Hapus Draf (`/laporan`)**:
  - **Pembedaan Status Jelas**: Setiap laporan kini memiliki status eksplisit: `Draf Kerja` (kuning/amber) vs `Dokumen Resmi` (hijau resmi) berkop KDMP.
  - **Opsi Simpan Ganda**:
    - Tombol `Simpan sebagai Draf`: merekam catatan sementara yang dapat diperbarui atau dihapus kapan saja.
    - Tombol `Terbitkan Laporan Resmi`: langsung menerbitkan dokumen resmi berkop KDMP.
  - **Tombol Hapus Draf / Hapus Laporan**:
    - Tombol `Hapus Draf` merah terpampang jelas pada setiap draf laporan yang dipilih.
    - Dilengkapi dialog konfirmasi interaktif agar manajer tidak sengaja menghapus dokumen.
    - Terhubung ke endpoint API server `DELETE /api/reports?id=...`.
  - **Aksi Terbitkan dari Draf**: Manajer dapat meninjau draf kerja, lalu menekan tombol `Terbitkan Resmi` untuk mengubah status draf menjadi laporan resmi tanpa perlu mengetik ulang.
  - **Filter Arsip**: Tab filter `Semua Arsip`, `Draf Kerja`, dan `Dokumen Resmi` memudahkan navigasi arsip.
  - **Integrasi Rekapitulasi Arus Kas**: Snapshot laporan kini otomatis merekam total kas masuk, kas keluar, dan selisih kas riil pada periode evaluasi terkait.

- **Pusat Aksi Cepat Manajer (Superapp Command Center)**:
  - **Komponen `ManagerActionModal`**: Menyediakan 9 pintasan aksi cepat ke seluruh penjuru aplikasi (Kas Masuk, Kas Keluar, Anggota Baru, Beli/Stok Barang, Hitung Opname, Buat Tugas, Jadwalkan Rapat, Susun Laporan, dan Catat Risiko).
  - **Akses Fleksibel Multiplatform**:
    - Tombol `+ Aksi` di topbar desktop dan tablet.
    - Tombol melayang tengah di dock ponsel bawah (`dock-center-action`).
    - Tombol pintasan langsung di dalam Command Dialog (`⌘K` / `Ctrl+K`).
    - Pintasan keyboard instan: angka `1` s.d. `9` untuk memilih aksi langsung.

- **Dasbor Superapp Manajer (`/` Beranda)**:
  - **Pintasan Cepat (*Quick Strip*)**: Bar pintasan aksi operasional langsung di bawah tajuk beranda.
  - **Peringatan Persediaan Kritis (*Smart Stock Alert*)**: Muncul otomatis jika terdapat barang toko yang habis atau di bawah batas stok minimum gerai, dengan tautan langsung untuk belanja stok.
  - **Rekapitulasi Catatan Koperasi**: Menampilkan jumlah riil anggota aktif, saldo kas neto, jumlah jenis barang toko, dan riwayat opname.

- **Langkah Menjalankan Migrasi Database di Supabase**:
  - Berkas migrasi baru: `supabase/migrations/20261001000005_manager_superapp.sql`.
  - **Langkah-langkah eksekusi**:
    1. Buka dashboard proyek Supabase Anda di peramban (`https://supabase.com/dashboard/project/<project-ref>`).
    2. Masuk ke menu **SQL Editor** pada navigasi sisi kiri.
    3. Klik tombol **+ New Query**.
    4. Salin seluruh isi berkas `supabase/migrations/20261001000005_manager_superapp.sql` dan tempel ke editor SQL.
    5. Klik tombol **Run** (atau tekan `Ctrl+Enter`).
    6. Pastikan muncul pesan sukses: `Success. No rows returned`.
    7. Kolom `status`, indeks pencarian draf, dan izin akses `DELETE` kini telah aktif sepenuhnya.

## Paket Polish & Desain Ulang Kartu Pencatatan

- **Penyelarasan & Pembaruan Visual Kartu Modul (`/pencatatan`)**:
  - **Ikon Squircle Bersih**: Menghapus strip vertikal ganjil di sisi kiri ikon (`border-left` tebal warisan skeuomorfik) dan menggantinya dengan ikon squircle lembut bersudut 13px berlatar pastel serasi (Anggota: hijau zamrud, Kas: biru langit, Barang: ungu, Opname: amber).
  - **Struktur Judul & Lencana Rapi**: Memindahkan lencana `0 data` berdampingan dengan nama buku, menghilangkan spasi kosong berlebihan.
  - **Aksi Sisi Kanan Terpadu**: Menata tombol `+ Tambah` dan tombol navigasi buka `↗` ke dalam satu grup aksi yang proporsional, seragam, dan memiliki efek hover interaktif.
  - **Proporsi Kartu Modern**: Mengganti radius lonjong ekstrem dengan radius 16px dan bayangan halus berdimensi modern.
  - **Dukungan Tema Gelap Penuh**: Menjamin warna latar, garis batas, dan teks kontras jelas pada tema gelap.

## Paket Operasional: Keterhubungan Pencatatan, Pemilih Bulan, Laporan Eksekutif & Risiko

- **Verifikasi Kualitas Kode**:
  - `npm test`: **109/109 pengujian lulus (10 suites)** tanpa kegagalan.
  - `npm run typecheck`: **0 kesalahan tipe TypeScript** (`tsc --noEmit`).
  - `npm run build`: **Next.js 16.3.7 Turbopack production build berhasil**, 9/9 rute teroptimasi penuh.

- **Pemilih Bulan Berbahasa Indonesia Rapi**:
  - Menggantikan `<input type="month">` native peramban (yang menampilkan popover Windows berbahasa Inggris dengan placeholder `---------- ----` dan bulan disingkat 'Oct', 'Clear', 'This month') dengan komponen `Select` kustom modern berbahasa Indonesia.
  - Pilihan bulan otomatis diurutkan: "Semua Bulan", "Oktober 2026 (Bulan Ini)", "September 2026", dsb., sesuai tanggal riil dan catatan transaksi.

- **Keterhubungan Silang Buku Pencatatan Operasional**:
  - **Buku Kas (`cash-entries`)**: Terhubung langsung ke Anggota (`member_id`) dan Barang (`item_id`). Tabel menampilkan lencana anggota/barang terkait dan subtitle rapi di bawah judul transaksi.
  - **Buku Anggota (`members`)**: Menampilkan ringkasan transaksi kas anggota (jumlah setoran/simpanan & total rupiah) serta tombol aksi instan `+ Kas` untuk langsung membuka form setoran kas dengan identitas anggota terisi otomatis.
  - **Buku Barang (`inventory-items`)**: Menampilkan harga satuan (`price`), estimasi total nilai persediaan pada kartu metrik, status stok (Aman / Menipis / Habis), riwayat opname terakhir, serta tombol aksi cepat `+ Beli` (mencatat pengeluaran kas pengadaan stok) dan `Opname` (menghitung fisik).
  - **Buku Stok Opname (`stock-counts`)**: Menampilkan SKU dan satuan barang, selisih stok fisik berwarna, dan secara otomatis menyalin stok buku saat barang dipilih pada form isian.

- **Template Laporan Eksekutif Resmi Manajer (`/laporan`)**:
  - Tampilan laporan disulap menjadi lembar dokumen resmi Koperasi Desa Merdeka Puntukrejo (KDMP) yang siap cetak / PDF dan siap dibagikan ke WhatsApp.
  - Dilengkapi Kop Surat Resmi Koperasi (lambang, nama badan hukum koperasi, alamat lengkap, nomor dokumen resmi, dan periode evaluasi).
  - 4 Kartu KPI Eksekutif: Tugas Rampung, Milestone Tercapai, Kendala/Tugas Terlambat, dan Risiko Terbuka.
  - Kotak Catatan Pengantar Manajer bergaya memo eksekutif dengan kutipan elegan.
  - Kartu bagian terstruktur dengan ikon dan badge jumlah item.
  - Kolom Tanda Tangan Resmi (Kiri: Pengurus / Badan Pengawas, Kanan: Manajer Operasional) dengan penyesuaian `@media print`.
  - Tombol "Salin Teks WhatsApp" dengan format tebal, rapi, dan emoji yang siap kirim ke pengurus.

- **Matriks & Dasbor Risiko yang Mudah Dipahami**:
  - Menggantikan matriks perkalian 5x5 (`5x1 -` s.d. `5x5 -`) yang rumit dengan dasbor risiko operasional yang ramah bagi manajer koperasi desa:
    - 3 Kartu Tingkat Bahaya Jelas: 🔴 Bahaya Kritis (Perlu tindakan segera), 🟡 Perlu Waspada (Siapkan mitigasi), 🟢 Terkendali (Aman dalam SOP staf).
    - Matriks Sebaran 3x3 Manusiawi: Peluang (Sering / Kadang / Jarang) vs Dampak (Ringan / Sedang / Fatal) yang langsung menampilkan judul risiko terbuka di dalam sel.
    - Daftar kartu tindakan mitigasi dan penanggung jawab terpampang langsung di bawah matriks.

- **Bahasa Pemangku Kepentingan yang Membumi & Santun**:
  - Istilah kuadran teoritis diubah menjadi panduan koordinasi desa:
    - Tokoh Penentu & Pengurus Inti (*Wajib Diajak Musyawarah*)
    - Aparat Keamanan & Pembina (*Jaga Koordinasi & Silaturahmi*)
    - Anggota Koperasi & Warga Desa (*Beri Kabar & Serap Aspirasi*)
    - Mitra Usaha & Pemasok (*Pantau Kerja Sama & Efisiensi*)

- **Berkas Migrasi Supabase**:
  - Disiapkan berkas `supabase/migrations/20261001000004_interconnected_operations.sql` untuk dijalankan oleh pemilik di Supabase SQL Editor.

## Komponen Dropdown Modern & Rapi (`Select.tsx`)

- **Masalah Menu Bawaan OS (*Native Option Menu*)**:
  - Menu popover bawaan peramban Windows/Chrome memiliki sudut kotak kaku 90 derajat, border hitam tebal, dan warna highlight biru tua OS yang merusak estetika antarmuka modern.
- **Implementasi Komponen `Select` Kustom (`src/components/ui/Select.tsx`)**:
  - Dibuat komponen dropdown kustom berbasis React yang sepenuhnya dapat diakses (*accessible*, ARIA combobox/listbox, navigasi panah keyboard, Enter/Spasi, Escape, tab, dan penutupan otomatis saat klik di luar).
  - Kartu popover menu melayang dengan sudut membulat elegan (`border-radius: 12px;`), bayangan lembut (*soft floating shadow*), dan animasi masuk transisi halus.
  - Setiap opsi memiliki padding nyaman, indikator status terpilih berupa tanda centang (`<Check size={14} />`), dan efek *hover* bernuansa pastel khas koperasi (`var(--brand-soft)`), menggantikan warna biru kaku Windows.
  - Ikon panah chevron di sisi kanan berotasi 180 derajat secara mulus saat menu terbuka.
  - Mendukung mode gelap (*deep obsidian background* `#181922` dengan kontras teks tajam).
- **Penerapan Komponen `Select` di Seluruh Modul**:
  - `Records.tsx`: Seluruh filter (Status, Proyek, Target Periode Sprint, Prioritas, Urutkan).
  - `Operations.tsx`: Filter Transaksi/Status anggota dan Filter Gerai.
  - `Dashboard.tsx` & `Roadmap.tsx`: Filter proyek.
  - `SprintModal.tsx` & `RecursiveScheduleModal.tsx`: Pilihan durasi, status sprint, dan tipe perulangan jadwal.

## Perapihan tampilan papan scrum, tugas harian, dan kartu kerja

- **Papan Scrum (`ScrumBoardView`)**:
  - Menghapus aturan CSS lama yang menimpa kolom kedua ("Dikerjakan") dengan latar lavender dan duplikasi border-radius.
  - Menambahkan indikator dot warna status pada header kolom: Rencana (Abu netral), Dikerjakan (Aksen utama), Dibatalkan (Merah peringatan), dan Selesai (Hijau tuntas).
  - Menambahkan placeholder kolom kosong (`.scrum-empty-column-placeholder`) saat kolom belum memiliki tugas agar tampilan tidak timpang.
  - Kartu tugas dilengkapi lencana prioritas (`.card-priority-pill`), penanda visual tenggat terlewat (`.card-date-pill.is-late` dengan ikon peringatan), dan perapihan progress bar subtugas.
  - Memetakan status 'dibatalkan' secara eksplisit pada aksi drop kartu antar kolom.
- **Tugas Harian (`DailyTasksView`)**:
  - Menambahkan kelompok lipat tugas terlewat/sebelum pekan ini (`.overdue-group-card`) agar tugas tertunda dari minggu lalu tidak hilang dari pandangan manajer.
  - Melengkapi navigasi keyboard (`role="button"`, `tabIndex={0}`, `onKeyDown`) pada setiap baris tugas harian.
- **Hari Ini (`TodayView`) & Kartu Sprint (`SprintCard`)**:
  - Menghilangkan tombol bersarang (`button` di dalam `div` interaktif) pada daftar tugas terlambat `TodayView` agar mematuhi standar aksesibilitas HTML dan tidak memicu perilaku klik ganda.
  - Melengkapi kartu sprint dan tugas menyusul dengan fokus keyboard dan penanganan tombol Enter/Spasi.

## Kartu dan grafik dashboard terhubung

- Verifikasi akhir paket: 109/109 tes (10 berkas), lint, typecheck, build produksi, dan `git diff --check` lulus.

- Pilihan proyek menyaring ringkasan tugas, grafik penyelesaian tujuh hari, diagram status, daftar tugas, dan progres proyek. Rapat serta catatan koperasi tetap merupakan ringkasan seluruh koperasi.
- Klik legenda status atau tanggal pada grafik untuk menyaring daftar tugas; pilihan dapat dihapus. Distribusi status tidak lagi menghitung tugas terlambat dua kali. Tinggi batang dan segmen diagram proporsional dengan data.
- Kartu memakai jarak dan pembungkus teks yang konsisten. Perbaikan browser khusus: judul kartu ringkasan terjepit pada HP, diagram sempit pada tablet, dan tombol pencatatan bertabrakan dengan deskripsi pada tablet.
- Animasi batang, diagram, garis ringkas, dan progres mengikuti perubahan data; reduced-motion menonaktifkan transisi/animasi dashboard.
- Dashboard diperiksa pada 360/768/1024/1440 px tanpa overflow dokumen. Pencatatan diperiksa visual pada 360/768 px. Data lokal kosong; perilaku filter data berisi diperiksa dengan tes, bukan fixture cloud. Belum mengklaim semua kartu berisi di seluruh domain sudah diuji visual.

## Audit kode terbaru — 1 Oktober 2026

- Gangguan localhost ditelusuri ke akses jaringan proses dev dalam sandbox. Server dijalankan ulang dengan akses jaringan; pemeriksaan baca-saja tabel sesi/keamanan mendapat HTTP 200 dan `hub_operations_ready` bernilai true. Tidak menjalankan migrasi atau mengubah PIN. Login ulang tetap perlu dicoba pemilik.
- Pesan galat layout diperjelas: kegagalan pemeriksaan sesi tidak lagi menyatakan Supabase baru belum siap. Typecheck setelah perubahan lulus.

- Memperbaiki urutan tugas selesai, pembaruan detail tugas setelah disimpan, serta akses judul tugas melalui keyboard pada Hari Ini.
- Aksi tugas harian menampilkan galat ketika penyimpanan gagal. Grafik menggunakan tanggal dan nilai sebenarnya; perhitungan diagram tidak lagi memutasi variabel saat render.
- Verifikasi: 108/108 tes, lint, typecheck, dan build produksi lulus.
- Pemeriksaan browser versi terbaru belum selesai: sesi berakhir dan halaman Proyek diarahkan ke PIN. Pemeriksaan ukuran layar pada catatan sebelumnya tidak membuktikan perubahan terbaru sudah diperiksa.
- Aktivasi migrasi sprint `20261001000003_cooperative_redesign.sql` di cloud belum diverifikasi. Audit ini tidak menjalankan SQL atau deployment.

## Paket terbaru: perapihan tabel, input rapat kondisional, dan penyempurnaan bahasa

Kode dan pengujian diperbarui: **108/108 tes lulus** (10 suites), `tsc --noEmit` lolos 0 kesalahan, dan `next build` produksi berhasil.

- **Input Rapat Kondisional (`/rapat` & modal Editor)**:
  - Form rapat kini menyesuaikan isian berdasarkan format rapat (`mode`):
    - **Tatap muka**: menampilkan input Ruangan / Tempat Rapat (fisik) dan menyembunyikan input tautan online.
    - **Online**: menampilkan input Tautan Rapat Online (Google Meet / Zoom) dan menyembunyikan lokasi fisik.
    - **Hybrid**: menampilkan kedua input (ruangan fisik dan tautan online).
  - Saat penyimpanan, kolom yang tidak sesuai format rapat otomatis dikosongkan.
  - Tampilan kartu rapat di Beranda (`TodayView`) dan Riwayat (`Records`) otomatis menyesuaikan: hanya menampilkan lokasi pada pertemuan fisik/hybrid, dan hanya menampilkan tombol masuk rapat online pada mode online/hybrid.
- **Perapihan & Konsistensi Tabel (`Operations` & `Records`)**:
  - Tabel buku pencatatan (`.ledger-table`): perataan kolom rapi (angka rata kanan tabular, lencana status/arah di tengah, tanggal rapi, teks rata kiri), lencana arah kas (+ Masuk / - Keluar), lencana status anggota (● Aktif / ○ Nonaktif), selisih opname berwarna (✓ Sesuai / ▼ Kurang / ▲ Lebih), nominal kas tegas, tombol aksi rapi (`Ubah` dan `Hitung stok →`), serta *empty state* yang informatif.
  - Tabel tugas (`.task-table`): kolom rapi, label proyek terhubung, dropdown status bertema warna per status, lencana prioritas, tanda peringatan jika tenggat terlewati, dan tombol `✓ Selesai`.
  - Bilah filter (`.filters`): diseragamkan tinggi input (38px), label rapi dengan `<span className="field-caption">`, dan tombol pembersih filter yang konsisten.
- **Penyempurnaan Bahasa & Komunikasi**:
  - Bahasa UI dan keterangan formulir direvisi agar alami, ringkas, dan mudah dipahami oleh pengelola KDMP Puntukrejo tanpa istilah asing yang membingungkan.

## Database dan aktivasi

Supabase baru `mqycnhebhzqaziouipet`. Migrasi pertama tetap terpasang dan tidak diubah. Enam tabel fisik, 16 domain awal; migrasi `20261001000002_operations.sql` memperluasnya menjadi 20 domain.

Migrasi kedua menambah jenis catatan yang diizinkan, indeks nomor anggota/kode barang unik, validasi nominal/jumlah, relasi opname-barang dan fungsi pemeriksaan aktivasi. RLS dan sesi tetap berlaku. Seluruh perubahan berada dalam transaksi; tidak menghapus data lama. Berkas SQL dan langkah pemilik ada di [PENCATATAN.md](PENCATATAN.md).

Sebelum migrasi dipasang, aplikasi memberi keterangan belum aktif dan menonaktifkan tombol simpan modul baru. Kegagalan jaringan atau izin tidak dianggap sebagai data kosong. Modul proyek, tugas, dan rapat tetap tersedia.

## Verifikasi

Hasil akhir pengujian paket dan pemeriksaan browser dicatat di bagian penyerahan di bawah. Migrasi diuji pada PostgreSQL lokal melalui PGlite; pengujian itu tidak memasang migrasi cloud. Data uji hanya berada di tes lokal.

## Fondasi yang dipertahankan

Repo privat `halimxn/kopdes-management-web`, riwayat baru. Supabase lama tidak digunakan. PIN scrypt, sesi HttpOnly, pembatasan percobaan, Zod server, RLS, log perubahan dan relasi transaksi tetap aktif. Backup JSON dan pemulihan mencakup domain pencatatan baru setelah aktivasi.

Gantt mendukung rentang/skala, geser/resize, tinjau/simpan dan peringatan benturan prasyarat. Beranda, kesiapan gerai, pemangku/interaksi, rapat/keputusan, dokumen, risiko/isu, tim/pelatihan, jurnal, snapshot laporan dan cetak tetap tersedia. Tidak ada program wajib 90 hari; fixture lama hanya untuk tes.

## Pekerjaan pemilik dan batas berikutnya

- Migrasi kedua sudah dijalankan pemilik dan aktivasi terverifikasi melalui aplikasi lokal. Berikutnya uji simpan data nyata.
- Verifikasi Vercel setelah deployment terbaru. Perbaikan origin commit `15116e4` sudah dipush sebelumnya; login produksi belum dikonfirmasi. `HUB_APP_ORIGIN` produksi: `https://kopdes-management-web.vercel.app`.
- Belum ada multiuser/realtime, editor blok bebas, offline, unggah berkas, impor CSV, baseline/jalur kritis, atau penjadwalan otomatis dependensi.
- Kas sederhana belum mencakup akuntansi lengkap atau rekonsiliasi. Stok belum memiliki pergerakan otomatis/POS. Jumlah stok berupa unit bulat.
- Perangkat fisik Android/iOS/Safari dan audit aksesibilitas menyeluruh belum diuji. Pemulihan cadangan data nyata masih perlu lingkungan uji.

## Penyerahan paket 1 Oktober 2026

- **92/92 tes lulus**: keamanan/PIN/origin, relasi dan transaksi PostgreSQL, kompatibilitas proyek lama, kalender/navigasi bulan, tanggal kabisat, cashflow dan selisih stok, penolakan nominal tidak sah, formula CSV, ICS/WIB, gerbang migrasi, pengisian stok pembanding, simpan form dan gagal jaringan.
- Browser IAB: Pencatatan diperiksa 360/768/1024/1440 px tanpa overflow dokumen; form rapat/pemilih tanggal/dropdown diperiksa pada 360 dan 1440 px. Pencarian halaman diuji membuka Rapat. Tema terang/gelap diperiksa pada desktop.
- Pemeriksaan menggunakan data cloud yang masih kosong dan status migrasi belum aktif. Tidak memasukkan fixture ke database cloud. Uji penyimpanan domain baru berlangsung lokal dengan mock API dan PostgreSQL, belum UAT cloud.

Lint, TypeScript dan build produksi Next.js berhasil. Audit sumber: 48/48 berkas terjangkau. Aktivasi migrasi cloud sudah terverifikasi melalui aplikasi lokal; login deployment terbaru belum diverifikasi.

## Konfirmasi aktivasi cloud

Pemilik menyatakan SQL berhasil dijalankan. Pemeriksaan ulang `/pencatatan` pada aplikasi lokal menunjukkan peringatan belum aktif sudah hilang; Anggota, Buku kas, Barang, dan Stok opname masing-masing berhasil dimuat dengan 0 catatan. Tidak memasukkan data uji ke cloud. Penyimpanan pertama data nyata dan pengecekan di Vercel masih perlu dilakukan.

## Penyederhanaan interaksi — 1 Oktober 2026

Referensi resmi: [Linear display options](https://linear.app/docs/display-options) dan [Things](https://culturedcode.com/things/support/articles/1059358/). Mengadopsi daftar yang padat, pemisahan informasi, dan aksi langsung tanpa menyalin merek/aset.

- Halaman pencatatan memakai daftar buku, tombol tambah langsung, pencarian dan catatan terakhir yang dapat dibuka.
- Tambah tugas langsung dengan Enter, tenggat hari ini terlihat, dan lingkup proyek dipertahankan.
- Editor berupa panel samping desktop/layar penuh ponsel. Sidebar netral, aksen indigo, border tipis dan bayangan minimal menggantikan tampilan kartu promosi.
- Suite 92 tes sebelumnya lulus; dua tes interaksi baru juga lulus (total 94). Lint, TypeScript, dan build sukses pada perubahan aplikasi. Tidak ada migrasi tambahan.

## Redesain Menyeluruh — Estetika Behance & Ruang Kerja Pribadi Koperasi (1 Oktober 2026)

Implementasi redesain menyeluruh visual dan alur kerja sesuai referensi Behance (.gif):
- **Palet Visual & Desain Sistem**:
  - Warna Utama: Primary `#ed7d3d` (Vibrant Terracotta / Orange), Secondary `#3f527a` (Deep Slate Navy), Line & Border `#eaecf2`, Soft Peach `#fff3ec`.
  - Nuansa Latar: Kanvas `#f4f6fa` dengan ambient radial glow halus, kartu dengan sudut membulat `12px–16px`, dan bayangan lembut bertingkat. Mode gelap menggunakan slate-navy `#161c27` dan `#20293a` dengan aksen oranye bercahaya.
- **Dual-Navigation Layout**:
  - **App-Rail (Rel Sisi Kiri 72px)**: Menampilkan brand icon kotak oranye `KD`, navigasi ikonik (Tugas, Beranda, Proyek, Kalender, Laporan, Rapat, Pencatatan, Pengaturan), dan avatar profil Manajer Koperasi di bagian bawah.
  - **Sidebar Ruang Kerja Kontekstual**: Kartu selektor organisasi KDMP Puntukrejo ("Ruang Kerja Pribadi"), pencarian proyek dengan filter cepat, daftar proyek dengan status dot berwarna dan badge hitung tugas numerik (`03`, `01`), daftar pemangku kepentingan (Pengurus, Bendahara, Dinas Koperasi), pintasan tugas hari ini, dan navigasi modul pencatatan.
- **Tampilan Tugas Harian (Daily Tasks)**:
  - Tampilan baru `harian` yang mengelompokkan tugas berdasarkan hari (Senin s.d. Minggu, dan Mendatang/Upcoming).
  - Setiap tugas memiliki checkmark lingkaran dengan animasi penyelesaian, kode tugas unik (misal `#KD-44008`), pill proyek, serta hierarki subtugas terindentasi dengan garis pohon (`├──`, `└──`) yang dapat dicentang interaktif langsung.
- **Task Detail Drawer**:
  - Drawer slideover dari kanan yang menampilkan tombol pill "Tandai Selesai" (#3f527a), penyuntingan judul & deskripsi langsung di tempat, grid metadata 3-kolom ("DIBUAT OLEH", "PENANGGUNG JAWAB", "PEMANGKU / TIM"), pohon subtugas dengan progress bar, feed timeline ringkasan aktivitas (Summary) dengan riwayat audit/catatan, serta composer catatan kaya dengan formatting toolbar (bold, italic, underline, list) dan tombol Kirim oranye (#ed7d3d).
- **Date Range Picker Matrix**:
  - Komponen pemilih rentang tanggal dengan daftar bulan vertikal di sisi kiri (indikator garis oranye aktif) dan matriks kalender hari (Mo–Su) di sisi kanan yang menyorot tanggal awal (#3f527a), tanggal akhir (#ed7d3d), dan rentang terarsir (#eaecf2), lengkap dengan penghitung durasi hari dan tombol pembersih rentang.
- **Target Periode Koperasi (Sprint)**:
  - Modul Target Periode fleksibel yang memungkinkan manajer menetapkan periode kerja (1 minggu, 2 minggu, 1 bulan, kustom), tujuan target, dan kartu pemantauan progres persentase tugas.
- **Drag & Drop CSV**:
  - Komponen Dropzone CSV dengan ikon awan dan garis putus-putus untuk bulk import data tugas dan pencatatan koperasi secara cepat.
- **Tampilan Papan Scrum (ScrumBoardView)**:
  - Tampilan papan kerja kanban sesuai Behance Reference Image 4 dengan kolom tahapan kerja (*Backlog*, *Ice Box*, *To Do*, *Impediments*, *Selesai*).
  - Kartu dashed dropzone `+ Add Task` di bagian atas setiap kolom.
  - Kartu tugas sprint kaya visual dengan pill rentang tanggal, judul & kode tugas unik, snippet deskripsi, avatar anggota/manajer, progress bar oranye terisi dengan persentase penyelesaian dan indikator tenggat.
  - Interaksi drag-and-drop status antar kolom serta klik kartu langsung membuka `TaskDetailDrawer`.
- **Ringkasan Operasional Koperasi (Cooperative Pulse Dashboard)**:
  - Seksi ringkasan eksekutif pada Beranda khusus 1 user (Manajer KDMP Puntukrejo): Saldo Kas Tercatat (dengan perincian kas masuk & kas keluar), Jumlah Anggota Koperasi, Katalog Barang Gerai (dengan deteksi peringatan stok menipis otomatis), dan Target Periode (Sprint) aktif.
  - Pintasan navigasi cepat ke Buku Kas, Anggota, Stok Gerai, dan Target Periode.
- **Pembersihan Total Desain Lama**:
  - Seluruh kode warna lawas (seperti magenta `#a64768`, `#9b4566`, hijau tua `#27695f`, dan sidebar gelap lama `#202f38`) di `globals.css`, `workspace.css`, dan `studio.css` telah dibersihkan secara menyeluruh tanpa sisa.
  - Standarisasi penuh pada sistem token palet Behance: Primary `#ed7d3d`, Secondary `#3f527a`, Secondary Light `#eaecf2`, Latar `#f4f6fa`, Surface `#ffffff`.
- **Pembaruan Database**:
  - Berkas migrasi `supabase/migrations/20261001000003_cooperative_redesign.sql` mendukung entitas `sprints`, indeks pencarian kode tugas `(data->>'code')`, dan integritas relasi `sprint_id`.
- **Verifikasi**:
  - **100/100 tes lulus** (9 suite vitest, termasuk pengujian `ScrumBoardView`, `DailyTasksView`, `TaskDetailDrawer`, `DateRangePicker`, `SprintCard`).
  - `npm run typecheck` lolos tanpa ada galat TypeScript (`tsc --noEmit` sukses).
  - `npm run build` sukses mengompilasi bundel produksi Next.js (Turbopack).

## Redesain Menyeluruh — Estetika Neo-Soft Lime & Dark Pill (Task Hub) (1 Oktober 2026)

Implementasi perombakan total desain sesuai referensi visual Task Hub:
- **Palet Visual & Desain Sistem**:
  - Warna Utama: Soft Pastel Lime / Chartreuse (`#d5f935`), Dark Charcoal / Pitch Black (`#121316`), Soft Gray Canvas (`#eef1f6`), Surface Pure White (`#ffffff`), Pill Background (`#f1f3f7`).
  - Seluruh warna oranye (`#ed7d3d`), slate (`#3f527a`), dan magenta lama dibersihkan secara menyeluruh dari seluruh kode sumber.
  - Kartu membulat lebar (`border-radius: 24px` hingga `32px`), tombol pill melengkung penuh (`border-radius: 9999px`), serta indikator garis striped bermotif diagonal.
- **Top Navigation Bar & Left Sidebar**:
  - Top Bar: Brand pill hitam `Task Hub` dengan ikon lingkaran lime, navigasi pill tengah (Dashboard, Tasks, Pencatatan, Proyek, Pengaturan) dengan status aktif latar lime cerah dan teks gelap kontras tinggi, tombol aksi lingkaran (Cari ⌘K, Tema, Logout, dan Avatar Manajer).
  - Left Sidebar: Sapaan personal `"Welcome Back, [Manager Name]!"`, seksi navigasi proyek dengan hitung tugas, seksi laporan dan bantuan, serta kartu promo koperasi KDMP Puntukrejo berlatar gradien lime di bagian bawah dengan pill badge "14 day free-trial ↗".
- **Empat Kartu Utama Dashboard**:
  - **Schedule**: Sub-kolom *Upcoming Tasks* dengan tombol panah melingkar, status pill *Process / In Review*, dan timeline horizontal lengkap dengan *day chips*, indikator garis waktu vertikal, dan progress pill.
  - **Task Completed**: Diagram batang vertikal bulanan dengan tag tren (`+2%`, `+6%`, `-4%`), bilah bermotif garis (*striped*), tombol penuh lime `Download report`, dan `ProgressRing` untuk aksesibilitas.
  - **Calendar**: Matriks nomor hari lingkaran (*outline*, lime `#d5f935`, dan hitam `#121316`) dengan filter pill (*Yours*, *Tugas*, *Rapat*).
  - **Projects**: Kartu horizontal proyek dengan deskripsi, *striped progress bar*, tanggal, dan avatar tim.
  - Strip ringkasan operasional koperasi: Saldo Kas Desa, Anggota Aktif, dan Stok Barang Gerai.
- **Skeleton Loading & Optimasi Kinerja**:
  - Komponen `SkeletonLoading` beranimasi kilau halus (*shimmer animation*) dengan tata letak 4 kartu meniru halaman referensi, mencegah *content layout shift* saat navigasi.
  - *Client-side in-memory API caching* dengan TTL 60 detik pada operasi baca (`GET`) serta *automatic cache invalidation* saat mutasi (`POST`, `PUT`, `DELETE`) untuk memangkas *request* redundan dan menghemat token.
- **Task Detail Drawer & Modul Pencatatan**:
  - Slide-in panel detail tugas dengan backdrop blur, checklist subtugas dengan striped progress bar, editor judul & deskripsi di tempat, dan feed aktivitas.
  - Halaman Pencatatan (Buku Kas, Anggota, Barang, Opname) dengan segmented pill navigation bar, kartu buku rapi, dan metric cards.
- **Hasil Verifikasi**:
  - **100/100 tes lulus** di 9 test suite Vitest.
  - `tsc --noEmit` lolos dengan 0 kesalahan tipe.
  - `next build` lolos produksi dengan Turbopack.

## Redesain pribadi — referensi HP terbaru, 1 Oktober 2026

- Shell seluruh rute diganti: profil dari data, navigasi lengkap desktop/tablet, bilah mengambang HP dan menu seluruh halaman. Pencarian mencakup semua modul.
- Beranda berisi tugas berfilter, rapat berikutnya, proyek, grafik penyelesaian tujuh hari, dan akses catatan koperasi. Angka grafik/progres contoh dan nama pengguna bawaan dihapus.
- Kalender HP memakai tanggal lingkaran, agenda, bulan/minggu/hari; tombol tambah memakai tanggal pilihan. Filter tugas diringkas pada HP.
- Papan memakai empat status sah; progres dari subtugas dan rentang tanggal aktual. Galat pemindahan ditampilkan. Detail pribadi tidak menampilkan pengikut tiruan atau tombol lampiran/pemformatan yang tidak berfungsi; catatan tetap dapat disimpan.
- Panel detail menggunakan dialog dengan fokus keyboard; hasil penyimpanan dibaca dari workspace terbaru.
- Tidak ada migrasi/cloud write dalam paket ini. Data browser masih kosong; tidak mengisi fixture ke cloud.
- Pemeriksaan browser: beranda pada 360/768/1024/1440 px tanpa overflow dokumen; kalender HP diperiksa visual. Pemeriksaan akhir dan hasil tes dicatat setelah selesai.

## Penyempurnaan Tampilan & Pembersihan Desain — 1 Oktober 2026

- **Desain Bersih & Berdimensi**: Mengganti tampilan datar dengan kedalaman visual terukur, soft elevation shadows (`var(--shadow-card)`), border kontras halus, dan palet hijau alami/sage berpadu kanvas bersih.
- **Palet Warna Pastel & Pemilih Gaya**: Menambahkan 5 palet warna pastel terkurasi (Lime Pastel seperti warna awal, Peach Pastel terakota hangat, Lavender Pastel sejuk, Sage Pastel herbal, dan Sky Pastel biru lembut) yang dapat dipilih langsung di Pengaturan (`/pengaturan`) dan tersimpan secara persisten.
- **Pembersihan & Interaktivitas Kalender**: Menghilangkan 42 pengulangan tombol teks "+ Tugas" yang memusingkan dari setiap sel kalender. Tombol icon `+` dibuat simetris presisi (28px x 28px lingkaran sejajar nomor tanggal dengan rata tengah sempurna). Tombol agenda kalender diselaraskan menjadi button berikon `Plus` yang rapi dan tegas. Sel kalender yang dipilih mendapatkan penanda visual nyata (`.calendar-selected`) dengan latar pastel lembut `var(--brand-soft)`, border aksen `2px solid var(--brand)`, serta soft glow berdimensi saat diklik sehingga tidak lagi terkesan datar.
- **UX & Penataan Modal Pop-Up**: Seluruh modal dan drawer (`SprintModal`, `RecursiveScheduleModal`, `DateRangePicker`, `TaskDetailDrawer`, `Editor`, dialog pencarian `AppShell`, dan modal impor CSV) kini otomatis menutup saat area transparan/backdrop di luar kartu diklik atau ketika menekan tombol `Escape`. Dilengkapi backdrop blur dan animasi skala yang halus.
- **Perbaikan Penataan Jarak & Komposisi Warna**: Menata ulang jarak (padding/margin) dan styling lengkap pada papan scrum, kartu tugas, kartu sprint, dan pemilih rentang tanggal. Memperbaiki kontras teks yang sebelumnya tidak terbaca (mengganti pewarnaan teks lime pada judul proyek dengan dot warna berdaya baca tinggi dan membersihkan hardcoded dark text).
- **Efisiensi Pemilih Kalender (DateField)**: Menyembunyikan indikator browser ganda `::-webkit-calendar-picker-indicator` dan menyatukan klik input/tombol ke satu kalender in-app terpadu tanpa redundansi.
- **Skeleton Loading Rapi**: Mengganti placeholder statis lama dengan wireframe skeleton halus beranimasi shimmer yang selaras dengan layout beranda/workspace aktual tanpa content layout shift.
- **Menu Samping (Sidebar) Modern**: Dilengkapi emblem logo KDMP Puntukrejo, pintasan pencarian ⌘K, ikon representatif untuk setiap domain, indikator aktif rapi, daftar proyek dengan dot warna, dan kartu profil manajer.
- **Pembersihan Kalimat AI Slop**: Menghilangkan istilah asing kaku, jargon spekulatif, dan slogan motivasi pada seluruh domain, digantikan dengan bahasa Indonesia lugas, ringkas, dan profesional.
- **Audit & Perapian Menyeluruh Seluruh Desain**:
  - **Beranda & Hari Ini**: Angka persentase pada ProgressRing diposisikan tepat di titik pusat lingkaran tanpa menabrak batas bawah; persentase proyek dibungkus pill badge pastel terpisah dengan jarak napas lega sebelum panah navigasi; seluruh kartu dan teks diberi ruang jeda yang seimbang.
  - **Tugas Harian (`DailyTasksView.tsx`)**: Mengatur ulang struktur visual secara komprehensif dengan kartu harian dapat dilipat (collapsible accordion), lencana hari ini, penomoran kode tugas `#KD-XXXX`, visualisasi pohon subtugas dengan konektor rapi (`├──` dan `└──`), checkbox bulat responsif, serta aksi hover edit/hapus.
  - **Keterbacaan Kalender "Hari Ini"**: Nomor tanggal hari ini (`.calendar-today`) kini memakai latar pastel lembut `var(--brand-soft)`, border aksen `var(--brand)`, dan teks kontras tinggi `var(--ink-heading)` (bukan teks lime di atas kartu terang) sehingga nomor tanggal selalu terbaca tajam dan jelas.
  - **UX Pop-up & Dropdown Menu**: Seluruh menu dropdown (`details.view-extra-actions`, `details.record-options`) dan modal dialog kini menutup otomatis saat area transparan/luar diklik atau saat menekan tombol `Escape`.
  - **Pemilih Rentang Tanggal (`DateRangePicker`) & Kalender Popover (`DateField`)**: Memperbaiki pemetaan kelas CSS pada grid 7 kolom, indikator bulan aktif, sel rentang tanggal (`range-start`, `range-end`, `in-range`), serta kontras status tanggal hari ini.
  - **Penyegaran Total Halaman Hari Ini (`TodayView.tsx`)**: Menggantikan 4 tumpukan database Records lama pada `/hari-ini` dengan tampilan agenda fokus harian terdedikasi: Hero tanggal hari ini, 4 pill metrik ringkas, form input tugas instan untuk hari ini, daftar tugas hari ini dengan checkbox bulat & tag proyek, seksi tugas terlambat dengan tombol 1-klik jadwalkan ke hari ini, kartu rapat hari ini (tautan Meet/Zoom & unduh ICS), serta daftar tugas menyusul 7 hari ke depan.
  - **Perapian Pop-Up Tambah Tugas (`Editor.tsx`)**: Mengubah dialog editor menjadi modal terapung di tengah layar dengan animasi halus, header berikon kategori, tombol tutup `X` bulat elegan, pemisahan label teks (`.field-caption`) di atas input dengan jarak teratur, field helper berdaya baca baik, serta tombol aksi "Batal" dan "Simpan" yang rapi.
- **Verifikasi**: 103/103 tes Vitest lulus, `npm run typecheck` 0 error, `next build` produksi sukses dengan Turbopack.
