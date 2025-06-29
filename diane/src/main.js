import * as THREE from 'three';
import { createCenterSphere } from './components/CenterSphere.js';
import createCenterPointSphere from './components/CenterPointSphere.js';
import { createTorus } from './components/Torus.js';
import { loadCardModel } from './components/Card.js';
import createMiniTorus from './components/effect/MiniTorus.js';
import './index.css';

import { init } from './init.js';
import { createFortuneComponent } from './components/Fortune.js';
import Click from './components/Click.js';

const { camera, composer, controls, renderer, scene } = init();

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

/*---- 이벤트 설정 ------ */
let rotationSpeed = 0.01;
const speedIncrement = 0.02;
const maxSpeed = 0.3; // 최고 속도 제한

let isFadeIn = false; // 페이드 인 상태
let isFadeOut = false; // 페이드 아웃 상태
let miniTorusOpacity = 0;
let miniTorus = null;
let fadeOutStartTime = null; // ⬅ 페이드 아웃 타이밍 추적용

let hasShownFortune = false;

window.addEventListener('mousedown', () => {
  if (hasShownFortune) return;

  // 운세 컴포넌트 생성 조건
  if (rotationSpeed >= maxSpeed && !hasShownFortune) {
    hasShownFortune = true;

    const container = document.getElementById('dom-ui');
    createFortuneComponent(container, () => {
      hasShownFortune = false;
    });

    // 상태 초기화
    rotationSpeed = 0.01;

    if (miniTorus) {
      scene.remove(miniTorus);
      miniTorus = null;
    }

    isFadeIn = false;
    isFadeOut = false;
    miniTorusOpacity = 0;
    fadeOutStartTime = null;

    return;
  }

  // 회전 속도 증가
  rotationSpeed = Math.min(rotationSpeed + speedIncrement, maxSpeed);

  // 아직 미니 토러스가 남아있거나 페이드 중이라면 새로 만들지 않음
  if (miniTorus || isFadeIn || isFadeOut) return;

  // 미니 토러스 생성
  miniTorus = createMiniTorus();
  miniTorus.rotation.z += rotationSpeed;

  miniTorus.traverse((child) => {
    if (child.material) {
      child.material.opacity = miniTorusOpacity;
    }
  });

  scene.add(miniTorus);
  miniTorusOpacity = 0;
  isFadeIn = true;
});

// Rendering loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);

  time += 0.02;
  const scale = 1 + Math.sin(time) * 0.15;
  centerPointSphere.scale.set(scale, scale, scale);

  controls.update();
  torusGroup.rotation.z += 0.007;
  cardGroup.rotateOnAxis(tiltedAxis, rotationSpeed);

  if (miniTorus) {
    miniTorus.rotation.z += rotationSpeed;

    if (isFadeIn) {
      miniTorusOpacity += 0.02;
      if (miniTorusOpacity >= 1) {
        miniTorusOpacity = 1;
        isFadeIn = false;
        fadeOutStartTime = performance.now(); // ⏱️ 페이드 아웃 타이머 시작
      }
    }

    if (!isFadeIn && !isFadeOut && fadeOutStartTime) {
      if (performance.now() - fadeOutStartTime > 1000) {
        isFadeOut = true;
        fadeOutStartTime = null;
      }
    }

    if (isFadeOut) {
      miniTorusOpacity -= 0.03;
      if (miniTorusOpacity <= 0) {
        miniTorusOpacity = 0;
        isFadeOut = false;
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

  composer.render();
}

animate();
Click();
