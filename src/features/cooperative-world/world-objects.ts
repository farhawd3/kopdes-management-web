import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { CharacterActivity, WorldModel } from './world-model';

export const palette = {
  blue: '#3866f6',
  navy: '#2443a6',
  white: '#fafcff',
  glass: '#a7c8e9',
  ground: '#e4eaf6',
  green: '#79c8a0',
  wood: '#dfc59c',
  ink: '#2d3b56',
  road: '#b8c9e5',
  sidewalk: '#f4f7fd',
  dockStripe: '#f5c542',
  fountain: '#72a8e8',
  warehouse: '#e2e8f0',
  metal: '#475569',
  nightLamp: '#fef08a',
  trafficRed: '#ef4444',
  trafficYellow: '#f59e0b',
  trafficGreen: '#10b981',
};
const material = (color: string) => new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
export function box(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  color: string,
  radius = 0.035,
  castShadow = true,
  receiveShadow = true,
) {
  const mesh = new THREE.Mesh(
    radius ? new RoundedBoxGeometry(...size, 2, radius) : new THREE.BoxGeometry(...size),
    material(color),
  );
  mesh.position.set(...position);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);
  return mesh;
}
function sphere(
  parent: THREE.Object3D,
  radius: number,
  position: [number, number, number],
  color: string,
  scale: [number, number, number] = [1, 1, 1],
) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 12), material(color));
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function cylinder(
  parent: THREE.Object3D,
  radius: number,
  height: number,
  position: [number, number, number],
  color: string,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 12),
    material(color),
  );
  mesh.position.set(...position);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
export function sign(
  parent: THREE.Object3D,
  text: string,
  position: [number, number, number],
  width = 3,
  color = '#2443a6',
) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#fafcff';
  ctx.fillRect(0, 0, 768, 128);
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text.slice(0, 28), 384, 68, 730);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, width / 6),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
  );
  mesh.position.set(...position);
  parent.add(mesh);
}
function tree(parent: THREE.Object3D, x: number, z: number, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);
  parent.add(group);
  cylinder(group, 0.08, 1.2, [0, 0.6, 0], '#9b978e');
  sphere(group, 0.58, [0, 1.6, 0], palette.green, [0.9, 1.35, 0.9]);
  sphere(group, 0.36, [-0.23, 1.67, 0.15], '#a6dfb5');
  cylinder(group, 0.52, 0.15, [0, 0.08, 0], '#d1dcec');
}
export type SeatAnchor = {
  position: [number, number, number];
  rotationY: number;
};

export function bench(parent: THREE.Object3D, x: number, z: number, rotation = 0): SeatAnchor {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotation;
  parent.add(g);
  for (const offset of [-0.6, 0.6])
    box(g, [0.09, 0.45, 0.5], [offset, 0.22, 0], palette.ink);
  for (let i = 0; i < 3; i++)
    box(g, [1.7, 0.08, 0.13], [0, 0.49, (i - 1) * 0.16], palette.wood);
  box(g, [1.7, 0.35, 0.08], [0, 0.8, -0.25], palette.wood);
  return {
    position: [x, 0.45, z],
    rotationY: rotation,
  };
}

export type TrafficLightRefs = {
  red: THREE.Mesh;
  yellow: THREE.Mesh;
  green: THREE.Mesh;
};

export function createTrafficLight(
  parent: THREE.Object3D,
  x: number,
  z: number,
  rotation = 0,
): TrafficLightRefs {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotation;
  parent.add(g);
  // Pole
  cylinder(g, 0.08, 3.8, [0, 1.9, 0], palette.metal);
  // Horizontal arm
  box(g, [1.2, 0.08, 0.08], [0.55, 3.65, 0], palette.metal);
  // Light housing box
  box(g, [0.32, 0.95, 0.28], [1.1, 3.5, 0], '#1e293b', 0.04);
  // Visors
  for (let i = 0; i < 3; i++) {
    box(g, [0.1, 0.03, 0.24], [1.28, 3.82 - i * 0.28, 0], '#0f172a');
  }
  // 3 lenses: Red, Yellow, Green
  const redMat = new THREE.MeshStandardMaterial({
    color: palette.trafficRed,
    emissive: palette.trafficRed,
    emissiveIntensity: 0.9,
    roughness: 0.2,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: palette.trafficYellow,
    emissive: palette.trafficYellow,
    emissiveIntensity: 0.05,
    roughness: 0.2,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: palette.trafficGreen,
    emissive: palette.trafficGreen,
    emissiveIntensity: 0.05,
    roughness: 0.2,
  });
  const red = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12), redMat);
  red.rotation.z = Math.PI / 2;
  red.position.set(1.24, 3.8, 0);
  g.add(red);

  const yellow = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12), yellowMat);
  yellow.rotation.z = Math.PI / 2;
  yellow.position.set(1.24, 3.52, 0);
  g.add(yellow);

  const green = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12), greenMat);
  green.rotation.z = Math.PI / 2;
  green.position.set(1.24, 3.24, 0);
  g.add(green);

  return { red, yellow, green };
}

export function createForklift(
  parent: THREE.Object3D,
  position: [number, number, number],
  rotation = 0,
) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.y = rotation;
  parent.add(g);
  // 4 Wheels
  for (const [wx, wz] of [
    [-0.45, -0.35],
    [0.45, -0.35],
    [-0.45, 0.35],
    [0.45, 0.35],
  ]) {
    const wheel = cylinder(g, 0.14, 0.12, [wx, 0.14, wz], '#1e2430');
    wheel.rotation.x = Math.PI / 2;
  }
  // Chassis
  box(g, [1.2, 0.4, 0.7], [0, 0.32, 0], '#f59e0b', 0.04);
  // Counterweight
  box(g, [0.4, 0.5, 0.68], [-0.4, 0.45, 0], '#b45309', 0.04);
  // Overhead guard cage
  for (const cx of [-0.2, 0.25]) {
    for (const cz of [-0.3, 0.3]) {
      cylinder(g, 0.025, 0.85, [cx, 0.85, cz], '#334155');
    }
  }
  box(g, [0.65, 0.04, 0.68], [0.02, 1.28, 0], '#334155', 0.02);
  // Front mast & forks
  box(g, [0.08, 1.1, 0.45], [0.65, 0.65, 0], '#475569');
  box(g, [0.55, 0.04, 0.1], [0.92, 0.12, -0.16], '#334155', 0);
  box(g, [0.55, 0.04, 0.1], [0.92, 0.12, 0.16], '#334155', 0);
  // Cargo box on fork
  box(g, [0.45, 0.35, 0.45], [0.88, 0.32, 0], palette.wood, 0.03);
  return g;
}

