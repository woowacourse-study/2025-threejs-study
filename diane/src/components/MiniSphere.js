import * as THREE from 'three';

const createMiniSphere = () => {
  const geometry = new THREE.SphereGeometry(0.2, 36, 36);

  const material = new THREE.MeshStandardMaterial({
    color: '#efefef',
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

  return sphere;
};

export default createMiniSphere;
