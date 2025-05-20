import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#87CEEB");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
// controls.enableZoom = false;
// controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 2; // 수직 회전 제한
// controls.autoRotate = true;
// controls.autoRotateSpeed = 10;

camera.position.set(0, 0, 1.5);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight("#ffffff");
scene.add(ambientLight);

const rimLight = new THREE.DirectionalLight("#ffffff", 10);

rimLight.position.set(2, 0, -2);

rimLight.target.position.set(0, 0, 0);

scene.add(rimLight);
scene.add(rimLight.target);

const bottomLight = new THREE.DirectionalLight("#5183FF", 10);
bottomLight.position.set(0, -2, 0);
bottomLight.target.position.set(0, 0, 0);
scene.add(bottomLight);
scene.add(bottomLight.target);

const keyLight = new THREE.DirectionalLight("#FFE062", 3);
keyLight.position.set(-1, 1, 1);
keyLight.target.position.set(0, 0, 0);
scene.add(keyLight);
scene.add(keyLight.target);

let model;

// addLightHelper(rimLight, bottomLight, keyLight);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "#84673b",
  roughness: 0.8,
  metalness: 0.2,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

loadModel("/assets/sangchu-god.glb")
  .then((loadedModel) => {
    model = loadedModel;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(-0.5, -2.5, 0);

    scene.add(model);
  })
  .catch((error) => {
    console.error("모델 로딩 실패:", error);
  });

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.001;
    model.rotation.x += 0.001;
  }

  controls.update();

  renderer.render(scene, camera);
};
animate();

function loadModel(url) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
}

function addLightHelper(rimLight, bottomLight, keyLight) {
  if (rimLight) {
    const rimLightHelper = new THREE.DirectionalLightHelper(
      rimLight,
      1,
      "#ff0000"
    );
    scene.add(rimLightHelper);
  }

  if (bottomLight) {
    const bottomLightHelper = new THREE.DirectionalLightHelper(
      bottomLight,
      1,
      0x00ff00
    );
    scene.add(bottomLightHelper);
  }

  if (keyLight) {
    const keyLightHelper = new THREE.DirectionalLightHelper(
      keyLight,
      1,
      "#0000ff"
    );
    scene.add(keyLightHelper);
  }
}
