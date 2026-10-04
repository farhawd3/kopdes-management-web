# Pemeriksaan popup — 4 Oktober 2026

## Koreksi berdasarkan lima screenshot pemilik

- Pencarian: input di dalam bingkai pencarian tidak lagi mendapat border/focus ring kedua. Pengukuran fokus memastikan input border 0 dan shadow none; fokus tetap terlihat pada pembungkus.
- Tombol: token teks aksi 13 px, ukuran kecil 12 px dan besar 14 px. Aksi tambah relasi memakai 12 px tanpa mengurangi target dialog. Form ponsel satu kolom; tab tampilan menjadi dua kolom dan label membungkus.
- Dropdown: lebar menu minimal yang diinginkan 220 px, dibatasi viewport/panel, terpisah dari lebar tombol status. Pilihan tidak menyusut saat menu bergulir dan target minimum 44 px. Label pilihan panjang pada form membungkus.
- Gerai/kartu umum: hierarki judul/status, jarak isi, aksi dan opsi dirapikan. Kartu mengikuti tinggi isi. Radar tanpa penilaian dihilangkan, lima nilai tetap menyebut Belum dinilai; radar berdata dibatasi ukurannya. Fixture Gerai mencakup belum dinilai, 40% dan 100% berdasarkan checklist contoh.
- Hari ini: sebelumnya awal rentang diatur `today() - 7`, sehingga 4 Oktober menjadi 27 September. Kini tombol menetapkan tanggal Jakarta hari ini; tanggal 04/10/2026 diverifikasi di browser. Perubahan yang sama diterapkan pada varian layar penuh yang masih berada dalam perubahan kerja pemilik.
- Fixture daftar sebelumnya terfilter `scopeId="qa-popup"` sehingga data tersembunyi. Lingkup draft/preferensi sekarang dipisahkan dari filter proyek. API tetap diblokir. Tabel tugas/kegiatan dan matriks risiko memiliki kontainer gulir yang terisolasi.

Pengukuran terbaru: konten 21 domain pada 360 px terang/gelap, lima jenis kartu (Gerai, Dokumen, Mitra, Rapat, Risiko) pada 360/768/1024/1440, serta empat form terisi (Tugas, Gerai, Mitra, Rapat) pada empat lebar dalam tema gelap. Semua pengukuran final tersebut tanpa luapan halaman/kartu/dialog. Ini tidak mengklaim semua form/state/tema sudah diverifikasi ulang secara visual. Bukti lokal: cards-360-dark-current.json, cards-light-current.json, forms-current-four-widths.json dan gerai-card-current.jpg dalam artifacts/astra.

245 tes/37 berkas, typecheck, ESLint, build dan audit sumber 94/94 lulus. lint:ui masih gagal pada aturan legacy ui.css (important, angka font/radius dan satu hex); check:ui masih gagal karena 34 kontrol mentah di luar primitive. Utang yang sudah ada pada checkout ini tetap terbuka; tidak dilabeli lulus dan aturan pemeriksa tidak dilonggarkan. Token tombol baru ditambahkan ke daftar token font yang diizinkan.

## Cakupan dan cara memeriksa

Pemeriksaan awal belum mencakup semua popup yang membutuhkan data. Paket ini menambah `/dev/popup`, hanya tersedia dalam development. Fixture berasal dari skema sah dan ditandai sebagai contoh, bukan catatan operasional. Semua panggilan API dari halaman ini ditolak sebelum `fetch`, termasuk baca, tambah, ubah, dan hapus. Draft form serta preferensi rutinitas memakai lingkup QA terpisah. Tema berubah sementara dan dipulihkan saat keluar.

Pemeriksaan memakai inventaris kode, tes DOM, pengukuran browser, dan inspeksi screenshot kasus representatif. Pengukuran bukan pengganti inspeksi visual seluruh kombinasi isi. Tidak ada data operasional ditambahkan atau dihapus untuk membuka popup.

## Matriks formulir

Semua domain berikut dirender dalam keadaan tambah dan ubah: 42 kasus pada 360 px. Keadaan ubah terisi juga diukur pada 768, 1024, 1440 px. Matriks akhir mengukur `clientWidth` dan `scrollWidth` area form/dialog; tidak menemukan luapan. Tombol 360 px diukur tanpa target di bawah 44 px setelah perbaikan. Tema terang dan gelap diperiksa; lima aksen warna dan perangkat fisik belum diuji menyeluruh.

| Domain | Tambah/ubah 360 | Ubah terisi 768/1024/1440 |
|---|---|---|
| Profil koperasi, proyek, milestone, tugas | Diperiksa | Diperiksa |
| Gerai, kesiapan, mitra, riwayat interaksi | Diperiksa | Diperiksa |
| Rapat, keputusan, dokumen, risiko, isu | Diperiksa | Diperiksa |
| Tim, pelatihan, kegiatan | Diperiksa | Diperiksa |
| Anggota, buku kas, barang, stok opname | Diperiksa | Diperiksa |
| Target periode | Diperiksa | Diperiksa |

