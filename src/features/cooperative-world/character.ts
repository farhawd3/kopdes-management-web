/* Karakter isometrik chibi — satu sumber untuk demo, sprite sheet, dan web asli.
   drawChar({pose, frame, face, flip, shirt, pants, hair, skin, acc, t}) -> string SVG, kaki di (0,0). */
const INK = '#1E2A4A';
export type CharacterOptions = {
  pose?: 'idle' | 'walk' | 'sit' | 'work' | 'think' | 'wave';
  frame?: number;
  face?: 'front' | 'back';
  flip?: boolean;
  shirt?: string;
  pants?: string;
  hair?: string;
  skin?: string;
  acc?: string;
  t?: number;
};
export function drawChar(o: CharacterOptions) {
  const {
    pose = 'idle',
    frame = 0,
    face = 'front',
    flip = false,
    shirt = '#5B84F5',
    pants = '#3A4A7A',
    hair = '#2A2F4A',
    skin = '#FBE3D0',
    acc = '',
    t = 0,
  } = o;
  const sit = pose === 'sit' || pose === 'work',
    back = face === 'back';
  let bob = 0,
    aL = 0,
    aR = 0,
    lL = 0,
    lR = 0;
  if (pose === 'walk') {
    const fr = ((frame % 4) + 4) % 4;
    lL = fr === 1 ? 1 : 0;
    lR = fr === 3 ? 1 : 0;
    bob = fr % 2 ? -2.2 : 0;
    aL = lL ? -18 : lR ? 18 : 0;
    aR = -aL;
  }
  if (pose === 'idle') {
    bob = Math.sin(t * 2) * 0.8;
  }
  if (sit) {
    bob = 3;
  }
  if (pose === 'work') {
    aL = -50 + Math.sin(t * 16) * 7;
    aR = -50 + Math.cos(t * 16) * 7;
  }
  if (pose === 'sit') {
    aL = back ? -25 : -80;
    aR = back ? -25 : -80;
  }
  const shoe = '#243056';
  const leg = (x: number, ang: number, lift = 0) =>
    `<g transform="translate(0,${-lift * 3.5}) rotate(${ang} ${x} -17)"><rect x="${x - 3.5}" y="-17" width="7" height="16" rx="3.5" fill="${pants}"/><rect x="${x - 4.2}" y="-4.5" width="8.4" height="4.5" rx="2.2" fill="${shoe}"/></g>`;
  let legs = '';
  if (sit && !back) {
    legs = `<rect x="-4" y="-16" width="17" height="7" rx="3.5" fill="${pants}"/><rect x="7" y="-14" width="7" height="14" rx="3.5" fill="${pants}"/><rect x="6" y="-4.5" width="9" height="4.5" rx="2.2" fill="${shoe}"/><rect x="-6" y="-16" width="10" height="7" rx="3.5" fill="${sh(pants)}"/>`;
  } else if (sit && back) {
    legs = `<rect x="-9" y="-15" width="7" height="15" rx="3.5" fill="${pants}"/><rect x="2" y="-15" width="7" height="15" rx="3.5" fill="${pants}"/><rect x="-9.5" y="-4.5" width="8.4" height="4.5" rx="2.2" fill="${shoe}"/><rect x="1.2" y="-4.5" width="8.4" height="4.5" rx="2.2" fill="${shoe}"/>`;
  } else legs = leg(-3.8, lL * 16, lL) + leg(3.8, -lR * 16, lR);
  const arm = (sx: number, ang: number) =>
    `<g transform="rotate(${ang} ${sx} -31)"><rect x="${sx - 2.7}" y="-32" width="5.4" height="15" rx="2.7" fill="${shirt}"/><circle cx="${sx}" cy="-16.5" r="3" fill="${skin}"/></g>`;
  const armL = arm(-11.5, aL);
  let armR = arm(11.5, aR);
  if (pose === 'think')
    armR = `<path d="M11.5,-30 L16,-22 L5,-35" stroke="${shirt}" stroke-width="5.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="4.5" cy="-35.5" r="3" fill="${skin}"/>`;
  if (pose === 'wave') {
    const w = Math.sin(t * 9) * 18;
    armR = `<g transform="rotate(${w} 17 -40)"><path d="M11.5,-30 L17,-40 L18,-53" stroke="${shirt}" stroke-width="5.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="-54" r="3" fill="${skin}"/></g>`;
  }
  let torso = `<rect x="-10.5" y="-36" width="21" height="22" rx="9" fill="${shirt}"/>`;
  if (acc.includes('blazer'))
    torso += `<path d="M-10.5,-30 q0,-6 10.5,-6 q10.5,0 10.5,6 v10 q-2,2 -4,2 l-6.5,-12 l-6.5,12 q-2,0 -4,-2z" fill="${sh(shirt, 0.82)}"/><path d="M-2.5,-35 l2.5,7 l2.5,-7z" fill="#fff"/>`;
  if (acc.includes('lanyard') && !back)
    torso += `<path d="M-4,-35 L0,-20 L4,-35" stroke="#2F5BEA" stroke-width="2" fill="none"/><rect x="-3.5" y="-21" width="7" height="8" rx="1.8" fill="#fff" stroke="#2F5BEA" stroke-width="1"/><rect x="-2" y="-19" width="4" height="1.6" fill="#2F5BEA"/>`;
  let head = `<circle cx="0" cy="-45" r="10.5" fill="${skin}"/>`;
  const hij = acc.includes('hijab');
  if (hij) {
    head =
      `<circle cx="0" cy="-44" r="12.3" fill="${hair}"/><path d="M-9,-36 q9,10 18,0 v6 q-9,6 -18,0z" fill="${hair}"/>` +
      (back ? '' : `<ellipse cx="0" cy="-44" rx="8" ry="8.8" fill="${skin}"/>`);
  } else if (back) head += `<circle cx="0" cy="-45.5" r="10.8" fill="${hair}"/>`;
  else
    head += `<path d="M-10.8,-45 a10.8,10.8 0 0 1 21.6,0 q-5,-5 -10.8,-3.5 q-5.8,-1.5 -10.8,3.5z" fill="${hair}"/>`;
  if (!back) {
    head += `<circle cx="-3.6" cy="-43.5" r="1.5" fill="${INK}"/><circle cx="3.6" cy="-43.5" r="1.5" fill="${INK}"/><ellipse cx="-6.3" cy="-40" rx="2" ry="1.2" fill="#F5A3B5" opacity=".6"/><ellipse cx="6.3" cy="-40" rx="2" ry="1.2" fill="#F5A3B5" opacity=".6"/>`;
    if (acc.includes('glasses'))
      head += `<circle cx="-3.8" cy="-43.5" r="3.4" fill="none" stroke="${INK}" stroke-width="1"/><circle cx="3.8" cy="-43.5" r="3.4" fill="none" stroke="${INK}" stroke-width="1"/><path d="M-0.4,-43.5h.8" stroke="${INK}"/>`;
  }
  if (acc.includes('helmet'))
    head += `<path d="M-11.5,-47 a11.5,11.5 0 0 1 23,0z" fill="#FFC93C"/><rect x="-12.5" y="-48" width="25" height="3" rx="1.5" fill="#F0B020"/>`;
  if (acc.includes('cap'))
    head += `<path d="M-11,-47 a11,11 0 0 1 22,0z" fill="#F8CFE0"/><rect x="-1" y="-48" width="15" height="3" rx="1.5" fill="#EFB5CC"/>`;
  const upper = `<g transform="translate(0,${bob})">${back ? armL : ''}${torso}${head}${back ? '' : armL}${armR}</g>`;
  const shadow = `<ellipse cx="${sit && !back ? 5 : 0}" cy="1" rx="${sit ? 15 : 12}" ry="5" fill="#1E2A4A" opacity=".13"/>`;
  const umb = acc.includes('umbrella')
    ? `<g><line x1="15" y1="-30" x2="15" y2="-60" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><g transform="translate(8,0)"><path d="M-20,-59 a20,15 0 0 1 40,0 q-10,-5 -20,0 q-10,-5 -20,0z" fill="#F8CFE0"/><path d="M0,-74 v15" stroke="#EFB5CC" stroke-width="1.2"/></g></g>`
    : '';
  const body = `${shadow}<g transform="translate(0,${pose === 'walk' ? bob * 0.4 : 0})">${legs}</g>${upper}${umb}`;
  return flip ? `<g transform="scale(-1,1)">${body}</g>` : body;
}
function sh(c: string, f = 0.85) {
  c = c.replace('#', '');
  const n = [0, 2, 4].map((i) => Math.round(parseInt(c.substr(i, 2), 16) * f));
  return '#' + n.map((v) => v.toString(16).padStart(2, '0')).join('');
}
export const OUTFITS = {
  manajer: {
    shirt: '#2F5BEA',
    pants: '#2B3558',
    hair: '#2A2F4A',
    acc: 'blazer lanyard',
    label: 'Manajer (Anda)',
  },
  admin: { shirt: '#F8CFE0', pants: '#4A5784', hair: '#8A5A7A', acc: 'hijab', label: 'Staf Admin' },
  bendahara: {
    shirt: '#BFE8D2',
    pants: '#3A4A7A',
    hair: '#2A2F4A',
    acc: 'glasses',
    label: 'Bendahara',
  },
  gudang: {
    shirt: '#FBD9C3',
    pants: '#3A4A7A',
    hair: '#4A3A2A',
    acc: 'helmet',
    label: 'Petugas Gudang',
  },
  kurir: { shirt: '#FCEBB5', pants: '#4A5784', hair: '#2A2F4A', acc: 'cap', label: 'Kurir Mitra' },
  lapangan: {
    shirt: '#B9C4F2',
    pants: '#2B3558',
    hair: '#5A3A2A',
    skin: '#E8B896',
    acc: '',
    label: 'Staf Lapangan',
  },
};
