import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CONFIG } from "../config/constants.js";
import { camera, renderer } from "../core/scene.js";
import { getModel } from "../loaders/model.js";
import { showSpeechBubble } from "../ui/speech-bubble.js";

export let rotationSpeed = CONFIG.animation.slowSpeed;
export let isSpeedBoosted = false;
let speedBoostTimer = null;
const targetPosition = new THREE.Vector3();
let targetRotationY = 0;
let clickPlane = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function playSpinSound() {
  try {
    const audio = new Audio("./assets/audio/spinning.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("소리 재생 안됨:", e.message));
  } catch (e) {
    console.log("소리 로딩 안됨:", e.message);
  }
}

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = CONFIG.controls.enableDamping;
controls.dampingFactor = CONFIG.controls.dampingFactor;
controls.minDistance = CONFIG.controls.minDistance;
controls.maxDistance = CONFIG.controls.maxDistance;
controls.enablePan = false;

export function setClickPlane(plane) {
  clickPlane = plane;
}

function onMouseMove(event) {
  if (!clickPlane) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(clickPlane);

  if (intersects.length > 0) {
    const mousePosition = intersects[0].point;
    const model = getModel();

    if (model) {
      targetPosition.copy(mousePosition);
      targetPosition.y = CONFIG.animation.hoverHeight;

      if (!isSpeedBoosted) {
        const direction = mousePosition.clone().sub(model.position);
        direction.y = 0;
        direction.normalize();
        targetRotationY = Math.atan2(direction.x, direction.z);
      }
    }
  }
}

function onMouseClick(event) {
  event.preventDefault();
  event.stopPropagation();

  if (isSpeedBoosted) return;

  const model = getModel();
  if (model) {
    showSpeechBubble(model.position);
    playSpinSound();
  }

  rotationSpeed = CONFIG.animation.fastSpeed;
  isSpeedBoosted = true;

  if (speedBoostTimer) clearTimeout(speedBoostTimer);

  speedBoostTimer = setTimeout(() => {
    rotationSpeed = CONFIG.animation.slowSpeed;
    isSpeedBoosted = false;
    speedBoostTimer = null;
  }, CONFIG.controls.boostDuration);
}

export function updateMouseInteraction() {
  const model = getModel();
  if (!model) return;

  const distance = model.position.distanceTo(targetPosition);
  if (distance > CONFIG.controls.distanceThreshold) {
    model.position.lerp(targetPosition, CONFIG.controls.moveSpeed);
  }

  if (isSpeedBoosted) {
    model.rotation.y += rotationSpeed * 0.1;
  } else {
    let angleDiff = targetRotationY - model.rotation.y;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    model.rotation.y += angleDiff * CONFIG.controls.rotationSpeed;
  }
}

export function setupControls() {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("click", onMouseClick, true);
}
