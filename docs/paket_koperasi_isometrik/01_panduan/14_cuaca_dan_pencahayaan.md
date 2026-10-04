# 14 · Cuaca & Pencahayaan Sesuai Waktu

Demo hidup: `../05_demo/cuaca_waktu_demo.html` (buka di browser; geser jam, ganti cuaca, tombol "Putar 24 jam").
Gambar acuan: `../02_referensi_gambar/cuaca_waktu/` (8 kondisi + `00_ringkasan_semua.png`).
Token: `../03_token_desain/lighting-weather-tokens.json`.

## 1. Prinsip
1. Dunia tetap pastel & lembut di semua kondisi: malam = biru-ungu tua, bukan hitam; hujan = abu-biru, bukan kelabu pekat.
2. **Kartu UI tidak ikut gelap** kecuali tema gelap aktif (opsi "Ikuti waktu" di Pengaturan). Cahaya hanya mengubah dunia.
3. Pencahayaan = lapisan di atas dunia, bukan menggambar ulang objek. Satu set aset, semua kondisi.
4. Perubahan selalu mengalir (smoothstep/lerp), tidak pernah loncat.

## 2. Tumpukan lapisan (bawah → atas)
| # | Lapisan | Peran | Teknik |
|---|---|---|---|
| 1 | Langit | gradien atas–bawah per fase | div latar, warna dari tabel fase |
| 2 | Bintang, matahari, bulan | busur harian | div posisi %: x dari jam, y = busur sinus |
| 3 | Dunia isometrik | objek apa adanya | SVG/Canvas |
| 4 | Bayangan | arah & panjang sesuai jam | poligon bayangan (hull alas + alas digeser × tinggi), blur 2px, opasitas satu grup |
| 5 | NPC | berpayung saat hujan | `acc:'umbrella'` pada `drawChar` |
| 6 | Cahaya buatan | lampu jalan, jendela, pintu gudang | elemen `.win` + lingkaran gradien radial, `mix-blend-mode:screen`; opasitas = nilai "lampu" |
| 7 | Awan + bayangan awan | bergeser, bayangan jatuh ke tanah | ellipse blur; bayangan `multiply` |
| 8 | Tint (warna cahaya) | suasana fajar/senja/malam | div `mix-blend-mode:multiply` |
| 9 | Kabut | selaput putih-biru | div gradien, warna ikut tint malam |
| 10 | Hujan, riak, petir | partikel & kilat | `<canvas>` + div kilat putih |
| 11 | UI melayang | kartu cuaca/waktu | normal |

## 3. Fase waktu
| Fase | Jam | Langit | Tint | Bayangan | Lampu |
|---|---|---|---|---|---|
| Dini hari | 00–04.30 | ungu-biru tua | biru tua 55% | tidak ada | penuh, bintang penuh |
| Subuh | 05–06.20 | ungu→mauve | lavender 38% | tidak ada | 85% |
| Matahari terbit | 06.20 | biru→peach | peach 22% | panjang, ke kiri | 30% |
| Pagi | 09 | biru muda | krem 5% | sedang | mati |
| Siang | 12 | biru terang | tanpa tint | pendek | mati |
| Sore | 15.30 | biru→krem | krem 8% | sedang, ke kanan | mati |
| Sore emas | 17.30 | biru→peach | oranye 28% | panjang, ke kanan | 25% |
| Senja | 18.40 | indigo→merah muda | mauve 35% | hilang | 70% |
| Malam | 20.10–24 | biru tua | biru 50% | tidak ada | penuh |
Nilai persisnya ada di JSON token. Waktu antar fase memakai `smoothstep`.

Bayangan: `elevasi = sin(π·(jam−6)/12)`; panjang ∝ `1.15 − 0.95·elevasi`; arah ke kiri sebelum 12, ke kanan sesudahnya;
opasitas ∝ elevasi dan berkurang bila berawan/hujan. Di dunia isometrik bayangan cukup gaya (stylized), tidak harus akurat fisika.

## 4. Cuaca
| Cuaca | Awan | Hujan | Kabut | Redup (abu) | Lain-lain |
|---|---|---|---|---|---|
| Cerah | sedikit | – | – | 0 | matahari/bulan penuh, bayangan tegas |
| Berawan | banyak | – | – | 12% | bayangan melemah, bayangan awan melintas |
| Hujan ringan | tebal | 150 garis | tipis | 24% | riak di tanah, NPC berpayung |
| Hujan lebat | tebal | 430 garis miring | sedang | 38% | lampu menyala walau siang, jalan memantul |
| Badai petir | gelap | 540 | sedang | 50% | kilat acak tiap 3,5–8,5 dtk |
| Berkabut | tipis | – | 70% | 14% | jarak pandang pendek, objek jauh memudar |

