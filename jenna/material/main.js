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
];

const SCREEN_WIDTH = 5;
const SCREEN_HEIGHT = 3;
const RADIUS = 5;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = RADIUS * 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(new THREE.AxesHelper(2 * RADIUS));
scene.add(new THREE.AmbientLight('#ffffff', 1.5));
const dirLight = new THREE.DirectionalLight('#ffffff', 2);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const loader = new THREE.TextureLoader();
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

function makePatch(texture, thetaStart, thetaLength, phiStart, phiLength) {
  const geo = new THREE.SphereGeometry(
    RADIUS,
    1,
    1,
    thetaStart,
    thetaLength,
    phiStart,
    phiLength
  );
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    emissive: '#111111',
    roughness: 0.8,
  });
  return new THREE.Mesh(geo, mat);
}

const screensGroup = new THREE.Group();
const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT);
const fullBands = rows + 2;
const unitPhi = Math.PI / fullBands;

for (let i = 1; i < fullBands - 1; i++) {
  const phiStart = i * unitPhi;
  const phiLength = unitPhi;

  const latitude = Math.sin(phiStart + phiLength / 2) * RADIUS;
  const cols = Math.ceil((2 * Math.PI * latitude) / SCREEN_WIDTH);
  if (cols < 1) continue;

  const thetaLength = (2 * Math.PI) / cols;
  for (let j = 0; j < cols; j++) {
    const thetaStart = j * thetaLength;
    const texture = textures[(i * cols + j) % textures.length];

    const patch = makePatch(
      texture,
      thetaStart,
      thetaLength,
      phiStart,
      phiLength
    );

    screensGroup.add(patch);
  }
}

scene.add(screensGroup);

// ---------------------------------------------
// Raycaster와 “떠오르는 패치”용 변수 선언
// ---------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let floatingPatch = null;

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(screensGroup.children, true);
  if (intersects.length === 0) return;

  const hit = intersects[0];
  const hitMesh = hit.object;
  const hitFace = hit.face;
  if (!hitFace) return;

  // ✨ 클릭 위치(구 표면)에서 시작하도록 수정
  // 1. 클릭 위치(월드 좌표)
  const worldHitPoint = hit.point.clone();
  // 2. screensGroup의 로컬 좌표로 변환
  const localHitPoint = screensGroup.worldToLocal(worldHitPoint);

  // 3. 방향 벡터 (구 중심 -> 클릭 위치)
  const direction = localHitPoint.clone().normalize();

  // 4. 목표 위치 = 구 표면 위치 + 방향 * OFFSET
  const OFFSET = 2;
  const localOffset = localHitPoint
    .clone()
    .add(direction.multiplyScalar(OFFSET));

  // 기존 떠있는 패치 제거
  if (floatingPatch) {
    screensGroup.remove(floatingPatch);
    floatingPatch.geometry.dispose();
    floatingPatch.material.dispose();
    floatingPatch = null;
  }

  // 복제 패치 생성 (시작 위치=구 표면)
  floatingPatch = hitMesh.clone();
  floatingPatch.position.copy(localHitPoint); // 구 표면에서 시작!
  floatingPatch.scale.set(0.1, 0.1, 0.1);
  screensGroup.add(floatingPatch);

  // 애니메이션 시작
  animateFloatingPatch(localHitPoint, localOffset);
});

// ---------------------------------------------
// 애니메이션 함수 (빔 없이 패치만 이동)
// ---------------------------------------------
function animateFloatingPatch(startPos, targetPos) {
  const startTime = performance.now();
  const duration = 1000; // 1초

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const smoothProgress = 1 - Math.pow(1 - progress, 2);

    floatingPatch.position.lerpVectors(startPos, targetPos, smoothProgress);
    floatingPatch.scale.set(
      0.1 + 0.9 * smoothProgress,
      0.1 + 0.9 * smoothProgress,
      0.1 + 0.9 * smoothProgress
    );

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ---------------------------------------------
window.addEventListener('resize', () => {
  const W = window.innerWidth,
    H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  composer.setSize(W, H);
});

// ---------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  screensGroup.rotation.y += 0.002;
  controls.update();
  composer.render();
}

animate();
