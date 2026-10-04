# 04 · Scene 2 — Dalam Kantor

Referensi: `asli/referensi_kantor_isometrik.png` (denah kantor putih-kayu), `scene/02_scene_kantor_dalam`, `objek/07`, `karakter/06`.

## Tata ruang (mengikuti foto referensi)
Lantai marmer putih, dinding putih dengan jendela besar, lemari putih-kayu sepanjang dinding,
ruang kaca kecil di sudut (ruang manajer/rapat), kluster meja putih dengan partisi dan kursi gelap.
Warna disesuaikan ke palet pastel: kayu → butter/peach lembut, kursi → ink #1E2A4A, aksen meja → biru.

## Meja = modul web
| Meja | Terisi bila | Isi tampilan |
|---|---|---|
| TUGAS | ada tugas aktif | monitor menyala, tumpukan kertas sebanyak tugas (maks 5), badge angka |
| KEGIATAN | ada kegiatan hari ini/terbaru | orang di meja + pin lapangan |
| RAPAT | ada rapat terjadwal ≤ 7 hari | papan agenda + jam |
| PROYEK | ada proyek aktif | maket/papan milestone mini |
| CATATAN/ARSIP | ada dokumen/keputusan | lemari arsip + folder |
Jika tidak ada data: meja bersih, kursi kosong.
Klik meja → buka halaman web modulnya (Tugas, Kegiatan, Rapat, dst.) dalam panel kartu.

## Orang (NPC)
- Jumlah orang = min(jumlah tugas+kegiatan+rapat aktif, 6). Orang duduk di meja yang terisi.
- Tanpa tugas: orang berjalan santai antar titik jalan (waypoint) dan **sesekali** (tiap 12–25 dtk acak)
  memunculkan **bubble pikiran** di atas kepala selama 4 dtk.
- Bubble berisi kalimat pendek dari data nyata, mis. "Tugas A tenggat besok", "Rapat jam 14.00?",
  atau kalimat santai ("Kopi dulu ☕"). Maks 28 karakter. Satu bubble aktif sekaligus.
- Karakter: kapsul + kepala bulat + rambut gelap + baju pastel (lihat `karakter/06`).
- Pintu keluar: klik pintu/tombol "Kembali" → Scene 1.
