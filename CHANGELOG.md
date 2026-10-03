# Changelog

### Rombak Desain Tugas Harian Tanpa Dropdown & Koreksi Checkbox Bulat Sempurna (3 Oktober 2026)

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

### Paket Perombakan UI & Interaksi: Pintasan Terhubung, Navigasi Multiplatform, Perampingan Tugas, dan Desain Dashboard Pastel (3 Oktober 2026)

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

### Paket Perapihan Menyeluruh, Harmonisasi Judul & Optimalisasi Antarmuka Mobile (2 Oktober 2026)

- **Eliminasi Judul Halaman Redundan**:
  - Mengoreksi dobel judul pada seluruh halaman (misal "Kegiatan" di atas "Kegiatan", atau "Tugas" di atas "Tugas") dengan menghapus wrapper `page-heading` redundan di `WorkspacePage.tsx` dan memusatkan judul pada `section-head` resmi tiap fitur.
  - Memberikan `section-head` kanonik pada `Settings.tsx` agar selaras dengan standar halaman lainnya.
- **Perapihan Banner Form Tugas (`.task-form-intro`)**:
  - Membatasi lebar banner intro form tugas menjadi proporsional (`max-width: 580px;`) di desktop dan mobile.
  - Merapikan teks tombol menjadi *"Detail lainnya: opsi lanjutan, kendala & subtugas"*.
- **Standarisasi Tipografi Dropdown Global**:
  - Menyelaraskan seluruh dropdown native `<select>`, opsi dropdown, dan custom select ke `var(--font-sans)` ukuran 13.5px dengan letter-spacing rapi.
- **Pemberian Gaya Lengkap Input Kalender & Tanggal**:
  - Memberikan gaya visual konsisten pada semua `input[type="date"]`, `input[type="month"]`, dan `input[type="time"]` di modal sprint, laporan, linimasa tugas, dan form editor.
- **Perbaikan Dropdown Toolbar "Perlu Perhatian" di Mobile**:
  - Menata ulang filter toolbar di halaman tindak lanjut agar mengalir vertikal penuh di ponsel, mencegah dropdown terpotong atau terhimpit.
- **Penyelarasan Tombol Aksi Dock Ponsel**:
  - Mengubah tombol tengah aksi dock ponsel dari bulatan melayang yang mencolok menjadi tombol terpadu yang serasi dengan bilah navigasi bawah.
- **Perbaikan "Tugas Baru" & Riwayat Selesai di Mobile**:
  - Menghapus hack margin negatif `-52px` pada header tabel tugas di mobile dan menata tombol `+ Tugas baru` berdampingan rapi dengan judul.
  - Mengoptimalkan padding linimasa riwayat selesai dan perataan tombol buka kembali di layar sentuh kecil.
- **Pemberian Jarak Bawah pada Status "Semua Terkendali"**:
  - Membungkus status bersih dengan kontainer ber-margin bawah 20px agar tidak mepet dengan kartu di bawahnya.
- **Koreksi Tautan Logo Topbar**:
  - Memperbaiki tautan avatar / logo di bilah navigasi atas agar mengarah ke `/beranda`.

### Rombak Navigasi Mobile-First (Mobile App Sheet Hub), Skill Clean Code & Interaktivitas Native Mobile (2 Oktober 2026)

- **Pembentukan Skill Clean Code (`.agents/skills/clean-code/SKILL.md`)**:
  - Menyimpan panduan rekayasa kode bersih, modular, type-safe, dan efisien untuk agen AI: arsitektur domain, Next.js App Router, standar mobile-first (sentuh min 44px, safe-area, pencegahan overflow), rumus tunggal progres di `lib/progress.ts`, variabel pastel, SWR memory cache, dan disiplin verifikasi 3 lapis.
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

### Peningkatan Menyeluruh Mobile UX, Kinerja Pemuatan SWR, Form Terintegrasi & Standardisasi Visual (2 Oktober 2026)

- **Mobile Rutinitas di Bagian Teratas**: Mengatur ulang urutan grid beranda mobile (`order: -1` dan `display: contents`) sehingga kartu rutinitas harian manajer langsung muncul di bagian paling atas layar ponsel tanpa perlu menggulir ke bawah.
- **Pembersihan Redundansi Header & Sidebar**:
  - Menghapus label teks manajer redundan di sebelah avatar topbar, menyisakan chip profil inisial yang bersih.
  - Mengubah subjudul sidebar dari "KDMP Puntukrejo" yang berulang menjadi "Ruang Kerja Manajer".
  - Menjadikan emblem logo koperasi di ponsel sebagai tautan langsung ke halaman `/pengaturan`.
- **Tombol Tambah Ramping & Minimalis**: Menghapus teks "Tambah" pada tombol cepat topbar, menjadikannya tombol ikon 36×36 px seragam dan modern dengan efek hover yang halus.
- **Redesain Total "Penyelesaian 7 Hari" (`DashboardCharts.tsx`)**:
  - Menghadirkan metrik eksekutif terpadu: angka total tebal, kecepatan rata-rata harian (`⌀ X/hari`), badge hari puncak (`Puncak: Hari (X)`), dan chip reset filter interaktif.
  - Batang grafik dilengkapi gradien hijau segar, pill tanggal, titik penanda hari ini (*today indicator*), dan penanganan data kosong yang elegan.
- **Pembuatan Data Terhubung Langsung dari Form Editor (`Editor.tsx`)**:
  - Memungkinkan manajer menambahkan Rapat Online (dengan URL Google Meet/Zoom), Dokumen, dan Tugas Tindak Lanjut langsung dari form tanpa harus berpindah ke halaman `/rapat` atau `/dokumen`.
  - Sinkronisasi instan item baru ke daftar pilihan ref tanpa perlu memuat ulang form.
- **Perbaikan Bug Latar Hitam Modal Periode Kerja (`SprintModal.tsx`)**:
  - Memperbaiki masalah backdrop `SprintModal` yang sebelumnya hanya menutupi kotak konten dengan mem-portal modal langsung ke `document.body` via `createPortal`, menjamin overlay 100vw × 100vh di semua perangkat.
- **Redesain Tindak Lanjut pada Kegiatan (`Records.tsx`)**:
  - Pada tabel kegiatan, relasi tindak lanjut kini menampilkan pill status interaktif dengan tautan langsung ke detail tugas (`/tugas?task=...`) atau tombol 1-klik `+ Tindak Lanjut`.
- **Skeleton Loading Adaptif per Halaman (`SkeletonLoading.tsx` & `WorkspacePage.tsx`)**:
  - Menggantikan skeleton generik statis dengan skeleton dinamis yang mencerminkan tata letak aktual halaman (tabel baris untuk Tugas & Kegiatan, grid kartu untuk Proyek, dan kartu metrik dasbor untuk Beranda).
- **Peningkatan Kecepatan & Performa Pemuatan (SWR Cache di `useWorkspace.ts`)**:
  - Menambahkan *in-memory cache* dengan pola *stale-while-revalidate* sehingga navigasi antar-halaman (`/beranda`, `/tugas`, `/proyek`, `/jurnal`) langsung menampilkan data dalam 0 milidetik tanpa kedipan layar (*flicker*) atau jeda skeleton.
