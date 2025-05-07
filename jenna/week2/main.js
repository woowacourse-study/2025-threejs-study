import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 행성 본체 구체 Geometry + Standard Material
const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshStandardMaterial({
  color: '#F1E7E7',
  roughness: 0.4,
  metalness: 0,
});
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.castShadow = true;
scene.add(planet);

const radius = 1.5; // 반지름
const tube = 0.2; // 고리 두께
const radialSegments = 16;
const tubularSegments = 100;
const torusGeometry = new THREE.TorusGeometry(
  radius,
  tube,
  radialSegments,
  tubularSegments
);

const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#FFD0C7',
  roughness: 0.6, // 거칠기 (0~1) - 낮아질수록 맨질맨질해보임
  metalness: 0.1, // 금속성 (0~1)
});

const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.scale.set(1, 0.8, 1);
scene.add(torus);

// 조명
const ambientLight = new THREE.AmbientLight('#ffffff', 2.5); // 전체밝기 - 두 번째 인자: 밝기 정도
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('#ffffff', 1.2);
dirLight.position.set(5, 8, 5); // 광원 위치
dirLight.castShadow = true; // 광원에 의한 그림자 생성
dirLight.shadow.mapSize.set(2048, 2048); // 그림자 해상도
dirLight.shadow.camera.near = 1; // 그림자 렌더링 위치
dirLight.shadow.camera.far = 20;
scene.add(dirLight);

// 리사이즈
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 애니메이션
function animate() {
  requestAnimationFrame(animate);

  planet.rotation.y += 0.003;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
