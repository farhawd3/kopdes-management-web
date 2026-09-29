"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getActiveNavigationHref, PRODUCTION_READY_ROUTES, SEARCH_MODULES } from "@/lib/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/client";

const RELATED: Record<string, string[]> = {
  "/dashboard": ["/pekerjaan", "/monitoring", "/laporan"],
  "/pekerjaan": ["/monitoring", "/dashboard", "/unit-usaha"],
  "/monitoring": ["/unit-usaha", "/dashboard", "/keuangan"],
  "/unit-usaha": ["/monitoring", "/stok", "/pekerjaan"],
  "/stok": ["/monitoring", "/unit-usaha", "/keuangan"],
  "/keuangan": ["/laporan", "/monitoring", "/anggota"],
  "/laporan": ["/keuangan", "/monitoring", "/dashboard"],
  "/anggota": ["/keuangan", "/tata-kelola"],
  "/persiapan": ["/pekerjaan", "/tata-kelola", "/unit-usaha"],
  "/tata-kelola": ["/persiapan", "/pekerjaan", "/pengaturan"],
  "/pengaturan": ["/tata-kelola", "/bantuan"],
  "/bantuan": ["/dashboard", "/monitoring", "/pengaturan"],
};

export function RelatedPages() {
  const pathname = usePathname();
  const routes = (RELATED[getActiveNavigationHref(pathname) ?? ""] ?? []).filter(
    (href) => !isSupabaseConfigured() || PRODUCTION_READY_ROUTES.has(href)
  );
  if (routes.length === 0) return null;
  return (
    <nav aria-label="Halaman terkait" className="-mx-3.5 flex items-center gap-2 overflow-x-auto px-3.5 pb-1 scrollbar-thin sm:mx-0 sm:px-0">
      <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">Terkait</span>
      {routes.map((href) => (
        <Link key={href} href={href} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-rose-200">
          {SEARCH_MODULES.find((item) => item.href === href)?.title}
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      ))}
    </nav>
  );
}
