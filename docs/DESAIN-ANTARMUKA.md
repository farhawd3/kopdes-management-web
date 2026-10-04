# Acuan desain antarmuka — 5 Oktober 2026

## Prioritas dan lingkup

Arahan terbaru memprioritaskan **Dunia Koperasi**, mengikuti lingkungan 3D dan kartu pada video pengguna. [DUNIA-KOPERASI](DUNIA-KOPERASI.md) menyimpan spesifikasi gaya, palet, komposisi, referensi, struktur kode dan cara melanjutkan.

| Permukaan | Gaya dan sumber |
|---|---|
| Dunia Koperasi `/dunia-koperasi` | Layar penuh 3D isometrik biru-putih, kartu mengambang, dock dunia. `src/features/cooperative-world/world.css` dan `world-objects.ts`. |
| Halaman operasional | Arang, hijau lembut/lavender, tema terang/gelap, sidebar/rel/dock aplikasi. globals.css, personal.css, tokens.css dan ui.css. |

Acuan e8fc8b4 dan arahan 3 Oktober untuk tweak kecil berlaku pada halaman operasional. Jangan memakai arahan tersebut untuk menolak atau menetralkan desain Dunia Koperasi. Jangan menyebarkan palet dunia ke seluruh form secara otomatis.

## Dunia Koperasi

- Geometri 3D sungguhan dengan kamera ortografis; terlihat sisi atas dan dua sisi objek, bayangan lembut, diorama bersih.
- Komposisi video: header putih, tiga ringkasan kiri atas, kontrol kamera, panel kanan dan ringkasan kegiatan kiri bawah. Dock bawah menghubungkan kawasan/kantor/karakter/suasana.
- Ponsel: panel kanan menjadi panel bawah bergulir dan dapat ditutup. Penanda serta daftar lokasi menyediakan akses alternatif.
- Exterior: kantor biru, gerai putih/biru, lahan hijau pucat bergaris, pohon hijau dan jalan biru abu.
- Interior cutaway: dinding/lantai putih, kaca kebiruan, meja kayu muda, kursi abu biru, workstation dan ruang rapat.
- Maskot ekspresif dan animatif sesuai permintaan pemilik. Identitas, pendapat dan kehadiran pegawai nyata tidak boleh dikarang.
- Bubble di atas kepala memakai konteks catatan atau label pratinjau. Belum layanan AI percakapan.
- Cuaca simulasi; waktu otomatis Asia/Jakarta atau pencahayaan manual. Suasana tidak mengubah tanggal catatan.
- Kartu putih transparan, border/bayangan ringan, radius sekitar 11 px, font Inter. Hindari backdrop blur: telah mengganggu ketajaman render dunia.
- Gedung, perabot, pakaian, tata lahan dan cuaca harus modular agar dapat ditingkatkan lewat prompt berikutnya.

## Halaman operasional

- Kanvas terang abu muda, kartu putih, teks arang, aksen hijau/lavender; tema gelap tersedia.
- Token aktif adalah sumber style. Perbaiki cascade pada sumber, jangan menambah lapisan important. Urutan impor ada di src/app/layout.tsx.
- Beranda mengutamakan tindakan, proyek dan kegiatan; daftar awal dibatasi tiga catatan, grafik/rutinitas opsional.
- Riwayat proyek adalah tab `/proyek?tab=riwayat`; alias `/riwayat-proyek` mengalihkan ke tab, tanpa menu riwayat sidebar terpisah.
- Judul lebih utama dari kode; metadata dan aksi terpisah, label panjang membungkus. Tidak ada capaian tiruan, slogan atau tim palsu.
- DateInput/DateField dan Select bersama; kalender ke bawah dalam batas panel, menu dapat menggulir. Form ponsel satu kolom.
- Status berupa teks selain warna. Memuat/kosong/galat harus berbeda; galat tidak menjadi angka nol.
- Perlu Perhatian memakai permukaan netral dan rincian bertautan sumber.

## Akses dan bukti

Target sentuh 44 px, label aksesibel, fokus keyboard, reduced-motion, safe area, dan scroll tabel/Gantt dalam kontainer. Dunia menyediakan kontrol HTML dan daftar lokasi sebagai alternatif model WebGL.

Periksa 360/768/1024/1440 px. Catat screenshot, interaksi dan state yang benar-benar diuji di STATUS. Build/tes DOM tidak membuktikan kesamaan visual dengan video, WebGL semua perangkat atau penerimaan pemilik. QA-ANOTASI, QA-TATA-LETAK dan QA-POPUP adalah bukti historis halaman operasional, bukan arahan yang mengalahkan dokumen ini.
