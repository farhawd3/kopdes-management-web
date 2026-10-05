# PRD & Perbaikan UI — Dunia Koperasi

*Acuan: video UI WareTrack (2 frame resolusi penuh + contact sheet 72 dtk). Pembanding: `CooperativeWorld.tsx`, `world.css`, dan `docs/referensi/kawasan-1440.png`. Aplikasi belum dijalankan; temuan berasal dari video, kode, dan screenshot.*

## 1. Tujuan

Menyamakan **layout dan gaya HUD** Dunia Koperasi dengan UI video: diorama 3D sebagai kanvas penuh, dengan kartu putih kaca melayang di empat sudut. Isi tetap data koperasi (gerai, tugas, rapat, gudang), bukan data logistik WareTrack.

**Di luar lingkup:** mengubah model 3D, logika NPC, dan data. Pekerjaan ini hanya HUD, CSS, dan komponen kartu.

## 2. Kesenjangan dan Perbaikan

| Area | Video | Kondisi sekarang | Perbaikan |
| --- | --- | --- | --- |
| Topbar | Logo, pencarian `/`, pil lokasi (badge kode + nama + subinfo + chevron), pil *Live* hijau, lonceng titik merah, profil (avatar, nama, peran, chevron) | Pil lokasi hanya ikon, tanpa chevron. Ada tombol Pengaturan terpisah. Profil berupa inisial dan teks "Ruang pribadi" | Pil lokasi dengan badge dan dropdown untuk pindah Kawasan/Kantor/Gudang. Ganti tombol Pengaturan dengan lonceng. Profil diberi chevron dan peran |
| Kartu KPI (3) | Label *sentence case*, nilai besar, **chip delta hijau (▲ +20)**, keterangan kecil | Label `uppercase` berspasi huruf. Tidak ada chip delta | Hapus `text-transform: uppercase` pada `.cw-stat small`. Tambah chip delta dari data nyata. Bila tidak ada, sembunyikan chip |
| Alat kamera | Pil vertikal: **+, −, putar kiri, putar kanan, home**, menempel di kiri kartu detail | Ikon + − reset dan layar penuh | Ganti set ikon menjadi lima tombol di atas. Posisikan di tepi kiri `.cw-detail` |
| Kartu detail (kanan atas) | Kompak: *eyebrow* "JENIS · KODE", judul, subjudul, ikon aksi (fokus/buka/tutup), chip status, bar progres, baris key–value | Panel tinggi penuh berisi daftar lokasi, dan tab gudang disisipkan dengan *inline style* | Jadikan kartu kompak berstruktur seperti video. Daftar lokasi pindah ke dropdown topbar |
| Daftar bertab (kanan bawah) | Kartu terpisah, tab bercacah (Docks 3/3, Forklifts 2/3, Trucks 3), nama lokasi di kanan, baris: ID + mitra, titik status, chip, progres mini, chevron | Tab Dermaga/Inventaris/Lacak/Mitra ada di dalam kartu detail | Ekstrak ke komponen `.cw-list-card` di kanan bawah. Tab: Dermaga n/n · Armada n/n · Truk n. Baris memakai data `stakeholders` dan gudang |
| Pelacakan (kiri bawah) | Judul beserta ikon, ID dan mitra di kanan, **stepper 5 langkah** dengan jam, kartu kiriman di kanan. Lebar ±60% layar | Stepper 3 langkah (Tugas/Rapat/Kegiatan), lebar tetap 480px | Stepper 5 langkah: Dikonfirmasi → Dikemas → Dimuat → Dalam perjalanan → Bongkar. Lebar `clamp(480px, 60vw, 860px)`. Bagian tanpa data nyata diberi label "simulasi" |
| Elemen tambahan | Tidak ada kartu cuaca, kompas, maupun dock bawah-tengah | Ketiganya tampil | Sembunyikan di tampilan default. Suasana dan waktu tetap lewat pil *Live* (popover yang sudah ada). Dock bisa dipertahankan sebagai opsi pengguna |
| Objek di 3D | Kurung seleksi biru dengan **chip label** (mis. "FL-12 · Charging"), pin biru berbentuk tetes pada titik penting | Kurung seleksi sudah ada. Chip label dan pin belum seragam | Tambah chip label pada objek terpilih. Gunakan pin tetes biru untuk gerai, tugas, dan dermaga |
| Warna dan tanah | Tanah lavender-putih, aksen biru royal, chip status hijau/biru/oranye | Tanah tampak abu netral di screenshot referensi, aksen `#3866f6` | Geser warna tanah dan jalan ke lavender-biru muda. Pertahankan aksen biru. Samakan chip status dengan tiga warna di bawah |

**Chip status (perkiraan dari video):** hijau `#e6f7ee` / teks `#16a34a`; biru `#e8efff` / `#3866f6`; oranye `#fff1dc` / `#d97706`.

## 3. Persyaratan

**P0 (wajib)**