export function createWarehouse(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.userData.selection = 'gudang';
  parent.add(g);

  // Warehouse main building: 13.5 x 3.6 x 5.2
  box(g, [13.5, 3.5, 5.2], [0, 1.85, 0], palette.warehouse, 0.12);
  // Lis navy & atap gable bergaris
  box(g, [13.8, 0.35, 5.5], [0, 3.7, 0], palette.navy, 0.08);
  for (let i = -6; i <= 6; i += 1.5) {
    box(g, [0.08, 0.06, 5.4], [i, 3.9, 0], '#648cfb', 0);
  }
  // Skylight strip di atap
  box(g, [9.0, 0.06, 1.2], [0, 3.92, 0], palette.glass, 0.02);

  // 3 Rolling door bays on front facade (z = 2.6)
  const bayX = [-4.0, 0, 4.0];
  // Bay 1: Closed rolling door with horizontal ridges
  box(g, [2.8, 2.4, 0.1], [bayX[0], 1.3, 2.62], '#3b82f6', 0.03);
  for (let y = 0.3; y <= 2.3; y += 0.28) {
    box(g, [2.76, 0.04, 0.06], [bayX[0], y, 2.67], '#1d4ed8', 0);
  }
  box(g, [3.2, 0.3, 0.3], [bayX[0], 2.65, 2.7], palette.navy, 0.04);

  // Bay 2: Open bay showing stacked pallets inside
  box(g, [2.8, 2.4, 0.12], [bayX[1], 1.3, 2.58], '#1e293b', 0.02);
  cylinder(g, 0.22, 2.8, [bayX[1], 2.35, 2.55], palette.blue).rotation.z = Math.PI / 2;
  // Inside pallets
  box(g, [1.4, 0.14, 1.2], [bayX[1] - 0.4, 0.2, 1.8], palette.wood);
  box(g, [1.2, 0.6, 1.0], [bayX[1] - 0.4, 0.58, 1.8], '#cbd5e1', 0.04);
  box(g, [1.4, 0.14, 1.2], [bayX[1] + 0.4, 0.2, 1.6], palette.wood);
  box(g, [1.1, 0.75, 0.9], [bayX[1] + 0.4, 0.65, 1.6], '#b45309', 0.04);

  // Bay 3: Active Loading Dock with protective canopy
  box(g, [2.8, 2.4, 0.1], [bayX[2], 1.3, 2.62], '#2563eb', 0.03);
  box(g, [4.2, 0.15, 2.4], [bayX[2], 2.85, 3.8], palette.navy, 0.06);
  cylinder(g, 0.07, 2.8, [bayX[2] - 1.8, 1.4, 4.8], palette.metal);
  cylinder(g, 0.07, 2.8, [bayX[2] + 1.8, 1.4, 4.8], palette.metal);
  // Dock bumper rubber blocks
  box(g, [0.25, 0.6, 0.2], [bayX[2] - 1.2, 0.5, 2.72], '#0f172a');
  box(g, [0.25, 0.6, 0.2], [bayX[2] + 1.2, 0.5, 2.72], '#0f172a');

  // Sign on warehouse
  sign(g, 'GUDANG LOGISTIK', [0, 3.25, 2.66], 4.8, '#2443a6');

  // Forklift on apron
  createForklift(g, [-2.2, 0, 4.5], -Math.PI * 0.25);

  // Pallet stack on apron
  box(g, [1.4, 0.14, 1.2], [2.2, 0.12, 4.8], palette.wood);
  box(g, [1.2, 0.65, 1.0], [2.2, 0.52, 4.8], '#3b82f6', 0.05);

  return g;
}

function building(
  parent: THREE.Object3D,
  x: number,
  z: number,
  title: string,
  main = false,
  selection = title,
) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.userData.selection = main ? 'koperasi' : selection;
  parent.add(g);
  const w = main ? 5.1 : 3.8,
    h = main ? 3.2 : 2.2,
    d = main ? 3.5 : 2.6;
  box(g, [w + 0.65, 0.16, d + 0.65], [0, 0.08, 0], '#f7f9ff');
  box(g, [w, h, d], [0, h / 2 + 0.16, 0], main ? palette.blue : palette.white);
  box(g, [w + 0.16, 0.2, d + 0.2], [0, h + 0.2, 0], palette.navy);
  for (let i = -2; i <= 2; i++) box(g, [0.035, 0.035, d], [(i * w) / 5, h + 0.32, 0], '#648cfb', 0);
  box(g, [w + 0.4, 0.13, 0.95], [0, h * 0.69, d / 2 + 0.3], main ? '#8cacf9' : palette.blue);
  box(g, [1.15, 1.7, 0.08], [0, 1.02, d / 2 + 0.015], '#293e6a');
  box(g, [0.93, 1.55, 0.09], [0, 1.02, d / 2 + 0.06], palette.glass);
  box(g, [0.04, 1.55, 0.12], [0, 1.02, d / 2 + 0.1], '#fafcff');
  for (const side of [-1, 1]) {
    box(g, [0.95, 1, 0.09], [side * (w / 2 - 0.75), 1.35, d / 2 + 0.04], '#bedcfa');
    box(g, [0.04, 1, 0.12], [side * (w / 2 - 0.75), 1.35, d / 2 + 0.09], '#fafcff');
  }
  sign(g, main ? 'KOPERASI' : title, [0, h * 0.84, d / 2 + 0.08], w * 0.73);
  if (main) {
    box(g, [1.1, 0.3, 0.7], [-1, h + 0.42, -0.5], '#cbd4e9');
    for (const side of [-1, 1]) {
      cylinder(g, 0.32, 0.5, [side * 2.3, 0.41, 2.15], '#e3e9f4');
      sphere(g, 0.42, [side * 2.3, 0.84, 2.15], palette.green);
    }
  }
}

