/**
 * Modul murni sistem pencahayaan dinamis & lampu malam Dunia Koperasi.
 *
 * Mengatur kurva warna matahari/bulan, intensitas ambient, posisi directional light,
 * emisi lampu jalan/kantor, serta adaptasi cuaca.
 * Elevasi directional light selalu dijaga >= 30 derajat untuk mencegah shadow acne.
 */

export interface LightingKeyframe {
  minute: number; // 0 - 1440
  sunColor: string;
  sunIntensity: number;
  ambientIntensity: number;
  lampIntensity: number; // 0 (mati) - 1 (menyala penuh)
  skyBackground: string;
}

export const LIGHTING_KEYFRAMES: LightingKeyframe[] = [
  {
    minute: 0, // 00:00
    sunColor: '#93b4ff',
    sunIntensity: 0.25,
    ambientIntensity: 0.35,
    lampIntensity: 1.0,
    skyBackground: '#0a0f1d',
  },
  {
    minute: 270, // 04:30
    sunColor: '#93b4ff',
    sunIntensity: 0.25,
    ambientIntensity: 0.35,
    lampIntensity: 1.0,
    skyBackground: '#0f172a',
  },
  {
    minute: 330, // 05:30 (fajar)
    sunColor: '#ffe8d1',
    sunIntensity: 0.55,
    ambientIntensity: 0.5,
    lampIntensity: 1.0,
    skyBackground: '#1e293b',
  },
  {
    minute: 375, // 06:15 (lampu mati)
    sunColor: '#ffe0c0',
    sunIntensity: 0.75,
    ambientIntensity: 0.7,
    lampIntensity: 0.0,
    skyBackground: '#93c5fd',
  },
  {
    minute: 420, // 07:00 (pagi cerah)
    sunColor: '#fff1dc',
    sunIntensity: 0.9,
    ambientIntensity: 0.85,
    lampIntensity: 0.0,
    skyBackground: '#e0f2fe',
  },
  {
    minute: 720, // 12:00 (siang puncak)
    sunColor: '#fff8ec',
    sunIntensity: 1.15,
    ambientIntensity: 1.0,
    lampIntensity: 0.0,
    skyBackground: '#e6f0fa',
  },
  {
    minute: 990, // 16:30 (sore)
    sunColor: '#fff0d9',
    sunIntensity: 1.0,
    ambientIntensity: 0.9,
    lampIntensity: 0.0,
    skyBackground: '#e8f0fc',
  },
  {
    minute: 1065, // 17:45 (senja awal)
    sunColor: '#ffb280',
    sunIntensity: 0.7,
    ambientIntensity: 0.65,
    lampIntensity: 0.0,
    skyBackground: '#334155',
  },
  {
    minute: 1110, // 18:30 (lampu menyala penuh)
    sunColor: '#f97316',
    sunIntensity: 0.45,
    ambientIntensity: 0.45,
    lampIntensity: 1.0,
    skyBackground: '#1e293b',
  },
  {
    minute: 1170, // 19:30 (malam)
    sunColor: '#93b4ff',
    sunIntensity: 0.25,
    ambientIntensity: 0.35,
    lampIntensity: 1.0,
    skyBackground: '#0f172a',
  },
  {
    minute: 1440, // 24:00 wrap-around
    sunColor: '#93b4ff',
    sunIntensity: 0.25,
    ambientIntensity: 0.35,
    lampIntensity: 1.0,
    skyBackground: '#0a0f1d',
  },
];

export interface LightingState {
  sunColor: string;
  sunIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  sunPosition: [number, number, number];
  isNight: boolean;
  lampIntensity: number;
  windowLightColor: string;
  streetLightEmissive: string;
  skyBackground: string;
}

/**
 * Konversi hex color '#rrggbb' ke [r, g, b] (0..1)
 */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return [r, g, b];
}

/**
 * Interpolasi linier dua warna RGB lalu kembalikan ke hex.
 */
