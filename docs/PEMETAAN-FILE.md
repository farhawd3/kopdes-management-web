# Pemetaan kode aktif

Kode dan dokumen lama berada di `.local-backup/legacy-20260930` yang tidak masuk Git. Riwayat repo baru menyimpan commit dasar sehingga perubahan tetap dapat ditelusuri tanpa membawa sejarah repo lama.

## Yang dikeluarkan dari runtime

Implementasi lama untuk anggota, stok dagang, keuangan, omzet, kinerja berbasis pendapatan, integrasi kunci AI, login/reset-password, repository monolitik, tipe transaksi lama, dan SQL reset lama dikeluarkan. Buku anggota, kas, barang, dan opname aktif memakai domain baru `hub_records`, bukan implementasi lama. Pengujian kontrak lama diarsip bersama kode lama.

Audit 3 Oktober menghapus `Burnup.tsx`, `InfluenceMap.tsx`, `DateRangePicker.tsx`, serta ekspor `ProgressRing` yang tidak digunakan runtime. Tes widget DateRangePicker ikut dilepas; referensi historis dalam arsip tetap disimpan. Cadangan dan migrasi SQL tidak termasuk pembersihan.

## Peta rute baru

| Rute | Implementasi |
|---|---|
| `/` | Alihkan ke `/beranda` |
| `/pin` | PIN, pengaturan PIN awal |
| `/beranda` | Dashboard, perhatian, progres, grafik |
| `/hari-ini` | Terlambat, hari ini, tujuh hari berikutnya, rapat |
| `/tugas` | Daftar, papan, kalender, Gantt, form tugas |
| `/proyek` | Galeri proyek, tujuan/catatan, progres, milestone, tugas dalam lingkup proyek |
| `/roadmap` | Gantt interaktif, rentang/skala, geser/resize jadwal, milestone |
| `/kesiapan`, `/gerai` | Checklist dan kesiapan lima dimensi |
| `/mitra`, `/rapat` | Kontak/interaksi, rapat/keputusan/tindak lanjut |
| `/tindak-lanjut` | Pengingat dan catatan sematan |
| `/pencatatan`, `/anggota`, `/keuangan`, `/barang`, `/stok-opname` | Ringkasan buku, anggota, kas, barang, snapshot opname; memerlukan migrasi pencatatan aktif |
| `/dokumen`, `/risiko` | Registri dokumen, risiko/isu |
| `/tim`, `/jurnal` | Petugas/pelatihan dan catatan kerja |
| `/laporan` | Snapshot, cetak/PDF, salin teks |
| `/pengaturan`, `/panduan` | Profil, PIN, backup, petunjuk |

Rute dinamis `(app)/[slug]` memakai allowlist navigasi, sehingga satu file tidak berarti menerima sembarang halaman. Layout memeriksa sesi server. Halaman domain memakai komponen terpisah di `features`.

## API

- `/api/auth/pin`: setup, login, change, logout.
- `/api/[entity]`: domain yang terdaftar dalam `schemas.ts` saja.
- Endpoint template lama dilepas; data tersimpan dan fungsi SQL historis tetap dipertahankan.
- `/api/reports`: daftar dan snapshot laporan server.
- `/api/backup`: ekspor dan pemulihan transaksi.

Semua API selain setup/login memerlukan sesi. Setup memerlukan token acak server; login memakai pembatasan persisten.

## Rujukan perawatan

Lihat [ARSITEKTUR](ARSITEKTUR.md) untuk tanggung jawab setiap file dan [STATUS](STATUS.md) untuk hasil pemeriksaan. Tidak ada folder kosong untuk fitur yang belum dibuat.
