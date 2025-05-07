import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export function createGlassBall() {
  return new Promise((resolve) => {
    new RGBELoader()
      .setPath("/textures/") // HDR 환경맵 경로
      .load("brown_photostudio_02_1k.hdr", (hdrTexture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

        const geometry = new THREE.SphereGeometry(0.6, 64, 64);

        const material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0,
          roughness: 0.05, // 거의 매끄럽게
          transmission: 1, // 완전 투명
          thickness: 1.0, // 구체 두께감
          envMap: hdrTexture,
          envMapIntensity: 1, // 반사 효과 강화
          clearcoat: 0.5, // 클리어코트 (광택층)
          clearcoatRoughness: 0.1, // 클리어코트의 거칠기 없음
          ior: 1.1, // 유리의 굴절률 (Index of Refraction)
          transparent: true,
          opacity: 1.0,
        });

        const glassBall = new THREE.Mesh(geometry, material);
        resolve(glassBall);
      });
  });
}
