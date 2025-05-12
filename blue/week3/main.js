import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createBassBody } from "./models/bassBody.js";
import { createBassNeck } from "./models/bassNeck.js";

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

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 10);
scene.add(light);

// Scene - bass body
createBassBody().then((meshes) => {
  meshes.forEach((mesh) => scene.add(mesh));
});

// Scene - bass neck
createBassNeck().then((mesh) => {
  scene.add(mesh);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 마우스 감속 설정을 위해 update 필요
  renderer.render(scene, camera);
}

animate();