export function createCar(
  parent: THREE.Object3D,
  position: [number, number, number],
  color = palette.blue,
  rotation = 0,
  selection = 'kendaraan-manajer',
) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.y = rotation;
  g.userData.selection = selection;
  parent.add(g);
  // Wheels
  for (const [wx, wz] of [
    [-1.0, -0.68],
    [1.0, -0.68],
    [-1.0, 0.68],
    [1.0, 0.68],
  ]) {
    const wheel = cylinder(g, 0.28, 0.2, [wx, 0.28, wz], '#1e2430');
    wheel.rotation.x = Math.PI / 2;
    cylinder(wheel, 0.14, 0.21, [0, 0, 0], '#cbd5e1');
  }
  // Chassis and lower body
  box(g, [2.9, 0.45, 1.45], [0, 0.42, 0], color, 0.08);
  box(g, [2.95, 0.12, 1.48], [0, 0.2, 0], '#24324a', 0.04);
  // Cabin & roof
  box(g, [1.6, 0.52, 1.3], [-0.15, 0.88, 0], color, 0.07);
  // Windshield & rear window
  box(g, [0.08, 0.42, 1.18], [0.65, 0.84, 0], palette.glass);
  box(g, [0.08, 0.42, 1.18], [-0.95, 0.84, 0], palette.glass);
  // Side windows
  for (const sz of [-0.64, 0.64]) {
    box(g, [1.38, 0.38, 0.04], [-0.15, 0.85, sz], palette.glass);
  }
  // Headlights & taillights
  for (const sz of [-0.5, 0.5]) {
    box(g, [0.08, 0.14, 0.28], [1.46, 0.46, sz], '#fff5cc', 0.03);
    box(g, [0.08, 0.14, 0.25], [-1.46, 0.46, sz], '#ef4444', 0.03);
  }
  // Grille
  box(g, [0.06, 0.16, 0.6], [1.46, 0.32, 0], '#182234');
  return g;
}

export function createMotorcycle(
  parent: THREE.Object3D,
  position: [number, number, number],
  color = '#79c8a0',
  rotation = 0,
  selection = 'kendaraan-motor',
  riderJacket = '#334155',
  helmetColor = '#ef4444',
) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.y = rotation;
  g.userData.selection = selection;
  parent.add(g);

  // 2 Wheels (Front & Rear)
  for (const wx of [-0.68, 0.72]) {
    const wheel = cylinder(g, 0.26, 0.12, [wx, 0.26, 0], '#1e2430');
    wheel.rotation.x = Math.PI / 2;
    cylinder(wheel, 0.12, 0.13, [0, 0, 0], '#cbd5e1');
  }

  // Chassis / footboard
  box(g, [1.3, 0.14, 0.44], [0.02, 0.22, 0], '#334155', 0.03);

  // Front shield & fork
  box(g, [0.32, 0.48, 0.42], [0.55, 0.52, 0], color, 0.06);

  // Round Headlight
  const light = cylinder(g, 0.1, 0.08, [0.72, 0.62, 0], '#fffbeb');
  light.rotation.z = Math.PI / 2;

  // Handlebars
  const bar = cylinder(g, 0.03, 0.6, [0.46, 0.8, 0], '#475569');
  bar.rotation.x = Math.PI / 2;

  // Seat / saddle
  box(g, [0.7, 0.14, 0.36], [-0.15, 0.48, 0], '#1e2430', 0.04);

  // Rear body & fender
  box(g, [0.6, 0.32, 0.38], [-0.38, 0.42, 0], color, 0.05);
  box(g, [0.06, 0.1, 0.2], [-0.7, 0.44, 0], '#ef4444', 0.02);

  // Rider - Project Character Style with Round Helmet
  box(g, [0.36, 0.5, 0.34], [-0.12, 0.84, 0], riderJacket, 0.06);

  // Legs in riding stance
  for (const lz of [-0.18, 0.18]) {
    box(g, [0.18, 0.36, 0.14], [0.04, 0.42, lz], '#24324a', 0.04);
  }

  // Arms reaching handlebars
  for (const az of [-0.18, 0.18]) {
    const arm = cylinder(g, 0.055, 0.38, [0.18, 0.72, az], riderJacket);
    arm.rotation.z = -Math.PI * 0.25;
  }

  // Head with Round Helmet (Kamus Bentuk: Kepala bulat berhelm)
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 12), material(helmetColor));
  headMesh.position.set(-0.12, 1.3, 0);
  headMesh.castShadow = true;
  g.add(headMesh);

  // Dark Visor
  box(g, [0.1, 0.1, 0.24], [0.04, 1.3, 0], '#1e293b', 0.03);

  return g;
}

export function createVan(
  parent: THREE.Object3D,
  position: [number, number, number],
  color = '#fafcff',
  rotation = 0,
  selection = 'kendaraan-van',
) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.y = rotation;
  g.userData.selection = selection;
  parent.add(g);
  // Wheels
  for (const [wx, wz] of [
    [-1.2, -0.74],
    [1.1, -0.74],
    [-1.2, 0.74],
    [1.1, 0.74],
  ]) {
    const wheel = cylinder(g, 0.32, 0.22, [wx, 0.32, wz], '#1e2430');
    wheel.rotation.x = Math.PI / 2;
    cylinder(wheel, 0.16, 0.23, [0, 0, 0], '#94a3b8');
  }
  // Van Main Body
  box(g, [3.6, 1.35, 1.55], [0, 0.98, 0], color, 0.1);
  // Blue accent stripe
  box(g, [3.64, 0.22, 1.57], [0, 0.72, 0], palette.blue, 0.04);
  // Front slope / windscreen
  box(g, [0.8, 0.58, 1.38], [1.45, 1.15, 0], palette.glass, 0.06);
  // Side cabin windows
  for (const sz of [-0.77, 0.77]) {
    box(g, [0.85, 0.45, 0.04], [0.95, 1.25, sz], palette.glass);
    box(g, [1.4, 0.42, 0.04], [-0.5, 1.25, sz], '#dbe7f7');
  }
  // Rear doors outline
  box(g, [0.05, 1.0, 1.3], [-1.81, 0.98, 0], '#cbd7e6');
  // Headlights & taillights
  for (const sz of [-0.55, 0.55]) {
    box(g, [0.08, 0.16, 0.26], [1.81, 0.58, sz], '#fff6cf', 0.03);
    box(g, [0.08, 0.35, 0.14], [-1.81, 0.98, sz], '#ef4444', 0.03);
  }
  return g;
}

