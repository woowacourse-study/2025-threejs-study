import * as THREE from 'three';
import createBottle from './bottle';
import createCap from './cap';
import createStraw from './straw';
import { DecalGeometry } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 1; // 카메라를 위로 올림

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#fff242');
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* ---- Group -----*/

// 1. 그룹 만들기
const bottleGroup = new THREE.Group();

// 2. 병과 뚜껑을 그룹에 추가
const bananaMilk = createBottle(); // 병
bottleGroup.add(bananaMilk);
bottleGroup.add(createCap());
bottleGroup.add(createStraw());

// 3. 그룹을 씬에 추가
scene.add(bottleGroup);

/*--- 효과 ----*/

// 💡 방향성 광원 추가
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);
light.castShadow = true;

// ✨ (선택) 주변 광도 추가해주면 더 자연스러움
const ambientLight = new THREE.AmbientLight('#ffffff', 3);
scene.add(ambientLight);

bottleGroup.rotation.x = 0.2; // 앞뒤로 기울기 (X축 회전)
bottleGroup.rotation.z = 0.2; // 좌우로 기울기 (Z축 회전)

/*---로고--- */
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('/bananaMilk-logo.png');

const decalMaterial = new THREE.MeshBasicMaterial({
  map: logoTexture,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -4,
});

const decalGeometry = new DecalGeometry(
  bananaMilk, // 대상 메쉬
  new THREE.Vector3(0, 0.8, 0.6), // 위치 (병의 측면)
  new THREE.Euler(0, 0, 0), // 회전
  new THREE.Vector3(1, 0.4, 0.8) // 크기 (로고 크기)
);

const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
decalMesh.rotation.x = 0.2; // 앞뒤로 기울기 (X축 회전)
decalMesh.rotation.z = 0.2; // 좌우로 기울기 (Z축 회전)

scene.add(decalMesh);

function animate() {
  requestAnimationFrame(animate);
  bottleGroup.rotation.y += 0.01; // Y축 회전
  decalMesh.rotation.y += 0.01; // Y축 회전

    // const t = Date.now() * 0.001; // 초 단위 시간
    // camera.position.z = 2.7 + Math.sin(t * 10) * 0.5;
    // const hue = (t * 0.4) % 1; // 0 ~ 1 사이로 순환
    // ambientLight.color.setHSL(hue, 3, 0.5); // (색상, 채도, 명도)

  renderer.render(scene, camera);
}
animate();
` `