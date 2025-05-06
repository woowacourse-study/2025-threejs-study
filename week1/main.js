import * as THREE from "three";

//장면 만들기
const scene = new THREE.Scene();
//카메라 만들기
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//렌더러 만들기
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#cccccc");
renderer.setAnimationLoop(animation);

//오브젝트 만들기 (geometry + material)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#0047AB" });
const cube = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const border = new THREE.LineSegments(edges, lineMaterial);
cube.add(border);

//애니메이션 (움직일 다음 장면을 설정하고, 재렌더링)
function animation() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

//렌더링 시작
scene.add(cube);
camera.position.z = 5;
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
