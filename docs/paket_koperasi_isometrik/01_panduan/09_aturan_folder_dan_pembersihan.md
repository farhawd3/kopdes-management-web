# 09 · Aturan Folder & Pembersihan Panduan Lama

Folder panduan lama tidak ikut diunggah ke percakapan ini, jadi **belum bisa saya periksa atau hapus**.
Gunakan aturan ini (manual atau oleh AI pengembang) agar rapi:

## Struktur target
```
panduan/
  00_BACA_DULU.md … 10_fitur_web_ringkas.md   <- paket ini (BARU, sumber kebenaran)
  log/                                        <- DIPERTAHANKAN (semua log kerja)
  pengetahuan_ai/                             <- DIPERTAHANKAN (pengetahuan AI tentang web)
  _arsip/                                     <- panduan lama yang ragu-ragu, sementara
```
## Aturan
1. **Pertahankan**: semua berkas log, dan berkas pengetahuan AI tentang web sebelumnya.
2. **Hapus** panduan lama yang membahas desain/UI lama, atau yang bertentangan dengan paket baru.
3. Ragu? Pindahkan ke `_arsip/`, jangan langsung hapus; hapus `_arsip/` setelah rombak selesai & lulus uji.
4. Jangan menggabungkan isi panduan lama ke paket baru kecuali fakta fitur/data yang masih berlaku.
5. Setelah merapikan, catat satu baris di log: tanggal, apa yang dihapus/dipindah.
Kirim isi folder lama (daftar nama berkas saja cukup) bila ingin saya buatkan daftar hapus/pertahankan yang spesifik.
