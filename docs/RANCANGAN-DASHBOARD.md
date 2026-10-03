# Rancangan perapian dashboard — 3 Oktober 2026

Arahan terakhir pemilik: pertahankan dashboard aplikasi saat ini; bagian yang mengganjal adalah pengingat **Perlu Perhatian** di atas. Rancangan HTML terpisah dibatalkan dan dihapus. Jangan mengganti susunan kartu, font, tema, atau navigasi dashboard.

Perapian terbatas:
- Pengingat memakai permukaan dan border netral; warna status hanya pada ikon, tanpa gradien merah/hijau yang mendominasi.
- Ringkasan menyebut jumlah pengingat dan jumlah mendesak. Judul catatan pertama tetap terlihat pada layar lebar; pada ponsel judul lengkap berada di Rincian agar banner pendek.
- Jenis catatan dan alasan panjang tampil ketika membuka **Rincian**, bersama tautan sumber. Tanda mendesak tetap berupa teks.
- Hapus margin tambahan keadaan tanpa pengingat yang menggandakan jarak sebelum filter proyek.
- Pertahankan tata letak adaptif: ringkasan dan aksi membungkus di ponsel, target kontrol 44 px, label serta fokus keyboard tetap tersedia.

Pembersihan lokal: 14 screenshot lama dalam artifacts dan folder kosong src/app/__preview dihapus karena tidak dirujuk. Cache TypeScript dapat dibentuk ulang. Sumber aktif, cadangan, arsip, SQL, dan konfigurasi tetap dipertahankan.
