# Dunia Koperasi — kontrak desain dan implementasi (v2)

> **Status:** Kontrak desain aktif v2 (disahkan 5 Oktober 2026).
> **Acuan:** Permintaan pengguna 5 Oktober 2026, frame video referensi (`video_f01_gudang`, `video_f04_jalan`, `video_f08_kendaraan`, `video_f22_kompleks`), dan screenshot aktual web.
> **Cabang kerja:** `codex/dunia-koperasi`

---

## 1. Satu Acuan Gaya yang Wajib Dijaga

Dokumen ini adalah **satu-satunya kontrak gaya dan rencana pengembangan Dunia Koperasi**. AGENTS mengatur proses/keamanan; STATUS hanya mencatat implementasi/bukti; LANJUTAN-AI hanya menunjuk pekerjaan berikutnya. DESAIN-ANTARMUKA mengatur halaman operasional dan mengarahkan dunia ke dokumen ini.

**Prinsip Desain:**
1. **Solid & berbobot:** bentuk berbalok tebal, bevel halus, tanpa bagian setipis kertas.
2. **Satu bahasa bentuk:** objek baru hanya dari primitif yang sudah dipakai proyek.
3. **Pastel ceria menyatu:** satu palet pusat; kontras gelap hanya sebagai aksen fungsional (matras, alas, ban).
4. **Tenang tapi hidup:** gerak lambat, jarang, tidak serempak (anggaran ketenangan).
5. **Jujur pada data:** tampilkan hanya yang didukung data; sisanya diberi label "simulasi" atau disembunyikan.
6. **Satu sumber kebenaran:** posisi objek, jejak (footprint), titik duduk, dan jalur NPC berasal dari data yang sama.

---

## 2. Tabel Layer & Aturan Shading Anti-Acne

| Lapisan | Top (y) | Tebal | Cast shadow | Catatan |
|---|---|---|---|---|
| Alas platform (tepi navy) | ≤ −0.02 | sesuai kode | Tidak | Tidak boleh sejajar dengan tanah |
| Tanah / rumput | 0.000 | sesuai kode | Tidak | |
| Apron gudang / paving plaza | 0.030 | 0.05 | Tidak | Berbeda tinggi dari jalan |
| Badan jalan | 0.040 | 0.06 | Tidak | Menembus ke bawah tanah (−0.02) agar tak ada celah |
| Marka, zebra cross, garis dermaga | 0.052 | 0.012 | Tidak | Selalu +0.012 di atas lapisan induknya |
| Trotoar & kerb | 0.120 | 0.14 | Ya | |
| Tepi kolam air mancur / air | 0.200 / 0.140 | — | Ya / Tidak | |

- **Shadow:** `sun.shadow.bias ≈ -0.0003`, `sun.shadow.normalBias ≈ 0.025`, frustum rapat ke platform terlihat.
- **Batas elevasi cahaya:** Sudut sinar matahari/bulan dikunci `≥ 28–30°` sepanjang hari untuk mencegah shadow acne miring.
- **Warna jalan:** Kembali ke pastel `#b8c9e5` (siang). Mode malam memiliki batas luminansi minimum agar marka tetap terbaca.

---

## 3. Kamus Bentuk (Shape Grammar) & Palet

- **Primitif:** Balok (bevel halus via box helper), silinder, bola/elipsoid.
- **Warna:** Satu warna datar per bagian dari `palette`; tanpa tekstur gambar bitmap eksternal.
- **Ketebalan minimum:** Tidak ada bagian < 0.04 unit; tidak ada dua permukaan koplanar yang bertumpuk; selisih minimum 0.01 antar bidang sejajar. Tumpang tindih (overlap) 0.01–0.02 pada sambungan.
- **Palet Utama:**
  - Jalan (siang): `#b8c9e5`
  - Trotoar: `#f4f7fd`
  - Marka: `#ffffff`
  - Marka dermaga: `#f5c542`
  - Air mancur: `#72a8e8`
  - Dinding gudang / lis: `#e2e8f0` / `#2443a6`
  - Baja tiang: `#475569`
  - Matras gym: `#334155`
  - Kaca: `#c9e0ec`
  - Lampu lalu lintas: `#ef4444` / `#f59e0b` / `#10b981`
  - Lampu malam: `#fef08a`
  - Aksen UI: `#3866f6`; kartu: `rgba(255,255,255,0.94)`

---

## 4. Spesifikasi Kawasan Exterior

