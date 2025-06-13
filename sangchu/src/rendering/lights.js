import * as THREE from "three";
import { COLORS } from "../config/constants.js";
import { scene } from "../core/scene.js";

export const setupLights = () => {
  const lights = {
    ambient: new THREE.AmbientLight(COLORS.rimLight),
    rim: new THREE.DirectionalLight(COLORS.rimLight, 10),
    bottom: new THREE.DirectionalLight(COLORS.bottomLight, 10),
    key: new THREE.DirectionalLight(COLORS.keyLight, 3),
  };

  lights.rim.position.set(2, 0, -2);
  lights.bottom.position.set(0, -2, 0);
  lights.key.position.set(-1, 1, 1);

  [lights.rim, lights.bottom, lights.key].forEach((light) => {
    light.target.position.set(0, 0, 0);
    scene.add(light, light.target);
  });
  scene.add(lights.ambient);

  return lights;
};
