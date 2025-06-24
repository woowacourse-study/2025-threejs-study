import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const createCamera = (renderer) => {
	const camera = new THREE.PerspectiveCamera(
		55,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	camera.position.set(-0.5, 0.5, 10);
	camera.lookAt(0, 0, 0);

	const controls = new OrbitControls(camera, renderer.domElement);
	setupControls(controls);

	return {
		camera,
		controls,
		update: () => controls.update(),
	};
};

const setupControls = (controls) => {
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.enablePan = true;
	controls.enableZoom = true;
	controls.enableRotate = true;
	controls.rotateSpeed = 0.5;
	// controls.minDistance = 1;
	// controls.maxDistance = 100;
	controls.maxPolarAngle = Math.PI;
};
