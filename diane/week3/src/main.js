import * as THREE from 'three';
import { createCenterSphere } from './CenterSphere.js';
import createCenterPointSphere from './CenterPointSphere.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createTorus } from './Torus.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//씬,카메라, 렌더러 생성
const scene = new THREE.Scene();
// scene.background = new THREE.Color('#ff0000');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/*---OrbitControls---*/

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

const centerSphere = createCenterSphere();
const centerPointSphere = createCenterPointSphere();
const torus2 = createTorus(2.5, 0.07, '#ffffff');
const torus3 = createTorus(2.4, 0.1, '#292929');
const torus4 = createTorus(2.35, 0.07, '#ffffff');
const torusGroup = new THREE.Group();
torusGroup.add(torus2);
torusGroup.add(torus3);
torusGroup.add(torus4);
torusGroup.rotation.x = -Math.PI / 3; // X축으로 90도 회전
scene.add(centerSphere);
scene.add(centerPointSphere);
scene.add(torusGroup);

//조명 추가
const ambientLight = new THREE.AmbientLight('#ffffff', 4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// ✨ UnrealBloomPass 설정
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength (빛 퍼짐 강도)
  1.0, // radius (퍼지는 범위)
  0.5 // threshold (얼마나 밝아야 퍼질지)
);

composer.addPass(bloomPass);
// Rendering loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);

  time += 0.02;
  const scale = 1 + Math.sin(time) * 0.15; // 1 ~ 1.2 사이에서 변화

  centerPointSphere.scale.set(scale, scale, scale); // 중심 구체에 적용
  controls.update(); // OrbitControls 업데이트

  // centerSphere.rotation.x += 0.01;
  // centerSphere.rotation.y += 0.01;
  // torusGroup.rotation.y += 0.007;

  composer.render();
}

animate();
