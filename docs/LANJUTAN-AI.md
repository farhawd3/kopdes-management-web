# Serah terima AI — 5 Oktober 2026

## Arahan aktif

Prioritaskan **Dunia Koperasi** sesuai video pengguna: lingkungan 3D isometrik biru-putih, kartu mengambang, interior kantor ketika gedung diklik, maskot animatif dengan bubble chat, cuaca/waktu, dan tujuh lahan gerai. Halaman operasional tetap menjadi sumber data dan tempat mengisi catatan.

Arahan 3 Oktober untuk mempertahankan dashboard berlaku pada halaman operasional; jangan memakainya sebagai larangan membangun dunia. Pemilik meminta panduan disesuaikan, bagian rancu dihapus, dan gaya disimpan untuk AI berikutnya.

## Urutan melanjutkan

1. Periksa Git; saat penulisan cabang `codex/dunia-koperasi`.
2. Baca AGENTS, STATUS, DESAIN-ANTARMUKA dan [DUNIA-KOPERASI](DUNIA-KOPERASI.md).
3. Baca `src/features/cooperative-world/` dan periksa render sebelum mengubah desain.
4. Jalankan pemeriksaan lalu catat bukti baru. Angka tes lama bukan bukti paket ini.

## Keadaan kode

- `/dunia-koperasi`: navigasi aplikasi, sesi yang sudah ada, data workspace; AppShell menyerahkan layar penuh.
- `/dev/dunia-koperasi`: hanya development, workspace kosong tanpa database.
- Three.js: kamera ortografis, OrbitControls, cahaya/bayangan, zoom/putar/reset, raycast gedung/karakter/lahan, penanda HTML aksesibel.
- Exterior: kantor biru, tujuh lahan, jalan, pohon, bangku dan area rencana logistik. Unit tersimpan muncul sebagai bangunan.
- Interior: meja rapat, meja tugas/komputer, arsip/buku, treadmill kegiatan. Pintasan membuka modul asli.
- Maskot: rapat aktif → duduk; jurnal hari ini → olahraga; tugas proses → bekerja; lainnya → idle. Pratinjau gerakan tidak menyimpan catatan.
- Cuaca simulasi dan waktu otomatis WIB/manual; preferensi Zod lokal memakai `usePreference`.
- Style: `world.css`, dibatasi `.cooperative-world` dan kelas `cw-*`. Backdrop blur dihapus karena mengganggu ketajaman render.

## Batas yang harus diteruskan

- Implementasi perlu penilaian pemilik; jangan klaim identik piksel dengan video atau sudah disetujui.
- Tujuh slot mengikuti created_at lalu ID; penghapusan gerai bisa menggeser slot berikutnya. Belum ada layout permanen/edit posisi.
- Ringkasan mengikuti catatan yang dimuat, bukan total global bila berpaginasi; belum real-time.
- Suplier, ekspedisi, pengiriman, karakter pegawai nyata, editor lingkungan, layout cloud dan AI chat masih rencana. Tidak ada SQL baru pada paket ini.
- Screenshot awal desktop dengan blur sudah usang. Bukti terbaru ada di STATUS. Tes UI scene tiruan tidak membuktikan WebGL/animasi.
- Percobaan tes tanpa batas worker membebani mesin dan dihentikan. Jalankan `npm test -- --maxWorkers=2`; catat hanya hasil yang selesai.

## Perubahan pemilik

Pertahankan perubahan awal pada DateField.tsx, Select.tsx, Dashboard.tsx, SprintModal.tsx, RecursiveScheduleModal.tsx, TaskDetailDrawer.tsx, ThemeContext.tsx dan docs/PLAN-ASTRA-Kopdes.md yang belum terlacak. Jangan sertakan semuanya dalam commit dunia atau mengembalikannya tanpa memeriksa diff.

next-env.d.ts berubah saat Next.js dijalankan; periksa keluaran generator sebelum memulihkannya. Tidak ada deploy atau SQL cloud pada sesi ini. Ikuti [MIGRASI-SQL](MIGRASI-SQL.md) untuk perubahan cloud.
