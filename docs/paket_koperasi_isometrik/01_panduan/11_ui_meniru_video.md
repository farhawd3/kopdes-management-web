# 11 · UI Meniru Video WareTrack

Gambar acuan: `../02_referensi_gambar/ui/11_mockup_ui_mirip_video.png` (+ `.svg`), dan frame asli di `asli/`.
Ukuran video sumber 1250×720. Semua ukuran di bawah dalam px pada kanvas itu; skala proporsional untuk layar lain.

## Prinsip
Dunia isometrik memenuhi seluruh layar (full-bleed). Semua UI = **kartu putih melayang** di atasnya. Tidak ada sidebar penuh,
tidak ada header berwarna. Latar kartu putih ±94% opak, radius 14–18, bayangan biru lembut, border 1px #DDE4F8 pada input.

## Peta komponen (video → koperasi)
| # | Video (WareTrack) | Posisi/ukuran (1250×720) | Versi koperasi |
|---|---|---|---|
| 1 | Bilah atas | x 20–1230, y 10–48, radius 14 | Logo KoperasiKu · pencarian · pemilih gerai · pil "Live" · lonceng · profil |
| 2 | Logo + nama (biru, kubus) | kiri bilah | Ikon rumah biru + "KoperasiKu" 20px bold |
| 3 | Kolom cari | x 235–586, tinggi 34, ikon kaca pembesar, kunci `/` | "Cari tugas, gerai, mitra, suplier, rapat…" — tekan `/` untuk fokus |
| 4 | Pemilih situs (badge WH-01, nama, sub "78% full · 1/2 docked", chevron) | x 670–883 | Pemilih gerai: badge `G-03`, nama gerai, "78% siap · 2 tugas"; mengubah fokus dunia ke gerai itu |
| 5 | Pil "Live 09:41" (titik hijau) | x 897–978 | Pil jam/status sinkron data ("Live 09:41"); abu bila offline |
| 6 | Lonceng + titik merah | x ~1005 | Notifikasi: tugas terlambat, rapat, stok kritis |
| 7 | Profil (foto, nama, jabatan, chevron) | x 1048–1220 | Avatar karakter pengguna + nama + "Manajer Koperasi"; menu: Pengaturan, Ganti tampilan karakter, Keluar |
| 8 | 3 kartu KPI | x 27–597, y 68–~150, lebar ±183, jarak 9 | Tugas aktif · Terlambat · Gerai aktif (ikon kotak biru muda, label, angka 26px bold, chip delta hijau `↑ +3`, sub-teks abu) |
| 9 | Pil zoom vertikal | x 892–925 | `+  −  ↺  ↻  ⌂`  (zoom, putar 90°, kembali ke posisi awal) |
| 10 | Panel detail kanan | x 935–1235, y 66–~330 | Muncul saat objek diklik: label kategori biru kapital kecil, judul bold, ID abu, tombol ✛ (fokus) & ✕ (tutup), chip status, baris kunci–nilai bergaris tipis |
| 11 | Kartu pelacakan bawah-kiri | x 27–773, y 592–717 | "Alur Tugas/Kegiatan": stepper 5 langkah (lingkaran biru terisi, garis biru, langkah aktif berhalo) + kartu mini di kanan |
| 12 | Kartu daftar bawah-kanan | x 855–1228, y 567–717 | Tab "Meja 3/6 · Gerai 3/7 · Mitra 4" + baris: label, nama, chip status, chevron |
| 13 | Label objek mengambang | di atas objek | Kotak gelap #1E2A4A radius 8, teks putih 11px: "GR-003 · Siap buka" |
| 14 | Pin biru | di atas objek terpilih | Pin biru solid (terpilih) / lavender (belum/terkunci) |

## Komponen kecil
- **Chip status**: radius 7, tinggi 20–26, teks 11–12 bold. Hijau (#E7F8EE / #1F7A4A) = berjalan/selesai; biru muda (#E8EEFF / #2F5BEA) = menunggu/dalam perjalanan; abu (#EEF1FA / #5E6C93) = kosong/tersedia; peach (#FFEFE6 / #B5522A) = perhatian; merah muda (#FFE8EF / #C2305F) = terlambat.
- **Delta KPI**: chip hijau kecil dengan panah ↑/↓; turun yang baik (terlambat berkurang) tetap hijau.
- **Ikon**: garis 1.6–2px, sudut membulat, satu keluarga (Lucide/Phosphor "regular"). Jangan campur gaya.
- **Tipografi**: Inter. Judul kartu 14–17/700; angka KPI 26/700; label 12/500 abu #5E6C93; sub-teks 10.5–11 abu #8A96B8.
- **Bayangan**: `0 8px 24px rgba(59,91,219,.16)`. Tidak ada border tebal.

## Perilaku (sama seperti video)
1. Klik objek di dunia → kamera bergeser halus ke objek (400–600 ms), pin muncul, panel detail kanan geser masuk dari kanan (240 ms).
2. Klik ✕ / Esc → panel menutup, kamera kembali.
3. Kartu bawah-kiri mengikuti objek terpilih (tugas/kegiatan terkait); tab bawah-kanan mengganti daftar.
4. Hover baris daftar → objek terkait di dunia berpendar & kamera menoleh ringan.
5. Layar sempit (<900px): KPI jadi 1 baris geser, panel detail menjadi *bottom sheet*, kartu bawah dilipat jadi tab.

## Yang TIDAK ada di video dan harus ditambahkan
Video tidak punya menu navigasi. Solusi yang tetap selaras gaya: **rel ikon vertikal berbentuk pil** di kiri
(sama gaya dengan pil zoom): Beranda, Proyek, Tugas, Kegiatan, Rapat, Gerai, Suplier, Pencatatan, Pengaturan.
Ikon aktif = latar biru muda; hover menampilkan label di samping. Di HP: berubah jadi bilah bawah 5 ikon + "Lainnya".
Halaman penuh (Tugas, Gantt, Pencatatan, dst.) tampil sebagai **panel besar melayang** (±70% layar) di atas dunia
yang diburamkan lembut, bukan halaman terpisah, agar rasa "satu dunia" tetap.
