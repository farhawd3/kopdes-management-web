# Pencatatan anggota, kas, barang, dan opname

## Aktivasi database — menunggu persetujuan pemilik

Berkas: `supabase/migrations/20261001000002_operations.sql`.
Proyek tujuan: **mqycnhebhzqaziouipet**, Supabase baru Kopdes Management Web.

Migrasi ini:
- Memperluas jenis catatan pada tabel `hub_records` untuk anggota, transaksi kas, barang, dan stok opname. Tetap enam tabel fisik.
- Menambahkan nomor anggota dan kode barang yang unik, pemeriksaan nominal/jumlah, serta relasi opname ke barang.
- Menambahkan fungsi pemeriksaan aktivasi yang hanya dapat dipanggil server.
- Mempertahankan data lama, PIN, sesi, dan RLS. Tidak menghapus tabel atau catatan.

**Jangan jalankan sebelum menyetujui isi migrasi.** Setelah setuju:
1. Unduh cadangan JSON dari Pengaturan dan simpan di tempat pribadi.
2. Buka proyek **mqycnhebhzqaziouipet** di Supabase, lalu SQL Editor → New query.
3. Salin seluruh isi berkas migrasi di atas dan jalankan **sekali**. Jangan jalankan ulang migrasi pertama.
4. Pastikan transaksi selesai tanpa error. Jika gagal, transaksi dibatalkan; jangan menghapus constraint secara manual.
5. Muat ulang aplikasi. Keterangan “Pencatatan belum diaktifkan” akan hilang setelah fungsi baru tersedia pada API Supabase.
6. Catat satu data nyata, buka ulang halaman, dan periksa data tersimpan. Jangan kirim data pribadi atau kunci database melalui chat.

Migrasi baru sudah diuji pada PostgreSQL lokal. Pemasangan dan uji simpan di Supabase cloud tetap dilakukan pemilik; belum dianggap selesai sebelum dikonfirmasi.

## Pemakaian

- **Anggota**: nama, nomor anggota unik, tanggal bergabung, kontak, alamat, status, catatan. Tidak menyimpan NIK.
- **Buku kas**: catat uang masuk/keluar, nominal rupiah bulat, tanggal, kategori, kas/rekening, gerai, nomor bukti dan tautan berkas. Ringkasan mengikuti filter; selisih transaksi bukan saldo rekening, laba, atau laporan akuntansi lengkap. Saldo awal tidak diasumsikan.
- **Barang**: kode unik, nama, gerai, satuan, stok buku dan batas minimum. Stok berupa unit bulat. Kode unik lintas gerai; gunakan kode berbeda per penempatan jika barang sama berada di beberapa gerai.
- **Stok opname**: dari Barang pilih **Hitung stok**, atau tambah opname dan pilih barang. Stok buku disalin sebagai pembanding; isi hasil hitung fisik dan petugas. Selisih = fisik − buku. Penyimpanan opname tidak memperbarui stok barang otomatis. Koreksi barang dilakukan terpisah agar catatan pemeriksaan tidak berubah.
- Filter, pencarian, ubah catatan, dan CSV tersedia per buku. Angka ringkasan hanya ditampilkan jika modul aktif dan data berhasil dimuat.
- Backup JSON dan pemulihan mencakup domain baru. CSV hanya ekspor; tidak ada impor CSV. Anggota dapat dinonaktifkan; tidak ada tombol hapus transaksi/anggota/opname pada halaman pencatatan.

## Rapat online

Pilih jenis tatap muka, online, atau hybrid. Isi lokasi/tautan pertemuan, waktu WIB dan durasi. Tombol Bergabung membuka layanan yang Anda pilih. **Unduh agenda (.ics)** dapat diimpor ke aplikasi kalender. Aplikasi tidak membuat ruang Zoom/Meet, mengundang peserta, merekam video, atau mengirim email otomatis.

## Batas saat ini

Belum ada simpan pinjam, iuran otomatis, jurnal akuntansi berpasangan, rekonsiliasi bank, pergerakan stok otomatis, transaksi POS, multiuser atau sinkronisasi kalender dua arah. Penyuntingan catatan memakai pola terakhir disimpan; belum ada penguncian untuk perubahan bersamaan dari beberapa perangkat.
