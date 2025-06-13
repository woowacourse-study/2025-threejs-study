import * as THREE from "three";
import { scene, camera, renderer } from "../core/scene.js";
import { controls, getRotationSpeed } from "./controls.js";
import { getModel } from "../loaders/model.js";

const clock = new THREE.Clock();

export const animate = () => {
  requestAnimationFrame(animate);

  const model = getModel();
  if (model) {
    const time = clock.getElapsedTime();
    const rotationSpeed = getRotationSpeed();

    model.rotation.y = time * rotationSpeed;
    model.position.y = Math.sin(time * 2) * 0.3;
    model.position.x = Math.cos(time * 1.5) * 0.2;

    const breathScale = 1 + Math.sin(time * 3) * 0.1;
    model.scale.set(breathScale, breathScale, breathScale);
    model.rotation.z = Math.sin(time * 1.2) * 0.1;
    model.rotation.x = -0.5 + Math.cos(time * 0.8) * 0.1;
  }

  controls.update();
  renderer.render(scene, camera);
};
