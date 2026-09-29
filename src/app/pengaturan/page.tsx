"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  ShieldCheck,
  Save,
  AlertCircle,
  MapPin,
  Palette,
  User,
  CreditCard,
  CheckCircle2,
  Database,
  DownloadCloud,
  UploadCloud,
  FileJson,
  Link2Off,
  FilePenLine,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { PageHeader } from "@/components/layout";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AppearanceSettings } from "@/components/pengaturan/AppearanceSettings";
import { useOrganizationProfile, OrganizationProfileData } from "@/lib/OrganizationContext";
import { getTodayWIB, formatTanggal } from "@/lib/utils";
import { OpenAiKeySettings } from "@/components/pengaturan/OpenAiKeySettings";
import { UnitApiKeySettings } from "@/components/pengaturan/UnitApiKeySettings";
import { ManagerPinSettings } from "@/components/pengaturan/ManagerPinSettings";
import { businessStatusLabel } from "@/lib/organization-status";

export default function PengaturanPage() {
  const { setProfileData, reloadProfile: reloadGlobalProfile } = useOrganizationProfile();

  const [profile, setProfile] = useState<OrganizationProfileData | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerTitle, setManagerTitle] = useState("");
  const [region, setRegion] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [businessStatus, setBusinessStatus] = useState<string>("persiapan");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountHolder, setBankAccountHolder] = useState("");
  const [financeSourceView, setFinanceSourceView] = useState<"manual" | "api">("manual");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { showToast } = useToast();
  const [section, setSection] = useState("tampilan");

  const fetchProfileFromApi = async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await fetch("/api/organization/profile", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Gagal mengambil data profil.");
      }
      const json = await res.json();
      const data: OrganizationProfileData = json.profile;

      setProfile(data);
      setDisplayName(data.display_name || "");
      setLegalName(data.legal_name || "");
      setManagerName(data.manager_name || "Abdul Halim");
      setManagerTitle(data.manager_title || "Manajer Koperasi");
      setRegion(data.region || "");
      setFullAddress(data.full_address || "");
      setFiscalYear(data.fiscal_year || "2026/2027");
      setBusinessStatus(data.business_status || "persiapan");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setBankName(data.bank_name || "");
      setBankAccountNumber(data.bank_account_number || "");
      setBankAccountHolder(data.bank_account_holder || "");
      setIsDirty(false);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileFromApi();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        display_name: displayName.trim(),
        legal_name: legalName.trim() || null,
        manager_name: managerName.trim(),
        manager_title: managerTitle.trim(),
        region: region.trim(),
        full_address: fullAddress.trim() || null,
        fiscal_year: fiscalYear.trim(),
        business_status: businessStatus,
        phone: phone.trim() || null,
        email: email.trim() || null,
        bank_name: bankName.trim() || null,
        bank_account_number: bankAccountNumber.trim() || null,
        bank_account_holder: bankAccountHolder.trim() || null,
      };

      const res = await fetch("/api/organization/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gagal menyimpan profil organisasi.");
      }

      setProfile(result.profile);
      setProfileData(result.profile);
      setIsDirty(false);

      showToast(
        "success",
        "Pengaturan Berhasil Disimpan",
        "Profil organisasi dan nama pengelola berhasil tersimpan permanen di database Supabase."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kendala saat menyimpan perubahan.";
      showToast("error", "Gagal Menyimpan", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setLegalName(profile.legal_name || "");
      setManagerName(profile.manager_name || "Abdul Halim");
      setManagerTitle(profile.manager_title || "Manajer Koperasi");
      setRegion(profile.region || "");
      setFullAddress(profile.full_address || "");
      setFiscalYear(profile.fiscal_year || "2026/2027");
      setBusinessStatus(profile.business_status || "persiapan");
      setPhone(profile.phone || "");
      setEmail(profile.email || "");
      setBankName(profile.bank_name || "");
      setBankAccountNumber(profile.bank_account_number || "");
      setBankAccountHolder(profile.bank_account_holder || "");
      setIsDirty(false);
      showToast("info", "Perubahan Dibatalkan", "Formulir dikembalikan ke data database awal.");
    }
  };

  // State & Handler Pencadangan & Pemulihan Sistem (Tahap 5)
  const [downloadingBackup, setDownloadingBackup] = useState(false);
  const [restorePayload, setRestorePayload] = useState<any | null>(null);
  const [restoreSummary, setRestoreSummary] = useState<{
    exported_at: string;
    unitsCount: number;
    tasksCount: number;
    productsCount: number;
    reportsCount: number;
    membersCount: number;
  } | null>(null);
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreConfirmOpen, setRestoreConfirmOpen] = useState(false);

  const handleDownloadBackup = async () => {
    setDownloadingBackup(true);
    try {
      const res = await fetch("/api/backup", { cache: "no-store" });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Gagal mengunduh berkas cadangan.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `backup-kopdes-${getTodayWIB()}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("success", "Cadangan Diunduh", "Berkas cadangan data sistem berhasil disimpan.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      showToast("error", "Gagal Mengunduh", msg);
    } finally {
      setDownloadingBackup(false);
    }
  };

  const handleSelectRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setRestoreError(null);
    setRestorePayload(null);
    setRestoreSummary(null);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.app || parsed.version !== 1 || !parsed.data) {
          throw new Error("Berkas ini bukan cadangan data sistem Kopdes yang sah (versi 1).");
        }
        setRestorePayload(parsed);
        setRestoreSummary({
          exported_at: parsed.exported_at || "-",
          unitsCount: parsed.data.business_units?.length || 0,
          tasksCount: parsed.data.tasks?.length || 0,
          productsCount: parsed.data.products?.length || 0,
          reportsCount: parsed.data.unit_daily_reports?.length || 0,
          membersCount: parsed.data.members?.length || 0,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Berkas JSON tidak dapat dibaca atau rusak.";
        setRestoreError(msg);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = async () => {
    if (!restorePayload) return;
    setIsRestoring(true);
    try {
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restorePayload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memulihkan cadangan data.");

      showToast(
        "success",
        "Pemulihan Berhasil",
        "Data sistem berhasil dipulihkan ke database Supabase."
      );
      setRestoreConfirmOpen(false);
      setRestorePayload(null);
      setRestoreSummary(null);
      reloadGlobalProfile();
      fetchProfileFromApi();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      showToast("error", "Gagal Memulihkan", msg);
    } finally {
      setIsRestoring(false);
    }
  };

  if (loadError) {
    return (
      <ErrorState
        message="Profil organisasi belum dapat dimuat dari Supabase. Periksa koneksi jaringan privat Anda."
        onRetry={fetchProfileFromApi}
      />
    );
  }

  if (isLoading || !profile) {
    return <LoadingState label="Memuat profil organisasi dari database Supabase..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header Terstandarisasi */}
      <PageHeader
        breadcrumbItems={[
          { label: "Sistem" },
          { label: "Pengaturan Profil & Tata Kelola", active: true },
        ]}
        title="Profil & Pengaturan Organisasi"
        badgeText={businessStatusLabel(profile.business_status)}
        badgeVariant="crimson"
        description="Pilih bagian yang ingin diatur. Perubahan profil baru tersimpan setelah Bapak menekan Simpan."
        actions={
          isDirty ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="default" onClick={handleReset}>
                Batalkan
              </Button>
              <Button
                variant="primary"
                size="default"
                onClick={handleSave}
                isLoading={isSaving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
            </div>
          ) : undefined
        }
      />

      <nav
        aria-label="Navigasi bagian pengaturan"
        className="sticky top-0 z-20 -mx-3.5 flex gap-2 overflow-x-auto border-y border-slate-200/75 bg-[#F7F8FC]/95 px-3.5 py-2 backdrop-blur-xl scrollbar-thin dark:border-slate-700/75 dark:bg-[#1D2533]/95 sm:mx-0 sm:rounded-2xl sm:border sm:px-3"
      >
        {[
          { href: "#tampilan", label: "Tampilan", icon: Palette },
          { href: "#keamanan", label: "Keamanan", icon: ShieldCheck },
          { href: "#integrasi", label: "Integrasi", icon: Link2Off },
          { href: "#profil-organisasi", label: "Profil", icon: Building2 },
          { href: "#backup", label: "Backup", icon: Database },
        ].map(({ href, label, icon: Icon }) => (
          <button
            type="button"
            key={href}
            aria-pressed={section === href.slice(1)}
            onClick={() => setSection(href.slice(1))}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-primary dark:border-slate-700 dark:bg-[#252F40] dark:text-slate-200 dark:hover:border-rose-800 dark:hover:bg-rose-950/30 aria-pressed:border-primary-container aria-pressed:bg-rose-50 aria-pressed:text-primary dark:aria-pressed:bg-rose-950/40"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-100/80 px-4 py-3 text-sm dark:bg-slate-800/60">
        <span className="font-semibold">{profile.display_name}</span>
        <span className="text-slate-500 dark:text-slate-400">Tahun buku {profile.fiscal_year || "belum ditetapkan"} · WIB · Rupiah</span>
      </div>

      {/* Peringatan Integritas Dokumen Hukum */}
      {section === "profil-organisasi" && <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-4 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3 shadow-sm">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Fleksibilitas Identitas &amp; Wilayah Kerja</p>
          <p className="text-amber-800 dark:text-amber-300/90">
            Nama dan status koperasi tampil di navigasi serta banner; tahun buku tampil di halaman laporan. Kontak dan rekening disimpan sebagai referensi, bukan bukti saldo atau transaksi bank.
            Perubahan profil yang disimpan masuk ke Supabase.
          </p>
        </div>
      </div>}

      <section id="tampilan" hidden={section !== "tampilan"}><AppearanceSettings /></section>

      {/* Keamanan & PIN Akses Manajer */}
      <section id="keamanan" hidden={section !== "keamanan"} className="scroll-mt-20">
        <ManagerPinSettings />
      </section>

      <Card id="integrasi" hidden={section !== "integrasi"} className="scroll-mt-20">
        <CardHeader>
          <CardTitle>Integrasi &amp; sumber data</CardTitle>
          <CardDescription>Sumber aktif saat ini tetap input manual. Pilih API untuk melihat persiapan integrasinya; pilihan ini belum mengubah data atau cara penyimpanan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Lihat sumber data keuangan">
            <button type="button" aria-pressed={financeSourceView === "manual"} onClick={() => setFinanceSourceView("manual")} className={`min-h-12 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors ${financeSourceView === "manual" ? "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"}`}>Input manual · aktif</button>
            <button type="button" aria-pressed={financeSourceView === "api"} onClick={() => setFinanceSourceView("api")} className={`min-h-12 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors ${financeSourceView === "api" ? "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"}`}>API · lihat persiapan</button>
          </div>
          {financeSourceView === "manual" ? <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 font-semibold"><FilePenLine className="h-5 w-5 text-primary" />Rekap manual terhubung ke Supabase</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Bapak mengisi rekap di Pemantauan Gerai. Server menandai sumbernya sebagai manual; angka kemudian muncul di dashboard dan ringkasan keuangan.</p>
          </div> : <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-200"><Link2Off className="h-5 w-5" />Sambungan API gerai belum tersedia</div>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Bagian ini muncul saat API dipilih, tetapi sumber aktif tetap manual. Agar dapat dihubungkan dengan aman, Bapak perlu menentukan nama penyedia, dokumentasi API, contoh data, dan cara mencocokkan gerai serta tanggal. Jangan tempel API key ke chat.</p>
            <p className="mt-2 text-xs text-amber-800 dark:text-amber-300">Kolom kunci sementara tersedia di bawah. Tombol aktivasi dan pratinjau nilai API baru dapat dibuat setelah format penyedia jelas; data nantinya perlu ditinjau dan disetujui manajer sebelum masuk database.</p>
            <UnitApiKeySettings />
          </div>}
          <OpenAiKeySettings />
        </CardContent>
      </Card>

      <form id="profil-organisasi" hidden={section !== "profil-organisasi"} onSubmit={handleSave} className="scroll-mt-20 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Kolom 1: Identitas Lembaga & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary-container dark:text-rose-400" />
                Identitas Lembaga Koperasi
              </CardTitle>
              <CardDescription>Nama dagang dan nama badan hukum formal koperasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Nama Tampilan Koperasi"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setIsDirty(true);
                }}
                required
                helperText="Ditampilkan pada Sidebar, Header, dan kop laporan."
              />

              <Input
                label="Nama Resmi Badan Hukum (SK Notaris/Kemenkumham)"
                value={legalName}
                placeholder="Contoh: Koperasi Konsumen Merah Putih Ladang Laweh"
                onChange={(e) => {
                  setLegalName(e.target.value);
                  setIsDirty(true);
                }}
                helperText="Dikosongkan jika akta notaris belum disahkan."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Tahun Buku Berjalan"
                  value={fiscalYear}
                  onChange={(e) => {
                    setFiscalYear(e.target.value);
                    setIsDirty(true);
                  }}
                  required
                />

                <Select
                  label="Status Bisnis Koperasi"
                  value={businessStatus}
                  onChange={(e) => {
                    setBusinessStatus(e.target.value);
                    setIsDirty(true);
                  }}
                  options={[
                    { value: "persiapan", label: "Mode Persiapan" },
                    { value: "siap_buka", label: "Siap Buka Fisik" },
                    { value: "aktif", label: "Operasional Aktif Penuh" },
                    { value: "ditutup_sementara", label: "Ditutup Sementara" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Kolom 2: Profil Pengelola / Manajer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                Profil Pengelola / Manajer
              </CardTitle>
              <CardDescription>Identitas pengguna utama dan penanggung jawab sistem.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Nama Lengkap Manajer / Pengelola"
                value={managerName}
                onChange={(e) => {
                  setManagerName(e.target.value);
                  setIsDirty(true);
                }}
                required
                helperText="Ditampilkan pada profil aplikasi pribadi di footer sidebar."
              />

              <Input
                label="Jabatan / Peran Pengelola"
                value={managerTitle}
                onChange={(e) => {
                  setManagerTitle(e.target.value);
                  setIsDirty(true);
                }}
                required
                helperText="Contoh: Manajer Koperasi, Manajer Persiapan, dll."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor Telepon / WA"
                  value={phone}
                  placeholder="Contoh: 08123456789"
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setIsDirty(true);
                  }}
                />

                <Input
                  label="Email Resmi Pengelola"
                  type="email"
                  value={email}
                  placeholder="Contoh: manajer@koperasi.id"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsDirty(true);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom 3: Domisili Wilayah & Rekening Bank */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Wilayah Kerja &amp; Alamat Kantor
              </CardTitle>
              <CardDescription>Kedudukan domisili hukum koperasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Cakupan Wilayah / Nagari"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setIsDirty(true);
                }}
                required
                helperText="Dapat diubah jika ada perpindahan penempatan koperasi."
              />

              <Textarea
                rows={3}
                label="Alamat Kantor Persiapan / Gerai Fisik"
                value={fullAddress}
                onChange={(e) => {
                  setFullAddress(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Contoh: Simpang Tiga Ladang Laweh, Kec. Banuhampu, Kab. Agam..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Rencana Rekening Bank Operasional
              </CardTitle>
              <CardDescription>Rekening resmi bank penampung dana kas koperasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Nama Bank"
                value={bankName}
                placeholder="Contoh: Bank Nagari / BRI / BNI"
                onChange={(e) => {
                  setBankName(e.target.value);
                  setIsDirty(true);
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor Rekening Bank"
                  value={bankAccountNumber}
                  placeholder="Contoh: 1234-5678-90"
                  onChange={(e) => {
                    setBankAccountNumber(e.target.value);
                    setIsDirty(true);
                  }}
                />

                <Input
                  label="Nama Pemilik Rekening"
                  value={bankAccountHolder}
                  placeholder="Harus atas nama Koperasi"
                  onChange={(e) => {
                    setBankAccountHolder(e.target.value);
                    setIsDirty(true);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tombol Simpan & Batal Bawah */}
        {isDirty && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/60 dark:bg-rose-950/30 flex items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">
              Ada perubahan pengaturan yang belum disimpan.
            </span>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={handleReset}>
                Batalkan
              </Button>
              <Button type="submit" variant="primary" isLoading={isSaving} className="gap-2">
                <Save className="h-4 w-4" />
                Simpan ke Database Supabase
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* SEKSI PENCADANGAN & PEMULIHAN SISTEM (Tahap 5) */}
      <div id="backup" hidden={section !== "backup"} className="scroll-mt-20 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary-container" />
            Pencadangan &amp; Pemulihan Data Sistem
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Unduh seluruh arsip data lokal untuk keselamatan mandiri atau pulihkan data dari berkas cadangan JSON resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kartu 1: Unduh Cadangan JSON */}
          <Card className="border-sky-100/90 bg-gradient-to-br from-white to-sky-50/50 dark:border-slate-700 dark:from-[#252F40] dark:to-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DownloadCloud className="h-5 w-5 text-sky-600" />
                Cadangkan Seluruh Data (JSON)
              </CardTitle>
              <CardDescription>
                Menghasilkan arsip data lengkap yang mencakup 6 entitas: profil koperasi, unit gerai, tugas operasional, komoditas stok, data anggota, dan seluruh riwayat rekap harian.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 p-3.5 border border-sky-200/80 dark:border-sky-900/40 text-xs text-sky-900 dark:text-sky-200 space-y-1">
                <p className="font-semibold">💡 Tips Keamanan Manajer:</p>
                <p className="leading-relaxed">
                  Lakukan pencadangan berkala seminggu sekali atau sebelum melakukan pembaruan besar. Simpan berkas <code>.json</code> ini di flashdisk atau media penyimpanan aman pribadi.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                onClick={handleDownloadBackup}
                disabled={downloadingBackup}
                className="w-full min-h-11 font-bold gap-2"
              >
                <DownloadCloud className="h-4 w-4" />
                {downloadingBackup ? "Menyiapkan Berkas Cadangan..." : "Unduh Cadangan Lengkap Sekarang"}
              </Button>
            </CardContent>
          </Card>

          {/* Kartu 2: Pulihkan Data dari Cadangan JSON */}
          <Card className="border-rose-100/90 bg-gradient-to-br from-white to-rose-50/50 dark:border-slate-700 dark:from-[#252F40] dark:to-[#38232F]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-rose-600" />
                Pulihkan Data dari Berkas Cadangan
              </CardTitle>
              <CardDescription>
                Pilih berkas cadangan JSON yang telah diunduh sebelumnya untuk mengembalikan atau memperbarui data database Supabase.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="restore-file-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pilih Berkas Cadangan (.json)
                </label>
                <input
                  id="restore-file-input"
                  type="file"
                  accept=".json,application/json"
                  onChange={handleSelectRestoreFile}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-primary-container hover:file:bg-rose-100 dark:file:bg-slate-800 dark:file:text-rose-300 cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-white dark:bg-slate-900"
                />
              </div>

              {restoreError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{restoreError}</span>
                </div>
              )}

              {restoreSummary && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Berkas Cadangan Terverifikasi Sah
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 dark:text-slate-300 pt-1">
                    <span>• Unit Usaha: <strong>{restoreSummary.unitsCount}</strong> baris</span>
                    <span>• Tugas: <strong>{restoreSummary.tasksCount}</strong> baris</span>
                    <span>• Produk Stok: <strong>{restoreSummary.productsCount}</strong> baris</span>
                    <span>• Rekap Gerai: <strong>{restoreSummary.reportsCount}</strong> baris</span>
                    <span>• Anggota: <strong>{restoreSummary.membersCount}</strong> baris</span>
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => setRestoreConfirmOpen(true)}
                disabled={!restorePayload || isRestoring}
                className="w-full min-h-11 font-bold gap-2 text-rose-700 hover:text-rose-800 border-rose-200 hover:bg-rose-50"
              >
                <UploadCloud className="h-4 w-4" />
                {isRestoring ? "Memulihkan Data..." : "Tinjau &amp; Pulihkan ke Database"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Kotak Edukasi Perbedaan Ekspor CSV vs Cadangan JSON */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
          <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            Perbedaan Ekspor CSV Laporan vs Cadangan JSON Sistem:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">📊 Ekspor CSV Laporan (Excel/Sheets)</strong>
              Format tabel dua dimensi yang dirancang agar manajer dapat mengolah, membuat grafik, dan mencetak laporan transaksi di spreadsheet. Tersedia di menu Pemantauan Gerai, Tugas, dan Stok.
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">💾 Cadangan JSON Sistem (Backup &amp; Restore)</strong>
              Format data terstruktur utuh yang dirancang untuk keselamatan data database. Berisi seluruh relasi entitas untuk memulihkan sistem jika berganti perangkat atau menghadapi insiden data.
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Konfirmasi Pemulihan Data */}
      <ConfirmDialog
        isOpen={restoreConfirmOpen}
        onClose={() => setRestoreConfirmOpen(false)}
        onConfirm={handleConfirmRestore}
        title="Konfirmasi Pemulihan Cadangan Data"
        message="Data dengan ID yang sama akan ditimpa; data lain tetap ada. Pemulihan berjalan per tabel dan belum dapat dibatalkan otomatis jika gagal di tengah. Buat cadangan terbaru terlebih dahulu. Gunakan hanya berkas milik sendiri yang dipercaya."
        confirmText="Ya, Pulihkan Sekarang"
        cancelText="Batal"
        isLoading={isRestoring}
      />
    </div>
  );
}
