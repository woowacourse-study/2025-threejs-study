import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x808080);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, basicMaterial);
cube.position.x = -2;
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 16);
const standardMaterialRed = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.1,
  roughness: 0.8,
});
const sphere = new THREE.Mesh(sphereGeometry, standardMaterialRed);
sphere.position.x = 0;
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry(0.7, 1, 32);
const standardMaterialBlue = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  metalness: 0.9,
  roughness: 0.2,
});
const cone = new THREE.Mesh(coneGeometry, standardMaterialBlue);
cone.position.x = 2;
scene.add(cone);

const textureLoader = new THREE.TextureLoader();

textureLoader.load(
  "./public/texture2.jpg",
  function (texture) {
    console.log("텍스처 로드 성공:", texture);

    if (standardMaterialRed) {
      standardMaterialRed.map = texture;
      standardMaterialRed.needsUpdate = true;

      console.log("Sphere에 텍스처 적용 완료!");
    } else {
      console.error(
        "Sphere Material을 찾을 수 없습니다. 텍스처를 적용할 수 없습니다."
      );
    }
  },
  undefined,
  function (err) {
    console.error("텍스처 로드 중 오류 발생:", err);
  }
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;
  cone.rotation.x += 0.005;
  cone.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
