# 05 · Navigasi & Menu

Bilah menu melayang berbentuk pil di bawah layar (lihat `ui/09_komponen_ui`):
**Beranda · Proyek · Tugas · Kegiatan · Rapat · Gerai · Suplier (BARU) · Pencatatan · Pengaturan**

## Menu Suplier (baru)
- Daftar suplier: nama, kontak, kategori barang, status, catatan.
- Relasi: Suplier ↔ Barang (Pencatatan), Suplier ↔ Kegiatan (kunjungan), Suplier ↔ Mitra, Suplier ↔ Dokumen (kontrak).
- Di Scene 1, suplier aktif tidak punya gedung; mereka muncul sebagai **kendaraan pengantar** menuju gudang.
- Catatan implementasi: tambahkan sebagai jenis `hub record` baru (`supplier`) dengan validasi server
  seperti jenis lain; jangan membuat tabel terpisah agar konsisten dengan model hub records.

## Alur klik
Scene 1 → klik Koperasi → Scene 2. Scene 1 → klik gerai → kartu gerai → "Buka Kesiapan". Slot terkunci → form tambah gerai.
Scene 2 → klik meja → modul. Esc / "Kembali" selalu naik satu tingkat.

## Aksesibilitas
Semua objek dapat difokus keyboard (Tab), Enter = klik, label ARIA = nama objek + status.
Panel kartu bisa dibuka dari bilah menu tanpa harus klik objek dunia. Mode "Daftar saja" menonaktifkan scene.
