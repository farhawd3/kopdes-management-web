# Status produk — 4 Oktober 2026

Empat anotasi lanjutan selesai: footer Gerai simetris, Jurnal menjadi kartu pada ponsel, metadata kegiatan Beranda tidak bertumpuk dengan tombol rapat, dan grafik status memakai legenda dua kolom pada ponsel. 256 tes/42 berkas, TypeScript, ESLint dan build lulus. QA terang pada 360/383/768/1024/1440 px; pemeriksaan gelap tambahan belum lengkap karena sesi browser terputus. Rincian di bagian lanjutan QA-ANOTASI.md. Audit UI tetap terbuka: 111 temuan CSS legacy dan enam kontrol mentah.

Perbaikan 15 anotasi browser: bantuan form dilipat, banner buku dihapus, padding textarea global, kartu/tabel/aksi ditata, + Kas membuka domain kas dengan relasi anggota, tema pastel dan profil berbasis data. 256 tes/42 berkas, tipe, ESLint dan build lulus. QA 10 halaman pada 360/768/1024/1440 px serta form proyek empat lebar dua tema. Batas dan pemetaan: docs/QA-ANOTASI.md.

Koreksi penempatan riwayat: kini tab horizontal Proyek berjalan/Riwayat selesai & arsip pada /proyek?tab=riwayat, bukan menu sidebar. URL riwayat lama mengalihkan ke tab tersebut. Warna kartu memakai satu aksen status tanpa gradien pelangi/border berlapis; tanggal drawer satu kontrol, dropdown pindah status kartu papan dihapus, editor catatan diberi padding. 253 tes/41 berkas, tipe/ESLint/build lulus. QA kartu/tab empat lebar dua tema, tanggal drawer empat lebar, papan tanpa dropdown kartu dan padding catatan 16 px diverifikasi. Tidak ada mutasi DB.

Paket alur proyek: /riwayat-proyek menampung proyek selesai/arsip; sidebar berjalan menyembunyikannya, detail memuat semua status tugas dengan paginasi dan riwayat membuka daftar. Gantt fullscreen memakai portal dan rotasi hanya pada layar potret. Form tugas mendahulukan proyek/tugas mandiri, buku memisahkan hubungan opsional; panduan kontekstual dan kartu proyek/bubble diperjelas. Server menolak tugas baru pada proyek tertutup dan tidak membuat tugas berulang baru dari pembaruan historis. 253 tes/41 berkas, tipe, ESLint, build dan audit sumber 97/97 lulus. Cakupan/batas: docs/ALUR-PENGISIAN.md. Audit UI masih terbuka (tujuh kontrol mentah).

Paket tata letak terbaru: form rapat sempit tidak meluap, empat buku memakai kartu bawaan mobile dan filter terlihat, Gerai/Rapat serta opsi dirapikan, panduan berikon dan pilihan tema menjadi kisi dengan pratinjau lipat. 247 tes/39 berkas, tipe, ESLint, build dan audit sumber 95/95 lulus. QA 48 kombinasi enam halaman, 16 kombinasi opsi kartu, form rapat dan pratinjau pada empat lebar. check:ui (18 kontrol mentah) dan lint:ui (111 temuan legacy) tetap terbuka. Rincian: docs/QA-TATA-LETAK.md; panduan ikon: docs/IKON.md.

Koreksi lima screenshot pemilik selesai: fokus pencarian tunggal, kartu Gerai/rincian kesiapan lebih padat, font aksi sesuai konteks, form/tab mobile dan dropdown tidak terpotong, Hari ini sesuai tanggal Jakarta. QA fixture 21 domain 360 terang/gelap; lima kartu dan empat form pada empat lebar. 245 tes/37 berkas, tipe, ESLint, build dan audit sumber 94/94 lulus. lint:ui dan check:ui tetap gagal pada utang legacy checkout (termasuk 34 kontrol mentah). Rincian dan batasan: docs/QA-POPUP.md.

