# Acuan desain antarmuka — 4 Oktober 2026

Arahan terbaru pemilik mengganti acuan e8fc8b4 dengan [paket isometrik](paket_koperasi_isometrik/01_panduan/00_BACA_DULU.md). Referensi utama adalah frame WareTrack dan mockup UI dalam paket. Panduan visual sebelumnya disimpan di [_arsip](_arsip/DESAIN-ANTARMUKA-20261003.md); log, pengetahuan AI, panduan fitur, SQL dan catatan QA dipertahankan.

## Tampilan aktif

- Dunia Koperasi pada `/dunia-koperasi` memiliki scene luar dan kantor, objek SVG interaktif, kartu putih melayang, aksen biru, kanvas lavender, dan navigasi khusus.
- Halaman kerja lama tetap tersedia, memakai permukaan/token pastel yang diselaraskan. Fungsi tugas/proyek, PIN, buku dan cadangan dipertahankan.
- `src/app/world.css` adalah lapisan visual isometrik dan penyelarasan halaman kerja. Sumber bentuk karakter berasal dari `05_demo/char.js`, dipindahkan ke TypeScript. Token pencahayaan berasal dari paket.
- Meja dan kendaraan mengikuti catatan yang dimuat. Tujuh slot visual tidak membatasi jumlah catatan Gerai. Catatan lain dapat dijangkau melalui daftar modul.
- Cuaca manual hanya mengubah suasana. Waktu memakai Asia/Jakarta; tidak menampilkan suhu atau status sinkronisasi palsu.
- Mode daftar, keyboard, tema gelap, reduced-motion dan kualitas rendah tersedia. Navigasi ponsel melayang, navigasi dunia tablet/desktop berupa rel ikon.

## Pengujian dan batas

Bukti paket dan batas ada di [DUNIA-KOPERASI](DUNIA-KOPERASI.md). Pengukuran keadaan kosong pada empat lebar bukan bukti semua halaman lama, perangkat fisik, data banyak atau Supabase cloud selesai diperiksa. Tidak mengklaim render 3D/WebGL, FPS terukur, kamera putar isometrik, Open-Meteo, atau jadwal pekerjaan berubah akibat cuaca.
