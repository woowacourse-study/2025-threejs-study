import * as THREE from 'three';

export const createKeyboardControls = (camera, controls) => {
    const keyState = {};
    const moveSpeed = 0.05;

    const setupEventListeners = () => {
        document.addEventListener("keydown", (event) => {
            keyState[event.code] = true;
        });
        document.addEventListener("keyup", (event) => {
            keyState[event.code] = false;
        });
    };

    const update = () => {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        // 전진/후진
        if (keyState["KeyW"]) {
            camera.position.addScaledVector(direction, moveSpeed);
        }
        if (keyState["KeyS"]) {
            camera.position.addScaledVector(direction, -moveSpeed);
        }

        // 좌우 이동
        const panLeft = new THREE.Vector3();
        const panUp = new THREE.Vector3();

        panLeft.crossVectors(camera.up, direction).normalize();
        panUp.crossVectors(panLeft, direction).normalize();

        if (keyState["KeyA"]) {
            camera.position.addScaledVector(panLeft, moveSpeed);
            controls.target.addScaledVector(panLeft, moveSpeed);
        }
        if (keyState["KeyD"]) {
            camera.position.addScaledVector(panLeft, -moveSpeed);
            controls.target.addScaledVector(panLeft, -moveSpeed);
        }
    };

    setupEventListeners();

    return {
        update
    };
}; 