Penyempurnaan visual, konsistensi tipografi, perbaikan tampilan kegiatan, dan tampilan pencatatan modern:
- **Penyederhanaan Breadcrumb Topbar (`.manager-location-wrap`, `AppShell`)**:
  - **Meredakan Penonjolan Breadcrumb Lokasi**: Menghilangkan kapsul tebal berwarna latar hijau dan garis tepi (`border: 1px solid var(--line)`) pada breadcrumb topbar desktop. Menghilangkan titik hijau mencolok (`.manager-location-dot`) sehingga judul halaman (seperti "Daftar Tugas") hadir sebagai teks breadcrumb yang tenang, elegan, dan proporsional sesuai kaidah hierarki antarmuka modern.
  - **Minimalis Ghost Button Favorit (`.topbar-fav-btn`)**: Mengganti tombol favoriting berbahan `.ui-btn` menjadi ghost icon button ramping 22×22 px tanpa latar belakang/bingkai tebal, dengan bintang amber lembut saat aktif dan outline subtle saat idle.
- **Penanda Menu & Tampilan Aktif (`SegmentedControl`, `.database-views`, `.project-status-tabs`)**:
  - **Penanda Visual Tegas (Active Indicator)**: Menambahkan kapsul aktif terangkat (`background: var(--surface)`, `border: 1px solid var(--line)`, `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`), warna teks tegas (`var(--ink-heading)` bobot 700), dan ikon berwarna brand.
  - **Indikator Titik Aksen Menyala (`.ui-segmented-active-dot`)**: Menyematkan titik aksen hijau/brand (`•`) di samping label teks menu yang sedang aktif untuk memberikan konfirmasi visual instan kepada manajer tanpa keraguan.
  - **Perbaikan Selektor CSS Legacy**: Menghapus blokade selektor `button:not(.ui-btn)[aria-pressed='true']` yang sebelumnya mengabaikan tombol `.ui-btn` di dalam `SegmentedControl`, sehingga menu tampilan (Daftar, Papan, Kalender, Linimasa) dan filter status proyek (Semua, Aktif, Rencana, Ditunda, Selesai, Arsip) kini memiliki umpan balik visual aktif yang konsisten dan kontras di semua tema (termasuk mode gelap).
- **Penyempurnaan Visual & Fungsional Halaman Kegiatan (`/jurnal`)**:
  - **Penghapusan Tombol Mengambang Liar Desktop**: Mengganti `<Button>` pemicu filter mobile menjadi elemen native berpagar spesifisitas CSS tinggi (`display: none !important` di desktop), melenyapkan tombol `[ Cari & filter ]` yang sebelumnya melayang canggung di bawah tab view pada layar desktop/tablet.
  - **Perbaikan Label Relasi Tugas Ganda**: Memperbaiki teks tindak lanjut dari `+ + Tindak Lanjut` (ikon plus bertumpuk teks plus) menjadi `<Plus size={12} /> Tindak Lanjut` yang proporsional.
  - **Normalisasi Judul Kegiatan Interaktif**: Menghilangkan bingkai kotak tombol sekunder (`.ui-btn`) pada judul tabel kegiatan. Judul kini berupa link interaktif bersih dengan tag kode ringkas monospace (`KGT-XXXX`), teks judul tebal elegan dengan efek hover brand, serta baris cuplikan catatan lapangan (*notes preview*) yang rapi di bawahnya.
  - **Kartu Metrik KPI Kegiatan (`.journal-metrics`)**: Menghadirkan 4 kartu metrik data riil di bagian atas halaman Kegiatan:
    - *Total Kegiatan*: Seluruh catatan lapangan terdokumentasi.
    - *Bulan Ini*: Kegiatan aktif di bulan kalender berjalan (mis. Oktober 2026).
    - *Tindak Lanjut Tugas*: Jumlah kegiatan yang langsung menghasilkan tugas kerja.
    - *Koordinasi Rapat*: Jumlah kegiatan yang terhubung ke sesi rapat daring/tatap muka.
  - **Harmonisasi Chip Terkait & Koordinasi**: Relasi gerai (indigo), mitra kerja (amber), tugas lanjutan (emerald dengan badge status), dan tautan video conference rapat daring (`Gabung rapat ↗`) kini memiliki tinggi, radius kapsul, palet warna semantik, dan dukungan tema gelap yang serasi.
  - **Tombol Hapus Filter Instan (`.btn-filter-reset`)**: Menyediakan tombol pembersih filter cepat bersatu di baris filter ketika pencarian atau filter gerai/mitra/rapat sedang aktif.
  - **Penyelarasan Tampilan Papan & Linimasa**: Mengadopsi chip semantik yang sama pada kartu papan alur kegiatan dan judul linimasa kronologis.