- **Standardisasi Desain Visual & Empty State (`EmptyState.tsx` & `globals.css`)**:
  - Mendefinisikan token warna pastel universal (`--pastel-emerald-*`, `--pastel-blue-*`, `--pastel-amber-*`, `--pastel-purple-*`, `--pastel-rose-*`) pada mode terang dan gelap.
  - Menghadirkan komponen `EmptyState` terpadu dengan ikon bersih, deskripsi ringkas, dan tombol aksi seragam di seluruh entitas.
  - Mengaplikasikan kartu beraksen garis pastel pada kartu proyek dan pengaturan.
- **Papan Tugas Ramah Sentuh & Ponsel (`ScrumBoardView.tsx`)**:
  - Menambahkan tombol aksi geser status instan pada setiap kartu (`Mulai Kerja →`, `← Rencana`, `✓ Selesai`, `↺ Buka Lagi`) yang memudahkan navigasi di layar ponsel/tablet tanpa kendala gestur seret-lepas bawaan.
- **Verifikasi Kualitas**: 143/143 tes lulus (19 berkas), 0 error TypeScript, Next.js Turbopack build sukses 100%.


- **Penyederhanaan Kartu Proyek**: Memangkas tinggi kartu proyek dari ~380 px menjadi format ringkas (~160 px) dengan klaster tag kode, badge status, teks terpotong 1 baris, garis progres tunggal, dan pill statistik padat.
- **Perbaikan Dropdown "Lainnya" Tidak Tertutup**: Memindahkan tombol ke luar kontainer gulir `overflow-x: auto` ke dalam `.database-views-bar` dengan `z-index: 100` dan menambahkan penutup otomatis saat klik di luar popover (*click-outside listener*).
- **Pengaturan Rutinitas Manajer ("Atur Rutinitas")**: Menyediakan tombol "Atur" dan modal dialog kustomisasi untuk menambah rutinitas dengan waktu jam, menghapus rutinitas, dan mengembalikan ke rutinitas standar KDMP dengan persistensi `localStorage`.
- **Pemindahan Rutinitas ke Kolom Kanan Dasbor**: Memindahkan checklist rutinitas ke kolom kanan (`.home-overview`), membuat kartu tugas pilihan di kolom kiri langsung terlihat di bagian atas tanpa perlu menggulir.
- **Perampingan Kontrol Dasbor**: Mengurangi tinggi vertikal kontrol filter proyek untuk visibilitas instan kartu di layar.
- **Verifikasi**: 143 tes lulus (19 berkas), 0 error typecheck, Next.js Turbopack build sukses penuh.

### Redesain Menu Proyek, Jalur Capaian Milestone, Persistensi Tampilan Bawaan & Perbaikan UI Riwayat (2 Oktober 2026)

- **Eliminasi Redundant Empty State pada Riwayat Selesai**:
  - Menghilangkan duplikasi kartu "Belum ada tugas selesai" bertumpuk dengan menyaring render empty state luar saat berada di arsip selesai.
- **Perbaikan Ukuran Tombol "Lainnya" yang Melompat**:
  - Memperbaiki CSS `.view-extra-actions` dan membungkus opsi menu ke dalam popover melayang (`.view-extra-menu`) sehingga tombol "Lainnya" tetap 32 px dan tidak mengubah ukuran tombol/bar menu saat diklik.
- **Persistensi Tampilan Bawaan (Default View)**:
  - Menyimpan tampilan terpilih (Daftar, Papan, Kalender, Linimasa) ke `localStorage` secara otomatis per entitas sehingga pengguna selalu disajikan tampilan favoritnya saat membuka Tugas atau Kegiatan.
- **Redesain Menyeluruh Menu Proyek (`Projects.tsx`)**:
  - Menambahkan ringkasan KPI inisiatif proyek, bilah pencarian & filter terpadu, menghilangkan angka `0%` ganda, dan menghadirkan kartu proyek modern dengan metrik tugas serta status kendala.
- **Redesain UI/UX Milestone (`MilestoneTracker.tsx` & `Roadmap.tsx`)**:
  - Menggantikan tabel mentah di bawah Linimasa Gantt dengan komponen Jalur Capaian (Checkpoint Tracker) yang memiliki countdown target, status tercapai, jumlah tugas terkait, dan tombol cepat "Tandai Tercapai ✓".
- **Verifikasi Kualitas**: 143 tes unit lulus 100%, 0 error typecheck, build produksi Next.js Turbopack sukses penuh.


- **Pemisahan Tegas Tugas & Kegiatan**:
  - Memisahkan secara tuntas entitas Tugas (`work-items`) dan Kegiatan (`journal`) pada seluruh tampilan, logika kueri, dan navigasi.
- **Multi-Tampilan untuk Kegiatan (`/jurnal`)**:
  - Menghadirkan 4 tampilan visual interaktif pada entitas Kegiatan:
    - **Daftar**: Tabel kronologis dokumentasi kegiatan lapangan dan rapat.
    - **Papan (Kanban Kegiatan)**: 3 kolom status berbasis tanggal (**Terjadwal / Rencana**, **Hari Ini**, **Terdokumentasi**) dengan fitur seret-lepas antar-kolom.
    - **Kalender**: Tampilan grid bulanan yang mendukung pemetaan tanggal kegiatan (`date`). Memperbaiki penanganan tanggal agar tidak menyebabkan `RangeError: Invalid time value` ketika entitas kegiatan (yang tidak memiliki `due_date`) dimuat di tampilan kalender.
    - **Linimasa (Timeline Kegiatan)**: Alur waktu vertikal dengan konektor garis dan tautan pertemuan.
- **Validasi Tanggal Defensif (`src/lib/date.ts` & `TaskCalendar.tsx`)**:
  - Menambahkan proteksi `isNaN(parsed.getTime())` pada `formatDate` dan filter tanggal valid pada `TaskCalendar` agar nilai tanggal `undefined` tidak memicu crash `RangeError`.
- **Kerapian Tombol Batal & Simpan (`TaskDetailDrawer.tsx`)**:
  - Memperbaiki tata letak tombol aksi inline pengeditan judul dan deskripsi tugas: tombol Batal (sekunder, abu-abu outline) di sisi kiri, tombol Simpan (primer, hijau kontras) di sisi kanan.
  - Menambahkan dukungan pintasan keyboard `Enter` untuk menyimpan dan `Escape` untuk membatalkan pengeditan.
- **Linimasa Riwayat Selesai Bergaya GitHub (`CompletedTimelineView`)**:
  - Menghapus tab horizontal yang tidak relevan di arsip selesai (`/tugas?status=selesai`).
  - Mengimplementasikan tampilan linimasa bergaya GitHub dengan garis alur vertikal (*spine*), simpul status centang hijau, pengelompokan tanggal, kartu tugas dengan pemisah visual yang rapi, dan tombol instan "Buka Kembali ↩".
