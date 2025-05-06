import * as THREE from 'three';

export default function createBottle() {
  /* ---- 몸통 -----*/
  const points = [];
  points.push(new THREE.Vector2(0.0, 0.0)); // 아래 바닥
  points.push(new THREE.Vector2(0.42, 0.0)); // 아래 둥근 부분
  points.push(new THREE.Vector2(0.62, 0.5)); // 점점 좁아지는 부분
  points.push(new THREE.Vector2(0.62, 0.6)); // 목 윗부분
  points.push(new THREE.Vector2(0.38, 1.13)); // 뚜껑 근처
  points.push(new THREE.Vector2(0.38, 1.2)); // 뚜껑 근처

  const geometry = new THREE.LatheGeometry(points, 64); // LatheGeometry를 사용하여 원통형으로 만듭니다.

  const material = new THREE.MeshStandardMaterial({
    color: '#fff896',
    roughness: 0.5,
    metalness: 0.2,
  });

  const bananaMilk = new THREE.Mesh(geometry, material);
  bananaMilk.castShadow = true; // 그림자 드리우기

  return bananaMilk;
}
