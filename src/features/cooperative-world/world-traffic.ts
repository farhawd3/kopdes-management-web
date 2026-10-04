/**
 * world-traffic.ts
 * Logika murni simulasi lalu lintas Dunia Koperasi (Paket 3 PRD v2):
 * - Spawner shuffle-bag berbobot (motor 40%, mobil 25%, van 15%, truk 20%) tanpa 3 jenis berurutan sama.
 * - Perhitungan fade in/out di batas platform dengan modulasi skala dan opasitas halus.
 * - Logika kepatuhan lampu merah simpang & antrean berjarak aman.
 * - Anggaran ketenangan lalu lintas (desktop maks 4, mobile/reduced maks 2).
 */

export type VehicleType = 'motor' | 'mobil' | 'van' | 'truk';
export type TrafficDirection = 1 | -1;

export interface TrafficVehicleState {
  id: string;
  type: VehicleType;
  color: string;
  riderColor?: string;
  helmetColor?: string;
  direction: TrafficDirection;
  x: number;
  z: number;
  speed: number;
  targetSpeed: number;
  opacity: number;
  scale: number;
  castShadow: boolean;
  state: 'driving' | 'waiting' | 'despawned';
  lane: 'east' | 'west';
  mitraName?: string;
}

export interface FadeResult {
  opacity: number;
  scale: number;
  castShadow: boolean;
}

/**
 * Hitung fade in / fade out berdasarkan posisi x dan arah kendaraan.
 * Menghasilkan opasitas 0.0 -> 1.0 dan skala 0.94 -> 1.0 secara mulus.
 * castShadow hanya aktif bila opasitas > 0.85 (mencegah pop bayangan di batas platform).
 */
export function calculateFade(
  x: number,
  direction: TrafficDirection,
  xMin = -31,
  xMax = 31,
  fadeDist = 5,
): FadeResult {
  let opacity = 1;
  let scale = 1;

  if (direction === 1) {
    // Bergerak dari barat (-31) ke timur (31)
    if (x <= xMin) {
      opacity = 0;
      scale = 0.94;
    } else if (x < xMin + fadeDist) {
      const progress = Math.max(0, Math.min(1, (x - xMin) / fadeDist));
      // Easing cubic halus
      opacity = progress * progress * (3 - 2 * progress);
      scale = 0.94 + 0.06 * opacity;
    } else if (x > xMax - fadeDist) {
      const progress = Math.max(0, Math.min(1, (xMax - x) / fadeDist));
      opacity = progress * progress * (3 - 2 * progress);
      scale = 0.94 + 0.06 * opacity;
    } else if (x >= xMax) {
      opacity = 0;
      scale = 0.94;
    }
  } else {
    // Bergerak dari timur (31) ke barat (-31)
    if (x >= xMax) {
      opacity = 0;
      scale = 0.94;
    } else if (x > xMax - fadeDist) {
      const progress = Math.max(0, Math.min(1, (xMax - x) / fadeDist));
      opacity = progress * progress * (3 - 2 * progress);
      scale = 0.94 + 0.06 * opacity;
    } else if (x < xMin + fadeDist) {
      const progress = Math.max(0, Math.min(1, (x - xMin) / fadeDist));
      opacity = progress * progress * (3 - 2 * progress);
      scale = 0.94 + 0.06 * opacity;
    } else if (x <= xMin) {
      opacity = 0;
      scale = 0.94;
    }
  }

  const castShadow = opacity >= 0.85;
  return { opacity, scale, castShadow };
}

/**
 * Generator shuffle-bag berbobot:
 * - motor: 40% (4 tiket per bag 10)
 * - mobil: 25% (3 tiket)
 * - van: 15% (1 tiket)
 * - truk: 20% (2 tiket)
 * Memastikan tidak ada 3 jenis berurutan yang sama.
 */
export function createTrafficShuffleBag(seed = 42) {
  let s = seed;
  const nextRandom = () => {
    // PRNG LCG sederhana dan deterministik
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  const baseItems: VehicleType[] = [
    'motor',
    'motor',
    'motor',
    'motor',
    'mobil',
    'mobil',
    'mobil',
    'van',
    'truk',
    'truk',
  ];

  let bag: VehicleType[] = [];
  let last1: VehicleType | null = null;
  let last2: VehicleType | null = null;

  const refill = () => {
    bag = [...baseItems];
    // Fisher-Yates shuffle
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(nextRandom() * (i + 1));
      const temp = bag[i];
      bag[i] = bag[j];
      bag[j] = temp;
    }
  };

  const draw = (): VehicleType => {
    if (bag.length === 0) {
      refill();
    }

    // Hindari 3 jenis identik berturut-turut
    let pickIndex = -1;
    for (let i = 0; i < bag.length; i++) {
      if (last1 && last2 && last1 === last2 && bag[i] === last1) {
        continue;
      }
      pickIndex = i;
      break;
    }

    if (pickIndex === -1) {
      pickIndex = 0;
    }

    const item = bag.splice(pickIndex, 1)[0];
    last2 = last1;
    last1 = item;
    return item;
  };

  return { draw, nextRandom };
}