- Perombakan visual dan fitur halaman Pencatatan (`Anggota`, `Buku Kas`, `Barang`, `Stok Opname`):
  - **Navigasi Tab Pencatatan (`.recording-tabs`)**: Diubah menjadi bilah navigasi kapsul modern dengan ikon (`Sparkles`, `Users`, `Wallet`, `Package`, `ClipboardCheck`), indikator halaman aktif yang kontras, dan badge hitungan data per buku.
  - **Kartu Metrik KPI (`.recording-metrics`)**: Diperkaya dengan wadah ikon sirkular tematik (`icon-total`, `icon-active`, `icon-income`, `icon-expense`, `icon-warning`, `icon-net`), tipografi angka tabular besar tebal, serta sub-keterangan mikro yang memberikan konteks jelas pada setiap angka (misalnya rasio keaktifan anggota, total uang masuk/keluar terfilter, peringatan stok menipis/habis, serta akurasi audit fisik).
  - **Filter Cepat Sekali Sentuh (`.quick-chips-row`)**: Ditambahkan chip filter instan di bawah kolom pencarian untuk setiap buku (Semua / Aktif / Nonaktif pada Anggota; Semua / + Masuk / - Keluar pada Buku Kas; Semua / Aman / Menipis / Habis pada Barang; Semua / Sesuai / Ada Selisih pada Stok Opname).
  - **Pengalih Tampilan Ganda (`[ ☰ Tabel | ⊞ Kartu ]`)**: Manajer dapat beralih antara tampilan tabel terperinci atau tampilan kartu interaktif visual modern (`.operations-card-grid`).
  - **Penyempurnaan Tampilan Tabel**: Menghilangkan border button kotak pada judul catatan; menambahkan monogram avatar inisial nama anggota, ikon arah kas masuk/keluar, ikon barang, dan kode chip bersih pada nomor anggota / SKU.
  - **Tampilan Kartu Interaktif**:
    - Kartu Anggota: Menampilkan inisial avatar berwarna, nomor anggota, tanggal bergabung, nomor kontak (telepon), total simpanan/kas tercatat, dan tombol pintasan `+ Kas`.
    - Kartu Buku Kas: Menampilkan badge arah transaksi, nominal rupiah besar, tanggal, akun/kas gerai, dan relasi entitas anggota/barang.
    - Kartu Barang: Dilengkapi pengukur visual stok buku (*stock meter bar gauge*) terhadap batas minimum, estimasi nilai total, serta aksi cepat `+ Beli` dan `Opname`.
    - Kartu Stok Opname: Dilengkapi perbandingan berdampingan *Stok Buku vs Hitung Fisik*, badge selisih warna, nama pemeriksa, dan catatan temuan.
- Normalisasi hierarki tipografi input vs judul: ukuran teks input, trigger tanggal, select dropdown, search input, dan formulir sprint dinormalisasi ke 13 px (`height: 38px`, `line-height: 1.4`, bobot sedang), label kolom ke 12 px semibold, dan judul kartu/seksi ke 15.5–16 px bold. Ini meniadakan inkonsistensi di mana teks isian input sempat terlihat lebih besar daripada judul kartu di atasnya.
- Perapian tombol pada linimasa (`TaskTimeline`):
  - Toolbar linimasa dirapikan dengan tinggi konsisten 38 px untuk tombol rentang (`.timeline-fit-button`), tombol `+ Tugas` (`.timeline-add-task-btn`), dan tombol modal jadwal lengkap dengan ikon `<Maximize2 size={13} />`.
  - Bilah aksi linimasa mobile disatukan menjadi segmented switch bersih `[ 📋 Daftar | 📊 Linimasa ]` bersanding proporsional dengan tombol `[ ⤢ Layar Penuh ]`. Seluruh terminologi "saham" dihapus tuntas dari antarmuka.
  - Modal Linimasa Layar Penuh dirombak teratur:
    - Baris 1: Header atas berisi judul `Linimasa Layar Penuh`, chip jumlah tugas, tombol `[ ↻ Putar ]`, dan tombol tutup `[ ✕ ]` yang tersemat rapi di pojok kanan atas tanpa wrapping bertingkat.
    - Baris 2: Toolbar kontrol waktu satu baris berisi pilihan interval `[ 1H | 1M | 1B ]`, navigasi `[ < | Hari Ini | > ]`, dan tombol `[ ⤢ Sesuaikan ]` tanpa wrapping bertingkat.
    - Kolom nama pekerjaan diperlebar menjadi 160 px dengan teks tugas dan bayangan sticky yang rapi, serta batang tugas diberi batas lebar minimum 52 px agar tidak tertekan menjadi potongan teks rusak.

