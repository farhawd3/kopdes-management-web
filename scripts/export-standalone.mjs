import fs from 'node:fs';
import path from 'node:path';

const SRC_WORLD_DIR = path.resolve('src/features/cooperative-world');
const TARGET_DIR = path.resolve('..', 'dunia-koperasi-standalone');

console.log(`[Export] Memulai pembuatan paket mandiri Dunia Koperasi di: ${TARGET_DIR}`);

// 1. Pastikan folder tujuan ada
fs.mkdirSync(path.join(TARGET_DIR, 'src', 'components'), { recursive: true });
fs.mkdirSync(path.join(TARGET_DIR, 'src', 'lib'), { recursive: true });
fs.mkdirSync(path.join(TARGET_DIR, 'src', 'workspace'), { recursive: true });
fs.mkdirSync(path.join(TARGET_DIR, 'docs', 'referensi'), { recursive: true });

// 2. Tulis package.json
const packageJson = {
  name: 'dunia-koperasi-standalone',
  private: true,
  version: '1.0.0',
  type: 'module',
  scripts: {
    dev: 'vite --port 5173 --open',
    build: 'tsc && vite build',
    preview: 'vite preview'
  },
  dependencies: {
    'lucide-react': '^1.47.0',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    three: '^0.186.1',
    zod: '^3.24.2'
  },
  devDependencies: {
    '@types/react': '^19.0.10',
    '@types/react-dom': '^19.0.4',
    '@types/three': '^0.186.0',
    '@vitejs/plugin-react': '^4.3.4',
    typescript: '^5.8.2',
    vite: '^6.2.0'
  }
};
fs.writeFileSync(path.join(TARGET_DIR, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');

// 3. Tulis vite.config.ts
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
`;
fs.writeFileSync(path.join(TARGET_DIR, 'vite.config.ts'), viteConfig, 'utf8');

// 4. Tulis tsconfig.json (relaxed untuk standalone build yang lancar)
const tsConfig = {
  compilerOptions: {
    target: 'ES2020',
    useDefineForClassFields: true,
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react-jsx',
    strict: false,
    noImplicitAny: false,
    strictNullChecks: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true,
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*']
    }
  },
  include: ['src']
};
fs.writeFileSync(path.join(TARGET_DIR, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2), 'utf8');

// 5. Tulis index.html
const indexHtml = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233866f6' stroke-width='2'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dunia Koperasi KDMP Puntukrejo — Standalone 3D</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body, html { width: 100%; height: 100%; overflow: hidden; background: #e7edf9; font-family: Inter, system-ui, -apple-system, sans-serif; }
      #root { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), indexHtml, 'utf8');

// 6. Buat komponen UI ringan mandiri di src/components (Button, Select, Input)
const buttonTsx = `import React from 'react';

export function Button({
  children,
  onClick,
  className = '',
  style = {},
  type = 'button',
  disabled = false,
  title,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  suppressHydrationWarning,
  ...rest
}: any) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        background: 'transparent',
        font: 'inherit',
        ...style,
      }}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      {...rest}
    >
      {children}
    </button>
  );
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'components', 'Button.tsx'), buttonTsx, 'utf8');

const inputTsx = `import React from 'react';

export function Input({
  value,
  onChange,
  placeholder,
  className = '',
  style = {},
  type = 'text',
  disabled = false,
  required = false,
  ...rest
}: any) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={className}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '12px',
        outline: 'none',
        background: '#ffffff',
        color: '#1e293b',
        ...style,
      }}
      {...rest}
    />
  );
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'components', 'Input.tsx'), inputTsx, 'utf8');

const selectTsx = `import React from 'react';

export function Select({
  value,
  onChange,
  options,
  className = '',
  style = {},
  ariaLabel,
  'aria-label': ariaLabelProp,
  ...rest
}: any) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      aria-label={ariaLabel || ariaLabelProp}
      style={{
        padding: '7px 10px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '12px',
        background: '#ffffff',
        color: '#1e293b',
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {options.map((opt: any, idx: number) => {
        const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
        const lbl = typeof opt === 'object' && opt !== null ? opt.label : opt;
        return (
          <option key={val ?? idx} value={val}>
            {lbl}
          </option>
        );
      })}
    </select>
  );
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'components', 'Select.tsx'), selectTsx, 'utf8');

// 6b. Buat shims mandiri untuk lib & workspace
const dateTs = `export function today(now?: Date | string): string {
  const d = now ? new Date(now) : new Date();
  return d.toISOString().slice(0, 10);
}

export function formatDate(date: string | Date | undefined): string {
  if (!date) return '-';
  try {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return String(date);
  }
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'lib', 'date.ts'), dateTs, 'utf8');

const workspaceUseWorkspaceTs = `export type Workspace = any;
export type HubRecord = any;
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'workspace', 'useWorkspace.ts'), workspaceUseWorkspaceTs, 'utf8');