- Topbar, KPI, alat kamera, kartu detail, daftar bertab, dan pelacakan sesuai tabel di atas.
- Satu sumber data: nilai di kartu berasal dari `model`. Data tanpa sumber diberi label "simulasi" atau disembunyikan, sesuai prinsip 5 pada kontrak desain.
- Tipografi minimum 11px, tanpa font mikro 7–9px (aturan yang sudah berlaku).

**P1 (menyusul)**

- Dropdown lokasi dengan pencarian di topbar.
- Lonceng notifikasi berisi tugas dan rapat terdekat.
- Animasi masuk kartu 200 ms (`cw-appear`) disamakan di semua kartu.

## 4. Kriteria Penerimaan

1. Pada 1440×900 dan 1250×720, kelima blok HUD berada di posisi yang sama dengan video, tanpa tumpang-tindih.
2. Label KPI tidak lagi huruf kapital semua. Chip delta muncul hanya bila ada data.
3. Tab daftar kanan bawah berpindah tanpa menutup kartu detail.
4. Pada lebar ≤ 900px, kartu daftar dan pelacakan menumpuk vertikal, dan dock/kompas tetap tersembunyi.
5. `npm run build` lolos tanpa galat TypeScript.

## 5. Urutan Kerja

1. CSS cepat: hapus `uppercase`, palet tanah, chip status.
2. Topbar dan alat kamera.
3. Pecah kartu detail dan ekstrak `.cw-list-card`.
4. Stepper pelacakan 5 langkah.
5. Chip label dan pin di 3D, lalu uji dua viewport.

## 6. Spesifikasi Detail (ringkas)

*Ukuran diukur dari frame video 1250×720. Nilai adalah perkiraan, jadi cocokkan dengan mata setelah dicoba.*

### 6.1 Posisi dan ukuran blok HUD

| Blok | Posisi | Ukuran | Catatan |
| --- | --- | --- | --- |
| Topbar | atas, penuh | tinggi 58px | Latar putih 94%, garis bawah tipis. Sekarang 66px, jadi kecilkan |
| KPI ×3 | kiri 27, atas 68 | tiap kartu ≈183×60, jarak 10 | Sekarang 172px lebar dengan jarak 9 |
| Alat kamera | kiri kartu detail (x ≈ 897) | kolom ≈24px, 5 tombol | Tanpa kartu pembungkus, hanya ikon |
| Kartu detail | kanan 23, atas 68 | lebar 292, tinggi mengikuti isi | Lebar sudah sama dengan video |
| Daftar bertab | kanan 23, bawah 23 | lebar ≈372, tinggi ≈155 | Kartu baru, 4 baris maksimal |
| Pelacakan | kiri 27, bawah 23 | lebar ≈60vw, tinggi ≈105 | Isi: stepper (kiri) + kartu kiriman (kanan, ≈235px) |

### 6.2 Komponen

**KPI.** Ikon 34px di kotak biru muda, lalu label (12px, abu, bukan huruf kapital), nilai (20px, tebal) dengan chip delta di sebelahnya, dan keterangan 11px. Chip delta: `▲ +20`, hijau, 11px, tampil hanya bila ada pembanding data.

**Pil lokasi (topbar).** Badge biru berisi kode (mis. `KOP`, `GDG`), nama tebal 13px, subinfo 11px (mis. "7 lahan · 2 aktif"), chevron kanan, dan chevron bawah untuk dropdown. Isi dropdown: Kawasan, Kantor, Gudang.

**Kartu detail.** Susunan dari atas: *eyebrow* 10–11px biru ("GERAI · L-03"), judul 16px tebal, subjudul 12px abu, tiga ikon aksi kanan atas (fokus, buka, tutup). Berikutnya chip status (hijau/oranye) dan bar progres, lalu baris key–value 12px (kunci abu, nilai tebal rata kanan), jarak antar baris 8px. Untuk gudang, tambahkan grid 2×2 metrik dan daftar inventaris dengan chip "Tersedia/Menipis".

**Daftar bertab.** Tab: ikon, lalu "Dermaga 3/3", "Armada 2/3", "Truk 3"; tab aktif tebal dan bergaris bawah. Nama lokasi tampil di ujung kanan baris tab. Setiap baris: ID tebal + mitra kecil di bawahnya, titik status berwarna, teks lokasi, chip status, progres mini (cacah `3/6`), chevron.

**Pelacakan.** Judul + ikon truk, lalu ID dan mitra (kanan atas). Stepper 5 titik 28px: selesai = biru terisi + centang, aktif = biru dengan cincin, berikutnya = abu. Garis penghubung biru sampai langkah aktif. Di bawah tiap titik: nama langkah 11px dan jam 11px abu.

### 6.3 Token CSS yang diubah

