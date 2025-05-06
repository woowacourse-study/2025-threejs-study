import * as THREE from 'three';

export default function createCap() {
  /* ---- 뚜껑 -----*/
  const bottleTopY = 1.2;
  const capGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 32);

  const textureLoader = new THREE.TextureLoader();
  const capTexture = textureLoader.load('/public/bananaMilk-cap.png');

  capTexture.repeat.set(0.94, 0.94); // 이미지 확대
  capTexture.offset.set(-0.014, 0.04); // 좌(-)/우(+) / 아래(-)/위(+)

  const capMaterial = [
    new THREE.MeshStandardMaterial({ color: '#2a5a1b' }),
    new THREE.MeshStandardMaterial({ map: capTexture }),
    new THREE.MeshStandardMaterial({ color: '#2a5a1b' }),
  ];

  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.y = bottleTopY + 0.03;
  cap.receiveShadow = true; // 그림자 받기
  cap.castShadow = true; // 그림자 드리우기

  return cap;
}
