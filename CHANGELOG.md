# Changelog

## Kontrak style tunggal dan rencana revisi dunia — 5 Oktober 2026

- Jadikan DUNIA-KOPERASI satu acuan style/rencana, hapus salinan spesifikasi dunia dari DESAIN-ANTARMUKA, dan arahkan AGENTS/indeks/serah terima ke acuan yang sama.
- Simpan penilaian pemilik dan rencana map lebih luas, pencahayaan/kontrol waktu, mobil, patroli jarang/bubble dan gym aktif beserta kriteria penerimaan.
- Perubahan dokumentasi saja; belum mengubah scene/runtime. Pemeriksaan diff dan tautan lokal dilakukan, tes aplikasi tidak diulang untuk perubahan MD.


## Dunia Koperasi dan panduan aktif — 5 Oktober 2026

- Tambahkan dunia Three.js layar penuh: kawasan/kantor, tujuh lahan, gedung dari catatan unit, perabot dan maskot modular, bubble, kamera serta cuaca/waktu WIB.
- Hubungkan kartu/detail/dock ke workspace dan modul operasional; pratinjau development kosong tanpa database. Preferensi lokal Zod; tidak menambah migrasi atau layanan berbayar.
- Simpan kontrak style dan referensi video/interior di DUNIA-KOPERASI serta docs/referensi-dunia. Ringkas STATUS/CHECKLIST/LANJUTAN-AI, perjelas dua lingkup visual, hapus arahan aktif yang rancu; selaraskan AGENTS/PRD/KEPUTUSAN/arsitektur/skill.
- 266 tes/44 berkas, typecheck, lint dan production build lulus. QA exterior/interior kosong 360/768/1024/1440 tanpa luapan; penanda masuk kantor, bubble dan pratinjau rapat/gym. Penerimaan visual, semua interaksi/state, perangkat fisik dan data cloud masih terbuka.

## Empat anotasi lanjutan — 4 Oktober 2026

- Seimbangkan Buka catatan/Opsi lainnya pada footer kartu, termasuk keadaan opsi terbuka.
- Susun Jurnal menjadi kartu pada ponsel: judul/kode, tanggal, hubungan, lalu aksi; desktop tetap tabel.
- Pisahkan metadata kegiatan terbaru dari Gabung rapat pada ponsel; pusatkan donut dengan legenda dua kolom.
- 256 tes/42 berkas, TypeScript, ESLint dan build lulus. QA terang lima lebar; pemeriksaan gelap tambahan belum lengkap. Audit UI legacy masih terbuka.

Perbaikan 15 anotasi: bantuan form dilipat, banner buku dihapus, padding catatan global, kartu/tabel/aksi ditata, + Kas membuka kas dengan relasi anggota, tema pastel dan profil berbasis data. 256 tes/42 berkas, tipe/ESLint/build lulus. Cakupan/batas: docs/QA-ANOTASI.md.

## Koreksi tab proyek dan detail visual — 4 Oktober 2026

- Pindahkan riwayat ke tab horizontal Proyek; hapus menu sidebar, redirect URL lama.
- Hilangkan lapisan border tanggal drawer, gradien pelangi/border ganda kartu proyek dan dropdown pindah status kartu papan.
- Tambah ruang atas/isi catatan; aksi papan tetap lewat drag dan tombol footer.
- 253 tes/41 berkas, tipe, ESLint dan build lulus; QA kartu/tab terang/gelap empat lebar serta drawer dan catatan.

## Riwayat proyek dan alur pengisian — 4 Oktober 2026

- Proyek selesai/arsip keluar dari sidebar berjalan dan tersedia di Riwayat Proyek. Detail memuat semua status tugas dengan paginasi; tugas lama tetap tersimpan.
- Server menolak tugas baru pada proyek tertutup; pembaruan historis tidak menghasilkan pengulangan berikutnya. Proyek/tugas tidak diselesaikan otomatis.
- Gantt fullscreen lewat portal, rotasi aman pada potret dan desktop tetap lanskap; tombol bersama, fokus dan Escape.
- Form tugas mendahulukan proyek/tugas mandiri; buku memisahkan hubungan opsional dan menampilkan langkah pengisian. Kartu proyek dan bubble timeline diperjelas.
- 253 tes, tipe, ESLint, build dan audit sumber lulus; cakupan dan batas di docs/ALUR-PENGISIAN.md.

## Tata letak pencatatan, rapat, panduan dan tema — 4 Oktober 2026

- Form rapat mengikuti lebar kontainer, kontrol tidak terpotong dan aksi membungkus.
- Empat buku: kartu bawaan mobile, filter terlihat, judul panjang dan gulir tabel aman; tombol memakai komponen bersama.
- Gerai/Rapat berikon dan opsi berpanel; tindak lanjut/notulen rapat tidak diduplikasi.
- Panduan kartu tautan dan buku operasional; palet tema dalam kisi, pratinjau dapat dilipat.
- Tambah AppIcon dan IKON.md; fixture lokal serta tes regresi mobile/aksi rapat.
- 247 tes, tipe, ESLint, build dan audit sumber lulus. Audit UI legacy belum lulus; cakupan nyata di docs/QA-TATA-LETAK.md.

## Koreksi pencarian, kartu dan kontrol mobile — 4 Oktober 2026

- Hilangkan bingkai fokus ganda, sesuaikan teks aksi menurut ukuran/konteks, gunakan form satu kolom dan tab dua kolom pada ponsel.
- Dropdown status punya lebar menu sendiri, dibatasi panel; pilihan tidak menyusut dan label form panjang membungkus.
- Rapikan kartu Gerai/kartu umum dan rincian kesiapan; radar kosong tidak ditampilkan. Isolasi gulir tabel/matriks. Fixture daftar menampilkan data tanpa filter QA palsu.
- Hari ini menetapkan tanggal Jakarta hari ini, bukan tujuh hari sebelumnya. Regresi tanggal dan kesiapan ditambahkan.
- 245 tes/37 berkas, tipe, ESLint, build, sumber 94/94 lulus. lint:ui/check:ui legacy masih gagal; cakupan browser dan batasnya di QA-POPUP.md.

## Penyederhanaan Breadcrumb Topbar & Reduksi Penonjolan Judul Lokasi — 4 Oktober 2026

- **Eliminasi Kapsul & Border Hijau Tebal (`.manager-location-wrap`)**:
  - Menghilangkan kontainer kapsul pil berwarna latar hijau dan garis tepi (`border: 1px solid var(--line)`) pada breadcrumb topbar desktop.
  - Menghapus titik aksen hijau (`.manager-location-dot`) yang sebelumnya menonjol di samping judul halaman.
  - Memposisikan judul halaman ("Daftar Tugas") sebagai teks breadcrumb alami yang tenang, bersih, dan berbobot seimbang (`font-size: 13.5px`, `font-weight: 600`, `color: var(--ink)`).