Audit popup memakai fixture 21 domain dalam halaman development /dev/popup dengan API diblokir dan lingkup draft/preferensi QA terpisah. Temuan form panjang, tombol kecil, input rutinitas sempit, Escape modal bertingkat, label tanggal dan filter pencarian diperbaiki. Impor CSV/rutinitas/konfirmasi laporan memakai modal native bersama. Menu ponsel kini memindahkan, membatasi, dan mengembalikan fokus keyboard; bantuan mendapat padding.

Cakupan rinci dan batasan ada di [QA-POPUP](QA-POPUP.md). Pemeriksaan akhir lulus: 242 tes/35 berkas, typecheck, lint, lint:ui, build, check:ui dan audit sumber 94/94. Matriks form terisi 360/768/1024/1440 tidak meluap. Ini bukan bukti seluruh kombinasi kondisi, aksen warna, keyboard virtual atau perangkat fisik telah diuji.

Pencatatan memakai EmptyState bersama. Stok Opname tanpa barang mengarahkan ke pendaftaran barang, bukan meminta tombol Tambah yang masih nonaktif. Tes regresi baru lulus; 196 tes/31 berkas. Ringkasan, Anggota, Buku Kas, Barang, Stok Opname dan Gerai diukur setelah data tampil pada 360 px tanpa luapan; Opname juga 768/1024/1440. Ini belum mencakup data terisi atau semua tema.

Keadaan kosong Beranda/Hari Ini memakai EmptyState netral dan aksi yang jelas. Daftar proyek seluruhnya diarsipkan kini menampilkan keadaan kosong. Kartu Hari Ini membungkus judul panjang pada ponsel, kontrol centang mengikuti ukuran primitive dan Enter pada aksi anak tidak membuka detail kartu. 195 tes/31 berkas, typecheck, lint/lint:ui, build dan audit sumber 91/91 lulus. CSS terakhir 514.373 byte, important 1.970, duplikat 384; kontrol mentah luar UI tetap nol.

Sesi browser aktif kembali. Beranda gelap 360 dan Hari Ini berdata diperiksa; pengukuran Hari Ini 320/360/768/1024/1440 tidak menemukan luapan halaman. Form tanggal menampilkan satu pemicu dan kalender ke bawah, tetapi sel kalender dalam panel sempit belum mencapai target sentuh 44 px. Perangkat fisik, seluruh tema/state dan Lighthouse belum diperiksa.

Audit kelas menghapus selector sederhana tanpa pemanggil AST, sambil mempertahankan prefix/suffix dinamis dan selector kompleks. Metrik terakhir: CSS 517.624 byte, important 1.979, duplikat 384, font 6, radius 9 (termasuk sudut campuran), kontrol mentah luar UI 0. Field umum Editor sekarang memakai label/id bersama; warna proyek bawaan berasal dari skema hex sah. 191 tes/30 berkas dan semua pemeriksaan lulus.

QA galeri 320/360/390/768/1024/1280/1440/1920 tanpa luapan. Sesi browser berakhir saat QA halaman berdata dan diarahkan ke PIN; pemeriksaan tersebut belum selesai. PLAN-ASTRA belum tuntas: migrasi seluruh komponen/halaman, penghapusan personal.css, important <20, nol duplikat/hex TSX, seluruh kontras/perangkat dan Lighthouse tetap terbuka.

