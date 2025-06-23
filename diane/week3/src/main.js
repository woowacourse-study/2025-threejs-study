import * as THREE from 'three';
import { createCenterSphere } from './components/CenterSphere.js';
import createCenterPointSphere from './components/CenterPointSphere.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createTorus } from './components/Torus.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { loadCardModel } from './components/Card.js';
import createMiniTorus from './components/effect/MiniTorus.js';
import createShrinkingCircle from './components/ShrinkingCircle.js';

//씬,카메라, 렌더러 생성
const scene = new THREE.Scene();
// scene.background = new THREE.Color('#ff0000');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/*---OrbitControls---*/

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

/*---- 도형형  ----*/

const centerSphere = createCenterSphere();
const centerPointSphere = createCenterPointSphere();

const torus2 = createTorus(2.35, 0.07, '#ffffff');
const torus3 = createTorus(2.3, 0.1, '#292929');
const torus4 = createTorus(2.25, 0.07, '#ffffff');
const torusGroup = new THREE.Group();
torusGroup.add(torus2);
torusGroup.add(torus3);
torusGroup.add(torus4);
torusGroup.rotation.x = -Math.PI / 2; // X축으로 90도 회전
torusGroup.rotation.y = -3; // Y축으로 약간 아래로 이동

scene.add(centerSphere);
scene.add(centerPointSphere);
scene.add(torusGroup);

const cardCount = 8; // 원하는 카드 개수
const radius = 2.7; // 원의 반지름

const tiltedAxis = new THREE.Vector3(0, 1, 0); // 원래 Y축
tiltedAxis.applyAxisAngle(
  new THREE.Vector3(1, 0, 0),
  THREE.MathUtils.degToRad(20)
); // X축 기준으로 20도 기울임

const cardGroup = new THREE.Group();
scene.add(cardGroup); // 카드 그룹을 중심축에 추가

for (let i = 0; i < cardCount; i++) {
  loadCardModel()
    .then((cardModel) => {
      const angle = (i / cardCount) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      cardModel.position.set(x, 0, z);
      cardModel.lookAt(0, 0, 0);
      cardModel.rotateY(-Math.PI / 2); // 앞면이 중심을 향하게

      cardGroup.add(cardModel); // 그룹에 추가
    })
    .catch((error) => {
      console.error('모델 로드 실패:', error);
    });
}

//조명 추가
const ambientLight = new THREE.AmbientLight('#ffffff', 4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// ✨ UnrealBloomPass 설정
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength (빛 퍼짐 강도)
  1.0, // radius (퍼지는 범위)
  0.5 // threshold (얼마나 밝아야 퍼질지)
);

composer.addPass(bloomPass);

/*---- 이벤트 설정 ------ */
let rotationSpeed = 0.01;
let isMouseDown = false;

let isMiniTorusVisible = false;
let isFadeIn = false; // 페이드 인 상태
let isFadeOut = false; // 페이드 아웃 상태

let isTiltingCards = false;
let cardTiltProgress = 0; // 0에서 1까지 진행도

let miniTorusOpacity = 0;
let miniTorus = null;

window.addEventListener('mousedown', () => {
  isMouseDown = true;
});

window.addEventListener('mouseup', () => {
  isMouseDown = false;
});

window.addEventListener('click', () => {
  if (isMiniTorusVisible) return;

  // 생성
  miniTorus = createMiniTorus();
  miniTorus.traverse((child) => {
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 0; // 초기값
    }
  });

  scene.add(miniTorus);
  miniTorusOpacity = 0;
  isFadeIn = true; // 페이드 인 시작
  isMiniTorusVisible = true;
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'q' && !isTiltingCards) {
    isTiltingCards = true;
    cardTiltProgress = 0;
  }
});

// Rendering loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);

  time += 0.02;
  const scale = 1 + Math.sin(time) * 0.15; // 1 ~ 1.2 사이에서 변화

  centerPointSphere.scale.set(scale, scale, scale); // 중심 구체에 적용
  controls.update(); // OrbitControls 업데이트

  // centerSphere.rotation.x += 0.005;
  // centerSphere.rotation.y += 0.005;
  torusGroup.rotation.z += 0.007;

  const speed = isMouseDown ? rotationSpeed * 5 : rotationSpeed;
  // cardGroup.rotation.y += speed; // 카드 그룹 회전
  // cardGroup.position.y = Math.sin(time) * 0.5; // 카드 그룹 Y축 위치 변화

  if (miniTorus) {
    miniTorus.rotation.z += 0.08; // 미니 토러스 회전
    // 미니 토러스 페이드 인/아웃 처리
    if (isFadeIn) {
      miniTorusOpacity += 0.02; // 페이드 인 속도 조절
      if (miniTorusOpacity >= 1) {
        miniTorusOpacity = 1;
        isFadeIn = false; // 페이드 인 완료

        setTimeout(() => {
          isFadeOut = true; // 페이드 아웃 시작
        }, 1000); // 2초 후에 페이드 아웃 시작
      }
    }

    // fade-out 처리
    if (isFadeOut) {
      miniTorusOpacity -= 0.03;
      if (miniTorusOpacity <= 0) {
        miniTorusOpacity = 0;
        isFadeOut = false;
        isMiniTorusVisible = false; // 미니 토러스가 더 이상 보이지 않음

        scene.remove(miniTorus);
        miniTorus = null;
      }
    }

    miniTorus.traverse((child) => {
      if (child.material) {
        child.material.opacity = miniTorusOpacity;
      }
    });
  }

  if (isTiltingCards) {
    cardTiltProgress += 0.03; // 회전 속도 조절
    cardGroup.children.forEach((card) => {
      // 현재 rotation 기준에서 뒤로 -30도만큼 누움
      const maxTilt = THREE.MathUtils.degToRad(-30); // -30도
      card.rotation.x = maxTilt * Math.min(cardTiltProgress, 1);
    });

    if (cardTiltProgress >= 1) {
      isTiltingCards = false; // 완료되면 멈춤
    }
  }

  cardGroup.rotateOnAxis(tiltedAxis, speed);
  composer.render();
}

animate();

const container = document.getElementById('dom-ui');

setInterval(() => {
  createShrinkingCircle({
    container,
    onHit: (result) => {
      console.log('판정:', result);
    },
  });
}, 1000);