const workspaceNavTs = `export interface NavItem {
  href: string;
  label: string;
  icon?: any;
  badge?: string | number;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Ringkasan' },
  { href: '/kegiatan', label: 'Kegiatan' },
  { href: '/keuangan', label: 'Keuangan' },
  { href: '/anggota', label: 'Anggota' },
  { href: '/barang', label: 'Barang' },
  { href: '/laporan', label: 'Laporan' },
];

export function recordHref(domain: string, id: string): string {
  return \`/\${domain}/\${id}\`;
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'workspace', 'workspace-navigation.ts'), workspaceNavTs, 'utf8');

// 7. Salin berkas-berkas Three.js & Logic langsung
const directFiles = [
  'world-objects.ts',
  'world-traffic.ts',
  'world-lighting.ts',
  'world-dialogue.ts',
  'world-model.ts',
  'world.css',
];
for (const file of directFiles) {
  let content = fs.readFileSync(path.join(SRC_WORLD_DIR, file), 'utf8');
  if (file === 'world-model.ts') {
    content = content.replace("from '@/lib/date'", "from './lib/date'");
    content = content.replace("from '../workspace/useWorkspace'", "from './workspace/useWorkspace'");
  }
  fs.writeFileSync(path.join(TARGET_DIR, 'src', file), content, 'utf8');
  console.log(`[Export] Disalin: ${file}`);
}

// 8. Salin WorldScene.tsx (sesuaikan import komponen UI)
let worldSceneContent = fs.readFileSync(path.join(SRC_WORLD_DIR, 'WorldScene.tsx'), 'utf8');
worldSceneContent = worldSceneContent.replace(
  "import { Button } from '@/components/ui/Button';",
  "import { Button } from './components/Button';"
);
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'WorldScene.tsx'), worldSceneContent, 'utf8');
console.log(`[Export] Disalin & disesuaikan: WorldScene.tsx`);

// 9. Adaptasi CooperativeWorld.tsx menjadi mandiri (tanpa Next.js link/dynamic/API)
let coopContent = fs.readFileSync(path.join(SRC_WORLD_DIR, 'CooperativeWorld.tsx'), 'utf8');
coopContent = coopContent.replace("'use client';", "import React from 'react';");
coopContent = coopContent.replace("import dynamic from 'next/dynamic';", '');
coopContent = coopContent.replace("import Link from 'next/link';", '');
coopContent = coopContent.replace("import { Button } from '@/components/ui/Button';", "import { Button } from './components/Button';");
coopContent = coopContent.replace("import { Select } from '@/components/ui/Select';", "import { Select } from './components/Select';");
coopContent = coopContent.replace("import { Input } from '@/components/ui/Input';", "import { Input } from './components/Input';");
coopContent = coopContent.replace("import { usePreference } from '@/lib/usePreference';", '');
coopContent = coopContent.replace("import { api, invalidateCache } from '@/lib/client';", '');
coopContent = coopContent.replace("import type { Workspace } from '../workspace/useWorkspace';", "import type { Workspace } from './workspace/useWorkspace';");
coopContent = coopContent.replace("import { recordHref } from '../workspace/workspace-navigation';", "import { recordHref } from './workspace/workspace-navigation';");

// Ganti deklarasi dynamic WorldScene
coopContent = coopContent.replace(
  /const WorldScene = dynamic\([\s\S]*?\);\r?\n?/,
  "import { WorldScene } from './WorldScene';\n"
);

// Tambahkan Link mock & hooks/client mock
const mockLinkAndShims = `
function Link({ href, children, className = '', style = {}, title, target, rel }: any) {
  return (
    <a
      href={href}
      className={className}
      style={{ textDecoration: 'none', color: 'inherit', ...style }}
      title={title}
      target={target}
      rel={rel}
      onClick={(e) => {
        if (href.startsWith('/')) {
          e.preventDefault();
          alert(\`Navigasi Standalone: Menuju halaman "\${href}". Di versi standalone, seluruh modul dapat dijalankan tanpa backend.\`);
        }
      }}
    >
      {children}
    </a>
  );
}

function usePreference<T>(key: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [val, setVal] = React.useState<T>(() => {
    try {
      const saved = localStorage.getItem('kopdes_pref_' + key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });
  const update = (newVal: T | ((prev: T) => T)) => {
    setVal((prev: T) => {
      const resolved = typeof newVal === 'function' ? (newVal as any)(prev) : newVal;
      try { localStorage.setItem('kopdes_pref_' + key, JSON.stringify(resolved)); } catch {}
      return resolved;
    });
  };
  return [val, update];
}

const api: any = async (...args: any[]) => ({ success: true });
api.post = async (...args: any[]) => ({ success: true });
api.get = async (...args: any[]) => ({});
const invalidateCache = (...args: any[]) => {};
`;
coopContent = mockLinkAndShims + '\n' + coopContent;

// Simpan CooperativeWorld.tsx
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'CooperativeWorld.tsx'), coopContent, 'utf8');
console.log(`[Export] Disalin & disesuaikan: CooperativeWorld.tsx`);


// 10. Buat Mock Data & App.tsx
const appTsx = `import React, { useState } from 'react';
import { CooperativeWorld } from './CooperativeWorld';

// Mock Data Operasional Standalone KDMP Puntukrejo
const mockStandaloneData = {
  items: [
    { id: 'item-1', data: { title: 'Beras Pandan Wangi 5kg', sku: 'BRS-01', stock: 120, unit: 'sak' } },
    { id: 'item-2', data: { title: 'Minyak Goreng Kelapa 2L', sku: 'MYK-02', stock: 85, unit: 'pouch' } },
    { id: 'item-3', data: { title: 'Gula Pasir Kristal 1kg', sku: 'GLA-03', stock: 210, unit: 'kg' } },
    { id: 'item-4', data: { title: 'Kopi Robusta Desa 250g', sku: 'KPI-04', stock: 64, unit: 'bungkus' } },
  ],
  units: [
    { id: 'unit-1', data: { title: 'Toko Sembako Warga', kind: 'Sembako', status: 'Buka', location: 'Lahan 01' } },
    { id: 'unit-2', data: { title: 'Warung Kopi & Kuliner', kind: 'Kuliner', status: 'Buka', location: 'Lahan 02' } },
  ],
  tasks: [
    { id: 'task-1', data: { title: 'Cek suhu showcase & penyimpanan cold', status: 'proses', priority: 'tinggi' } },
    { id: 'task-2', data: { title: 'Rekonsiliasi penerimaan kiriman truk Bay 2', status: 'rencana', priority: 'sedang' } },
  ],
  meetings: [
    { id: 'meet-1', data: { title: 'Rapat Koordinasi Penataan Kawasan', date: '2026-10-05', time: '14:00 WIB', location: 'Ruang Rapat Utama' } },
  ],
  activities: [
    { id: 'act-1', data: { title: 'Inspeksi operasional dermaga logistik', time: '10:00 WIB' } },
  ],
  stakeholders: [
    { id: 'stk-1', data: { title: 'PT Sumber Pangan Nusantara', category: 'Suplier Sembako' } },
    { id: 'stk-2', data: { title: 'Bluepeak Express Logistik', category: 'Ekspedisi Pengiriman' } },
    { id: 'stk-3', data: { title: 'Distributor Hasil Tani Makmur', category: 'Mitra Tani' } },
  ],
  members: [
    { id: 'mem-1', data: { name: 'Bambang Sutrisno', role: 'Anggota Aktif', joinDate: '2024-03-12' } },
    { id: 'mem-2', data: { name: 'Siti Rahmawati', role: 'Anggota Aktif', joinDate: '2024-05-18' } },
  ],
};

export default function App() {
  const [data, setData] = useState(mockStandaloneData);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <CooperativeWorld
        data={data as any}
        loading={false}
        error={undefined}
        refresh={async () => {
          console.log('Refresh data triggered');
        }}
      />
    </div>
  );
}
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'App.tsx'), appTsx, 'utf8');

// 11. Buat src/main.tsx
const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
fs.writeFileSync(path.join(TARGET_DIR, 'src', 'main.tsx'), mainTsx, 'utf8');

// 12. Salin dokumentasi & referensi
try {
  const docContent = fs.readFileSync(path.resolve('docs/DUNIA-KOPERASI.md'), 'utf8');
  fs.writeFileSync(path.join(TARGET_DIR, 'docs', 'DUNIA-KOPERASI.md'), docContent, 'utf8');

  // Salin referensi gambar
  const refDir = path.resolve('docs/referensi-dunia');
  if (fs.existsSync(refDir)) {
    for (const f of fs.readdirSync(refDir)) {
      fs.copyFileSync(path.join(refDir, f), path.join(TARGET_DIR, 'docs', 'referensi', f));
    }
  }
} catch (err) {
  console.log('[Export] Catatan referensi:', err.message);
}

// 13. Tulis README.md di root proyek standalone
const readmeMd = `# Dunia Koperasi KDMP Puntukrejo — Paket Mandiri (Standalone)

Paket mandiri (standalone) 3D interaktif Dunia Koperasi yang dapat dijalankan secara terpisah tanpa dependensi Next.js, Supabase, ataupun backend web.

---

## 🚀 Fitur Utama
1. **Diorama 3D Isometrik Interaktif**:
   - Tampilan Kawasan (Eksterior): Gedung Kantor, 7 Lahan Gerai, Taman Air Mancur, Halte Bus, Pos Satpam, Kios ATM, dan Gazebo.
   - Gudang Logistik Modern (WareTrack Style): AC Chiller HVAC di atap, loading dock elevated bergaris kuning, 3 rolling doors berlampu status, stasiun pengisian forklift (*charging station*) di paving mint, forklift berpalet kardus berlakban, dan truk kontainer modern aero (Nordline style).
   - Interior Kantor 6 Zona: Ruang Manajer eksekutif, Ruang Rapat, Meja Tugas (Anisa), 3 Lemari Arsip Berlabel (Anggota, Kas, Barang), Gym LED, dan Lobi Resepsionis.
2. **Karakter & Rute Realistis**:
   - Papan plang ruangan 3D solid berbobot (RoundedBox 0.09 unit) dengan baut kuningan.
   - Rute patroli manajer menyusuri lorong bebas ruangan dan keluar lewat pintu partisi kuningan tanpa menembus meja atau dinding.
   - Karakter Anisa berambut panjang natural.
   - Simulasi lalu lintas armada di jalan raya (motor, mobil, van, truk) yang patuh lampu merah.
3. **Panel Kontrol Interaktif**:
   - Panel Gudang 4 Tab: Dermaga, Inventaris (Cardboard box, plastic container, safety helmet, packing tape), Lacak Kiriman horizontal stepper, dan Mitra Ekspedisi.
   - Panel Arsip 3 Zona: Buku Induk Anggota (Biru), Buku Kas Operasional (Hijau), Buku Barang & Stok Opname (Kuning).
   - Pengatur Suasana Terpadu (Waktu WIB 24 jam & Cuaca: cerah, berawan, hujan).

---

## 💻 Cara Menjalankan

### 1. Masuk ke folder proyek
\`\`\`bash
cd D:\\Koding\\dunia-koperasi-standalone
\`\`\`

### 2. Install dependensi
\`\`\`bash
npm install
\`\`\`

### 3. Jalankan server lokal
\`\`\`bash
npm run dev
\`\`\`
Browser akan otomatis membuka \`http://localhost:5173\`.

### 4. Build ke HTML/JS Statis (Opsional)
Untuk menghasilkan bundle siap deploy ke web server statis manapun:
\`\`\`bash
npm run build
\`\`\`
Hasil file HTML/JS siap saji akan berada di folder \`dist/\`.

---

## 📁 Struktur Berkas

\`\`\`
dunia-koperasi-standalone/
├── docs/                      # Dokumentasi & spesifikasi desain 3D
│   ├── DUNIA-KOPERASI.md
│   └── referensi/             # Gambar & contact sheet acuan
├── src/
│   ├── components/            # Komponen UI ringan (Button, Select, Input)
│   ├── lib/                   # Utilitas tanggal & preferensi lokal
│   ├── workspace/             # Navigasi & tipe workspace mock
│   ├── App.tsx                # Container aplikasi dengan mock data terpadu
│   ├── CooperativeWorld.tsx   # Antarmuka HUD, dock, & panel kartu
│   ├── WorldScene.tsx         # Canvas Three.js & loop animasi 3D
│   ├── world-objects.ts       # Pusat geometri 3D prosedural
│   ├── world-lighting.ts      # Simulasi pencahayaan siklus 24 jam
│   ├── world-traffic.ts       # Logika simulasi armada lalu lintas
│   ├── world-dialogue.ts      # Sistem percakapan dinamis karakter
│   ├── world-model.ts         # Model stasiun & koordinat
│   ├── world.css              # Styling antarmuka
│   └── main.tsx               # Entry point React
├── index.html                 # Halaman HTML utama
├── package.json               # Konfigurasi dependensi npm
├── tsconfig.json              # Konfigurasi TypeScript
├── vite.config.ts             # Konfigurasi bundler Vite
└── README.md                  # Panduan penggunaan
\`\`\`
`;
fs.writeFileSync(path.join(TARGET_DIR, 'README.md'), readmeMd, 'utf8');

console.log('[Export] SELESAI! Paket mandiri berhasil dibuat di D:\\\\Koding\\\\dunia-koperasi-standalone');

