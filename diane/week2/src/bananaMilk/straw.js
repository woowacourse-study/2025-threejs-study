import * as THREE from 'three';

export default function createStraw() {
  /* ---- 빨대 -----*/
  const strawGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 32);
  const strawMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.5,
    metalness: 0.2,
  });
  const straw = new THREE.Mesh(strawGeometry, strawMaterial);
  straw.castShadow = true;

  // 빨대 위치 조정
  straw.position.set(0, 1.4, 0.1); // X, Y, Z 좌표 조정
  straw.rotation.x = Math.PI / 11; // X축으로 회전

  return straw;
}