function interpolateColor(hexA: string, hexB: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const r = Math.round((r1 + (r2 - r1) * factor) * 255);
  const g = Math.round((g1 + (g2 - g1) * factor) * 255);
  const b = Math.round((b1 + (b2 - b1) * factor) * 255);
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Dapatkan state pencahayaan kontinu berdasarkan menit dalam sehari (0..1440) dan kondisi cuaca.
 */
export function getLightingForMinute(
  minuteOfDay: number,
  weather: 'cerah' | 'berawan' | 'hujan' = 'cerah',
): LightingState {
  const normalizedMinute = ((minuteOfDay % 1440) + 1440) % 1440;

  // Cari keyframe sebelum dan sesudah
  let kfBefore = LIGHTING_KEYFRAMES[0];
  let kfAfter = LIGHTING_KEYFRAMES[LIGHTING_KEYFRAMES.length - 1];

  for (let i = 0; i < LIGHTING_KEYFRAMES.length - 1; i++) {
    if (
      normalizedMinute >= LIGHTING_KEYFRAMES[i].minute &&
      normalizedMinute <= LIGHTING_KEYFRAMES[i + 1].minute
    ) {
      kfBefore = LIGHTING_KEYFRAMES[i];
      kfAfter = LIGHTING_KEYFRAMES[i + 1];
      break;
    }
  }

  const span = kfAfter.minute - kfBefore.minute;
  const t = span > 0 ? (normalizedMinute - kfBefore.minute) / span : 0;
  // Smoothstep easing untuk transisi alami
  const smoothT = t * t * (3 - 2 * t);

  let sunColor = interpolateColor(kfBefore.sunColor, kfAfter.sunColor, smoothT);
  let sunIntensity =
    kfBefore.sunIntensity + (kfAfter.sunIntensity - kfBefore.sunIntensity) * smoothT;
  let ambientIntensity =
    kfBefore.ambientIntensity + (kfAfter.ambientIntensity - kfBefore.ambientIntensity) * smoothT;
  const lampIntensity =
    kfBefore.lampIntensity + (kfAfter.lampIntensity - kfBefore.lampIntensity) * smoothT;
  let skyBackground = interpolateColor(kfBefore.skyBackground, kfAfter.skyBackground, smoothT);

  // Penyesuaian cuaca
  if (weather === 'berawan') {
    sunIntensity *= 0.8;
    ambientIntensity *= 0.9;
    skyBackground = interpolateColor(skyBackground, '#94a3b8', 0.25);
  } else if (weather === 'hujan') {
    sunIntensity *= 0.65;
    ambientIntensity *= 0.75;
    sunColor = interpolateColor(sunColor, '#cbd5e1', 0.35);
    skyBackground = interpolateColor(skyBackground, '#64748b', 0.45);
  }

  // Hitung posisi directional light:
  // Elevasi dikunci >= 30 derajat (Y selalu >= 22 unit pada radius orbit 25)
  // Azimut berputar dari timur (-0.8 pi) ke barat (+0.8 pi)
  const angle = ((normalizedMinute - 360) / 720) * Math.PI; // 06:00 = angle 0
  const orbitRadius = 24;
  const sunX = Math.sin(angle) * orbitRadius;
  const sunZ = Math.cos(angle) * (orbitRadius * 0.7);
  const sunY = 24; // Elevasi aman: arctan(24 / 24) = 45 derajat (jauh di atas 30 derajat)

  const isNight = lampIntensity > 0.4;
  const ambientColor = isNight ? '#a5b4fc' : '#ffffff';
  const windowLightColor = isNight ? '#fef08a' : '#bfdbfe';
  const streetLightEmissive = isNight ? '#fde047' : '#000000';

  return {
    sunColor,
    sunIntensity,
    ambientColor,
    ambientIntensity,
    sunPosition: [sunX, sunY, sunZ],
    isNight,
    lampIntensity,
    windowLightColor,
    streetLightEmissive,
    skyBackground,
  };
}

/**
 * Konversi preset Waktu ke menit dalam sehari
 */
export function getMinuteFromPreset(
  preset: 'pagi' | 'siang' | 'senja' | 'malam' | 'otomatis',
  actualHour = 12,
  actualMinute = 0,
): number {
  switch (preset) {
    case 'pagi':
      return 420; // 07:00
    case 'siang':
      return 720; // 12:00
    case 'senja':
      return 1065; // 17:45
    case 'malam':
      return 1230; // 20:30
    case 'otomatis':
    default:
      return actualHour * 60 + actualMinute;
  }
}
