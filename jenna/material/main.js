import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const SCREEN_IMAGE = [
  '/v1740585635/woowacourse/web-wiki/sydney5.jpg',
  '/v1740585635/woowacourse/web-wiki/sydney.jpg',
  '/v1740585631/woowacourse/web-wiki/sydney7.jpg',
  '/v1740589241/woowacourse/web-wiki/sydney10.jpg',
  '/v1748972031/Study/Three.js/study_attendance.jpg',
  '/v1748972275/Study/Three.js/dining.jpg',
  '/v1748972069/Study/Three.js/grow_Graph.jpg',
  '/v1748973468/Study/Three.js/seolleung.jpg',
  '/v1748973453/Study/Three.js/bossam.jpg',
  '/v1748973446/Study/Three.js/fe_hangsungee.jpg',
  '/v1749379638/Study/Three.js/ramen.jpg',
  '/v1749379638/Study/Three.js/pairRoom.jpg',
  '/v1749379639/Study/Three.js/ground.jpg',
  '/v1749379638/Study/Three.js/portrait.jpg',
  '/v1749379639/Study/Three.js/bottle.jpg',
  '/v1749379639/Study/Three.js/takeoff.jpg',
  '/v1749379910/Study/Three.js/techotalk.png',
];

const RADIUS = 5;
const PLANE_HEIGHT = 2;
const SPIN_DURATION = 0.5; // 구가 빠르게 도는 시간 (초)
const SPIN_SPEED = 20; // 초당 회전량 (rad/s)
const SPAWN_DURATION = 1.0; // 사진 튀어나오는 애니메이션 시간 (초)
const MARGIN = 4; // 구 반지름 바깥 여유 거리

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.z = RADIUS * 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(2 * RADIUS));
scene.add(new THREE.AmbientLight('#f2f2ff', 2.8));
const dirLight = new THREE.DirectionalLight('#ffffff', 2);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const loader = new THREE.TextureLoader();
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

const screensGroup = new THREE.Group();
{
  const SCREEN_WIDTH = 5,
    SCREEN_HEIGHT = 3;
  const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT) + 2;
  const unitΘ = Math.PI / rows;
  for (let i = 1; i < rows - 1; i++) {
    const θ0 = i * unitΘ,
      θLen = unitΘ;
    const lat = Math.sin(θ0 + θLen / 2) * RADIUS;
    const cols = Math.ceil((2 * Math.PI * lat) / SCREEN_WIDTH);
    if (cols < 1) continue;
    const φLen = (2 * Math.PI) / cols;
    for (let j = 0; j < cols; j++) {
      const φ0 = j * φLen;
      const tex = textures[(i * cols + j) % textures.length];
      const geo = new THREE.SphereGeometry(RADIUS, 1, 1, φ0, φLen, θ0, θLen);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        emissive: '#111111',
        roughness: 0.8,
      });
      screensGroup.add(new THREE.Mesh(geo, mat));
    }
  }
}
scene.add(screensGroup);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let lastTime = 0;
let isSpinning = false;
let spinStartTime = 0;
let spawnStartTime = 0;
let clickPoint = new THREE.Vector3();
let floatingGroup = null;
let spawnPlanes = [];

window.addEventListener('click', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(screensGroup.children, true);
  if (!hits.length) return;
  clickPoint.copy(hits[0].point);

  isSpinning = true;
  spinStartTime = performance.now() / 1000;
  spawnStartTime = 0;
  if (floatingGroup) {
    scene.remove(floatingGroup);
    floatingGroup.children.forEach((m) => {
      m.geometry.dispose();
      m.material.dispose();
    });
    floatingGroup = null;
    spawnPlanes = [];
  }
});

function spawnImages() {
  floatingGroup = new THREE.Group();
  scene.add(floatingGroup);
  const spawnR = RADIUS + MARGIN;
  textures.forEach((tex) => {
    const img = tex.image;
    const aspect = img.width && img.height ? img.width / img.height : 1;
    const geo = new THREE.PlaneGeometry(aspect * PLANE_HEIGHT, PLANE_HEIGHT);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);

    const φ = Math.random() * Math.PI * 2;
    const cosθ = 2 * Math.random() - 1;
    const θ = Math.acos(cosθ);
    const dir = new THREE.Vector3(
      Math.sin(θ) * Math.cos(φ),
      Math.cos(θ),
      Math.sin(θ) * Math.sin(φ)
    );
    const targetPos = dir.clone().multiplyScalar(spawnR);

    mesh.position.copy(clickPoint);
    mesh.lookAt(camera.position);

    floatingGroup.add(mesh);
    spawnPlanes.push({
      mesh,
      startPos: clickPoint.clone(),
      targetPos,
    });
  });

  spawnStartTime = performance.now() / 1000;
}

function animate(time) {
  requestAnimationFrame(animate);
  const now = time / 1000;
  const dt = now - lastTime;
  lastTime = now;

  if (isSpinning) {
    const elapsed = now - spinStartTime;
    screensGroup.rotation.y += SPIN_SPEED * dt;
    if (elapsed >= SPIN_DURATION) {
      isSpinning = false;
      spawnImages();
    }
  }

  if (spawnStartTime) {
    const elapsed = now - spawnStartTime;
    const p = Math.min(elapsed / SPAWN_DURATION, 1);
    const ease = 1 - Math.pow(1 - p, 2);
    spawnPlanes.forEach(({ mesh, startPos, targetPos }) => {
      mesh.position.lerpVectors(startPos, targetPos, ease);
      mesh.lookAt(camera.position);
    });
    if (p >= 1) {
      spawnStartTime = 0;
    }
  }

  if (floatingGroup && !spawnStartTime) {
    floatingGroup.rotation.y += 0.001;
    floatingGroup.children.forEach((m) => m.lookAt(camera.position));
  }

  controls.update();
  composer.render();
}

requestAnimationFrame(animate);
