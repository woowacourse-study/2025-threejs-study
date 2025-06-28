import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { scene } from "../core/scene.js";

export function setupLights() {
  const lights = {
    ambient: new THREE.AmbientLight(CONFIG.colors.rimLight),
    rim: new THREE.DirectionalLight(CONFIG.colors.rimLight, 10),
    bottom: new THREE.DirectionalLight(CONFIG.colors.bottomLight, 10),
    key: new THREE.DirectionalLight(CONFIG.colors.keyLight, 3),
  };

  lights.rim.position.set(2, 0, -2);
  lights.bottom.position.set(0, -2, 0);

  lights.key.position.set(-2, 5, 2);

  lights.key.castShadow = true;
  lights.key.shadow.mapSize.width = 2048;
  lights.key.shadow.mapSize.height = 2048;
  lights.key.shadow.camera.near = 1;
  lights.key.shadow.camera.far = 15;

  lights.key.shadow.camera.left = -10;
  lights.key.shadow.camera.right = 10;
  lights.key.shadow.camera.top = 10;
  lights.key.shadow.camera.bottom = -10;

  lights.key.target.position.set(0, -1, 0);

  [lights.rim, lights.bottom, lights.key].forEach((light) => {
    scene.add(light, light.target);
  });
  scene.add(lights.ambient);

  return lights;
}
