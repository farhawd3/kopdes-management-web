# 08 · Rencana Implementasi & Checklist

1. **Fondasi**: terapkan `tokens.css`, ganti font, kartu, tombol, bilah menu pil. Tanpa scene dulu.
2. **Scene luar statis**: render koperasi, 7 slot (semua terkunci), jalan, gudang.
3. **Binding gerai**: slot terbuka sesuai data gerai; klik slot terkunci → form tambah.
4. **Mitra & kendaraan**: rotasi model/warna, animasi jalan pelan.
5. **Scene kantor**: denah, meja per modul, klik meja → modul.
6. **NPC & bubble**: waypoint, bubble acak, batasi performa.
7. **Menu Suplier** + relasi.
8. **Rombak halaman** (Beranda, Proyek, Tugas, dst.) ke gaya baru.
9. **Aksesibilitas & performa**, lalu uji.

## Checklist uji
- [ ] Klik koperasi masuk kantor, Esc kembali.
- [ ] 0 gerai → 7 slot terkunci; tambah 1 → 1 terbuka; hapus → terkunci lagi.
- [ ] Mitra baru → kendaraan baru berbeda dari sebelumnya.
- [ ] Meja terisi hanya bila ada data; kosong = bersih.
- [ ] Bubble muncul jarang, tidak menutupi tombol.
- [ ] Keyboard-only dapat menjangkau semua objek.
- [ ] Reduced-motion: tidak ada animasi berjalan.
- [ ] Layar HP: dunia dapat digeser, bilah menu tidak menutup konten.
- [ ] Cadangan JSON & PIN tetap berfungsi.