- **Perapian Tombol Bintang Favorit (`.topbar-fav-btn`)**:
  - Mengganti elemen dari `.ui-btn` (yang membawa border dan background tebal) menjadi elemen native button minimalis (22×22 px) tanpa border/background.
  - Bintang favorit menggunakan warna amber lembut (`#f59e0b`) saat aktif dan outline subtle saat idle, dengan micro-animation hover yang halus (`scale: 1.15`, `opacity: 1`).

## Penyempurnaan Visual & Fungsional Halaman Kegiatan (Kegiatan Lapangan & Koordinasi) — 4 Oktober 2026

- **Penanda Menu & Tampilan Aktif (`SegmentedControl`, `.database-views`, `.project-status-tabs`)**:
  - Menyematkan titik aksen hijau/brand (`•`) di samping label opsi yang sedang aktif melalui `.ui-segmented-active-dot`.
  - Memberikan elevasi kapsul surface (`background: var(--surface)`, `border: 1px solid var(--line)`, `box-shadow`), teks tebal berbobot 700, serta ikon dengan aksen warna brand pada tab aktif.
  - Memperbaiki selektor CSS legacy yang sebelumnya memblokir tombol `.ui-btn` di dalam bilah tampilan dan status proyek, memastikan kontras optimal di tema terang maupun gelap.
- **Eliminasi Tombol `[ Cari & filter ]` Mengambang di Desktop**: Mengganti komponen `<Button>` menjadi elemen native berpagar spesifisitas tinggi (`display: none !important`), memastikan tombol filter mobile tidak pernah muncul liar di resolusi desktop/tablet.
- **Koreksi Teks Dobel `+ + Tindak Lanjut`**: Menghilangkan karakter plus ganda sehingga render bersih menjadi `<Plus size={12} /> Tindak Lanjut`.
- **Judul Kegiatan Interaktif Bebas Bingkai Kotak**: Menghapus styling tombol form sekunder yang tebal dari judul kegiatan di baris tabel. Diganti dengan tautan interaktif elegan yang memadukan tag kode ringkas monospace (`KGT-XXXX`), teks judul tebal responsif hover brand, serta baris pratinjau catatan lapangan yang proporsional.
- **Ringkasan Metrik KPI Real-Time (`.journal-metrics`)**: Ditambahkan 4 kartu metrik informatif berbasis data aktual di atas tampilan tabel Kegiatan:
  - *Total Kegiatan*: Akumulasi seluruh catatan kunjungan & koordinasi lapangan.
  - *Bulan Ini*: Volume kegiatan pada bulan berjalan (mis. Oktober 2026).
  - *Tindak Lanjut Tugas*: Jumlah kegiatan yang berhasil menghasilkan tugas eksekusi.
  - *Koordinasi Rapat*: Jumlah kegiatan yang terhubung langsung ke agenda pertemuan daring atau fisik.
- **Standarisasi Chip Relasi Semantik (`.relation-chip`)**: Memberikan tinggi dan radius kapsul terpadu dengan palet warna khusus untuk Gerai (indigo), Mitra (amber), Tugas Terkait (emerald dengan pill status mini), Tombol Tindak Lanjut (garis putus-putus interaktif), dan Tautan Google Meet/Zoom (`Gabung rapat ↗`).
- **Aksi Cepat "Buka" & "Hapus Filter"**: Tombol Buka di baris tabel diperhalus dengan ikon panah keluar modern, serta ditambahkan tombol instan `Hapus filter` di baris pencarian ketika filter sedang aktif.

## Perombakan visual dan fitur halaman Pencatatan (Anggota, Kas, Barang, Opname) — 4 Oktober 2026

- **Navigasi Tab Kapsul Modern (`.recording-tabs`)**: Diperbarui dengan ikon untuk setiap domain, badge hitungan data dinamis per buku, serta active indicator berbasis warna aksen brand yang tegas dan elegan.
- **Kartu Metrik KPI Informatif (`.recording-metrics`)**: Dilengkapi wadah ikon sirkular tematik, tipografi angka tabular besar tebal, serta sub-keterangan mikro yang memberikan konteks jelas pada setiap angka (misalnya rasio keaktifan anggota, total uang masuk/keluar terfilter, peringatan stok menipis/habis, serta akurasi audit fisik).
- **Filter Cepat Sekali Sentuh (`.quick-chips-row`)**: Ditambahkan chip filter instan di bawah kolom pencarian untuk setiap buku (Semua / Aktif / Nonaktif pada Anggota; Semua / + Masuk / - Keluar pada Buku Kas; Semua / Aman / Menipis / Habis pada Barang; Semua / Sesuai / Ada Selisih pada Stok Opname).
- **Pengalih Tampilan Ganda (`[ ☰ Tabel | ⊞ Kartu ]`)**: Manajer dapat beralih antara tampilan tabel terperinci atau tampilan kartu interaktif visual modern (`.operations-card-grid`).
- **Penyempurnaan Tampilan Tabel**: Menghilangkan border button kotak pada judul catatan; menambahkan monogram avatar inisial nama anggota, ikon arah kas masuk/keluar, ikon barang, dan kode chip bersih pada nomor anggota / SKU.
- **Tampilan Kartu Interaktif**:
  - Kartu Anggota: Menampilkan inisial avatar berwarna, nomor anggota, tanggal bergabung, nomor kontak (telepon), total simpanan/kas tercatat, dan tombol pintasan `+ Kas`.
  - Kartu Buku Kas: Menampilkan badge arah transaksi, nominal rupiah besar, tanggal, akun/kas gerai, dan relasi entitas anggota/barang.
  - Kartu Barang: Dilengkapi pengukur visual stok buku (*stock meter bar gauge*) terhadap batas minimum, estimasi nilai total, serta aksi cepat `+ Beli` dan `Opname`.
  - Kartu Stok Opname: Dilengkapi perbandingan berdampingan *Stok Buku vs Hitung Fisik*, badge selisih warna, nama pemeriksa, dan catatan temuan.

## Penyempurnaan tipografi input, perapian tombol linimasa, dan tampilan pencatatan modern — 4 Oktober 2026

