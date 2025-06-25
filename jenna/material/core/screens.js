import * as THREE from 'three';
import { RADIUS } from '../common/constants.js';

export function createScreensSphere(textures) {
  const screensGroup = new THREE.Group();
  const SCREEN_WIDTH = 5;
  const SCREEN_HEIGHT = 3;

  const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT) + 2;
  const unitΘ = Math.PI / rows;

  for (let i = 1; i < rows - 1; i++) {
    const θ0 = i * unitΘ;
    const θLen = unitΘ;
    const lat = Math.sin(θ0 + θLen / 2) * RADIUS;
    const cols = Math.ceil((2 * Math.PI * lat) / SCREEN_WIDTH);

    if (cols < 1) continue;

    const φLen = (2 * Math.PI) / cols;

    for (let j = 0; j < cols; j++) {
      const φ0 = j * φLen;
      const tex = textures[(i * cols + j) % textures.length];

      const geo = new THREE.SphereGeometry(RADIUS, 1, 1, φ0, φLen, θ0, θLen);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        emissive: '#000000',
        emissiveIntensity: 0,
        roughness: 0.4,
        metalness: 0.05,
      });

      screensGroup.add(new THREE.Mesh(geo, mat));
    }
  }

  return screensGroup;
}
