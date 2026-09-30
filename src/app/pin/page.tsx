'use client';
import { useState } from 'react';
import { api, resetAuthNavigation } from '@/lib/client';
import { Button } from '@/components/ui/Button';
export default function PinPage() {
  const [setup, setSetup] = useState(false),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  return (
    <main className="auth">
      <div className="card">
        <span className="eyebrow">KOPDES MANAGEMENT WEB</span>
        <h1>Ruang kerja manajer</h1>
        <p>Masuk untuk melanjutkan rencana, koordinasi, dan pekerjaan hari ini.</p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            setError('');
            const form = new FormData(event.currentTarget);
            try {
              await api('auth/pin', {
                action: setup ? 'setup' : 'login',
                pin: form.get('pin'),
                ...(setup ? { setupToken: form.get('token') } : {}),
              });
              if (setup) {
                setSetup(false);
                setError('PIN awal tersimpan. Silakan masuk.');
              } else resetAuthNavigation('/beranda');
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <label>
            PIN {setup ? 'baru' : ''}
            <input
              name="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{6,12}"
              minLength={6}
              maxLength={12}
              autoComplete={setup ? 'new-password' : 'current-password'}
              required
            />
          </label>
          {setup && (
            <label>
              Token pengaturan awal
              <input name="token" type="password" minLength={32} required autoComplete="off" />
              <small>Dari HUB_SETUP_TOKEN pada server.</small>
            </label>
          )}
          <Button primary busy={busy}>
            {busy ? 'Memproses…' : setup ? 'Simpan PIN awal' : 'Buka ruang kerja'}
          </Button>
          {error && <p role="alert">{error}</p>}
        </form>
        <button
          onClick={() => {
            setSetup(!setup);
            setError('');
          }}
        >
          {setup ? 'Kembali ke masuk' : 'Pengaturan PIN pertama kali'}
        </button>
        <small>PIN minimal 6 digit. Sesi berlaku 12 jam.</small>
      </div>
    </main>
  );
}
