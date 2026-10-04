# Dunia Koperasi — implementasi 4 Oktober 2026

## Tersedia

- Rute `/dunia-koperasi`, menu khusus pada sidebar dan navigasi dunia. Rel ikon tablet/desktop, menu bawah bergulir pada ponsel; halaman kerja tetap dapat dijangkau.
- Scene luar dengan jalan, kantor, gudang, pohon dan tujuh slot gerai. Slot mengikuti gerai tersimpan; kosong membuka rincian dan form Gerai. Gerai ke-8+ tetap tersedia di halaman Gerai.
- Scene kantor dengan meja Tugas, Kegiatan hari ini, Rapat tujuh hari, Proyek terbuka dan Arsip. Meja kosong bersih. Data aktif mengisi meja dan karakter kerja.
- Mitra dan suplier aktif menjadi kendaraan pastel. Maksimal 12 kendaraan digambar bersamaan; semua catatan dimuat tetap tersedia di mode daftar dan halaman modul.
- Panel rincian membuka sumber tugas, gerai, kesiapan, mitra, suplier, barang dan opname. Escape menutup rincian dahulu, lalu keluar kantor. Objek menerima Tab/Enter/Space; tersedia Daftar saja, kamera geser, zoom 0,8–1,4 dan reset.
- Karakter memakai renderer paket dengan pose jalan, duduk, bekerja, berpikir dan lambai. Preferensi seragam (8), kulit (6), rambut/kerudung dan aksesori di Pengaturan; avatar profil sama. Maksimal lima karakter meja dan satu manajer. Animasi berhenti saat tab tersembunyi, reduced-motion atau kualitas rendah.
- Waktu Jakarta dan jam tetap, interpolasi langit/tint/lampu, bayangan siang, matahari/bulan/bintang, awan, hujan dan kabut. Cuaca manual, tanpa suhu buatan. Kualitas rendah menghentikan efek berjalan.
- Pencarian catatan dimuat, tiga ringkasan aktual, pintasan `/`, tautan catatan perlu perhatian, panel alur pekerjaan aktual, daftar gerai/meja dan tema terang/gelap.
- Halaman kerja mendapat kanvas lavender, kartu putih, border/bayangan biru dan aksen biru melalui world.css.
- Suplier memakai hub_records, skema Zod, form/daftar umum, sesi dan origin mutasi yang sama. Hubungan ke barang, mitra, dokumen, kegiatan dan tugas. Capability server membedakan migrasi belum aktif dari data kosong. Cadangan JSON memakai validasi entitas yang sama.
- Migrasi 8 dan SQL gabungan instalasi/reset dibuat ulang **secara lokal**, tidak dieksekusi cloud. Migrasi menambah domain, validasi status/nama serta relasi kegiatan dan kemampuan hanya service_role.
- Panduan visual 3 Oktober disalin ke `_arsip`; riwayat QA dan pengetahuan AI dipertahankan. Repositori publik baru direncanakan bernama kopdes-dunia-koperasi; panduan dan skrip riwayat bersih ada di GITHUB-DUNIA-KOPERASI.md.

## Bukti dan batas pemeriksaan

Keadaan kosong scene luar/kantor di browser lokal pada 360, 768, 1024 dan 1440 px: scrollWidth tidak melebihi lebar viewport. Gedung masuk kantor, meja kosong dan rincian slot diverifikasi. Tes model memeriksa perubahan tujuh slot, status tugas/suplier, rapat tujuh hari, pencahayaan dan Zod. Tes UI memeriksa navigasi kantor, Escape per tingkat, keyboard slot, aksi tambah, gudang belum aktif dan mode daftar. Migrasi supplier diuji PostgreSQL lokal/PGlite; bukan Supabase cloud.

Pemeriksaan akhir: 266 tes/44 berkas lulus dengan dua worker; TypeScript dan ESLint lulus. Satu tes kalender lama sempat timeout ketika pemeriksaan berat berjalan bersamaan, kemudian seluruh rangkaian lulus. Build produksi lulus. Bukti ringkas juga dicatat di STATUS.

Belum diverifikasi: UAT data operasional, tambah/hapus gerai di cloud, login/PIN setelah reset, restore cadangan nyata, perangkat sentuh fisik, seluruh halaman/state/tema lama, kontras seluruh teks, Lighthouse dan FPS. Pemetaan slot mengurutkan tanggal pembuatan; saat gerai tengah dihapus, gerai sesudahnya mengisi slot yang kosong.

SVG ini interpretasi ringan referensi, bukan render 3D identik video. Kendaraan bergerak pada lintasan pendek dan belum berhenti menurut kegiatan; karakter meja belum memakai pencarian jalur lintas ruang atau depth-sort dinamis. Rotasi kamera isometrik, Open-Meteo/koordinat, petir/riak, penurunan kualitas otomatis menurut FPS serta tema otomatis mengikuti waktu belum diterapkan. Cuaca tidak mengubah catatan kerja. Tidak ada lima status proses buatan: panel pekerjaan memakai status tugas yang sudah tersedia.

Pemilik pada 4 Oktober meminta SQL dibuat lokal dahulu dan akan memasukkannya sendiri ke cloud. Cloud belum diubah. Untuk mengaktifkan Suplier di kemudian hari, jelaskan dan minta konfirmasi `supabase/migrations/20261004000008_supplier.sql` pada proyek `mqycnhebhzqaziouipet`, sesudah memeriksa migrasi 1–7. Jangan menjalankan reset untuk aktivasi ini.