Pilihan tampilan tugas/kegiatan memakai SegmentedControl; donut/radar memakai Legend; Meter memakai Progress yang mempertahankan status belum dinilai. Galeri mengikuti tema root sementara dan memulihkan tema saat keluar. 190 tes/30 berkas serta build/statik lulus; kontras teks primer lima tema terang 4,69–12,36 dan gelap 7,45–13,20.

Tipografi/radius legacy kini memakai token bersama: 852 deklarasi font dan 796 radius dinormalisasi. Ragam font deklarasi turun 60 → 6; radius 59 → 11 termasuk variasi sudut. Filter/Gantt diperbaiki pada 320 px dan tablet 768, tanpa luapan halaman.

Pembersihan CSS tahap awal menghapus 671 deklarasi identik yang ditimpa selector sama dan gaya statistik lama tanpa pemanggil. CSS kini sekitar 576 KB (awal 604 KB), important 2.058 (awal 2.353), duplikat 457 (awal 522). Target akhir penghapusan personal.css dan important <20 belum tercapai.

Animasi grafik dimulai ketika elemen terlihat; angka statistik mengikuti count-up 400 ms dengan nilai asli untuk pembaca layar. Reduced-motion dipusatkan di tokens.css; sembilan blok legacy dihapus. 187 tes/29 berkas dan pemeriksaan statis/build lulus. Pintasan N diverifikasi membuka formulir tanpa menyimpan.

Interaksi Hari Ini: geser kanan menyelesaikan, geser kiri membuka penyunting; perubahan status/tanggal menyediakan Batalkan selama 5 detik. Pintasan N/T/? tersedia dan menghindari form/modal. Panel dashboard mengingat buka/tutup. 185 tes/28 berkas, typecheck, lint dan build lulus; perangkat sentuh fisik belum diuji.

Pelaksanaan PLAN-ASTRA: audit dan fondasi token tersedia; kontrol mentah luar UI sudah 289 → 0. Tanggal tunggal, DateNav, dock serta permukaan dialog bersama diterapkan. Paket kontrol lulus 175 tes, typecheck, lint, lint:ui, check:ui, build dan audit sumber 83/83. Galeri 360 terang/gelap serta Beranda 360/768 terang diperiksa. Hasil dan kriteria yang masih terbuka ada di [LAPORAN-ASTRA](LAPORAN-ASTRA.md); migrasi visual keseluruhan belum selesai.

Kartu statistik dashboard kini netral dengan ikon tint; perhatian dan tugas terlambat lebih tenang. Empat informasi statistik dan tautannya dipertahankan. Beranda terang pada 360/768/1024/1440 tidak meluap; gelap 1440 dan dropdown gelap diperiksa. Paket lulus 175 tes serta pemeriksaan statis/build. Pemeriksaan seluruh tema/grafik belum lengkap.

Papan tugas/kegiatan memakai drag Pointer Events pada handle khusus, long-press, overlay, gulir tepi dan dropdown pemindahan tanpa drag. 181 tes/26 berkas serta typecheck/lint/build/penjaga UI lulus. Drag mouse pada galeri tanpa data berhasil memindahkan kartu; Android/iOS fisik belum diperiksa. Rincian fase 5A di LAPORAN-ASTRA.

Keadaan aktif dirangkum di sini; riwayat paket ada di [CHANGELOG](../CHANGELOG.md), kebutuhan di [PRD](PRD.md) dan penerimaan di [CHECKLIST](CHECKLIST.md). Periksa Git kembali sebelum bekerja.

## Implementasi aktif

Konfigurasi lokal kini memakai `HUB_APP_ORIGIN=http://127.0.0.1:3000`, sesuai hostname `npm run dev` dan URL browser pemilik. Probe endpoint PIN dengan JSON sengaja tidak sah mendapat 400 (lolos pemeriksaan origin); `localhost` dan origin asing mendapat 403. Probe berhenti sebelum akses database, tidak memakai PIN atau menambah percobaan masuk. Login dengan PIN tetap perlu dicoba pemilik. Konfigurasi hosting tidak diubah.

