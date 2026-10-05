# Status produk — 5 Oktober 2026

Dokumen ini mencatat keadaan aktif. Riwayat paket ada pada CHANGELOG dan laporan QA; arahan desain terbaru ada pada DESAIN-ANTARMUKA dan DUNIA-KOPERASI. Jangan memakai bagian historis sebagai instruksi yang mengalahkan permintaan terbaru.

## Prioritas aktif

Panduan AI/tool/skill telah disederhanakan dan lingkup historis dipertegas. Fokus implementasi berikut: dunia dan koneksi data web, dimulai dari paket terang/map pada DUNIA-KOPERASI. Audit ini terbatas dokumen repo yang tersedia; tidak mengubah aturan global AI di luar proyek.

Dunia Koperasi mengikuti video pengguna: 3D isometrik biru-putih, kartu mengambang, kantor/interior, tujuh lahan gerai, maskot animatif/bubble, cuaca dan waktu. Panduan telah diringkas, konflik lingkup tema diperjelas, referensi video/interior disimpan di docs/referensi-dunia agar dapat dibaca AI berikutnya.

## Penilaian pemilik terbaru

Versi sekarang belum diterima: kawasan kecil/sepi, mobil belum ada, tampilan agak gelap, pengaturan waktu tidak mudah ditemukan dan perpindahan karakter belum terlihat. Gym aktif serta patroli manajer sesekali belum tersedia. Kontrol manual/animasi pose ada dalam kode, tetapi bukan bukti pengalaman tersebut memenuhi permintaan. Rencana paket revisi ada hanya di [DUNIA-KOPERASI](DUNIA-KOPERASI.md); pembaruan ini dokumentasi, belum implementasi runtime.

## Implementasi Dunia Koperasi

- `/dunia-koperasi` terdaftar pada navigasi, menggunakan sesi aplikasi dan data workspace, dengan layar penuh/dock khusus.
- `/dev/dunia-koperasi` development route untuk pengujian bebas database.
- Three.js: kamera ortografis dengan radius target hingga 26 unit, pencahayaan ACESFilmic dan PCFShadowMap, kontrol zoom/putar/reset, penanda HTML, serta raycast klik objek gedung/lahan/kendaraan/karakter/gudang.
- **Paket 1 Selesai:**
  - Tekstur jalan diperbaiki dengan sistem layer top presisi, `sun.shadow.bias = -0.0003`, `normalBias = 0.025`, dan penonaktifan `castShadow` pada objek datar. Garis-garis hitam belang (shadow acne) terbukti lenyap total pada pengujian browser siang dan malam.
  - Warna jalan dikembalikan ke biru pastel lembut (`#b8c9e5`) yang berbobot dan menyatu dengan tema diorama.
  - Simpang lampu merah 3D modular dengan tiang baja dan siklus otomatis lampu merah, kuning, dan hijau di persimpangan jalan utama dan akses kantor.
  - Gedung Gudang Logistik solid 3 dermaga rolling door, kanopi pelindung, apron bertanda marka kuning, forklift, dan palet kayu di sisi timur kawasan.
  - Sistem `SeatAnchor` pada bangku taman plaza: karakter wanita kini duduk santai di bangku taman plaza menghadap utara dengan pose duduk wajar, menuntaskan masalah karakter berdiri/menginjak bangku.
- **Paket 2 Selesai:**
  - Interior kantor diperlebar dari 15×12 menjadi 22×15 unit dengan 6 zona lapang: Zona A (Rapat 6×6, meja kayu madu 5.2×2.2, 6 kursi eksekutif berjarak lega, partisi kaca tempered berbingkai), Zona B (Workstation 5×6, 4 meja PC All-in-One), Zona C (Arsip & Buku 6×6, 3 lemari bertingkat, buku pastel, tanaman hias), Zona D (Gym 6×6, matras slate gelap 5.6×4.8, dual treadmill LED hijau dengan animasi latihan, dumbbell rack, dispenser air), Zona E (Pojok Santai 6×6, sofa empuk, meja kopi, tanaman sudut), Zona F (Lobi & Pintu Masuk, bangku tunggu, tanaman penyambut).
  - Koridor sirkulasi utama dan persimpangan selebar 2.5–3.0 unit dengan rasio jejak perabot ≤ 30% luas lantai, melenyapkan kesan sesak dan perabot menempel dinding/partisi.
  - Kamera interior ortografis diperluas (span 11.5–16 unit) membingkai ruang 22×15 secara utuh dan proporsional.
  - Pembedaan lingkup stasiun (`scope: 'kantor' | 'luar'`) sehingga stasiun interior dan landmark luar terpisah rapi.
