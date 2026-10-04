# 06 · Pemetaan Data → Objek Dunia

| Data web | Objek dunia | Aturan |
|---|---|---|
| Gerai (maks 7) | bangunan di slot 1–7 | slot berikutnya yang kosong; hapus gerai → slot kembali terkunci |
| Progres kesiapan gerai | bar di kartu + warna pin | <40% merah, 40–79% kuning, ≥80% hijau |
| Mitra | kendaraan di jalan | model & warna berotasi per urutan mitra |
| Suplier | kendaraan pengantar ke gudang | hanya suplier berstatus aktif |
| Barang di bawah batas min. | palet/ikon peringatan di gudang | jumlah palet = jumlah barang kritis (maks 6) |
| Tugas aktif/terlambat | meja Tugas + bubble | terlambat → bubble peach "tenggat terlewat" |
| Kegiatan | orang di meja Kegiatan / pin di luar | jika terkait gerai: orang berdiri di depan gerai itu |
| Rapat | meja Rapat + jam | hanya rapat ≤ 7 hari |
| Proyek | meja Proyek | tampil milestone terdekat |
Aturan umum: **tidak menampilkan angka palsu**. Jika modul/DB bermasalah tampilkan keadaan kosong, bukan data contoh.
Perubahan data harus memperbarui dunia tanpa memuat ulang halaman (event/observer).