- Ruang kerja pribadi dengan proyek fleksibel, catatan terformat, milestone, tugas daftar/papan/harian/kalender/Gantt, subtugas, prasyarat dan pengulangan.
- Standarisasi konsistensi geometris tombol dan dropdown ("Kotak dengan Sedikit Rounded"): seluruh tombol aksi, pemicu dropdown (`Select`), tombol tutup modal/drawer (`[ ✕ ]`), dan tombol aksi formulir distandarkan ke bentuk persegi/persegi panjang dengan sudut lengkung halus (`border-radius: 10px` standar, `8px` ringkas/tabel). Tombol tutup modal dan drawer dikunci simetris 36 × 36 px dengan `aspect-ratio: 1 / 1 !important` serta dikecualikan dari `min-height: 44px` agar tidak terdistorsi menjadi oval telur. Token `--radius-pill` dan pemicu dropdown status/prioritas diselaraskan dari kapsul 9999 px menjadi sudut lengkung rapi 8–10 px.
- Standarisasi jarak komponen dan tombol di seluruh halaman: tombol aksi inline (Batal dan Simpan) memiliki celah 14 px, tinggi 38–42 px, margin atas 14 px, dan margin bawah 26–28 px sehingga tidak menempel rapat pada kartu di bawahnya; kontrol header dan bilah drawer memiliki celah 10–12 px; margin bawah antar blok halaman (kartu statistik 24–28 px, agenda rapat 26–28 px, properties grid 22–26 px, subtugas 26–30 px, cover proyek 28 px) distandarkan dengan batas lega.
- Panel detail tugas (`TaskDetailDrawer`) dirombak standar Notion/Linear: judul tugas kini di paling atas, properti tugas (status, prioritas, tenggat, penanggung jawab, pembuat) disatukan dalam Unified Properties Grid yang ringkas dan elegan dengan status/priority pill warna semantik, navigasi conjoined pair `< >`, serta penempatan kanvas deskripsi yang proporsional tanpa kartu raksasa atau avatar mencolok yang memakan layar.
- Estetika kartu dashboard dirombak modern: 4 kartu ringkasan kini memakai sistem 4-pilar warna pastel harmonis (emerald, blue, rose, lavender) dengan highlight kaca atas, border lengkung 20 px, dan micro-animation hover melayang. Kartu Agenda Rapat dirancang ulang dengan ikon box 46 px frosted dan metadata pill terstruktur. Filter tugas aktif/terlambat/selesai menggunakan segmented pill control ala iOS/Linear.
- Koreksi jarak atas mobile dan overlap: padding atas `.manager-main` pada ponsel dinaikkan menjadi 22 px sehingga konten tidak lagi mepet dengan bilah header sticky; padding bawah dinaikkan menjadi `calc(135px + env(safe-area-inset-bottom, 0px))` sehingga kartu bawah dapat digulir bebas di atas dock navigasi tanpa terpotong atau tertutup.
- Tata ulang tajuk Beranda dan kartu peringatan: chip tanggal dipindahkan ke baris judul di samping eyebrow sehingga tombol aksi `+ Buat tugas` dan `Catat kegiatan` tertata rapi dalam grid 2-kolom seimbang 44 px. Kartu `.follow-up-compact-bar` ditata ulang menjadi dua baris dengan tombol aksi di baris bawah tanpa tabrakan.
- Bilah navigasi atas ponsel (`.manager-topbar`) dibersihkan dari label teks redundant, pemisah slash yatim, dan kapsul kosong; indikator dev floating Next.js dinonaktifkan (`devIndicators: false`) agar tidak menimpa dock navigasi Beranda.
- Detail proyek kini berstandar Notion/Linear: hero card bernuansa gradien lembut dan aksen border atas, grid kartu properti 4-kolom berikon (prioritas, penanggung jawab, target, tugas), kartu progres terintegrasi dengan fraksi selesai dan persentase, tab navigasi bagian proyek berikon (Tugas, Catatan, Milestone, Dokumen, Keputusan, Kendala), tombol kembali berikon `<ArrowLeft />`, serta accordion Langkah Berikutnya yang rapi.
- Koordinasi, rapat bertautan pengguna dan ICS, dokumen, risiko, kegiatan, laporan snapshot, profil, PIN dan cadangan JSON.
- Anggota, kas, barang dan opname memakai gerbang kemampuan database. Galat atau migrasi belum tersedia tidak ditampilkan sebagai data nol.
- Dashboard mempertahankan style acuan e8fc8b4 dan tweak berikutnya. Tugas/kegiatan awal dibatasi tiga; grafik/rutinitas opsional. Perlu Perhatian memakai permukaan netral dan rincian yang dapat dibuka. Acuan ada di [DESAIN-ANTARMUKA](DESAIN-ANTARMUKA.md).
- Font memakai token global; mobile memakai input/dropdown 14 px, judul halaman 20 px, judul bagian 17 px dan kartu 15 px. Kalender membuka ke bawah sesuai koreksi pemilik dan dibatasi area panel. Intro form tugas, toolbar linimasa, kartu dashboard/Hari Ini dan label proyek panjang diringkas; indikator simpan subtugas memakai hijau tema.
- Overhaul dropdown terpadu: menu pilihan popover rapi tanpa garis kotak ganda antar opsi, hover sudut 8 px warna hijau lembut, centang emerald, dan elevasi mengambang bersih. Select bawaan OS pada detail tugas dan tabel digantikan komponen custom dengan gaya pill semantik.
- Bar progres subtugas dan indikator persentase diperbaiki dari motif hitam bergaris menjadi gradien hijau emerald bercahaya lembut dan animasi halus. Jarak `.inline-actions` diperlebar 18–20 px di bawahnya agar tidak berhimpitan dengan kartu deskripsi/tugas.
- Dashboard mobile dirombak: kartu statistik memiliki gradien pastel halus dan kedalaman bayangan elegan, menghilangkan kesan terlalu datar (flat) tanpa merusak keharmonisan tema arang-sage. Tombol-tombol aksi kecil ponsel terlindungi dari distorsi ukuran.
- Sepuluh folder domain dan enam kontrak/form bersama; tes dipisah menjadi unit, UI, database dan keamanan. Peta ada di [ARSITEKTUR](ARSITEKTUR.md).
- Sumber mati, CSS eksperimen, pratinjau ditolak dan screenshot sementara dibersihkan. Pagination/cache diperbaiki, modul besar dimuat terpisah dan progres memakai utilitas bersama.