- Normalisasi ketat hierarki tipografi input vs judul: teks nilai input, select dropdown, search input, dan formulir sprint dinormalisasi ke 13 px (`height: 38px`, `line-height: 1.4`), label kolom ke 12 px semibold, dan judul kartu/seksi ke 15.5–16 px bold. Ini meniadakan kesan teks input lebih besar atau tidak seimbang dibandingkan judul kartu di atasnya.
- Perapian tombol toolbar dan aksi linimasa (`TaskTimeline`):
  - Toolbar linimasa distandarisasi ke tinggi 38 px untuk tombol rentang (`.timeline-fit-button`), tombol `+ Tugas` (`.timeline-add-task-btn`), dan tombol modal jadwal lengkap dengan ikon `<Maximize2 size={13} />`.
  - Tombol aksi linimasa mobile disatukan ke grid 2-kolom seimbang (tinggi 40 px, radius 10 px) yang menyandingkan tombol "Layar Penuh Saham" dan tombol pergantian "Daftar Ringkas" / "Bagan Linimasa" secara rapi tanpa tumpukan tombol besar.
- Peningkatan daya tarik estetika tampilan Pencatatan (`Operations`):
  - Tab navigasi buku memakai gaya pill segmented melayang (`.recording-tabs`) dengan active indicator yang lembut.
  - Kartu buku pencatatan (`.notebook-index`) ditata dalam grid 2-kolom modern dengan spine warna pastel harmonis untuk 4 buku (Anggota, Kas, Barang, Opname), badge data, dan tombol aksi terintegrasi (Tambah & Buka Buku).
  - Kartu ringkasan metrik FinTech (`.recording-metrics`) dipercantik dengan border atas berwarna semantik (emerald untuk kas masuk/simpanan, rose untuk pengeluaran, blue untuk kas bersih/total, amber untuk stok menipis/selisih opname) serta gradien lembut di belakangnya.
- Perbaikan tumpang-tindih ikon kaca pembesar dan placeholder pencarian proyek (`Projects`): input pencarian proyek (`.project-search-box`) diberikan `padding-left: 38px !important;` dan ikon kaca pembesar diposisikan terpusat secara vertikal (`top: 50%; transform: translateY(-50%); z-index: 2`), menghilangkan tumpukan teks placeholder ("Cari nama atau tujuan proyek...") di belakang ikon.
- Eliminasi galat hidrasi HTML anchor bersarang (`<a>` di dalam `<a>`): kartu agenda rapat (`Dashboard`) diubah dari pembungkus `<Link>` yang menampung tombol langsung tautan rapat daring (`<a className="btn-join-meeting-direct">`) menjadi kontainer `<div className="next-meeting">` yang menampung tautan utama `<Link href="/rapat" className="next-meeting-link">` dan tautan tombol gabung rapat sebagai elemen sejajar (siblings), menghilangkan peringatan konsol hidrasi Next.js/React secara tuntas.
- Hilangkan bayangan ganda (ghost frame) modal dialog: `<dialog>` pembungkus kartu modal dibuat transparan dan tanpa border ganda pada `dialog.ui-modal.sprint-modal-dialog` dan `dialog:has(.sprint-modal-card)`.
- Rapikan formulir rutinitas harian (`Dashboard`): input jam, judul, dan tombol Tambah disusun dalam satu baris fleksibel tanpa celah kosong; placeholder disempurnakan.
- Ganti tombol hapus rutinitas dan tombol tutup modal menjadi varian `ghost` yang minimalis dengan hover responsif; scrollbar daftar rutinitas diganti dengan scrollbar ramping tematik 5 px.
- Hapus `outline-offset` mengambang pada input dan textarea terfokus; ganti dengan ring fokus halus terpadu berbasis `box-shadow` dan `border-color`.
- Bersihkan border berulang pada bilah pencarian (`.workspace-search-field`) dan input formulir proyek cepat (`.inline-creator-field`).
- Hapus ikon kalender duplikat pada baris Tenggat drawer tugas (`TaskDetailDrawer`), isolasi penuh input tanggal native di `DateField`.
- Perbaiki pemotongan kata status tabel ("Rencan / a") dengan `white-space: nowrap !important;` serta sinkronisasi selektor pemicu dropdown.
- Tambahkan Mode Linimasa Horizontal ala Grafik Saham (`TaskTimeline`) untuk perangkat mobile: kanvas layar penuh dengan navigasi interval 1H/1M/1B, tombol Hari Ini, tombol sesuaikan rentang, tombol putar lanskap 90°, dan kolom nama tugas sticky.

## Audit popup berdata — 4 Oktober 2026

- Fixture development 21 domain membuka form tambah/ubah, detail tugas, sprint, jadwal, CSV, rutinitas dan konfirmasi laporan tanpa panggilan database. Draft/preferensi QA terpisah.
- Perbaiki form panjang, target tombol kecil, input rutinitas, label tanggal, Escape popup bertingkat dan filter pencarian. Modal native dipakai CSV/rutinitas/konfirmasi laporan; fokus menu ponsel dibatasi/dipulihkan dan bantuan diberi padding.
- Matriks ukuran dan batas pengujian dicatat di docs/QA-POPUP.md; tidak menandai seluruh kombinasi/perangkat selesai.
- 242 tes/35 berkas, typecheck, lint/lint:ui, build, check:ui dan audit sumber 94/94 lulus.

## PLAN-ASTRA — keadaan kosong pencatatan — 4 Oktober 2026

- Satukan keadaan kosong empat buku dengan EmptyState. Opname tanpa barang menyediakan tautan Daftarkan barang sesuai prasyarat tombol Tambah.
- Tambahkan regresi petunjuk Opname. Enam halaman pencatatan/gerai tanpa luapan pada 360 px setelah isi tampil; Opname juga 768/1024/1440.
- 196 tes, typecheck, lint/lint:ui, build, check:ui dan audit sumber 91/91 lulus.

## PLAN-ASTRA — keadaan kosong dan kartu Hari Ini — 4 Oktober 2026

- EmptyState netral menyatukan Beranda/Hari Ini; daftar proyek seluruhnya diarsipkan tidak lagi kosong tanpa penjelasan.
- Judul tugas membungkus pada ponsel, geometri centang memakai primitive, input cepat memiliki label dan Enter pada aksi anak tidak membuka detail.
- 195 tes/31 berkas, typecheck, lint/lint:ui, build dan audit sumber 91/91 lulus. Hari Ini lima lebar tanpa overflow; target sel kalender sempit masih terbuka.

## PLAN-ASTRA — selector tanpa pemanggil dan label form — 4 Oktober 2026

- Pangkas CSS tanpa pemanggil berdasarkan string AST, dengan pengecualian kelas dinamis dan selector kompleks. Field umum Editor memiliki label/id bersama.
- Warna proyek bawaan kembali memakai hex valid dari skema; tes regresi mencegah variabel CSS masuk input color.
- 191 tes, typecheck, lint/lint:ui, build, check:ui, audit sumber 91/91 lulus. Galeri delapan lebar tanpa overflow; QA halaman berdata terhenti karena sesi kedaluwarsa.

## PLAN-ASTRA — kontrol tampilan dan legenda — 4 Oktober 2026

