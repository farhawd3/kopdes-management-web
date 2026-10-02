# Acuan desain antarmuka untuk AI

Dokumen ini merangkum bentuk produk yang disetujui pemilik; **kode dan hasil render adalah keadaan nyata**. Referensi gambar yang pernah dikirim lewat chat belum disimpan sebagai aset repo. Jangan menganggap mockup sebagai bukti implementasi. Sebelum mengubah tampilan, baca `../AGENTS.md`, `STATUS.md`, dan `LANJUTAN-AI.md`, lalu periksa halaman terkait di browser.

## Karakter visual

Ruang kerja pribadi manajer koperasi, terinspirasi aplikasi tugas profesional: bersih, mudah dipindai, sedikit ekspresif, tidak seperti template dashboard generik. Dasar terang berupa kanvas abu sangat muda, kartu putih, teks arang, aksen hijau lembut dan lavender; mode gelap tersedia. Kartu membulat, bayangan tipis, border halus, jarak konsisten. Aksen hanya menandai tindakan utama atau status, bukan menghias semua elemen. Hindari glow merah, angka ilustrasi, avatar tim palsu, slogan, dan ornamen tanpa fungsi.

Token dasar ada di `src/app/personal.css`: `--canvas`, `--surface`, `--brand`, `--ink`, `--line`, skala radius, ukuran kontrol, dan tombol. Pilihan tema memakai `data-theme-color` (lime, peach, lavender, sage, sky; tambahan tema dapat ada di bawah file). **Jangan menyalin kode hex dari ringkasan ini**; CSS aktif mungkin menimpa token awal. `src/app/layout.tsx` menentukan urutan impor CSS. Saat ada gaya bertabrakan, rapikan sumbernya, jangan terus menambah lapisan `!important`.

## Kerangka layar

| Lebar | Navigasi | Area kerja |
|---|---|---|
| Ponsel sekitar 360–767 px | Navigasi bawah mengambang dan menu tambahan yang jelas; hormati safe area | Satu kolom. Aksi utama mudah dijangkau ibu jari. Tidak ada gulir horizontal halaman; tabel/Gantt bergulir di kontainernya. |
| Tablet sekitar 768–1023 px | Rel navigasi ringkas | Konten memakai lebar tersisa; panel yang terlalu sempit menjadi satu kolom. |
| Desktop mulai 1024 px | Sidebar yang bisa diciutkan, topbar ringkas | Konten mengisi ruang setelah sidebar; saat diciutkan tidak boleh tersisa ruang kosong di kanan. |

Topbar menunjukkan lokasi halaman dan aksi yang benar-benar dipakai. Judul halaman singkat; tab horizontal untuk tampilan/bagian, bukan menu berulang. Dashboard mengutamakan tugas yang perlu tindakan, tenggat, rapat, dan ringkasan data nyata. Proyek, tugas, kalender, papan, Gantt, dan detail tugas harus terasa sebagai satu aplikasi melalui tipografi, komponen, status, dan cara membuka catatan yang sama.

## Bentuk komponen

- **Kartu**: permukaan jelas, judul dan meta terpisah, tindakan mudah ditemukan, hover halus. Jangan memberi setiap kartu gradien/warna kuat. Kartu berisi data nyata dan satu tujuan.
- **Tombol**: primer untuk tindakan utama, sekunder untuk navigasi/opsi, destruktif hanya untuk hapus. Ikon selalu terlihat dan memiliki label aksesibel. Area sentuh minimum 44 px pada ponsel. Keadaan disabled jelas beserta sebab jika perlu.
- **Form**: label di atas kontrol, bantuan dekat input, dependensi dikunci sampai prasyarat dipilih. Pada ponsel satu kolom. Kesalahan ditampilkan dekat kolom atau pada ringkasan yang terlihat.
- **Status**: teks selalu tampil; warna konsisten lintas Beranda, Hari Ini, daftar, papan, kalender, Gantt, dan detail. Bedakan `rencana`, `proses`, `selesai`, `dibatalkan` tanpa mengandalkan warna saja.
- **Dialog/detail**: lebar aman di ponsel, tinggi maksimal mengikuti viewport, isi dapat bergulir, tombol tutup dan aksi tetap terjangkau. Escape dan fokus keyboard harus berfungsi.
- **Grafik**: data terhubung dengan filter dan daftar sumber; keadaan nol menjelaskan bahwa belum ada aktivitas, bukan menampilkan batang dekoratif. Animasi singkat dan mati saat reduced-motion.

## Alur visual inti

1. Beranda: tugas perlu perhatian → pilih tugas → detail → ubah status → daftar dan ringkasan ikut berubah.
2. Proyek: pilih proyek → lihat milestone, tugas, catatan, dan progres dari referensi yang sama.
3. Tugas: pindah Daftar/Papan/Kalender/Gantt/Harian tanpa kehilangan konteks; tutup detail tidak membukanya ulang.
4. Pencatatan: ringkasan hanya pintu masuk; Buku Kas, Barang, Stok Opname, Buku Anggota punya halaman input sendiri.
5. Rapat: tempat/tata cara online jelas; tautan meeting berasal dari pengguna, bukan layanan video bawaan.

## Pemeriksaan visual yang wajib dicatat

Uji 360, 768, 1024, 1440 px pada tema terang dan gelap untuk Beranda, Tugas, detail/modal, Harian, Proyek, kalender, Gantt, dan Pencatatan. Periksa ruang kosong, tumpang tindih, scroll, fokus, tombol, dan teks terpotong. Bandingkan keadaan kosong, memuat, galat, dan berisi data. Catat apa yang benar-benar diuji di `STATUS.md`; jangan menandai semua perangkat selesai hanya karena build lulus.

Perbaikan yang masih terbuka ada di `LANJUTAN-AI.md`: navigasi ponsel, sidebar ciut, modal sempit, konsistensi status/aksi tugas, serta sumber glow merah. Jangan mengubah acuan ini menjadi klaim bahwa masalah tersebut telah selesai.
