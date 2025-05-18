import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

//렌더러
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const SCREEN_WIDTH = 3;
const SCREEN_HEIGHT = 2;
const RADIUS = 5;
const thetaLength = SCREEN_WIDTH / RADIUS;

// 카메라 시점 조절
const controls = new OrbitControls(camera, renderer.domElement);

// 화면
const screenGeometry = new THREE.CylinderGeometry(
  RADIUS,
  RADIUS,
  SCREEN_HEIGHT,
  64,
  1,
  true,
  -thetaLength / 2,
  thetaLength
);

screenGeometry.rotateY(Math.PI);

const screenMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  emissive: '#222222',
  side: THREE.DoubleSide,
});

function makeScreen() {
  const materialClone = screenMaterial.clone();
  return new THREE.Mesh(screenGeometry, materialClone);
}

const screensGroup = new THREE.Group();

const ROWS = 8; // 위도를 몇 개로 쪼갤 것인가
const COLS = 20; // 경도를 몇 개로 쪼갤 것인가
const SPHERE_RADIUS = RADIUS; // 기존 screen 반지름 재사용

// φ: 0~π 사이 위도 각 (0: 북극, π: 남극)
for (let i = 0; i < ROWS; i += 1) {
  const phi = (Math.PI * (i + 0.5)) / ROWS;

  // θ: 0~2π 사이 경도 각
  for (let j = 0; j < COLS; j += 1) {
    const theta = (2 * Math.PI * j) / COLS;

    const mesh = makeScreen();

    // 구면 좌표 → 직교 좌표 변환
    const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
    const y = SPHERE_RADIUS * Math.cos(phi);
    const z = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
    mesh.position.set(x, y, z);

    // 매시가 항상 (0,0,0)을 바라보게
    mesh.lookAt(0, 0, 0);

    screensGroup.add(mesh);
  }
}

scene.add(screensGroup);

/*
// 축 표시
const axes = new THREE.AxesHelper(5);
scene.add(axes);
*/

const ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('#ffffff', 10);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

// 화면 이펙트를 순서대로 적용해주는 후처리 객체
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  composer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  screensGroup.rotation.y += 0.005;
  composer.render();
  renderer.render(scene, camera);

  controls.update();
  composer.render();
}

animate();
