"use client";

import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { RelatedPages } from "./RelatedPages";

export interface PageHeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
  title: string;
  badgeText?: string;
  statusBadge?: string;
  badgeVariant?: "crimson" | "success" | "warning" | "info" | "neutral";
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbItems,
  title,
  badgeText,
  statusBadge,
  badgeVariant = "crimson",
  description,
  actions,
  children,
  className,
}) => {
  const displayBadge = statusBadge ?? badgeText;
  return (
    <div className={cn("space-y-2.5 sm:space-y-3", className)}>
      {/* Remah Roti (Breadcrumb) Seragam */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} />
      )}

      {/* Baris Judul & Aksi Utama yang Terstandarisasi */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 dark:border-slate-700/80 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[1.4rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl md:text-[1.85rem]">
              {title}
            </h1>
            {displayBadge && (
              <Badge variant={badgeVariant} size="default">
                {displayBadge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="max-w-[68ch] text-sm leading-5 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-6">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex w-full flex-wrap items-center gap-2 [&>*]:flex-1 sm:w-auto sm:gap-2.5 sm:[&>*]:flex-none xl:shrink-0">
            {actions}
          </div>
        )}
      </div>

      <RelatedPages />

      {/* Konten Tambahan (Tab Bar, Alert Disclaimer, atau Filter Khusus) */}
      {children && <div className="pt-1">{children}</div>}
    </div>
  );
};
