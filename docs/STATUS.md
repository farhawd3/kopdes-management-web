# Status produk — 5 Oktober 2026

Dokumen ini mencatat keadaan aktif. Riwayat paket ada pada CHANGELOG dan laporan QA; arahan desain terbaru ada pada DESAIN-ANTARMUKA dan DUNIA-KOPERASI. Jangan memakai bagian historis sebagai instruksi yang mengalahkan permintaan terbaru.

## Prioritas aktif

Panduan AI/tool/skill telah disederhanakan dan lingkup historis dipertegas. Fokus implementasi berikut: dunia dan koneksi data web, dimulai dari paket terang/map pada DUNIA-KOPERASI. Audit ini terbatas dokumen repo yang tersedia; tidak mengubah aturan global AI di luar proyek.

Dunia Koperasi mengikuti video pengguna: 3D isometrik biru-putih, kartu mengambang, kantor/interior, tujuh lahan gerai, maskot animatif/bubble, cuaca dan waktu. Panduan telah diringkas, konflik lingkup tema diperjelas, referensi video/interior disimpan di docs/referensi-dunia agar dapat dibaca AI berikutnya.

## Penilaian pemilik terbaru

Versi sekarang belum diterima: kawasan kecil/sepi, mobil belum ada, tampilan agak gelap, pengaturan waktu tidak mudah ditemukan dan perpindahan karakter belum terlihat. Gym aktif serta patroli manajer sesekali belum tersedia. Kontrol manual/animasi pose ada dalam kode, tetapi bukan bukti pengalaman tersebut memenuhi permintaan. Rencana paket revisi ada hanya di [DUNIA-KOPERASI](DUNIA-KOPERASI.md); pembaruan ini dokumentasi, belum implementasi runtime.

## Implementasi Dunia Koperasi

- `/dunia-koperasi` terdaftar pada navigasi, menggunakan sesi aplikasi dan data workspace, dengan layar penuh/dock khusus.
- `/dev/dunia-koperasi` development route untuk pengujian bebas database.
- Three.js: kamera ortografis dengan radius target hingga 26 unit, pencahayaan ACESFilmic dan PCFShadowMap, kontrol zoom/putar/reset, penanda HTML, serta raycast klik objek gedung/lahan/kendaraan/karakter/gudang.
- **Paket 1 Selesai:**
  - Tekstur jalan diperbaiki dengan sistem layer top presisi, `sun.shadow.bias = -0.0003`, `normalBias = 0.025`, dan penonaktifan `castShadow` pada objek datar. Garis-garis hitam belang (shadow acne) terbukti lenyap total pada pengujian browser siang dan malam.
  - Warna jalan dikembalikan ke biru pastel lembut (`#b8c9e5`) yang berbobot dan menyatu dengan tema diorama.
  - Simpang lampu merah 3D modular dengan tiang baja dan siklus otomatis lampu merah, kuning, dan hijau di persimpangan jalan utama dan akses kantor.
  - Gedung Gudang Logistik solid 3 dermaga rolling door, kanopi pelindung, apron bertanda marka kuning, forklift, dan palet kayu di sisi timur kawasan.
  - Sistem `SeatAnchor` pada bangku taman plaza: karakter wanita kini duduk santai di bangku taman plaza menghadap utara dengan pose duduk wajar, menuntaskan masalah karakter berdiri/menginjak bangku.
- **Paket 2 Selesai:**
  - Interior kantor diperlebar dari 15×12 menjadi 22×15 unit dengan 6 zona lapang: Zona A (Rapat 6×6, meja kayu madu 5.2×2.2, 6 kursi eksekutif berjarak lega, partisi kaca tempered berbingkai), Zona B (Workstation 5×6, 4 meja PC All-in-One), Zona C (Arsip & Buku 6×6, 3 lemari bertingkat, buku pastel, tanaman hias), Zona D (Gym 6×6, matras slate gelap 5.6×4.8, dual treadmill LED hijau dengan animasi latihan, dumbbell rack, dispenser air), Zona E (Pojok Santai 6×6, sofa empuk, meja kopi, tanaman sudut), Zona F (Lobi & Pintu Masuk, bangku tunggu, tanaman penyambut).
  - Koridor sirkulasi utama dan persimpangan selebar 2.5–3.0 unit dengan rasio jejak perabot ≤ 30% luas lantai, melenyapkan kesan sesak dan perabot menempel dinding/partisi.
  - Kamera interior ortografis diperluas (span 11.5–16 unit) membingkai ruang 22×15 secara utuh dan proporsional.
  - Pembedaan lingkup stasiun (`scope: 'kantor' | 'luar'`) sehingga stasiun interior dan landmark luar terpisah rapi.
