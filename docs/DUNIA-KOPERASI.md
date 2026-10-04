# Dunia Koperasi — kontrak desain dan implementasi

Acuan permintaan 4 Oktober, diperjelas 5 Oktober 2026. Prioritas pemilik: lingkungan, karakter dan UI mengikuti video, dengan backend yang siap dikembangkan. Target desain dan fitur nyata dibedakan di bawah.

## Referensi

- Video pengguna ssstwitter.com_1791130638800.mp4 berdurasi 72,26 detik; dianalisis empat frame pada 1,0 / 20,2 / 39,7 / 63,6 detik.
- [Contact sheet video](referensi-dunia/video-contact-sheet.jpg): sumber komposisi kartu dan lingkungan luar. Label/angka video tidak menjadi data aplikasi.
- [Interior pengguna](referensi-dunia/interior-pengguna.png): kantor cutaway isometrik, putih, kaca, workstation berkelompok, kayu muda. Referensi berwatermark tidak dipakai sebagai aset latar web.
- Screenshot QA lokal: artifacts/world-reference/qa/. Screenshot awal desktop sebelum penghapusan blur sudah usang; gunakan bukti terbaru pada STATUS.
- Implementasi tersimpan: [kawasan desktop](referensi-dunia/kawasan-1440.png), [interior desktop](referensi-dunia/interior-1440.png), [interior ponsel](referensi-dunia/interior-360.png). Ini dokumentasi keadaan render, bukan pengganti referensi video atau tanda desain final disetujui.

![Komposisi UI dan lingkungan video](referensi-dunia/video-contact-sheet.jpg)

## Gaya dan palet

Diorama 3D bersih, objek membulat ringan, cahaya lembut, bayangan kontak, detail terbaca. Kamera ortografis menampilkan sisi atas dan dua sisi objek. Hindari pixel art, outline komik, neon, gradien pelangi, foto stok sebagai dunia dan angka dekoratif. Target mengikuti video belum berarti identik piksel atau sudah diterima pemilik.

| Peran | Nilai sumber |
|---|---|
| Biru objek / UI | #3866f6 / #426bf4 |
| Biru gelap atap/trim | #2443a6 |
| Putih objek | #fafcff |
| Kaca | #a7c8e9 |
| Lantai kawasan | #e4eaf6 |
| Vegetasi | #79c8a0 |
| Kayu muda | #dfc59c |
| Teks UI | --cw-ink: #263750 |
| Metadata UI | --cw-muted: #74839b |
| Garis | --cw-line: #e4eaf4 |
| Kartu putih transparan | --cw-card: rgba(255,255,255,.94) |

Sumber aktual: world-objects.ts dan world.css. Palet literal Three.js merupakan palet dunia; jangan memakainya untuk mengganti token semua halaman. Bila pemilik mengubah palet, ubah sumber dan tabel ini bersama.

## Komposisi kartu seperti video

1. Header putih 66 px desktop / 58 px ponsel: identitas dunia, pencarian lokasi, profil koperasi, waktu WIB, pengaturan dan manajer.
2. Tiga ringkasan kiri atas: gerai, tugas terbuka, rapat hari ini. Data dari catatan yang dimuat; loading/error memakai tanda —.
3. Panel kanan desktop sekitar 292 px: ikon, judul, status, isi, tautan sumber. Isi bergulir, panel bisa ditutup. Ponsel memakai panel bawah terbatas.
4. Kontrol kamera dekat panel: zoom, putar seperempat putaran, reset. Geser/cubit/gulir melalui OrbitControls.
5. Cuaca dan ringkasan kegiatan kiri bawah desktop. Tugas/rapat/kegiatan menggantikan shipment tracker video dengan isi koperasi.
6. Dock bawah: Beranda, Kawasan, Kantor, Karakter, Suasana. AppShell tidak menggandakan sidebar pada halaman dunia.

Kartu radius sekitar 11 px, border putih halus, bayangan ringan; ikon biru pada permukaan biru pucat; font Inter. Style dibatasi .cooperative-world dan cw-*. Tidak menggunakan backdrop blur setelah ditemukan mengganggu ketajaman render. Ponsel menyederhanakan header dan menyembunyikan ringkasan bawah agar lingkungan tetap terlihat.

## Exterior

- Kantor koperasi biru di X/Z [-3,2.7], dapat diklik langsung atau lewat penanda untuk masuk interior.
- Tujuh lahan: [-9,-6], [-3,-6], [3,-6], [9,-6], [-9,3], [3,3], [9,3]. Bidang kosong hijau pucat dengan garis batas, tanda tambah dan nomor.
- Unit dari domain units diurutkan created_at lalu ID untuk mengisi lahan. Gerai di luar tujuh slot tetap ada di daftar Gerai; jumlah sisanya diberitahukan.
- Nama/status bangunan dari catatan asli. Detail membuka catatan yang sama melalui recordHref.
- Jalan depan, jalur pejalan kaki, pohon, bangku, lampu dan area pengembangan logistik.
- Suplier/mobil ekspedisi masih rencana. Tidak menampilkan pengiriman aktif palsu.