## Bukti pemeriksaan terakhir

Paket overhaul detail proyek dan dropdown: **171 tes dalam 23 berkas** lulus (`npm test`), **0 kesalahan typecheck** (`npm run typecheck`), dan Next.js production build (`npm run build`) berhasil.
- Halaman detail proyek terverifikasi rapi dan berimbang: hero card, grid properti, progress track, dan tab navigasi terstruktur tanpa ruang kosong hampa.
- Dropdown kustom terverifikasi bersih pada seluruh halaman/modal/drawer: opsi hover dan status terpilih tampil terpadu tanpa border kotak kaku.
- Detail tugas: pill status dan prioritas tidak lagi mendominasi kontainer secara penuh, form deskripsi dan tindakan memiliki jarak lega.
- Bar progres subtugas: warna hijau emerald semantik dengan transisi mulus dan lencana persentase terintegrasi.
- Dashboard mobile: kartu statistik bervariasi dengan kedalaman visual elegan dan tombol-tombol tidak merusak tata letak kartu.
- Dropdown kustom terverifikasi bersih pada seluruh halaman/modal/drawer: opsi hover dan status terpilih tampil terpadu tanpa border kotak kaku.
- Detail tugas: pill status dan prioritas tidak lagi mendominasi kontainer secara penuh, form deskripsi dan tindakan memiliki jarak lega.
- Bar progres subtugas: warna hijau emerald semantik dengan transisi mulus dan lencana persentase terintegrasi.
- Dashboard mobile: kartu statistik bervariasi dengan kedalaman visual elegan dan tombol-tombol tidak merusak tata letak kartu.

