'use client';
import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { drawChar } from './character';
import { usePreference } from '@/lib/usePreference';
import type { worldModel } from './world-model';

type Model = ReturnType<typeof worldModel>;
export type WorldSelection = {
  kind: 'unit' | 'warehouse' | 'vehicle' | 'desk' | 'manager';
  index: number;
};
function Hotspot({
  label,
  x,
  y,
  children,
  onClick,
}: {
  label: string;
  x: number;
  y: number;
  children: ReactNode;
  onClick: () => void;
}) {
  function key(event: KeyboardEvent<SVGGElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  }
  return (
    <g
      transform={`translate(${x} ${y})`}
      className="world-hotspot"
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onClick}
      onKeyDown={key}
    >
      <title>{label}</title>
      {children}
    </g>
  );
}

function Building({
  roof = '#2F5BEA',
  name,
  warehouse = false,
  lamps,
}: {
  roof?: string;
  name: string;
  warehouse?: boolean;
  lamps: number;
}) {
  const width = warehouse ? 170 : 118;
  return (
    <g className="world-building">
      <path
        className="world-shadow"
        d={`M-90,26 L${width - 50},${width * 0.5 + 45} L${width + 25},${width * 0.5} L-12,-18Z`}
        fill="#8CA0D1"
      />
      <path
        d={`M-70,-8 L${width - 70},${width / 2 - 8} L${width - 70},-66 L-70,${-66 - width / 2}Z`}
        fill={warehouse ? '#315DDD' : '#F8FAFF'}
      />
      <path
        d={`M${width - 70},${width / 2 - 8} L${width + 5},${width / 2 - 50} L${width + 5},-108 L${width - 70},-66Z`}
        fill={warehouse ? '#2448BE' : '#D8DFEE'}
      />
      <path
        d={`M-76,${-66 - width / 2} L-1,${-108 - width / 2} L${width + 11},-108 L${width - 70},-62Z`}
        fill={roof}
      />
      <path
        d={`M-76,${-66 - width / 2} L${width - 70},-62 L${width - 70},-54 L-76,${-58 - width / 2}Z`}
        fill="#5B84F5"
      />
      {Array.from({ length: warehouse ? 3 : 2 }, (_, index) => (
        <g key={index} transform={`translate(${-54 + index * 46} ${-65 + index * 23})`}>
          <path d="M0,0 L29,15 L29,52 L0,37Z" fill="#DAE5FB" stroke="#F8FAFF" strokeWidth="3" />
          <path d="M2,3 L27,16 L27,48 L2,35Z" fill="#FFE7A3" opacity={lamps} />
        </g>
      ))}
      {!warehouse && <path d="M53,-48 L76,-60 L76,-20 L53,-8Z" fill="#5B84F5" />}
      <g transform={`translate(0 ${-125 - width / 2})`}>
        <rect x="-76" y="-20" width="152" height="30" rx="9" fill="#1E2A4A" />
        <text y="0" textAnchor="middle" fill="white" fontSize="14">
          {name.length > 20 ? name.slice(0, 19) + '…' : name}
        </text>
      </g>
    </g>
  );
}
function Character({
  shirt,
  skin,
  working = false,
  umbrella = false,
}: {
  shirt: string;
  skin: string;
  working?: boolean;
  umbrella?: boolean;
}) {
  const [tick, setTick] = useState(0);
  const [hair] = usePreference('hub-character-hair', 'pendek');
  const [accessory] = usePreference('hub-character-accessory', '');
  const [quality] = usePreference('hub-world-quality', 'Sedang');
  const [motionChoice] = usePreference('hub-motion', 'system');
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setInterval(() => {
      if (!document.hidden && !motion.matches && quality !== 'Rendah' && motionChoice !== 'minimal')
        setTick((value) => value + 1);
    }, 140);
    return () => clearInterval(timer);
  }, [quality, motionChoice]);
  const phase = tick % 80;
  const pose = working
    ? phase < 4
      ? 'sit'
      : 'work'
    : phase < 50
      ? 'walk'
      : phase < 70
        ? 'think'
        : 'wave';
  const safeShirt = /^#[a-f0-9]{6}$/i.test(shirt) ? shirt : '#2F5BEA';
  const safeSkin = /^#[a-f0-9]{6}$/i.test(skin) ? skin : '#FBE3D0';
  // Only the bundled renderer and validated hex colors enter this SVG markup.
  return (
    <g
      className={working ? 'world-worker' : 'world-character'}
      transform="scale(1.35)"
      dangerouslySetInnerHTML={{
        __html: drawChar({
          pose,
          frame: tick % 4,
          t: tick / 7,
          shirt: safeShirt,
          skin: safeSkin,
          face: working ? 'back' : 'front',
          acc:
            (working ? 'glasses' : 'blazer lanyard') +
            (umbrella ? ' umbrella' : '') +
            (!working && hair === 'kerudung' ? ' hijab' : '') +
            (!working && ['glasses', 'cap', 'helmet'].includes(accessory) ? ' ' + accessory : ''),
        }),
      }}
    />
  );
}
const positions = [
  [270, 310],
  [170, 435],
  [690, 300],
  [900, 400],
  [1040, 495],
  [380, 690],
  [870, 710],
];
export function WorldScene({
  model,
  inside,
  enter,
  select,
  lamps,
  shirt,
  skin,
  rainy,
}: {
  model: Model;
  inside: boolean;
  enter: () => void;
  select: (selection: WorldSelection) => void;
  lamps: number;
  shirt: string;
  skin: string;
  rainy: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1280 850"
      className="world-svg"
      aria-label={
        inside
          ? 'Kantor koperasi, pilih meja untuk membuka modul'
          : 'Dunia koperasi, pilih gedung, gerai atau kendaraan'
      }
    >
      <defs>
        <pattern id="world-grid" width="90" height="52" patternUnits="userSpaceOnUse">
          <path d="M0,26 L45,0 L90,26 L45,52Z" fill="none" stroke="#DAE2F4" strokeWidth="1" />
        </pattern>
      </defs>
      {!inside ? (
        <>
          <path d="M40,440 L580,110 L1240,460 L710,815Z" fill="#E7ECFA" />
          <path d="M40,440 L580,110 L1240,460 L710,815Z" fill="url(#world-grid)" />
          <path
            d="M100,550 L870,110 L950,157 L180,596Z M360,173 L1200,651 L1118,699 L277,220Z"
            fill="#CBD5EE"
          />
          <path
            d="M140,574 L910,134 M318,197 L1159,675"
            stroke="#F5F7FF"
            strokeWidth="3"
            strokeDasharray="20 18"
          />
          <Hotspot x={505} y={325} label="Gedung koperasi — masuk kantor" onClick={enter}>
            <Building name="Kantor koperasi" lamps={lamps} />
          </Hotspot>
          {model.slots.map(({ row, index, readiness }) => (
            <Hotspot
              key={row?.id || index}
              x={positions[index][0]}
              y={positions[index][1]}
              label={
                row
                  ? `${row.data.title} — ${row.data.status}, ${readiness === null ? 'belum dinilai' : readiness + '% siap'}`
                  : `Slot Gerai ${index + 1} — tambahkan gerai`
              }
              onClick={() => select({ kind: 'unit', index })}
            >
              {row ? (
                <Building
                  roof={
                    ['#5B84F5', '#BFE8D2', '#FBD9C3', '#FCEBB5', '#F8CFE0', '#B9C4F2', '#BFE8D2'][
                      index
                    ]
                  }
                  name={String(row.data.title)}
                  lamps={lamps}
                />
              ) : (
                <g>
                  <path
                    d="M-65,0 L0,-38 L65,0 L0,38Z"
                    fill="#DFE5F5"
                    stroke="#BBC7E7"
                    strokeDasharray="6 5"
                    strokeWidth="2"
                  />
                  <rect x="-13" y="-26" width="26" height="22" rx="5" fill="#9DADD8" />
                  <path
                    d="M-8,-26 v-9 a8,8 0 0 1 16,0 v9"
                    fill="none"
                    stroke="#9DADD8"
                    strokeWidth="5"
                  />
                  <text y="62" textAnchor="middle" fontSize="14" fill="#536389">
                    Slot {index + 1} · Tambah
                  </text>
                </g>
              )}
            </Hotspot>
          ))}
          <Hotspot
            x={540}
            y={595}
            label="Gudang — periksa barang dan stok"
            onClick={() => select({ kind: 'warehouse', index: 0 })}
          >
            <Building name="Gudang" warehouse lamps={lamps} />
            {model.critical.slice(0, 6).map((row, index) => (
              <rect
                key={row.id}
                x={120 + index * 12}
                y={-20 + index * 5}
                width="18"
                height="24"
                fill="#FCEBB5"
                stroke="#D9BC7C"
              />
            ))}
          </Hotspot>
          {[
            [330, 310],
            [770, 365],
            [990, 590],
            [665, 710],
            [170, 550],
            [1040, 335],
          ].map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              <path d="M0,-35 v38" stroke="#C9AB8B" strokeWidth="9" />
              <ellipse cy="-48" rx="19" ry="29" fill="#A4DABF" />
              <ellipse cx="-6" cy="-54" rx="12" ry="20" fill="#BFE8D2" />
            </g>
          ))}
          {model.vehicles.slice(0, 12).map(({ row, supplier }, index) => (
            <Hotspot
              key={row.id}
              x={270 + (index % 6) * 120}
              y={490 + Math.floor(index / 6) * 100}
              label={`${supplier ? 'Suplier' : 'Mitra'} ${row.data.title}`}
              onClick={() => select({ kind: 'vehicle', index })}
            >
              <g className="world-vehicle" style={{ animationDelay: `${-index * 3}s` }}>
                <path
                  d={`M-35,-20 L-10,-35 L${index % 3 === 0 ? 45 : 30},-10 L15,6Z`}
                  fill={['#BFE8D2', '#FBD9C3', '#FCEBB5', '#F8CFE0', '#B9C4F2'][index % 5]}
                />
                <path d="M-35,-20 L15,6 L15,27 L-35,1Z" fill="#F8FAFF" />
                <path d="M15,6 L40,-8 L40,12 L15,27Z" fill="#5B84F5" />
                <path d="M23,4 L36,-3 L36,6 L23,13Z" fill="#B9D9F4" />
                <ellipse cx="-22" cy="4" rx="7" ry="10" fill="#35456B" />
                <ellipse cx="23" cy="23" rx="7" ry="10" fill="#35456B" />
              </g>
            </Hotspot>
          ))}
          <Hotspot
            x={740}
            y={510}
            label="Karakter manajer — tampilan karakter"
            onClick={() => select({ kind: 'manager', index: 0 })}
          >
            <Character shirt={shirt} skin={skin} umbrella={rainy} />
          </Hotspot>
        </>
      ) : (
        <>
          <path
            d="M145,460 L620,180 L1140,465 L665,745Z"
            fill="#F8FAFF"
            stroke="#D3DDF1"
            strokeWidth="8"
          />
          <path d="M145,460 V250 L620,-30 V180Z" fill="#E9EFFB" />
          <path d="M620,-30 L1140,255 V465 L620,180Z" fill="#DDE6F6" />
          {[0, 1, 2].map((index) => (
            <path
              key={index}
              d={`M${235 + index * 115},${280 - index * 66} v-94 l82,-48 v94Z`}
              fill={lamps > 0.6 ? '#344A89' : '#B8D5FA'}
              stroke="white"
              strokeWidth="9"
            />
          ))}
          <path
            d="M830,215 L1010,314 V404 L830,305Z"
            fill="#FCEBB5"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          <text x="685" y="103" fill="#2F5BEA" fontSize="21" transform="rotate(29 685 103)">
            KANTOR KOPERASI
          </text>
          {model.desks.map((desk, index) => (
            <Hotspot
              key={desk.entity}
              x={330 + (index % 3) * 255}
              y={425 + Math.floor(index / 3) * 170}
              label={`${desk.title} — ${desk.rows.length} catatan dimuat`}
              onClick={() => select({ kind: 'desk', index })}
            >
              <path d="M-60,20 v55 M35,70 v55 M115,23 v55" stroke="#C3CEE7" strokeWidth="9" />
              <path
                d="M-70,10 L15,-40 L125,22 L40,72Z"
                fill="white"
                stroke="#BBCBE8"
                strokeWidth="4"
              />
              <path
                d="M-10,-14 v-40 l48,26 v40Z"
                fill={desk.rows.length ? '#5B84F5' : '#CED7EA'}
                stroke="#34476F"
                strokeWidth="4"
              />
              <path d="M-4,-9 l25,13" stroke="#BFE8D2" strokeWidth="3" />
              <text x="22" y="54" fill="#31476F" fontSize="15" textAnchor="middle">
                {desk.title}
              </text>
              {desk.rows.length > 0 && (
                <g transform="translate(72 105)">
                  <Character
                    shirt={['#5B84F5', '#BFE8D2', '#FBD9C3', '#B9C4F2', '#F8CFE0'][index]}
                    skin={skin}
                    working
                  />
                  <text y="23" textAnchor="middle" fontSize="14" fill="#31476F">
                    {desk.rows.length}
                  </text>
                </g>
              )}
            </Hotspot>
          ))}
          <Hotspot
            x={700}
            y={655}
            label="Manajer — tampilan karakter"
            onClick={() => select({ kind: 'manager', index: 0 })}
          >
            <Character shirt={shirt} skin={skin} />
          </Hotspot>
        </>
      )}
    </svg>
  );
}
