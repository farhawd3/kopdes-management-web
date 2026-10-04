# Checklist produk aktif

Implementasi dan penerimaan dipisahkan. Bukti terakhir ada di [STATUS](STATUS.md), riwayat paket di [CHANGELOG](../CHANGELOG.md).

## Implementasi tersedia

- [x] PLAN-ASTRA fase 1: audit AST seluruh kontrol HTML, inventaris rute/overlay, CSS dan selector berulang yang dapat dibuat ulang.
- [x] Fondasi token semantik dan stylelint CSS baru tanpa hex/important; migrasi legacy belum selesai.
- [x] Primitive tombol/input, nol kontrol mentah luar UI; tanggal tunggal, DateNav, BottomNav, dialog bersama dan galeri development. Batas QA tercatat di LAPORAN-ASTRA.
- [x] Kartu statistik dashboard netral, baris terlambat dan tata letak adaptif; pemeriksaan Beranda empat lebar terang dan gelap 1440.

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
