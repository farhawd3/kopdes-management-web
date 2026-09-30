# Status proyek — 1 Oktober 2026

## Paket terbaru: desain studio dan pencatatan

Kode sudah dipush pada commit `894edd0`. Pemilik mengonfirmasi SQL berhasil dijalankan. Setelah aplikasi dimuat ulang, empat modul pencatatan terdeteksi aktif dan berhasil memuat data (masih 0 catatan).

- Layout baru: sidebar arang, permukaan netral, aksen hijau, tema terang/gelap, navigasi kelompok dan pintasan Kerja/Catat. Halaman lama memakai komponen dan tema bersama.
- Pencarian halaman Ctrl/⌘ K; navigasi bawah ponsel menyediakan akses Catat. Teks slogan diganti keterangan singkat.
- Kalender tugas: navigasi bulan, hari ini, agenda tanggal pilihan, status tugas. Form memakai pemilih tanggal dengan kalender, dropdown bertema pada browser pendukung, dan daftar centang prasyarat.
- Proyek tetap memiliki catatan terformat, daftar/papan/kalender/Gantt, status, prioritas dan tanggal bebas. Checklist subtugas dapat dicentang langsung pada kartu.
- Rapat: tatap muka/online/hybrid, lokasi, tautan bergabung, durasi, peserta, agenda/notulen, ekspor ICS waktu WIB. Tidak membuat konferensi atau mengirim undangan otomatis.
- Pencatatan dipisahkan: Anggota, Buku kas, Barang, Stok opname. Tambah/ubah, pencarian, filter, ringkasan dan ekspor CSV. Tidak ada data contoh produksi.
- Buku kas hanya merangkum uang masuk/keluar yang dicatat; bukan saldo rekening atau laporan laba rugi. Opname membandingkan fisik dengan snapshot stok buku tanpa koreksi otomatis.

## Database dan aktivasi

Supabase baru `mqycnhebhzqaziouipet`. Migrasi pertama tetap terpasang dan tidak diubah. Enam tabel fisik, 16 domain awal; migrasi `20261001000002_operations.sql` memperluasnya menjadi 20 domain.

Migrasi kedua menambah jenis catatan yang diizinkan, indeks nomor anggota/kode barang unik, validasi nominal/jumlah, relasi opname-barang dan fungsi pemeriksaan aktivasi. RLS dan sesi tetap berlaku. Seluruh perubahan berada dalam transaksi; tidak menghapus data lama. Berkas SQL dan langkah pemilik ada di [PENCATATAN.md](PENCATATAN.md).

Sebelum migrasi dipasang, aplikasi memberi keterangan belum aktif dan menonaktifkan tombol simpan modul baru. Kegagalan jaringan atau izin tidak dianggap sebagai data kosong. Modul proyek, tugas, dan rapat tetap tersedia.

## Verifikasi

Hasil akhir pengujian paket dan pemeriksaan browser dicatat di bagian penyerahan di bawah. Migrasi diuji pada PostgreSQL lokal melalui PGlite; pengujian itu tidak memasang migrasi cloud. Data uji hanya berada di tes lokal.

## Fondasi yang dipertahankan

Repo privat `halimxn/kopdes-management-web`, riwayat baru. Supabase lama tidak digunakan. PIN scrypt, sesi HttpOnly, pembatasan percobaan, Zod server, RLS, log perubahan dan relasi transaksi tetap aktif. Backup JSON dan pemulihan mencakup domain pencatatan baru setelah aktivasi.

Gantt mendukung rentang/skala, geser/resize, tinjau/simpan dan peringatan benturan prasyarat. Beranda, kesiapan gerai, pemangku/interaksi, rapat/keputusan, dokumen, risiko/isu, tim/pelatihan, jurnal, snapshot laporan dan cetak tetap tersedia. Tidak ada program wajib 90 hari; fixture lama hanya untuk tes.

## Pekerjaan pemilik dan batas berikutnya

- Migrasi kedua sudah dijalankan pemilik dan aktivasi terverifikasi melalui aplikasi lokal. Berikutnya uji simpan data nyata.
- Verifikasi Vercel setelah deployment terbaru. Perbaikan origin commit `15116e4` sudah dipush sebelumnya; login produksi belum dikonfirmasi. `HUB_APP_ORIGIN` produksi: `https://kopdes-management-web.vercel.app`.
- Belum ada multiuser/realtime, editor blok bebas, offline, unggah berkas, impor CSV, baseline/jalur kritis, atau penjadwalan otomatis dependensi.
- Kas sederhana belum mencakup akuntansi lengkap atau rekonsiliasi. Stok belum memiliki pergerakan otomatis/POS. Jumlah stok berupa unit bulat.
- Perangkat fisik Android/iOS/Safari dan audit aksesibilitas menyeluruh belum diuji. Pemulihan cadangan data nyata masih perlu lingkungan uji.

## Penyerahan paket 1 Oktober 2026

- **92/92 tes lulus**: keamanan/PIN/origin, relasi dan transaksi PostgreSQL, kompatibilitas proyek lama, kalender/navigasi bulan, tanggal kabisat, cashflow dan selisih stok, penolakan nominal tidak sah, formula CSV, ICS/WIB, gerbang migrasi, pengisian stok pembanding, simpan form dan gagal jaringan.
- Browser IAB: Pencatatan diperiksa 360/768/1024/1440 px tanpa overflow dokumen; form rapat/pemilih tanggal/dropdown diperiksa pada 360 dan 1440 px. Pencarian halaman diuji membuka Rapat. Tema terang/gelap diperiksa pada desktop.
- Pemeriksaan menggunakan data cloud yang masih kosong dan status migrasi belum aktif. Tidak memasukkan fixture ke database cloud. Uji penyimpanan domain baru berlangsung lokal dengan mock API dan PostgreSQL, belum UAT cloud.

Lint, TypeScript dan build produksi Next.js berhasil. Audit sumber: 48/48 berkas terjangkau. Aktivasi migrasi cloud sudah terverifikasi melalui aplikasi lokal; login deployment terbaru belum diverifikasi.

## Konfirmasi aktivasi cloud

Pemilik menyatakan SQL berhasil dijalankan. Pemeriksaan ulang `/pencatatan` pada aplikasi lokal menunjukkan peringatan belum aktif sudah hilang; Anggota, Buku kas, Barang, dan Stok opname masing-masing berhasil dimuat dengan 0 catatan. Tidak memasukkan data uji ke cloud. Penyimpanan pertama data nyata dan pengecekan di Vercel masih perlu dilakukan.

## Penyederhanaan interaksi — 1 Oktober 2026

Referensi resmi: [Linear display options](https://linear.app/docs/display-options) dan [Things](https://culturedcode.com/things/support/articles/1059358/). Mengadopsi daftar yang padat, pemisahan informasi, dan aksi langsung tanpa menyalin merek/aset.

- Halaman pencatatan memakai daftar buku, tombol tambah langsung, pencarian dan catatan terakhir yang dapat dibuka.
- Tambah tugas langsung dengan Enter, tenggat hari ini terlihat, dan lingkup proyek dipertahankan.
- Editor berupa panel samping desktop/layar penuh ponsel. Sidebar netral, aksen indigo, border tipis dan bayangan minimal menggantikan tampilan kartu promosi.
- Suite 92 tes sebelumnya lulus; dua tes interaksi baru juga lulus (total 94). Lint, TypeScript, dan build sukses pada perubahan aplikasi. Tidak ada migrasi tambahan.
