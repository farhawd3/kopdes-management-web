'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Building2, Plus, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  animateCharacter,
  createCharacter,
  createExterior,
  createInterior,
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

type Props = {
  model: WorldModel;
  location: WorldLocation;
  weather: WorldPreferences['weather'];
  hour: number;
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
  const motion = useRef({ activity, weather, hour });
  const selectAction = useRef(onSelect);
  const [failed, setFailed] = useState(false);
  const [screenBubbles, setScreenBubbles] = useState<({ x: number; y: number } & DialogueBubble)[]>([]);
  useEffect(() => {
    motion.current = { activity, weather, hour };
  }, [activity, weather, hour]);
  useEffect(() => {
    selectAction.current = onSelect;
  }, [onSelect]);
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
    let exteriorResult: ReturnType<typeof createExterior> | undefined;
    if (location === 'luar') {
      exteriorResult = createExterior(world, model);
    } else {
      createInterior(world);
    }
    const color = { biru: palette.navy, lavender: '#4338ca', hijau: '#1e3a8a' }[outfit];
    const characters = [
      createCharacter(world, location === 'luar' ? [-5, 0.1, 3.5] : [-7.5, 0.42, -3.0], color, 0, 'manager'),
      createCharacter(
        world,
        location === 'luar' ? [4, 0.42, 2.6] : [1.8, 0.42, -2.0],
        '#3b82f6',
        1,
        'staff',
      ),
      createCharacter(world, location === 'luar' ? [-2.2, 0.1, 1.2] : [9.2, 0.35, 4.8], '#50ab90', 2, location === 'luar' ? 'npc' : 'staff'),
    ];
    characters[0].group.userData.selection = 'manajer';
    characters[1].group.userData.selection = 'karakter';
    characters[2].group.userData.selection = 'karakter';
    if (location === 'luar') {
      // Karakter 1 duduk santai di bangku plaza selatan menghadap utara
      characters[1].group.rotation.y = Math.PI;
    } else {
      characters[0].group.rotation.y = Math.PI;
      characters[1].group.rotation.y = Math.PI;
      characters[2].group.rotation.y = 0;
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
      const span = location === 'luar' ? (aspect < 1 ? 26 : 18.5) : aspect < 1 ? 16 : 11.5;
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
      positions.set('gudang', new THREE.Vector3(18, 3.8, 3.8));
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
    const pWalkway = new THREE.Vector3(3.5, 0.1, -4.5);
    const pPlots = new THREE.Vector3(-9, 0.1, -4.5);

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

    const draw = (stamp: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      if (document.hidden || stamp - previous < 32) return;
      const dt = Math.min((stamp - previous) / 1000, 0.06);
      elapsed += dt;
      previous = stamp;
      controls.update();

      const state = motion.current,
        night = state.hour < 6 || state.hour >= 19,
        dusk = state.hour >= 16 && state.hour < 19;
      const sky = night
        ? '#1e293b'
        : dusk
          ? '#f3e8f4'
          : state.weather === 'cerah'
            ? '#e7edf9'
            : '#cbd7e9';
      scene.background = new THREE.Color(sky);
      (floor.material as THREE.MeshStandardMaterial).color.set(sky);
      ambient.intensity = night ? 1.5 : dusk ? 2.2 : 2.8;
      sun.intensity = night ? 0.9 : state.weather === 'cerah' ? 3.8 : 1.8;
      sun.color.set(dusk ? '#ffd4b2' : night ? '#a3bffa' : '#fff8ec');

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

      // Exterior Manager Patrol
      let isManagerWalking = false;
      if (location === 'luar') {
        if (!reduced.matches) {
          const loop = 80;
          const phase = elapsed % loop;
          if (phase < 35) {
            // Standing at Office front: looking around & idle
            characters[0].group.position.copy(pOffice);
            characters[0].group.rotation.y = Math.PI * 0.12;
            characters[0].base.copy(pOffice);
          } else if (phase < 45) {
            // Walking from Office to Plaza
            isManagerWalking = true;
            const r = (phase - 35) / 10;
            characters[0].group.position.lerpVectors(pOffice, pPlaza, r);
            characters[0].group.rotation.y = Math.PI * 0.5;
            characters[0].base.copy(characters[0].group.position);
          } else if (phase < 55) {
            // Inspecting Plaza fountain
            characters[0].group.position.copy(pPlaza);
            characters[0].group.rotation.y = -Math.PI * 0.2;
            characters[0].base.copy(pPlaza);
          } else if (phase < 65) {
            // Walking to Plots walkway
            isManagerWalking = true;
            const r = (phase - 55) / 10;
            characters[0].group.position.lerpVectors(pPlaza, pWalkway, r);
            characters[0].group.rotation.y = Math.PI;
            characters[0].base.copy(characters[0].group.position);
          } else if (phase < 72) {
            // Walking along Plots sidewalk
            isManagerWalking = true;
            const r = (phase - 65) / 7;
            characters[0].group.position.lerpVectors(pWalkway, pPlots, r);
            characters[0].group.rotation.y = -Math.PI * 0.5;
            characters[0].base.copy(characters[0].group.position);
          } else {
            // Returning to Office
            isManagerWalking = true;
            const r = (phase - 72) / 8;
            characters[0].group.position.lerpVectors(pPlots, pOffice, r);
            characters[0].group.rotation.y = Math.PI * 0.35;
            characters[0].base.copy(characters[0].group.position);
          }
        } else {
          characters[0].base.copy(pOffice);
        }
      } else {
        // Interior Placement for Manager in 22x15 office
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
          characters[0].base.set(0, 0.1, 3.2);
          characters[0].group.rotation.y = 0;
        }
      }

      dialogueManager.update(dt);

      const dialogueCtx: DialogueContext = {
        managerName: model.manager || 'Manajer',
        openTasksCount: model.tasks.length,
        hasMeetingSoon: Boolean(model.currentMeeting),
        meetingTitle: model.currentMeeting?.data.title ? String(model.currentMeeting.data.title) : undefined,
        recordedUnitsCount: model.units.length,
        weather: state.weather,
        timeHour: state.hour,
      };

      if (location === 'luar') {
        const loop = 80;
        const phase = elapsed % loop;
        // When manager visits Plaza fountain where citizen sits (phase 46-52)
        if (phase >= 46 && phase <= 52) {
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
        }
      } else {
        // In office: manager visiting workstation desk (elapsed % 45 between 10 and 18)
        const deskPhase = elapsed % 45;
        if (deskPhase >= 10 && deskPhase <= 18) {
          dialogueManager.triggerDialogue(
            'manajer',
            'staf-meja',
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
        let mode: CharacterActivity =
          location === 'luar'
            ? index === 1
              ? 'meeting' // Karakter wanita duduk santai di bangku taman plaza
              : 'idle'
            : index === 0
              ? state.activity
              : index === 1
                ? state.activity === 'work'
                  ? 'work'
                  : 'idle'
                : state.activity === 'gym'
                  ? 'gym'
                  : 'idle';

        const charId = index === 0 ? 'manajer' : index === 1 ? (location === 'luar' ? 'warga-plaza' : 'staf-meja') : 'staf-2';
        if (isSpeaking(charId)) {
          mode = 'talk';
        } else if (isListening(charId) && mode === 'idle') {
          mode = 'greet';
        }

        const walking = index === 0 && isManagerWalking;
        animateCharacter(character, elapsed + index * 2, mode, reduced.matches, walking);
      });

      // Synchronize floating dialogue bubbles to 2D screen coordinates
      if (elapsed - lastBubbleSync >= 0.08) {
        lastBubbleSync = elapsed;
        if (activeBubblesList.length > 0) {
          const projectedBubbles = activeBubblesList.map((b) => {
            const v = new THREE.Vector3(...b.position);
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
      {!failed && (
        <div
          className="cw-marker cw-character-marker"
          ref={(node) => {
            if (node) markerRefs.current.set('karakter', node);
          }}
        >
          {selected === 'karakter' && (
            <div className="cw-speech" role="status">
              {bubble}
            </div>
          )}
          <Button
            className="cw-character-pin"
            aria-label="Ajak maskot berbicara"
            onClick={() => onSelect('karakter')}
          >
            <MessageCircle size={16} />
          </Button>
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
