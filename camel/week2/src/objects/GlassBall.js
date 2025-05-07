import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export function createGlassBall() {
  return new Promise((resolve) => {
    new RGBELoader()
      .setPath("/textures/")
      .load("brown_photostudio_02_1k.hdr", (hdrTexture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

        const geometry = new THREE.SphereGeometry(0.6, 64, 64);

        const material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff, // 기본 색상: 흰색
          metalness: 0, // 금속성 (0: 비금속, 1: 완전한 금속)
          roughness: 0.05, // 표면 거칠기 (0: 매끄러움, 1: 거칠음)
          transmission: 1, // 투명도 설정 (1: 완전 투명, 0: 불투명)
          thickness: 0.1, // 두께 설정 (두께가 커질수록 빛의 굴절 표현이 강해짐)
          envMap: hdrTexture, // 반사할 환경 맵 텍스처
          envMapIntensity: 1, // 반사 강도 (1이 기본값)
          clearcoat: 0.5, // 코팅된 표면의 반사율
          clearcoatRoughness: 0.1, // 코팅 표면의 거칠기
          ior: 1.1, // 굴절률 (Index of Refraction)
          transparent: true, // 투명도 활성화
          opacity: 1.0, // 투명도 설정 (1: 완전 투명)
        });

        const glassBall = new THREE.Mesh(geometry, material);

        resolve(glassBall);
      });
  });
}
