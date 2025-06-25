import * as THREE from 'three';
import {
  RADIUS,
  MARGIN,
  PLANE_HEIGHT,
  SPIN_DURATION,
  SPAWN_DURATION,
} from '../common/constants.js';
import { easeOutQuad } from '../common/utils.js';

export function createSpawnItems(textures, spinStartTimestamp) {
  return textures.map((texture, index) => {
    const azimuth = Math.random() * Math.PI * 2; // φ
    const randomCosine = 2 * Math.random() - 1; // cosθ
    const polarAngle = Math.acos(randomCosine); // θ

    const direction = new THREE.Vector3(
      Math.sin(polarAngle) * Math.cos(azimuth),
      Math.cos(polarAngle),
      Math.sin(polarAngle) * Math.sin(azimuth)
    );

    const targetPosition = direction.multiplyScalar(RADIUS + MARGIN);
    const spawnDelay = (index / textures.length) * SPIN_DURATION;

    return {
      texture,
      targetPosition,
      spawnTimestamp: spinStartTimestamp + spawnDelay,
      screenMesh: null,
      activationTimestamp: null,
    };
  });
}

export function processSpawnItems(
  spawnItems,
  currentTimestamp,
  clickPosition,
  floatingScreensGroup
) {
  spawnItems.forEach((item) => {
    if (currentTimestamp >= item.spawnTimestamp && !item.screenMesh) {
      const image = item.texture.image;
      const aspect =
        image.width && image.height ? image.width / image.height : 1;

      const geometry = new THREE.PlaneGeometry(
        aspect * PLANE_HEIGHT,
        PLANE_HEIGHT
      );
      const material = new THREE.MeshStandardMaterial({
        map: item.texture,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.05,
        emissive: '#000000',
        emissiveIntensity: 0,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(clickPosition);
      floatingScreensGroup.add(mesh);

      item.screenMesh = mesh;
      item.activationTimestamp = currentTimestamp;
    }
  });
}

export function updateFloatingScreens(
  spawnItems,
  currentTimestamp,
  clickPosition,
  camera
) {
  spawnItems.forEach((item) => {
    const { screenMesh, activationTimestamp, targetPosition } = item;
    if (screenMesh && activationTimestamp !== null) {
      const t = (currentTimestamp - activationTimestamp) / SPAWN_DURATION;
      const clamped = Math.min(Math.max(t, 0), 1);
      const eased = easeOutQuad(clamped);

      screenMesh.position.lerpVectors(clickPosition, targetPosition, eased);
      screenMesh.lookAt(camera.position);

      if (clamped >= 1) {
        item.activationTimestamp = null;
      }
    }
  });
}

export function cleanupFloatingScreens(floatingScreensGroup, scene) {
  if (!floatingScreensGroup) return;

  scene.remove(floatingScreensGroup);
  floatingScreensGroup.children.forEach((mesh) => {
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
}
