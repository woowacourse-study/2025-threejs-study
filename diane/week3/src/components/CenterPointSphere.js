import * as THREE from 'three';

export default function createCenterPointSphere() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);

  const material = new THREE.MeshStandardMaterial({
    color: '#ae8cff',
    roughness: 0.7,
    metalness: 0.8,
    emissive: '#ae8cff',
    emissiveIntensity: 2,
  });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = true;

 


  return sphere;
}