export const TRAFFIC_PALETTES = {
  motor: ['#79c8a0', '#a7c8e9', '#dfc59c', '#f59e0b', '#3866f6'],
  mobil: ['#3866f6', '#2443a6', '#fafcff', '#64748b', '#3b82f6'],
  van: ['#fafcff', '#f1f5f9', '#e2e8f0'],
  truk: ['#2443a6', '#1e3a8a', '#0f766e', '#b45309'],
  helm: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#fafcff'],
  jaket: ['#334155', '#1e293b', '#2563eb', '#059669', '#d97706'],
};

/**
 * Update step simulasi lalu lintas jalan raya.
 * @param vehicles Daftar armada yang aktif disimulasikan
 * @param dt Delta time (detik)
 * @param isMainGreen Apakah lampu hijau untuk jalan utama
 * @param stopDistance Jarak aman henti lampu merah (-4.5 untuk arah timur, 4.5 untuk arah barat)
 */
export function stepTrafficSimulation(
  vehicles: TrafficVehicleState[],
  dt: number,
  isMainGreen: boolean,
  stopLineEast = -4.5,
  stopLineWest = 4.5,
): void {
  // Sort per jalur untuk mendeteksi kendaraan di depan
  const eastLane = vehicles
    .filter((v) => v.direction === 1 && v.state !== 'despawned')
    .sort((a, b) => b.x - a.x); // x terbesar di depan

  const westLane = vehicles
    .filter((v) => v.direction === -1 && v.state !== 'despawned')
    .sort((a, b) => a.x - b.x); // x terkecil di depan

  // Update Jalur Timur (direction = 1, bergerak ke x positif)
  for (let i = 0; i < eastLane.length; i++) {
    const v = eastLane[i];
    const lead = i > 0 ? eastLane[i - 1] : null;

    let shouldStop = false;
    let targetX = 35; // default terus melaju

    // Cek lampu merah bila belum melewati stop line
    if (!isMainGreen && v.x < stopLineEast && v.x > stopLineEast - 10) {
      shouldStop = true;
      targetX = stopLineEast;
    }

    // Cek kendaraan di depan
    if (lead) {
      const minDistance = v.type === 'truk' || lead.type === 'truk' ? 4.5 : 3.2;
      const safeStopX = lead.x - minDistance;
      if (safeStopX < targetX) {
        targetX = safeStopX;
        if (v.x >= targetX - 0.2) {
          shouldStop = true;
        }
      }
    }

    if (shouldStop && v.x >= targetX - 0.1) {
      v.speed = 0;
      v.state = 'waiting';
    } else if (shouldStop) {
      // Deselerasi mulus mendekati target
      const dist = Math.max(0.1, targetX - v.x);
      v.speed = Math.min(v.targetSpeed, Math.max(0.3, dist * 0.9));
      v.x += v.speed * dt;
      v.state = 'driving';
    } else {
      // Akselerasi ke target speed
      v.speed = Math.min(v.targetSpeed, v.speed + dt * 2.0);
      v.x += v.speed * dt;
      v.state = 'driving';
    }

    // Hitung fade
    const fade = calculateFade(v.x, v.direction);
    v.opacity = fade.opacity;
    v.scale = fade.scale;
    v.castShadow = fade.castShadow;

    if (v.x >= 32) {
      v.state = 'despawned';
    }
  }

  // Update Jalur Barat (direction = -1, bergerak ke x negatif)
  for (let i = 0; i < westLane.length; i++) {
    const v = westLane[i];
    const lead = i > 0 ? westLane[i - 1] : null;

    let shouldStop = false;
    let targetX = -35;

    // Cek lampu merah bila belum melewati stop line barat
    if (!isMainGreen && v.x > stopLineWest && v.x < stopLineWest + 10) {
      shouldStop = true;
      targetX = stopLineWest;
    }

    // Cek kendaraan di depan
    if (lead) {
      const minDistance = v.type === 'truk' || lead.type === 'truk' ? 4.5 : 3.2;
      const safeStopX = lead.x + minDistance;
      if (safeStopX > targetX) {
        targetX = safeStopX;
        if (v.x <= targetX + 0.2) {
          shouldStop = true;
        }
      }
    }

    if (shouldStop && v.x <= targetX + 0.1) {
      v.speed = 0;
      v.state = 'waiting';
    } else if (shouldStop) {
      const dist = Math.max(0.1, v.x - targetX);
      v.speed = Math.min(v.targetSpeed, Math.max(0.3, dist * 0.9));
      v.x -= v.speed * dt;
      v.state = 'driving';
    } else {
      v.speed = Math.min(v.targetSpeed, v.speed + dt * 2.0);
      v.x -= v.speed * dt;
      v.state = 'driving';
    }

    const fade = calculateFade(v.x, v.direction);
    v.opacity = fade.opacity;
    v.scale = fade.scale;
    v.castShadow = fade.castShadow;

    if (v.x <= -32) {
      v.state = 'despawned';
    }
  }
}
