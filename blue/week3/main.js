import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLBModel } from "./loaders/loadGLBModel";
import { setupBassScene } from "./scene/setUpBassScene";
import { vibration } from "./animation/vibration";
import { createStage } from "./public/util/createStage";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#1e1e1e");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 50);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls - 마우스로 카메라 줌, 이동
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// scene
const radians = THREE.MathUtils.degToRad(305);
const radians2 = THREE.MathUtils.degToRad(-5);
const radians3 = THREE.MathUtils.degToRad(-70);
const radians4 = THREE.MathUtils.degToRad(18);

const bassGroup = new THREE.Group();

//상단 픽업
loadGLBModel("/models/bass-pickup.glb", (model) => {
  model.position.set(2, 2, 4);
  model.scale.set(10, 10, 10);
  model.rotation.set(radians2, radians2, radians);
  bassGroup.add(model);
});

//하단 픽업
loadGLBModel("/models/bass-pickup.glb", (model) => {
  model.position.set(4, -5, 5);
  model.scale.set(10, 10, 10);
  model.rotation.set(radians2, radians2, radians);
  bassGroup.add(model);
});

loadGLBModel("/models/bass-bridge.glb", (model) => {
  model.position.set(6, -12, 6);
  model.scale.set(7, 7, 7);
  bassGroup.add(model);
  model.rotation.set(radians2, 0, radians3);
});

loadGLBModel("/models/bass-body.glb", (model) => {
  model.position.set(0, 0, 5);
  model.scale.set(40, 40, 40);
  bassGroup.add(model);
});

loadGLBModel("/models/bass-neck.glb", (model) => {
  model.position.set(-9, 25, 0);
  model.scale.set(60, 60, 60);
  model.rotation.set(radians4, 0, radians4);
  bassGroup.add(model);
});

const basePositions = new Map();

// string
const stringMeshes = setupBassScene(bassGroup, camera, basePositions);
for (const mesh of stringMeshes) {
  bassGroup.add(mesh);
}
scene.add(bassGroup);

const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

//stage
const stage = createStage();
scene.add(stage);

// Key Light – 메인 조명: 약간 왼쪽 위에서 내려비추는 따뜻한 조명
const keyLight = new THREE.DirectionalLight(0xfff0dd, 3.5);
keyLight.position.set(60, 80, 40); // 왼쪽 위 대각선에서
keyLight.target = bassGroup;
scene.add(keyLight);

const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 2, 0xfff0dd);
scene.add(keyLightHelper);

// Rim Light – 후방 윤곽 강조: 오른쪽 뒤에서 보라빛으로 실루엣 부각
const rimLight = new THREE.DirectionalLight(0xaa66ff, 2);
rimLight.position.set(-80, 50, -50); // 기타의 우측 뒤에서 오는 느낌
rimLight.target = bassGroup;
scene.add(rimLight);

const rimLightHelper = new THREE.DirectionalLightHelper(rimLight, 2, 0xaa66ff);
scene.add(rimLightHelper);

// Bottom Light – 무대 조명 느낌의 붉은 조명: 아래에서 위로 퍼지도록
const bottomLight = new THREE.SpotLight(
  0xcc0033, // 붉은 무대 조명 색
  800, // 적절한 강도 (600은 과도함)
  300, // 실제 기타 기준 적절 거리
  Math.PI / 3, // 부드러운 확산 각도 (~60도)
  0.8, // 가장자리 부드럽게
  1 // 감쇠 자연스럽게
);

bottomLight.position.set(10, -40, 10); // 정면 아래에서 위쪽 방향
// 원하는 대상에 빔을 쏠 수 있음
bottomLight.target = bassGroup;
scene.add(bottomLight);
scene.add(bottomLight.target);

const bottomLightHelper = new THREE.SpotLightHelper(bottomLight, 2, 0xcc0033);
scene.add(bottomLightHelper);

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  t += 0.006;
  bassGroup.position.y = Math.sin(t) * 2;

  vibration(stringMeshes, basePositions);

  renderer.render(scene, camera);
}

animate();