Nama dan relasi panjang sengaja dipakai untuk menemukan masalah yang tidak muncul pada data kosong. Fixture tugas memuat subtugas selesai/belum selesai dan komentar. Tes memeriksa skema, dialog bernama, tombol tutup/simpan, serta label input/textarea. Relasi yang belum dipilih tetap merupakan keadaan form yang sah; ini bukan bukti seluruh kombinasi relasi telah dicoba.

## Popup khusus dan lapisan di dalam popup

| Keluarga | Pemeriksaan nyata |
|---|---|
| Tugas cepat | Pembukaan, tombol, input dan penutupan pada fixture |
| Detail tugas | Judul/relasi panjang, properti, subtugas, komentar, tombol, label input |
| Sprint baru/terisi | Input, pilihan, tanggal dan tata letak; screenshot gelap 360 |
| Jadwal berulang | Keadaan aktif/nonaktif; pembukaan di atas drawer dan Escape hanya menutup anak |
| Pusat aksi | Kartu/tombol, ukuran, pembukaan dan penutupan; tidak menjalankan navigasi/mutasi semua aksi |
| Dropdown dan kalender | Pemicu, relasi panjang, batas panel, target tanggal, penutupan; tidak mencoba seluruh tanggal/pilihan |
| Impor CSV | Popup pada daftar fixture; fokus, judul, tombol tutup dan Escape; tidak mengimpor ke database |
| Pengaturan rutinitas | Dialog, input jam/judul, kartu rutinitas, tombol dan penutupan; memakai preferensi QA |
| Konfirmasi hapus laporan | Laporan fixture terisi, penjelasan, Batal/Escape; tidak menjalankan hapus |
| Pencarian cepat | Aplikasi berdata, input, bilah filter, kartu/tautan dan penutupan |
| Menu navigasi dan bantuan pintasan | Pembukaan pada aplikasi aktif; bantuan bernama, tombol tutup 48 px, tata letak dan penutupan diperiksa |
| Konfirmasi native browser | Inventaris pemanggil hapus/keluar dari form; tampilannya dikelola browser, bukan CSS aplikasi. Tidak menjalankan hapus data nyata |

## Temuan yang diperbaiki

1. Grid form dan label pilihan panjang menyebabkan area form melebar. Anak grid kini dapat menyusut, label pilihan membungkus, pembungkus dropdown mengikuti lebar form.
2. Geometri legacy mengecilkan tombol drawer/tutup/pembuatan relasi menjadi 24–36 px. Dialog memakai minimum target bersama 44 px; ponsel mengikuti token 48 px. Dua deklarasi `!important` sementara diperlukan untuk mengalahkan geometri legacy, dicatat sebagai utang cascade.
3. Input judul rutinitas menyusut sekitar 26 px. Jam dan judul kini tersusun dalam kolom penuh; input judul terukur sekitar 293 px pada panel ponsel.
4. Escape pada jadwal berulang ikut menutup drawer induk. Event cancel/backdrop anak kini berhenti pada modal anak, dengan regresi otomatis dan verifikasi browser.
5. Impor CSV, pengaturan rutinitas dan konfirmasi laporan sebelumnya memakai div berperan dialog. Ketiganya kini memakai modal native bersama dengan fokus, Escape dan pengembalian fokus.
6. Input subtugas/rutinitas dan pemicu tanggal mendapat nama aksesibel yang spesifik. Ikon CSV/periode kerja juga memiliki label ketika teks disembunyikan di ponsel.
7. Filter pencarian menyusut sehingga label berimpitan. Tombol kini mempertahankan lebar isi dalam kontainer bergulir.
8. Bantuan pintasan menempel ke sisi dialog. Padding dan jarak isi kini dinyatakan pada kelas dialog bantuan.
9. Menu navigasi ponsel mempertahankan fokus di tombol pembuka. Fokus kini masuk ke menu, Tab/Shift+Tab tetap dalam menu, dan penutupan mengembalikan fokus ke pembuka.

Kalender pada panel sangat sempit mempertahankan tujuh kolom dengan target minimum 44 px. Kisi bergulir di dalam menu, tanpa melebar keluar panel. Ini keputusan aksesibilitas, bukan klaim kalender tidak memiliki gulir horizontal internal.

## Bukti dan batasan

Bukti pengukuran lokal di `artifacts/astra/popup-add-360-final.json`, `popup-360-final.json`, `popup-768-final.json`, `popup-1024-final.json`, `popup-1440-final.json`. Screenshot antara lain `popup-jadwal-360.jpg` dan `popup-sprint-360-dark.jpg`. Artefak lokal diabaikan Git; hasil dan regresi kode dilacak.

- [x] Inventaris keluarga popup dan fixture untuk 21 domain.
- [x] Tambah/ubah, data panjang, label input dan regresi modal bertingkat.
- [x] Pengukuran area form/dialog pada empat lebar.
- [ ] Semua kombinasi kondisi/relasi/status, lima aksen, seluruh keadaan busy/error secara visual.
- [ ] Keyboard virtual dan target sentuh pada Android/iOS fisik; Samsung Internet/WebView/PWA/Firefox/Edge.
- [ ] Tidak mengklaim PIN/perubahan kredensial atau tindakan hapus nyata diuji end-to-end.

Pemeriksaan akhir: 242 tes pada 35 berkas, typecheck, lint, lint:ui, build, check:ui dan audit sumber 94/94 lulus.
