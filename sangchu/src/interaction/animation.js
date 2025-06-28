import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { camera, renderer, scene } from "../core/scene.js";
import { getModel } from "../loaders/model.js";
import { controls, updateMouseInteraction } from "./controls.js";

const clock = new THREE.Clock();

export function animate() {
  requestAnimationFrame(animate);

  const model = getModel();
  if (model) {
    const time = clock.getElapsedTime();

    updateMouseInteraction();

    const currentY = model.position.y;
    const targetHover =
      CONFIG.animation.hoverHeight +
      Math.sin(time * CONFIG.animation.hoverFrequency) *
        CONFIG.animation.hoverAmplitude;
    model.position.y = currentY * 0.9 + targetHover * 0.1;

    const breathScale =
      1 +
      Math.sin(time * CONFIG.animation.breathFrequency) *
        CONFIG.animation.breathAmplitude;
    model.scale.set(breathScale, breathScale, breathScale);

    model.rotation.z =
      Math.sin(time * CONFIG.animation.tiltFrequencyZ) *
      CONFIG.animation.tiltAmplitude;
    model.rotation.x =
      CONFIG.animation.baseRotationX +
      Math.cos(time * CONFIG.animation.tiltFrequencyX) *
        CONFIG.animation.tiltAmplitude;
  }

  controls.update();
  renderer.render(scene, camera);
}
