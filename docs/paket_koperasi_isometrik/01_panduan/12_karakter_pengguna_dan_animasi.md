# 12 · Karakter Pengguna & Cara Menampilkan Jalan/Duduk

Lihat: `../02_referensi_gambar/karakter/10_sprite_sheet_karakter.png` dan **demo hidup** `../05_demo/karakter_demo.html`
(buka di browser; tombol Jalan / Duduk / Kerja / Berpikir / Lambai + pilihan seragam).
Kode gambar karakter ada di `../05_demo/char.js` (fungsi `drawChar`) dan boleh dipakai langsung di web asli.

## 1. Tampilan pengguna (Anda = Manajer)
- Chibi minimalis: kepala bulat besar, badan kapsul, tangan/kaki tabung bulat, mata titik, pipi merah muda tipis.
- Manajer: blazer biru koperasi #2F5BEA, kerah putih, tali ID (lanyard) dengan kartu putih, celana navy.
- Peran lain (staf/bendahara/gudang/kurir/lapangan) memakai warna pastel; aksesori pembeda: kerudung, kacamata,
  helm kuning, topi pink. Detail ada di `OUTFITS` pada `char.js`.
- **Kustomisasi di Pengaturan › Tampilan Karakter**: warna baju (8 pastel), model rambut/kerudung, warna kulit (6), aksesori
  (kacamata/topi/helm). Disimpan di preferensi lokal; avatar profil di bilah atas memakai karakter yang sama.
- Karakter pengguna = satu-satunya yang memakai lanyard biru, agar mudah ditemukan di tengah NPC; ada cincin biru tipis di kaki
  saat ia dipilih/diikuti kamera.

## 2. Pose yang dibutuhkan (semua sudah ada di sprite sheet)
| Pose | Dipakai saat | Arah |
|---|---|---|
| diam (idle, bernapas pelan) | menunggu, bubble tampil | depan/belakang |
| jalan (4 frame) | berpindah | depan-kanan, depan-kiri (cermin), belakang-kanan, belakang-kiri (cermin) |
| duduk | tiba di kursi | samping/belakang |
| kerja (mengetik) | ada tugas/kegiatan di mejanya | belakang (meja di depan karakter) |
| berpikir (tangan ke dagu) | memunculkan bubble pikiran | depan |
| lambai | sapaan saat pengguna klik karakter | depan |

Hanya **2 arah gambar** (depan & belakang) yang digambar; arah kiri = cermin (`scale(-1,1)`). Hemat aset.

## 3. Bagaimana ia "jalan" dan "duduk" — mesin keadaan
```
IDLE ──(ada tujuan)──> WALK ──(sampai kursi)──> SIT ──(0,5 dtk)──> WORK
  ^                      │                                          │
  └────(berdiri 1 dtk)───┴───────(tugas selesai/tidak ada data)─────┘
IDLE/WALK ──(acak tiap 12–25 dtk)──> THINK (bubble 4 dtk) ──> kembali
```
**Jalan**: tiap frame, hitung arah ke waypoint. `dy<0` → pakai gambar belakang, `dy>0` → depan; `dx<0` → cermin.
Ganti frame jalan 7–8 kali/detik (`frame = floor(waktu*7) % 4`); kaki bergantian terangkat + badan naik-turun 2px.
Kecepatan ±80 px/detik (gerak sepanjang sumbu isometrik, bukan lurus layar).

**Duduk**: (1) berjalan ke *titik kursi* (anchor yang didefinisikan pada tiap meja), (2) berhenti, (3) tukar pose ke `sit`
(badan turun 3px, kaki ditekuk), (4) 0,5 dtk kemudian pose `work` (lengan bergerak mengetik). Bangun: kebalikannya, geser
18px ke depan kursi lalu `idle` 1 dtk sebelum jalan.
Meja menghadap jauh dari penonton → karakter digambar **dari belakang** dan di-render SETELAH meja (meja tampak di depannya).
Meja dekat penonton → karakter digambar menghadap depan dan di-render SEBELUM tepi meja (kaki tertutup meja = tampak masuk bawah meja).

**Urutan gambar (depth sort)**: urutkan semua objek dunia + karakter berdasarkan `x + y` (grid) lalu gambar dari kecil ke besar.
Karakter duduk memakai `x+y` titik kursi + 0,1.

**Bubble pikiran**: gelembung putih bulat, muncul 3,6 dtk di atas kepala, maksimal satu aktif; isi dari data nyata
(tenggat, rapat, stok) atau kalimat santai. Tidak muncul saat pengguna sedang mengisi formulir.

## 4. Sumber perilaku dari data web
- Meja Tugas punya tugas aktif → satu NPC berjalan ke kursi meja itu lalu `work`.
- Tidak ada data → NPC `idle`/`walk` acak di area bebas (waypoint lantai), sesekali `think`.
- Kegiatan terkait gerai → NPC berjalan keluar (Scene 1) dan berdiri di depan gerai (`idle`) selama kegiatan berstatus berlangsung.
- Pengguna (karakter Manajer): duduk di meja pribadi saat halaman modul dibuka; berjalan saat pengguna klik tujuan baru.

## 5. Dua cara implementasi
A. **SVG per frame** (seperti demo): `drawChar()` menghasilkan SVG tiap frame. Mudah diwarnai ulang (seragam dinamis). Direkomendasikan.
B. **Sprite sheet PNG**: render tiap pose×arah×seragam ke PNG, animasikan dengan CSS `steps()`:
```css
.char{width:68px;height:90px;background:url(sheet.png);animation:walk .57s steps(4) infinite}
@keyframes walk{to{background-position:-272px 0}}
```
Cocok jika memakai gambar hasil AI. Siapkan 4 frame jalan × 2 arah + sit + work(2 frame) + think + wave.

## 6. Aksesibilitas & performa
- `prefers-reduced-motion`: NPC tidak berjalan, semua pose `idle`/`work` statis; bubble tampil sebagai ikon di meja.
- Maksimal 6 karakter animasi aktif; hentikan animasi saat tab tidak terlihat (`visibilitychange`).
- Klik karakter = kartu info (nama, peran, tugas sekarang), bukan hanya hiasan.
