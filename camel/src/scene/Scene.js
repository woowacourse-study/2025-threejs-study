import * as THREE from 'three';

export const createScene = () => {
    const scene = new THREE.Scene();
    setupSkybox(scene);
    return scene;
};

const setupSkybox = (scene) => {
    const textureLoader = new THREE.TextureLoader();
    const skyTexture = textureLoader.load("/assets/background-space.jpg");
    skyTexture.encoding = THREE.sRGBEncoding;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({
        map: skyTexture,
        side: THREE.BackSide,
    });
    const skyDome = new THREE.Mesh(geometry, material);
    scene.add(skyDome);
}; 