- **Paket 3 Selesai:**
  - Pembuatan objek sepeda motor / skuter (`createMotorcycle`) bodi pastel, lampu bulat, setang baja, dan pengendara berhelm bulat khas gaya karakter proyek.
  - Modul simulasi lalu lintas murni `world-traffic.ts`: spawner shuffle-bag berbobot (motor 40%, mobil 25%, van 15%, truk 20%) tanpa 3 kemunculan berurutan sama, jeda acak 5–12 dtk, dan dua jalur lalu lintas timur & barat.
  - Transisi fade masuk/keluar mulus di batas tepi platform (skala 0.94 -> 1.0 dan modulasi opasitas) dengan aktivasi bayangan `castShadow` hanya saat opasitas >= 0.85 untuk mencegah pop visual.
  - Kepatuhan lampu lalu lintas: kendaraan secara cerdas memperlambat dan berhenti di garis henti simpang saat lampu merah/kuning, mengantre berjarak aman, dan melaju saat hijau.
  - Integrasi truk ekspedisi mitra suplier (`kendaraan-truk-mitra`) di dermaga gudang logistik dengan livery khusus dan informasi mitra dari data `stakeholders`.
  - Perbaikan layout baris daftar "Armada & Kendaraan" di panel detail: nama armada dan subjudul jenis tersusun vertikal rapi dengan spasi jelas tanpa menempel.
- **Paket 4 Selesai:**
  - Modul dialog murni `world-dialogue.ts`: sistem percakapan kontekstual bersyarat data nyata (`getTimeGreeting`, `getContextualDialogue`, `DialogueManager`), cooldown per pasangan 45 dtk, cooldown global 8 dtk, kapasitas maks 2 balon komik.
  - Pakaian karakter dinamis: Manajer KDMP Puntukrejo mengenakan jas resmi navy (`palette.navy`), kerah kemeja putih, dan dasi merah; staf mengenakan seragam kerja dan lanyard ID badge. Animasi procedural mendukung pose lambaian tangan (`greet`) dan anggukan berbicara (`talk`).
  - Balon percakapan komik mengambang (`.cw-dialogue-bubble`): diproyeksikan dari koordinat 3D kepala karakter ke koordinat 2D layar dengan teks dinamis sesuai keadaan data nyata (misal menanyakan tugas terbuka, cuaca, atau sapaan waktu WIB).
  - Integrasi data Manajer & Tim: chip kiri-bawah diperbarui menjadi "Manajer · {aktivitas}" yang membuka kartu profil Manajer lengkap dengan statistik tugas, rapat, dan gerai; tab Karakter di dock membuka daftar tim staf serta form `+ Tambah Anggota Tim` yang langsung tersinkronisasi ke API staf tanpa tabel tambahan.
- **Paket 5 Selesai:**
  - Modul pencahayaan dinamis murni `world-lighting.ts`: kurva kontinu siklus 24 jam (matahari/bulan), elevasi terkunci >= 30 derajat untuk mencegah shadow acne, interpolasi smoothstep intensitas dan warna langit/ambient, serta penyesuaian cuaca (berawan/hujan).
  - Mode malam atmosferik: lampu jalan menyala kuning hangat (`#fef08a`), pendar tanah (*ground glow*) lembut di bawah tiang lampu, jendela kantor dan gudang bercahaya hangat, serta lampu plafon gantung dan layar monitor di interior memancarkan pendar terang yang nyaman.
  - Pusat kendali Popover Suasana terpadu: menghapus bilah horizontal cepat atas yang menabrak kartu KPI/rapat, menyatukan 3 titik masuk (pil jam header, kartu cuaca kiri-bawah, dan tab Suasana di dock bawah) ke satu Popover Suasana kaca elegan (slider jam, tombol preset Pagi/Siang/Senja/Malam, kontrol cuaca, putar otomatis waktu, dan sakelar jeda animasi).
  - Indikator status simulasi waktu di header: pil jam menampilkan titik oranye berkedip dan label `Simulasi {jam}` saat mode simulasi aktif, dan kembali ke waktu asli saat mode Live WIB.
