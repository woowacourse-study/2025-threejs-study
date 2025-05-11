import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(-0.5, 0.5, 2);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const rimLight = new THREE.DirectionalLight("#ffffff", 10);

rimLight.position.set(2, 0, -2);

rimLight.target.position.set(0, 0, 0);

scene.add(rimLight);
scene.add(rimLight.target);

const rimLightHelper = new THREE.DirectionalLightHelper(rimLight, 1, 0xff0000);
scene.add(rimLightHelper);

const bottomLight = new THREE.DirectionalLight("#5183FF", 10);
bottomLight.position.set(0, -2, 0);
bottomLight.target.position.set(0, 0, 0);
scene.add(bottomLight);
scene.add(bottomLight.target);
const bottomLightHelper = new THREE.DirectionalLightHelper(
  bottomLight,
  1,
  0x00ff00
);
scene.add(bottomLightHelper);

const keyLight = new THREE.DirectionalLight("#FFE062", 3);
keyLight.position.set(-1, 1, 1);
keyLight.target.position.set(0, 0, 0);
scene.add(keyLight);
scene.add(keyLight.target);
const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1, 0x0000ff);
scene.add(keyLightHelper);

let model;

loadModel("/assets/camel-hangseong.glb")
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
