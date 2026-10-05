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

export function createSelectionBrackets(parent: THREE.Object3D): THREE.Group {
  const g = new THREE.Group();
  g.visible = false;
  parent.add(g);
  const color = '#3866f6';
  const size = 0.55;
  const thick = 0.045;
  const corners = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  for (const [cx, cz] of corners) {
    const cg = new THREE.Group();
    cg.position.set(cx * 1.5, 0.05, cz * 1.5);
    box(cg, [size, thick, thick], [-cx * (size / 2), 0, 0], color, 0, false);
    box(cg, [thick, thick, size], [0, 0, -cz * (size / 2)], color, 0, false);
    g.add(cg);
  }
  return g;
}

export function createWarehouse(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.userData.selection = 'gudang';
  parent.add(g);

  // Warehouse main building: 14.2 x 4.0 x 6.4 (berbobot dan solid)
  box(g, [14.2, 4.0, 6.4], [0, 2.05, 0], palette.warehouse, 0.12);
  // Lis navy & atap gable bergaris
  box(g, [14.6, 0.38, 6.8], [0, 4.18, 0], palette.navy, 0.08);
  for (let i = -6.4; i <= 6.4; i += 1.6) {
    box(g, [0.1, 0.08, 6.7], [i, 4.4, 0], '#648cfb', 0);
  }
  // Skylight strip di atap
  box(g, [9.6, 0.08, 1.4], [0, 4.44, 0], palette.glass, 0.02);

  // 3 Rolling door bays on front facade (z = 3.2)
  const bayX = [-4.4, 0, 4.4];
  // Bay 1: Closed rolling door with horizontal ridges & canopy
  box(g, [3.2, 2.7, 0.14], [bayX[0], 1.45, 3.24], '#3b82f6', 0.04);
  for (let y = 0.35; y <= 2.65; y += 0.32) {
    box(g, [3.16, 0.05, 0.08], [bayX[0], y, 3.32], '#1d4ed8', 0);
  }
  box(g, [3.6, 0.32, 0.35], [bayX[0], 2.92, 3.35], palette.navy, 0.04);

  // Bay 2: Open bay showing stacked pallets inside
  box(g, [3.2, 2.7, 0.16], [bayX[1], 1.45, 3.2], '#1e293b', 0.03);
  cylinder(g, 0.25, 3.2, [bayX[1], 2.7, 3.2], palette.blue).rotation.z = Math.PI / 2;
  // Inside pallets & cargo
  box(g, [1.5, 0.16, 1.3], [bayX[1] - 0.5, 0.22, 2.0], palette.wood);
  box(g, [1.3, 0.7, 1.1], [bayX[1] - 0.5, 0.65, 2.0], '#cbd5e1', 0.04);
  box(g, [1.5, 0.16, 1.3], [bayX[1] + 0.5, 0.22, 1.8], palette.wood);
  box(g, [1.2, 0.85, 1.0], [bayX[1] + 0.5, 0.75, 1.8], '#b45309', 0.04);

  // Bay 3: Active Loading Dock with protective canopy
  box(g, [3.2, 2.7, 0.14], [bayX[2], 1.45, 3.24], '#2563eb', 0.04);
  box(g, [4.8, 0.2, 2.8], [bayX[2], 3.25, 4.5], palette.navy, 0.08);
  cylinder(g, 0.08, 3.2, [bayX[2] - 2.1, 1.6, 5.7], palette.metal);
  cylinder(g, 0.08, 3.2, [bayX[2] + 2.1, 1.6, 5.7], palette.metal);
  // Dock bumper rubber blocks
  box(g, [0.3, 0.7, 0.25], [bayX[2] - 1.3, 0.55, 3.38], '#0f172a');
  box(g, [0.3, 0.7, 0.25], [bayX[2] + 1.3, 0.55, 3.38], '#0f172a');

  // Sign on warehouse
  sign(g, 'GUDANG LOGISTIK KDMP', [0, 3.75, 3.28], 5.6, '#2443a6');

  // Forklift on apron
  createForklift(g, [-2.6, 0, 5.2], -Math.PI * 0.25);

  // Pallet stack on apron
  box(g, [1.5, 0.16, 1.3], [2.6, 0.14, 5.5], palette.wood);
  box(g, [1.3, 0.75, 1.1], [2.6, 0.6, 5.5], '#3b82f6', 0.05);

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
  const bulb = box(g, [0.35, 0.18, 0.28], [0.55, 3.28, 0], palette.nightLamp, 0.04);
  bulb.material = (bulb.material as THREE.MeshStandardMaterial).clone();

  // Pendar cahaya lembut di tanah (disk datar layer 3)
  const glow = cylinder(g, 1.3, 0.005, [0.55, 0.042, 0], '#fef08a');
  glow.material = (glow.material as THREE.MeshStandardMaterial).clone();
  glow.material.transparent = true;
  glow.material.opacity = 0;

  return { bulb, glow };
}