- **Paket 6 Selesai:**
  - Pembuatan siku braket seleksi biru 3D (`createSelectionBrackets`) dengan material `#3866f6` yang melayang mengitari objek aktif (gudang, armada, kendaraan, gerai, dll) untuk memberikan umpan balik visual seleksi yang jelas dan modern seperti pada video referensi f08.
  - Pergerakan kamera fokus halus (smooth camera lerp target ~600ms) di `WorldScene.tsx` yang secara elegan mengarahkan pandangan ke koordinat objek yang diklik atau dipilih dari daftar.
  - Dukungan tombol keyboard `Escape` yang secara instan memulihkan fokus kamera kembali ke pusat kawasan (`kawasan` overview) dan menyembunyikan braket seleksi.
  - Kartu detail interaktif Gudang Logistik (`Pusat Distribusi & Logistik`) lengkap dengan tab bertingkat:
    - Tab **Dermaga (3 Slot)**: status Dermaga 1 (Gudang transit stok tertutup), Dermaga 2 (Bongkar muat forklift & tumpukan palet kayu), dan Dermaga 3 (Truk ekspedisi mitra bersandar di bawah kanopi).
    - Tab **Mitra Ekspedisi**: menampilkan daftar mitra suplier/distributor dari data workspace `stakeholders` nyata dengan tautan langsung ke pengelolaan mitra, mematuhi prinsip integritas data tanpa fiksi.
- **Paket 7 Selesai (Verifikasi Menyeluruh & Dokumentasi Final):**
  - Rangkaian pengujian otomatis menyeluruh berhasil 100%: 275 tes unit dan integrasi lulus (`npm test -- --maxWorkers=2`), typecheck TypeScript lulus dengan 0 error (`npm run typecheck`), linter ESLint bersih tanpa error maupun warning (`npm run lint`), dan build produksi Next.js Turbopack sukses untuk seluruh 12 rute aplikasi (`npm run build`).
  - Verifikasi visual lintas platform (viewport desktop 1440px, tablet 1024px & 768px, mobile 360px & 375px) mengonfirmasi:
    1. Ketiadaan total cacat render berupa shadow acne atau z-fighting pada jalan raya di semua waktu (siang, senja, malam) dan kondisi cuaca (cerah, berawan, hujan).
    2. Konsistensi penempatan karakter tanpa tumpang-tindih (karakter wanita duduk tertib di bangku taman via `SeatAnchor`).
    3. Kelapangan interior 22×15 unit dengan 6 zona jelas dan sirkulasi lorong 2.5–3.0 unit tanpa perabot menempel partisi.
    4. Animasi lalu lintas armada modular (motor, mobil, van, truk) yang patuh lampu merah dan memudar mulus di perbatasan platform.
    5. Balon dialog kontekstual berintegritas data dan identitas resmi Manajer KDMP Puntukrejo.
    6. Suasana malam dengan pencahayaan hangat lampu jalan, pendar tanah, jendela bercahaya, dan interior yang terang nyaman.
    7. Kemudahan interaksi klik dengan siku braket seleksi biru `#3866f6`, perpindahan kamera halus (lerp ~600ms), kartu detail gudang logistik bertab (Dermaga & Mitra Ekspedisi), dan pemulihan cepat via tombol `Escape`.
