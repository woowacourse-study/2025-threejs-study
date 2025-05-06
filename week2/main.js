import * as THREE from "three";

// 장면 만들기
const scene = new THREE.Scene();

// 카메라 만들기 (필수 인자 포함)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 렌더러 만들기
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 중요
renderer.setClearColor("#ffffff"); // 문자열로 전달
renderer.setAnimationLoop(animation);

document.body.appendChild(renderer.domElement);

// 오브젝트 추가
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 4, 4, 10),
  new THREE.MeshBasicMaterial({ color: "#000000", wireframe: true }) // wireframe 추가하면 세그먼트 보임
);
scene.add(cube);

function animation() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// 렌더링
renderer.render(scene, camera);
