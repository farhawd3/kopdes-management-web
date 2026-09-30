# Panduan AI — Kopdes Management Web

## Urutan membaca
1. `docs/STATUS.md`: keadaan nyata dan pekerjaan berikutnya.
2. `docs/KEPUTUSAN.md` dan `docs/PRD.md`: keputusan pemilik dan kebutuhan.
3. `docs/CHECKLIST.md` dan kode terkait: kriteria pekerjaan.

## Produk
- Ruang kerja pribadi manajer KDMP Puntukrejo: rencana 90 hari, tugas, milestone, kesiapan gerai, koordinasi, dokumen, risiko, laporan kerja.
- Kode lama hanya dasar refaktor. Produk baru tidak mencakup anggota, omzet, stok dagang, akuntansi, kasir, atau kunci AI pengguna.
- Identitas berasal dari profil. Jangan mengarang nama, kontak, capaian, atau data operasional.
- Template adalah rencana yang bisa diedit; bukan pekerjaan yang sudah terlaksana.
- Pengalaman produk berupa task/project manager terinspirasi Notion: proyek, catatan, tugas terhubung, daftar/papan/kalender. Jangan mengklaim editor blok atau kolaborasi real-time sudah tersedia.
- Domain `workstreams` juga menjadi proyek; pertahankan kompatibilitas bidang kerja template dan cadangan lama.
- Bahasa Indonesia sederhana, zona waktu Asia/Jakarta.

## Kode yang mudah dirawat
- Next.js App Router, React, TypeScript strict, Tailwind, Zod, Supabase.
- `app/`: rute tipis; `features/<domain>/`: skema, layanan, UI domain; `components/`: UI bersama; `lib/`: utilitas bersama.
- Hindari repository serbaguna, abstraksi spekulatif, `any`, dan duplikasi rumus.
- Satu sumber progres di `lib/progress.ts`; utilitas tanggal kalender bersama.
- Nama fungsi menjelaskan tindakan; komentar menjelaskan alasan bisnis.
- Tangani memuat, kosong, galat, dan data. Galat database tidak boleh berubah menjadi angka palsu.

## Keamanan
- Gunakan Supabase BARU; konfigurasi lama bukan izin menulis database lama.
- Sebelum migrasi cloud: jelaskan berkas SQL, dampak, dan proyek tujuan, lalu minta konfirmasi pengguna.
- RLS aktif, akses bawaan ditolak, setiap aksi server divalidasi Zod dan sesi.
- Rahasia server tidak masuk browser, Git, atau log. Jangan mengaktifkan layanan berbayar.
- PIN minimal 6 digit, hash yang sesuai, batas percobaan persisten, sesi kedaluwarsa, cookie HttpOnly/Secure/SameSite, pemeriksaan asal mutasi.

## Multiplatform
- Periksa 360, 768, 1024, 1440 px; navigasi bawah ponsel, rel tablet, sidebar desktop.
- Area sentuh minimal 44 px, fokus keyboard, label form, status memakai teks selain warna.
- Tabel/Gantt bergulir dalam kontainer; hormati reduced-motion dan safe area.
- Token visual mengikuti PRD terbaru.

## Proses
1. Periksa Git dan pertahankan perubahan pengguna.
2. Implementasikan paket kerja konkret dan dapat diverifikasi.
3. Jalankan `npm test`, `npm run typecheck`, `npm run build`; lint setelah tersedia.
4. Periksa singkat UI yang berubah pada ukuran relevan.
5. Perbarui STATUS, checklist yang benar-benar selesai, dan CHANGELOG.
6. Laporkan hasil dan batasan secara jujur; tes lama bukan bukti fitur baru selesai.

Commit/push per paket kerja, pesan ringkas dengan judul dan isi dipisahkan baris kosong. Cabang fitur `codex/`. Repo baru memakai riwayat bersih sesuai permintaan pemilik; jangan force-push repo lama. Jangan menandai pemeriksaan perangkat yang belum dilakukan.