- **Filter Tugas Aktif Bersih & Zona Drop Papan Scrum**:
  - Menyaring tugas berstatus `selesai` dan `dibatalkan` dari daftar tugas aktif & terbaru sehingga hanya menampilkan tugas `rencana` dan `proses`.
  - Memfokuskan kolom aktif Papan Scrum pada kolom kerja berjalan (**Rencana** dan **Dikerjakan**).
  - Menambahkan zona drop interaktif di bagian bawah papan untuk menyeret tugas ke status **Selesai** (otomatis pindah ke arsip riwayat) dan **Dibatalkan**, dengan tombol toggle opsional untuk menampilkan kolom selesai di kisi papan.
- **Eliminasi Redudansi Terminologi**:
  - Menyatukan penamaan "Linimasa Gantt" dan "Gantt" menjadi satu istilah konsisten: **"Linimasa"**.
- **Redesain `@manager-location-wrap` & Tata Letak Fluid Penuh**:
  - Menghapus posisi mengambang di tengah bilah navigasi (`margin: auto`). Lokasi diposisikan di sebelah kiri sebagai breadcrumb terpadu: `[Profil KDMP] / [Ikon Lokasi + Judul Halaman ⭐]`.
  - Mengeliminasi ruang kosong (void) di sisi kanan `.workspace-page` pada layar monitor lebar dengan mengubah pembatas `max-width: 1400px` menjadi layout fluid penuh `max-width: 100% !important; margin: 0;`, menjaga stabilitas visual tanpa pergeseran meloncat saat sidebar ditutup.
- **Verifikasi Kualitas**: 143 tes lulus 100%, 0 kesalahan typecheck, build Next.js Turbopack sukses penuh.


- **Penyaringan Ketat Arsip Riwayat Selesai**:
  - Mengisolasi filter `isCompletedArchive` sehingga hanya tugas dengan status `selesai` (`row.data.status === 'selesai'`) yang diizinkan masuk ke tabel arsip.
  - Memperbaiki bug di mana navigasi dari tampilan papan (`view === 'papan'`) membuat kondisi evaluasi filter meloloskan tugas berstatus rencana atau sedang dikerjakan ke dalam arsip selesai.
  - Menambahkan pengaman status (`if (r.data.status !== 'selesai') return false;`) pada setiap grup kronologis (Pekan Ini, Pekan Lalu, Arsip Lama).
- **Tombol Cepat "Buka Kembali ↩"**:
  - Menambahkan tombol aksi `.table-btn-reopen` di tabel arsip selesai untuk membuka kembali tugas ke status `rencana` secara instan dengan satu klik, membersihkan tanggal selesai, dan otomatis memindahkannya kembali ke daftar tugas aktif.
- **Sinkronisasi Parameter URL & Scope**:
  - Menyelaraskan status parameter URL `?status=selesai` dengan kontrol cakupan `taskScope` (`history` vs `current`) di `WorkspacePage.tsx`.
  - Memperbarui reaktivitas state internal di `TaskDetailDrawer.tsx` agar sinkron secara instan saat status diubah di dalam laci.
- **Verifikasi Kualitas**: 143 tes lulus 100%, 0 kesalahan typecheck, build Next.js Turbopack sukses penuh.

### Penyempurnaan Dropdown Status, Chip Tenggat, Penanggung Jawab, Sistem ID TGS/KGT & Sinkronisasi Papan (2 Oktober 2026)

- **Dropdown Status (`.task-status-select`)**:
  - Memperluas jarak kanan panah dropdown (`padding: 0 32px 0 12px; min-width: 120px;`) dan memperlebar kolom status di tabel menjadi 145px agar ikon panah tidak lagi berhimpitan dengan teks.
- **Badge Tenggat Waktu (`.task-due-chip`)**:
  - Mendesain ulang tanggal tenggat di tabel menjadi pill chip elegan (`.task-due-chip`) dengan ikon kalender sejajar.
  - Memberi kode warna tematik: hijau lembut untuk "Hari Ini", merah tegas untuk tugas "Terlewat", dan netral untuk jadwal mendatang atau tanggal penyelesaian.
- **Perbaikan Penanggung Jawab "AAgrinas"**:
  - Mengeliminasi duplikasi huruf inisial avatar (`assigneeName[0]`) yang menyebabkan nama "Agrinas" terbaca ganda sebagai "AAgrinas".
  - Mengubah tampilan penanggung jawab menjadi badge pill netral (`.task-assignee-pill`) tanpa avatar palsu, sejalan dengan prinsip identitas KDMP di `AGENTS.md`.
- **Standarisasi ID Tugas (`TGS-xxxx`) dan Kegiatan (`KGT-xxxx`)**:
  - Menerapkan format kode terstruktur: awalan `TGS-` untuk tugas kerja dan `KGT-` untuk kegiatan lapangan diikuti 4 karakter unik pendek yang mudah diingat (mis. `TGS-1234`, `KGT-ABCD`).
  - Menambahkan utilitas `formatDisplayCode` untuk menormalisasi format panjang lama menjadi format baru yang rapi di seluruh tabel, kalender, drawer, dan kartu.
  - Menambahkan dukungan kode otomatis untuk entitas `journal` (`makeActivityCode`).
- **Sinkronisasi Papan Scrum & Riwayat Selesai**:
  - Memperbaiki data baris papan pada `view === 'papan'` agar seluruh kolom (Rencana, Dikerjakan, Dibatalkan, Selesai) tetap tampil utuh tanpa terpotong oleh filter status tunggal.
  - Menambahkan tautan terpadu di bagian bawah kolom Selesai: `Buka Riwayat Selesai ({count}) →` menuju arsip riwayat kronologis lengkap.
  - Mengganti inisial avatar palsu pada kartu papan dengan badge nama penanggung jawab asli (`.scrum-assignee-pill`).
- **Verifikasi Kualitas**: 143 tes lulus 100%, 0 kesalahan typecheck, build Next.js Turbopack sukses penuh.

### Perbaikan Form Tugas di Ponsel & Perombakan Navigasi Mobile (2 Oktober 2026)

- **Formulir Tugas (`Editor.tsx`)**:
  - Mengatasi masalah kartu petunjuk awal (`.task-form-intro`) yang menimpa kolom input saat dibuka di ponsel dan ketika keyboard virtual aktif.
  - Memindahkan kartu intro dan kisi isian ke dalam wadah gulir terpadu `.editor-form-scroll` (`overflow-y: auto`, `touch-action: pan-y`).
  - Menata ulang layout `.task-form-intro` pada breakpoint mobile (≤640px) menjadi satu baris kompak (8px padding, tombol toggle 36px).
  - Menyesuaikan batas tinggi modal mobile ke `calc(100dvh - 16px)` untuk kenyamanan pengisian layar sentuh.
