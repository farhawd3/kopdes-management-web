# Alur kerja Kopdes Management Web

## Menyiapkan ruang kerja

1. Ikuti [panduan Supabase](SUPABASE.md), gunakan proyek baru, dan simpan rahasia hanya di `.env.local`.
2. Pemilik membuat PIN sendiri, lalu masuk.
3. Isi profil koperasi dan tanggal mulai di Pengaturan.
4. Pilih memasang template 90 hari atau membuat proyek sendiri. Template hanya berisi rencana awal.

## Mengelola proyek dan tugas

1. Buka **Proyek**, pilih **Proyek baru**, isi judul, kode singkat, tujuan, PIC, tanggal, dan catatan.
2. Buka kartu proyek. Catatan, progres, milestone terkait, dan tugas berada dalam satu halaman.
3. Tambahkan tugas dari halaman proyek agar hubungan proyek terisi otomatis.
4. Gunakan tampilan **Daftar**, **Papan**, atau **Kalender** sesuai kebutuhan. Filter status/prioritas, cari catatan, dan urutkan tenggat.
5. Klik judul tugas untuk mengubah uraian, tenggat, subtugas, prasyarat, catatan, dan tautan bukti. Papan menyediakan penundaan satu hari/minggu serta penghapusan dengan konfirmasi.
6. Pindahkan status melalui dropdown atau seret kartu pada papan. Tugas berulang menghasilkan penerus sekali ketika diselesaikan.

Bidang kerja template dan proyek buatan sendiri menggunakan data yang sama. Persentase memperhitungkan progres subtugas; tugas dibatalkan tidak masuk penyebut. Data tanpa tugas belum memiliki progres yang bisa dinilai.

## Rutinitas manajer

- Pagi: buka Hari Ini, tinjau tugas terlambat dan agenda rapat.
- Saat bekerja: catat hasil rapat, keputusan, isu, dan tindak lanjut; hubungkan tugas dengan proyek, milestone, atau gerai.
- Sore: perbarui kesiapan/bukti dan jurnal kerja. Jangan menandai pekerjaan selesai tanpa pelaksanaan nyata.
- Mingguan: tinjau roadmap dan risiko, simpan snapshot laporan, cetak PDF bila diperlukan.
- Berkala: ekspor cadangan JSON. Pemulihan mengganti catatan dan snapshot; coba pada lingkungan uji lebih dahulu.

## Status dan keamanan

Tugas: `rencana → proses → selesai`, atau `dibatalkan`. Tanggal selesai diisi ketika status berubah ke selesai. Semua perubahan tetap diperiksa server, termasuk relasi/prasyarat, asal permintaan, dan sesi PIN.

Checklist: `rencana → proses → selesai`. Gerai: `rencana → persiapan → siap uji → siap buka → aktif`. Risiko/isu: `terbuka → ditangani → ditutup`.

## Siklus pengembangan

1. Baca STATUS, KEPUTUSAN, kebutuhan PRD, dan kode yang berkaitan.
2. Implementasikan paket kerja; gunakan schema bersama, validasi server, serta keadaan kosong/memuat/galat.
3. Jalankan tes, lint, typecheck, build; periksa UI utama secara terarah pada ukuran relevan.
4. Perbarui STATUS, CHECKLIST, dan CHANGELOG sesuai bukti.
5. Commit/push satu paket tuntas. Deployment dan migrasi cloud dipandu sesuai arahan pemilik.

Rancangan lanjutan (baseline Gantt, PWA, editor blok bebas, kolaborasi) tidak boleh ditampilkan sebagai fitur tersedia sebelum benar-benar diimplementasikan dan diuji.