- **Simpang Lampu Merah:** Jalan utama 2 arah dengan simpang 4 lengan menuju kantor dan gudang. Tiang lampu modular 3 warna dengan siklus otomatis dan garis henti kendaraan.
- **Gudang Logistik (Warehouse):** Bangunan solid 3 dermaga rolling door di sisi timur, apron beton bertanda marka kuning, forklift berpatroli pelan, palet kargo, dan slot armada ekspedisi.
- **Plaza Air Mancur & Taman:** Kolam air mancur riak lembut, 4 bangku ber-Seat Anchor. Karakter duduk di bangku secara teratur atau berjalan di trotoar plaza tanpa tumpang-tindih fisik.
- **7 Lahan Gerai:** Terhubung ke domain `units`. Gerai aktif menampilkan toko 3D, lahan kosong menampilkan petak berpagar rapi.

---

## 5. Interior Kantor 22 × 15 (Denah 6 Zona)

Denah luas dengan koridor utama 3.0 dan koridor vertikal 2.5:
- **Zona A — Meja Rapat (barat-utara):** Meja kayu madu 6–8 kursi eksekutif, layar dinding, laptop, cangkir kopi.
- **Zona B — Workstation (tengah-utara):** 4 meja kerja partisi kaca, PC berlayar menyala, lampu meja.
- **Zona C — Arsip (barat-selatan):** Lemari arsip tinggi, buku-buku pastel, dokumen, tanaman indoor.
- **Zona D — Gym (timur-selatan):** Matras slate gelap, dual treadmill LED hijau, dumbbell rack, bench, dispenser.
- **Zona E — Pojok Santai (timur-utara):** Sofa kecil, meja kopi, pantry/dispenser untuk istirahat staf.
- **Zona F — Lobi & Pintu (tengah-selatan):** Pintu portal keluar-masuk, tanaman penyambut, bangku tunggu.

---

## 6. Armada Kendaraan & Lalu Lintas

- **Armada:** Sepeda motor/skuter dengan pengendara bermaskot berhelm lucu, sedan mobil dinas manajer, van distribusi, dan truk boks ekspedisi.
- **Spawner Shuffle-bag:** Kemunculan acak berbobot (motor 40%, mobil 25%, van 15%, truk 20%), jeda 6–18 dtk, tanpa 3 jenis sama berurutan.
- **Fade Masuk/Keluar:** Transisi opasitas halus di tepi batas jalan raya (zona 4–5 unit).
- **Truk Mitra (Suplier):** Livery deterministik dari data `stakeholders`. Kartu truk menampilkan informasi mitra tanpa memalsukan muatan.

---

## 7. Sistem Karakter, Tim & Dialog

- **Manajer:** Karakter berjas resmi biru tua. Rute patroli keluar-masuk kantor, mengunjungi meja kerja dan menanyakan tugas aktif. Klik membuka kartu profil Manajer.
- **Tim Koperasi:** Terhubung dengan data `staff`. Staf muncul sebagai karakter bernama; panel Karakter menyediakan tombol `+ Tambah anggota tim`.
- **Perilaku Sesuai Data:** Ada tugas -> kerja di workstation; tidak ada tugas -> berkeliaran santai ke gym, pojok santai, arsip, atau taman.
- **Balon Percakapan Otomatis:** Dialog komik saat NPC berpapasan atau manajer menghampiri meja kerja, bersyarat data nyata.

---

## 8. Pencahayaan Kontinu, Lampu Malam & Popover Suasana

- **Matahari/Bulan Kontinu:** Posisi dan warna cahaya mengalir halus berdasarkan waktu WIB / slider.
- **Lampu Malam:** Lampu jalan/taman menyala (`#fef08a`), jendela kantor dan gudang berpendar hangat, interior menyalakan lampu plafon/meja.
- **Pembersihan Header:** Menghapus bar tombol waktu/cuaca yang menimpa kartu KPI.
- **Popover Suasana:** Satu popover terpadu yang dibuka dari tab dock Suasana, pil jam di header, dan kartu cuaca kiri-bawah.
- **Label Chip:** Chip kiri-bawah diperbarui menjadi **Manajer · {aktivitas}**.

---

## 9. Rencana Eksekusi Bertahap

