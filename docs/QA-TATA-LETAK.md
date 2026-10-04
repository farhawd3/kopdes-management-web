# Pemeriksaan tata letak — 4 Oktober 2026

> Catatan historis halaman operasional; bukan aturan aktif Dunia Koperasi. Kontrak dunia: [DUNIA-KOPERASI](DUNIA-KOPERASI.md). Temuan/angka lama harus diverifikasi ulang sebelum dikerjakan.


Paket memperbaiki overflow formulir rapat, pencatatan, kartu Gerai/Rapat, panduan dan pengaturan tema. Perubahan pencatatan dan tema yang sudah ada di checkout dipertahankan dan disempurnakan. Perubahan pemilik di komponen tanggal, dashboard, modal tugas, linimasa dan konteks tema tetap terpisah.

## Hasil

- Form rapat inline memakai container query: satu kolom jika kolom induk sempit, sekalipun layar desktop. Mode singkat Online/Tatap muka/Hybrid dan kontrol dropdown dapat bertambah tinggi.
- Empat buku memakai kartu secara bawaan di ponsel; pilihan tabel tetap tersedia. Filter pencarian terlihat, judul panjang membungkus, gulir tabel dibatasi kontainer.
- Gerai/Rapat memakai ikon domain, hierarki metadata dan opsi berpanel. Aksi tindak lanjut dan notulen rapat tidak diulang.
- Panduan berupa kartu tautan dengan ikon dan petunjuk empat buku. Palet tema berupa kisi; pratinjau dilipat untuk mengurangi tinggi awal.
- Ikon semantik bersama berada di AppIcon; acuan ukuran, aksesibilitas dan penambahan ikon di IKON.md. Pemeriksaan Unicode pada TSX tidak menemukan emotikon/piktogram teks tersisa; ikon Lucide lama tetap valid.

## Bukti pemeriksaan

- Anggota, kas, barang, opname, panduan, pengaturan: 360/768/1024/1440 px, terang/gelap, 48 kombinasi tanpa overflow halaman/kartu yang diukur.
- Gerai dan Rapat dengan opsi terbuka: empat lebar, dua tema, 16 kombinasi tanpa overflow.
- Form rapat inline: empat lebar, kontainer 274–293 px tidak meluap; baris tanggal/waktu menjadi satu kolom.
- Pratinjau tema terbuka: empat lebar, tidak meluap.
- Fixture mencakup judul panjang, relasi anggota/barang/gerai, nominal Rp1.234.567.890, kesiapan belum dinilai/sebagian/selesai, dan rapat beragenda/notulen.
- 247 tes/39 berkas, typecheck, ESLint, build dan audit sumber 95/95 lulus. Tes baru memeriksa bawaan kartu mobile, tombol tabel, pencarian dan aksi tindak lanjut tunggal.
- check:ui masih gagal: 18 kontrol mentah di luar UI bersama. lint:ui masih gagal pada 111 temuan CSS legacy; aturan tidak dilonggarkan.

Pengukuran/screenshot lokal ada di artifacts/astra (diabaikan Git). QA dilakukan pada /dev/popup, permintaan API diblokir sebelum fetch, draft/preferensi QA dipisahkan. Tidak menambahkan data dummy ke database. Pemeriksaan ini bukan audit seluruh keadaan, UAT data nyata, perangkat fisik atau pengujian perubahan palet dengan penyimpanan profil; pekerjaan tersebut tetap terbuka.
