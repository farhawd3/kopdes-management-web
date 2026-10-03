# Status produk — 3 Oktober 2026

Keadaan aktif dirangkum di sini; riwayat paket ada di [CHANGELOG](../CHANGELOG.md), kebutuhan di [PRD](PRD.md) dan penerimaan di [CHECKLIST](CHECKLIST.md). Periksa Git kembali sebelum bekerja.

## Implementasi aktif

Konfigurasi lokal kini memakai `HUB_APP_ORIGIN=http://127.0.0.1:3000`, sesuai hostname `npm run dev` dan URL browser pemilik. Probe endpoint PIN dengan JSON sengaja tidak sah mendapat 400 (lolos pemeriksaan origin); `localhost` dan origin asing mendapat 403. Probe berhenti sebelum akses database, tidak memakai PIN atau menambah percobaan masuk. Login dengan PIN tetap perlu dicoba pemilik. Konfigurasi hosting tidak diubah.

- Ruang kerja pribadi dengan proyek fleksibel, catatan terformat, milestone, tugas daftar/papan/harian/kalender/Gantt, subtugas, prasyarat dan pengulangan.
- Koordinasi, rapat bertautan pengguna dan ICS, dokumen, risiko, kegiatan, laporan snapshot, profil, PIN dan cadangan JSON.
- Anggota, kas, barang dan opname memakai gerbang kemampuan database. Galat atau migrasi belum tersedia tidak ditampilkan sebagai data nol.
- Dashboard mempertahankan style acuan e8fc8b4 dan tweak berikutnya. Tugas/kegiatan awal dibatasi tiga; grafik/rutinitas opsional. Perlu Perhatian memakai permukaan netral dan rincian yang dapat dibuka. Acuan ada di [DESAIN-ANTARMUKA](DESAIN-ANTARMUKA.md).
- Font memakai token global; mobile memakai input/dropdown 14 px, judul halaman 20 px, judul bagian 17 px dan kartu 15 px. Kalender membuka ke bawah sesuai koreksi pemilik dan dibatasi area panel. Intro form tugas, toolbar linimasa, kartu dashboard/Hari Ini dan label proyek panjang diringkas; indikator simpan subtugas memakai hijau tema.
- Sepuluh folder domain dan enam kontrak/form bersama; tes dipisah menjadi unit, UI, database dan keamanan. Peta ada di [ARSITEKTUR](ARSITEKTUR.md).
- Sumber mati, CSS eksperimen, pratinjau ditolak dan screenshot sementara dibersihkan. Pagination/cache diperbaiki, modul besar dimuat terpisah dan progres memakai utilitas bersama.

## Bukti pemeriksaan terakhir

Koreksi mobile lanjutan: 171 tes/23 berkas, typecheck, lint, build dan audit sumber 74/74 lulus. Fixture 22 halaman pada 360 px dalam dua tema; 21 form Editor dalam dua tema tanpa luapan, seluruh input terlihat 14 px. Intro form tugas sekitar 70 px setelah basis flex 200 px yang menjadi tinggi kolom dibuang. Lima halaman inti diperiksa pada 360/393/768/1024/1440 px dalam dua tema. Linimasa diperiksa juga pada 338 px sesuai screenshot; toolbar ponsel sekitar 199 px, tanggal lengkap, tanpa luapan. Pending subtugas gelap terverifikasi hijau; kalender detail terverifikasi membuka ke bawah. Belum mencakup perangkat fisik atau seluruh keadaan/interaksi data nyata.

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
