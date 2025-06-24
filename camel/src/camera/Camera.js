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
		update: () => {
			// 항상 camera가 바라보는 방향으로 controls.target을 맞춤 (1인칭 효과)
			const direction = new THREE.Vector3();
			camera.getWorldDirection(direction);
			controls.target.copy(camera.position).add(direction);
			controls.update();
		},
	};
};

const setupControls = (controls) => {
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.enableRotate = true;
	controls.rotateSpeed = 0.5;
	controls.maxPolarAngle = Math.PI;
};
