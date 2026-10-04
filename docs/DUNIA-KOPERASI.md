# Dunia Koperasi — kontrak desain dan implementasi

Acuan permintaan 4 Oktober, diperjelas 5 Oktober 2026. Prioritas pemilik: lingkungan, karakter dan UI mengikuti video, dengan backend yang siap dikembangkan. Target desain dan fitur nyata dibedakan di bawah.

## Satu acuan gaya yang wajib dijaga

Dokumen ini adalah **satu-satunya kontrak gaya dan rencana pengembangan Dunia Koperasi**. AGENTS mengatur proses/keamanan; STATUS hanya mencatat implementasi/bukti; LANJUTAN-AI hanya menunjuk pekerjaan berikutnya. DESAIN-ANTARMUKA mengatur halaman operasional dan mengarahkan dunia ke dokumen ini. Jangan menyalin spesifikasi dunia ke Markdown baru atau menganggap screenshot implementasi sebagai desain yang telah disetujui.

Arahan langsung pemilik terbaru mengatasi konflik. Jika gaya berubah atas permintaan pemilik, perbarui kontrak ini dan sumber kode bersama. Riwayat QA, PRD lama, dan PLAN-ASTRA-Kopdes.md bukan sumber gaya dunia yang mengalahkan kontrak ini. Jangan menghapus catatan pengguna hanya untuk mengurangi jumlah berkas.

**Yang dipertahankan:** perspektif isometrik 3D, bentuk maskot membulat, biru-putih, interior putih/kayu/kaca, komposisi kartu dari video, tujuh lahan gerai, style terisolasi. **Yang harus diperbaiki:** skala kawasan, kepadatan detail/interaksi, kendaraan, pencahayaan, keterlihatan kontrol waktu, gerak berpindah manajer, dan gym yang benar-benar digunakan karakter. Menjaga style bukan membekukan kekurangan versi sekarang.

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

## Rencana revisi setelah penilaian pemilik — 5 Oktober 2026

Status: **rencana, belum diimplementasikan**. Pemilik melihat map terlalu kecil/sepi, belum ada mobil, tampilan agak gelap, pengaturan waktu tidak terasa tersedia, dan gerakan karakter belum terlihat. Treadmill/gerak anggota tubuh di kode belum memenuhi permintaan gym aktif dan manajer berkeliling. Keberhasilan tes sebelumnya tidak menutup kekurangan ini.

### Paket 1 — terang, kontrol waktu dan perluasan kawasan

- Ubah kawasan dasar dari sekitar 29 × 17 menjadi target awal 56 × 36 unit; ukuran dapat disesuaikan setelah render. Perbesar ruang lingkungan, jangan hanya mengecilkan gedung/karakter atau menjauhkan kamera sehingga isi makin sulit dilihat.
- Atur tujuh lahan di dua sisi jalan penghubung, kantor sebagai pusat, plaza kecil, trotoar, ruang parkir dan area bongkar muat. Sisakan lahan pengembangan. Ukuran gedung tetap terbaca dan karakter tidak hilang di map.
- Sediakan kamera awal yang memperlihatkan kantor, beberapa gerai dan jalan; zoom/geser memungkinkan menjelajah kawasan lain. Tambahkan tombol kembali ke kantor dan batas geser sesuai map.
- Gunakan siang cerah sebagai default pengguna baru. Preferensi manual yang sudah tersimpan tetap dihormati. Waktu otomatis WIB tetap pilihan eksplisit, sehingga malam nyata tidak memaksa kunjungan pertama menjadi gelap.
- Tampilkan kontrol berlabel **Waktu** dan **Cuaca** langsung pada kartu yang terlihat di desktop maupun ponsel; pilihan Pagi/Siang/Senja/Malam/Otomatis WIB. Bedakan label pencahayaan simulasi dari jam WIB aktual.
- Malam tetap terbaca lewat cahaya lingkungan/lampu gedung/jalan; kartu dan teks tetap terang, tidak ditutup lapisan gelap. Verifikasi semua pilihan segera mengubah scene dan tersimpan setelah reload.

### Paket 2 — kendaraan dan interaksi kawasan

- Buat mesh modular kendaraan mengikuti bentuk/warna kendaraan dalam frame video: mobil kecil manajer, van ekspedisi, dan truk boks. Jangan mengarang merek, pemasok atau transaksi.
- Tempatkan satu kendaraan parkir dan satu kendaraan suasana yang bergerak di jalur jalan, berhenti di area bongkar muat lalu keluar/parkir. Siklus suasana jarang dan tidak menabrak pejalan kaki/gedung; kendaraan tidak terus berputar memenuhi map.
- Klik kendaraan membuka kartu kendaraan dan keterangan **Simulasi lingkungan**. Pengiriman operasional baru ditampilkan bila domain/data pengiriman tersedia; jangan memberi nomor resi, muatan atau status pengiriman palsu.
- Klik bangku, lahan, kantor, papan lokasi dan area logistik memberi respons yang berguna: duduk, detail lahan, masuk kantor, fokus kamera atau kartu rencana. Sediakan padanan tombol HTML/keyboard.
- Detail pohon, lampu, marka, pot, kursi dan parkir mengisi kawasan; jangan mengisi tujuh lahan kosong dengan gerai dekoratif.

