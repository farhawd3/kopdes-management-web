"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Activity, ClipboardList, Download, Package, RefreshCw, Store, Users, Sparkles, Sunrise, Sun, Sunset, MoonStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardMetric } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { useResource } from "@/lib/useResource";
import { useOrganizationProfile } from "@/lib/OrganizationContext";
import { formatRupiah } from "@/lib/utils";
import { downloadCsvFile } from "@/lib/csv";
import { managerActions, managerSnapshotRows, reportingProgress, type DashboardSummary, type FocusCategory } from "@/lib/manager-summary";
import { getWibGreeting } from "@/lib/dashboard-greeting";
import { RevenueTrend, ReportingTrend } from "@/components/dashboard/DashboardTrends";
import { ManagerShortcuts } from "@/components/dashboard/ManagerShortcuts";
import { ManagerBriefing } from "@/components/dashboard/ManagerBriefing";

async function loadSummary(): Promise<DashboardSummary> {
  const response = await fetch("/api/dashboard/executive", { cache: "no-store" });
  if (!response.ok) throw new Error("Ringkasan manajemen belum dapat diakses.");
  return response.json();
}


export function ProductionDashboard() {
  const { data, loading, error, reload } = useResource(loadSummary);
  const { profile, error: profileError } = useOrganizationProfile();
  const [category, setCategory] = useState<FocusCategory>("semua");
  if (error) return <ErrorState message="Ringkasan belum dapat dimuat. Periksa koneksi dan akses database, lalu coba lagi." onRetry={reload} />;
  if (loading || !data) return <LoadingState label="Membaca ringkasan manajemen koperasi…" />;

  const progress = reportingProgress(data);
  const allActions = managerActions(data);
  const actions = allActions.filter((item) => category === "semua" || item.category === category);
  const briefing = (data.overdueTaskCount ?? 0) > 0
    ? { title: `${data.overdueTaskCount} tugas melewati tenggat`, detail: "Tinjau penanggung jawab dan tetapkan tindak lanjut terlebih dahulu.", href: "/pekerjaan", action: "Buka tugas" }
    : data.unreportedUnits.length > 0
    ? { title: `${data.unreportedUnits.length} gerai belum tercatat melapor`, detail: "Periksa apakah gerai beroperasi hari ini, lalu minta atau catat rekapnya.", href: "/monitoring", action: "Periksa rekap" }
    : (data.lowStockCount ?? 0) > 0
    ? { title: `${data.lowStockCount} barang perlu diperiksa`, detail: "Pastikan stok fisik dan kebutuhan pengadaan pada gerai terkait.", href: "/stok", action: "Periksa stok" }
    : { title: "Tidak ada peringatan utama dari data saat ini", detail: "Lanjutkan pemeriksaan laporan dan agenda rutin. Data yang belum diisi tidak dianggap otomatis aman.", href: "/meja-kerja", action: "Buka meja kerja" };
  const updated = data.generatedAt ? new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(data.generatedAt)) : null;
  const greeting = getWibGreeting(new Date());
  const GreetingIcon = greeting === "pagi" ? Sunrise : greeting === "siang" ? Sun : greeting === "sore" ? Sunset : MoonStar;

  return (
    <div className="space-y-5 pb-6">
      <header className="relative overflow-hidden rounded-[24px] border border-rose-200/70 bg-gradient-to-br from-white via-rose-50/65 to-sky-50/70 p-4 shadow-sm dark:border-slate-700 dark:from-[#252F40] dark:via-[#302C3A] dark:to-[#263642] sm:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-400/10" />
        <div className="relative flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-primary-container shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-rose-300 sm:h-14 sm:w-14"><GreetingIcon className="h-6 w-6" aria-hidden="true" /></span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-container dark:text-rose-300">Ruang kerja manajer</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">Selamat {greeting}!</h1>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{profile.display_name}</p>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{updated ? `Data diperbarui ${updated} WIB` : "Ringkasan berdasarkan rekap tersimpan"}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">
            <Button variant="outline" onClick={reload} className="min-h-12 bg-white/80 dark:bg-slate-800/80"><RefreshCw className="mr-2 h-4 w-4" />Perbarui</Button>
            <Button onClick={() => downloadCsvFile(`ringkasan-manajer-${data.businessDate ?? "terbaru"}`, managerSnapshotRows(data, profile.display_name))} className="min-h-12"><Download className="mr-2 h-4 w-4" />Unduh CSV</Button>
            <ManagerBriefing data={data} organization={profile.display_name} />
          </div>
        </div>
      </header>
      {profileError && <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">{profileError} Identitas yang ditampilkan mungkin belum terbaru.</p>}

      <section aria-label="Indikator utama" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <CardMetric title="Omset bulan berjalan" value={formatRupiah(data.monthRevenue)} subtitle="Akumulasi rekap sampai hari ini" icon={<Activity className="h-5 w-5" />} accent="crimson" action={{ href: "/monitoring", label: "Lihat rekap" }} />
        <CardMetric title="Pelaporan hari ini" value={`${progress.reported} / ${progress.total}`} subtitle={progress.total ? "Gerai aktif yang sudah melapor" : "Belum ada gerai aktif"} progress={progress.percent ?? undefined} icon={<Store className="h-5 w-5" />} accent="sky" action={{ href: "/monitoring", label: "Catat laporan" }} />
        <CardMetric title="Tugas belum selesai" value={data.activeTasks} subtitle={`${data.overdueTaskCount ?? 0} lewat tenggat · ${data.todayDueTaskCount ?? 0} jatuh tempo hari ini`} icon={<ClipboardList className="h-5 w-5" />} accent="amber" action={{ href: "/pekerjaan", label: "Kelola tugas" }} />
        <CardMetric title="Stok perlu perhatian" value={data.lowStockCount ?? 0} subtitle="Barang pada atau di bawah batas minimum" icon={<Package className="h-5 w-5" />} accent="emerald" action={{ href: "/stok", label: "Periksa stok" }} />
      </section>

      <ManagerShortcuts />

      <section aria-label="Briefing keputusan manajer" className="flex flex-col gap-4 rounded-[20px] border border-rose-200/70 bg-gradient-to-r from-rose-50/80 via-white to-sky-50/50 p-5 shadow-sm dark:border-rose-900/40 dark:from-[#332B39] dark:via-[#252F40] dark:to-[#263642] sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="flex min-w-0 items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary-container shadow-sm dark:bg-rose-950/50 dark:text-rose-300"><Sparkles className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-wide text-primary-container dark:text-rose-300">Prioritas manajer hari ini · berdasarkan data tercatat</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">{briefing.title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{briefing.detail}</p><p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{allActions.length} tindak lanjut pada daftar fokus · {progress.reported}/{progress.total} gerai aktif tercatat melapor</p></div></div>
        <ButtonLink href={briefing.href} variant="outline" className="w-full shrink-0 sm:w-auto">{briefing.action}<ArrowUpRight className="ml-2 h-4 w-4" /></ButtonLink>
      </section>

      <section aria-label="Tren tujuh hari" className="grid items-start gap-4 lg:grid-cols-2">
        <RevenueTrend data={data.dailyTrend} />
        {data.reportingTrend && <ReportingTrend data={data.reportingTrend} />}
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div><CardTitle>Fokus & tindak lanjut</CardTitle><CardDescription>Tugas mendesak, laporan gerai, dan stok yang perlu ditinjau.</CardDescription></div>
              <div className="w-full shrink-0 sm:w-48"><Select aria-label="Kategori tindak lanjut" value={category} onChange={(event) => setCategory(event.target.value as FocusCategory)} options={[{ value: "semua", label: "Semua kategori" }, { value: "tugas", label: "Tugas" }, { value: "gerai", label: "Pelaporan gerai" }, { value: "stok", label: "Stok barang" }]} /></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{actions.length} tindak lanjut ditampilkan. Cuplikan prioritas cepat.</p>
              <Link href="/meja-kerja" className="inline-flex min-h-8 items-center gap-1 text-xs font-bold text-primary hover:underline">
                Buka Meja Kerja Lengkap <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {actions.length === 0 ? <div className="rounded-xl bg-slate-50 p-6 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Tidak ada tindak lanjut pada kategori ini berdasarkan data yang tercatat. Tetap periksa kelengkapan rekap gerai.</div> :
              <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                {actions.map((item) => <li key={item.id}><Link href={item.href} className="group flex min-h-16 items-start justify-between gap-3 rounded-xl px-2 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="min-w-0 space-y-1.5"><div className="flex flex-wrap items-center gap-2"><span className="break-words text-sm font-semibold">{item.title}</span><Badge variant={item.category === "gerai" ? "info" : "warning"}>{item.label}</Badge></div><p className="text-sm text-slate-500 dark:text-slate-400">{item.detail}</p><span className="text-xs font-semibold text-primary">Buka {item.category === "tugas" ? "daftar tugas" : item.category === "gerai" ? "pemantauan gerai" : "stok barang"}</span></div>
                  <ArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                </Link></li>)}
              </ul>}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Catatan bulan berjalan</CardTitle><CardDescription>Rekap operasional, bukan laporan akuntansi lengkap.</CardDescription></CardHeader><CardContent className="space-y-4 pt-2">
            <dl className="space-y-4 text-sm"><div><dt className="text-slate-500 dark:text-slate-400">Pengeluaran tercatat</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{formatRupiah(data.monthExpenses)}</dd></div><div><dt className="text-slate-500 dark:text-slate-400">Selisih omset & pengeluaran</dt><dd className={`mt-1 text-xl font-semibold tabular-nums ${data.monthProfit < 0 ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"}`}>{formatRupiah(data.monthProfit)}</dd></div></dl>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Belum memperhitungkan seluruh HPP, aset, atau kewajiban. Selisih ini bukan saldo kas, laba bersih, maupun SHU resmi.</p><ButtonLink href="/keuangan" variant="outline" className="w-full">Tinjau catatan keuangan</ButtonLink>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Data & persiapan</CardTitle></CardHeader><CardContent className="space-y-2 pt-2">
            {[{ href: "/unit-usaha", label: `${data.totalUnits} gerai terdaftar`, icon: Store }, { href: "/anggota", label: `${data.totalMembers} anggota terdaftar`, icon: Users }, { href: "/pengaturan", label: "Profil & cadangan data", icon: Download }].map((item) => <Link key={item.href} href={item.href} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><item.icon className="h-4 w-4 text-primary" />{item.label}<ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" /></Link>)}
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
