import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(-0.5, 0.5, 10);
camera.lookAt(0, 0, 0);

// // 1. 육면체 텍스처 이미지 경로 배열 (순서: px, nx, py, ny, pz, nz)
// const skyboxImages = [
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
// ];

// // 2. 각 면의 재질 생성
// const materialArray = skyboxImages.map(
//   (img) =>
//     new THREE.MeshBasicMaterial({
//       map: new THREE.TextureLoader().load(img),
//       side: THREE.BackSide, // 내부에서 보이게
//     })
// );

// // 3. 큐브(스카이박스) 생성
// const skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
// const skybox = new THREE.Mesh(skyboxGeo, materialArray);
// scene.add(skybox);

// const loader = new THREE.CubeTextureLoader();
// const texture = loader.load([
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
//   "/assets/background-space.jpg",
// ]);
// scene.background = texture;

const textureLoader = new THREE.TextureLoader();
const skyTexture = textureLoader.load("/assets/background-space.jpg");

// 반드시 텍스처 객체에 직접 encoding 지정
skyTexture.encoding = THREE.sRGBEncoding;

const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshBasicMaterial({
  map: skyTexture,
  side: THREE.BackSide,
});
const skyDome = new THREE.Mesh(geometry, material);
scene.add(skyDome);

// 렌더러에도 sRGBEncoding 지정
renderer.outputEncoding = THREE.sRGBEncoding;

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; // true로 설정하면 부드러운 카메라 이동
orbitControls.dampingFactor = 0.05; // 카메라가 값이 클수록 빨리 멈추고, 값이 작을수록 천천히 멈춤
orbitControls.enablePan = true; // 우클릭으로 pan 이동 가능
orbitControls.enableZoom = true; // 마우스 휠로 줌아웃 가능

// 🕹️ 키 입력 상태 저장
const keyState = {};
document.addEventListener("keydown", (event) => {
  keyState[event.code] = true;
});
document.addEventListener("keyup", (event) => {
  keyState[event.code] = false;
});

// 💡 이동 속도
const moveSpeed = 0.05;

const ambientLight = new THREE.AmbientLight("#404040");
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

const keyLight = new THREE.DirectionalLight("#FFF8DA", 3);
keyLight.position.set(-1, 1, 1);
keyLight.target.position.set(0, 0, 0);
scene.add(keyLight);
scene.add(keyLight.target);

let model;
let drMartin;

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

loadModel("/assets/dr-martin.glb")
  .then((loadedModel) => {
    drMartin = loadedModel;
    drMartin.scale.set(1, 1, 1);
    drMartin.position.set(-2, 2, 1);
    drMartin.rotation.set(-0.5, -2.5, 0);

    scene.add(drMartin);
  })
  .catch((error) => {
    console.error("모델 로딩 실패:", error);
  });

const animate = () => {
  requestAnimationFrame(animate);

  // 🎯 현재 카메라 방향을 기준으로 이동
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);

  // 🔹 W, S 이동 (전진/후진)
  if (keyState["KeyW"]) {
    camera.position.addScaledVector(direction, moveSpeed);
  }

  //addScaledVector는 두 가지 작업을 동시에 합니다:
  // 1. 벡터에 스칼라 값을 곱한다.
  // 2. 결과를 원본 벡터에 더한다.

  if (keyState["KeyS"]) {
    camera.position.addScaledVector(direction, -moveSpeed);
  }

  // 🔹 A, D 이동 (PAN 방식으로 좌우 이동)
  const panLeft = new THREE.Vector3();
  const panUp = new THREE.Vector3();

  // 💡 카메라의 로컬 좌표계를 기준으로 평행 벡터 추출
  camera.getWorldDirection(direction);

  // crossVectors는 두 개의 방향을 비교해서 **직각 방향(수직 방향)**을 계산해줘.
  // 예를 들어, 너가 앞을 보고 있을 때:
  // 오른쪽은 → 수직 방향
  // 왼쪽도 → 반대쪽 수직 방향

  panLeft.crossVectors(camera.up, direction).normalize();
  // 벡터는 길이가 있을 수 있는데, 길이가 너무 크면 다루기 어려워.
  // 그래서 딱 1의 크기로 조정해 주는 게 normalize야.
  panUp.crossVectors(panLeft, direction).normalize();

  //   ↑ (위쪽)
  //   |
  // (왼쪽) ←  💡 카메라  → (오른쪽)
  //   |
  //   ↓ (아래쪽)

  if (keyState["KeyA"]) {
    camera.position.addScaledVector(panLeft, moveSpeed);
    orbitControls.target.addScaledVector(panLeft, moveSpeed);
  }

  if (keyState["KeyD"]) {
    camera.position.addScaledVector(panLeft, -moveSpeed);
    orbitControls.target.addScaledVector(panLeft, -moveSpeed);
  }

  if (model) {
    model.rotation.y += 0.01;
    model.rotation.x += 0.01;
  }

  if (drMartin) {
    drMartin.rotation.y -= 0.001;
    drMartin.rotation.x += 0.001;
    drMartin.rotation.z -= 0.001;
  }

  orbitControls.update();
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
