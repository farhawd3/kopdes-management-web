# Repositori baru: kopdes-dunia-koperasi

Pemilik memilih repositori publik pada 4 Oktober 2026. Repositori lama `halimxn/kopdes-management-web` dipertahankan. Paket ini tidak mengubah remote origin dan tidak memublikasikan kode otomatis.

Setelah paket desain dicommit, jalankan dari checkout ini:

```powershell
powershell -File scripts/prepare-new-repository.ps1
```

Skrip membuat **folder baru** `D:\Koding\kopdes-dunia-koperasi` dengan riwayat Git bersih pada cabang `codex/dunia-koperasi`. Skrip menyalin isi kerja berkas yang terlacak, sehingga perubahan lokal pemilik pada berkas terlacak ikut salinan. Berkas baru yang belum ditambahkan ke Git tidak ikut: periksa `git status` dahulu. Skrip menolak folder tujuan yang sudah ada dan tidak menyalin `.git`, `.env.local`, node_modules, build, atau artefak lokal.

1. Buka [GitHub New Repository](https://github.com/new), pilih pemilik `halimxn`, nama `kopdes-dunia-koperasi`, dan **Public**. Biarkan tanpa README, lisensi, atau gitignore otomatis agar repo kosong.
2. Di folder baru, periksa isi yang akan dipublikasikan lalu jalankan:

```powershell
cd D:\Koding\kopdes-dunia-koperasi
git add .
git commit -m "Bangun dunia koperasi isometrik" -m "Ruang kerja, dua scene, navigasi khusus dan suplier tervalidasi."
git remote add origin https://github.com/halimxn/kopdes-dunia-koperasi.git
git push -u origin codex/dunia-koperasi
```

3. Pilih cabang tersebut sebagai cabang utama melalui pengaturan GitHub. Deployment web dilakukan terpisah setelah platform hosting dan proyeknya dipilih.
4. Untuk menjalankan lokal, `npm ci`, isi `.env.local` dari `.env.example` pada perangkat, lalu `npm run dev`. Rahasia konfigurasi disimpan pada pengaturan hosting, tidak di repositori.

Migrasi `20261004000008_supplier.sql` menambahkan domain supplier, validasi status/nama, pemeriksaan relasi kegiatan, dan fungsi kemampuan server. RLS tetap aktif. Belum dijalankan cloud; proyek tujuan yang tercatat adalah `mqycnhebhzqaziouipet`. Konfirmasi pemilik dan pemeriksaan migrasi sebelumnya diperlukan sebelum penerapan. Jangan menjalankan berkas reset untuk mengaktifkan Suplier.
