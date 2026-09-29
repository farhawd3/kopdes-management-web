import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

let mockedPathname = "/dashboard";

import { MobileNavigation } from "@/components/layout/MobileNavigation";

afterEach(() => {
  cleanup();
  mockedPathname = "/dashboard";
});

describe("Navigasi ringkas ponsel dan tablet", () => {
  it("menyediakan empat pekerjaan utama tanpa membuka menu lengkap", () => {
    render(<MobileNavigation onOpenMenu={() => {}} />);
    expect(screen.getByRole("link", { name: "Ringkasan" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Meja kerja" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Tugas" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Gerai" })).toBeDefined();
  });

  it("membuka daftar semua modul dari tombol Semua", () => {
    const onOpenMenu = vi.fn();
    render(<MobileNavigation onOpenMenu={onOpenMenu} />);
    fireEvent.click(screen.getByRole("button", { name: "Buka semua menu" }));
    expect(onOpenMenu).toHaveBeenCalledOnce();
  });

  it("menandai tombol Semua saat halaman bukan pintasan utama", () => {
    mockedPathname = "/pengaturan";
    render(<MobileNavigation onOpenMenu={() => {}} />);
    expect(screen.getByRole("button", { name: "Buka semua menu" }).getAttribute("aria-current")).toBe("page");
  });
});
