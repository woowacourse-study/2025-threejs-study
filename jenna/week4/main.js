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

// 구의 위도를 스크린 높이 만큼 나누기 (rows 수)
const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT);
const unitLocation = Math.PI / rows; // 스크린을 위치할 간격(단위)
const adjustLocation = unitLocation / 2; // 중간을 시작점으로

for (let i = 0; i < rows; i++) {
  const location = adjustLocation + i * unitLocation;
  const circumference = 2 * Math.PI * RADIUS * Math.sin(location); // 2파이r sin세타 (잘라낸 원 둘레)

  const cols = Math.ceil(circumference / SCREEN_WIDTH);
  if (cols < 1) continue; // 스크린 1개도 안들어가면 건너 뛰기

  // 구의 경도를 나누기
  const thetaStep = (2 * Math.PI) / cols;

  for (let j = 0; j < cols; j++) {
    const theta = j * thetaStep;

    const mesh = makeScreen();

    // 구면 → 직교 변환
    const x = RADIUS * Math.sin(location) * Math.cos(theta);
    const y = RADIUS * Math.cos(location);
    const z = RADIUS * Math.sin(location) * Math.sin(theta);
    mesh.position.set(x, y, z);

    mesh.lookAt(0, 0, 0);
    screensGroup.add(mesh);
  }
}

scene.add(screensGroup);

// 축 표시
const axes = new THREE.AxesHelper(50);
scene.add(axes);

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
