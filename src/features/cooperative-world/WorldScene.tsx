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
    sun.position.set(-16, 28, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -35,
      right: 35,
      top: 35,
      bottom: -35,
      near: 0.5,
      far: 110,
    });
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.04;
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
    const color = { biru: palette.blue, lavender: '#a18ae0', hijau: '#51aa8a' }[outfit];
    const characters = [
      createCharacter(world, location === 'luar' ? [-5, 0.1, 3.5] : [-4, 0.42, -1.2], color),
      createCharacter(
        world,
        location === 'luar' ? [4, 0.1, 2.5] : [4.6, 0.42, -1.5],
        '#a18ae0',
        1,
      ),
      createCharacter(world, location === 'luar' ? [-12, 0.1, 7.5] : [2.4, 0.35, 3.5], '#50ab90', 2),
    ];
    characters.forEach((character) => {
      character.group.userData.selection = 'karakter';
    });
    if (location === 'dalam') {
      characters[0].group.rotation.y = Math.PI;
      characters[1].group.rotation.y = 0;
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
      const span = location === 'luar' ? (aspect < 1 ? 26 : 18.5) : aspect < 1 ? 12 : 9;
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
      model.plots.forEach((plot) =>
        positions.set(
          plot.id,
          new THREE.Vector3(plot.position[0], plot.unit ? 3.2 : 0.6, plot.position[1]),
        ),
      );
    } else {
      worldStations.forEach((station) =>
        positions.set(station.id, new THREE.Vector3(station.position[0], 2.2, station.position[2])),
      );
    }

    // Waypoints for manager exterior patrol
    const pOffice = new THREE.Vector3(-5, 0.1, 3.5);
    const pPlaza = new THREE.Vector3(3.5, 0.1, 3.5);
    const pWalkway = new THREE.Vector3(3.5, 0.1, -4.5);
    const pPlots = new THREE.Vector3(-9, 0.1, -4.5);

    const draw = (stamp: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(draw);
      if (document.hidden || stamp - previous < 32) return;
      elapsed += Math.min((stamp - previous) / 1000, 0.06);
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

      // Animate ambient moving truck along road
      if (exteriorResult?.movingTruck && location === 'luar') {
        if (!reduced.matches) {
          const tx = ((elapsed * 2.6 + 32) % 68) - 34;
          exteriorResult.movingTruck.position.x = tx;
          exteriorResult.movingTruck.position.z = 10.8;
          exteriorResult.movingTruck.rotation.y = 0;
        } else {
          exteriorResult.movingTruck.position.set(13.5, 0, 10.8);
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
        // Interior Placement for Manager
        if (state.activity === 'meeting') {
          characters[0].base.set(-4, 0.42, -1.2);
          characters[0].group.rotation.y = Math.PI;
        } else if (state.activity === 'gym') {
          characters[0].base.set(2.4, 0.35, 3.5);
          characters[0].group.rotation.y = 0;
        } else if (state.activity === 'work') {
          characters[0].base.set(2.2, 0.42, -1.5);
          characters[0].group.rotation.y = 0;
        } else {
          characters[0].base.set(-1.0, 0.1, 1.5);
          characters[0].group.rotation.y = 0;
        }
      }

      characters.forEach((character, index) => {
        const mode =
          location === 'luar'
            ? 'idle'
            : index === 0
              ? state.activity
              : index === 1
                ? state.activity === 'work'
                  ? 'work'
                  : 'idle'
                : state.activity === 'gym'
                  ? 'gym'
                  : 'idle';
        const walking = index === 0 && isManagerWalking;
        animateCharacter(character, elapsed + index * 2, mode, reduced.matches, walking);
      });

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
    </div>
  );
}