- **Paket 0:** Audit & baseline (riwayat git jalan, inventaris helper/palet, koordinat, baseline tes & screenshot).
- **Paket 1:** Geometri, shading, anti-acne, simpang lampu merah, gudang, dan perbaikan bangku/karakter.
- **Paket 2:** Interior 22 × 15 lapang dan 6 zona berbobot.
- **Paket 3:** Armada motor/mobil/van/truk, spawner acak, fade batas jalan, dan kepatuhan lampu merah.
- **Paket 4:** Karakter manajer berjas, integrasi tim `staff`, patroli keluar-masuk kantor, dan dialog otomatis.
- **Paket 5:** Cahaya matahari kontinu, lampu malam otomatis, pembersihan bar atas, dan popover Suasana.
- **Paket 6:** Interaksi klik, braket sudut seleksi, kamera fokus, dan kartu detail lengkap.
- **Paket 7:** Verifikasi menyeluruh (4 lebar viewport × 3 waktu), pengujian suite, dokumentasi STATUS/CHANGELOG, commit & push.

---

## 10. Paket Revisi Pengguna (5 Oktober 2026)

Berdasarkan evaluasi langsung pemilik proyek KDMP Puntukrejo:
1. **Penghapusan Pin Bulat Biru:** Tombol pin interaksi melayang berdiameter 44px (`.cw-character-pin` berlatar belakang `#5075ef` dengan ikon balon pesan) di atas kepala manajer dihilangkan; digantikan dengan seleksi klik langsung pada karakter 3D manajer dan pemunculan balon komik dinamis tanpa bulatan pengganggu.
2. **Redesain Jalan Raya Sisi Kanan & Simpang Lampu Merah:**
   - Cabang jalan aspal di tengah (`X = 0`) digantikan menjadi Plaza Promenade pedestrian taman yang menghubungkan trotoar selatan ke taman air mancur.
   - Dibangun jalan raya baru di sisi kanan (timur) kawasan pada koordinat `X = 24.5` (lebar 5.8 unit, membentang dari jalan selatan `Z = 12` hingga tembus ke utara `Z = -17.5` di samping gerai dan gudang logistik).
   - Simpang-T lampu merah dan tiang lampu lalu lintas 3 warna dipindahkan ke persimpangan kanan (`X ≈ 20.5` dan `X ≈ 28.5`, `Z = 9.2`), lengkap dengan garis henti kendaraan dan zebra cross penyeberangan.
   - Sisi timur jalan raya baru dilengkapi trotoar pedestrian, deretan tiang lampu jalan bercahaya malam hari, dan pepohonan rindang sehingga kawasan sisi kanan hidup dan tidak kosong.
3. **NPC Pejalan Kaki Bergerak di Luar:**
   - Penambahan NPC pejalan kaki di trotoar pedestrian depan gerai yang berjalan bolak-balik dan sesekali berhenti mengamati toko gerai.
   - Penambahan NPC pejalan kaki di trotoar barat jalan raya baru sisi kanan yang berjalan melintasi gudang logistik dan simpang lampu merah.
   - Penambahan NPC warga yang duduk santai di bangku utara plaza air mancur melengkapi bangku selatan.
4. **Karyawan Interior Dinamis Berbasis Operasional:**
   - Penambahan 3 karyawan di kantor: Karyawan Meja Tugas (seragam biru dinas), Karyawan Meja Rapat & Notulen (seragam cyan), dan Karyawan Lapangan/Gym (seragam hijau toska).
   - Logika dinamis:
     - Jika ada tugas proses aktif (`model.tasks.some(status === 'proses')`): Karyawan Tugas duduk bekerja di workstation komputer; jika tidak ada tugas, ia berjalan roaming ke Pojok Santai / Pantry untuk rehat.
     - Jika ada agenda rapat (`model.currentMeeting` / agenda rapat): Karyawan Rapat duduk di kursi rapat eksekutif; jika tidak ada rapat, ia berjalan roaming ke Zona Arsip & Buku menata dokumen.
     - Jika ada kegiatan jurnal hari ini (`model.activities.length > 0`): Karyawan Lapangan berolahraga di treadmill gym; jika tidak ada kegiatan, ia berjalan roaming di koridor lobi depan.
5. **Percakapan Kontekstual Variatif:**
   - Sistem dialog mendukung pergantian obrolan santai/biasa (sapaan waktu WIB, suasana sejuk Puntukrejo, ajakan rehat/minum teh hangat) dan informasi faktual operasional (jumlah gerai aktif & lahan kosong siap pakai, progres tugas terbuka, agenda rapat mendatang, dan kelancaran suplai logistik gudang).