- **Navigasi Bawah Ponsel (`AppShell.tsx`, `personal.css`, `polish.css`)**:
  - Mentransformasi bilah navigasi bawah ponsel menjadi dock melayang estetik (*floating glassmorphic dock*) dengan efek blur (`backdrop-filter: blur(20px)`), sudut membulat 28px, dan token tema responsif.
  - Mengoptimalkan tombol aksi tengah (FAB) agar terangkat halus di atas dock tanpa kliping.
  - Memberikan indikator rute aktif yang kontras dan nyaman dilihat.
  - Menyelaraskan tautan navigasi mobile: **Beranda**, **Tugas**, **Aksi Tambah (+)**, **Kegiatan** (`/jurnal`), dan **Menu**.
  - Mengamankan jarak bawah konten utama (`padding-bottom: calc(92px + env(safe-area-inset-bottom))`) dari tumpang-tindih dock navigasi.

### Redesain Beranda, Rutinitas Kerja Manajer, Riwayat Selesai Kronologis, dan Pembersihan UI (2 Oktober 2026)

- **Redesain Beranda (Dashboard) Manajer**:
  - Menambahkan checklist interaktif "Rutinitas Harian Manajer KDMP" (Pagi, Siang, Sore hingga Pulang) tersimpan di `localStorage` dilengkapi progres persentase harian.
  - Kartu sorotan rapat hari ini dengan tombol gabung instan `Masuk Rapat Online ↗` untuk rapat Google Meet/Zoom/hybrid yang sah.
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
- **Verifikasi**: 142 tes (19 berkas) lulus 100%, typecheck bersih, build Next.js Turbopack sukses (9/9 rute teroptimasi).

### Pembersihan kegiatan/tugas, kalender, dan detail visual (2 Oktober 2026)

- Menu `Jurnal Kerja` diubah menjadi **Kegiatan** agar jelas berbeda dari `Daftar Tugas`; bahasa formulir ikut menyesuaikan.
- Tugas dan kegiatan kini dapat memuat tautan "Gabung rapat" bila menunjuk rapat berformat online/hybrid dengan URL valid; tautan diambil dari catatan rapat, tidak disalin ke tugas/kegiatan. Formulir kegiatan mendapat pilihan rapat baru (`meeting_id`); kolom ini opsional dan kompatibel dengan data lama.
- Kalender menampilkan judul tugas sebagai informasi utama; kode kembali menjadi metadata kecil. Tanda kode (`task-code-tag`, `card-task-code`, `task-code-badge`, `subtask-code-pill`) diseragamkan memakai font mono berukur kecil dan tidak lagi menonjol.
- Lingkaran centang subtugas (`.subtask-check-circle`, `.subtask-round-check`) diperjelas, lebih simetris, punya area sentuh lebih luas, dan fokus keyboard terlihat.
- Tombol sebelumnya/berikutnya pada laci tugas memakai sudut membulat ringan (bukan oval penuh).
- Animasi dialog (form tugas, aksi cepat, perintah, ekspor, target periode) kini naik lembut dari bawah dengan pudar singkat sehingga arah gerak jelas; reduced-motion tetap menonaktifkannya. Drawer tetap meluncur dari sisi kanan.
- `card-project-pill` disederhanakan: titik warna proyek sebagai penanda, teks dipotong rapi, warna permukaan netral.
- Beranda mendapat tombol langsung "Buat tugas" dan "Catat kegiatan" serta bagian "Kegiatan terbaru" yang terhubung ke catatan asli. Data kegiatan ikut dimuat di Beranda.
- Berkas migrasi SQL historis diverifikasi: ketujuh berkas masih dirujuk tes dan generator reset, sehingga tidak ada yang aman dihapus. SQL instalasi bersih dan reset tetap dihasilkan dari folder yang sama.
- Perbaikan lanjutan: scope halaman Kegiatan dan Beranda kini memuat relasi (tugas, mitra, gerai, rapat) agar nama terkait tampil, bukan "tidak ditemukan"; tautan "Gabung rapat" pada kegiatan memakai gaya chip yang jelas; tombol aksi Beranda tidak meluap di 360 px (bertumpuk dua kolom); tombol ciutkan sidebar selalu terlihat (tidak lagi opacity 0); animasi modal memakai `!important` yang tetap dimatikan `prefers-reduced-motion`.
- Verifikasi: 134 tes (18 berkas), typecheck, lint, dan build produksi lulus. Pemeriksaan UI nyata pada beberapa lebar layar masih diperlukan sebelum mengklaim selesai.

### Kegiatan, tugas, dan SQL instalasi (2 Oktober 2026)

- Mendokumentasikan batas kegiatan dan tugas beserta arah Beranda yang lebih berguna untuk manajer.
- Menambah generator SQL instalasi bersih dari tujuh migrasi aktif, pengaman skema yang sudah terpasang, dan tes PostgreSQL lokal. Tidak menjalankan SQL cloud atau menghapus migrasi historis.

### Harian dan panduan integrasi (2 Oktober 2026)

- Tampilan Harian hanya membuka hari ini secara bawaan; hari Selasa dan grup lain tidak lagi terbuka tanpa diminta.
- Menambah panduan audit keterhubungan fitur dan cara kerja Git ketika beberapa AI mengerjakan proyek.

### Input cepat ponsel (2 Oktober 2026)

- Memisahkan kolom judul dan tombol input cepat tugas pada layar sempit agar petunjuk lengkap terbaca dan tombol mudah disentuh.
- Memeriksa tampilan awal Tugas, Beranda, dan Hari Ini pada lebar 360 px; tidak ditemukan gulir horizontal halaman.

### Perbaikan detail tugas (2 Oktober 2026)

- Menghapus parameter tugas dari URL saat dialog ditutup agar pergantian Daftar/Papan/Kalender/Gantt tidak membukanya kembali. Menambah tes regresi untuk alur tutup dan pindah tampilan.

### Perapian dari anotasi halaman (2 Oktober 2026)

- Menata riwayat tugas, tombol tutup menu aksi, tajuk, status tabel, kode pada papan, dan metadata daftar.
- Membuat kode tugas baru otomatis dari judul kegiatan; menautkan dokumen atau kontrak yang sudah dicatat ke tugas, berdampingan dengan Mitra atau kontak.
- Memperjelas pintasan tindak lanjut, keadaan kosong grafik tujuh hari, warna prioritas, input cepat Hari Ini, dan tombol centang tugas.

### Diagnosis login lokal (2 Oktober 2026)

- Memastikan migrasi keamanan Supabase terpasang; sumber pesan yang salah adalah koneksi server pengembangan yang terbatasi jaringan.
- Mengganti pesan galat PIN agar fungsi hilang, izin, dan koneksi dapat dibedakan. Server lokal dijalankan ulang dengan jaringan; pemilik mengonfirmasi berhasil masuk memakai PIN.
- Merapikan tombol Tugas baru pada ponsel dan mengurung tabel panjang di area gulirnya agar halaman Tugas, Kalender, dan Gantt tidak meluap ke samping.

### Alur tugas, jadwal berulang, dan tampilan ponsel (2 Oktober 2026)

