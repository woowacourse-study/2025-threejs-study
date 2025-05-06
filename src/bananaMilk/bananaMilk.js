import * as THREE from 'three';
import createBottle from './bottle';
import createCap from './cap';
import createStraw from './straw';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 1; // 카메라를 위로 올림

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#fff242');
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* ---- Group -----*/

// 1. 그룹 만들기
const bottleGroup = new THREE.Group();

// 2. 병과 뚜껑을 그룹에 추가
bottleGroup.add(createBottle());
bottleGroup.add(createCap());
bottleGroup.add(createStraw());

// 3. 그룹을 씬에 추가
scene.add(bottleGroup);

/*--- 효과 ----*/

// 💡 방향성 광원 추가
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);
light.castShadow = true;

// ✨ (선택) 주변 광도 추가해주면 더 자연스러움
const ambientLight = new THREE.AmbientLight('#00000', 3);
scene.add(ambientLight);

bottleGroup.rotation.x = 0.2; // 앞뒤로 기울기 (X축 회전)
bottleGroup.rotation.z = 0.2; // 좌우로 기울기 (Z축 회전)

/*---로고--- */
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('/bananaMilk-logo.png');
const logoMaterial = new THREE.MeshBasicMaterial({
  map: logoTexture,
  transparent: true,
  side: THREE.DoubleSide,
});

const logoPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(0.8, 0.55),
  logoMaterial
);
logoPlane.position.set(0, 0, 0.7);

scene.add(logoPlane);

let angle = 0;
const radius = 0.7; // 중심에서 떨어진 거리

function animate() {
  requestAnimationFrame(animate);
  bottleGroup.rotation.y += 0.01; // Y축 회전

  angle += -0.009;
  logoPlane.position.x = Math.cos(angle) * radius;
  logoPlane.position.z = Math.sin(angle) * radius;
  logoPlane.lookAt(0, bottleGroup.position.y, 0); // 로고가 병을 바라보도록 회전
  logoPlane.rotateY(Math.PI);
  logoPlane.rotateX(-0.3);

  renderer.render(scene, camera);
}
animate();
