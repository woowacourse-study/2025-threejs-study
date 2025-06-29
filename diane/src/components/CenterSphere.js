import * as THREE from 'three';

export function createCenterSphere() {
  const group = new THREE.Group();

  const geometry = new THREE.SphereGeometry(1, 36, 36);

  const material = new THREE.MeshStandardMaterial({
    color: '#8cbaff',
    transparent: true,
    opacity: 0.6,
    roughness: 0.5,
    metalness: 0.3,
    emissive: '#8cbaff',
    emissiveIntensity: 0.3,
  });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  group.add(sphere);

  //

  return group;
}
