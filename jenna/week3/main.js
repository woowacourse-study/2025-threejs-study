import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10; // 카메라 위치

const renderer = new THREE.WebGLRenderer({ antialias: true }); // 물체가 부드럽게 보이게 하기
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const SCREEN_WIDTH = 3;
const SCREEN_HEIGHT = 2;
const RADIUS = 5;
const thetaLength = SCREEN_WIDTH / RADIUS; // 축을 중심으로 한 곡면의 휜 정도

// 화면
const screenGeometry = new THREE.CylinderGeometry(
  RADIUS, // top radius
  RADIUS, // bottom radius (같이 줘야 원통이 됨)
  SCREEN_HEIGHT, // 높이
  64, // radialSegments: 곡률이 부드러울수록 높게
  1, // heightSegments
  true, // openEnded 물체 천장 바닥 없애기
  -thetaLength / 2, // thetaStart 화면 중앙 맞추기
  thetaLength // thetaLength
);
screenGeometry.rotateY(Math.PI);

const screenMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff', // 화면 바탕
  emissive: '#222222', // 살짝 자체 발광(어두운 배경에 대비)
  side: THREE.DoubleSide, // 앞뒤 모두 보이게
});

const screen = new THREE.Mesh(screenGeometry, screenMaterial);
scene.add(screen);

// 조명
const ambientLight = new THREE.AmbientLight('#ffffff', 1.5); // 주변광
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('#ffffff', 10);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

// const hemisphere = new THREE.HemisphereLight(0xffffff, 0x444444, 50);
// hemisphere.position.set(0, 10, 0);
// scene.add(hemisphere);

// const hemisphereHelper = new THREE.HemisphereLightHelper(hemisphere, 10);
// scene.add(hemisphereHelper);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// 2) 블룸 패스 세팅
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength: 번짐 세기
  0.4, // radius: 번짐 반경
  0.5 // threshold: 밝기 컷오프(이 값 이상만 블룸)
);
composer.addPass(bloom);

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

  screen.rotation.y += 0.005;
  composer.render();
  renderer.render(scene, camera);
}

animate();
