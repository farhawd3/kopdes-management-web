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
function bench(parent: THREE.Object3D, x: number, z: number) {
  for (const offset of [-0.6, 0.6])
    box(parent, [0.09, 0.45, 0.5], [x + offset, 0.22, z], palette.ink);
  for (let i = 0; i < 3; i++)
    box(parent, [1.7, 0.08, 0.13], [x, 0.49, z + (i - 1) * 0.16], palette.wood);
  box(parent, [1.7, 0.35, 0.08], [x, 0.8, z - 0.25], palette.wood);
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
export function createExterior(parent: THREE.Group, model: WorldModel) {
  box(parent, [31, 0.3, 23], [0, -0.22, 0], '#d6deef', 0.15);
  box(parent, [29, 0.08, 17], [0, -0.03, -2], palette.ground);
  box(parent, [31, 0.025, 4], [0, -0.03, 8.5], '#bbcbed', 0);
  for (let x = -14; x < 15; x += 3) box(parent, [1.5, 0.015, 0.09], [x, 0, 8.5], '#f9fbff', 0);
  box(parent, [29, 0.08, 0.65], [0, 0.015, 6.05], '#f7f9ff');
  box(parent, [29, 0.035, 1.6], [0, 0.005, -1.2], '#f4f7fd');
  for (const plot of model.plots) {
    const [x, z] = plot.position;
    if (plot.unit) building(parent, x, z, String(plot.unit.data.title), false, plot.id);
    else {
      box(parent, [4.5, 0.055, 3.3], [x, 0.015, z], '#d5e4dd').userData.selection = plot.id;
      for (let i = 0; i < 7; i++)
        for (const side of [-1, 1])
          box(
            parent,
            [0.35, 0.025, 0.045],
            [x - 2.05 + i * 0.67, 0.06, z + side * 1.65],
            '#ffffff',
            0,
          );
      for (const side of [-1, 1]) {
        box(parent, [0.045, 0.025, 3.3], [x + side * 2.25, 0.06, z], '#ffffff', 0);
        box(parent, [0.08, 0.45, 0.08], [x + side * 2.1, 0.22, z + 1.48], '#a3b9aa');
      }
      box(parent, [0.7, 0.05, 0.11], [x, 0.07, z], '#94b09f');
      box(parent, [0.11, 0.05, 0.7], [x, 0.07, z], '#94b09f');
    }
  }
  building(parent, -3, 2.7, 'Koperasi', true);
  for (const x of [-13, -10, -7, 0, 3, 6, 9, 12]) tree(parent, x, 5.9, 0.85);
  for (const x of [-13, -7, 0, 6, 12]) tree(parent, x, -9, 1.1);
  for (const z of [-5, -1, 3]) {
    tree(parent, -13, z);
    tree(parent, 13, z);
  }
  bench(parent, 0.4, 4.8);
  bench(parent, 7, -0.7);
  for (const x of [-11, 1, 11]) {
    cylinder(parent, 0.045, 3.1, [x, 1.55, 6.2], '#8391ad');
    box(parent, [0.6, 0.06, 0.25], [x + 0.22, 3.12, 6.2], '#f6fbff');
  }
  // Reserved service bay is scenery; no vehicle movement or delivery is implied.
  for (let x = 4; x <= 11; x += 2.3) {
    box(parent, [0.04, 0.015, 1.1], [x, 0, 10.35], '#f7faff', 0);
  }
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
  box(parent, [15, 0.3, 12], [0, -0.2, 0], '#d8e0eb', 0.1);
  box(parent, [14.6, 0.05, 11.6], [0, -0.02, 0], '#f4f3ef');
  for (let x = -7; x <= 7; x++) box(parent, [0.012, 0.01, 11.5], [x, 0.015, 0], '#e4e5e7', 0);
  for (let z = -5; z <= 5; z++) box(parent, [14.5, 0.01, 0.012], [0, 0.015, z], '#e4e5e7', 0);
  box(parent, [15, 3.5, 0.2], [0, 1.6, -6], '#f8fbff');
  box(parent, [0.2, 3.5, 12], [-7.4, 1.6, 0], '#e9eff8');
  for (let x = -6; x <= 6; x += 2) {
    box(parent, [1.65, 1.55, 0.06], [x, 2.05, -5.86], '#b8d4ec');
    box(parent, [0.05, 1.65, 0.1], [x, 2.05, -5.8], '#839bb9');
    box(parent, [1.85, 0.15, 0.16], [x, 2.85, -5.75], '#f9fcff');
  }
  box(parent, [0.08, 2.3, 4.2], [-0.5, 1.15, -3.7], '#c9e0ec');
  for (const z of [-5.8, -1.6]) box(parent, [0.1, 2.4, 0.1], [-0.5, 1.2, z], '#f9fcff');
  box(parent, [4.2, 0.18, 1.7], [-4, 1, -2.6], palette.wood, 0.15);
  for (const x of [-5.5, -2.5])
    for (const z of [-3.1, -2.1]) box(parent, [0.1, 0.9, 0.1], [x, 0.45, z], '#edf2f9');
  for (const x of [-5.2, -4, -2.8]) {
    chair(parent, x, -4);
    chair(parent, x, -1.2, Math.PI);
  }
  box(parent, [0.55, 0.025, 0.4], [-4.3, 1.11, -2.5], '#f9fcff');
  cylinder(parent, 0.12, 0.15, [-3, 1.15, -2.5], palette.blue);
  for (const z of [-3.7, -1.2]) {
    box(parent, [4.7, 0.13, 1.15], [3.2, 1, z], '#ffffff');
    for (const x of [1.15, 5.25]) box(parent, [0.12, 1, 0.85], [x, 0.5, z], '#d1dbe9');
    for (const x of [2, 4.5]) {
      box(parent, [0.8, 0.53, 0.08], [x, 1.5, z - 0.16], '#344761');
      box(parent, [0.71, 0.42, 0.02], [x, 1.51, z - 0.108], '#8ebcfa');
      box(parent, [0.07, 0.26, 0.09], [x, 1.15, z - 0.16], '#6f8198');
      box(parent, [0.55, 0.04, 0.21], [x, 1.085, z + 0.2], '#bdc9d9');
      chair(parent, x, z + 1, Math.PI);
    }
  }
  for (const x of [-5.7, -4.3, -2.9]) {
    box(parent, [1.3, 1.5, 0.7], [x, 0.75, 4.5], palette.wood);
    box(parent, [1.32, 0.12, 0.75], [x, 1.55, 4.5], '#ffffff');
    for (let i = 0; i < 5; i++)
      box(
        parent,
        [0.13, 0.4, 0.29],
        [x - 0.4 + i * 0.19, 1.79, 4.5],
        ['#6d91dd', '#b7b6e0', '#88b9a4'][i % 3],
      );
  }
  box(parent, [4.2, 0.03, 2.8], [3.8, 0.02, 3.5], '#d5d8f2', 0.12);
  for (const x of [2.3, 5.3]) {
    box(parent, [1, 0.22, 1.9], [x, 0.18, 3.5], '#63748c');
    box(parent, [0.76, 0.05, 1.55], [x, 0.32, 3.5], '#334257');
    for (const side of [-1, 1])
      box(parent, [0.07, 1.3, 0.07], [x + side * 0.46, 0.85, 2.8], '#aebed1');
    box(parent, [1.05, 0.12, 0.32], [x, 1.5, 2.8], '#385172');
  }
  tree(parent, -6.5, -5.1, 0.8);
  tree(parent, 6.4, -5.1, 0.8);
  tree(parent, -0.6, 4.7, 0.8);
  bench(parent, -0.5, 2.4);
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
) {
  const t = reduced ? 0 : time;
  character.group.position.copy(character.base);
  character.group.position.y +=
    activity === 'gym' ? Math.abs(Math.sin(t * 5)) * 0.12 : Math.sin(t * 2) * 0.025;
  const stride = activity === 'gym' ? Math.sin(t * 5) * 0.75 : 0;
  character.leftLeg.rotation.x = activity === 'meeting' ? -1.35 : stride;
  character.rightLeg.rotation.x = activity === 'meeting' ? -1.35 : -stride;
  character.leftArm.rotation.x =
    activity === 'work' || activity === 'meeting' ? -0.7 + Math.sin(t * 4) * 0.08 : -stride;
  character.rightArm.rotation.x = activity === 'work' ? -0.8 + Math.cos(t * 4) * 0.08 : stride;
  character.rightArm.rotation.z = activity === 'idle' ? -0.25 + Math.sin(t * 2.5) * 0.15 : 0.05;
  character.head.rotation.y = Math.sin(t * 0.7) * 0.12;
  if (activity === 'meeting') character.group.position.y -= 0.12;
}
