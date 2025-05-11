import * as THREE from 'three';

export function createTorus(radius = 2, tube = 0.05, color = '#ffffff') {
  const geometry = new THREE.TorusGeometry(radius, tube, 16, 100); // (반지름, 두께, 세그먼트 수)
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.3,
    roughness: 0.7,
  });

  const torus = new THREE.Mesh(geometry, material);
  torus.castShadow = true;
  torus.receiveShadow = true;

  return torus;
}
