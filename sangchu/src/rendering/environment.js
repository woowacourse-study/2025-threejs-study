import * as THREE from "three";
import { COLORS } from "../config/constants.js";
import { scene } from "../core/scene.js";

export const setupEnvironment = () => {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: COLORS.plane,
      roughness: 0.8,
      metalness: 0.2,
    })
  );
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  return { plane };
};
