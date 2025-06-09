import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const COLORS = {
  background: "#87CEEB",
  rimLight: "#ffffff",
  bottomLight: "#5183FF",
  keyLight: "#FFE062",
  plane: "#84673b",
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 1.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.minDistance = 1;
controls.maxDistance = 10;

const lights = {
  ambient: new THREE.AmbientLight(COLORS.rimLight),
  rim: new THREE.DirectionalLight(COLORS.rimLight, 10),
  bottom: new THREE.DirectionalLight(COLORS.bottomLight, 10),
  key: new THREE.DirectionalLight(COLORS.keyLight, 3),
};

lights.rim.position.set(2, 0, -2);
lights.bottom.position.set(0, -2, 0);
lights.key.position.set(-1, 1, 1);

[lights.rim, lights.bottom, lights.key].forEach((light) => {
  light.target.position.set(0, 0, 0);
  scene.add(light, light.target);
});
scene.add(lights.ambient);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: COLORS.plane,
    roughness: 0.8,
    metalness: 0.2,
  })
);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

let model;
const clock = new THREE.Clock();

let rotationSpeed = 0.3;
const SLOW_SPEED = 0.3;
const FAST_SPEED = 3;

window.addEventListener("click", () => {
  rotationSpeed = rotationSpeed === SLOW_SPEED ? FAST_SPEED : SLOW_SPEED;
});

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    const time = clock.getElapsedTime();

    model.rotation.y = time * rotationSpeed;

    model.position.y = Math.sin(time * 2) * 0.3;

    model.position.x = Math.cos(time * 1.5) * 0.2;

    const breathScale = 1 + Math.sin(time * 3) * 0.1;
    model.scale.set(breathScale, breathScale, breathScale);

    model.rotation.z = Math.sin(time * 1.2) * 0.1;
    model.rotation.x = -0.5 + Math.cos(time * 0.8) * 0.1;
  }

  controls.update();
  renderer.render(scene, camera);
};

const loader = new GLTFLoader();
loader.load(
  "/assets/sangchu-god.glb",
  (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(-0.5, -2.5, 0);
    scene.add(model);
  },
  undefined,
  (error) => console.error("모델 로딩 실패:", error)
);

animate();
