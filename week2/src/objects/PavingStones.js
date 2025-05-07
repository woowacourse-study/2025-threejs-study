import * as THREE from "three";

export function createPavingStones() {
  const loader = new THREE.TextureLoader();
  const colorMap = loader.load(
    "/textures/PavingStones/PavingStones138_1K-JPG_Color.jpg"
  );
  const normalMap = loader.load(
    "/textures/PavingStones/PavingStones138_1K-JPG_NormalGL.jpg"
  );
  const roughnessMap = loader.load(
    "/textures/PavingStones/PavingStones138_1K-JPG_Roughness.jpg"
  );
  const aoMap = loader.load(
    "/textures/PavingStones/PavingStones138_1K-JPG_AmbientOcclusion.jpg"
  );
  const displacementMap = loader.load(
    "/textures/PavingStones/PavingStones138_1K-JPG_Displacement.jpg"
  );

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

  geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
  );

  const material = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    displacementMap: displacementMap,
    displacementScale: 0,
  });

  return new THREE.Mesh(geometry, material);
}