export function createExterior(parent: THREE.Group, model: WorldModel) {
  // Layer 1: Alas Platform (X: -36 s/d 52, Z: -21 s/d 23)
  box(parent, [88, 0.4, 44], [8, -0.25, 1], '#cfd8e8', 0.2, false);

  // Layer 2: Tanah / Rumput (X: -34 s/d 50, Z: -19 s/d 21)
  box(parent, [84, 0.08, 40], [8, -0.04, 1], palette.ground, 0.035, false);

  // Layer 3: Paving Plaza Tengah & Apron Gudang
  box(parent, [10, 0.05, 7.6], [4, 0.005, 0], '#f8fafc', 0.035, false);
  box(parent, [16, 0.05, 8.5], [30, 0.005, 5.2], '#dce5f2', 0.035, false);

  // Layer 4: Badan Jalan Utama (Z = 12) & Jalan Sisi Kanan (X = 43.2)
  box(parent, [84, 0.06, 6.4], [8, 0.01, 12], palette.road, 0, false);
  box(parent, [6.4, 0.06, 30.0], [43.2, 0.01, -3.0], palette.road, 0, false);
  // Plaza promenade pejalan kaki taman di tengah menghubungkan trotoar selatan ke taman air mancur di X = 0
  box(parent, [4.4, 0.05, 5.8], [0, 0.008, 5.9], '#f8fafc', 0.035, false);

  // Layer 5: Marka Jalan, Zebra Cross & Garis Dermaga (Top = 0.052, tebal 0.012, castShadow = false)
  // Marka tengah jalan utama selatan (putus-putus)
  for (let x = -32; x < 38; x += 3.5) {
    box(parent, [1.8, 0.012, 0.14], [x, 0.046, 12], '#ffffff', 0, false);
  }
  for (let x = 48.5; x < 49; x += 3.5) {
    box(parent, [1.8, 0.012, 0.14], [x, 0.046, 12], '#ffffff', 0, false);
  }
  // Marka tengah jalan raya sisi kanan ke arah utara di X = 43.2
  for (let z = 8.0; z > -17.5; z -= 3.5) {
    box(parent, [0.14, 0.012, 1.8], [43.2, 0.046, z], '#ffffff', 0, false);
  }
  // Garis tepi jalan utama selatan
  box(parent, [74, 0.012, 0.12], [2, 0.046, 9.1], '#ffffff', 0, false);
  box(parent, [84, 0.012, 0.12], [8, 0.046, 14.9], '#ffffff', 0, false);
  // Garis tepi jalan raya sisi kanan
  box(parent, [0.12, 0.012, 26.5], [40.1, 0.046, -5.25], '#ffffff', 0, false);
  box(parent, [0.12, 0.012, 32.5], [46.3, 0.046, -2.25], '#ffffff', 0, false);

  // Garis henti (Stop Lines) Simpang Kanan X = 43.2, Z = 12
  box(parent, [0.35, 0.012, 2.8], [39.0, 0.046, 10.8], '#ffffff', 0, false); // Arah timur
  box(parent, [0.35, 0.012, 2.8], [47.2, 0.046, 13.2], '#ffffff', 0, false); // Arah barat
  box(parent, [2.8, 0.012, 0.35], [44.5, 0.046, 8.5], '#ffffff', 0, false); // Dari utara

  // Marka kuning dermaga gudang di X = 30
  box(parent, [15.6, 0.012, 0.12], [30, 0.046, 9.1], palette.dockStripe, 0, false);
  for (let i = 0; i < 4; i++) {
    box(parent, [0.1, 0.012, 3.4], [25.5 + i * 3.0, 0.046, 5.8], palette.dockStripe, 0, false);
  }

  // Zebra Cross Simpang Kanan & Promenade
  for (let i = 0; i < 6; i++) {
    box(parent, [0.65, 0.012, 0.5], [38.2, 0.046, 9.5 + i * 0.9], '#ffffff', 0, false);
    box(parent, [0.65, 0.012, 0.5], [0, 0.046, 9.5 + i * 0.9], '#ffffff', 0, false);
  }
  for (let i = 0; i < 5; i++) {
    box(parent, [0.5, 0.012, 0.65], [41.2 + i * 0.9, 0.046, 8.0], '#ffffff', 0, false);
  }

  // Layer 6: Trotoar & Kerb (Top = 0.120, tebal 0.14, castShadow = true)
  // Trotoar tepi selatan platform
  box(parent, [84, 0.14, 2.2], [8, 0.05, 16.3], palette.sidewalk, 0.035, true);
  // Trotoar utara jalan selatan (dari barat X = -34 hingga simpang kanan X = 39)
  box(parent, [73, 0.14, 2.2], [2.5, 0.05, 7.7], palette.sidewalk, 0.035, true);
  // Trotoar barat jalan raya sisi kanan
  box(parent, [1.8, 0.14, 26.5], [39.0, 0.05, -5.25], palette.sidewalk, 0.035, true);
  // Trotoar timur jalan raya sisi kanan
  box(parent, [2.2, 0.14, 34.0], [47.5, 0.05, -1.0], palette.sidewalk, 0.035, true);

  // Trotoar pedestrian penghubung kawasan gerai
  box(parent, [48.0, 0.06, 2.4], [4.0, 0.02, -4.8], palette.sidewalk, 0.035, false);
  for (const wx of [-18, -5, 4, 18]) {
    box(parent, [2.4, 0.06, 10.2], [wx, 0.02, 1.4], palette.sidewalk, 0.035, false);
  }

  // Simpang Lampu Merah Modular (Traffic Lights) di Simpang Kanan X = 43.2
  const tlWest = createTrafficLight(parent, 38.6, 8.4, 0);
  const tlEast = createTrafficLight(parent, 47.6, 15.6, Math.PI);
  const tlNorth = createTrafficLight(parent, 46.8, 8.4, -Math.PI / 2);
  const trafficLights = [tlWest, tlEast, tlNorth];

  // Area Parkir Mobil Manajer di Dekat Lahan 06 (X = -18, Z = 5.2) — Paving rata lembut, wheel stops & carport teduh
  box(parent, [8.8, 0.05, 4.4], [-18, 0.015, 5.2], '#dbe5f2', 0.04, false);
  for (let px = -21; px <= -15; px += 2.8) {
    box(parent, [0.12, 0.012, 3.6], [px, 0.048, 5.2], '#ffffff', 0, false);
  }
  box(parent, [1.6, 0.12, 0.16], [-18.2, 0.06, 3.6], '#94a3b8');
  for (const cx of [-20.0, -16.4]) {
    for (const cz of [3.3, 7.1]) {
      cylinder(parent, 0.04, 2.5, [cx, 1.25, cz], palette.metal);
    }
  }
  box(parent, [4.2, 0.12, 4.4], [-18.2, 2.52, 5.2], '#93c5fd', 0.06);
  box(parent, [4.3, 0.06, 4.5], [-18.2, 2.58, 5.2], '#ffffff', 0.02);
  createCar(parent, [-18.2, 0, 5.2], palette.blue, 0, 'kendaraan-manajer');

  // Gudang Logistik Solid (3 Dermaga) di X = 30, Z = -1.5 (Lahan 7 di X = 18 kini bebas total!)
  createWarehouse(parent, 30, -1.5);
  // Van Distribusi di slot parkir dermaga
  createVan(parent, [25.8, 0, 6.2], '#fafcff', 0, 'kendaraan-van');
  // Truk Ekspedisi Mitra di dermaga bongkar muat gudang
  const mitraTruck = createTruck(parent, [34.2, 0, 6.2], '#0f766e', Math.PI, 'kendaraan-truk-mitra');

  // Pool Armada Lalu Lintas Bergerak di Jalan Raya
  const trafficMotor = createMotorcycle(parent, [-40, 0, 10.8], '#79c8a0', 0, 'kendaraan-motor', '#334155', '#ef4444');
  const trafficCar = createCar(parent, [-40, 0, 10.8], palette.blue, 0, 'kendaraan-manajer');
  const trafficVan = createVan(parent, [-40, 0, 10.8], '#fafcff', 0, 'kendaraan-van');
  const trafficTruck = createTruck(parent, [-40, 0, 10.8], palette.navy, 0, 'kendaraan-truk');

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

  // 7 Lahan Gerai — PADAT, TEBAL, DAN LEMBUT (Lahan 06 & 07 kini solid tanpa garis-garis pagar tajam)
  for (const plot of model.plots) {
    const [x, z] = plot.position;
    if (plot.unit) {
      building(parent, x, z, String(plot.unit.data.title), false, plot.id);
    } else {
      // Landasan padat tebal berlekuk rounded (bebas garis-garis tipis / z-fighting)
      const g = box(parent, [5.4, 0.22, 4.2], [x, 0.11, z], '#e8f3ee', 0.12, true, true);
      g.userData.selection = plot.id;
      // Hamparan hijau lembut di permukaan pad
      box(parent, [5.0, 0.04, 3.8], [x, 0.23, z], '#edf6f2', 0.06, false, true);
      // 4 Pilar sudut batu bulat lembut pembatas lahan
      for (const cx of [-1, 1]) {
        for (const cz of [-1, 1]) {
          cylinder(parent, 0.11, 0.32, [x + cx * 2.45, 0.25, z + cz * 1.85], '#cbdad2');
          sphere(parent, 0.11, [x + cx * 2.45, 0.42, z + cz * 1.85], '#cbdad2');
        }
      }
      // Plakat batu bulat tengah dengan lambang plus lembut
      cylinder(parent, 0.42, 0.04, [x, 0.26, z], '#ffffff');
      box(parent, [0.52, 0.03, 0.14], [x, 0.29, z], '#3b82f6', 0.02);
      box(parent, [0.14, 0.03, 0.52], [x, 0.29, z], '#3b82f6', 0.02);
    }
  }

  // ==========================================
  // Objek Menarik & Fasilitas di Kawasan Eksterior
  // ==========================================

  // 1. Halte Bus / Angkutan Koperasi di X = -8, Z = 16.6 (Bangku menghadap ke jalan utara)
  box(parent, [5.5, 0.06, 2.6], [-8, 0.13, 16.6], '#cbd5e1', 0.03);
  cylinder(parent, 0.06, 2.6, [-10.2, 1.4, 17.5], palette.metal);
  cylinder(parent, 0.06, 2.6, [-5.8, 1.4, 17.5], palette.metal);
  box(parent, [5.6, 0.15, 2.8], [-8, 2.7, 16.6], '#60a5fa', 0.08);
  bench(parent, -8, 17.2, Math.PI); // Menghadap utara ke arah jalan raya
  sign(parent, 'HALTE KOPERASI', [-8, 2.95, 15.2], 3.8, '#1e3a8a');

  // 2. Kios ATM Center Koperasi di X = -3.2, Z = 16.6
  box(parent, [1.8, 2.4, 1.8], [-3.2, 1.25, 16.6], '#ffffff', 0.08);
  box(parent, [1.9, 0.15, 1.9], [-3.2, 2.48, 16.6], palette.navy, 0.04);
  box(parent, [1.4, 1.6, 0.08], [-3.2, 1.3, 15.65], palette.glass);
  box(parent, [0.8, 1.2, 0.45], [-3.2, 0.8, 16.6], '#1e293b', 0.04); // Mesin ATM
  sign(parent, 'ATM KDMP', [-3.2, 2.15, 15.6], 1.6, '#3866f6');

  // 3. Monumen Gerbang Kawasan di X = 12, Z = 16.6
  box(parent, [3.6, 0.35, 1.4], [12, 0.28, 16.6], '#94a3b8', 0.12);
  box(parent, [3.2, 1.4, 0.6], [12, 1.15, 16.6], palette.wood, 0.1);
  sign(parent, 'KDMP PUNTUKREJO', [12, 1.35, 16.25], 2.8, '#1e3a8a');
  tree(parent, 9.8, 16.6, 0.7);
  tree(parent, 14.2, 16.6, 0.7);

  // 4. Taman Jalur Hijau Selatan & Bangku Santai (Menghadap utara ke kawasan)
  box(parent, [84, 0.06, 3.5], [8, 0.02, 19.5], palette.ground, 0.035, false);
  bench(parent, 2, 17.2, Math.PI); // Menghadap utara ke kawasan

  // 5. Pos Keamanan & Portal Kawasan (Pos Satpam KDMP) di X = -28, Z = 8.5
  box(parent, [2.4, 2.3, 2.0], [-28, 1.2, 8.5], '#ffffff', 0.08);
  box(parent, [2.7, 0.18, 2.3], [-28, 2.4, 8.5], palette.navy, 0.06);
  box(parent, [1.6, 0.9, 0.06], [-28, 1.5, 7.45], palette.glass);
  cylinder(parent, 0.08, 0.16, [-28, 2.56, 8.5], '#f59e0b'); // Lampu hazard pos
  // Palang portal otomatis merah-putih
  cylinder(parent, 0.08, 1.1, [-26.4, 0.55, 9.2], palette.metal);
  box(parent, [3.4, 0.1, 0.08], [-24.6, 1.0, 9.2], '#ffffff', 0.02);
  for (let i = 0; i < 4; i++) {
    box(parent, [0.4, 0.11, 0.09], [-25.8 + i * 0.8, 1.0, 9.2], '#ef4444', 0.01);
  }

  // 6. Tempat Sampah Pilah 3 Tabung Ramah Lingkungan (Organik, Anorganik, B3)
  for (const bx of [-5.5, 6.8]) {
    const bz = bx < 0 ? 15.8 : 2.8;
    cylinder(parent, 0.12, 0.44, [bx - 0.32, 0.24, bz], '#10b981'); // Hijau (Organik)
    cylinder(parent, 0.12, 0.44, [bx, 0.24, bz], '#f59e0b'); // Kuning (Anorganik)
    cylinder(parent, 0.12, 0.44, [bx + 0.32, 0.24, bz], '#3b82f6'); // Biru (Kertas)
  }

  // 7. Stasiun Rak Sepeda Santai di samping kantor X = -10.5, Z = 2.4
  box(parent, [2.2, 0.04, 0.9], [-10.5, 0.02, 2.4], '#cbd5e1', 0.02);
  for (let i = 0; i < 4; i++) {
    box(parent, [0.04, 0.5, 0.7], [-11.2 + i * 0.48, 0.28, 2.4], palette.metal);
  }
  // 1 Sepeda terparkir
  cylinder(parent, 0.22, 0.04, [-10.8, 0.22, 2.4], '#1e293b').rotation.x = Math.PI / 2;
  cylinder(parent, 0.22, 0.04, [-10.2, 0.22, 2.4], '#1e293b').rotation.x = Math.PI / 2;
  box(parent, [0.65, 0.04, 0.04], [-10.5, 0.28, 2.4], '#ef4444');

  // 8. Gazebo Pergola Taman Teduh di X = 35.0, Z = 16.6
  box(parent, [3.8, 0.12, 3.8], [35, 0.14, 16.6], palette.wood, 0.1);
  for (const cx of [-1.6, 1.6]) {
    for (const cz of [-1.6, 1.6]) {
      cylinder(parent, 0.07, 2.4, [35 + cx, 1.35, 16.6 + cz], palette.wood);
    }
  }
  box(parent, [4.2, 0.15, 4.2], [35, 2.6, 16.6], '#334155', 0.08); // Atap pergola
  bench(parent, 35, 16.6, 0);

  // 9. Kendaraan Box Kedua & Tumpukan Drum di Apron Gudang X = 25.5, Z = 5.2
  createCar(parent, [24.8, 0, 5.2], '#64748b', Math.PI, 'kendaraan-box-logistik');
  // Drum pasokan bertumpuk rapi di samping gudang
  cylinder(parent, 0.28, 0.7, [22.8, 0.35, 3.2], '#1e3a8a');
  cylinder(parent, 0.28, 0.7, [23.4, 0.35, 3.2], '#0f766e');
  cylinder(parent, 0.28, 0.7, [23.1, 0.35, 3.8], '#f59e0b');

  // Tiang Lampu Jalan (Streetlamps)
  const streetLamps: THREE.Mesh[] = [];
  const groundGlows: THREE.Mesh[] = [];

  for (const lx of [-24, -12, 0, 12, 24]) {
    const lamp1 = streetLamp(parent, lx, 8.4);
    const lamp2 = streetLamp(parent, lx, 15.6);
    streetLamps.push(lamp1.bulb, lamp2.bulb);
    groundGlows.push(lamp1.glow, lamp2.glow);
  }
  // Tiang lampu jalan di sepanjang jalan raya sisi kanan baru
  for (const lz of [4, -4, -12]) {
    const lamp = streetLamp(parent, 46.8, lz);
    streetLamps.push(lamp.bulb);
    groundGlows.push(lamp.glow);
  }
  const lampNorth1 = streetLamp(parent, -1, 3.2);
  const lampNorth2 = streetLamp(parent, 9, 3.2);
  streetLamps.push(lampNorth1.bulb, lampNorth2.bulb);
  groundGlows.push(lampNorth1.glow, lampNorth2.glow);

  // Pepohonan Hijau Kawasan
  for (const tx of [-26, -21, -15, -9, 0, 9, 15, 21, 27, 33]) {
    tree(parent, tx, -16, 1.15);
  }
  for (const tz of [-12, -6, 0, 6]) {
    tree(parent, -26, tz, 1.0);
  }
  // Deretan pohon pembingkai di sisi timur jalan raya baru
  for (const tz of [-15, -9, -3, 3, 9, 15]) {
    tree(parent, 48.8, tz, 0.95);
  }
  // Barisan pohon peneduh rindang di sepanjang jalur hijau selatan
  for (const tx of [-32, -24, -16, -1, 18, 26, 34, 44]) {
    tree(parent, tx, 19.5, 1.05);
  }
  tree(parent, -0.8, -2.6, 0.85);
  tree(parent, 8.8, -2.6, 0.85);
  tree(parent, -0.8, 2.6, 0.85);
  tree(parent, 8.8, 2.6, 0.85);

  return { movingTruck, trafficPool, mitraTruck, trafficLights, seatAnchors, streetLamps, groundGlows };
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

  // Lampu plafon modern minimalis di atas zona kerja & rapat
  for (const lx of [-7.5, 0, 7.8]) {
    cylinder(parent, 0.02, 0.8, [lx, 3.6, -4.5], '#475569');
    box(parent, [2.2, 0.08, 0.28], [lx, 3.2, -4.5], '#f8fafc', 0.04);
    box(parent, [2.0, 0.03, 0.22], [lx, 3.16, -4.5], '#fffbeb', 0.02);
  }

  // Modern glass partition dividing West Manager Suite from Central Workstation
  box(parent, [0.08, 2.8, 6.2], [-4.4, 1.4, -4.4], '#c9e0ec', 0.02);
  for (const z of [-7.2, -1.4]) {
    box(parent, [0.12, 2.9, 0.12], [-4.4, 1.45, z], '#fafcff', 0.02);
  }
  // Signboard pintu masuk Ruang Manajer
  sign(parent, 'RUANG MANAJER', [-4.4, 2.65, -2.4], 2.2, '#1e3a8a');

  // Modern glass partition dividing East Meeting Room from Central Workstation
  box(parent, [0.08, 2.8, 6.2], [4.4, 1.4, -4.4], '#c9e0ec', 0.02);
  for (const z of [-7.2, -1.4]) {
    box(parent, [0.12, 2.9, 0.12], [4.4, 1.45, z], '#fafcff', 0.02);
  }
  sign(parent, 'RUANG RAPAT', [4.4, 2.65, -2.4], 2.0, '#1e3a8a');

  // ==========================================
  // ZONA A: RUANG KERJA EKSEKUTIF MANAJER (Barat-Utara: x: -11...-4.5, z: -7.6...-1.2)
  // ==========================================
  // Karpet wol eksekutif biru navy mewah di lantai
  box(parent, [6.0, 0.02, 5.4], [-7.8, 0.02, -4.6], '#243c6e', 0.08, false);

  // Meja Eksekutif Manajer berbentuk L kayu mahoni solid luas
  box(parent, [3.2, 0.16, 1.4], [-7.8, 1.0, -4.5], palette.wood, 0.08); // Meja utama
  box(parent, [1.2, 0.16, 2.2], [-9.5, 0.96, -4.1], palette.wood, 0.08); // Meja samping L
  box(parent, [3.0, 0.9, 1.2], [-7.8, 0.45, -4.5], '#ffffff', 0.04); // Kaki marmer solid

  // Di atas meja manajer: Laptop kerja & monitor eksekutif
  box(parent, [0.85, 0.55, 0.05], [-7.8, 1.5, -4.3], '#334155');
  box(parent, [0.78, 0.46, 0.02], [-7.8, 1.5, -4.26], '#8ebcfa'); // Layar monitor
  box(parent, [0.55, 0.03, 0.38], [-9.4, 1.06, -4.2], '#e2e8f0'); // Laptop manajer
  cylinder(parent, 0.06, 0.35, [-9.2, 1.25, -3.2], '#f59e0b'); // Lampu meja arsitek kuningan
  box(parent, [0.22, 0.32, 0.02], [-6.6, 1.25, -4.5], '#ef4444'); // Bendera Merah Putih mini
  box(parent, [0.65, 0.08, 0.12], [-7.8, 1.12, -3.9], '#f59e0b', 0.02); // Plakat nama meja emas

  // Kursi Direktur Manajer Eksekutif kulit ergonomis (hadap meja ke arah selatan)
  chair(parent, -7.8, -5.5, 0);

  // 2 Kursi Tamu di depan meja manajer (hadap utara ke meja)
  chair(parent, -8.6, -3.4, Math.PI);
  chair(parent, -7.0, -3.4, Math.PI);

  // Lemari Buku & Piala Penghargaan Manajer di dinding utara
  box(parent, [4.2, 2.4, 0.6], [-7.8, 1.3, -7.2], palette.wood, 0.06);
  cylinder(parent, 0.1, 0.35, [-6.6, 2.65, -7.2], '#f59e0b'); // Piala emas
  cylinder(parent, 0.09, 0.3, [-9.0, 2.65, -7.2], '#3866f6'); // Plakat penghargaan

  // Sofa tamu 2 dudukan di sudut barat-selatan ruang manajer
  box(parent, [1.8, 0.45, 0.8], [-9.8, 0.3, -2.0], '#475569', 0.08);
  box(parent, [1.8, 0.6, 0.25], [-9.8, 0.65, -2.35], '#334155', 0.08);

  // Tanaman pot monstera indoor di sudut ruang kerja manajer
  tree(parent, -10.4, -6.6, 0.75);

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
  tree(parent, -10.0, 3.0, 0.9);

  // ==========================================
  // ZONA D: GYM & KEGIATAN MODERN (Timur-Selatan: x: 5...10.5, z: 2...7)
  // ==========================================
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
  // Workout bench & dumbbell
  box(parent, [0.75, 0.38, 1.6], [7.8, 0.22, 2.8], '#1e293b', 0.04);
  box(parent, [0.65, 0.1, 1.5], [7.8, 0.44, 2.8], '#2563eb', 0.05);
  box(parent, [1.5, 0.7, 0.55], [10.1, 0.38, 2.8], '#334155', 0.04);
  for (let i = 0; i < 3; i++) {
    box(parent, [0.38, 0.18, 0.18], [9.6 + i * 0.45, 0.8, 2.8], ['#3866f6', '#ef4444', '#10b981'][i], 0.04);
  }
  cylinder(parent, 0.22, 0.8, [10.3, 0.48, 6.4], '#ffffff');
  cylinder(parent, 0.18, 0.5, [10.3, 1.1, 6.4], '#60a5fa');

  // ==========================================
  // ZONA E: RUANG RAPAT PENGURUS & PRESENTASI (Timur-Utara: x: 5...10.5, z: -7...-2)
  // ==========================================
  // Meja rapat kayu madu solid luas (4.8 x 2.0)
  box(parent, [4.8, 0.18, 2.0], [7.8, 1.0, -4.5], palette.wood, 0.15);
  for (const x of [6.0, 9.6]) {
    for (const z of [-5.2, -3.8]) {
      box(parent, [0.14, 0.9, 0.14], [x, 0.45, z], '#edf2f9', 0.02);
    }
  }
  // 6 Kursi rapat eksekutif (hadap meja)
  for (const x of [6.5, 7.8, 9.1]) {
    chair(parent, x, -5.6, 0); // Kursi sisi utara (hadap selatan)
    chair(parent, x, -3.4, Math.PI); // Kursi sisi selatan (hadap utara)
  }
  // Proyektor di meja & laptop presentasi
  cylinder(parent, 0.16, 0.22, [8.8, 1.2, -4.5], palette.blue);
  box(parent, [0.8, 0.03, 0.55], [6.8, 1.11, -4.5], '#fafcff', 0.02);
  // Layar presentasi dinding putih
  box(parent, [3.8, 1.8, 0.06], [7.8, 2.6, -7.45], '#ffffff', 0.03);
  box(parent, [3.6, 1.6, 0.02], [7.8, 2.6, -7.4], '#dbeafe', 0);
  tree(parent, 10.2, -5.6, 0.9);

  // ==========================================
  // ZONA F: LOBI & PUSAT INFORMASI (Tengah-Selatan: x: -3.5...3.5, z: 2...7)
  // ==========================================
  // Meja Resepsionis & Pusat Informasi Lobi KDMP (lembut, elegan, berbobot)
  box(parent, [3.4, 1.05, 1.1], [0, 0.525, 6.2], '#ffffff', 0.08);
  box(parent, [3.5, 0.1, 1.15], [0, 1.1, 6.2], palette.wood, 0.08);
  box(parent, [3.2, 0.45, 0.06], [0, 0.75, 5.62], '#3866f6', 0.04);
  // Komputer PC All-in-One resepsionis
  box(parent, [0.8, 0.5, 0.06], [0, 1.45, 6.2], '#334155');
  box(parent, [0.72, 0.42, 0.02], [0, 1.45, 6.16], '#8ebcfa');
  cylinder(parent, 0.12, 0.22, [-1.2, 1.25, 6.2], '#ffffff');
  // Standing Signboard kayu "PUSAT PELAYANAN KDMP"
  box(parent, [1.4, 1.8, 0.1], [2.2, 0.95, 6.2], palette.wood, 0.06);
  // Bangku tunggu di lobi (bersandar di barat, menghadap ke timur menuju meja resepsionis)
  bench(parent, -6.0, 5.2, Math.PI / 2);
  tree(parent, -3.8, 6.6, 0.85);
  tree(parent, 3.8, 6.6, 0.85);
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
  gender: 'pria' | 'wanita' = 'pria',
): WorldCharacter {
  const g = new THREE.Group();
  g.position.set(...position);
  g.userData.characterRole = role;
  g.userData.characterGender = gender;
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

  if (gender === 'wanita') {
    // Karakter wanita: sanggul rapi atau kerudung/hijab pastel
    if (variant === 1) {
      sphere(head, 0.35, [0, 0.06, -0.02], '#818cf8', [1.02, 1.06, 1.04]); // Hijab
      sphere(head, 0.31, [0, 0, 0.04], skin, [0.92, 0.95, 0.85]);
    } else {
      sphere(head, 0.34, [0, 0.14, -0.05], '#34364b', [1.02, 0.85, 1.0]);
      sphere(head, 0.18, [0, 0.12, -0.32], '#34364b'); // Sanggul rambut belakang
      sphere(head, 0.12, [-0.22, 0.08, 0.1], '#34364b'); // Belahan poni
      sphere(head, 0.12, [0.22, 0.08, 0.1], '#34364b');
    }
  } else {
    // Karakter pria
    sphere(head, 0.34, [0, 0.14, -0.05], '#34364b', [1, 0.72, 0.93]);
    if (variant === 1) {
      // Rambut belah rapi atau peci
      box(head, [0.44, 0.2, 0.44], [0, 0.32, -0.02], '#1e293b', 0.04);
    } else if (variant === 2) {
      // TOPI NPC HIJAU YANG DIPERBAIKI (topi baret/pet lembut proporsional)
      sphere(head, 0.32, [0, 0.25, -0.02], color, [1.04, 0.65, 1.05]); // Kubah baret bulat
      box(head, [0.36, 0.04, 0.2], [0, 0.18, 0.22], color, 0.03); // Visor lidah depan melengkung lembut
      cylinder(head, 0.035, 0.03, [0, 0.37, -0.02], '#ffffff'); // Kancing atas
    }
  }

  // Mata dan pipi manis
  for (const side of [-1, 1]) {
    sphere(head, 0.035, [side * 0.105, 0.01, 0.284], '#26334b');
    sphere(head, 0.055, [side * 0.2, -0.09, 0.235], '#da9382', [1, 0.55, 0.25]);
  }
  box(head, [0.085, 0.023, 0.025], [0, -0.14, 0.291], '#864d44');
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
