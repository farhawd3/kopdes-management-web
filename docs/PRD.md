# PRD — Ruang kerja proyek Kopdes

## Tujuan

Aplikasi pribadi manajer koperasi untuk mengelola banyak proyek, tugas, catatan, jadwal, dan koordinasi. Proyek memiliki durasi sendiri. Tidak ada program wajib 90 hari atau data capaian tiruan. Pengalaman terinspirasi workspace Notion, dengan fungsi yang langsung berguna bagi manajer.

## Ruang proyek

- Galeri proyek dengan pencarian dan filter rencana/aktif/ditunda/selesai/arsip.
- Properti: nama, kode, tujuan, PIC, prioritas, tanggal mulai/target, warna, dan catatan.
- Tugas, milestone, dan progres terhubung melalui ID proyek (`workstream_id`).
- Catatan mendukung judul, paragraf, daftar, checklist, kutipan, dan pratinjau. Penyimpanan eksplisit; HTML tidak dieksekusi.

## Pengelolaan tugas

- Tampilan daftar, papan, kalender, dan Gantt memakai data yang sama.
- Status, prioritas, PIC, tanggal mulai/tenggat, subtugas, prasyarat, POAC, pengulangan, bukti dan catatan.
- Pencarian, filter proyek/status/prioritas, urut tenggat/nama/pembaruan.
- Status dapat diubah dari daftar atau papan. Penundaan/penghapusan berada pada Opsi lainnya kartu.
- Pengulangan dibuat sekali dalam transaksi. Prasyarat melingkar ditolak server/database.

## Gantt

- Pilih proyek, awal/akhir rentang, skala hari/minggu/bulan, periode sebelumnya/berikutnya, dan fokus jadwal.
- Rentang tampilan maksimal 366 hari untuk menjaga rendering ringan; proyek tidak dibatasi sepanjang itu. Geser periode untuk melihat tahun lain.
- Tugas di luar rentang tidak dipaksakan ke tepi; tugas yang melintasi batas dipotong dan ditandai.
- Tanggal hari ini, status pekerjaan, milestone, dan peringatan benturan jadwal prasyarat ditampilkan.
- Geser batang untuk memindahkan jadwal; tarik ujung kanan untuk mengubah tenggat. Tinjau lalu Simpan jadwal.
- Keyboard: panah kiri/kanan menggeser satu hari, Shift+panah mengubah tenggat. Klik nama tugas membuka form tanggal. Ponsel menyediakan daftar tanggal yang dapat diedit.
- Tidak menggeser semua tugas turunan secara otomatis. Baseline dan jalur kritis otomatis belum tersedia.

## Modul manajer

Beranda dan Hari Ini merangkum pekerjaan aktual. Kesiapan/gerai, pemangku/interaksi, rapat/keputusan, dokumen/legalitas, risiko/isu, tim/pelatihan, jurnal, dan laporan tetap tersedia. Rapat/isu dapat menjadi sumber tugas. Laporan merupakan snapshot per periode, bisa dicetak atau disalin sebagai teks.

## Desain dan akses

- Sidebar berkelompok, rel tablet, navigasi bawah ponsel. Area sentuh minimal 44 px.
- Latar lembut, teks arang dan aksen hijau lembut/lavender, kartu berlapis dan bayangan ringan, teks utama jelas, status berlabel.
- Tema terang/gelap dan kepadatan. Tabel/Gantt menggulir dalam kontainer.
- Dialog fokus, label input, error yang jelas, reduced-motion, data kosong tanpa angka buatan.

## Data dan kompatibilitas

Enam tabel fisik Supabase dengan domain JSONB, validasi Zod server, relasi database, RLS, dan sesi PIN. Properti proyek baru memiliki default sehingga data lama tetap terbaca. Migrasi terpasang tidak diubah. Endpoint pemasangan rencana lama dilepas; catatan yang pernah disimpan tidak dihapus.

## Batas implementasi

Belum ada editor blok drag-and-drop, multiuser/kolaborasi real-time, PWA/offline, unggah berkas, baseline/jalur kritis, atau penjadwalan otomatis semua dependensi. UAT dan pengujian perangkat fisik harus dilakukan sebelum penggunaan rutin. Status bukti ada di [STATUS](STATUS.md); rancangan terdahulu tersedia melalui riwayat Git, bukan instruksi aktif.

## Perluasan 1 Oktober 2026

Arahan 1 Oktober menambahkan area Pencatatan terpisah: anggota, buku kas, barang dan stok opname. Tambah/ubah catatan, pencarian, filter, ringkasan, serta ekspor CSV tersedia. Stok opname memotret stok pembanding, tidak mengubah stok buku otomatis. Buku kas bukan akuntansi lengkap. Aktivasi cloud memerlukan migrasi kedua dan persetujuan pemilik; lihat [PENCATATAN](PENCATATAN.md) dan bukti cloud di [STATUS](STATUS.md).

Desain studio menggantikan tema rose/lavender sebagai tampilan aktif: sidebar arang, permukaan netral, aksen hijau. Pencarian halaman Ctrl/⌘ K, navigasi kelompok, akses Catat di ponsel, pemilih tanggal, serta checklist subtugas mempercepat penggunaan. Rapat mendukung jenis online/hybrid, tautan bergabung, durasi, lokasi dan ekspor ICS.
