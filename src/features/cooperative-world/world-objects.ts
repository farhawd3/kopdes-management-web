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
};
const material = (color: string) => new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
export function box(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  color: string,
  radius = 0.035,
) {
  const mesh = new THREE.Mesh(
    radius ? new RoundedBoxGeometry(...size, 2, radius) : new THREE.BoxGeometry(...size),
    material(color),
  );
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
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
function bench(parent: THREE.Object3D, x: number, z: number, rotation = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotation;
  parent.add(g);
  for (const offset of [-0.6, 0.6])
    box(g, [0.09, 0.45, 0.5], [offset, 0.22, 0], palette.ink);
  for (let i = 0; i < 3; i++)
    box(g, [1.7, 0.08, 0.13], [0, 0.49, (i - 1) * 0.16], palette.wood);
  box(g, [1.7, 0.35, 0.08], [0, 0.8, -0.25], palette.wood);
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
  cylinder(g, 1.6, 0.32, [0, 0.2, 0], '#72a8e8');
  // Center tier
  cylinder(g, 0.7, 0.7, [0, 0.45, 0], '#cbd7e8');
  cylinder(g, 0.25, 0.55, [0, 0.95, 0], '#8cbaf0');
  sphere(g, 0.2, [0, 1.25, 0], '#ffffff');
}

function streetLamp(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  parent.add(g);
  cylinder(g, 0.07, 3.4, [0, 1.7, 0], '#475569');
  box(g, [0.75, 0.07, 0.15], [0.3, 3.38, 0], '#334155');
  box(g, [0.35, 0.18, 0.28], [0.55, 3.28, 0], '#fffbeb', 0.04);
}

export function createExterior(parent: THREE.Group, model: WorldModel) {
  // Expanded map: 62 x 42 base platform, 58 x 38 ground
  box(parent, [62, 0.45, 42], [0, -0.28, 0], '#cfd8e8', 0.2);
  box(parent, [58, 0.1, 38], [0, -0.05, 0], palette.ground);

  // Main asphalt road running horizontally at Z = 12
  box(parent, [58, 0.03, 6.4], [0, -0.015, 12], '#334155', 0);
  // Dashed white center road markings
  for (let x = -27; x < 28; x += 3.5) {
    box(parent, [1.8, 0.02, 0.14], [x, 0.008, 12], '#f8fafc', 0);
  }
  // Solid white edge lines
  box(parent, [58, 0.02, 0.12], [0, 0.008, 9.1], '#f8fafc', 0);
  box(parent, [58, 0.02, 0.12], [0, 0.008, 14.9], '#f8fafc', 0);

  // Pedestrian zebra crossings
  for (const cx of [-12, 4]) {
    for (let i = 0; i < 6; i++) {
      box(parent, [0.7, 0.025, 0.55], [cx, 0.01, 9.6 + i * 0.95], '#ffffff', 0);
    }
  }

  // Broad paved sidewalks (Trotoar)
  box(parent, [58, 0.06, 2.2], [0, 0.02, 7.7], '#edf2f9');
  box(parent, [58, 0.06, 1.8], [0, 0.02, 16.5], '#edf2f9');
  // Walkway connecting north row and center
  box(parent, [58, 0.04, 2.6], [0, 0.01, -4.8], '#edf2f9');
  // Cross walkways
  for (const wx of [-18, -5, 4, 18]) {
    box(parent, [2.5, 0.04, 10.5], [wx, 0.01, 1.5], '#f1f5fb');
  }

  // Parking area at X = -18, Z = 6.5
  box(parent, [11, 0.035, 5.0], [-17, 0.005, 6.5], '#475569');
  // Parking stall lines
  for (let px = -21; px <= -13; px += 2.8) {
    box(parent, [0.1, 0.02, 3.4], [px, 0.025, 6.5], '#f8fafc', 0);
  }
  // Parked Manager's Car
  createCar(parent, [-18.2, 0, 6.5], palette.blue, 0, 'kendaraan-manajer');

  // Logistics Loading Bay at X = 18, Z = 6.5
  box(parent, [12, 0.06, 5.2], [18, 0.02, 6.5], '#64748b');
  // Yellow/black diagonal safety stripe curb
  for (let sx = 13; sx <= 23; sx += 1.2) {
    box(parent, [0.55, 0.08, 0.15], [sx, 0.05, 9.0], '#f59e0b', 0);
    box(parent, [0.55, 0.08, 0.15], [sx + 0.6, 0.05, 9.0], '#1e293b', 0);
  }
  // Canopy over loading area
  for (const lx of [14, 22]) {
    cylinder(parent, 0.08, 3.0, [lx, 1.5, 4.4], '#94a3b8');
    cylinder(parent, 0.08, 3.0, [lx, 1.5, 8.4], '#94a3b8');
  }
  box(parent, [9.0, 0.15, 4.6], [18, 3.0, 6.4], '#2443a6', 0.08);
  // Cargo crates & wooden pallets
  box(parent, [1.4, 0.14, 1.2], [22, 0.12, 5.5], palette.wood);
  box(parent, [0.8, 0.7, 0.8], [22, 0.55, 5.5], '#cbd5e1', 0.05);
  box(parent, [1.4, 0.14, 1.2], [20.5, 0.12, 5.2], palette.wood);
  box(parent, [0.9, 0.8, 0.9], [20.5, 0.6, 5.2], '#b45309', 0.05);
  // Parked Logistics Van
  createVan(parent, [16.2, 0, 6.5], '#fafcff', 0, 'kendaraan-van');

  // Moving ambient truck along the road
  const movingTruck = createTruck(parent, [-24, 0, 10.8], '#2443a6', 0, 'kendaraan-truk');

  // Plaza with Fountain at X = 4, Z = 0
  box(parent, [10, 0.05, 7], [4, 0.015, 0], '#f8fafc');
  fountain(parent, 4, 0);
  bench(parent, 4, -2.4, 0);
  bench(parent, 4, 2.4, Math.PI);
  bench(parent, 0.5, 0, Math.PI / 2);
  bench(parent, 7.5, 0, -Math.PI / 2);

  // Office Building (Kantor Koperasi) at X = -5, Z = 0
  building(parent, -5, 0, 'Koperasi', true);

  // The 7 Plots
  for (const plot of model.plots) {
    const [x, z] = plot.position;
    if (plot.unit) {
      building(parent, x, z, String(plot.unit.data.title), false, plot.id);
    } else {
      // Empty plot with crisp diorama turf, borders and plus sign
      const g = box(parent, [4.8, 0.06, 3.6], [x, 0.02, z], '#d3e6db');
      g.userData.selection = plot.id;
      // White boundary fence pegs
      for (const side of [-1, 1]) {
        box(parent, [4.9, 0.03, 0.06], [x, 0.07, z + side * 1.8], '#ffffff', 0);
        box(parent, [0.06, 0.03, 3.6], [x + side * 2.45, 0.07, z], '#ffffff', 0);
        for (let i = 0; i < 5; i++) {
          box(parent, [0.08, 0.38, 0.08], [x - 2.0 + i * 1.0, 0.2, z + side * 1.8], '#a3b9aa');
        }
      }
      // Plus symbol in center
      box(parent, [0.8, 0.06, 0.16], [x, 0.08, z], '#79a88c');
      box(parent, [0.16, 0.06, 0.8], [x, 0.08, z], '#79a88c');
    }
  }

  // Streetlamps along road and plaza
  for (const lx of [-24, -12, 0, 12, 24]) {
    streetLamp(parent, lx, 8.4);
    streetLamp(parent, lx, 15.6);
  }
  streetLamp(parent, -1, 3.2);
  streetLamp(parent, 9, 3.2);

  // Trees and greenery surrounding the map
  for (const tx of [-26, -21, -15, -9, 0, 9, 15, 21, 26]) {
    tree(parent, tx, -16, 1.15);
  }
  for (const tz of [-12, -6, 0, 6]) {
    tree(parent, -26, tz, 1.0);
    tree(parent, 26, tz, 1.0);
  }
  // Plaza decorative trees
  tree(parent, -0.8, -2.6, 0.85);
  tree(parent, 8.8, -2.6, 0.85);
  tree(parent, -0.8, 2.6, 0.85);
  tree(parent, 8.8, 2.6, 0.85);

  return { movingTruck };
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
  box(parent, [16, 0.3, 13], [0, -0.2, 0], '#d8e0eb', 0.1);
  box(parent, [15.6, 0.05, 12.6], [0, -0.02, 0], '#f4f3ef');
  for (let x = -7; x <= 7; x++) box(parent, [0.012, 0.01, 12.5], [x, 0.015, 0], '#e4e5e7', 0);
  for (let z = -6; z <= 6; z++) box(parent, [15.5, 0.01, 0.012], [0, 0.015, z], '#e4e5e7', 0);
  // Cutaway back and side walls
  box(parent, [16, 3.8, 0.2], [0, 1.7, -6.4], '#f8fbff');
  box(parent, [0.2, 3.8, 13], [-7.9, 1.7, 0], '#e9eff8');
  for (let x = -6; x <= 6; x += 2) {
    box(parent, [1.65, 1.55, 0.06], [x, 2.15, -6.26], '#b8d4ec');
    box(parent, [0.05, 1.65, 0.1], [x, 2.15, -6.2], '#839bb9');
    box(parent, [1.85, 0.15, 0.16], [x, 2.95, -6.15], '#f9fcff');
  }
  // Glass partition divider
  box(parent, [0.08, 2.4, 4.4], [-0.5, 1.2, -3.8], '#c9e0ec');
  for (const z of [-6.0, -1.6]) box(parent, [0.1, 2.5, 0.1], [-0.5, 1.25, z], '#f9fcff');

  // Area 1: Meja Rapat (Meeting Zone) at [-4, 0, -2.6]
  box(parent, [4.4, 0.18, 1.8], [-4, 1.0, -2.6], palette.wood, 0.15);
  for (const x of [-5.6, -2.4])
    for (const z of [-3.2, -2.0]) box(parent, [0.1, 0.9, 0.1], [x, 0.45, z], '#edf2f9');
  for (const x of [-5.2, -4.0, -2.8]) {
    chair(parent, x, -4.1);
    chair(parent, x, -1.1, Math.PI);
  }
  box(parent, [0.65, 0.03, 0.45], [-4.3, 1.11, -2.5], '#f9fcff');
  cylinder(parent, 0.14, 0.18, [-3, 1.18, -2.5], palette.blue);

  // Area 2: Meja Tugas (Workstation Zone) at [3.4, 0, -2.5]
  for (const z of [-3.8, -1.2]) {
    box(parent, [4.8, 0.13, 1.2], [3.4, 1.0, z], '#ffffff');
    for (const x of [1.2, 5.6]) box(parent, [0.12, 1.0, 0.9], [x, 0.5, z], '#d1dbe9');
    for (const x of [2.2, 4.6]) {
      box(parent, [0.85, 0.55, 0.08], [x, 1.52, z - 0.18], '#344761');
      box(parent, [0.76, 0.44, 0.02], [x, 1.53, z - 0.12], '#8ebcfa');
      box(parent, [0.08, 0.28, 0.09], [x, 1.15, z - 0.18], '#6f8198');
      box(parent, [0.55, 0.04, 0.22], [x, 1.085, z + 0.22], '#bdc9d9');
      chair(parent, x, z + 1.1, Math.PI);
    }
  }

  // Area 3: Arsip & Dokumen (Library & Filing) at [-4.5, 0, 4.4]
  for (const x of [-6.0, -4.5, -3.0]) {
    box(parent, [1.35, 1.65, 0.75], [x, 0.82, 4.6], palette.wood);
    box(parent, [1.38, 0.12, 0.8], [x, 1.68, 4.6], '#ffffff');
    for (let i = 0; i < 5; i++)
      box(
        parent,
        [0.14, 0.45, 0.32],
        [x - 0.42 + i * 0.21, 1.95, 4.6],
        ['#6d91dd', '#b7b6e0', '#88b9a4'][i % 3],
      );
  }

  // Area 4: Dedicated GYM ZONE (Area Kegiatan & Olahraga) at [3.8, 0, 3.5]
  // Textured dark rubber workout mat with slate edge
  box(parent, [5.8, 0.04, 4.2], [3.8, 0.02, 3.5], '#334155', 0.1);
  box(parent, [5.5, 0.02, 3.9], [3.8, 0.04, 3.5], '#475569');

  // Dual modern treadmills
  for (const tx of [2.4, 5.0]) {
    // Treadmill frame base
    box(parent, [1.1, 0.24, 2.1], [tx, 0.16, 3.5], '#1e293b', 0.06);
    // Rubber running deck/belt
    box(parent, [0.8, 0.04, 1.8], [tx, 0.29, 3.5], '#0f172a');
    // Side support posts
    for (const side of [-1, 1]) {
      box(parent, [0.08, 1.25, 0.08], [tx + side * 0.48, 0.85, 2.65], '#94a3b8');
      box(parent, [0.06, 0.08, 0.75], [tx + side * 0.48, 1.45, 3.0], '#475569');
    }
    // Dashboard console
    box(parent, [1.05, 0.2, 0.35], [tx, 1.48, 2.65], '#1e293b', 0.04);
    // Glowing digital display screen
    box(parent, [0.65, 0.12, 0.02], [tx, 1.5, 2.47], '#10b981');
  }

  // Workout training bench
  box(parent, [0.7, 0.38, 1.5], [3.7, 0.22, 1.9], '#1e293b');
  box(parent, [0.62, 0.1, 1.42], [3.7, 0.44, 1.9], '#2563eb', 0.05);

  // Dumbbell rack
  box(parent, [1.4, 0.65, 0.5], [5.8, 0.35, 1.8], '#334155');
  for (let i = 0; i < 3; i++) {
    box(parent, [0.35, 0.16, 0.16], [5.3 + i * 0.42, 0.75, 1.8], ['#3866f6', '#ef4444', '#10b981'][i], 0.04);
  }

  // Water cooler dispenser
  cylinder(parent, 0.2, 0.75, [6.2, 0.45, 4.8], '#ffffff');
  cylinder(parent, 0.18, 0.45, [6.2, 1.0, 4.8], '#60a5fa');

  // Indoor decor plants
  tree(parent, -7.0, -5.4, 0.85);
  tree(parent, 6.8, -5.4, 0.85);
  tree(parent, -0.6, 5.0, 0.85);
  bench(parent, -0.5, 2.2);
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
): WorldCharacter {
  const g = new THREE.Group();
  g.position.set(...position);
  parent.add(g);
  const skin = ['#e8b18b', '#bd825e', '#efc6a0'][variant % 3];
  sphere(g, 0.34, [0, 0.95, 0], color, [1, 1.1, 0.65]);
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