- Satukan pilihan tampilan, legenda donut/radar dan indikator kesiapan. Tombol EmptyState memakai Button. Galeri memeriksa warna aktif tanpa menyimpan preferensi.
- 190 tes, typecheck, lint, penjaga UI, audit sumber 91/91 dan build lulus. Kontras primer lima tema melampaui 4,5 pada terang/gelap.

## PLAN-ASTRA — geometri legacy dan Gantt sempit — 4 Oktober 2026

- Normalisasi font/radius numerik dan alias ke token bersama. Perbaiki filter rentang tugas, status aktif, dan susunan tanggal Gantt pada layar sempit.
- 187 tes, typecheck/lint dan build lulus; tugas 320/768 diperiksa tanpa scrollbar horizontal halaman.

## PLAN-ASTRA — pembersihan CSS awal — 4 Oktober 2026

- Hapus deklarasi identik dan selector statistik lama; pertahankan konteks media dan aturan gabungan.
- Persempit pengecualian stylelint important hanya pada blok aksesibilitas. Semua pemeriksaan dan 187 tes lulus.

## PLAN-ASTRA — animasi saat terlihat — 4 Oktober 2026

- Observer grafik, count-up statistik, animasi kartu/tombol dan reduced-motion terpusat. Hapus duplikat permukaan dialog di CSS baru.
- Perbaiki N menggunakan event pembuat tugas yang sudah tersedia.

## PLAN-ASTRA — interaksi tugas — 4 Oktober 2026

- Pintasan keyboard, preferensi panel, swipe tugas dan Batalkan setelah penyimpanan status/tanggal.
- 185 tes/28 berkas, typecheck, lint, penjaga UI dan build lulus; pengujian sentuh fisik tetap terbuka.

## Standarisasi konsistensi geometris tombol dan dropdown ("Kotak dengan Sedikit Rounded") — 4 Oktober 2026

- Standarisasikan geometri seluruh tombol dan pemicu dropdown menjadi **"kotak dengan sedikit rounded"** (`border-radius: 10px` standar, `8px` ringkas/tabel), menghilangkan inkonsistensi bentuk oval kapsul (`9999px`), lingkaran/telur terdistorsi (`50%`), dan tombol yang saling bertabrakan gaya.
- Perbaiki tombol tutup formulir modal dan drawer (`.editor-close-btn`, `.close-btn`, `.close-drawer-btn`, `.action-modal-close`):
  - Kunci dimensi simetris 36 × 36 px dengan `aspect-ratio: 1 / 1 !important`, padding 0, dan `border-radius: 10px !important;`.
  - Kecualikan pemilih tombol tutup pada `globals.css` dari aturan universal `min-height: 44px` agar tombol `[ ✕ ]` tidak lagi tertarik vertikal menjadi bentuk telur/oval gepeng seperti yang dilaporkan pengguna.
- Selaraskan seluruh pemicu dropdown (`.custom-select-trigger`, elemen `select` asli, `.task-status-custom-select .custom-select-trigger`, `.drawer-status-select-wrap .custom-select-trigger`):
  - Ganti nilai `var(--radius-pill)` dan `9999px` menjadi `border-radius: 10px !important` untuk formulir dan filter, serta `8px !important` untuk baris tabel dan properti drawer ringkas.
  - Hilangkan perbedaan antara dropdown berbentuk kapsul lonjong dengan dropdown kotak.
- Selaraskan seluruh tombol aksi (`.primary`, `.button`, `.btn-mark-complete`, `.btn-editor-cancel`, `.btn-editor-submit`, `.btn-drawer-action`, `.btn-add-submission-quick`, `.btn-clear-range`, `.btn-apply-range`, `.btn-submit-comment`):
  - Seragamkan radius sudut menjadi `10px !important`, dengan tombol mini (`.btn-add-subtask`, `.btn-tiny-save`, `.btn-tiny-cancel`, `.btn-quick-add-day`) memakai `8px !important`.
  - Harmonisasikan token `--radius-pill` dan `--btn-radius-pill` di `:root` dari 9999 px menjadi 10 px.
- Selaraskan badge, chip, dan tag metadata (`.prop-user-chip`, `.prop-text-badge`, `.project-badge`, `.priority-badge`, `.card-priority-pill`, `.submission-status-pill`):
  - Terapkan geometri rounded-rectangle modern (8 px / 6 px) yang selaras dengan bahasa desain Notion/Linear.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Standarisasi jarak komponen dan tombol di seluruh halaman — 4 Oktober 2026

- Perlebar jarak tombol aksi inline (`.inline-actions`, `.title-edit-form`, `.desc-edit-form`):
  - Berikan celah 14 px antar tombol `Batal` dan `Simpan`, tinggi sentuh nyaman 38–42 px, radius membulat 12 px, margin atas 14 px dari input, dan margin bawah 26–28 px sebelum kartu berikutnya sehingga tombol tidak lagi menempel rapat atau menimpa kartu di bawahnya.
- Berikan jarak napas lega antar kelompok tombol di bilah atas drawer (`.drawer-top-bar`):
  - Celah 10–12 px antar kelompok kontrol kiri (`Tandai Selesai`, `Jadwal`, `Formulir`) dan kanan (`[ < | > ]`, `Hapus`, `Tutup`), serta garis pembatas berjarak 18–20 px di bawahnya.
- Harmonisasikan margin bawah dan celah antar komponen di seluruh halaman:
  - **Beranda/Dashboard**: tajuk halaman 24–28 px, kartu ringkasan 24–28 px dengan celah 16–18 px, kartu Agenda Rapat 26–28 px, dan bilah filter fokus tugas 20 px dengan celah 8 px.
  - **Panel Detail Tugas**: properties grid 22–26 px, kotak deskripsi 24–26 px, tautan bukti hasil 24–26 px, subtugas 26–30 px dengan celah pohon 8–10 px, dan riwayat aktivitas 24–26 px.
  - **Halaman Proyek & Form**: cover hero 28 px, kartu kpi 24–28 px, navigasi tab 24–28 px, dan tombol aksi form (`.form-actions`, `.editor-form-actions`) dengan padding atas 18–20 px dan celah 12–14 px.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Overhaul panel detail tugas (Hierarki Judul, Properties Grid Notion-Style, dan Top Bar) — 4 Oktober 2026