- Menjelaskan bahwa tugas berulang berikutnya dibuat setelah tugas saat ini selesai; jam hanya catatan. Input terkait terkunci sampai pengulangan dipilih, dan batas tanggal kini dihormati.
- Menambahkan tautan Mitra atau kontak, Rapat, dan Kendala di tugas. Milestone hanya dapat dipilih setelah proyek dan harus berasal dari proyek itu.
- Form opname meminta barang sebelum jumlah diisi dan mengunci stok buku yang disalin dari daftar barang.
- Menghilangkan kewajiban kode tugas, memisahkan judul dari metadata lama, dan meringkas form tugas baru dengan tombol Detail lainnya. Kalender serta Gantt ponsel dibuat lebih terbaca; navigasi bawah ditempatkan di tepi layar.
- Memperbarui panduan onboarding dan menambah tes untuk kondisi formulir. Pemeriksaan perangkat setelah login masih terbuka.

### Navigasi, tugas, dan panduan onboarding (2 Oktober 2026)

- Menyatukan tampilan tab, tombol, ikon, kartu, dan gerak masuk halaman; memperkuat warna Lime.
- Mengganti menu Pemangku menjadi Mitra & kontak, menyederhanakan formulir, dan menambah Agrinas.
- Memuat catatan per 50 baris dengan riwayat tugas selesai dan cache bacaan singkat. Ringkasan yang parsial kini disebut apa adanya.
- Menambahkan panduan pengisian rundown dan menyiapkan migrasi indeks untuk data besar. Migrasi indeks cloud masih menunggu langkah manual.

### Reset database kosong (2 Oktober 2026)

- Menyiapkan SQL reset untuk proyek Supabase saat ini, disertai panduan pembuatan ulang PIN.
- Menambahkan pengaman agar catatan kerja dan laporan yang sudah tersimpan tidak terhapus tanpa ditinjau.
- Menguji pemasangan ulang, izin akses, dan pembatalan reset di PostgreSQL lokal. Cloud belum diubah.

### Estetika, Perapian UI Menyeluruh & Grafis Animasi (1 Oktober 2026)

- **Perapian Header Tanggal Atas**: Merapikan penataan chip tanggal (`.home-date-chip`) di kanan atas tajuk beranda dengan tata letak pill horizontal sejajar, ikon kalender rapi, border 1.5px tegas, dan tanpa pemotongan baris.
- **Peningkatan Visual Modal Pop Up & Border Tegas**:
  - Memberikan border 1.5px bertegasan tinggi (`var(--line-strong)`) dan bayangan berlapis mendalam pada semua modal dialog (`dialog.editor`, `.manager-action-dialog`).
  - Menyeragamkan seluruh input form (`.field-input`, `.field-select`, `.field-textarea`) dengan garis tepi 1.5px dan cincin fokus lembut bernuansa brand/dark, menghilangkan garis hitam pekat yang kasar.
  - Memperjelas tombol silang penutup modal dengan kontras tinggi dan efek hover tegas.
- **Sidebar Hemat Ruang**: Mengompresi wadah `Favorit` dan `Terakhir Dibuka` menjadi barisan chip kompak (~35px) dan otomatis menyembunyikan Favorit jika belum ada item disematkan, membebaskan ruang vertikal untuk navigasi utama tanpa scrollbar yang mengganggu.
- **Penyelesaian Misteri "Garis Hitam" pada Kartu**: Menghapus garis mendatar hitam pada kartu penyelesaian tugas dengan mengganti *sparkline* kosong dengan `RadialProgressRing` interaktif beranimasi lingkaran melingkar serta badge squircle berikon untuk metrik lainnya.
- **Grafik & Kartu Unik Beranimasi**:
  - `WeekBarChart`: Pilar grafik dengan gradien warna modern, penanda menyala (*glow*) untuk hari ini, dan animasi pengisian lembut saat dimuat.
  - `TaskDonutChart`: Animasi segmen donat saat dimuat dan interaksi membesar pada segmen saat disentuh kursor.
  - Kartu Metrik: Efek angkat mikro (*micro-lift*) dan bayangan melayang saat diarahkan kursor.
- **Penyederhanaan Pusat Aksi Cepat**: Menghilangkan tombol pintasan duplikat di beranda dan menata ulang modal aksi manajer menjadi 2 kelompok logis rapi (*Pencatatan Operasional* dan *Pekerjaan & Evaluasi*) tanpa pengulangan teks yang berisik.
- **Penghapusan Total Emoji Mentah**: Menghapus seluruh karakter emoji mentah pada berkas `Editor.tsx`, `Operations.tsx`, `Records.tsx`, `ProjectNotes.tsx`, `Reports.tsx`, dan `catalog.ts`, menggantikannya dengan ikon SVG Lucide yang konsisten dan elegan.

### Penyelarasan Komponen, Perbaikan Tombol Modal & Kerapian Dropdown (1 Oktober 2026)

- **Perbaikan Tombol Tutup Pop Up (Silang Modal)**:
  - Memperbaiki hilangnya tombol silang pada popup Jurnal Kerja dan semua modal formulir dengan menghapus offset sticky negatif warisan (`top: -28px` dan `top: -16px`) yang menarik header ke luar area tampilan.
  - Memastikan tombol tutup memiliki posisi stabil (`position: static`), ukuran seragam 36px, kontras tinggi, dan ikon `X` yang jelas di semua perangkat.
- **Perbaikan Dropdown Terhimpit Kartu**:
  - Memberikan prioritas `z-index: 500+` saat dropdown terbuka (`.custom-select-wrap.is-open` dan `.custom-select-menu`) sehingga menu pilihan tidak lagi terpotong atau tertutup kartu di bawahnya pada bilah filter maupun kontrol beranda.
  - Menata drawer opsi kartu (`details.record-options`) dengan tata letak bersih agar pilihan status tidak berdesakan dengan tombol aksi.
- **Penyelarasan Tampilan "Terakhir Dibuka" di Sidebar**:
  - Mendesain ulang chip riwayat halaman terakhir dibuka dengan kontainer berstruktur, ikon halaman masing-masing, tipografi rapi, dan penanda halaman yang sedang aktif.
- **Harmonisasi Ikon Seluruh Halaman**:
  - Mengganti emoji mentah (`📅`, `📁`, `🔴`, `🟡`, `🟢`, `⚪`) pada judul bagian rapat dan status kedaluwarsa dokumen dengan ikon Lucide yang serasi (`CalendarDays`, `FolderArchive`, `AlertCircle`, `Clock`, `CheckCircle2`, `ShieldCheck`).
  - Menambahkan ikon resmi `ArrowRightCircle` untuk rute `/tindak-lanjut` pada navigasi sidebar.

### Karakter Halaman, Navigasi Terstruktur & Ruang Kerja Editorial (1 Oktober 2026)

- **Penataan & Kerapian Komponen Menyeluruh (*Comprehensive Component Polish*)**:
  - Menormalkan radius sudut kartu dan tabel dari 32px/24px menjadi 18px/14px yang proporsional dan tidak memotong isi konten.
  - Memperbaiki aturan `aspect-ratio` yang sebelumnya merusak proporsi tombol `+ Tambah` dan pratinjau tema di Pengaturan.
  - Menghapus latar belang-belang warna acak (`.tone-0`, `.tone-1`, `.tone-2`) pada kartu tugas beranda, menggantikannya dengan desain permukaan bersih dan fokus status.
  - Menghilangkan duplikasi tanggal pada tajuk beranda dan memasang eyebrow hierarkis `Ruang Kerja Manajer`.
  - Merapikan dock ponsel bawah menjadi 320px dengan jarak ketuk nyaman dan kontras teks tombol aksi tengah yang tinggi.
  - Membersihkan kartu gerai, dokumen, rapat, dan risiko dari garis tebal asimetris dan gradien miring.