export function createTruck(
  parent: THREE.Object3D,
  position: [number, number, number],
  color = palette.navy,
  rotation = 0,
  selection = 'kendaraan-truk',
) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.y = rotation;
  g.userData.selection = selection;
  parent.add(g);
  // 6 Heavy Wheels
  for (const [wx, wz] of [
    [1.7, -0.82],
    [1.7, 0.82],
    [-0.9, -0.82],
    [-0.9, 0.82],
    [-1.8, -0.82],
    [-1.8, 0.82],
  ]) {
    const wheel = cylinder(g, 0.36, 0.24, [wx, 0.36, wz], '#1a202c');
    wheel.rotation.x = Math.PI / 2;
    cylinder(wheel, 0.18, 0.25, [0, 0, 0], '#64748b');
  }
  // Cab
  box(g, [1.5, 1.45, 1.7], [1.5, 1.1, 0], color, 0.1);
  box(g, [0.1, 0.58, 1.5], [2.26, 1.35, 0], palette.glass);
  for (const sz of [-0.84, 0.84]) {
    box(g, [0.75, 0.48, 0.05], [1.48, 1.35, sz], palette.glass);
  }
  // Headlights & bumper
  box(g, [0.25, 0.28, 1.72], [2.22, 0.44, 0], '#1e293b', 0.05);
  for (const sz of [-0.62, 0.62]) {
    box(g, [0.06, 0.14, 0.28], [2.35, 0.46, sz], '#fffbeb', 0.03);
  }
  // Large cargo box
  box(g, [3.2, 1.9, 1.75], [-0.95, 1.4, 0], '#f8fafc', 0.08);
  box(g, [3.24, 0.18, 1.77], [-0.95, 0.95, 0], palette.blue, 0.02);
  sign(g, 'KOPDES', [-0.95, 1.55, 0.89], 2.2, '#2443a6');
  sign(g, 'KOPDES', [-0.95, 1.55, -0.89], 2.2, '#2443a6');
  return g;
}

function fountain(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  parent.add(g);
  // Outer stone basin ring
  cylinder(g, 1.8, 0.35, [0, 0.18, 0], '#d9e2ef');
  // Water pool
  cylinder(g, 1.6, 0.32, [0, 0.2, 0], palette.fountain);
  // Center tier
  cylinder(g, 0.7, 0.7, [0, 0.45, 0], '#cbd7e8');
  cylinder(g, 0.25, 0.55, [0, 0.95, 0], '#8cbaf0');
  sphere(g, 0.2, [0, 1.25, 0], '#ffffff');
}

function streetLamp(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  parent.add(g);
  cylinder(g, 0.07, 3.4, [0, 1.7, 0], palette.metal);
  box(g, [0.75, 0.07, 0.15], [0.3, 3.38, 0], '#334155');
  box(g, [0.35, 0.18, 0.28], [0.55, 3.28, 0], palette.nightLamp, 0.04);
}