- Perbaiki hierarki visual TaskDetailDrawer: pindahkan judul tugas (`.task-detail-title`) ke posisi teratas tepat di bawah badge kode tugas (`TGS-F2A4`) dan link proyek. Menghilangkan masalah dropdown status/prioritas raksasa 100% yang sebelumnya mendominasi dan mendorong judul ke bawah secara canggung.
- Rombak properti tugas menjadi **Unified Properties Grid** ala Notion/Linear (`.drawer-properties-grid`):
  - **Status & Prioritas**: Ditampilkan sebagai interactive pill badges ringkas dengan warna pastel semantik (rencana, proses, selesai, dibatalkan; rendah, normal, tinggi, mendesak) tanpa melebarkan kontainer menjadi kotak input teks kaku.
  - **Ikon Bendera**: Perbaiki tata letak ikon bendera prioritas (`.priority-flag-icon`) dari posisi absolute yang menimpa teks menjadi flex item statis dengan jarak aman 6 px (`🚩 Tinggi`).
  - **Tenggat**: Integrasi langsung sebagai baris properti kalender ringkas berlatar pill (`.date-prop-editable`).
  - **Penanggung Jawab & Dibuat Oleh**: Ganti kartu raksasa yang boros ruang dan avatar lingkaran warna-warni mencolok dengan chip pengguna minimalis bernuansa profesional (`.prop-user-chip`).
  - **Metadata Sekunder**: Baris rapi untuk perulangan jadwal, mitra/kontak, dokumen terlampir, dan tautan rapat daring.
- Rapikan bilah kontrol atas (`.drawer-top-bar`):
  - Satukan tombol navigasi tugas sebelumnya dan berikutnya ke dalam grup conjoined segmented pill (`.drawer-nav-group`).
  - Selaraskan tombol `Tandai Selesai`, tombol aksi `Jadwal` dan `Formulir`, serta tombol bahaya `Hapus` dan tombol tutup `[✕]`.
- Posisikan kotak catatan deskripsi (`.drawer-description-box`) tepat di bawah daftar properti sebagai kanvas catatan yang bersih dan proporsional.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Overhaul estetika kartu dashboard (Stat Cards, Agenda Rapat, dan Filter Pills) — 4 Oktober 2026

- Transformasi 4 kartu ringkasan dashboard (`.dash-stat-card`): ganti tampilan putih polos dan flat membosankan dengan sistem tema 4 pilar pastel yang kaya dan hidup:
  - **Progres tugas (`variant="emerald"`)**: gradien hijau sage/emerald lembut, ring progres melingkar SVG terintegrasi, dan aksen batas hijau halus.
  - **Tugas aktif (`variant="blue"`)**: gradien biru pastel elegan (`#f0f9ff` ke `#e0f2fe`), ikon checklist berwadah rounded-square bercahaya, dan tipografi angka tebal.
  - **Tugas terlambat (`variant="rose"`)**: gradien merah muda/rose pastel yang hangat dan tegas (`#fff1f2` ke `#ffe4e6`), ikon peringatan rose, dan teks penjelas kontras tinggi.
  - **Rapat hari ini (`variant="purple"`)**: gradien lavender/ungu pastel anggun (`#faf5ff` ke `#f3e8ff`), ikon kalender berwadah ungu, dan status netral.