- **Header Ringkas & Pusat Aksi Terpadu**:
  - Menyatukan tombol `+ Aksi` dan `+ Tugas baru` di header menjadi satu tombol `+ Tambah` yang ringkas, terhubung ke 9 aksi cepat.
- **Navigasi Sidebar Terstruktur**:
  - Fitur sematkan halaman favorit (`hub-favorites`) dengan bintang interaktif.
  - Tampilan dinamis halaman terakhir dibuka (*recents*) untuk akses kerja kilat.
  - Kelompok menu kolapsibel untuk tampilan sidebar yang lebih tenang dan fokus.
- **Karakter Tiap Halaman**:
  - **Beranda**: Prioritas pekerjaan perlu perhatian (`FollowUps`) dan agenda fokus di atas ringkasan metrik.
  - **Proyek**: Kartu menonjolkan ringkasan tujuan, progres, indikator kendala, dan langkah tenggat. Halaman detail menyatukan dokumen dan keputusan strategis terkait.
  - **Dokumen**: Lencana nomor dokumen, jenis dokumen, status kelengkapan, dan masa berlaku berkode warna (🔴/🟡/🟢).
  - **Risiko**: 3-level tingkat perhatian (Bahaya Kritis, Perlu Waspada, Terkendali), skor dampak/probabilitas, mitigasi terencana, dan jadwal tinjau.
  - **Rapat**: Pengelompokan terpisah rapat mendatang vs riwayat, dengan kartu mengikuti alur Agenda → Notulen → Keputusan Terkait → Tindak Lanjut langsung.
  - **Pengaturan**: 4 tab terorganisasi dengan Kartu Pratinjau Tema Langsung (*Live Component Preview*).
- **Penyelarasan 5 Tema Warna**:
  - Penyesuaian Lime & Ink (bawaan), Sage, Lavender, Peach, dan Sky dengan warna latar lembut dan teks kontras jelas.

### Superapp Manajer, Alur Laporan & Hapus Draf, dan Pusat Aksi Terpadu (1 Oktober 2026)

- **Alur Laporan Lengkap & Tombol Hapus Draf (`/laporan`)**:
  - Menyediakan tombol **Hapus Draf** merah yang jelas dan aman dengan dialog konfirmasi agar manajer dapat membuang draf sementara yang tidak dibutuhkan.
  - Membedakan status dokumen secara visual: **Draf Kerja** (kuning/amber) vs **Dokumen Resmi** (hijau resmi) berkop KDMP.
  - Opsi simpan ganda: tombol `Simpan sebagai Draf` untuk catatan kerja fleksibel, dan tombol `Terbitkan Laporan Resmi` untuk laporan final berkop.
  - Tombol aksi instan pada draf: `Terbitkan Resmi` dan `Hapus Draf`.
  - Filter arsip laporan: `Semua Arsip`, `Draf Kerja`, dan `Dokumen Resmi`.
  - Integrasi ringkasan arus kas riil periode (kas masuk, kas keluar, selisih) ke dalam snapshot lembar laporan resmi.
- **Pusat Aksi Cepat Manajer (Superapp Command Center)**:
  - Menyediakan modal aksi cepat (`ManagerActionModal`) yang dapat dipanggil dari mana saja via tombol `+ Aksi` di topbar, dock tengah ponsel, atau pintasan keyboard.
  - Memuat 9 formulir aksi instan: Catat Kas Masuk, Catat Kas Keluar, Tambah Anggota, Input/Beli Barang, Hitung Stok (Opname), Buat Tugas, Jadwalkan Rapat, Susun Laporan, dan Catat Risiko.
  - Navigasi instan dengan penekanan angka `1` s.d. `9` pada keyboard.
- **Dasbor Superapp Manajer (`/` Beranda)**:
  - Menambahkan strip pintasan operasional cepat (*Quick Action Strip*) di bawah tajuk beranda.
  - Menambahkan *Smart Alert* persediaan kritis jika terdapat barang toko yang habis atau di bawah batas minimum gerai.
  - Memperkaya kartu catatan koperasi dengan angka riil kas dan inventaris toko.
- **Migrasi Database Supabase Baru**:
  - Menyiapkan berkas migrasi `supabase/migrations/20261001000005_manager_superapp.sql` dengan kolom status laporan, indeks pencarian cepat, dan izin akses aman.

### Desain Ulang Kartu Pencatatan & Polish Komponen (1 Oktober 2026)

- **Penyelarasan & Desain Ulang Kartu Buku Pencatatan (`/pencatatan`)**:
  - Menghilangkan artefak garis tebal asimetris warisan CSS pada sisi kiri ikon (`border-left: 4px solid` & radius tidak seimbang) menjadi ikon squircle modern simetris (radius 13px) dengan warna pastel elegan dan kontras nyaman.
  - Merapikan susunan tombol aksi di sisi kanan: mengelompokkan tombol `+ Tambah` dan tombol navigasi buka `↗` ke dalam kontainer `.notebook-actions` yang presisi.
  - Memasangkan lencana jumlah data (`0 data`) langsung berdampingan dengan judul buku di dalam `.notebook-title-wrap`, sehingga kartu terlihat proporsional tanpa rongga kosong yang canggung.
  - Memperbarui sudut lengkung kartu dari bentuk lonjong kapsul berlebih menjadi sudut modern 16px dengan bayangan bertingkat lembut dan efek hover responsif.
  - Mendukung tema gelap (`data-theme="dark"` / `.dark`) secara konsisten.

### Keterhubungan Pencatatan, Pemilih Bulan, Laporan Eksekutif & Risiko (1 Oktober 2026)

- **Pemilih Bulan Indonesia & Dropdown Rapi**:
  - Menggantikan input bulan native `<input type="month">` peramban dengan komponen `Select` kustom berbahasa Indonesia ("Semua Bulan", "Oktober 2026 (Bulan Ini)", "September 2026", dst.). Menghilangkan popover kalender bahasa Inggris bawaan Windows yang kaku dan tidak serasi.
- **Keterhubungan Silang Buku Pencatatan Operasional**:
  - Buku Kas terhubung ke Anggota (`member_id`) dan Barang (`item_id`), dengan lencana terkait dan subtitle pada judul transaksi.
  - Buku Anggota menampilkan rekapitulasi transaksi kas anggota (jumlah transaksi dan total nominal simpanan) serta tombol aksi instan `+ Kas` untuk langsung membuka form setoran kas dengan identitas anggota terisi otomatis.
  - Buku Barang menampilkan harga satuan (`price`), kondisi stok (Aman / Menipis / Habis) berdasarkan batas minimum, info hasil opname terakhir, serta tombol aksi cepat `+ Beli` (mencatat pengeluaran kas pengadaan stok) dan `Opname` (menghitung fisik).
  - Buku Stok Opname secara otomatis menyalin stok buku saat barang dipilih pada form isian.
