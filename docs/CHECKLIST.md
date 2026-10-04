# Checklist produk aktif

- [x] Tindak lanjuti 15 anotasi: + Kas, bantuan ringkas, catatan, kartu/tabel/aksi, tema dan profil. Cakupan/batas di QA-ANOTASI.md.

- [x] Riwayat proyek berupa tab horizontal, bukan menu sidebar; tanggal drawer, warna kartu, dropdown kartu papan dan padding catatan dirapikan sesuai koreksi pemilik.

- [x] Riwayat proyek selesai/arsip, sidebar berjalan konsisten, tugas selesai lama tetap tersedia pada detail; server menolak tugas baru di proyek tertutup.
- [x] Alur tugas/proyek dan empat buku disusun dengan hubungan opsional, panduan kontekstual, kartu proyek dan bubble timeline; Gantt desktop/potret diperiksa ulang. Batas di ALUR-PENGISIAN.md.

- [x] Rapikan form rapat sempit, empat buku/kartu mobile, opsi Gerai/Rapat, panduan dan kisi tema; tambah panduan ikon bersama. Cakupan dan batas pemeriksaan di QA-TATA-LETAK.md.
- [x] Pengukuran enam halaman pada empat lebar/dua tema, opsi Gerai/Rapat terbuka, form rapat dan pratinjau tema; 247 tes/39 berkas.

- [x] Koreksi lima screenshot: satu bingkai fokus pencarian, menu dropdown terpisah dari lebar pemicu, ukuran teks aksi berdasarkan konteks, form satu kolom/tab dua kolom mobile, kartu Gerai tanpa radar kosong, Hari ini sesuai tanggal Jakarta.
- [x] Konten contoh 21 domain pada 360 terang/gelap; lima jenis kartu dan empat form relasi di empat lebar diperiksa ulang. Rincian/batasan di QA-POPUP.md.
- [ ] lint:ui legacy (111 temuan) dan tujuh kontrol mentah pada checkout terbaru belum memenuhi audit UI.

- [x] Inventaris popup dan fixture 21 domain; panggilan API diblokir, draft/preferensi QA terpisah.
- [x] Form panjang, input rutinitas, label tanggal, target tombol dialog dan Escape popup bertingkat diperbaiki.
- [x] Impor CSV/rutinitas/konfirmasi laporan memakai modal native; pencarian/bantuan/menu diperiksa, fokus menu ponsel dibatasi dan dipulihkan.
- [ ] Seluruh kombinasi popup/state/aksen dan perangkat fisik; cakupan nyata ada di QA-POPUP.md.

- [x] Keadaan kosong buku pencatatan memakai EmptyState; Opname tanpa barang mengarahkan pendaftaran barang, dengan regresi.
- [x] Enam halaman pencatatan/gerai pada 360 px setelah isi tampil tidak meluap; Opname juga 768/1024/1440. Data terisi/tema lain tetap terbuka.

- [x] EmptyState bersama pada Beranda/Hari Ini; proyek seluruhnya diarsipkan menampilkan keadaan kosong, dengan tes regresi.
- [x] Judul tugas Hari Ini membungkus pada ponsel; Enter pada aksi anak tidak membuka detail kartu; lima lebar diukur tanpa overflow.
- [ ] Sel tanggal kalender panel sempit mencapai target sentuh 44 px.

- [x] CSS tanpa pemanggil statis dipangkas dengan pengecualian kelas dinamis/selector kompleks; Field umum Editor terhubung dengan id.
- [x] Galeri komponen tanpa overflow pada 320/360/390/768/1024/1280/1440/1920; bukan bukti seluruh halaman/perangkat.

- [x] SegmentedControl, Legend dan Progress digunakan pada tugas/kegiatan serta grafik; kontras primer lima tema terang/gelap diperiksa.

- [x] Font/radius legacy memakai token; filter rentang dan tanggal Gantt terbaca pada 320/768 px.

- [x] Pembersihan awal deklarasi CSS identik dan statistik legacy; ukuran total sudah turun dibanding audit awal.

- [x] PLAN-ASTRA 6: observer grafik, count-up, animasi kartu/tombol dan reduced-motion terpusat; pemeriksaan perangkat/performa lengkap masih terbuka.

- [x] PLAN-ASTRA 5B: pintasan N/T/?, panel tersimpan, swipe Hari Ini dan undo status/tanggal; tes regresi otomatis tersedia.

Implementasi dan penerimaan dipisahkan. Bukti terakhir ada di [STATUS](STATUS.md), riwayat paket di [CHANGELOG](../CHANGELOG.md).