```css
.cooperative-world {
  --cw-ground: #e9edfb;      /* tanah lavender, pengganti abu */
  --cw-road:   #c9d3ee;
  --cw-ok:   #16a34a; --cw-ok-bg:   #e6f7ee;
  --cw-info: #3866f6; --cw-info-bg: #e8efff;
  --cw-warn: #d97706; --cw-warn-bg: #fff1dc;
}
.cw-topbar { height: 58px; }
.cw-stat { width: 183px; }
.cw-stat small { text-transform: none; letter-spacing: 0; font-size: 12px; }
.cw-bottom-left { width: clamp(480px, 60vw, 860px); bottom: 23px; }
.cw-weather, .cw-compass, .cw-dock { display: none; } /* opsional lewat toggle */
```

### 6.4 Pemetaan data ke komponen

| Komponen video | Sumber di aplikasi | Bila data kosong |
| --- | --- | --- |
| KPI 1–3 | `model.units`, `model.tasks`, `model.meetings` | Tampilkan 0 tanpa chip delta |
| Chip delta | Selisih hari ini vs kemarin dari `model` | Sembunyikan |
| Daftar Dermaga/Armada/Truk | Data gudang dan `stakeholders` | Baris "Belum ada data" |
| Stepper 5 langkah | Status tugas atau kiriman aktif | Label "simulasi" |
| Lonceng | Tugas dan rapat terdekat | Titik merah disembunyikan |

### 6.5 Responsif

- **≥ 1280px:** semua blok seperti di tabel 6.1.
- **900–1279px:** KPI 145px, kartu detail 270px, pelacakan 55vw, daftar bertab 340px.
- **< 900px:** KPI satu baris dapat digulir, kartu detail menjadi *bottom sheet*, daftar bertab dan pelacakan menumpuk di bawah, kamera tools disembunyikan.

### 6.6 Berkas yang disentuh

| Berkas | Perubahan |
| --- | --- |
| `world.css` | Token 6.3, ukuran blok 6.1, gaya `.cw-list-card`, `.cw-track` |
| `CooperativeWorld.tsx` | Topbar baru, KPI + delta, kartu detail ringkas, ekstrak daftar bertab dan stepper |
| `WorldScene.tsx` | Warna tanah/jalan dari token, chip label seleksi, pin tetes |
| `world-lighting.ts` | Cek luminansi malam setelah warna tanah berubah |

## 7. Bangunan dan Tampilan 3D

*Perbandingan memakai deskripsi di `DUNIA-KOPERASI.md` dan README, bukan hasil menjalankan build terbaru. Verifikasi visual tetap diperlukan.*

| Objek | Di video | Di aplikasi (menurut dokumen) | Perbaikan |
| --- | --- | --- | --- |
| Gudang | Dinding biru royal, lis navy tebal di tepi atap, 3+ pintu gulung berbingkai biru dengan palet terlihat di dalam, deretan unit HVAC di atap, tanda logo di dinding | 14.2×4×6.4, 3 pintu navy, HVAC, dermaga kuning. Sudah dekat | Warna dinding ke biru royal, lis navy, isi pintu dengan palet, HVAC dua baris, papan nama di dinding |
| Kantor | Tidak ada. Bangunan sekunder putih-lavender beratap biru | Kotak biru kecil beratap bergaris | Material sama dengan gudang: dinding terang, atap biru, lis navy, jendela kaca |
| Truk | Kabin biru, boks putih berlogo, desain bersih | Truk aero gaya Nordline | Ganti livery biru-putih. Logo berupa bidang tipis (lihat catatan tekstur) |
| Forklift | Kuning, operator kecil, palet kardus dan peti biru | Sudah ada, berpalet kardus | Tambah peti biru, pastikan operator terlihat |
| Pagar, tanaman | Pagar kawat abu dengan hedge hijau tipis, pohon bulat hijau mint | Pohon ada. Pagar belum | Tambah pagar dan hedge di tepi apron |
| Penanda | Pin tetes biru, kurung seleksi, chip label | Kurung ada, pin dan chip belum | Lihat bagian 2 |
| Latar | Jalan lavender, zebra, gedung kecil dan rak di sekitar | Platform terpisah, tanpa latar kota | Opsional: 3–4 blok gedung putih-biru rendah di tepi platform |

### Render dan kamera

- **Kamera:** sudut miring, FOV perspektif ringan, sekitar 35° dari horizontal. Atur lewat `WorldScene.tsx`.
- **Cahaya:** bayangan lembut dan rendah kontras, ground `#e9edfb`, tanpa warna abu netral.
- **Efek:** vignette halus di tepi layar. Blur tepi (DOF) dan bloom bersifat opsional karena menambah beban GPU.

### Batas kemiripan

- **Bisa mirip (≈80–85%):** gudang, kendaraan, forklift, palet, pagar, warna, dan pencahayaan. Semuanya dibangun dari balok dan silinder yang sudah dipakai proyek.
- **Sulit:** logo dan teks pada dinding atau truk. Kontrak desain melarang tekstur bitmap, jadi perlu satu pengecualian: `CanvasTexture` bertulisan teks, atau bidang berwarna tanpa teks.
- **Tidak dikejar:** detail kota padat dan rak gudang berlapis seperti di sudut-sudut video.