Paket mobile/kontrol bersama: **171 tes dalam 23 berkas**, typecheck, lint, build dan audit sumber **74/74** lulus. Tes baru memeriksa pilihan dropdown, fokus/Escape kalender, batas tanggal/form dan pencegahan pengiriman ulang subtugas. Perubahan awal next-env.d.ts dipertahankan.

Fixture lokal memakai komponen aplikasi dan API tiruan tanpa akses database: 22 halaman diperiksa pada 360 px dalam tema terang/gelap; 21 form Editor pada 360 px dalam kedua tema. Proyek, Panduan, Risiko dan Tugas diperiksa pada **360/768/1024/1440 px**, kedua tema, tanpa luapan halaman setelah koreksi. Matriks risiko dan tabel tugas bergulir di dalam kontainer. Kalender pada detail tugas 360 px membuka ke atas tanpa terpotong/luapan; input memakai 16 px. Kontras tombol diperiksa pada tujuh halaman gelap. Pemeriksaan ini tidak mencakup semua keadaan data, semua interaksi atau perangkat fisik.

Paket struktur folder a871d6a: **167 tes dalam 22 berkas**, typecheck, lint, build, audit sumber **71/71** dan diff-check lulus. Pemindahan tidak mengubah isi bisnis selain rujukan modul. Hasil lokal ini tidak membuktikan cloud atau penerimaan perangkat selesai.

Paket banner: fixture terang pada **360, 768, 1024 dan 1440 px** tanpa overflow horizontal halaman; rincian/keadaan kosong juga diperiksa pada 360 px. Paket dashboard sebelumnya memeriksa gelap 1440 px dan terang 360/768/1024 px. Belum ada audit semua modul/tema atau UAT data nyata.

Audit panduan Markdown: **21 panduan**, seluruhnya terindeks; tidak ada tautan lokal putus atau rujukan kode literal hilang. Pemeriksaan ulang **167 tes/22 berkas**, typecheck, lint, build dan audit sumber lulus. Build diulang dengan izin yang diperlukan setelah gagal membuka next-env.d.ts di sandbox Windows. Perubahan awal file tersebut dipertahankan; paket ini tidak mengubah UI atau memeriksa cloud.

## Cloud: catatan konfirmasi sebelumnya

Target Supabase mqycnhebhzqaziouipet; database legacy tidak digunakan. Berikut berasal dari laporan/pemeriksaan sebelumnya, bukan pemeriksaan cloud pada audit Markdown ini:

- Migrasi awal telah terpasang. Migrasi pencatatan kedua dikonfirmasi pemilik; kemampuan pencatatan pernah diperiksa lewat aplikasi lokal.
- Reset cloud dikonfirmasi berhasil. PIN baru dan uji simpan setelah reset masih perlu dikonfirmasi.
- Penerapan indeks paginasi migrasi 6 dan relasi dokumen migrasi 7 belum terkonfirmasi. Jangan menyimpulkan seluruh migrasi terpasang dari reset lama atau tes lokal.
- Login/simpan dan smoke test produksi setelah deployment terbaru belum terkonfirmasi.

Ikuti [MIGRASI-SQL](MIGRASI-SQL.md) sebelum perubahan skema. Eksekusi cloud memerlukan penjelasan berkas, dampak, proyek tujuan dan persetujuan pemilik.

## Prioritas berikutnya

1. Konfirmasi PIN/simpan setelah reset dan keadaan migrasi cloud tanpa mengulang SQL otomatis.
2. UAT data nyata: konsistensi Beranda, Hari Ini, Tugas, Riwayat dan pencarian; cadangan/pemulihan di lingkungan uji.
3. Lanjutkan audit interaksi/keadaan data pada seluruh modul dan empat lebar; uji navigasi, fokus, modal, Gantt/Harian dan perangkat fisik. Sweep fixture mobile bukan pengganti UAT.
4. Ukur performa data besar/bundle sebelum mengklaim peningkatan kecepatan.

Belum tersedia: kolaborasi real-time, editor blok bebas, PWA/offline, unggah berkas, baseline/jalur kritis dan penjadwalan otomatis dependensi. Impor CSV tersedia terbatas pada daftar Records; buku pencatatan menyediakan ekspor, bukan impor.

