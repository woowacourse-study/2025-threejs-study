import * as THREE from "three";

export function createMeshBasicMaterialObject() {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/textures/Fabric035_1K-JPG_Color.jpg");

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: false,
  });
  return new THREE.Mesh(geometry, material);
}
