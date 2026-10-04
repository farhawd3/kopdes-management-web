# Checklist produk aktif — 5 Oktober 2026

Implementasi, bukti pemeriksaan dan penerimaan dibedakan. STATUS adalah keadaan terbaru; CHANGELOG dan laporan QA menyimpan sejarah. Daftar lama yang mengulang angka tes dan instruksi layout usang telah diringkas.

## Dunia Koperasi

- [x] Analisis empat frame video dan referensi interior; simpan referensi/gaya untuk AI berikutnya.
- [x] Halaman dunia pada navigasi aplikasi, layar penuh/dock, sesi dan data workspace.
- [x] Exterior/interior Three.js, kamera ortografis, zoom/putar/reset dan penanda HTML.
- [x] Kantor membuka interior; tujuh lahan terisi otomatis dari unit yang dimuat.
- [x] Meja rapat, workstation tugas, arsip/buku dan treadmill kegiatan dengan tautan modul.
- [x] Maskot modular, bubble, animasi berbasis data dan pratinjau gerakan.
- [x] Cuaca simulasi/waktu WIB/pakaian; preferensi lokal tervalidasi.
- [x] Tes adapter/UI, typecheck, lint dan production build. Cakupan aktual di STATUS.
- [x] QA lokal kosong exterior/interior 360/768/1024/1440, tanpa luapan; penanda masuk kantor/bubble/pratinjau rapat-gym.
- [ ] Penerimaan pemilik atas kualitas dan kemiripan final dengan video.
- [ ] Semua interaksi/state, raycast objek langsung, semua cuaca/waktu, keyboard/reduced-motion dan fallback WebGL.
- [ ] Semua target sentuh/kontras, perangkat fisik, WebGL perangkat rendah dan benchmark performa.
- [ ] UAT pemetaan/sinkronisasi dengan data nyata dan paginasi.
- [ ] Slot lahan permanen/editor lingkungan dan preferensi/layout lintas perangkat.
- [ ] Suplier, jadwal pengiriman dan kendaraan ekspedisi; masih rencana.
- [ ] Karakter pegawai nyata atau AI chat; belum tersedia.

## Fitur operasional tersedia

- [x] Proyek fleksibel, properti, catatan, tugas/milestone dan progres bersama.
- [x] Tugas daftar/papan/harian/kalender/Gantt, filter, subtugas, dependensi dan pengulangan.
- [x] Riwayat berupa tab horizontal Proyek; alias lama redirect, tugas historis tetap tersedia.
- [x] Beranda/Hari Ini dari data asli, kegiatan terpisah dari tugas.
- [x] Rapat/ICS, koordinasi, dokumen, risiko, jurnal dan laporan snapshot.
- [x] Anggota, kas, barang dan opname dengan gerbang kemampuan database.
- [x] PIN/sesi/RLS/Origin, profil dan cadangan JSON.
- [x] Paket perbaikan anotasi sebelumnya; bukti/batas di QA-ANOTASI.md, QA-TATA-LETAK.md dan QA-POPUP.md.

## Penerimaan operasional dan cloud terbuka

- [ ] Konfirmasi PIN/simpan setelah reset serta keadaan migrasi cloud 6/7.
- [ ] UAT data nyata dan konsistensi lintas tampilan, cadangan/pemulihan di lingkungan uji.
- [ ] Audit UI legacy: lint:ui/check:ui belum diulang; laporan sebelumnya 111 temuan CSS dan enam kontrol mentah.
- [ ] Sel kalender panel sempit, semua modul/tema/state/akses dan perangkat fisik.
- [ ] Lighthouse/performa data besar dan smoke test produksi setelah deployment yang diizinkan.

## Pengembangan di luar paket ini

- [ ] Editor blok bebas, kolaborasi real-time, PWA/offline dan unggah berkas.
- [ ] Baseline/jalur kritis, penjadwalan otomatis dependensi dan impor CSV buku.

SQL cloud tetap memerlukan penjelasan berkas, dampak, proyek tujuan dan persetujuan pemilik. Tidak ada migrasi baru atau reset pada paket dunia. Program 90 hari bukan instruksi aktif.