- Sentuhan visual modern premium: border melengkung halus 20 px (`border-radius: 20px`), highlight kaca atas (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7)`), micro-animation hover melayang (`transform: translateY(-3px)`), dan adaptasi penuh dark mode.
- Rombak total kartu Agenda Rapat (`.next-meeting`): ganti kartu putih polos yang kosong dengan executive agenda card berikon kalender 46 px frosted (`.meeting-icon-box`), badge pill status pertemuan, format jam berlatar pill, dan tombol navigasi panah interaktif dengan efek hover meluncur.
- Desain ulang bilah filter fokus tugas (`.focus-filters`): terapkan gaya segmented pill bar modern ala iOS/Linear dengan tab aktif berlatar putih melayang (`box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08)`), badge penghitung pill (`.focus-filter-count`), dan transisi mulus.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Koreksi jarak atas mobile, overlap tombol, dan penataan dock navigasi — 4 Oktober 2026

- Perbaiki jarak mepet bagian atas ponsel: perbesar padding atas `.manager-main` dari 8 px menjadi 22 px pada viewport mobile (`@media (max-width: 767px)`), dan normalkan margin tajuk halaman (`.page-heading`) agar tidak menempel rapat pada garis batas header sticky.
- Cegah overlap dock navigasi melayang terhadap kartu bawah: perbesar padding bawah `.manager-main` menjadi `calc(135px + env(safe-area-inset-bottom, 0px))` sehingga kartu statistik, ringkasan, dan konten bagian bawah dapat digulir bebas tanpa terpotong atau tertutup di balik `.manager-dock`.
- Tata ulang header Beranda (`.home-heading`): pindahkan chip tanggal (`.home-date-chip`) dari kontainer grid tombol aksi (`.home-heading-actions`) ke baris judul (`.home-eyebrow-row`). Tombol `+ Buat tugas` dan `Catat kegiatan` kini menjadi grid 2-kolom seimbang (`1fr 1fr`) 44 px tanpa elemen tanggal yang anjlok atau tampak seperti tombol pecah di bawahnya.
- Rombak tata letak kartu peringatan `.follow-up-compact-bar` pada layar ponsel: gunakan layout 2-baris yang rapi (baris atas: ikon peringatan dan lencana jumlah; baris bawah: tombol pill `Rincian (X)` di kiri dan tautan `Semua ↗` di kanan dengan pemisah garis halus), menghilangkan tabrakan teks dan pembungkusan canggung.
- Bersihkan bilah navigasi atas ponsel (`.manager-topbar`): sembunyikan label teks redundant "Menu" pada tombol burger agar menjadi tombol ikon 36 px bersih, sembunyikan garis miring pemisah yatim (`.topbar-crumb-sep`), hapus kapsul kosong tanpa teks, dan tampilkan nama halaman aktif (`.manager-location`) secara proporsional.
- Nonaktifkan indikator dev floating Next.js (`devIndicators: false` pada `next.config.ts`) agar lencana lingkaran hitam 'N' tidak menimpa tombol dock navigasi Beranda di pojok kiri bawah layar ponsel.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Overhaul tampilan detail proyek (Hero, Properties Grid, Tab Bar, Next Actions) — 4 Oktober 2026

- Rombak total header detail proyek (`.project-cover`): ganti kartu putih polos yang kosong dengan hero card bernuansa gradien lembut, aksen border brand atas 4 px, bayangan melayang elegan, dan tata letak berdampingan untuk simbol proyek, kode tag (`OPS`), status pill semantik, judul h1, serta tombol `Ubah proyek` berikon `<Edit2 />`.
- Ganti baris properti teks padat yang mepet (`Status`, `Prioritas`, `PIC`, `Target`, `Tugas`) menjadi grid kartu atribut modern 4-kolom (`.project-properties-grid`): setiap kartu memiliki ikon, label caption uppercase, dan value pill semantik (prioritas berwarna semantik, penanggung jawab dengan ikon user, target tanggal, total tugas).
- Desain ulang progress meter proyek: bukan lagi garis tipis terisolasi dengan teks 0% melayang di ujung kanan, melainkan kartu progres terintegrasi dengan judul, fraksi selesai (`X / Y tugas selesai`), lencana persentase emerald, dan bar progres hijau emerald bercahaya halus.
- Perbarui navigasi bagian proyek (`.project-section-nav`): ubah deretan link teks polos menjadi tab segmented modern berikon (Tugas, Catatan, Milestone, Dokumen, Keputusan, Kendala) dengan lencana penghitung pill yang rapi.
- Perbaiki tombol kembali `Semua proyek`: ubah tombol teks polos menjadi breadcrumb nav berikon `<ArrowLeft />` dengan transisi hover halus.
- Perbaiki kartu `Langkah berikutnya`: ganti tampilan default `<details>` kaku dengan kartu interaktif berikon `<Sparkles />`, lencana tugas aktif, chevron animasi rotasi, dan daftar tugas berstatus dengan tautan rapi.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build sukses (`npm run build`).

## Overhaul dropdown, progress bar subtugas, inline-actions, dan dashboard mobile — 4 Oktober 2026

- Perbaiki `.subtasks-progress-bar .bar-fill` dan `.subtask-mini-fill`: ganti garis diagonal hitam kaku dengan gradien hijau emerald modern (`linear-gradient(90deg, #10b981 0%, #059669 100%)`), pendaran bayangan lembut, animasi transisi lebar halus, serta lencana persentase pill pastel emerald.
- Beri jarak aman pada `.inline-actions`, `.title-edit-form`, `.desc-edit-form`, dan `.drawer-description-box`: tambah margin bawah 18–20 px dan jarak atas 8–12 px sehingga tombol aksi tidak mepet atau bertabrakan dengan kartu dan konten di bawahnya.
- Rombak total menu dropdown (`.custom-select-menu` dan `.custom-select-option`): hilangkan border kotak dan margin bawaan tombol opsi, terapkan reset penuh (`all: unset`), sudut membulat 8 px saat hover, latar hijau lembut aktif, tanda centang emerald, dan bayangan popover mengambang yang bersih (`box-shadow: 0 16px 36px -4px rgba(0,0,0,0.14)`).
- Ganti select bawaan OS pada status/prioritas TaskDetailDrawer dan tabel Records dengan komponen custom `Select`: status dan prioritas kini tampil sebagai pil anggun dengan warna semantik (rencana, dikerjakan, selesai, dibatalkan; rendah, normal, tinggi, mendesak) tanpa melebarkan kontainer menjadi tumpukan kotak kaku.
- Rombak kedalaman mobile dashboard: ganti kartu statistik flat dengan gradien pastel bernuansa (biru lembut, emerald, amber, dan sage), bayangan halus, cincin fokus aktif, tipografi angka yang tegas, serta tata letak bar Perlu Perhatian yang terstruktur.
- Proteksi proporsi kontrol kecil ponsel: cegah checkbox subtugas bundar (`.subtask-round-check`) dan tombol ikon/tutup (`.btn-icon`, `.close-drawer-btn`) terdistorsi atau memanjang oleh aturan target sentuh 44 px.
- Verifikasi lengkap: 171 tes dalam 23 berkas lulus (`npm test`), 0 kesalahan TypeScript (`npm run typecheck`), dan Next.js production build berhasil (`npm run build`).

## Koreksi kepadatan dan font mobile — 3 Oktober 2026

- Satukan skala judul/control mobile lewat token global; hapus prioritas tipografi dan aturan mobile yang bertentangan. Input/dropdown 14 px, judul halaman/bagian/kartu 20/17/15 px; target sentuh tetap 44 px.
- Perbaiki basis flex paragraf intro tugas yang menjadi tinggi 200 px pada layout kolom; ringkas tombol detail. Rapikan gutter/kartu dashboard, ringkasan Hari Ini dua kolom dan label proyek panjang.
- Toolbar linimasa menjadi grid ringkas dengan tanggal lengkap; kalender membuka ke bawah sesuai koreksi pemilik. Indikator simpan subtugas menggunakan hijau tema, termasuk dark mode.
- Verifikasi 171 tes/23 berkas, typecheck, lint, build dan audit 74 sumber. Fixture 22 halaman dan 21 form pada 360 px dalam dua tema; semua input form terlihat 14 px. Lima halaman inti diperiksa pada 360/393/768/1024/1440 px; linimasa juga 338 px. Tidak memeriksa perangkat fisik, mengubah data cloud atau deployment; perubahan awal next-env.d.ts dipertahankan.

## Rapikan mobile, kontrol dan tema — 3 Oktober 2026

- Satukan keluarga font, ukuran input/dropdown dan teks tombol ke token global; bersihkan aturan kontrol lama yang bertentangan. Pilihan dropdown lebih tenang dan membungkus label panjang; warna tombol mengikuti tema.
- Semua input tanggal memakai kalender bersama yang mengutamakan atas, menjaga batas tanggal serta nama/value form, dan mengikuti batas panel bergulir. Perbaiki luapan skeleton, matriks risiko, tabel tugas dan aksi buku pada layar sempit.
- Rapikan kartu/meta proyek dan ringkasan dua kolom ponsel, jarak inline-actions, panduan Onboarding Manajer empat langkah, serta checklist subtugas dengan indikator simpan kecil dan penguncian selama mutasi.
- Verifikasi: 171 tes/23 berkas, typecheck, lint, build, audit sumber 74/74 dan diff-check. Fixture 22 halaman/21 form pada 360 px dalam dua tema; Proyek/Panduan/Risiko/Tugas pada 360/768/1024/1440 px. Kalender detail 360 px tidak terpotong/meluap. Belum merupakan UAT semua data/interaksi atau perangkat fisik; tidak mengubah database/hosting. Perubahan awal next-env.d.ts dipertahankan.

## Samakan origin pengembangan lokal — 3 Oktober 2026

- Perbaiki konfigurasi lokal yang masih memakai localhost ketika browser/server memakai 127.0.0.1:3000. Selaraskan .env.example, README dan panduan Supabase; host, protokol dan port wajib sama.
- Probe endpoint PIN dengan JSON tidak sah: origin 127.0.0.1 diterima sampai validasi JSON (400), localhost dan origin asing ditolak (403). Tidak memakai PIN, mencatat percobaan login, mengubah database, konfigurasi hosting atau aturan keamanan server.
- Verifikasi: 167 tes/22 berkas, typecheck, lint, build dan diff-check lulus. Perubahan awal next-env.d.ts dipertahankan; .env.local tetap tidak masuk Git. Login memakai PIN pengguna belum diuji.

## Audit panduan Markdown — 3 Oktober 2026

- Gabungkan rancangan dashboard ke DESAIN-ANTARMUKA dan peta rute/API ke ARSITEKTUR; hapus dua dokumen duplikat serta dua rencana program lama yang sudah digantikan. Riwayat tetap tersedia di Git; fixture dan cadangan pribadi dipertahankan.
- Ringkas STATUS, serah terima dan checklist agar membedakan keadaan aktif, bukti lokal, konfirmasi cloud dan pekerjaan terbuka. Lengkapi indeks seluruh panduan, perbaiki lokasi tes, CSS aktif, domain data, tema dan langkah instalasi/reset.
- Verifikasi: 21 panduan terindeks, tautan lokal dan rujukan kode literal valid; 167 tes/22 berkas, typecheck, lint, build, audit sumber dan diff-check lulus. Build diulang setelah kendala akses next-env.d.ts di sandbox; perubahan awal file itu dipertahankan.
- Paket ini hanya mengubah dokumentasi; tidak mengubah UI, data cloud atau menjalankan deployment.


## Perapian struktur folder — 3 Oktober 2026

- Pindahkan 31 modul fitur ke 10 folder domain dan 22 berkas tes ke unit/UI/database/keamanan. Enam kontrak/form lintas-domain tetap di akar features. Komponen bersama, lib/server, fixture, skrip, SQL, CSS, dan rute tetap pada tempatnya.
- Sesuaikan 131 rujukan modul (impor, impor dinamis, mock tes dan fixture) tanpa barrel/shim kompatibilitas. Tidak ada perubahan isi bisnis, tampilan, atau kontrak API.
- Perbarui peta arsitektur, README, pemetaan file, dan skill clean-code agar merujuk lokasi sebenarnya. Verifikasi: 167 tes/22 berkas, typecheck, lint, build produksi, audit sumber (71/71), dan diff-check lulus. Pemeriksaan isi 53 berkas yang dipindahkan tidak menemukan perubahan selain rujukan modul. Tidak ada perubahan UI/CSS, SQL cloud, atau deployment; tidak ada audit visual baru pada paket pemindahan ini.


## Pembersihan lokal dan tweak Perlu Perhatian — 3 Oktober 2026

- Hapus 14 screenshot lama dalam artifacts (tidak dirujuk runtime/dokumen), folder kosong src/app/__preview, dan cache TypeScript yang dapat dibuat ulang. Audit sumber 71/71 terjangkau; sumber aktif, cadangan, arsip, konfigurasi, dependensi, dan SQL dipertahankan.
- Pemilik memilih dashboard aplikasi saat ini dan meminta tweak pada Perlu Perhatian di atas. Rancangan HTML baru dibatalkan/dihapus; arahan terbatas tercatat di RANCANGAN-DASHBOARD.md.
- Banner memakai permukaan/border netral; gradien merah/hijau dan margin tambahan keadaan kosong dihapus. Ringkasan mempertahankan jumlah/mendesak. Jenis/alasan tampil pada Rincian; ponsel menyembunyikan cuplikan judul panjang agar bar lebih pendek. Tautan sumber tetap tersedia dalam rincian.
- 167 tes/22 berkas lulus dengan satu worker; typecheck, lint, build produksi (tanpa route pratinjau), audit sumber, dan diff-check lulus. Fixture terang pengingat diperiksa pada 360/768/1024/1440 px tanpa overflow horizontal. Rincian dan keadaan kosong diperiksa pada ponsel; UAT data nyata dan tema gelap belum diperiksa pada paket ini. Tidak ada cloud SQL atau deployment.


## Pembersihan sumber dan perbaikan state — 3 Oktober 2026

- Hapus tiga komponen tidak digunakan runtime (Burnup, InfluenceMap, DateRangePicker) dan ekspor ProgressRing mati; tes widget DateRangePicker dilepas. Audit sumber: 71/71 berkas terjangkau, tanpa kandidat tersisa. Arsip, cadangan, SQL, dan dependensi aktif dipertahankan.
- Pagination menyimpan halaman/cursor tambahan dalam cache, deduplikasi ID memakai Set, menolak permintaan ganda, dan mengabaikan galat scope lama. Cache dibatasi 24 lingkup; kunjungan ulang tetap melakukan refresh server.
- Proyek, laporan, pengaturan, dan Gantt memakai pemuatan modul terpisah dengan skeleton. Tidak ada klaim angka peningkatan kecepatan karena benchmark belum dilakukan.
- Rumus subtugas disatukan di lib/progress.ts; progres harian/periode mengecualikan pembatalan. Tugas tanpa tenggat tidak dinilai terlambat. Nama koperasi pada shell berasal dari profil, dengan fallback netral. Kop/tanda tangan laporan memakai identitas snapshot; alamat/lokasi hardcoded dihapus.
- Toolbar harian tidak melebar keluar layar 360 px, kontrol mode/tambah/arah hari minimal 44 px. Tema/style acuan tetap dipakai. Pemeriksaan fixture terang kartu periode dan tugas harian pada 360/768/1024/1440 px; tidak ada overflow horizontal halaman. Route fixture dihapus. Ini bukan UAT data nyata atau audit seluruh modul/tema.
- Verifikasi: 166 tes/22 berkas lulus dengan satu worker; percobaan dua worker bersamaan verifikasi lain timeout pada dua tes UI. Asersi/batas waktu tidak diubah. Typecheck, lint, build produksi, audit sumber, dan diff-check lulus. Tidak ada SQL cloud atau deployment.


### Tweak dashboard, mempertahankan style acuan (3 Oktober 2026)

- Typecheck, lint tanpa galat/peringatan, build produksi, serta pemeriksaan whitespace lulus; route pratinjau tidak masuk produksi.

- Ikuti koreksi pemilik: pertahankan style/navigasi cabang `codex/workspace-redesign`, batalkan penggantian CSS total, dan hapus folder eksperimen/pratinjau sementara.
- Ringkas daftar tugas/kegiatan menjadi tiga catatan awal; grafik/rutinitas ditutup secara bawaan. Hilangkan duplikasi peringatan stok dan perbaiki pengingat pada ponsel.
- Tambah pengingat rapat tujuh hari, sematan catatan opsional di Perlu Perhatian, serta langkah berikutnya opsional pada detail proyek. Jumlah/ringkasan tetap mengikuti data yang dimuat.
- 164 tes/22 berkas lulus dengan dua worker. Pemeriksaan visual dashboard memakai fixture, bukan data nyata, pada 360/768/1024/1440 px. Audit lengkap semua modul/tema dan UAT masih terbuka.

### Lanjutan redesain: navigasi, dialog, dan state (3 Oktober 2026)

- Perbaiki galat lint dan hapus `any`/impor mati; scope tugas mengikuti URL, query tampilan mempertahankan filter lokal, field detail mengikuti tugas terpilih, dan cache scope lama tidak tampil saat berpindah scope.
- Satukan tablet 768–1023 px/rel 76 px dan desktop mulai 1024 px. Hapus aturan tablet ganda; beri nama aksesibel pada navigasi ciut dan inert pada menu ponsel tertutup.
- Ganti modal target periode menjadi dialog native; cegah penutupan selama penyimpanan, rapikan form ponsel, dan pertahankan galat. Navigasi detail tugas dikunci selama menyimpan.
- Validasi preferensi rutinitas, pertahankan konfigurasi kosong, abaikan centang rutinitas yang dihapus, dan simpan pilihan selama sesi jika storage browser menolak penulisan.
- Delapan tes regresi baru ditambahkan: 159 tes/21 berkas lulus dengan dua worker; typecheck, lint penuh (0 galat/0 peringatan), dan build lulus. Percobaan worker bawaan mengalami timeout pada tes UI berbeda; batas waktu tes tidak dilonggarkan. Audit visual empat ukuran masih tertahan oleh timeout browser; tidak ada klaim UAT/perangkat baru atau deployment produksi.

### Redesain ruang kerja dan konteks proyek (3 Oktober 2026)

- Pertahankan konsolidasi stylesheet yang sudah ada; perbarui palet netral/hijau lembut, sidebar arang, radius, kontrol, kartu, tab, topbar, dan hierarki judul Beranda.
- Rapikan pencarian dengan penyaring jenis, pencocokan nama proyek, konteks hasil, dan keterangan cakupan data yang dimuat.
- Tambah pintasan bagian detail proyek; perbaiki relasi dokumen, keputusan rapat, dan kendala melalui referensi tugas serta tautan ke sumber.
- Verifikasi: 151 tes, typecheck, build, dan lint khusus berkas fitur baru lulus. Lint seluruh repo masih gagal pada 9 galat lama. Audit browser empat ukuran belum berhasil karena koneksi alat browser mengalami timeout; desain rinci seluruh modul dan UAT masih terbuka.

### Perbaikan Layout Semua Device & Sentuh Target (3 Oktober 2026)

- Hilangkan dua blok `!important` duplikat `.manager-main`/` .manager-sidebar` (Section 6.1 & 6.5) yang saling menimpa aturan rail tablet dan memicu overflow horizontal di 768px.
- Tambah `max-width: 100%; min-width: 0; box-sizing: border-box` pada `.skeleton-work-col` dan turunannya serta `.mobile-nav-cards-grid`/`.mobile-nav-card` agar tidak melebar melebihi viewport ponsel/tablet.
- Naikkan `min-height` `.home-action-btn` (Buat tugas/Catat kegiatan) menjadi 44px untuk orientasi mobile.
- Verifikasi: 0 horizontal overflow dokumen pada 11 halaman di 360/768/1024/1440px di browser nyata, 147 tes, `tsc --noEmit`, dan `next build` lulus.

### Pembersihan Aturan Layout Navigasi (3 Oktober 2026)

- Hapus blok media `@media (min-width: 768px) and (max-width: 1100px)` duplikat di `src/app/personal.css` yang menetapkan sidebar `width: 205px` dan `margin-left: 205px`. Blok tersebut tertimpa penuh oleh blok tablet-rail belakangan, sehingga jadi aturan mati.
- Pindahkan aturan `.home-grid` satu kolom di tablet ke blok tablet-rail yang menang agar beranda tidak sempit setelah rail 76px.
- Kini satu breakpoint = satu aturan untuk topbar, konten utama, dan sidebar; tidak ada dua blok media berrentang sama yang saling menimpa.
- Verifikasi: 147 tes (19 berkas), `tsc --noEmit`, dan `next build` lulus.

### Perbaikan Polished UI Layer (3 Oktober 2026)
- Tambah aturan padding-safe-area untuk bottom bar mobile biarkan labels tidak *clip*; safe-area-inset-bottom.
- Sempurna follow-up compact bar: wrap tepat, badge overflow-wrap break-word, actions fleksibel tanpa truncasi.
- Sempurna stat KPI: padding & gap card mobile lebih nyaman; ring tetap, card height stabil.
- Focus-visible ring bersih: `2px solid var(--brand)` pada semua elemen interaktif.

### Rombak Total Tampilan Agenda Kalender: Eliminasi Header Ganda & Kartu Tugas Modern Elegan (3 Oktober 2026)

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

### Penataan Ulang Kartu Tugas Papan (Scrum/Kanban) Lebih Efisien, Rapi & Elegan (3 Oktober 2026)

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

### Penyempurnaan Detail Tugas: Dropdown Prioritas Rapi, Kartu Bukti Pengumpulan Bersih & Konsistensi Kotak Centang (3 Oktober 2026)

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
# 4 Oktober 2026 — PLAN-ASTRA fase 1

Audit UI yang dapat dibuat ulang mencatat seluruh kontrol JSX beserta baris, rute/overlay dan metrik CSS. Baseline dan batas pemeriksaan ada di docs/LAPORAN-ASTRA.md. Seluruh 171 tes, typecheck, lint, build dan audit sumber lulus.

# 4 Oktober 2026 — PLAN-ASTRA fondasi token

Token geometri, motion dan warna semantik memakai sumber tema aktif. Penjaga stylelint berlaku untuk CSS baru; legacy masih dilaporkan terpisah. 171 tes, typecheck, lint, lint:ui dan build lulus.

# 4 Oktober 2026 — PLAN-ASTRA kontrol bersama

Migrasikan kontrol form/tombol ke pustaka UI, satukan pemicu tanggal dan navigasi tanggal, ekstrak dock lima item, serta gunakan permukaan dialog bersama. Hapus gaya tanggal/dock yang tidak dipakai; cegah gaya elemen legacy menimpa primitive baru. 175 tes dan pemeriksaan statis/build lulus; galeri mobile terang/gelap serta Beranda 360/768 diperiksa.

# 4 Oktober 2026 — PLAN-ASTRA kartu dashboard

Empat statistik memakai permukaan netral dan ikon tint, baris terlambat memakai badge, serta layout dashboard menyesuaikan lebar. Dropdown gelap mengikuti token aktif. 175 tes dan pemeriksaan statis/build lulus; Beranda empat lebar terang serta gelap 1440 diperiksa.

# 4 Oktober 2026 — PLAN-ASTRA drag sentuh

Ganti HTML5 drag papan tugas/kegiatan dengan handle Pointer Events, long-press, overlay, auto-scroll dan pembatalan. Tambahkan alternatif dropdown pemindahan dan galat kegiatan yang terlihat. 181 tes dan pemeriksaan statis/build lulus; drag mouse fixture browser terverifikasi. Perangkat sentuh fisik belum diuji.
