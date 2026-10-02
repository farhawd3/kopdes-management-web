# Status proyek — 2 Oktober 2026

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