Penempatan bersifat turunan, belum permanen: penghapusan unit dapat menggeser slot berikutnya. Belum tersedia drag/editor lahan atau mapping slot cloud.

## Interior dan karakter

Kantor cutaway tanpa atap/dinding depan. Empat area: meja rapat kayu muda dengan enam kursi, workstation komputer, arsip/buku, treadmill kegiatan. Penanda/detail membuka /rapat, /tugas, /dokumen, /pencatatan atau /jurnal.

Karakter berupa kelompok mesh kepala/rambut/topi/mata/pipi/mulut/badan/lengan/kaki. Bentuk membulat dan proporsi maskot, tiga variasi penampilan. Gerak dihitung dalam loop animasi. Pakaian utama dapat dipilih biru/lavender/hijau.

| Pemicu | Animasi | Makna |
|---|---|---|
| Rapat sedang berlangsung berdasarkan WIB/durasi | Duduk rapat | Jadwal, bukan bukti kehadiran pegawai |
| Jurnal bertanggal hari ini WIB | Gym/olahraga | Simbol kegiatan, bukan klaim kegiatan nyata adalah olahraga |
| Tugas berstatus proses | Bekerja | Visualisasi tugas dalam proses |
| Tanpa pemicu | Idle/gerak tangan/kepala | Suasana lingkungan |

Prioritas global: rapat → jurnal hari ini → tugas proses → idle. Mode pratinjau gerakan tidak mengubah catatan. Bubble di atas kepala maskot utama muncul ketika dipilih, memakai konteks catatan atau teks pratinjau. Belum ada AI chat, suara, avatar pegawai nyata atau kehadiran tim.

## Cuaca dan waktu

Cuaca manual cerah/berawan/hujan. Hujan memakai partikel garis exterior; cuaca memengaruhi latar dan intensitas cahaya. Pencahayaan pagi/siang/senja/malam atau otomatis WIB. Jam UI tetap WIB aktual meskipun cahaya manual. Jam diperbarui setiap 60 detik; tick tidak membangun ulang geometri/kamera.

Preferensi {version:1, weather, time, outfit} divalidasi worldPreferencesSchema dan disimpan usePreference dengan key hub-world-preferences-v1. Nilai korup kembali ke default. Penyimpanan lokal perangkat, belum antarperangkat. Reduced-motion menghentikan gerakan periodik karakter/hujan dan animasi CSS.

## Berkas dan backend

Semua berkas dunia berada pada src/features/cooperative-world/:

| Berkas | Peran |
|---|---|
| CooperativeWorld.tsx | Kartu, dock, scene/detail, preferensi dan pintasan |
| WorldScene.tsx | WebGL, kamera, raycast, proyeksi penanda, animasi, disposal |
| world-objects.ts | Mesh lingkungan, gedung, perabot, karakter dan gerakan |
| world-model.ts | Adapter data, tujuh slot, stasiun, prioritas aktivitas, Zod, jam WIB |
| world.css | Style dunia dan breakpoint |

Integrasi melalui WorkspacePage/useWorkspace, workspace-scope, catalog dan AppShell. Domain yang dimuat: organization, workstreams, units, work-items, meetings, journal. /dev/dunia-koperasi hanya development dan memakai workspace kosong tanpa database.

Backend tetap API domain dengan sesi, Zod, Origin dan RLS. Dunia membaca data serta membuka editor asli; tidak menulis diam-diam. Tidak ada tabel baru, supplier domain, migrasi 8 atau reset dalam paket ini. Jangan mengambil paket commit 4a0c01d secara massal: implementasi terdahulu itu dibatalkan oleh 751c4c2.

## Cara AI berikutnya meningkatkan lingkungan

1. Periksa Git, dokumen ini, screenshot terbaru dan kode; pertahankan perubahan pemilik.
2. Untuk gedung/perabot/karakter, ubah fungsi mesh world-objects.ts. Pertahankan ID klik, ukuran relatif dan skala dunia.
3. Untuk UI, ubah world.css/CooperativeWorld.tsx. Pertahankan komposisi video, ketajaman teks, data asli dan kontrol sentuh.
4. Aturan gerai/aktivitas di adapter dengan tes; simulasi tidak boleh menjadi data operasional.
5. Layout permanen, editor lingkungan, suplier/pengiriman, kendaraan dan karakter pegawai memerlukan kontrak data tersendiri. Skema harus kompatibel; migrasi cloud mengikuti persetujuan pengguna.
6. Verifikasi tes, tipe, lint, build, empat lebar, klik gedung, kamera, interior, bubble, cuaca, reduced-motion dan galat. Perbarui STATUS dari bukti nyata.

## Batas penerimaan

Kemiripan detail dengan video, kelengkapan interaksi, kontras semua label, target sentuh semua kontrol, fallback WebGL, semua viewport/state, perangkat fisik dan kinerja perangkat rendah belum boleh dinyatakan selesai dari tes DOM/build. Bukti aktual ada pada [STATUS](STATUS.md) dan [CHECKLIST](CHECKLIST.md).