- **Paket Penyempurnaan Solid 3D & WareTrack Selesai (5 Oktober 2026):**
  - **Papan Plang Solid 3D:** Fungsi `sign()` di-upgrade dari bidang datar 2D (setipis kertas) menjadi objek 3D solid berbobot dengan `RoundedBoxGeometry` (ketebalan 0.09 unit), frame lis tepi pelindung, baut kuningan di sudut, serta kanvas teks resolusi tinggi di muka depan dan belakang.
  - **Rute Manajer Interior Bebas Tabrakan:** Perjalanan patroli manajer dari meja eksekutif kini menggunakan sistem 5 waypoint terarah menyusuri lorong samping meja (`[-5.8, -5.0]` -> `[-5.8, -1.6]`) dan melangkah melalui bukaan pintu partisi kuningan di `[-4.2, -1.6]` menuju koridor tengah dan lobi, tanpa pernah menabrak meja, kursi tamu, sofa, ataupun dinding partisi.
  - **Karakter Anisa & Topi NPC:** Rambut panjang natural multi-sphere Anisa yang anggun menjuntai di bahu dan samping telinga tanpa menutupi dahi/wajah; topi baret hijau pria proporsional dan rapi.
  - **3 Zona Arsip & Buku Pencatatan:** Menjawab langsung pertanyaan operasional pengguna di panel dan diorama interior dengan 3 lemari berlabel: Zona Biru (Buku Induk Anggota `/pencatatan?tab=anggota`), Zona Hijau (Buku Kas Operasional `/pencatatan?tab=kas`), dan Zona Kuning (Buku Barang & Stok Opname `/pencatatan?tab=barang`), plus meja kerja staf arsip dan akses file dokumen SK.
  - **Gudang Logistik & Parkir WareTrack-Style:** 
    - Atap gudang dilengkapi 6 unit chiller HVAC AC berputar ganda dan logo heksagonal 3D di tengah atap.
    - Elevated concrete loading dock platform bertingkat dengan marka kuning *dock safety stripe* di sepanjang bibir dermaga, bumper karet hitam, dan tangga akses ber-handrail.
    - Stasiun pengisian daya forklift (*forklift charging station*) di atas paving hijau mint dengan 3 unit charger box putih modern berindikator LED bar hijau dan forklift cadangan terparkir mengisi daya.
    - Forklift aktif beroperasi membawa palet kayu berongga dan tumpukan 4 box kardus cokelat berlakban pengemas (*packaging tape*).
    - Truk kontainer box modern bergaya aero Nordline/WareTrack: kabin putih bersih, kaca depan miring gelap, spion samping ganda, grill depan bertingkat horizontal, bumper kokoh, dan bodi kargo dengan grafis strip gelombang toska/biru.
  - **Panel Gudang 4-Tab:** Tab Dermaga (status 3 bay & forklift fleet 1/2 working), Tab Inventaris (daftar stok unit sesuai format referensi WareTrack: Cardboard Box M, Plastic Container, Safety Helmet [Low Stock], Packing Tape), Tab Lacak Kiriman (stepper horizontal 5 tahap interaktif: Confirmed -> Picked -> Loaded -> In Transit -> Unloading ETA 09:52 plus kartu armada `#SHP-78448`), dan Tab Mitra Ekspedisi.
  - **Verifikasi Kualitas:** 275/275 unit test lulus 100% (44 test files), TypeScript typecheck 0 error, ESLint 0 error dan 0 warning.

  - Percakapan kontekstual kaya yang membedakan obrolan santai/biasa dan informasi faktual operasional (tugas, gerai, rapat, gudang).
  - Standarisasi tipografi terpadu: eliminasi total font mikro 7-9px, menyelaraskan ukuran font menjadi 11px (label/badge), 12-13px (isi/daftar), dan 16-18px (judul/metrik) yang seimbang dan mudah dibaca di semua viewport.
