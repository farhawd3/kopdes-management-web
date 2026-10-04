# 01 · Visi & Gaya

## Tujuan
Mengubah web manajer koperasi menjadi **dunia isometrik interaktif**: pekerjaan terasa seperti
mengelola kota kecil yang tenang. Data nyata (tugas, kegiatan, rapat, gerai, mitra) menggerakkan dunia.

## Rasa yang dituju (dari video WareTrack)
- Putih-lavender sangat terang, aksen **biru koperasi**; bayangan biru lembut, tanpa hitam pekat.
- Objek "mainan": sudut membulat, sedikit gemuk, tanpa tekstur noise.
- Kartu UI putih melayang di atas dunia (bukan sidebar berat). Dunia = latar, kartu = informasi.
- Aksen hangat (mint, peach, butter, pink) hanya untuk objek kecil: kendaraan, atap gerai, baju orang.

## Prinsip "halus & ramah navigasi"
1. Satu tujuan utama per layar; kartu informasi maksimal 3 sekaligus.
2. Semua objek yang bisa diklik: hover = naik 4px + outline biru lembut + tooltip nama.
3. Transisi 320–520 ms, easing lembut; tidak ada gerak mendadak.
4. Selalu ada jalan kembali: tombol "Kembali ke luar", breadcrumb, tombol Esc.
5. Mode "kurangi gerak" (`prefers-reduced-motion`) mematikan orang berjalan & animasi kamera.
6. Teks minimal 14px, kontras ≥ 4.5:1 pada kartu; jangan bergantung pada warna saja (ikon + label).
7. Tidak ada angka palsu: jika data kosong tampilkan keadaan kosong yang ramah ("Belum ada gerai").

## Yang dihindari
Neon, gradien tajam, bayangan hitam, objek realistis foto, kerumunan yang menutupi UI.
