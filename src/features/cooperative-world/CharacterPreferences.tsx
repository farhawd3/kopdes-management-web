'use client';
import { Select } from '@/components/ui/Select';
import { usePreference } from '@/lib/usePreference';
import { drawChar } from './character';
export function CharacterPreferences({ preferenceScope = '' }: { preferenceScope?: string }) {
  const [shirt, setShirt] = usePreference(preferenceScope + 'hub-character-shirt', '#2F5BEA');
  const [skin, setSkin] = usePreference(preferenceScope + 'hub-character-skin', '#FBE3D0');
  const [hair, setHair] = usePreference(preferenceScope + 'hub-character-hair', 'pendek');
  const [accessory, setAccessory] = usePreference(preferenceScope + 'hub-character-accessory', '');
  const safeColor = (value: string, fallback: string) =>
    /^#[a-f0-9]{6}$/i.test(value) ? value : fallback;
  return (
    <section className="card character-preferences">
      <h2>Tampilan karakter</h2>
      <p>Karakter manajer di Dunia Koperasi. Pilihan disimpan pada perangkat ini.</p>
      <svg
        viewBox="-40 -90 80 100"
        width="100"
        height="125"
        role="img"
        aria-label="Pratinjau karakter manajer"
      >
        <g
          dangerouslySetInnerHTML={{
            __html: drawChar({
              shirt: safeColor(shirt, '#2F5BEA'),
              skin: safeColor(skin, '#FBE3D0'),
              pose: 'wave',
              acc: `blazer lanyard ${hair === 'kerudung' ? 'hijab' : ''} ${['glasses', 'cap', 'helmet'].includes(accessory) ? accessory : ''}`,
            }),
          }}
        />
      </svg>
      <div className="form-grid">
        <label>
          Seragam
          <Select
            ariaLabel="Seragam karakter"
            value={shirt}
            onChange={setShirt}
            options={[
              '#2F5BEA',
              '#BFE8D2',
              '#FBD9C3',
              '#FCEBB5',
              '#F8CFE0',
              '#B9C4F2',
              '#5B84F5',
              '#E9C9A0',
            ].map((value, i) => ({
              value,
              label: [
                'Biru koperasi',
                'Mint',
                'Peach',
                'Butter',
                'Pink',
                'Lavender',
                'Biru lembut',
                'Kayu',
              ][i],
            }))}
          />
        </label>
        <label>
          Warna kulit
          <Select
            ariaLabel="Warna kulit manajer"
            value={skin}
            onChange={setSkin}
            options={['#FBE3D0', '#F3CEAF', '#E8B896', '#D49A78', '#B97856', '#87563E'].map(
              (value, i) => ({ value, label: `Pilihan ${i + 1}` }),
            )}
          />
        </label>
        <label>
          Rambut / kerudung
          <Select
            ariaLabel="Rambut atau kerudung"
            value={hair}
            onChange={setHair}
            options={[
              { value: 'pendek', label: 'Rambut pendek' },
              { value: 'kerudung', label: 'Kerudung' },
            ]}
          />
        </label>
        <label>
          Aksesori
          <Select
            ariaLabel="Aksesori manajer"
            value={accessory}
            onChange={setAccessory}
            options={[
              { value: '', label: 'Tanpa aksesori' },
              { value: 'glasses', label: 'Kacamata' },
              { value: 'cap', label: 'Topi' },
              { value: 'helmet', label: 'Helm' },
            ]}
          />
        </label>
      </div>
    </section>
  );
}
