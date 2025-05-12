import * as THREE from "three";
import { SYSTEM_CONSTANTS } from "../constants/systemConstants";

export async function createBassNeck() {
  return new Promise((resolve) => {
    const neckLength = 100;
    const neckWidth = 5;
    const neckDepth = 3;

    const geometry = new THREE.BoxGeometry(neckWidth, neckDepth, neckLength);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
    });

    const mesh = new THREE.Mesh(geometry, material);

    resolve(mesh);
  });
}