export function createExterior(parent: THREE.Group, model: WorldModel) {
  // Layer 1: Alas Platform (Top <= -0.02, castShadow = false)
  box(parent, [62, 0.4, 42], [0, -0.25, 0], '#cfd8e8', 0.2, false);

  // Layer 2: Tanah / Rumput (Top = 0.000, castShadow = false)
  box(parent, [58, 0.08, 38], [0, -0.04, 0], palette.ground, 0.035, false);

  // Layer 3: Apron Gudang & Paving Plaza (Top = 0.030, tebal 0.05, castShadow = false)
  box(parent, [10, 0.05, 7.6], [4, 0.005, 0], '#f8fafc', 0.035, false);
  box(parent, [16, 0.05, 7.0], [18, 0.005, 5.8], '#dce5f2', 0.035, false);

  // Layer 4: Badan Jalan Utama (Top = 0.040, tebal 0.06, menembus tanah ke -0.02, castShadow = false)
  // Jalan utama timur-barat di Z = 12
  box(parent, [58, 0.06, 6.4], [0, 0.01, 12], palette.road, 0, false);
  // Cabang jalan simpang ke utara (arah kantor/plaza) di X = 0
  box(parent, [5.2, 0.06, 5.8], [0, 0.01, 5.9], palette.road, 0, false);

  // Layer 5: Marka Jalan, Zebra Cross & Garis Dermaga (Top = 0.052, tebal 0.012, castShadow = false)
  // Marka tengah putus-putus
  for (let x = -27; x < 28; x += 3.5) {
    if (Math.abs(x) > 3.0) {
      box(parent, [1.8, 0.012, 0.14], [x, 0.046, 12], '#ffffff', 0, false);
    }
  }
  // Marka garis tepi jalan
  box(parent, [58, 0.012, 0.12], [0, 0.046, 9.1], '#ffffff', 0, false);
  box(parent, [58, 0.012, 0.12], [0, 0.046, 14.9], '#ffffff', 0, false);
  // Marka kuning dermaga gudang
  box(parent, [15.6, 0.012, 0.12], [18, 0.046, 9.1], palette.dockStripe, 0, false);
  for (let i = 0; i < 4; i++) {
    box(parent, [0.1, 0.012, 3.2], [14 + i * 2.6, 0.046, 5.8], palette.dockStripe, 0, false);
  }

  // Zebra Cross Simpang (3 Penyeberangan)
  for (let i = 0; i < 6; i++) {
    // Zebra penyeberangan barat (X = -3.8)
    box(parent, [0.65, 0.012, 0.5], [-3.8, 0.046, 9.5 + i * 0.9], '#ffffff', 0, false);
    // Zebra penyeberangan timur (X = 3.8)
    box(parent, [0.65, 0.012, 0.5], [3.8, 0.046, 9.5 + i * 0.9], '#ffffff', 0, false);
  }
  // Zebra penyeberangan cabang utara (Z = 8.5)
  for (let i = 0; i < 5; i++) {
    box(parent, [0.5, 0.012, 0.65], [-1.8 + i * 0.9, 0.046, 8.5], '#ffffff', 0, false);
  }

  // Layer 6: Trotoar & Kerb (Top = 0.120, tebal 0.14, castShadow = true)
  box(parent, [58, 0.14, 2.0], [0, 0.05, 16.2], palette.sidewalk, 0.035, true);
  box(parent, [25.4, 0.14, 2.2], [-16.3, 0.05, 7.7], palette.sidewalk, 0.035, true);
  box(parent, [25.4, 0.14, 2.2], [16.3, 0.05, 7.7], palette.sidewalk, 0.035, true);
  // Trotoar pedestrian penghubung utara-selatan
  box(parent, [58, 0.06, 2.4], [0, 0.02, -4.8], palette.sidewalk, 0.035, false);
  for (const wx of [-18, -5, 4, 18]) {
    box(parent, [2.4, 0.06, 10.2], [wx, 0.02, 1.4], palette.sidewalk, 0.035, false);
  }

  // Simpang Lampu Merah (Traffic Lights) di X = -3.2 dan X = 3.2
  const tlWest = createTrafficLight(parent, -3.2, 8.6, 0);
  const tlEast = createTrafficLight(parent, 3.2, 8.6, Math.PI);
  const trafficLights = [tlWest, tlEast];

  // Area Parkir Mobil Manajer di X = -18, Z = 6.5
  box(parent, [11, 0.035, 5.0], [-17, 0.005, 6.5], '#475569', 0.035, false);
  for (let px = -21; px <= -13; px += 2.8) {
    box(parent, [0.1, 0.012, 3.4], [px, 0.025, 6.5], '#ffffff', 0, false);
  }
  createCar(parent, [-18.2, 0, 6.5], palette.blue, 0, 'kendaraan-manajer');

  // Gudang Logistik Solid (3 Dermaga) di X = 18, Z = 3.8
  createWarehouse(parent, 18, 3.8);
  // Van Distribusi di slot parkir dermaga
  createVan(parent, [15.2, 0, 7.0], '#fafcff', 0, 'kendaraan-van');
  // Truk Ekspedisi Mitra di dermaga bongkar muat gudang
  const mitraTruck = createTruck(parent, [20.8, 0, 6.8], '#0f766e', Math.PI, 'kendaraan-truk-mitra');

  // Pool Armada Lalu Lintas Bergerak di Jalan Raya
  const trafficMotor = createMotorcycle(parent, [-40, 0, 10.8], '#79c8a0', 0, 'kendaraan-motor', '#334155', '#ef4444');
  const trafficCar = createCar(parent, [-40, 0, 10.8], palette.blue, 0, 'kendaraan-manajer');
  const trafficVan = createVan(parent, [-40, 0, 10.8], '#fafcff', 0, 'kendaraan-van');
  const trafficTruck = createTruck(parent, [-40, 0, 10.8], palette.navy, 0, 'kendaraan-truk');

  // Clone material untuk transparansi fade halus tanpa mempengaruhi objek lain
  const makeFadeable = (g: THREE.Group) => {
    g.traverse((c) => {
      if (c instanceof THREE.Mesh && c.material) {
        c.material = (c.material as THREE.Material).clone();
        c.material.transparent = true;
      }
    });
    g.visible = false;
  };
  makeFadeable(trafficMotor);
  makeFadeable(trafficCar);
  makeFadeable(trafficVan);
  makeFadeable(trafficTruck);

  const trafficPool = {
    motor: trafficMotor,
    mobil: trafficCar,
    van: trafficVan,
    truk: trafficTruck,
  };
  const movingTruck = trafficTruck;

  // Plaza Air Mancur di X = 4, Z = 0
  fountain(parent, 4, 0);
  // 4 Bangku di Plaza dengan SeatAnchor
  const benchSouth = bench(parent, 4, 2.6, Math.PI);
  const benchNorth = bench(parent, 4, -2.6, 0);
  const benchWest = bench(parent, 0.6, 0, Math.PI / 2);
  const benchEast = bench(parent, 7.4, 0, -Math.PI / 2);
  const seatAnchors = [benchSouth, benchNorth, benchWest, benchEast];

  // Gedung Kantor Koperasi di X = -5, Z = 0
  building(parent, -5, 0, 'Koperasi', true);

  // 7 Lahan Gerai
  for (const plot of model.plots) {
    const [x, z] = plot.position;
    if (plot.unit) {
      building(parent, x, z, String(plot.unit.data.title), false, plot.id);
    } else {
      const g = box(parent, [4.8, 0.06, 3.6], [x, 0.02, z], '#d3e6db', 0.035, false);
      g.userData.selection = plot.id;
      for (const side of [-1, 1]) {
        box(parent, [4.9, 0.03, 0.06], [x, 0.07, z + side * 1.8], '#ffffff', 0, false);
        box(parent, [0.06, 0.03, 3.6], [x + side * 2.45, 0.07, z], '#ffffff', 0, false);
        for (let i = 0; i < 5; i++) {
          box(parent, [0.08, 0.38, 0.08], [x - 2.0 + i * 1.0, 0.2, z + side * 1.8], '#a3b9aa');
        }
      }
      box(parent, [0.8, 0.06, 0.16], [x, 0.08, z], '#79a88c', 0, false);
      box(parent, [0.16, 0.06, 0.8], [x, 0.08, z], '#79a88c', 0, false);
    }
  }

  // Tiang Lampu Jalan (Streetlamps)
  for (const lx of [-24, -12, 0, 12, 24]) {
    streetLamp(parent, lx, 8.4);
    streetLamp(parent, lx, 15.6);
  }
  streetLamp(parent, -1, 3.2);
  streetLamp(parent, 9, 3.2);

  // Pepohonan Hijau Kawasan
  for (const tx of [-26, -21, -15, -9, 0, 9, 15, 21, 26]) {
    tree(parent, tx, -16, 1.15);
  }
  for (const tz of [-12, -6, 0, 6]) {
    tree(parent, -26, tz, 1.0);
    tree(parent, 26, tz, 1.0);
  }
  tree(parent, -0.8, -2.6, 0.85);
  tree(parent, 8.8, -2.6, 0.85);
  tree(parent, -0.8, 2.6, 0.85);
  tree(parent, 8.8, 2.6, 0.85);

  return { movingTruck, trafficPool, mitraTruck, trafficLights, seatAnchors };
}

