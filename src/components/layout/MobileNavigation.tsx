"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Inbox, LayoutDashboard, Menu, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_ITEMS = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/meja-kerja", label: "Meja kerja", icon: Inbox },
  { href: "/pekerjaan", label: "Tugas", icon: ClipboardList },
  { href: "/monitoring", label: "Gerai", icon: Store },
] as const;

interface MobileNavigationProps {
  onOpenMenu: () => void;
}

/** Navigasi pekerjaan harian untuk ponsel dan tablet tanpa membuka daftar menu panjang. */
export function MobileNavigation({ onOpenMenu }: MobileNavigationProps) {
  const pathname = usePathname();
  const isPrimaryRoute = PRIMARY_ITEMS.some(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
  );

  return (
    <nav
      aria-label="Navigasi utama ponsel dan tablet"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_28px_rgba(37,47,64,0.08)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-[#222C3C]/95 xl:hidden"
    >
      <div className="mx-auto grid max-w-2xl grid-cols-5 gap-1">
        {PRIMARY_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-[52px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold transition-colors sm:text-xs",
                active
                  ? "bg-rose-50 text-primary dark:bg-rose-400/10 dark:text-rose-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-primary-container dark:text-rose-300")} />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onOpenMenu}
          className={cn(
            "flex min-h-[52px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold transition-colors sm:text-xs",
            !isPrimaryRoute
              ? "bg-rose-50 text-primary dark:bg-rose-400/10 dark:text-rose-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          )}
          aria-label="Buka semua menu"
          aria-current={!isPrimaryRoute ? "page" : undefined}
        >
          <Menu className={cn("h-5 w-5", !isPrimaryRoute && "text-primary-container dark:text-rose-300")} />
          <span>Semua</span>
        </button>
      </div>
    </nav>
  );
}
