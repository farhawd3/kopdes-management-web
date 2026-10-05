'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Building2, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  animateCharacter,
  createCharacter,
  createExterior,
  createInterior,
  createSelectionBrackets,
  palette,
} from './world-objects';
import {
  worldStations,
  type CharacterActivity,
  type WorldLocation,
  type WorldModel,
  type WorldPreferences,
} from './world-model';
import {
  createTrafficShuffleBag,
  stepTrafficSimulation,
  type TrafficVehicleState,
  type VehicleType,
} from './world-traffic';
import {
  DialogueManager,
  type DialogueBubble,
  type DialogueContext,
} from './world-dialogue';
import { getLightingForMinute } from './world-lighting';

type Props = {
  model: WorldModel;
  location: WorldLocation;
  weather: WorldPreferences['weather'];
  hour: number;
  minuteOfDay?: number;
  isPaused?: boolean;
  outfit: WorldPreferences['outfit'];
  activity: CharacterActivity;
  zoom: number;
  rotation: number;
  selected: string;
  bubble: string;
  onSelect: (id: string) => void;
};
export function WorldScene({
  model,
  location,
  weather,
  hour,
  minuteOfDay,
  isPaused = false,
  outfit,
  activity,
  zoom,
  rotation,
  selected,
  bubble,
  onSelect,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const markerRefs = useRef(new Map<string, HTMLDivElement>());
  const runtime = useRef<{ camera: THREE.OrthographicCamera; controls: OrbitControls } | null>(
    null,
  );
  const motion = useRef({ activity, weather, hour, minuteOfDay, isPaused });
  const selectAction = useRef(onSelect);
  const selectedRef = useRef(selected);
  const [failed, setFailed] = useState(false);
  const [screenBubbles, setScreenBubbles] = useState<({ x: number; y: number } & DialogueBubble)[]>([]);
  useEffect(() => {
    motion.current = { activity, weather, hour, minuteOfDay, isPaused };
  }, [activity, weather, hour, minuteOfDay, isPaused]);
  useEffect(() => {
    selectAction.current = onSelect;
  }, [onSelect]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    if (!runtime.current) return;
    runtime.current.camera.zoom = zoom;
    runtime.current.camera.updateProjectionMatrix();
  }, [zoom]);
  useEffect(() => {
    if (!runtime.current) return;
    const { camera, controls } = runtime.current;
    const angle = Math.PI / 4 + rotation;
    controls.target.set(0, 0, 0);
    camera.position.set(Math.sin(angle) * 26, 23, Math.cos(angle) * 26);
    camera.lookAt(controls.target);
    controls.update();
  }, [rotation]);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      const failureFrame = requestAnimationFrame(() => setFailed(true));
      return () => cancelAnimationFrame(failureFrame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.domElement.setAttribute(
      'aria-label',
      location === 'luar'
        ? 'Lingkungan koperasi 3D. Geser untuk memutar, cubit untuk memperbesar.'
        : 'Interior koperasi 3D. Pilih meja melalui penanda atau panel.',
    );
    node.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e7edf9');
    const camera = new THREE.OrthographicCamera(-26, 26, 18, -18, 0.1, 200);
    camera.position.set(34, 30, 34);
    camera.lookAt(0, 0, 0);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.minZoom = 0.6;
    controls.maxZoom = 3.0;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = 1.18;
    controls.enablePan = true;
    controls.maxTargetRadius = 26;
    runtime.current = { camera, controls };
    const ambient = new THREE.HemisphereLight('#f4f8ff', '#9fb0cc', 2.8);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight('#fff8ec', 3.8);
    sun.position.set(-16, 26, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -32,
      right: 32,
      top: 24,
      bottom: -24,
      near: 1.0,
      far: 90,
    });
    sun.shadow.bias = -0.0003;
    sun.shadow.normalBias = 0.025;
    scene.add(sun);

    const nightPointLight = new THREE.PointLight('#fef08a', 0, 36, 1.8);
    nightPointLight.position.set(2, 6, 8);
    scene.add(nightPointLight);

    const interiorPointLight = new THREE.PointLight('#fff1dc', 0, 26, 1.6);
    interiorPointLight.position.set(0, 5.5, -1.0);
    scene.add(interiorPointLight);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: '#e5ebf8', roughness: 1 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);
    const world = new THREE.Group();
    scene.add(world);
    const selectionBrackets = createSelectionBrackets(world);
    let exteriorResult: ReturnType<typeof createExterior> | undefined;
    if (location === 'luar') {
      exteriorResult = createExterior(world, model);
    } else {
      createInterior(world);
    }
    const color = { biru: palette.navy, lavender: '#4338ca', hijau: '#1e3a8a' }[outfit];
    const characters =
      location === 'luar'
        ? [
            createCharacter(world, [-5, 0.1, 3.5], color, 0, 'manager'),
            createCharacter(world, [4, 0.42, 2.6], '#e11d48', 1, 'npc'),
            createCharacter(world, [4, 0.42, -2.6], '#f59e0b', 0, 'npc'),
            createCharacter(world, [-14, 0.1, -4.8], '#10b981', 2, 'npc'),
            createCharacter(world, [39.0, 0.1, 7.0], '#6366f1', 1, 'npc'),
          ]
        : [
            createCharacter(world, [-7.5, 0.42, -3.0], color, 0, 'manager'),
            createCharacter(world, [-1.8, 0.42, -4.4], '#3b82f6', 0, 'staff'),
            createCharacter(world, [-6.0, 0.42, -3.0], '#0284c7', 1, 'staff'),
            createCharacter(world, [9.2, 0.35, 4.8], '#10b981', 2, 'staff'),
          ];

    if (location === 'luar') {
      characters[0].group.userData.selection = 'manajer';
      characters[1].group.userData.selection = 'npc-warga-selatan';
      characters[2].group.userData.selection = 'npc-warga-utara';
      characters[3].group.userData.selection = 'npc-pejalan';
      characters[4].group.userData.selection = 'npc-jalan-kanan';
      characters[1].group.rotation.y = Math.PI;
      characters[2].group.rotation.y = 0;
    } else {
      characters[0].group.userData.selection = 'manajer';
      characters[1].group.userData.selection = 'karyawan-tugas';
      characters[2].group.userData.selection = 'karyawan-rapat';
      characters[3].group.userData.selection = 'karyawan-gym';
      characters[0].group.rotation.y = Math.PI;
      characters[1].group.rotation.y = Math.PI;
      characters[2].group.rotation.y = Math.PI;
      characters[3].group.rotation.y = 0;
    }
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerStart = [0, 0];
    const startPointer = (event: PointerEvent) => {
      pointerStart = [event.clientX, event.clientY];
    };
    const pickObject = (event: PointerEvent) => {
      if (Math.hypot(event.clientX - pointerStart[0], event.clientY - pointerStart[1]) > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObject(world, true)[0];
      let object: THREE.Object3D | null = hit?.object || null;
      while (object) {
        if (typeof object.userData.selection === 'string') {
          selectAction.current(object.userData.selection);
          return;
        }
        object = object.parent;
      }
    };
    renderer.domElement.addEventListener('pointerdown', startPointer);
    renderer.domElement.addEventListener('pointerup', pickObject);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectAction.current('kawasan');
      }
    };
    window.addEventListener('keydown', onKey);
    const rainCount = 450,
      rainPositions = new Float32Array(rainCount * 6);
    for (let i = 0; i < rainCount; i++) {
      const x = ((i * 17.37) % 60) - 30,
        y = (i * 7.19) % 20,
        z = ((i * 11.63) % 40) - 20;
      rainPositions.set([x, y, z, x - 0.12, y + 0.6, z], i * 6);
    }
    const rainGeometry = new THREE.BufferGeometry();
    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rain = new THREE.LineSegments(
      rainGeometry,
      new THREE.LineBasicMaterial({ color: '#8cadd9', transparent: true, opacity: 0.6 }),
    );
    scene.add(rain);
    const projected = new THREE.Vector3();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0,
      previous = 0,
      elapsed = 0,
      disposed = false;
    const resize = () => {
      const { width, height } = node.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      const aspect = width / height;
      const span = location === 'luar' ? (aspect < 1 ? 29 : 20.5) : aspect < 1 ? 16 : 11.5;
      camera.left = -span * aspect;
      camera.right = span * aspect;
      camera.top = span;
      camera.bottom = -span;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    resize();
    const positions = new Map<string, THREE.Vector3>();
    if (location === 'luar') {
      positions.set('koperasi', new THREE.Vector3(-5, 4.3, 0));
      positions.set('gudang', new THREE.Vector3(30, 4.2, -1.5));
      model.plots.forEach((plot) =>
        positions.set(
          plot.id,
          new THREE.Vector3(plot.position[0], plot.unit ? 3.2 : 0.6, plot.position[1]),
        ),
      );
    } else {
      worldStations
        .filter((station) => station.scope === 'kantor')
        .forEach((station) =>
          positions.set(station.id, new THREE.Vector3(station.position[0], 2.2, station.position[2])),
        );
    }

    // Waypoints for manager exterior patrol
    const pOffice = new THREE.Vector3(-5, 0.1, 3.5);
    const pPlaza = new THREE.Vector3(3.5, 0.1, 3.5);
    const pRightRoad = new THREE.Vector3(39.0, 0.1, 2.0);
    const pPlots = new THREE.Vector3(-10, 0.1, -4.8);

    // Traffic Simulation State (Paket 3 PRD v2)
    const trafficBag = createTrafficShuffleBag(99);
    let nextVehicleSpawn = 1.0;
    const trafficVehicles: Record<VehicleType, TrafficVehicleState> = {
      motor: {
        id: 'pool-motor',
        type: 'motor',
        color: '#79c8a0',
        direction: 1,
        x: -35,
        z: 10.8,
        speed: 2.8,
        targetSpeed: 2.8,
        opacity: 0,
        scale: 0.94,
        castShadow: false,
        state: 'despawned',
        lane: 'east',
      },
      mobil: {
        id: 'pool-mobil',
        type: 'mobil',
        color: palette.blue,
        direction: -1,
        x: 35,
        z: 13.2,
        speed: 3.2,
        targetSpeed: 3.2,
        opacity: 0,
        scale: 0.94,
        castShadow: false,
        state: 'despawned',
        lane: 'west',
      },
      van: {
        id: 'pool-van',
        type: 'van',
        color: '#fafcff',
        direction: 1,
        x: -35,
        z: 10.8,
        speed: 2.6,
        targetSpeed: 2.6,
        opacity: 0,
        scale: 0.94,
        castShadow: false,
        state: 'despawned',
        lane: 'east',
      },
      truk: {
        id: 'pool-truk',
        type: 'truk',
        color: palette.navy,
        direction: 1,
        x: -35,
        z: 10.8,
        speed: 2.2,
        targetSpeed: 2.2,
        opacity: 0,
        scale: 0.94,
        castShadow: false,
        state: 'despawned',
        lane: 'east',
      },
    };

    const dialogueManager = new DialogueManager();
    let lastBubbleSync = 0;

    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const getTargetCoords = (sel: string): [number, number, number] | null => {
      if (sel === 'manajer') return location === 'luar' ? [-5, 0.4, 3.5] : [-7.5, 0.4, -3.0];
      if (sel === 'karakter') return location === 'luar' ? [4, 0.4, 2.6] : [1.8, 0.4, -2.0];
      if (sel === 'npc-warga-selatan') return [4, 0.5, 2.8];
      if (sel === 'npc-warga-utara') return [4, 0.5, -2.8];
      if (sel === 'npc-pejalan') return [-10, 0.5, -4.8];
      if (sel === 'npc-jalan-kanan') return [39.0, 0.5, 2.0];
      if (sel === 'karyawan-tugas') return [-1.8, 0.5, -4.4];
      if (sel === 'karyawan-rapat') return [-6.0, 0.5, -3.0];
      if (sel === 'karyawan-gym') return [9.2, 0.5, 4.8];
      if (sel === 'gudang' || sel === 'logistik') return [30, 1.2, -1.5];
      if (sel === 'kendaraan-manajer') return [-18.2, 0.5, 5.2];
      if (sel === 'kendaraan-van') return [25.8, 0.5, 6.2];
      if (sel === 'kendaraan-truk-mitra') return [34.2, 0.6, 6.2];
      if (sel === 'koperasi') return [-5, 1.2, 0];
      if (sel === 'rapat') return [-7.5, 0.8, -4.5];
      if (sel === 'tugas') return [0, 0.8, -4.5];
      if (sel === 'kegiatan') return [7.8, 0.8, 4.6];
      if (sel === 'dokumen') return [-7.6, 0.8, 5.6];
      const p = model.plots.find((item) => item.id === sel);
      if (p) return [p.position[0], 0.8, p.position[1]];
      return null;
    };

    const draw = (stamp: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      if (document.hidden || stamp - previous < 32) return;
      const dt = Math.min((stamp - previous) / 1000, 0.06);
      const state = motion.current;
      if (!state.isPaused) {
        elapsed += dt;
      }
      previous = stamp;

      // Smooth camera focus lerp
      const currentSelected = selectedRef.current;
      const coords = getTargetCoords(currentSelected);
      if (coords && currentSelected !== 'kawasan' && currentSelected !== 'lingkungan') {
        targetLookAt.set(coords[0], coords[1], coords[2]);
        selectionBrackets.position.set(coords[0], coords[1] + 0.05, coords[2]);
        selectionBrackets.visible = true;
      } else {
        targetLookAt.set(0, 0, 0);
        selectionBrackets.visible = false;
      }
      controls.target.lerp(targetLookAt, 0.06);
      controls.update();

      const currentMinute =
        state.minuteOfDay !== undefined
          ? state.minuteOfDay
          : state.hour * 60;
      const lighting = getLightingForMinute(currentMinute, state.weather);

      scene.background = new THREE.Color(lighting.skyBackground);
      (floor.material as THREE.MeshStandardMaterial).color.set(lighting.skyBackground);

      ambient.color.set(lighting.ambientColor);
      ambient.intensity = lighting.ambientIntensity * 2.6;

      sun.color.set(lighting.sunColor);
      sun.intensity = lighting.sunIntensity * 3.4;
      sun.position.set(lighting.sunPosition[0], lighting.sunPosition[1], lighting.sunPosition[2]);

      // Point lights untuk malam dan interior
      if (location === 'luar') {
        nightPointLight.intensity = lighting.lampIntensity * 2.2;
        interiorPointLight.intensity = 0;
      } else {
        nightPointLight.intensity = 0;
        interiorPointLight.intensity = lighting.lampIntensity * 2.4 + 1.2;
      }

      // Update tiang lampu jalan & pendar tanah
      if (exteriorResult?.streetLamps) {
        for (const bulb of exteriorResult.streetLamps) {
          const mat = bulb.material as THREE.MeshStandardMaterial;
          mat.emissive.set(lighting.streetLightEmissive);
          mat.emissiveIntensity = lighting.lampIntensity * 1.5;
        }
      }
      if (exteriorResult?.groundGlows) {
        for (const glow of exteriorResult.groundGlows) {
          const mat = glow.material as THREE.MeshStandardMaterial;
          mat.opacity = lighting.lampIntensity * 0.45;
        }
      }

      // Animate 2-phase Traffic Light
      let isMainGreen = true;
      if (exteriorResult?.trafficLights && location === 'luar') {
        const cycle = 31; // 14s green, 3s yellow, 14s red
        const tPhase = elapsed % cycle;
        isMainGreen = tPhase < 14;
        const isMainYellow = tPhase >= 14 && tPhase < 17;
        const isMainRed = tPhase >= 17;

        for (const tl of exteriorResult.trafficLights) {
          const redMat = tl.red.material as THREE.MeshStandardMaterial;
          const yellowMat = tl.yellow.material as THREE.MeshStandardMaterial;
          const greenMat = tl.green.material as THREE.MeshStandardMaterial;

          redMat.emissiveIntensity = isMainRed ? 0.95 : 0.05;
          yellowMat.emissiveIntensity = isMainYellow ? 0.95 : 0.05;
          greenMat.emissiveIntensity = isMainGreen ? 0.95 : 0.05;
        }
      }

      // Animate Traffic Fleet (Motor, Mobil, Van, Truk) with Shuffle-Bag Spawner & Fade
      if (exteriorResult?.trafficPool && location === 'luar') {
        if (!reduced.matches) {
          // Calm budget: max active vehicles (desktop 3, mobile 2)
          const maxActive = window.innerWidth <= 768 ? 2 : 3;
          const activeCount = Object.values(trafficVehicles).filter((v) => v.state !== 'despawned').length;

          // Spawner: spawn vehicle if budget allows and timer reached
          if (elapsed >= nextVehicleSpawn && activeCount < maxActive) {
            const nextType = trafficBag.draw();
            const candidate = trafficVehicles[nextType];
            if (candidate && candidate.state === 'despawned') {
              const dir: 1 | -1 = trafficBag.nextRandom() > 0.45 ? 1 : -1;
              candidate.direction = dir;
              candidate.x = dir === 1 ? -31 : 31;
              candidate.z = dir === 1 ? 10.8 : 13.2;
              candidate.speed = candidate.targetSpeed;
              candidate.state = 'driving';
              candidate.opacity = 0;
              candidate.scale = 0.94;
              candidate.castShadow = false;
              nextVehicleSpawn = elapsed + 5 + trafficBag.nextRandom() * 7; // jeda acak 5-12 dtk
            }
          }

          // Step simulation
          stepTrafficSimulation(Object.values(trafficVehicles), dt, isMainGreen);

          // Update Three.js meshes
          for (const key of ['motor', 'mobil', 'van', 'truk'] as VehicleType[]) {
            const v = trafficVehicles[key];
            const meshGroup = exteriorResult.trafficPool[key];
            if (!meshGroup) continue;

            if (v.state === 'despawned' || v.opacity <= 0.01) {
              meshGroup.visible = false;
            } else {
              meshGroup.visible = true;
              meshGroup.position.x = v.x;
              meshGroup.position.z = v.z;
              meshGroup.rotation.y = v.direction === 1 ? 0 : Math.PI;
              meshGroup.scale.setScalar(v.scale);

              meshGroup.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                  child.material.opacity = v.opacity;
                  child.castShadow = v.castShadow;
                }
              });
            }
          }
        } else {
          for (const key of ['motor', 'mobil', 'van', 'truk'] as VehicleType[]) {
            const meshGroup = exteriorResult.trafficPool[key];
            if (meshGroup) meshGroup.visible = false;
          }
        }
      }

      // Exterior & Interior NPC Patrol and Dynamic Behaviors
      let isManagerWalking = false;
      const isWalkingFlags: boolean[] = [false, false, false, false, false];

      const hasTaskProcess = model.tasks.some((t) => t.data.status === 'proses');
      const hasMeeting = Boolean(model.currentMeeting || model.meetings.length > 0);
      const hasActivities = model.activities.length > 0;

      if (location === 'luar') {
        if (!reduced.matches) {
          // Patroli Manajer di Luar (loop 90 detik melewati kantor, plaza, jalan samping kanan, dan deretan gerai)
          const loop = 90;
          const phase = elapsed % loop;
          if (phase < 25) {
            // Berdiri di depan kantor koperasi: menyapa dan mengamati kawasan
            characters[0].group.position.copy(pOffice);
            characters[0].group.rotation.y = Math.PI * 0.12;
            characters[0].base.copy(pOffice);
          } else if (phase < 36) {
            // Berjalan dari Kantor ke Plaza Air Mancur
            isManagerWalking = true;
            isWalkingFlags[0] = true;
            const r = (phase - 25) / 11;
            characters[0].group.position.lerpVectors(pOffice, pPlaza, r);
            const dx = pPlaza.x - pOffice.x;
            const dz = pPlaza.z - pOffice.z;
            characters[0].group.rotation.y = Math.atan2(dx, dz);
            characters[0].base.copy(characters[0].group.position);
          } else if (phase < 46) {
            // Berdiri di Plaza mengamati air mancur & menyapa warga
            characters[0].group.position.copy(pPlaza);
            characters[0].group.rotation.y = -Math.PI * 0.2;
            characters[0].base.copy(pPlaza);
          } else if (phase < 58) {
            // Berjalan dari Plaza ke trotoar Jalan Raya Samping Kanan baru (X = 39.0)
            isManagerWalking = true;
            isWalkingFlags[0] = true;
            const r = (phase - 46) / 12;
            characters[0].group.position.lerpVectors(pPlaza, pRightRoad, r);
            const dx = pRightRoad.x - pPlaza.x;
            const dz = pRightRoad.z - pPlaza.z;
            characters[0].group.rotation.y = Math.atan2(dx, dz);
            characters[0].base.copy(characters[0].group.position);
          } else if (phase < 68) {
            // Berjalan dari Jalan Samping Kanan ke deretan gerai (X = -10, Z = -4.8)
            isManagerWalking = true;
            isWalkingFlags[0] = true;
            const r = (phase - 58) / 10;
            characters[0].group.position.lerpVectors(pRightRoad, pPlots, r);
            const dx = pPlots.x - pRightRoad.x;
            const dz = pPlots.z - pRightRoad.z;
            characters[0].group.rotation.y = Math.atan2(dx, dz);
            characters[0].base.copy(characters[0].group.position);
          } else if (phase < 78) {
            // Menginspeksi kesiapan unit usaha gerai
            characters[0].group.position.copy(pPlots);
            characters[0].group.rotation.y = Math.PI;
            characters[0].base.copy(pPlots);
          } else {
            // Kembali ke depan Kantor Koperasi
            isManagerWalking = true;
            isWalkingFlags[0] = true;
            const r = (phase - 78) / 12;
            characters[0].group.position.lerpVectors(pPlots, pOffice, r);
            const dx = pOffice.x - pPlots.x;
            const dz = pOffice.z - pPlots.z;
            characters[0].group.rotation.y = Math.atan2(dx, dz);
            characters[0].base.copy(characters[0].group.position);
          }

          // Karakter 3: NPC Pejalan Kaki di Trotoar Depan Gerai (bolak-balik X = -15 s/d 14 di Z = -4.8)
          if (characters[3]) {
            const walkLoop = 40;
            const wPhase = elapsed % walkLoop;
            const pStart = new THREE.Vector3(-15, 0.1, -4.8);
            const pEnd = new THREE.Vector3(14, 0.1, -4.8);
            if (wPhase < 16) {
              isWalkingFlags[3] = true;
              const r = wPhase / 16;
              characters[3].group.position.lerpVectors(pStart, pEnd, r);
              characters[3].group.rotation.y = Math.PI * 0.5; // Menghadap timur
            } else if (wPhase < 22) {
              characters[3].group.position.copy(pEnd);
              characters[3].group.rotation.y = Math.PI; // Menghadap gerai
            } else if (wPhase < 36) {
              isWalkingFlags[3] = true;
              const r = (wPhase - 22) / 14;
              characters[3].group.position.lerpVectors(pEnd, pStart, r);
              characters[3].group.rotation.y = -Math.PI * 0.5; // Menghadap barat
            } else {
              characters[3].group.position.copy(pStart);
              characters[3].group.rotation.y = 0; // Menghadap selatan
            }
            characters[3].base.copy(characters[3].group.position);
          }

          // Karakter 4: NPC Pejalan Kaki di Trotoar Jalan Raya Samping Kanan (X = 39.0, Z = 7.0 s/d -14.0)
          if (characters[4]) {
            const rightLoop = 36;
            const rPhase = (elapsed + 10) % rightLoop;
            const pSouth = new THREE.Vector3(39.0, 0.1, 7.0);
            const pNorth = new THREE.Vector3(39.0, 0.1, -14.0);
            if (rPhase < 15) {
              isWalkingFlags[4] = true;
              const r = rPhase / 15;
              characters[4].group.position.lerpVectors(pSouth, pNorth, r);
              characters[4].group.rotation.y = Math.PI; // Menghadap utara
            } else if (rPhase < 20) {
              characters[4].group.position.copy(pNorth);
              characters[4].group.rotation.y = -Math.PI * 0.5; // Menghadap barat melihat gudang
            } else if (rPhase < 32) {
              isWalkingFlags[4] = true;
              const r = (rPhase - 20) / 12;
              characters[4].group.position.lerpVectors(pNorth, pSouth, r);
              characters[4].group.rotation.y = 0; // Menghadap selatan
            } else {
              characters[4].group.position.copy(pSouth);
              characters[4].group.rotation.y = -Math.PI * 0.5; // Menghadap barat
            }
            characters[4].base.copy(characters[4].group.position);
          }
        } else {
          characters[0].base.copy(pOffice);
        }
      } else {
        // Interior 22x15: Penempatan & Perilaku Dinamis Karyawan Kantor
        // Karakter 0 (Manajer KDMP)
        if (state.activity === 'meeting') {
          characters[0].base.set(-7.5, 0.42, -3.0);
          characters[0].group.rotation.y = Math.PI;
        } else if (state.activity === 'gym') {
          characters[0].base.set(6.4, 0.35, 4.8);
          characters[0].group.rotation.y = 0;
        } else if (state.activity === 'work') {
          characters[0].base.set(-1.8, 0.42, -2.0);
          characters[0].group.rotation.y = Math.PI;
        } else {
          // Jika tidak ada kegiatan wajib, manajer berkeliling santai di koridor lapang
          const mLoop = 36;
          const mPhase = elapsed % mLoop;
          const pLobby = new THREE.Vector3(0, 0.1, 2.5);
          const pArchiveCheck = new THREE.Vector3(-7.6, 0.1, 2.5);
          if (mPhase < 12) {
            isWalkingFlags[0] = true;
            characters[0].group.position.lerpVectors(pLobby, pArchiveCheck, mPhase / 12);
            characters[0].group.rotation.y = -Math.PI * 0.5; // Menghadap barat
          } else if (mPhase < 22) {
            characters[0].group.position.copy(pArchiveCheck);
            characters[0].group.rotation.y = Math.PI; // Menghadap arsip
          } else if (mPhase < 30) {
            isWalkingFlags[0] = true;
            characters[0].group.position.lerpVectors(pArchiveCheck, pLobby, (mPhase - 22) / 8);
            characters[0].group.rotation.y = Math.PI * 0.5; // Menghadap timur
          } else {
            characters[0].group.position.copy(pLobby);
            characters[0].group.rotation.y = 0;
          }
          characters[0].base.copy(characters[0].group.position);
        }

        // Karakter 1 (Karyawan Staf Meja Tugas)
        if (characters[1]) {
          if (hasTaskProcess) {
            // Ada tugas: duduk bekerja di meja komputer workstation
            characters[1].base.set(-1.8, 0.42, -4.4);
            characters[1].group.position.set(-1.8, 0.42, -4.4);
            characters[1].group.rotation.y = Math.PI;
          } else {
            // Tidak ada tugas: berjalan-jalan santai ke Pojok Santai
            const tLoop = 32;
            const tPhase = elapsed % tLoop;
            const pDesk = new THREE.Vector3(-1.8, 0.1, -2.5);
            const pLounge = new THREE.Vector3(7.8, 0.1, -2.5);
            if (tPhase < 10) {
              isWalkingFlags[1] = true;
              characters[1].group.position.lerpVectors(pDesk, pLounge, tPhase / 10);
              characters[1].group.rotation.y = Math.PI * 0.5; // Menghadap timur
            } else if (tPhase < 24) {
              characters[1].group.position.copy(pLounge);
              characters[1].group.rotation.y = -Math.PI * 0.5;
            } else {
              isWalkingFlags[1] = true;
              characters[1].group.position.lerpVectors(pLounge, pDesk, (tPhase - 24) / 8);
              characters[1].group.rotation.y = -Math.PI * 0.5; // Menghadap barat
            }
            characters[1].base.copy(characters[1].group.position);
          }
        }

        // Karakter 2 (Karyawan Staf Rapat & Notulen)
        if (characters[2]) {
          if (hasMeeting) {
            // Ada rapat: duduk di kursi meja rapat eksekutif
            characters[2].base.set(-6.0, 0.42, -3.0);
            characters[2].group.position.set(-6.0, 0.42, -3.0);
            characters[2].group.rotation.y = Math.PI;
          } else {
            // Tidak ada rapat: berjalan-jalan ke koridor tengah
            const rLoop = 36;
            const rPhase = (elapsed + 6) % rLoop;
            const pMeet = new THREE.Vector3(-6.0, 0.1, -2.0);
            const pCorridor = new THREE.Vector3(-1.0, 0.1, 1.5);
            if (rPhase < 12) {
              isWalkingFlags[2] = true;
              characters[2].group.position.lerpVectors(pMeet, pCorridor, rPhase / 12);
              const dx = pCorridor.x - pMeet.x;
              const dz = pCorridor.z - pMeet.z;
              characters[2].group.rotation.y = Math.atan2(dx, dz); // Menghadap arah jalan
            } else if (rPhase < 26) {
              characters[2].group.position.copy(pCorridor);
              characters[2].group.rotation.y = 0;
            } else {
              isWalkingFlags[2] = true;
              characters[2].group.position.lerpVectors(pCorridor, pMeet, (rPhase - 26) / 10);
              const dx = pMeet.x - pCorridor.x;
              const dz = pMeet.z - pCorridor.z;
              characters[2].group.rotation.y = Math.atan2(dx, dz); // Menghadap arah jalan kembali
            }
            characters[2].base.copy(characters[2].group.position);
          }
        }

        // Karakter 3 (Karyawan Staf Lapangan & Gym)
        if (characters[3]) {
          if (hasActivities) {
            // Ada kegiatan: berlatih di treadmill gym
            characters[3].base.set(9.2, 0.35, 4.8);
            characters[3].group.position.set(9.2, 0.35, 4.8);
            characters[3].group.rotation.y = 0;
          } else {
            // Tidak ada kegiatan: berjalan-jalan santai di koridor lobi
            const gLoop = 30;
            const gPhase = (elapsed + 14) % gLoop;
            const pGym = new THREE.Vector3(7.8, 0.1, 2.0);
            const pLobbyCenter = new THREE.Vector3(1.5, 0.1, 2.0);
            if (gPhase < 11) {
              isWalkingFlags[3] = true;
              characters[3].group.position.lerpVectors(pGym, pLobbyCenter, gPhase / 11);
              characters[3].group.rotation.y = -Math.PI * 0.5; // Menghadap barat
            } else if (gPhase < 19) {
              characters[3].group.position.copy(pLobbyCenter);
              characters[3].group.rotation.y = 0;
            } else {
              isWalkingFlags[3] = true;
              characters[3].group.position.lerpVectors(pLobbyCenter, pGym, (gPhase - 19) / 11);
              characters[3].group.rotation.y = Math.PI * 0.5; // Menghadap timur
            }
            characters[3].base.copy(characters[3].group.position);
          }
        }
      }

      dialogueManager.update(dt);

      const dialogueCtx: DialogueContext = {
        managerName: model.manager || 'Manajer',
        openTasksCount: model.tasks.length,
        inProgressTasksCount: model.tasks.filter((t) => t.data.status === 'proses').length,
        completedTasksCount: model.tasks.filter((t) => t.data.status === 'selesai').length,
        hasMeetingSoon: Boolean(model.currentMeeting),
        meetingTitle: model.currentMeeting?.data.title ? String(model.currentMeeting.data.title) : undefined,
        recordedUnitsCount: model.units.length,
        emptyPlotsCount: Math.max(0, 7 - model.units.length),
        hasActivitiesToday: model.activities.length > 0,
        activitiesCount: model.activities.length,
        weather: state.weather,
        timeHour: state.hour,
      };

      if (location === 'luar') {
        const loop = 90;
        const phase = elapsed % loop;
        // Ketika manajer berada di Plaza dekat warga (phase 38-46)
        if (phase >= 38 && phase <= 46) {
          dialogueManager.triggerDialogue(
            'manajer',
            'warga-plaza',
            model.manager || 'Manajer',
            'manager',
            [characters[0].group.position.x, 0, characters[0].group.position.z],
            dialogueCtx,
            elapsed,
            'pass_by',
          );
        } else if (phase >= 52 && phase <= 58) {
          // Ketika manajer melintasi jalan samping kanan dekat NPC kurir/staf
          dialogueManager.triggerDialogue(
            'manajer',
            'npc-jalan-kanan',
            model.manager || 'Manajer',
            'manager',
            [characters[0].group.position.x, 0, characters[0].group.position.z],
            dialogueCtx,
            elapsed,
            'pass_by',
          );
        } else if (phase >= 68 && phase <= 74) {
          // Ketika manajer melintasi trotoar gerai
          dialogueManager.triggerDialogue(
            'manajer',
            'npc-pejalan',
            model.manager || 'Manajer',
            'manager',
            [characters[0].group.position.x, 0, characters[0].group.position.z],
            dialogueCtx,
            elapsed,
            'pass_by',
          );
        }
      } else {
        // Di kantor: manajer mengunjungi meja kerja staf (elapsed % 40 antara 10 dan 18)
        const deskPhase = elapsed % 40;
        if (deskPhase >= 10 && deskPhase <= 18) {
          dialogueManager.triggerDialogue(
            'manajer',
            'karyawan-tugas',
            model.manager || 'Manajer',
            'manager',
            [characters[0].group.position.x, 0, characters[0].group.position.z],
            dialogueCtx,
            elapsed,
            'desk_visit',
          );
        }
      }

      // Check speaking & listening status for pose reaction
      const activeBubblesList = dialogueManager.getBubbles();
      const isSpeaking = (id: string) => activeBubblesList.some((b) => b.senderId === id);
      const isListening = (id: string) => activeBubblesList.some((b) => b.receiverId === id);

      characters.forEach((character, index) => {
        let mode: CharacterActivity = 'idle';

        if (location === 'luar') {
          if (index === 0) {
            mode = isManagerWalking ? 'walk' : 'idle';
          } else if (index === 1 || index === 2) {
            // Warga duduk santai di bangku taman plaza
            mode = 'meeting';
          } else if (index === 3 || index === 4) {
            // NPC pejalan kaki di gerai / jalan samping kanan
            mode = isWalkingFlags[index] ? 'walk' : 'idle';
          }
        } else {
          // Interior
          if (index === 0) {
            mode = isWalkingFlags[0] ? 'walk' : state.activity;
          } else if (index === 1) {
            // Karyawan Meja Tugas: kerja bila ada tugas proses, jalan roaming bila tidak
            mode = hasTaskProcess ? 'work' : isWalkingFlags[1] ? 'walk' : 'idle';
          } else if (index === 2) {
            // Karyawan Notulen/Rapat: rapat bila ada agenda, jalan roaming bila tidak
            mode = hasMeeting ? 'meeting' : isWalkingFlags[2] ? 'walk' : 'idle';
          } else if (index === 3) {
            // Karyawan Lapangan/Gym: gym bila ada kegiatan, jalan roaming bila tidak
            mode = hasActivities ? 'gym' : isWalkingFlags[3] ? 'walk' : 'idle';
          }
        }

        const charIds =
          location === 'luar'
            ? ['manajer', 'warga-plaza', 'warga-plaza-utara', 'npc-pejalan', 'npc-jalan-kanan']
            : ['manajer', 'karyawan-tugas', 'karyawan-rapat', 'karyawan-kegiatan'];

        const charId = charIds[index] || `char-${index}`;
        if (isSpeaking(charId)) {
          mode = 'talk';
        } else if (isListening(charId) && mode === 'idle') {
          mode = 'greet';
        }

        const isWalking = isWalkingFlags[index] || (index === 0 && isManagerWalking);
        animateCharacter(character, elapsed + index * 2, mode, reduced.matches, isWalking);
      });

      // Synchronize floating dialogue bubbles to 2D screen coordinates (mengikuti karakter yang berjalan secara real-time)
      if (elapsed - lastBubbleSync >= 0.03) {
        lastBubbleSync = elapsed;
        if (activeBubblesList.length > 0) {
          const projectedBubbles = activeBubblesList.map((b) => {
            let charPos: THREE.Vector3 | null = null;
            if (b.senderId === 'manajer' && characters[0]) {
              charPos = characters[0].group.position;
            } else if (location === 'luar') {
              if ((b.senderId === 'warga-plaza' || b.senderId === 'npc-warga-selatan') && characters[1]) {
                charPos = characters[1].group.position;
              } else if (b.senderId === 'npc-warga-utara' && characters[2]) {
                charPos = characters[2].group.position;
              } else if (b.senderId === 'npc-pejalan' && characters[3]) {
                charPos = characters[3].group.position;
              } else if (b.senderId === 'npc-jalan-kanan' && characters[4]) {
                charPos = characters[4].group.position;
              }
            } else {
              if (b.senderId === 'karyawan-tugas' && characters[1]) {
                charPos = characters[1].group.position;
              } else if (b.senderId === 'karyawan-rapat' && characters[2]) {
                charPos = characters[2].group.position;
              } else if ((b.senderId === 'karyawan-gym' || b.senderId === 'karyawan-kegiatan') && characters[3]) {
                charPos = characters[3].group.position;
              }
            }
            const worldX = charPos ? charPos.x : b.position[0];
            const worldY = (charPos ? charPos.y : b.position[1]) + 2.3;
            const worldZ = charPos ? charPos.z : b.position[2];

            const v = new THREE.Vector3(worldX, worldY, worldZ);
            v.project(camera);
            return {
              ...b,
              x: (v.x * 0.5 + 0.5) * node.clientWidth,
              y: (-v.y * 0.5 + 0.5) * node.clientHeight,
            };
          });
          setScreenBubbles(projectedBubbles);
        } else {
          setScreenBubbles([]);
        }
      }

      positions.set(
        'karakter',
        characters[0].group.position.clone().add(new THREE.Vector3(0, 2.4, 0)),
      );

      for (const [id, position] of positions) {
        const marker = markerRefs.current.get(id);
        if (!marker) continue;
        projected.copy(position).project(camera);
        marker.style.left = `${(projected.x * 0.5 + 0.5) * node.clientWidth}px`;
        marker.style.top = `${(-projected.y * 0.5 + 0.5) * node.clientHeight}px`;
        marker.style.visibility =
          Math.abs(projected.x) > 1.05 || Math.abs(projected.y) > 1.05 ? 'hidden' : 'visible';
      }

      rain.visible = state.weather === 'hujan' && location === 'luar';
      if (rain.visible && !reduced.matches) {
        const a = rainGeometry.attributes.position;
        for (let i = 0; i < rainCount; i++) {
          const y = (20 + ((i * 7.19) % 20) - ((elapsed * 9) % 20)) % 20;
          a.setY(i * 2, y);
          a.setY(i * 2 + 1, y + 0.6);
        }
        a.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    const lost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', lost);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      runtime.current = null;
      renderer.domElement.removeEventListener('pointerdown', startPointer);
      renderer.domElement.removeEventListener('pointerup', pickObject);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((mat) => {
            if ('map' in mat && mat.map instanceof THREE.Texture) mat.map.dispose();
            mat.dispose();
          });
        }
      });
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      window.removeEventListener('keydown', onKey);
      renderer.dispose();
      renderer.domElement.remove();
    };
    // The scene is rebuilt only when its geometry/data changes; animation settings use motion.current.
  }, [location, model, outfit]);
  const markers =
    location === 'luar'
      ? [
          { id: 'koperasi', label: 'Kantor koperasi', occupied: true },
          ...model.plots.map((plot, i) => ({
            id: plot.id,
            label: plot.unit
              ? String(plot.unit.data.title)
              : `Lahan ${String(i + 1).padStart(2, '0')}`,
            occupied: Boolean(plot.unit),
          })),
        ]
      : worldStations.map((station) => ({ id: station.id, label: station.title, occupied: true }));
  return (
    <div className="cw-scene" ref={host}>
      {failed && (
        <div className="cw-render-error" role="alert">
          Tampilan 3D tidak tersedia di perangkat ini. Gunakan daftar lokasi untuk membuka gerai dan
          ruang kerja.
        </div>
      )}
      {!failed &&
        markers.map((marker) => (
          <div
            className="cw-marker"
            key={marker.id}
            ref={(node) => {
              if (node) markerRefs.current.set(marker.id, node);
              else markerRefs.current.delete(marker.id);
            }}
          >
            <Button
              className={`cw-map-pin ${selected === marker.id ? 'is-selected' : ''} ${!marker.occupied ? 'is-empty' : ''}`}
              onClick={() => onSelect(marker.id)}
              aria-label={marker.id === 'koperasi' ? 'Masuk kantor koperasi' : marker.label}
            >
              {marker.id === 'koperasi' ? (
                <Building2 size={16} />
              ) : marker.occupied ? (
                <MapPin size={14} />
              ) : (
                <Plus size={14} />
              )}
              <span>{marker.label}</span>
            </Button>
          </div>
        ))}
      {!failed && (selected === 'karakter' || selected === 'manajer') && bubble && (
        <div
          className="cw-marker cw-character-marker"
          ref={(node) => {
            if (node) markerRefs.current.set('karakter', node);
          }}
        >
          <div className="cw-speech" role="status">
            {bubble}
          </div>
        </div>
      )}
      {!failed &&
        screenBubbles.map((b) => (
          <div
            key={b.id}
            className="cw-dialogue-bubble"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
            }}
            aria-hidden="true"
          >
            <div className="cw-bubble-card">
              <strong>{b.speakerName}</strong>
              <p>{b.text}</p>
            </div>
            <div className="cw-bubble-tail" />
          </div>
        ))}
    </div>
  );
}
