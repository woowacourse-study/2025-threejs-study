import * as THREE from "three";

export function createRockSphere() {
  const loader = new THREE.TextureLoader();
  const colorMap = loader.load("/textures/Rock058_1K-JPG_Color.jpg");
  const normalMap = loader.load("/textures/Rock058_1K-JPG_NormalGL.jpg");
  const roughnessMap = loader.load("/textures/Rock058_1K-JPG_Roughness.jpg");
  const aoMap = loader.load("/textures/Rock058_1K-JPG_AmbientOcclusion.jpg");
  const displacementMap = loader.load(
    "/textures/Rock058_1K-JPG_Displacement.jpg"
  );

  const geometry = new THREE.SphereGeometry(0.5, 64, 64);
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
    displacementScale: 0.03,
  });

  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}