### Paket 3 — manajer berjalan dan bubble sesekali

- Satu maskot manajer utama melakukan alur **idle → berjalan → memeriksa lokasi → berhenti → kembali**. Animasi kaki/tangan dan arah badan mengikuti perpindahan posisi; gerak tangan saja bukan patroli.
- Usulan awal yang dapat dituning: diam 90–180 detik, patroli 20–40 detik ke 2–3 titik kantor/gerai, lalu kembali. Setelah klik pengguna, tunda patroli agar detail tidak kabur. Tidak perlu navigasi AI/cloud; gunakan waypoint trotoar dan jalur bebas bangunan.
- Bubble otomatis sesekali: “Ada tugas?” atau “Ada kegiatan?”. Tampilkan 5–8 detik, jeda minimal 120 detik, jangan menumpuk. Klik bubble membuka tugas/kegiatan yang terkait. Respons ringkas hanya memakai catatan yang benar-benar dimuat; data gagal dimuat tidak disebut kosong.
- Pertanyaan adalah dialog maskot lokal, bukan pendapat pegawai atau layanan AI. Rapat/kegiatan aktif mengalahkan patroli; pilihan pratinjau boleh menguji seluruh gerak tanpa mengubah catatan.

### Paket 4 — gym dalam kantor dan aktivitas di tempat yang tepat

- Buat zona gym dalam cutaway yang jelas terpisah dari meja rapat/kerja: alas olahraga, treadmill, dumbbell/rak, bangku latihan dan penanda **Gym / kegiatan**. Sesuaikan skala agar tidak menutup workstation atau sirkulasi.
- Saat ada kegiatan hari ini dari catatan jurnal/kegiatan yang valid, karakter berpindah ke zona gym dan beraksi pada alat: jalan/lari di treadmill atau latihan ringan. Tangan/kaki/badan bergerak selaras alat; tidak olahraga di tengah meja rapat.
- Gym merupakan simbol visual kegiatan umum sesuai permintaan pemilik; kartu tetap menampilkan judul kegiatan asli, jangan mengubah kegiatan asli menjadi catatan olahraga. Jangan mengarang jadwal mulai/selesai jika catatan hanya punya tanggal.
- Saat rapat sedang berlangsung, manajer menempati kursi rapat dengan pose duduk dan alat tidak bergerak sendiri. Tugas proses mengarah ke meja tugas. Tanpa catatan, manajer idle/patroli; pratinjau gym diberi label pratinjau.
- Pertahankan prioritas rapat → kegiatan → tugas proses → idle/patroli. Bila kelak kegiatan memiliki jam/interval, adapter memakai interval asli tanpa mengarang kehadiran.

### Kerangka teknis dan urutan penerimaan

- world-model.ts: konfigurasi posisi zona/waypoint, adapter kegiatan dan prioritas; state simulasi dipisahkan dari catatan operasional.
- world-objects.ts: mesh map/kendaraan/gym dan pose berjalan/duduk/latihan yang dapat diubah per fungsi.
- WorldScene.tsx: loop berbasis delta waktu, rute kendaraan/manajer, posisi target, klik dan proyeksi bubble mengikuti kepala. Jangan membangun ulang scene setiap tick atau setiap langkah.
- CooperativeWorld.tsx/world.css: kontrol waktu terlihat, kartu kendaraan/gym, bubble dan tautan sumber. Pertahankan komposisi UI/palet dalam kontrak ini.
- Preferensi tetap lokal dan tervalidasi; bila kontrak berubah, migrasikan nilai lama. Jangan membuat tabel/migrasi cloud untuk animasi atau kendaraan suasana. Layout permanen dan pengiriman nyata dibahas terpisah.
- Reduced-motion: kendaraan/manajer berhenti pada lokasi bermakna, bubble otomatis nonaktif; interaksi klik dan pratinjau statis tetap tersedia. Hentikan animasi saat tab tidak terlihat dan batasi jumlah mesh/partikel untuk ponsel.
- Selesaikan paket 1 dulu, lalu 2, 3, 4 dengan screenshot exterior/interior dan interaksi nyata pada 360/768/1024/1440. Uji pergantian waktu/reload, kendaraan berhenti, patroli tidak menembus gedung, bubble tidak sering, rapat duduk dan kegiatan di gym. Rekam cuplikan gerak singkat sebagai bukti; screenshot/tes DOM saja tidak membuktikan perpindahan karakter.
- Kemiripan video dan penerimaan visual tetap terbuka sampai pemilik menilai hasil. Update STATUS/CHECKLIST berdasarkan bukti baru, bukan checklist rencana ini.
