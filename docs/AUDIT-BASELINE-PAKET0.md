# Laporan Audit & Baseline Paket 0 — Dunia Koperasi

> **Status:** Paket 0 Selesai (5 Oktober 2026)  
> **Acuan:** `docs/DUNIA-KOPERASI.md` (v2), masukan pengguna 5 Oktober 2026  
> **Cabang kerja:** `codex/dunia-koperasi`

---

## 1. Temuan Riwayat Git Jalan (Teknik Codex Sebelumnya)

Penelusuran commit `e287904` terhadap `src/features/cooperative-world/world-objects.ts`:
- **Warna Jalan:** Menggunakan `#bbcbed` (biru pastel lembut yang menyatu dengan lingkungan), bukan `#334155` (aspal gelap tajam).
- **Penyebab Shadow Acne:**
  - Di `world-objects.ts`, helper `box(...)` secara otomatis menyetel `mesh.castShadow = true;` untuk semua objek tanpa membedakan apakah objek tersebut berdimensi datar atau bervolume. Akibatnya, permukaan horizontal tipis menjatuhkan bayangan pada dirinya sendiri (*self-shadowing*).
  - Pada `WorldScene.tsx`, directional light `sun` memiliki `shadow.bias = 0` dan `shadow.normalBias = 0`, serta sudut elevasi rendah saat malam hari, memperparah artefak *shadow acne* bergaris hitam rapat.
- **Solusi di Paket 1:**
  - Tambahkan parameter `castShadow = true` pada helper `box`. Objek datar (tanah, jalan, marka, apron, zebra cross) diatur `castShadow = false` dan `receiveShadow = true`.
  - Pasang `sun.shadow.bias = -0.0003` dan `sun.shadow.normalBias = 0.025`.
  - Batasi sudut elevasi matahari/bulan minimum `≥ 28–30°`.
  - Kembalikan warna jalan ke warna biru pastel `#b8c9e5`.

---

## 2. Inventarisasi Helper Bentuk & Palet (`world-objects.ts`)

### Helper Primitif
- `box(parent, size, position, color, radius = 0.035, castShadow = true)`: Balok dengan `RoundedBoxGeometry` untuk bevel halus solid atau `BoxGeometry` bila radius 0.
- `cylinder(parent, radius, height, position, color)`: Silinder untuk tiang, pohon, roda, dan air mancur.
- `sphere(parent, radius, position, color, scale)`: Bola/elipsoid untuk kanopi vegetasi pohon lollipop dan aksen membulat.
- `sign(parent, text, position, width, color)`: Papan nama berbasis kanvas 2D bertekstur tajam.

### Palet Warna Pusat (`palette`)
- `blue`: `#3866f6`
- `navy`: `#2443a6`
- `white`: `#fafcff`
- `glass`: `#a7c8e9`
- `ground`: `#e4eaf6`
- `green`: `#79c8a0`
- `wood`: `#dfc59c`
- `ink`: `#2d3b56`

Warna baru yang akan dibakukan ke `palette` di Paket 1:
- `road`: `#b8c9e5` (jalan siang)
- `sidewalk`: `#f4f7fd` (trotoar)
- `dockStripe`: `#f5c542` (marka kuning dermaga)
- `fountain`: `#72a8e8` (air mancur)
- `warehouse`: `#e2e8f0` (dinding gudang)
- `metal`: `#475569` (baja tiang)
- `nightLamp`: `#fef08a` (cahaya emisi lampu malam)
- `trafficRed`: `#ef4444`, `trafficYellow`: `#f59e0b`, `trafficGreen`: `#10b981`

---

## 3. Inventarisasi Koordinat & Keputusan Tata Letak