- **Paket Revisi Pengguna Batch 2 Selesai (5 Oktober 2026):**
  - Perbaikan orientasi rotasi gerak NPC (`Math.atan2(dx, dz)`) anti jalan mundur; pelebaran koridor lobi (3.5m) dan trotoar anti tabrakan objek.
  - Penggantian total bayang hitam belang parkir Lahan 06 dengan Carport Eksekutif beratap melengkung pastel dan paving halus.
  - Ekspansi platform map ke arah timur (88 × 44 unit) dan penggeseran jalan kanan ke X = 43.2.
  - Pembebasan total Lahan 07 (`[18, 0]`) dari tindihan gudang, dengan penanda dan taman pemisah.
  - Perbesaran Gudang Logistik KDMP (`14.2 × 4.0 × 6.4 unit`) di X = 30 dengan 3 dock bay, kanopi, bumper, dan apron manuver kendaraan luas.
  - Penambahan fasilitas tepi selatan jalan raya: Halte Bus Koperasi, Monumen Gerbang Kawasan "KDMP PUNTUKREJO", dan pepohonan peneduh.
  - Peningkatan kualitas objek 3D solid, berketebalan terukur, rounded/beveled, anti z-fighting dan tidak setipis kertas/pecah.
  - Sinkronisasi dinamis balon dialog komik yang bergerak mulus mengikuti koordinat jalan NPC.
  - Integrasi klik pada seluruh NPC dengan kartu profil detail di panel samping atas (peran, lencana status aktivitas, quote personal, dan tombol navigasi aksi).
  - Penggantian lempengan hitam tipis di lobi kantor dengan Meja Resepsionis & Pusat Informasi Lobi KDMP kayu-marmer solid lengkap dengan PC dan tanaman hias.
  - Harmonisasi layout UI kiri atas: pembungkus vertikal `.cw-top-left-group` melenyapkan tumpang tindih antara breadcrumb "Kawasan" dan kartu KPI.
- **Paket Revisi Pengguna Batch 3 Selesai (5 Oktober 2026):**
  - **Ruang Kerja Manajer Eksekutif**: Sayap Barat-Utara kantor (`X = -11...-4.5, Z = -7.6...-1.2`) dilengkapi partisi kaca tempered berbingkai putih modern berplakat "RUANG MANAJER", karpet wol navy, meja eksekutif L-shaped mahoni, kursi direktur kulit ergonomis, 2 kursi tamu, laptop, monitor, lampu arsitek kuningan, bendera mini, lemari arsip display piala penghargaan, sofa santai tamu, dan pot tanaman monstera. Manajer duduk bekerja saat interior aktif dan dapat berpatroli di koridor.
  - **Relokasi Ruang Rapat Eksekutif**: Sayap Timur-Utara (`X = 5...10.5, Z = -7...-2`) dengan meja rapat oval kayu madu 4.8×2.0m, 6 kursi eksekutif tertata rapi, proyektor, dan layar presentasi dinding.
  - **Sistem Percakapan Dua Arah Berbalas**: `DialogueManager` mendukung antrean balasan otomatis (`pendingReplies`) dengan jeda wajar 1.8 dtk, menghadirkan dialog interaktif berbalasan antar-karakter mengenai koordinasi gerai, progres tugas, sapaan waktu, dan rehat kerja.
  - **Perbaikan Topi Baret & Gender NPC**: Topi karakter hijau diganti baret melengkung lembut ber-visor rounded dan kancing atas; seluruh 8 profil NPC memiliki atribut gender resmi (`pria` / `wanita`); karakter wanita mendapatkan sanggul rapi atau hijab pastel; kartu profil NPC menampilkan lencana jenis kelamin (*gender chip*).
  - **Landasan Lahan 06 & 07 Padat Lembut**: Menghapus artefak garis-garis dan pasak tajam; diganti pad landasan padat tebal bertingkat (`5.4 × 0.22 × 4.2 unit`, radius bevel 0.12), 4 pilar sudut bulat, hamparan rumput hijau, dan plakat marmer bulat timbul.
  - **Koreksi Posisi Kursi**: Bangku halte bus diputar menghadap utara ke arah jalan (`rotation = Math.PI`), bangku taman selatan menghadap utara ke arah kawasan (`rotation = Math.PI`), bangku lobi kantor dipindahkan bersandar di partisi barat (`[-6.0, 5.2]`, `Math.PI / 2`) menghadap meja resepsionis, serta penataan ergonomis kursi kerja dan tamu di interior.
  - **Objek Baru di Peta Eksterior**: Pos Keamanan & Portal Otomatis Satpam KDMP di barat (`[-28, 1.2, 8.5]`), Kios ATM Center KDMP modern di samping halte (`[-3.2, 1.25, 16.6]`), Stasiun Rak Sepeda & Sepeda Santai di samping kantor (`[-10.5, 0.02, 2.4]`), Tempat Sampah Pilah 3 Tabung di halte dan plaza air mancur, Gazebo Pergola Taman Teduh di timur-selatan (`[35, 0.14, 16.6]`), serta armada Mobil Box Logistik tambahan dan drum pasokan di apron gudang.
