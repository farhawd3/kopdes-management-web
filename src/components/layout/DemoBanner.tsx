"use client";

import React from "react";
import { Info, ShieldCheck } from "lucide-react";
import { useOrganizationProfile } from "@/lib/OrganizationContext";
import { businessStatusLabel } from "@/lib/organization-status";

/** Status organisasi berbeda dari kemampuan prototipe. */
const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const DemoBanner: React.FC = () => {
  const { profile } = useOrganizationProfile();
  return (
  <aside
    aria-label="Status aplikasi"
    className="flex min-h-8 items-center justify-between gap-3 border-b border-rose-100 bg-rose-50 px-3.5 py-1.5 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:px-5 sm:text-xs"
  >
    <span className="flex items-center gap-2">
      <Info className="h-4 w-4 shrink-0 text-primary-container dark:text-rose-400" />
      <strong>{businessStatusLabel(profile.business_status)}</strong>
      <span className="hidden lg:inline">{profile.region || "Wilayah kerja belum diisi"}</span>
    </span>
    <span className="flex items-center gap-1.5 font-medium">
      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span className="hidden sm:inline">
        {hasSupabase
          ? "Aplikasi Pribadi Manajer · Supabase Dikonfigurasi"
          : "Aplikasi Pribadi Manajer · Akses Privat Lokal"}
      </span>
    </span>
  </aside>
  );
};