function chair(parent: THREE.Object3D, x: number, z: number, rotation = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotation;
  parent.add(g);
  box(g, [0.64, 0.14, 0.63], [0, 0.55, 0], '#7891b3');
  box(g, [0.64, 0.7, 0.13], [0, 0.92, -0.26], '#7891b3', 0.06);
  cylinder(g, 0.06, 0.48, [0, 0.25, 0], palette.ink);
  box(g, [0.65, 0.05, 0.08], [0, 0.05, 0], palette.ink);
  box(g, [0.08, 0.05, 0.65], [0, 0.05, 0], palette.ink);
}

export function createInterior(parent: THREE.Group) {
  // Base platform: 23 x 0.35 x 16 (Top = -0.05)
  box(parent, [23, 0.35, 16], [0, -0.22, 0], '#d8e0eb', 0.12, false);
  // Floor (Top = 0.000): light warm parquet / modern birch wood floor
  box(parent, [22.4, 0.06, 15.4], [0, -0.02, 0], '#f6f5f1', 0.035, false);
  // Parquet plank line grooves
  for (let x = -10.5; x <= 10.5; x += 1.5) {
    box(parent, [0.015, 0.01, 15.2], [x, 0.012, 0], '#e3e4e8', 0, false);
  }
  for (let z = -7; z <= 7; z += 1.5) {
    box(parent, [22.2, 0.01, 0.015], [0, 0.012, z], '#e3e4e8', 0, false);
  }

  // Cutaway walls (North wall at z = -7.6, West wall at x = -11.1)
  box(parent, [22.4, 4.0, 0.25], [0, 1.9, -7.6], '#f8fbff', 0.05);
  box(parent, [0.25, 4.0, 15.4], [-11.1, 1.9, 0], '#e9eff8', 0.05);

  // Large office windows on North wall with sky tint
  for (let x = -9; x <= 9; x += 3.6) {
    box(parent, [2.4, 2.0, 0.08], [x, 2.3, -7.48], '#b8d4ec', 0.04);
    box(parent, [0.08, 2.1, 0.12], [x, 2.3, -7.42], '#839bb9', 0);
    box(parent, [2.6, 0.18, 0.2], [x, 3.32, -7.38], '#fafcff', 0.02);
  }

  // Modern glass partition dividing West Meeting Zone from Central Workstation
  box(parent, [0.08, 2.6, 5.8], [-4.2, 1.3, -4.5], '#c9e0ec', 0.02);
  for (const z of [-7.2, -1.8]) {
    box(parent, [0.12, 2.7, 0.12], [-4.2, 1.35, z], '#fafcff', 0.02);
  }

  // ==========================================
  // ZONA A: MEJA RAPAT EKSEKUTIF (Barat-Utara: x: -10...-5, z: -7...-2)
  // ==========================================
  // Meja rapat kayu madu solid luas (5.2 x 2.2)
  box(parent, [5.2, 0.18, 2.2], [-7.5, 1.0, -4.5], palette.wood, 0.15);
  for (const x of [-9.5, -5.5]) {
    for (const z of [-5.2, -3.8]) {
      box(parent, [0.14, 0.9, 0.14], [x, 0.45, z], '#edf2f9', 0.02);
    }
  }
  // 6 Kursi rapat eksekutif dengan ruang gerak lega
  for (const x of [-9.0, -7.5, -6.0]) {
    chair(parent, x, -6.0, 0); // Kursi sisi utara (hadap selatan)
    chair(parent, x, -3.0, Math.PI); // Kursi sisi selatan (hadap utara)
  }
  // Laptop eksekutif & proyektor mini di meja
  box(parent, [0.8, 0.03, 0.55], [-7.8, 1.11, -4.5], '#fafcff', 0.02);
  cylinder(parent, 0.16, 0.22, [-6.2, 1.2, -4.5], palette.blue);
  // Layar presentasi dinding putih
  box(parent, [3.8, 1.8, 0.06], [-7.5, 2.6, -7.45], '#ffffff', 0.03);
  box(parent, [3.6, 1.6, 0.02], [-7.5, 2.6, -7.4], '#dbeafe', 0);

  // ==========================================
  // ZONA B: WORKSTATION OPERASIONAL & TUGAS (Tengah-Utara: x: -3.5...3.5, z: -7...-2)
  // ==========================================
  // 2 Baris Meja Kerja (2x2) dengan partisi kaca tempered
  for (const z of [-5.6, -3.2]) {
    box(parent, [6.2, 0.14, 1.3], [0, 1.0, z], '#ffffff', 0.05);
    for (const x of [-2.8, 2.8]) {
      box(parent, [0.14, 1.0, 1.1], [x, 0.5, z], '#d1dbe9', 0.02);
    }
    // Komputer PC All-in-One dan kursi di tiap meja
    for (const x of [-1.8, 1.8]) {
      box(parent, [0.95, 0.6, 0.08], [x, 1.55, z - 0.2], '#344761', 0.03); // Monitor frame
      box(parent, [0.86, 0.5, 0.02], [x, 1.56, z - 0.14], '#8ebcfa', 0.01); // Glowing screen
      box(parent, [0.08, 0.3, 0.1], [x, 1.15, z - 0.2], '#6f8198', 0.02); // Stand
      box(parent, [0.65, 0.04, 0.24], [x, 1.085, z + 0.25], '#cbd5e1', 0.02); // Keyboard
      chair(parent, x, z + 1.25, Math.PI); // Kursi kerja
    }
  }

  // ==========================================
  // ZONA C: ARSIP & LEGALITAS KOPERASI (Barat-Selatan: x: -10...-5, z: 2...7)
  // ==========================================
  for (const x of [-9.6, -7.6, -5.6]) {
    box(parent, [1.5, 2.0, 0.85], [x, 1.0, 5.6], palette.wood, 0.06);
    box(parent, [1.54, 0.14, 0.9], [x, 2.06, 5.6], '#ffffff', 0.03);
    for (let i = 0; i < 6; i++) {
      box(
        parent,
        [0.15, 0.5, 0.35],
        [x - 0.5 + i * 0.2, 2.38, 5.6],
        ['#6d91dd', '#b7b6e0', '#88b9a4', '#f59e0b'][i % 4],
        0.02,
      );
    }
  }
  // Tanaman pot keramik di sudut arsip
  tree(parent, -10.0, 3.0, 0.9);

  // ==========================================
  // ZONA D: GYM & KEGIATAN MODERN (Timur-Selatan: x: 5...10.5, z: 2...7)
  // ==========================================
  // Matras slate gelap (5.6 x 4.8)
  box(parent, [5.6, 0.04, 4.8], [7.8, 0.02, 4.6], '#334155', 0.1, false);
  box(parent, [5.3, 0.02, 4.5], [7.8, 0.04, 4.6], '#475569', 0, false);

  // Dual modern treadmills
  for (const tx of [6.4, 9.2]) {
    box(parent, [1.15, 0.24, 2.2], [tx, 0.16, 4.8], '#1e293b', 0.06);
    box(parent, [0.85, 0.04, 1.9], [tx, 0.29, 4.8], '#0f172a', 0);
    for (const side of [-1, 1]) {
      box(parent, [0.08, 1.3, 0.08], [tx + side * 0.5, 0.88, 3.85], '#94a3b8');
      box(parent, [0.06, 0.08, 0.8], [tx + side * 0.5, 1.5, 4.2], '#475569');
    }
    box(parent, [1.1, 0.2, 0.36], [tx, 1.52, 3.85], '#1e293b', 0.04);
    box(parent, [0.7, 0.12, 0.02], [tx, 1.54, 3.66], '#10b981', 0); // Green LED
  }

  // Workout training bench
  box(parent, [0.75, 0.38, 1.6], [7.8, 0.22, 2.8], '#1e293b', 0.04);
  box(parent, [0.65, 0.1, 1.5], [7.8, 0.44, 2.8], '#2563eb', 0.05);

  // Dumbbell rack
  box(parent, [1.5, 0.7, 0.55], [10.1, 0.38, 2.8], '#334155', 0.04);
  for (let i = 0; i < 3; i++) {
    box(parent, [0.38, 0.18, 0.18], [9.6 + i * 0.45, 0.8, 2.8], ['#3866f6', '#ef4444', '#10b981'][i], 0.04);
  }

  // Water cooler dispenser
  cylinder(parent, 0.22, 0.8, [10.3, 0.48, 6.4], '#ffffff');
  cylinder(parent, 0.18, 0.5, [10.3, 1.1, 6.4], '#60a5fa');

  // ==========================================
  // ZONA E: POJOK SANTAI & PANTRY (Timur-Utara: x: 5...10.5, z: -7...-2)
  // ==========================================
  // Sofa empuk santai
  box(parent, [2.4, 0.45, 0.95], [7.8, 0.28, -5.6], '#475569', 0.08);
  box(parent, [2.4, 0.65, 0.3], [7.8, 0.65, -6.1], '#334155', 0.08);
  for (const side of [-1, 1]) {
    box(parent, [0.25, 0.5, 0.95], [7.8 + side * 1.2, 0.45, -5.6], '#334155', 0.06);
  }
  // Meja kopi kayu
  box(parent, [1.6, 0.35, 0.8], [7.8, 0.22, -4.0], palette.wood, 0.06);
  cylinder(parent, 0.08, 0.12, [7.8, 0.45, -4.0], '#fafcff');
  // Tanaman hias pot
  tree(parent, 10.2, -5.6, 0.9);

  // ==========================================
  // ZONA F: LOBI & PINTU MASUK (Tengah-Selatan: x: -3.5...3.5, z: 2...7)
  // ==========================================
  // Bangku tunggu di lobi
  bench(parent, 0, 5.2, 0);
  // Pintu masuk utama (Portal di z = 7.4)
  box(parent, [3.2, 3.2, 0.15], [0, 1.6, 7.55], '#1e293b', 0.04);
  box(parent, [2.8, 2.8, 0.08], [0, 1.45, 7.58], palette.glass, 0.02);
  // Tanaman penyambut di lobi
  tree(parent, -2.4, 5.4, 0.85);
  tree(parent, 2.4, 5.4, 0.85);
}

