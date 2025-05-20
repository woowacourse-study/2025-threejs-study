import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLBModel } from "./loaders/loadGLBModel";

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
//부드러운 감속
controls.enableDamping = true;

// Light
const ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 5);
keyLight.position.set(50, 30, 50);
scene.add(keyLight);
scene.add(keyLightHelper);

const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
const rimLightHelper = new THREE.DirectionalLightHelper(rimLight, 5);
rimLight.position.set(0, 40, -100);
scene.add(rimLight);
scene.add(rimLightHelper);

const bottomLight = new THREE.PointLight(0xff0000, 1.5, 50);
bottomLight.position.set(0, -30, 0);
scene.add(bottomLight);

// scene
const radians = THREE.MathUtils.degToRad(310);
const radians2 = THREE.MathUtils.degToRad(-5);
const radians3 = THREE.MathUtils.degToRad(-70);
const radians4 = THREE.MathUtils.degToRad(18);

//상단 픽업
loadGLBModel("/models/bass-pickup.glb", (model) => {
  model.position.set(3, 2, 4);
  model.scale.set(10, 10, 10);
  model.rotation.set(radians2, 0, radians);
  scene.add(model);
  animate();
});

//하단 픽업
loadGLBModel("/models/bass-pickup.glb", (model) => {
  model.position.set(5, -5, 5);
  model.scale.set(10, 10, 10);
  model.rotation.set(radians2, 0, radians);
  scene.add(model);
  animate();
});

loadGLBModel("/models/bass-bridge.glb", (model) => {
  model.position.set(6, -12, 6);
  model.scale.set(7, 7, 7);
  scene.add(model);
  model.rotation.set(radians2, 0, radians3);
  animate();
});

loadGLBModel("/models/bass-body.glb", (model) => {
  model.position.set(0, 0, 5);
  model.scale.set(40, 40, 40);
  scene.add(model);
  animate();
});

loadGLBModel("/models/bass-neck.glb", (model) => {
  model.position.set(-9, 25, 0);
  model.scale.set(60, 60, 60);
  model.rotation.set(radians4, 0, radians4);
  scene.add(model);
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 마우스 감속 설정을 위해 update 필요
  renderer.render(scene, camera);
}

animate();