| Objek / Area | Koordinat (Pusat X, Z) | Dimensi | Keputusan Tata Letak |
|---|---|---|---|
| Platform Dasar | `[0, 0]` | `62 × 42` | Dipertahankan |
| Ground Rumput | `[0, 0]` | `58 × 38` | Dipertahankan |
| Jalan Utama | `Z = 12` | Lebar `6.4` (rentang Z `8.8 … 15.2`) | Disesuaikan dengan elevasi layer top `0.040` |
| Kantor Koperasi | `[-5, 0]` | `5.1 × 3.5` | Dipertahankan sebagai pusat kawasan |
| Plaza Air Mancur | `[4, 0]` | `10 × 7` | Air mancur di `[4, 0]`, 4 bangku di sekelilingnya (`Z = -2.4, 2.4, X = 0.5, 7.5`) |
| 7 Lahan Gerai | `[-18,-10]`, `[-9,-10]`, `[0,-10]`, `[9,-10]`, `[18,-10]`, `[-18,0]`, `[18,0]` | Tiap petak `4.8 × 3.6` | Posisi terverifikasi aman, tidak bertabrakan |
| Parkir Mobil Manajer | `[-18, 6.5]` | `11 × 5.0` | Dipertahankan |
| Gudang Logistik Baru | `[18, 5.5]` | Bangunan `12 × 5`, Apron `14 × 6` | Memperluas area kanopi timur saat ini (`X = 18, Z = 6.5`), aman dari Lahan 07 (`Z = 0`) |
| Simpang Lampu Merah | `[0, 12]` dan `[18, 12]` | Persimpangan 4-lengan | Simpang utama di depan kantor/plaza (`X = 0, Z = 12`) dan akses gudang logistik (`X = 18, Z = 12`) |

---

## 4. Konfirmasi Nama Entitas Data

1. `organization`: Profil koperasi & Manajer (`title`, `manager`).
2. `units`: Gerai fisik (`title`, `kind`, `location`, `status`).
3. `staff`: Tim dan staf gerai (`title`, `role`, `unit_id`, `status`).
4. `stakeholders`: Mitra dan suplier (`title`, `category`, `contact`, `last_contact`, `follow_up`).
5. `work-items`: Tugas operasional (`title`, `status`, `priority`, `assignee`).
6. `meetings`: Rapat (`title`, `date`, `time`, `duration`).
7. `journal`: Catatan kegiatan lapangan (`title`, `date`, `notes`).

*Catatan: Entitas `staff` dan `stakeholders` akan ditambahkan ke `pageEntities('dunia-koperasi')` pada `workspace-scope.ts` agar termuat otomatis.*

---

## 5. Baseline Performa & Pengujian

- **Unit Test Suite:** 269 tes lulus dari 44 berkas tes (`npm.cmd test -- --maxWorkers=2`).
- **Typecheck:** 0 error (`tsc --noEmit`).
- **Lint:** 0 error (`eslint src tests`).
- **Production Build:** Lolos Next.js Turbopack build tanpa galat.

---

## 6. Bukti Visual Baseline (Tersimpan di Direktori Artefak)

1. `baseline_1440_kawasan_day_1791145129715.png` (Desktop 1440x900 Kawasan Siang)
2. `baseline_1440_kawasan_night_1791145150115.png` (Desktop 1440x900 Kawasan Malam — membuktikan pita hitam shadow acne dan lampu mati)
3. `baseline_1440_kantor_day_1791145178478.png` (Desktop 1440x900 Kantor Siang — membuktikan ruang interior 15x12 yang padat)
4. `baseline_1440_kantor_night_1791145193929.png` (Desktop 1440x900 Kantor Malam)
5. `baseline_1024_kawasan_1791145246215.png` (Tablet Landscape 1024x768 Kawasan)
6. `baseline_768_kawasan_1791145265058.png` (Tablet Portrait 768x1024 Kawasan)
7. `baseline_360_kawasan_1791145288604.png` (Mobile 360x780 Kawasan)
8. `baseline_360_kantor_1791145314896.png` (Mobile 360x780 Kantor)