export type WorldCharacter = {
  group: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  head: THREE.Group;
  base: THREE.Vector3;
};
export function createCharacter(
  parent: THREE.Group,
  position: [number, number, number],
  color: string,
  variant = 0,
  role: 'manager' | 'staff' | 'npc' = 'npc',
): WorldCharacter {
  const g = new THREE.Group();
  g.position.set(...position);
  g.userData.characterRole = role;
  parent.add(g);
  const skin = ['#e8b18b', '#bd825e', '#efc6a0'][variant % 3];
  sphere(g, 0.34, [0, 0.95, 0], color, [1, 1.1, 0.65]);

  // Role accents: Manager has collared shirt & red tie; Staff has ID lanyard
  if (role === 'manager') {
    box(g, [0.16, 0.26, 0.04], [0, 1.05, 0.22], '#ffffff', 0.02);
    box(g, [0.05, 0.18, 0.05], [0, 0.98, 0.23], '#ef4444', 0.02);
  } else if (role === 'staff') {
    box(g, [0.12, 0.2, 0.03], [0, 0.96, 0.22], '#3866f6', 0.02);
    box(g, [0.07, 0.09, 0.04], [0, 0.88, 0.23], '#ffffff', 0.02);
  }

  const head = new THREE.Group();
  head.position.y = 1.58;
  g.add(head);
  sphere(head, 0.33, [0, 0, 0], skin, [0.96, 1.06, 0.9]);
  sphere(head, 0.34, [0, 0.14, -0.05], '#34364b', [1, 0.72, 0.93]);
  for (const side of [-1, 1]) {
    sphere(head, 0.035, [side * 0.105, 0.01, 0.284], '#26334b');
    sphere(head, 0.055, [side * 0.2, -0.09, 0.235], '#da9382', [1, 0.55, 0.25]);
  }
  box(head, [0.085, 0.023, 0.025], [0, -0.14, 0.291], '#864d44');
  if (variant === 1) sphere(head, 0.2, [0, 0.33, -0.2], '#34364b');
  if (variant === 2) {
    box(head, [0.7, 0.07, 0.52], [0, 0.27, 0.03], color, 0.04);
    sphere(head, 0.3, [0, 0.24, -0.03], color, [1, 0.45, 1]);
  }
  const limb = (x: number, y: number, isArm: boolean) => {
    const group = new THREE.Group();
    group.position.set(x, y, 0);
    g.add(group);
    box(group, [isArm ? 0.16 : 0.2, 0.36, 0.2], [0, -0.15, 0], isArm ? color : '#394862', 0.07);
    if (isArm) sphere(group, 0.105, [0, -0.37, 0], skin);
    else box(group, [0.23, 0.14, 0.35], [0, -0.37, 0.07], '#fafcff', 0.06);
    return group;
  };
  return {
    group: g,
    head,
    leftArm: limb(-0.34, 1.17, true),
    rightArm: limb(0.34, 1.17, true),
    leftLeg: limb(-0.15, 0.53, false),
    rightLeg: limb(0.15, 0.53, false),
    base: g.position.clone(),
  };
}
export function animateCharacter(
  character: WorldCharacter,
  time: number,
  activity: CharacterActivity,
  reduced: boolean,
  isWalking = false,
) {
  const t = reduced ? 0 : time;
  character.group.position.copy(character.base);

  if (isWalking && !reduced) {
    const stride = Math.sin(t * 7) * 0.65;
    character.group.position.y += Math.abs(Math.sin(t * 7)) * 0.04;
    character.leftLeg.rotation.x = stride;
    character.rightLeg.rotation.x = -stride;
    character.leftArm.rotation.x = -stride * 0.8;
    character.rightArm.rotation.x = stride * 0.8;
    character.leftArm.rotation.z = 0.05;
    character.rightArm.rotation.z = -0.05;
    character.head.rotation.y = Math.sin(t * 1.5) * 0.08;
    return;
  }

  if (activity === 'greet') {
    character.leftLeg.rotation.x = 0;
    character.rightLeg.rotation.x = 0;
    character.leftArm.rotation.x = 0;
    character.leftArm.rotation.z = 0.05;
    character.rightArm.rotation.x = -0.2;
    character.rightArm.rotation.z = reduced ? -1.8 : -2.2 + Math.sin(t * 8) * 0.35;
    character.head.rotation.y = reduced ? 0 : Math.sin(t * 2) * 0.12;
    return;
  }

  if (activity === 'talk') {
    character.leftLeg.rotation.x = 0;
    character.rightLeg.rotation.x = 0;
    character.leftArm.rotation.x = reduced ? 0 : Math.sin(t * 3) * 0.12;
    character.rightArm.rotation.x = reduced ? 0 : -Math.cos(t * 3) * 0.12;
    character.head.rotation.y = reduced ? 0 : Math.sin(t * 4) * 0.16;
    character.head.rotation.x = reduced ? 0 : Math.abs(Math.sin(t * 4)) * 0.08;
    return;
  }

  if (activity === 'gym') {
    const stride = reduced ? 0 : Math.sin(t * 8) * 0.82;
    character.group.position.y += reduced ? 0 : Math.abs(Math.sin(t * 8)) * 0.09;
    character.leftLeg.rotation.x = stride;
    character.rightLeg.rotation.x = -stride;
    character.leftArm.rotation.x = -stride * 0.75;
    character.rightArm.rotation.x = stride * 0.75;
    character.leftArm.rotation.z = 0.15;
    character.rightArm.rotation.z = -0.15;
    character.head.rotation.y = Math.sin(t * 0.8) * 0.05;
    return;
  }

  if (activity === 'meeting') {
    character.group.position.y -= 0.18;
    character.leftLeg.rotation.x = -1.38;
    character.rightLeg.rotation.x = -1.38;
    character.leftArm.rotation.x = -0.65 + (reduced ? 0 : Math.sin(t * 2) * 0.05);
    character.rightArm.rotation.x = -0.65 + (reduced ? 0 : Math.cos(t * 2) * 0.05);
    character.leftArm.rotation.z = 0.08;
    character.rightArm.rotation.z = -0.08;
    character.head.rotation.y = reduced ? 0 : Math.sin(t * 0.6) * 0.14;
    return;
  }

  if (activity === 'work') {
    character.group.position.y -= 0.16;
    character.leftLeg.rotation.x = -1.35;
    character.rightLeg.rotation.x = -1.35;
    character.leftArm.rotation.x = -0.85 + (reduced ? 0 : Math.sin(t * 6) * 0.08);
    character.rightArm.rotation.x = -0.85 + (reduced ? 0 : Math.cos(t * 6) * 0.08);
    character.leftArm.rotation.z = 0.05;
    character.rightArm.rotation.z = -0.05;
    character.head.rotation.y = reduced ? 0 : Math.sin(t * 0.5) * 0.08;
    return;
  }

  // Idle
  character.group.position.y += reduced ? 0 : Math.sin(t * 2) * 0.025;
  character.leftLeg.rotation.x = 0;
  character.rightLeg.rotation.x = 0;
  character.leftArm.rotation.x = 0;
  character.rightArm.rotation.x = 0;
  character.leftArm.rotation.z = 0.05;
  character.rightArm.rotation.z = reduced ? -0.1 : -0.22 + Math.sin(t * 2.5) * 0.14;
  character.head.rotation.y = reduced ? 0 : Math.sin(t * 0.7) * 0.12;
}