- Exterior luas (58 × 38 unit): kantor koperasi, jalan dua arah, plaza air mancur dan 4 bangku taman ber-anchor, area parkir mobil manajer, gudang logistik, dan tujuh lahan gerai yang terhubung catatan `units`.
- Default waktu adalah Siang terang; kontrol cepat **Waktu** dan **Cuaca** aktif.
- Kendaraan suasana: Mobil Manajer di parkir, Van Distribusi di dermaga gudang, dan Truk Muatan Logistik bergerak di jalan raya.
- Style dunia terisolasi di `world.css` dan palet Three.js di `world-objects.ts`.

## Pemeriksaan paket terbaru

- `npm test -- --maxWorkers=2`: **270 tes / 44 berkas lulus 100%**.
- `npm run typecheck`: **lulus** (0 error TypeScript).
- `npm run lint`: **lulus** (0 error ESLint).
- `npm run build`: **lulus** (Turbopack production build sukses).
- QA browser Paket 2: verifikasi 4 viewport (1440, 1024, 768, 360 px) membuktikan 6 zona interior ter-render lapang, sirkulasi koridor 2.5–3.0 unit terjaga, perabot solid dan berjarak lega, animasi latihan gym aktif. Bukti screenshot: `kantor_interior_1440px_1791146612300.png`, `kantor_interior_1024px_1791146625534.png`, `kantor_interior_768px_1791146643220.png`, `kantor_interior_360px_1791146664641.png`.

## Halaman operasional yang tersedia

Proyek fleksibel, tugas daftar/papan/kalender/Gantt/harian, milestone, subtugas/dependensi/pengulangan, catatan terformat, kegiatan, rapat/ICS, dokumen, risiko, tim/koordinasi, laporan snapshot, profil/PIN/cadangan, anggota/kas/barang/opname. Riwayat proyek berupa tab `/proyek?tab=riwayat`; URL lama mengalihkan ke tab.

Paket anotasi sebelumnya: 256 tes/42 berkas dan QA terang 360/383/768/1024/1440 px. Bukti historis: QA-ANOTASI.md. Pemeriksaan gelap tambahan belum lengkap. Audit UI legacy sebelumnya mencatat 111 temuan CSS dan enam kontrol mentah; audit tersebut belum diulang pada paket dunia.

## Batas dunia dan pekerjaan berikutnya

1. Nilai desain bersama pemilik, tingkatkan detail lingkungan/karakter sesuai referensi, dan selesaikan QA interaksi/akses/performa.
2. Slot gerai adalah urutan created_at lalu ID. Penghapusan unit dapat menggeser slot; layout permanen/editor posisi belum tersedia.
3. Ringkasan hanya catatan yang dimuat lewat paginasi workspace; belum total global atau sinkronisasi real-time.
4. Suplier/pengiriman/mobil ekspedisi, karakter pegawai, AI chat, editor lingkungan dan preferensi/layout cloud masih rencana.
5. Dunia membuka modul sumber untuk input; belum form tambah gerai langsung di scene. Tidak ada tabel baru atau migrasi SQL paket ini.

## Cloud dan batas produk

Target Supabase: mqycnhebhzqaziouipet. Migrasi awal/pencatatan kedua dan reset kosong pernah dilaporkan terkonfirmasi sebelumnya; bukan pemeriksaan cloud pada sesi ini. PIN/simpan setelah reset, indeks paginasi migrasi 6, relasi dokumen migrasi 7 dan smoke test produksi masih perlu dikonfirmasi. Jangan menjalankan ulang migrasi/reset berdasarkan tes lokal.

Belum tersedia: editor blok bebas, kolaborasi real-time, PWA/offline, unggah berkas, baseline/jalur kritis dan penjadwalan otomatis dependensi. Kas hanya uang masuk/keluar tercatat; opname tidak otomatis mengubah stok. Tidak ada deployment atau SQL cloud pada paket ini.

## Git dan kelanjutan

Cabang kerja codex/dunia-koperasi. Perubahan pemilik pada tujuh berkas UI/tema dan PLAN-ASTRA-Kopdes.md dipertahankan; daftar pada LANJUTAN-AI.md. Commit dunia hanya mencakup paket dunia dan dokumentasinya. Selalu periksa ulang Git sebelum melanjutkan.
