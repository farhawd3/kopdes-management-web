# Keputusan proyek — 30 September 2026

Instruksi pemilik memperbarui rancangan yang masih menyebut aplikasi lama.

| Hal | Keputusan |
|---|---|
| Repositori | `kopdes-management-web`, riwayat baru tanpa induk |
| Produk | Kopdes Management Web; profil awal KDMP Puntukrejo |
| Kode | Dasar refaktor, belum memenuhi PRD baru |
| Urutan | Push dasar proyek dahulu, lalu transformasi fitur |
| Database | Supabase baru; database lama tidak diubah |
| Dokumen | `docs-new` menjadi `docs`, nama tanpa nomor; changelog di akar |
| Arsip lokal | `.local-backup/legacy-20260930`, diabaikan Git |
| Data awal | Kosong + template rencana belum selesai; gerai rencana |
| Profil | Identitas yang belum diketahui diisi saat pengaturan awal |
| Tanggal mulai | Default rancangan 1 Oktober 2026, dapat diubah |
| Anggaran | Belum diaktifkan, membutuhkan keputusan pemilik |

PRD, checklist, workflow, dan pemetaan berasal dari audit arsip sumber lama. Jumlah file dan jadwal merupakan konteks rancangan, bukan audit implementasi aktif. Status nyata ada di STATUS.md.

Usulan memakai Supabase lama, menghapus tabel setelah 30 hari, tag legacy di repo baru, dan menunggu persetujuan PRD digantikan keputusan di atas. Konfirmasi SQL cloud tetap diperlukan sebelum berkas migrasi tertentu dijalankan pada proyek tertentu.