6. **Standarisasi Tipografi Terpadu:**
   - Mengeliminasi seluruh font mikro berukuran 7px, 8px, dan 9px di seluruh halaman.
   - Menyelaraskan hierarki tipografi proporsional: 11px untuk badge/label mikro, 12-13px untuk isi teks dan list, 14-16px untuk subjudul/nama stasiun, dan 18px untuk nilai metrik kartu KPI.

---

## 11. Paket Revisi Pengguna Batch 2 (5 Oktober 2026 - Lanjutan)

Menanggapi masukan pengguna mengenai tabrakan NPC, jalan mundur, penataan gudang, Lahan 07, objek hitam, dan keseimbangan UI:
1. **Perbaikan Sirkulasi & Arah Gerak NPC (Anti Jalan Mundur & Tabrakan):**
   - Mengganti interpolasi rotasi manual dengan orientasi dinamis `Math.atan2(dx, dz)` pada lerp waypoints. Arah hadap 3D karakter selalu 100% menghadap vektor arah pergerakan, meniadakan efek jalan mundur saat berbalik arah.
   - Ruang gerak koridor interior dan trotoar pedestrian diperlebar (koridor lobi kantor kini berjarak sirkulasi lega 3.5m).
2. **Eliminasi Belang Hitam Putus-Putus Lahan 06:**
   - Teluk parkir mobil manajer beraspal gelap di dekat Lahan 06 yang mengalami pemotongan/clipping trotoar digantikan dengan **Carport Eksekutif Teduh**: kanopi lengkung biru pastel lembut, tiang penopang baja putih, lantai paving halus (`#dbe5f2`), dan wheel stops karet solid.
3. **Ekspansi Peta & Redesain Gudang Logistik (Membebaskan Lahan 07):**
   - Platform kawasan diekspansi ke arah timur (`X` diperlebar dari 62 unit menjadi 88 unit, rentang X: `-36` s/d `52`).
   - Jalan raya samping kanan digeser ke `X = 43.2` dengan simpang-T lampu lalu lintas di `X = 43.2, Z = 12`.
   - **Lahan 07 (`[18, 0]`) dibebaskan 100%**, berdiri sebagai plot terbuka hijau mandiri dengan buffer taman dan penanda yang jelas.
   - **Gudang Logistik KDMP diperbesar** (`14.2 × 4.0 × 6.4 unit`), ditempatkan di `X = 30, Z = -1.5`, dilengkapi 3 pintu dock bay berpintu gulung biru navy, kanopi overhung, dock bumper karet tebal, signage nama resmi, apron luas (`16 × 8.5 unit`) di sisi selatan untuk manuver truk mitra, mobil box, forklift, dan palet logistik.
4. **Fasilitas Tambahan Sisi Selatan:**
   - Membangun **Halte Bus Koperasi** berkanopi modern dan bangku tunggu di `X = -8, Z = 16.6`.
   - Membangun **Monumen Gerbang Kawasan "KDMP PUNTUKREJO"** berstruktur batu pualam halus dan panel kayu di `X = 12, Z = 16.6`.
   - Penambahan jalur hijau pedestrian dan pepohonan peneduh di sepanjang sisi selatan jalan raya.
5. **Kualitas Desain Objek Lembut & Solid:**
   - Menghilangkan objek-objek tipis/pecah. Seluruh geometri menggunakan ketebalan solid, rounded bevel, dan elevasi berlapis anti z-fighting.
6. **Balon Dialog Dinamis Mengikuti Pergerakan NPC:**
   - Proyeksi koordinat 3D balon komik membaca posisi real-time pengirim (`senderId`) setiap frame sehingga balon dialog bergerak mulus mengikuti langkah karakter.
7. **Kartu Profil & Data NPC di Samping Atas:**
   - Seluruh 8 karakter/NPC (Pak Hartono, Anisa, Bambang, Dedi, Pak Subagyo, Bu Ratna, Siti Rahma, Fajar) dapat diklik langsung untuk membuka kartu profil di panel kanan atas (`.cw-detail`).
   - Menampilkan kategori, peran, status aktivitas dinamis, kutipan (*quote*) khas karakter, dan tombol aksi terhubung ke modul terkait.
8. **Penggantian Objek Hitam Lobi Kantor:**
   - Objek lempengan hitam tipis di Zona F lobi kantor dihilangkan total.
   - Digantikan oleh **Meja Resepsionis & Pusat Informasi Lobi KDMP** bertema kayu krem dan marmer putih solid, dilengkapi komputer resepsionis, tanaman anggrek hias, dan standing signboard kayu. Bangku tunggu digeser ke posisi strategis untuk sirkulasi masuk yang lapang.
