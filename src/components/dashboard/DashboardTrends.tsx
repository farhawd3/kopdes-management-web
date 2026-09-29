"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { formatRupiah } from "@/lib/utils";
import type { DashboardSummary } from "@/lib/manager-summary";

export function RevenueTrend({ data }: { data: DashboardSummary["dailyTrend"] }) {
  const maximum = Math.max(1, ...data.map((day) => day.revenue));
  const total = data.reduce((sum, day) => sum + day.revenue, 0);
  const hasRevenue = data.some((day) => day.revenue > 0);
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Omset tujuh hari terakhir</CardTitle>
        <CardDescription>Total tercatat {formatRupiah(total)}. Hari tanpa rekap belum tentu berarti tidak ada penjualan.</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        {hasRevenue ? <div className="flex h-40 items-end gap-2 sm:gap-4" aria-hidden="true">
          {data.map((day) => (
            <div key={day.date} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <div title={formatRupiah(day.revenue)} className="w-full max-w-12 rounded-t-lg bg-rose-200 dark:bg-rose-400/60" style={{ height: `${day.revenue / maximum * 80}%`, minHeight: day.revenue > 0 ? 3 : 0 }} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{day.date.slice(8)}/{day.date.slice(5, 7)}</span>
            </div>
          ))}
        </div> : <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-6 dark:border-slate-700 dark:bg-slate-800/40">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Belum ada omset yang tercatat dalam tujuh hari ini</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Bila gerai sudah beroperasi, periksa apakah rekap harian sudah diisi.</p>
          <Link href="/monitoring" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Buka pemantauan gerai <ArrowUpRight className="h-4 w-4" /></Link>
        </div>}
        <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-semibold">Rincian angka per hari</summary>
          <dl className="space-y-2 border-t border-slate-100 px-4 py-4 text-sm dark:border-slate-700">
            {data.map((day) => <div key={day.date} className="flex flex-wrap justify-between gap-2"><dt>{day.date}</dt><dd className="font-semibold tabular-nums">{formatRupiah(day.revenue)}</dd></div>)}
          </dl>
        </details>
      </CardContent>
    </Card>
  );
}

export function ReportingTrend({ data }: { data: NonNullable<DashboardSummary["reportingTrend"]> }) {
  const total = data[0]?.total ?? 0;
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Keterisian rekap tujuh hari</CardTitle>
        <CardDescription>Jumlah gerai aktif saat ini yang memiliki rekap pada tiap tanggal. Bukan penilaian hari operasional.</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        {total === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
            Belum ada gerai aktif. Grafik keterisian akan tersedia setelah ada gerai berstatus aktif.
          </div>
        ) : (
          <div className="flex h-40 items-end gap-2 sm:gap-4" aria-label="Grafik keterisian rekap tujuh hari">
            {data.map((day) => (
              <div key={day.date} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5" title={`${day.date}: ${day.reported} dari ${day.total} gerai aktif`}>
                <span className="text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">{day.reported}/{day.total}</span>
                <div className="flex h-24 w-full max-w-12 items-end rounded-t-lg bg-sky-50 dark:bg-slate-800">
                  <div className="w-full rounded-t-lg bg-sky-500/75 dark:bg-sky-400/70" style={{ height: `${day.percent ?? 0}%` }} />
                </div>
                <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{day.date.slice(8)}/{day.date.slice(5, 7)}</span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Hitungan per gerai unik; rekap ganda pada satu tanggal tidak menambah jumlah. Jadwal hari tutup belum tercatat.</p>
        <Link href="/kinerja-gerai" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Lihat kinerja gerai <ArrowUpRight className="h-4 w-4" /></Link>
      </CardContent>
    </Card>
  );
}
