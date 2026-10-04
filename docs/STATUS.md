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
- Three.js: kamera ortografis dengan radius target hingga 26 unit, pencahayaan ACESFilmic dan PCFShadowMap, kontrol zoom/putar/reset, penanda HTML, serta raycast klik objek gedung/lahan/kendaraan/karakter.
- Exterior luas (58 × 38 unit): kantor koperasi, jalan aspal dua arah dengan marka tengah & zebra cross, plaza sentral berair mancur dan bangku taman, area parkir, loading dock logistik berkanopi, dan tujuh lahan gerai yang terhubung catatan `units`.
- Default waktu adalah Siang terang; kontrol cepat **Waktu** (Siang, Pagi, Senja, Malam, WIB) dan **Cuaca** (Cerah, Berawan, Hujan) langsung terlihat dan dapat diklik 1 kali pada desktop maupun ponsel tanpa harus membuka panel samping.
- Kendaraan suasana modular: Mobil Manajer terparkir di slot parkir, Van Distribusi di area bongkar muat, dan Truk Muatan Logistik bergerak di sepanjang jalan raya; klik kendaraan menampilkan kartu detail berstatus "Simulasi lingkungan".
- Manajer berpatroli berkala memeriksa kawasan (kantor -> plaza -> trotoar gerai -> kantor) dengan langkah berjalan dan arah badan realistis; bubble kontekstual jarang ("Ada tugas yang perlu ditinjau?", "Ada kegiatan hari ini di jurnal!", dll.) muncul ramah dan menjeda patroli saat diajak berinteraksi.
- Interior kantor dengan zona Gym modern: dual treadmill berpanel LED, bangku latihan, rak dumbbell beban bertingkat, dispenser air minum, dan penanda Gym & Kegiatan. Karakter beraksi di treadmill saat ada kegiatan jurnal, duduk di kursi saat rapat berlangsung, dan mengetik di meja tugas saat ada tugas berproses.
- Style dunia terisolasi di `world.css` dan palet Three.js di `world-objects.ts`.

## Pemeriksaan paket terbaru

- `npm test -- --maxWorkers=2`: **269 tes / 44 berkas lulus 100%**. Penambahan pengujian unit dan UI untuk kontrol cepat cuaca/waktu, tata letak map luas, dan armada kendaraan suasana.
- `npm run typecheck`: **lulus** tanpa galat TypeScript.
- `npm run lint`: **lulus** (ESLint pada `src` dan `tests`).
- `npm run build`: **lulus**, produksi Next.js Turbopack teroptimasi tanpa galat.
- QA browser: rendering 3D, perpindahan waktu/cuaca cepat, inspeksi mobil manajer/van/truk, penjelajahan interior kantor/gym, dan dock navigasi diverifikasi pada **360, 768, 1024, 1440 px**.

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
