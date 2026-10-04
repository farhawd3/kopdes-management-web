# Status produk — 4 Oktober 2026

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