- **Template Laporan Eksekutif Resmi Manajer (`/laporan`)**:
  - Mengubah tampilan laporan manajer menjadi lembar dokumen resmi Koperasi Desa Merdeka Puntukrejo (KDMP) yang siap cetak / PDF dan ekspor WhatsApp.
  - Memuat Kop Surat Resmi KDMP, nomor dokumen resmi, periode evaluasi, dan badge keaslian dokumen.
  - 4 Kartu KPI Eksekutif: Tugas Rampung, Milestone Tercapai, Kendala/Tugas Terlambat, dan Risiko Terbuka.
  - Kotak Catatan Pengantar Manajer bergaya memo eksekutif dengan kutipan elegan.
  - Bagian terstruktur dengan ikon dan badge jumlah item.
  - Kolom Tanda Tangan Resmi (Kiri: Pengurus / Badan Pengawas, Kanan: Manajer Operasional) dengan optimasi cetak `@media print`.
- **Dasbor Pemantauan Risiko Manusiawi & Sederhana**:
  - Menggantikan matriks matematis 5x5 (`5x1 -` s.d. `5x5 -`) dengan 3 kartu tingkat bahaya operasional yang jelas (🔴 Kritis, 🟡 Waspada, 🟢 Terkendali), matriks sebaran 3x3 yang ramah dengan judul risiko nyata, dan kartu mitigasi tindakan yang siap tindak lanjut.
- **Bahasa Pemangku Kepentingan yang Membumi & Santun**:
  - Menyederhanakan istilah manajemen teoretis menjadi bahasa koordinasi desa yang santun: Tokoh Penentu & Pengurus Inti, Aparat Keamanan & Pembina, Anggota Koperasi & Warga Desa, serta Mitra Usaha & Pemasok.
- **Migrasi Supabase**:
  - Menyiapkan berkas migrasi `supabase/migrations/20261001000004_interconnected_operations.sql` untuk dijalankan pengguna.


- **Komponen Dropdown Kustom (`src/components/ui/Select.tsx`)**:
  - Menggantikan menu popover bawaan peramban Windows/Chrome yang kaku dan berwarna biru tua dengan komponen dropdown kustom yang elegan.
  - Kartu popover menu melayang dengan sudut membulat (`border-radius: 12px;`), bayangan mengambang lembut, dan animasi transisi halus saat dibuka.
  - Indikator centang (`<Check size={14} />`) untuk opsi yang sedang dipilih, serta efek sorot hover pastel lembut (`var(--brand-soft)`).
  - Aksesibilitas penuh: navigasi keyboard (panah atas/bawah, Enter/Spasi, Escape, Tab) dan penutupan otomatis saat klik di luar area.
  - Dukungan mode gelap penuh dengan latar obsidian `#181922`.
- **Implementasi Terpadu**:
  - `src/features/Records.tsx`: Filter Status, Proyek, Target Periode Sprint, Prioritas, dan Urutan.
  - `src/features/Operations.tsx`: Filter Status/Transaksi kas dan Filter Gerai.
  - `src/features/Dashboard.tsx` & `src/features/Roadmap.tsx`: Filter Proyek.
  - `src/features/SprintModal.tsx` & `src/features/RecursiveScheduleModal.tsx`: Durasi target periode, status, dan perulangan jadwal.

### Perapihan Tampilan Papan Scrum, Tugas Harian & Kartu Kerja (1 Oktober 2026)

- **Papan Scrum (`ScrumBoardView`)**:
  - Hapus aturan CSS lawas yang menimbulkan benturan warna lavender pada kolom kedua ("Dikerjakan") dan duplikasi border-radius.
  - Tambah indikator dot warna status pada header kolom: Rencana (Abu netral), Dikerjakan (Aksen utama), Dibatalkan (Merah peringatan), dan Selesai (Hijau tuntas).
  - Tampilkan placeholder kolom kosong (`.scrum-empty-column-placeholder`) saat kolom belum memiliki tugas agar tampilan tidak bolong atau timpang.
  - Kartu tugas dilengkapi lencana prioritas (`.card-priority-pill`), penanda visual tenggat terlewat (`.card-date-pill.is-late` dengan ikon peringatan), dan perapihan progress bar subtugas.
  - Petakan status 'dibatalkan' secara eksplisit pada aksi drop kartu antar kolom.
- **Tugas Harian (`DailyTasksView`)**:
  - Tambah kelompok lipat tugas terlewat/sebelum pekan ini (`.overdue-group-card`) agar tugas tertunda dari minggu lalu tidak hilang dari pandangan manajer.
  - Lengkapi navigasi keyboard (`role="button"`, `tabIndex={0}`, `onKeyDown`) pada setiap baris tugas harian.
- **Hari Ini (`TodayView`) & Kartu Sprint (`SprintCard`)**:
  - Bersihkan tombol bersarang (`button` di dalam `div` interaktif) pada daftar tugas terlambat `TodayView` agar mematuhi standar aksesibilitas HTML dan tidak memicu perilaku klik ganda.
  - Lengkapi kartu sprint dan tugas menyusul dengan fokus keyboard dan penanganan tombol Enter/Spasi.

- Rapikan kartu dashboard/proyek/catatan serta tata letak pencatatan tablet. Hubungkan filter proyek, legenda diagram status, tanggal penyelesaian, dan daftar tugas di dashboard.
- Perbaiki hitungan status yang tumpang tindih dan proporsi grafik; tambahkan transisi diagram serta dukungan reduced-motion.

- Perjelas pesan kegagalan pemeriksaan sesi agar gangguan koneksi tidak disalahartikan sebagai migrasi belum terpasang.

### Audit tugas dan dashboard (1 Oktober 2026)

- Perbaiki pengurutan tugas dan detail yang tertinggal setelah penyimpanan pada Hari Ini.
- Tampilkan galat aksi tugas harian dan aktifkan pembukaan detail melalui keyboard.
- Tampilkan nilai dashboard langsung, sertakan tanggal pada label grafik, dan perbaiki perhitungan diagram saat render.
- Validasi: 108 tes, lint, typecheck, dan build produksi lulus. Pemeriksaan browser terbaru memerlukan login ulang.

### Perapihan Tabel, Input Rapat Kondisional & Penyempurnaan Bahasa (1 Oktober 2026)

- **Input Rapat Kondisional (`Editor` & `Records`)**:
  - Pilihan format rapat (`mode`): Tatap Muka, Online Penuh, dan Hybrid.
  - Form menyesuaikan secara dinamis: hanya menampilkan ruangan/lokasi fisik pada pilihan tatap muka, hanya menampilkan tautan online pada pilihan online, dan menampilkan keduanya pada format hybrid.
  - Tampilan kartu rapat di Beranda dan Riwayat hanya menampilkan detail lokasi dan tombol tautan bergabung sesuai format yang dipilih.
