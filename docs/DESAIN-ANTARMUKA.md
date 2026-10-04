# Acuan desain antarmuka — 5 Oktober 2026

## Prioritas dan lingkup

Arahan terbaru memprioritaskan **Dunia Koperasi**, mengikuti lingkungan 3D dan kartu pada video pengguna. [DUNIA-KOPERASI](DUNIA-KOPERASI.md) menyimpan spesifikasi gaya, palet, komposisi, referensi, struktur kode dan cara melanjutkan.

| Permukaan | Gaya dan sumber |
|---|---|
| Dunia Koperasi `/dunia-koperasi` | Layar penuh 3D isometrik biru-putih, kartu mengambang, dock dunia. `src/features/cooperative-world/world.css` dan `world-objects.ts`. |
| Halaman operasional | Arang, hijau lembut/lavender, tema terang/gelap, sidebar/rel/dock aplikasi. globals.css, personal.css, tokens.css dan ui.css. |

Acuan e8fc8b4 dan arahan 3 Oktober untuk tweak kecil berlaku pada halaman operasional. Jangan memakai arahan tersebut untuk menolak atau menetralkan desain Dunia Koperasi. Jangan menyebarkan palet dunia ke seluruh form secara otomatis.

## Dunia Koperasi

Seluruh palet, komposisi kartu, scene, karakter, waktu, kendaraan dan rencana upgrade berada di [DUNIA-KOPERASI](DUNIA-KOPERASI.md). Dokumen ini tidak menyimpan salinan spesifikasi dunia. Jika ada konflik lama, ikuti kontrak dunia dan arahan pemilik terbaru.

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
