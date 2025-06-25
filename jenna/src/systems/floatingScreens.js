import * as THREE from 'three';
import {
  RADIUS,
  MARGIN,
  PLANE_HEIGHT,
  SPIN_DURATION,
  SPAWN_DURATION,
} from '../common/constants.js';
import { easeOutQuad } from '../common/utils.js';

export function createSpawnData(textures, spinStartTime) {
  return textures.map((tex, i) => {
    const φ = Math.random() * Math.PI * 2;
    const cosθ = 2 * Math.random() - 1;
    const θ = Math.acos(cosθ);

    const dir = new THREE.Vector3(
      Math.sin(θ) * Math.cos(φ),
      Math.cos(θ),
      Math.sin(θ) * Math.sin(φ)
    );

    const targetPos = dir.multiplyScalar(RADIUS + MARGIN);
    const delay = (i / textures.length) * SPIN_DURATION;

    return {
      tex,
      targetPos,
      spawnTime: spinStartTime + delay,
      mesh: null,
      startTime: null,
    };
  });
}

export function processSpawnData(
  spawnData,
  currentTime,
  clickPoint,
  floatingGroup
) {
  spawnData.forEach((data) => {
    if (currentTime >= data.spawnTime && !data.mesh) {
      const img = data.tex.image;
      const aspect = img.width && img.height ? img.width / img.height : 1;

      const geo = new THREE.PlaneGeometry(aspect * PLANE_HEIGHT, PLANE_HEIGHT);

      const mat = new THREE.MeshStandardMaterial({
        map: data.tex,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.05,
        emissive: '#000000',
        emissiveIntensity: 0,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(clickPoint);
      floatingGroup.add(mesh);

      data.mesh = mesh;
      data.startTime = currentTime;
    }
  });
}

export function updateFloatingScreens(
  spawnData,
  currentTime,
  clickPoint,
  camera
) {
  spawnData.forEach((data) => {
    if (data.mesh && data.startTime !== null) {
      const t = (currentTime - data.startTime) / SPAWN_DURATION;
      const progress = Math.min(Math.max(t, 0), 1);
      const ease = easeOutQuad(progress);

      data.mesh.position.lerpVectors(clickPoint, data.targetPos, ease);
      data.mesh.lookAt(camera.position);

      if (progress >= 1) {
        data.startTime = null;
      }
    }
  });
}

export function cleanupFloatingGroup(floatingGroup, scene) {
  if (floatingGroup) {
    scene.remove(floatingGroup);
    floatingGroup.children.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
  }
}