- **Perapihan & Konsistensi Tabel**:
  - `.ledger-table` (Buku Kas, Anggota, Barang, Opname): perataan kolom rapi (angka rata kanan tabular, lencana status/arah di tengah, kode monospace, tanggal rapi), lencana status berwarna, nominal kas tegas, tombol aksi rapi, dan *empty state* yang informatif.
  - `.task-table` (Daftar Tugas): kolom rapi dengan label proyek, dropdown status berwarna per status, lencana prioritas, tanda peringatan keterlambatan, dan tombol `✓ Selesai`.
  - `.filters`: diseragamkan dengan `<span className="field-caption">`, tinggi seragam 38px, dan tombol reset filter yang konsisten.
- **Penyempurnaan Bahasa**:
  - Istilah formulir dan keterangan direvisi agar sederhana, alami, dan mudah dipahami pengelola KDMP Puntukrejo.

### Penyempurnaan Kartu Pencatatan & Pemangku Kepentingan Desa (1 Oktober 2026)

- **Kartu Pencatatan Modern**:
  - Transformasi baris buku pada `/pencatatan` menjadi kartu mandiri yang rapi dengan spine icon beraksen pastel (hijau, biru, ungu, amber), live count badge, deskripsi yang nyaman dibaca, dan tombol "+ Tambah" bertema dengan touch target 44px.
  - Kartu catatan terakhir (`.recent-note`) dipercantik dengan ikon modul, badge kategori, dan format tanggal yang jelas.
  - Metrik ringkasan (`.recording-metrics`) diperbarui dari grid terpotong menjadi kartu KPI individual dengan indikator warna sesuai tipe transaksi (pemasukan hijau, pengeluaran merah, selisih biru, stok rendah oranye).
- **Pemangku Kepentingan Desa (`/pemangku`)**:
  - Dukungan penuh peran mitra desa Indonesia: Babinsa (TNI), Bhabinkamtibmas (Polri), Kepala Desa/BPD/Perangkat, Badan Pengawas Koperasi, Pengurus Koperasi, Dinas Koperasi & UKM, Kelompok Tani (Gapoktan), dan Mitra Usaha.
  - Pilihan cepat (preset) pada formulir tambah pemangku: sekali klik langsung mengisi kategori, rentang wewenang, dan panduan tindak lanjut.
  - Input pengaruh dan kepentingan dilengkapi pilihan deskriptif Bahasa Indonesia (1–5) dengan penjelasan wewenang dan frekuensi koordinasi.
  - Kartu pemangku menampilkan lencana peran dengan ikon dan warna khas, label kuadran strategi koordinasi (*Libatkan Erat*, *Jaga Dukungan*, *Beri Informasi*, *Pantau*), tombol langsung WhatsApp dan Telepon, status riwayat kontak, dan peringatan jika belum dihubungi lebih dari 14 hari.
  - Peta Pengaruh–Minat (`InfluenceMap`) diperbarui dengan arahan taktis kemitraan koperasi desa dan visualisasi chip pemangku per kuadran.

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

## Tampilan pencatatan yang lebih langsung
- Ganti kartu promosi dengan daftar buku dan akses tambah langsung.
- Tambah catatan terakhir, pencarian, input tugas dengan Enter, serta editor samping.
- Referensi: Linear (display options) dan Things (scheduling/organization); tema netral dengan aksen indigo.

## 2026-10-01 — ruang manajer pribadi
- Desain arang, hijau lembut dan lavender; navigasi HP mengambang serta sidebar tablet/desktop.
- Beranda, kalender, papan, detail tugas dan komponen pencatatan diselaraskan.
- Hapus grafik/progres contoh, nama default fiktif, avatar pengikut dan tombol tanpa aksi.
- Perbaiki status papan, penanganan galat, pembaruan detail dan catatan pribadi.

## 2026-10-01 — penyempurnaan clean design, palet pastel, kalender, dan pembersihan AI slop
- Ganti tampilan datar dengan clean design, soft elevation shadows (`var(--shadow-card)`), border lembut dan palet terkurasi.
- Tambah 5 palet warna pastel (Lime Pastel warna awal, Peach Pastel hangat, Lavender Pastel, Sage Pastel, Sky Pastel) dengan pemilih gaya interaktif di Pengaturan.
- Tingkatkan interaktivitas kalender: sel terpilih memiliki highlight pastel lembut, aksen border tegas, dan glow bayangan berdimensi saat diklik.
- Simetriskan presisi tombol icon "+" di kalender sejajar dengan nomor tanggal (lingkaran 28px x 28px rata tengah).
- Selaraskan tombol tambah tugas pada agenda kalender dengan ikon Plus dan typography tegas.
- Perbaiki seluruh modal pop-up (`SprintModal`, `RecursiveScheduleModal`, `DateRangePicker`, `TaskDetailDrawer`, `Editor`, dan impor CSV) agar otomatis menutup saat area transparan/backdrop diklik atau tombol Escape ditekan.
- Lengkapi penataan jarak, layout card, dan komposisi warna kontras tinggi pada papan scrum, kartu tugas, dan kartu sprint (memperbaiki keterbacaan teks judul proyek dan indikator status).
- Hapus 42 pengulangan teks "+ Tugas" pada kalender; gunakan tombol mini plus terpadu dan tombol agenda terpilih.
- Selesaikan duplikasi klik buka kalender pada DateField dengan menyembunyikan pemilih bawaan browser dan menyatukan aksi trigger.
- Rapikan skeleton loading menjadi wireframe shimmer yang selaras dengan layout halaman kerja nyata.
- Desain ulang menu samping dengan emblem KDMP Puntukrejo, ikon per modul, pencarian cepat ⌘K, dan profil manajer.
- Bersihkan bahasa AI slop di seluruh modul menjadi bahasa Indonesia lugas, ringkas, dan profesional.
- Perbaiki penataan jarak di Beranda: letak angka persentase ProgressRing presisi di titik pusat tanpa terpotong, persentase proyek rapi dalam pill badge dengan jarak napas lega.
- Selesaikan perapian visual Tugas Harian (`DailyTasksView`) dengan kartu accordion hari, badge hari ini, kode tugas `#KD-XXXX`, visualisasi pohon subtugas (`├──` dan `└──`), dan aksi cepat.
- Perbaiki keterbacaan nomor tanggal "Hari ini" pada kalender dengan teks kontras tinggi `var(--ink-heading)` di atas latar pastel lembut `var(--brand-soft)`.
- Perbaiki perilaku penutupan otomatis menu pop-up/dropdown ("Lainnya", "Opsi lainnya") saat area luar transparan diklik atau tombol Escape ditekan.
- Sempurnakan grid 7-kolom dan kontras tanggal pada pemilih rentang tanggal (`DateRangePicker`) dan pemilih tanggal inline (`DateField`).
- Rancang ulang halaman `/hari-ini` dengan komponen `TodayView` terdedikasi: agenda tugas hari ini, seksi tugas terlambat dengan 1-klik reschedule, agenda rapat hari ini, dan tugas 7 hari ke depan.
- Rombak total pop-up tambah tugas/editor (`Editor.tsx`): modal melayang di tengah dengan backdrop blur, animasi halus, ikon kategori, tombol tutup X bulat, struktur label-input yang lapang, dan tombol aksi tegas.
