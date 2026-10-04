# 03 · Scene 1 — Luar (default)

Referensi gambar: `scene/01_scene_luar_koperasi`, `objek/03`, `objek/04`, `kendaraan/05`, `asli/video_*`.

## Komposisi
- Kamera isometrik tetap, boleh geser (drag) & zoom 0.8–1.4×.
- **Gedung Koperasi**: bangunan biru-putih dengan papan, jadi titik fokus. **Klik → masuk Scene 2** (zoom ke pintu, fade 400 ms).
- **7 slot gerai** di sekitar jalan. Slot terisi sesuai data menu Gerai:
  - Gerai ada → bangunan kecil beratap warna pastel (urut: biru lembut, mint, peach, butter, pink, lavender, mint), papan nama, pin status (hijau siap / kuning proses / merah isu).
  - Gerai belum ada → **tanah kosong terkunci**: ubin pucat bergaris, gembok kecil, pin lavender. Hover: tooltip "Slot Gerai N — tambahkan di menu Gerai". Klik: buka form tambah gerai.
- **Gudang**: bangunan biru dengan 3 pintu bongkar & palet krem (lihat `objek/04_gudang`). Klik → kartu stok ringkas (Pencatatan › Barang).
- **Mitra & kendaraan**: setiap mitra di data = 1 kendaraan yang melintas di jalan, bergantian model & warna (pickup, truk, van, motor kurir, truk besar). Mitra ke-6+ mengulang model dengan warna baru. Klik kendaraan → kartu mitra.
- Hiasan: pohon bulat, rumput, marka jalan putus-putus. Maksimal 6 pohon agar ringan.

## Perilaku
- Kendaraan berjalan pelan di jalur tetap, berhenti di gudang/gerai terkait saat ada kegiatan terhubung.
- Orang kecil (1–3) berjalan di trotoar; bubble pikiran muncul sesekali (lihat 04).
- Kartu melayang: pojok kiri-atas = ringkasan koperasi, pojok kanan-atas = jumlah gerai aktif.

## Posisi slot (koordinat grid, tile 1 = 1 satuan)
Gerai 1 (-4.6,-2.6) · 2 (-4.6,1.0) · 3 (8.2,-3.4) · 4 (8.2,0.2) · 5 (11.4,-1.6) · 6 (-4.6,9.4) · 7 (8.2,9.4)
Koperasi (0.2,-3.2) · Gudang (1.0,9.8). Silakan dipakai sebagai titik awal; ubah jika tabrakan visual.
