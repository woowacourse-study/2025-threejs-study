import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CONTROLS_CONFIG, ANIMATION_CONFIG } from "../config/constants.js";
import { camera, renderer } from "../core/scene.js";

export let rotationSpeed = ANIMATION_CONFIG.slowSpeed;
let speedBoostTimer = null;

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = CONTROLS_CONFIG.enableDamping;
controls.dampingFactor = CONTROLS_CONFIG.dampingFactor;
controls.minDistance = CONTROLS_CONFIG.minDistance;
controls.maxDistance = CONTROLS_CONFIG.maxDistance;

window.addEventListener("click", () => {
  if (rotationSpeed === ANIMATION_CONFIG.fastSpeed) {
    return;
  }

  rotationSpeed = ANIMATION_CONFIG.fastSpeed;

  if (speedBoostTimer) {
    clearTimeout(speedBoostTimer);
  }

  speedBoostTimer = setTimeout(() => {
    rotationSpeed = ANIMATION_CONFIG.slowSpeed;
    speedBoostTimer = null;
  }, 3000);
});

export const getRotationSpeed = () => rotationSpeed;