- Exterior luas (88 × 44 unit): kantor koperasi, jalan utama dua arah di selatan, jalan raya sisi kanan ke utara (X = 43.2), simpang lampu merah kanan, halte bus, monumen gerbang, plaza air mancur, carport manajer, gudang logistik diperbesar, dan tujuh lahan gerai yang terhubung catatan `units`.
- Style dunia terisolasi di `world.css` dan palet Three.js di `world-objects.ts`.

## Pemeriksaan paket terbaru

- `npm test -- --maxWorkers=2`: **275 tes / 44 berkas lulus 100%**.
- `npm run typecheck`: **lulus** (0 error TypeScript).
- `npm run lint`: **lulus** (0 error, 0 warning ESLint).
- `npm run build`: **lulus** (Turbopack production build sukses untuk seluruh 12 rute).

## Halaman operasional yang tersedia

Proyek fleksibel, tugas daftar/papan/kalender/Gantt/harian, milestone, subtugas/dependensi/pengulangan, catatan terformat, kegiatan, rapat/ICS, dokumen, risiko, tim/koordinasi, laporan snapshot, profil/PIN/cadangan, anggota/kas/barang/opname. Riwayat proyek berupa tab `/proyek?tab=riwayat`; URL lama mengalihkan ke tab.

Paket anotasi sebelumnya: 256 tes/42 berkas dan QA terang 360/383/768/1024/1440 px. Bukti historis: QA-ANOTASI.md. Pemeriksaan gelap tambahan belum lengkap. Audit UI legacy sebelumnya mencatat 111 temuan CSS dan enam kontrol mentah; audit tersebut belum diulang pada paket dunia.

## Batas dunia dan pekerjaan berikutnya

1. Nilai desain bersama pemilik, tingkatkan detail lingkungan/karakter sesuai referensi, dan selesaikan QA interaksi/akses/performa.
2. Slot gerai adalah urutan created_at lalu ID. Penghapusan unit dapat menggeser slot; layout permanen/editor posisi belum tersedia.
3. Ringkasan hanya catatan yang dimuat lewat paginasi workspace; belum total global atau sinkronisasi real-time.
4. Suplier/pengiriman/mobil ekspedisi, karakter pegawai, AI chat, editor lingkungan dan preferensi/layout cloud masih rencana.
5. Dunia membuka modul sumber untuk input; belum form tambah gerai langsung di scene. Tidak ada tabel baru atau migrasi SQL paket ini.

## Cloud dan batas produk

Target Supabase: mqycnhebhzqaziouipet. Migrasi awal/pencatatan kedua dan reset kosong pernah dilaporkan terkonfirmasi sebelumnya; bukan pemeriksaan cloud pada sesi ini. PIN/simpan setelah reset, indeks paginasi migrasi 6, relasi dokumen migrasi 7 dan smoke test produksi masih perlu dikonfirmasi. Jangan menjalankan ulang migrasi/reset berdasarkan tes lokal.

Belum tersedia: editor blok bebas, kolaborasi real-time, PWA/offline, unggah berkas, baseline/jalur kritis dan penjadwalan otomatis dependensi. Kas hanya uang masuk/keluar tercatat; opname tidak otomatis mengubah stok. Tidak ada deployment atau SQL cloud pada paket ini.

## Git dan kelanjutan

Cabang kerja codex/dunia-koperasi. Perubahan pemilik pada tujuh berkas UI/tema dan PLAN-ASTRA-Kopdes.md dipertahankan; daftar pada LANJUTAN-AI.md. Commit dunia hanya mencakup paket dunia dan dokumentasinya. Selalu periksa ulang Git sebelum melanjutkan.