## Implementasi tersedia

- [x] PLAN-ASTRA fase 1: audit AST seluruh kontrol HTML, inventaris rute/overlay, CSS dan selector berulang yang dapat dibuat ulang.
- [x] Fondasi token semantik dan stylelint CSS baru tanpa hex/important; migrasi legacy belum selesai.
- [x] Primitive tombol/input, nol kontrol mentah luar UI; tanggal tunggal, DateNav, BottomNav, dialog bersama dan galeri development. Batas QA tercatat di LAPORAN-ASTRA.
- [x] Kartu statistik dashboard netral, baris terlambat dan tata letak adaptif; pemeriksaan Beranda empat lebar terang dan gelap 1440.
- [x] Drag Pointer Events pada handle papan tugas/kegiatan dan alternatif dropdown; 181 tes lulus serta drag mouse fixture browser berhasil.

- [x] Contoh konfigurasi/panduan lokal memakai host yang sama dengan server; penolakan origin lokal diperbaiki dan diprobe tanpa mutasi database.

- [x] Proyek fleksibel, properti, catatan terformat, milestone dan tugas terhubung.
- [x] Daftar/papan/harian/kalender/Gantt, filter, subtugas, prasyarat, pengulangan dan riwayat tugas.
- [x] Gantt dengan rentang/skala, geser/resize, tinjau/simpan dan alternatif keyboard/form.
- [x] Beranda/Hari Ini berdasarkan catatan aktual; rincian tambahan opsional dan banner perhatian ringkas.
- [x] Koordinasi, rapat/ICS, dokumen, risiko, kegiatan, laporan snapshot, profil dan cadangan JSON.
- [x] Anggota, kas, barang dan opname dengan gerbang aktivasi, filter dan ekspor CSV.
- [x] Impor CSV terbatas pada daftar Records, validasi per baris; bukan impor buku atau transaksi atomik seluruh berkas.
- [x] PIN/sesi, RLS, pemeriksaan asal mutasi dan validasi server.
- [x] Pencarian berkonteks proyek dan isolasi relasi melalui tugas.
- [x] Pagination/cache, pemuatan modul terpisah, progres bersama dan pembersihan sumber mati.
- [x] Struktur modul/tes; 167 tes, typecheck, lint, build dan audit sumber lulus pada paket struktur.
- [x] Fixture banner terang 360/768/1024/1440 px, rincian/keadaan kosong 360 px.
- [x] Panduan Markdown diindeks; duplikasi digabung dan rujukan usang diperbaiki.
- [x] Font/token kontrol bersama, dropdown lebih tenang, kalender adaptif, aksi/subtugas dan panduan onboarding dirapikan.
- [x] Sweep fixture 22 halaman/21 form mobile dalam dua tema; Proyek/Panduan/Risiko/Tugas pada empat lebar. Bukti dan batas pemeriksaan ada di STATUS.
- [x] Koreksi ukuran font mobile, intro tugas berlebihan, toolbar/tanggal linimasa, kepadatan dashboard/Hari Ini, kalender ke bawah dan warna pending subtugas; bukti render ada di STATUS.

## Cloud dan penerimaan

- [x] Migrasi pencatatan kedua dikonfirmasi pemilik; kemampuan pernah diperiksa lewat aplikasi lokal.
- [x] Reset kosong pernah dikonfirmasi berhasil oleh pemilik.
- [ ] Konfirmasi PIN dan uji simpan setelah reset cloud.
- [ ] Verifikasi keadaan migrasi cloud, khususnya indeks paginasi 6 dan relasi dokumen 7.
- [ ] UAT data nyata beberapa hari, termasuk konsistensi lintas tampilan.
- [ ] Audit semua modul/tema pada 360/768/1024/1440 px, fokus, Escape, modal dan reduced-motion.
- [ ] Perangkat fisik Android/iOS/Safari dan audit aksesibilitas/Lighthouse.
- [ ] Cadangan/pemulihan nyata di lingkungan uji.
- [ ] Benchmark performa/bundle dan data besar.
- [ ] Smoke test login/simpan produksi setelah deployment yang diizinkan pemilik.

## Pengembangan terpisah

- [ ] Baseline/jalur kritis dan penjadwalan otomatis dependensi.
- [ ] Editor blok drag-and-drop dan kolaborasi real-time.
- [ ] PWA/offline, impor CSV buku pencatatan, unggah berkas dan tautan laporan publik.

Rencana program lama bukan instruksi aktif. Riwayatnya tersedia melalui Git; fixture kompatibilitas SQL tetap di tests/fixtures/.
