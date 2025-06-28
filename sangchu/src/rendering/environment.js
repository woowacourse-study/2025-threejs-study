import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { scene } from "../core/scene.js";

export function setupEnvironment() {
  const groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15),
    new THREE.MeshStandardMaterial({
      color: CONFIG.colors.plane,
      roughness: 0.8,
      metalness: 0.2,
    })
  );
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.position.y = -1;
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);

  return { clickPlane: groundPlane };
}
