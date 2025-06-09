import * as THREE from 'three';

export const setupLights = (scene) => {
    const ambientLight = new THREE.AmbientLight("#404040");
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight("#ffffff", 10);
    rimLight.position.set(2, 0, -2);
    rimLight.target.position.set(0, 0, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);

    const bottomLight = new THREE.DirectionalLight("#5183FF", 10);
    bottomLight.position.set(0, -2, 0);
    bottomLight.target.position.set(0, 0, 0);
    scene.add(bottomLight);
    scene.add(bottomLight.target);

    const keyLight = new THREE.DirectionalLight("#FFF8DA", 3);
    keyLight.position.set(-1, 1, 1);
    keyLight.target.position.set(0, 0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);
}; 