9. **Keseimbangan Tata Letak UI (Breadcrumb vs Kartu Statistik):**
   - Kartu statistik atas dan breadcrumb lokasi disatukan dalam wadah flex vertikal `.cw-top-left-group` dengan jarak aman 12px, menjamin tidak ada tumpang-tindih visual di semua ukuran layar.

---

## 12. Paket Revisi Pengguna Batch 3 (5 Oktober 2026 - Lanjutan)

Menanggapi arahan pengguna mengenai ruang manajer, percakapan berbalas, topi NPC hijau, jenis kelamin karakter, landasan padat Lahan 06/07, posisi kursi, dan objek peta:
1. **Ruang Kerja Pribadi Manajer Eksekutif (Executive Manager Suite):**
   - Dibangun di sayap barat-utara interior kantor (`x: -11...-4.5, z: -7.6...-1.2`) berdinding partisi kaca tempered berbingkai putih dengan pintu masuk berplakat "RUANG MANAJER".
   - Dilengkapi karpet wol eksekutif navy, meja manajer L-shaped kayu mahoni solid, kursi direktur manajer kulit ergonomis, 2 kursi tamu di depan meja, laptop, monitor widescreen, lampu arsitek kuningan, bendera mini Merah Putih, plakat nama emas, lemari buku piala penghargaan, sofa santai tamu, dan tanaman monstera.
   - Manajer duduk di kursi ruang kerjanya saat sedang bekerja, dan sesekali berkeliling ke koridor tengah.
2. **Sistem Percakapan Dinamis Dua Arah (Ada Balasannya dari NPC):**
   - `DialogueManager` kini mendukung antrean balasan percakapan otomatis (*reply queue*).
   - Ketika karakter A berbicara, 1.8 detik kemudian NPC lawan bicara membalas percakapan dengan balon komik di atas kepalanya secara tersinkronisasi.
3. **Perbaikan Topi Karakter Hijau & Penetapan Gender NPC:**
   - Topi mortarboard datar selebar 0.7 unit pada varian 2 dihilangkan, digantikan dengan **topi baret/pet bulat proporsional yang lembut** ber-visor depan dan kancing atas.
   - Menambahkan field `gender: 'pria' | 'wanita'` pada seluruh profil NPC (`npcProfiles`) dan lencana gender di kartu detail profil (`.cw-npc-gender-pill`).
   - Karakter wanita (Anisa, Bu Ratna, Siti Rahma) tampil dengan sanggul rapi atau hijab pastel tanpa salah gender.
4. **Landasan Lahan 06 & 07 Padat, Tebal, dan Lembut:**
   - Menghapus pasak pagar berjejer dan garis tipis yang memicu efek bergaris-garis / z-fighting.
   - Menggantikannya dengan pad landasan padat tebal (`5.4 × 0.22 × 4.2 unit`) berlekuk rounded (radius 0.12), 4 pilar sudut batu bulat lembut, hamparan hijau taman, dan plakat marmer bulat plus timbul di tengah.
5. **Koreksi Posisi Kursi yang Kurang Pas:**
   - Bangku halte bus diputar menghadap ke jalan utara tempat armada bus berhenti.
   - Bangku taman jalur hijau selatan diputar menghadap ke kawasan utara.
   - Bangku tunggu lobi kantor dipindahkan bersandar di partisi barat dan menghadap ke timur menuju meja resepsionis.
   - Kursi di workstation dan ruang rapat disesuaikan jaraknya proporsional terhadap meja kerja.
6. **Penambahan Objek dan Fasilitas Baru di Peta:**
   - **Pos Keamanan & Portal Satpam KDMP** di akses masuk barat lengkap dengan palang portal otomatis merah-putih.
   - **Kios ATM Center Koperasi** di samping Halte Koperasi.
   - **Stasiun Rak Sepeda & Sepeda Santai Pastel** di samping kantor koperasi.
   - **Tempat Sampah Pilah 3 Tabung** ramah lingkungan (Organik, Anorganik, B3) di halte dan plaza air mancur.
   - **Gazebo Pergola Taman Teduh** beratap kayu dan tanaman rambat di sisi timur-selatan.
   - **Mobil Box Logistik Kedua & Drum Pasokan** di dermaga 1 gudang logistik.