Efek ke dunia (hanya visual & suasana):
- NPC berjalan sedikit lebih cepat saat hujan, memakai payung pastel; bubble khusus: "Hujan, bawa payung ya", "Jalan licin".
- Kendaraan tetap berjalan; saat hujan lebat/badai pelan 30% dan lampu depan menyala (opsional).
- Kegiatan lapangan berstatus berjalan + cuaca hujan lebat/badai → tampil chip peach "Cuaca buruk" di kartu kegiatan dan di daftar bawah-kanan.
  Ini **penanda informasi**, tidak mengubah data tugas/kegiatan dan tidak membatalkan apa pun.

## 5. Sumber data cuaca
1. **Manual (default aman)**: pilih cuaca di Pengaturan › Tampilan › Cuaca (Cerah/Berawan/…/Otomatis).
2. **Waktu**: jam perangkat. Opsi "Sinkron waktu nyata" (default) atau "Jam tetap" untuk presentasi.
3. **Cuaca nyata (opsional)**: Open-Meteo, tanpa kunci API:
```js
const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
const j=await (await fetch(url)).json();   // j.current.weather_code, j.current.temperature_2m, j.current.time
// kode WMO → cuaca: 0,1 cerah · 2,3 berawan · 45,48 kabut · 51–57,61,80 hujan ringan · 63,65,66,67,81,82 hujan lebat · 95,96,99 badai
```
   Koordinat diisi pengguna di Pengaturan › Profil Koperasi (jangan ditebak otomatis). Muat ulang tiap 15 menit; gagal → pakai cuaca terakhir
   atau "Cerah", tampilkan titik abu di pil "Live" dan jangan menampilkan suhu palsu.
   Catatan: kode pengambilan data ini belum diuji dengan internet di lingkungan pembuatan paket; uji di perangkat Anda.

## 6. Scene Kantor (dalam ruangan)
- Cahaya jendela mengikuti fase: pagi = berkas cahaya hangat miring dari jendela; siang = putih rata; senja = oranye; malam = jendela gelap biru.
- Lampu langit-langit/meja menyala otomatis saat nilai "lampu" > 0.3, memberi tint krem hangat (#FFE7A3, 18%) pada lantai di bawahnya.
- Hujan terdengar/tampak sebagai tetes tipis di kaca jendela (garis diagonal 3 px, opasitas 30%); tidak ada partikel di dalam ruangan.
- Tint ruangan hanya 40% dari kekuatan di luar (ruangan lebih netral).

## 7. Antarmuka
- Kartu **Cuaca & Waktu** (pojok kiri-atas, gaya kartu video): ikon, "Hujan ringan · 24°C" (suhu hanya jika data nyata), "Sore · 16.40".
- Klik kartu → panel detail kanan: pilih Otomatis/Manual, jam tetap, koordinat, kualitas efek.
- Tema gelap UI mengikuti nilai lampu > 0.6 jika opsi "Ikuti waktu" aktif.

## 8. Performa & aksesibilitas
- Tingkat kualitas: **Tinggi** (semua efek), **Sedang** (hujan 40% partikel, tanpa blur awan), **Rendah** (tanpa partikel, hanya tint+langit+ikon).
- `prefers-reduced-motion` → mode Rendah otomatis: tidak ada hujan jatuh, tidak ada kilat, awan diam.
- Kilat: maksimal 1 per 3 detik, tidak lebih terang dari 75%, dan dapat dimatikan (aman untuk sensitif cahaya).
- Hentikan loop animasi saat tab tidak terlihat. Target 60 fps; turunkan kualitas otomatis bila rata-rata <40 fps selama 3 detik.
- Kontras teks pada kartu tidak berubah oleh cuaca (kartu di atas lapisan efek).

## 9. Prompt gambar per kondisi (lampirkan gambar `cuaca_waktu/`)
"Same isometric pastel cooperative town as attached, <KONDISI>. Keep the object layout identical. Only change lighting:
<pagi: warm peach sky, long soft shadows to the left | senja: indigo-to-pink sky, warm lamps on, no shadows |
malam: deep blue, stars, moon, glowing yellow windows and street lamps | hujan: grey-blue, rain streaks, ripples, umbrellas |
kabut: pale white-blue haze>. Keep pastel, soft, no pure black."

## 10. Checklist uji
- [ ] Geser jam 00→24: tidak ada loncatan warna; lampu menyala saat senja dan mati saat pagi.
- [ ] Bayangan berpindah kiri→kanan, terpendek saat siang, hilang malam.
- [ ] Setiap cuaca terlihat beda tanpa membaca label.
- [ ] Hujan: NPC berpayung, riak muncul, awan menggelap; kembali cerah dengan mulus.
- [ ] Mode Rendah & reduced-motion tidak ada animasi jatuh/kilat.
- [ ] Gagal ambil cuaca nyata tidak merusak tampilan.
- [ ] Teks kartu tetap terbaca pada semua kondisi.
