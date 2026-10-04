# Status produk — 5 Oktober 2026

Dokumen ini mencatat keadaan aktif. Riwayat paket ada pada CHANGELOG dan laporan QA; arahan desain terbaru ada pada DESAIN-ANTARMUKA dan DUNIA-KOPERASI. Jangan memakai bagian historis sebagai instruksi yang mengalahkan permintaan terbaru.

## Prioritas aktif

Panduan AI/tool/skill telah disederhanakan dan lingkup historis dipertegas. Fokus implementasi berikut: dunia dan koneksi data web, dimulai dari paket terang/map pada DUNIA-KOPERASI. Audit ini terbatas dokumen repo yang tersedia; tidak mengubah aturan global AI di luar proyek.

Dunia Koperasi mengikuti video pengguna: 3D isometrik biru-putih, kartu mengambang, kantor/interior, tujuh lahan gerai, maskot animatif/bubble, cuaca dan waktu. Panduan telah diringkas, konflik lingkup tema diperjelas, referensi video/interior disimpan di docs/referensi-dunia agar dapat dibaca AI berikutnya.

## Penilaian pemilik terbaru

Versi sekarang belum diterima: kawasan kecil/sepi, mobil belum ada, tampilan agak gelap, pengaturan waktu tidak mudah ditemukan dan perpindahan karakter belum terlihat. Gym aktif serta patroli manajer sesekali belum tersedia. Kontrol manual/animasi pose ada dalam kode, tetapi bukan bukti pengalaman tersebut memenuhi permintaan. Rencana paket revisi ada hanya di [DUNIA-KOPERASI](DUNIA-KOPERASI.md); pembaruan ini dokumentasi, belum implementasi runtime.

## Implementasi Dunia Koperasi

- `/dunia-koperasi` terdaftar pada navigasi, menggunakan sesi aplikasi dan data workspace, dengan layar penuh/dock khusus.
- `/dev/dunia-koperasi` hanya development, workspace kosong tanpa akses database.
- Three.js: kamera ortografis, cahaya/bayangan, kontrol kamera, penanda HTML dan raycast objek gedung/karakter/lahan.
- Exterior: kantor koperasi, tujuh lahan yang diisi dari domain units, jalan, pohon, bangku dan area rencana logistik.
- Interior: meja rapat, komputer/tugas, arsip/buku, treadmill kegiatan. Detail membuka halaman operasional asli.
- Maskot bergerak berdasarkan rapat aktif WIB, jurnal hari ini atau tugas proses; pratinjau gerakan dan bubble tersedia. Maskot tidak mewakili kehadiran pegawai nyata.
- Cuaca cerah/berawan/hujan merupakan simulasi. Waktu WIB otomatis/manual; pakaian dan suasana disimpan lokal dengan Zod/usePreference.
- Style dunia terisolasi di world.css. Backdrop blur dihapus; kesamaan final dengan video belum dinilai/disetujui pemilik.

## Pemeriksaan paket terbaru

- `npm test -- --maxWorkers=2`: **266 tes / 44 berkas lulus**. Enam tes adapter dan empat tes UI baru. Percobaan awal tanpa batas worker dihentikan karena membebani mesin.
- `npm run typecheck`: **lulus** setelah opsi Testing Library yang tidak sah diperbaiki.
- `npm run lint`: **lulus**.
- `npm run build`: **lulus**, termasuk route dunia dan pratinjau development yang ber-guard notFound pada produksi.
- QA browser lokal workspace kosong: exterior/interior diperiksa pada **360, 768, 1024, 1440 px**; pengukuran scrollWidth sama dengan viewport, tanpa luapan halaman.
- Masuk kantor via penanda, bubble maskot, pilihan pencahayaan siang, serta pratinjau duduk rapat/olahraga diuji. Screenshot terpilih disimpan pada docs/referensi-dunia; seluruh bukti lokal pada artifacts/world-reference/qa.
- Tes UI memakai scene tiruan. Belum UAT data cloud, semua kombinasi cuaca/waktu, reduced-motion, raycast langsung seluruh objek, fallback WebGL, target sentuh/kontras lengkap, atau perangkat fisik.

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
