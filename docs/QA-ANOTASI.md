# Pemeriksaan 15 anotasi — 4 Oktober 2026

| No. | Perbaikan |
| --- | --- |
| 1 | Bantuan proyek/form menjadi Cara mengisi yang tertutup bawaan, tinggi 45 px. Tidak fixed/menutupi input. |
| 2 | Textarea.ui-input berpadding 14px 16px, tinggi awal minimal 104 px, line-height 1.7. |
| 3 | Baris tugas terlambat memakai permukaan kartu, jarak aksi/meta konsisten dan judul membungkus. |
| 4 | Sel Jurnal diperlebar jaraknya; judul/kode/relasi membungkus; warna tanggal hari ini diperjelas. |
| 5 | Terakhir diubah memakai kisi ikon–judul/meta–panah, rata kiri dan permukaan berjenjang. |
| 6 | + Kas membuka cash-entries, bukan members. Anggota terisi; captureEntity dibersihkan ketika tutup. Jalur kas barang ikut diperbaiki. |
| 7 | Relasi kas berjeda 8 px, ikon/teks horizontal, chip berpadding. |
| 8 | Tabel Barang dan buku lain berpadding 16 px, batas baris dan hover ringan; gulir dalam kontainer. |
| 9 | Banner EntryGuide permanen empat buku dihapus; bantuan tersedia pada form/Panduan. |
| 10 | Gerai/Rapat memiliki header aksen lembut, meta terpisah, bayangan tipis; opsi ringkas ketika tertutup. |
| 11 | Tiga aksi rapat dalam kisi adaptif, satu kolom pada ponsel; Buka catatan/Opsi di footer. |
| 12 | Enam palet tetap memakai ID/preferensi lama; permukaan pastel dan teks aksi gelap. Aksen neon dilunakkan; swatch mengikuti token baru. |
| 13 | Pratinjau dekoratif di Pengaturan dihapus; pilihan tema langsung tampak pada aplikasi. |
| 14 | Profil/keamanan/cadangan selebar konten. Identitas membaca organization; profil kosong tidak menampilkan identitas statis. |
| 15 | Tutup navigasi hanya pada ponsel; desktop memakai ciutkan sidebar (Ctrl+B). |

## Bukti dan batas

- Aplikasi nyata dibaca tanpa mutasi: Hari Ini, Jurnal, Pencatatan, Anggota, Buku kas, Barang, Stok opname, Gerai, Rapat, Pengaturan. Sepuluh halaman pada 360/768/1024/1440 px; scrollWidth tidak melebihi innerWidth. Tabel tetap bergulir dalam kontainer.
- Editor proyek fixture empat lebar × terang/gelap: bantuan tertutup, padding textarea 14px 16px, tinggi 104 px. + Kas membuka Tambah Buku kas dengan anggota terisi; batal tanpa menyimpan.
- Rapat fixture terisi 360/1440 tema gelap: aksi satu kolom pada ponsel; opsi dibuka/ditutup. Screenshot/pengukuran lokal: artifacts/astra/annotation-gerai-final.png, annotation-notes-dark.png, annotations-viewports.json.
- 256 tes/42 berkas, TypeScript, ESLint dan build lulus. Regresi baru: + Kas dan reset ke anggota, profil tersimpan/kosong. Audit sumber 97/97 terjangkau.
- lint:ui masih gagal pada 111 temuan legacy; paket tidak menambah temuan. check:ui gagal pada tujuh kontrol mentah. Seluruh audit CSS belum selesai.
- Referensi pemisahan permukaan lembut, batas dan teks: [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale). Token palet berada di personal.css; tidak menambah library.
- Viewport browser bukan perangkat fisik. Semua kombinasi enam palet × seluruh halaman/keadaan belum diperiksa visual. Tidak menjalankan SQL cloud, deployment atau menyimpan data operasional.
- Perubahan pengguna sebelumnya di DateField, Select, Dashboard, SprintModal, RecursiveScheduleModal, TaskDetailDrawer dan ThemeContext dipertahankan di working tree, tidak masuk commit paket ini.
