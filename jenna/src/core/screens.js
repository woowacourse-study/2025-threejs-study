import * as THREE from 'three';
import { RADIUS } from '../common/constants.js';

export function createScreensSphere(textures) {
  const screensGroup = new THREE.Group();
  const SCREEN_WIDTH = 5;
  const SCREEN_HEIGHT = 3;

  const rowCount = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT) + 2;
  const thetaStep = Math.PI / rowCount;

  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex++) {
    const startTheta = rowIndex * thetaStep;
    const thetaLength = thetaStep;

    const latitudeRadius = Math.sin(startTheta + thetaLength / 2) * RADIUS;
    const colCount = Math.ceil((2 * Math.PI * latitudeRadius) / SCREEN_WIDTH);
    if (colCount < 1) continue;

    const phiLength = (2 * Math.PI) / colCount;

    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const startPhi = colIndex * phiLength;
      const texture =
        textures[(rowIndex * colCount + colIndex) % textures.length];

      const geometry = new THREE.SphereGeometry(
        RADIUS,
        1,
        1,
        startPhi,
        phiLength,
        startTheta,
        thetaLength
      );
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        emissive: '#000000',
        emissiveIntensity: 0,
        roughness: 0.4,
        metalness: 0.05,
      });

      screensGroup.add(new THREE.Mesh(geometry, material));
    }
  }

  return screensGroup;
}
