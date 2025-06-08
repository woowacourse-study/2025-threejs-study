import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLBModel } from "./loaders/loadGLBModel";
import { setUpBassStringInteraction } from "./setup/setUpBassString";
import { vibration } from "./animation/vibration";
import { createStage } from "./public/util/createStage";
import { parabola } from "./animation/parabola";
import { bounce, startBounceAnimation } from "./animation/bounce";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#1e1e1e");

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.set(0, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const radians = THREE.MathUtils.degToRad(305);
const radians2 = THREE.MathUtils.degToRad(-5);
const radians3 = THREE.MathUtils.degToRad(-70);
const radians4 = THREE.MathUtils.degToRad(18);

const bassGroup = new THREE.Group();
const basePositions = new Map();
let stringMeshes = [];

function loadBassModel() {
	loadGLBModel("/models/bass-pickup.glb", (m) => {
		m.position.set(2, 2, 4);
		m.scale.set(10, 10, 10);
		m.rotation.set(radians2, radians2, radians);
		bassGroup.add(m);
	});

	loadGLBModel("/models/bass-pickup.glb", (m) => {
		m.position.set(4, -5, 5);
		m.scale.set(10, 10, 10);
		m.rotation.set(radians2, radians2, radians);
		bassGroup.add(m);
	});

	loadGLBModel("/models/bass-bridge.glb", (m) => {
		m.position.set(6, -12, 6);
		m.scale.set(7, 7, 7);
		m.rotation.set(radians2, 0, radians3);
		bassGroup.add(m);
	});

	loadGLBModel("/models/bass-body.glb", (m) => {
		m.position.set(0, 0, 5);
		m.scale.set(40, 40, 40);
		bassGroup.add(m);
	});

	loadGLBModel("/models/bass-neck.glb", (m) => {
		m.position.set(-9, 25, 0);
		m.scale.set(60, 60, 60);
		m.rotation.set(radians4, 0, radians4);
		bassGroup.add(m);
	});
}

function setupLights() {
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
	scene.add(createStage());

	const keyLight = new THREE.DirectionalLight(0xfff0dd, 3.5);
	keyLight.position.set(60, 80, 40);
	keyLight.target = bassGroup;
	scene.add(keyLight);
	scene.add(new THREE.DirectionalLightHelper(keyLight, 2, 0xfff0dd));

	const rimLight = new THREE.DirectionalLight(0xaa66ff, 2);
	rimLight.position.set(-80, 50, -50);
	rimLight.target = bassGroup;
	scene.add(rimLight);
	scene.add(new THREE.DirectionalLightHelper(rimLight, 2, 0xaa66ff));

	const bottomLight = new THREE.SpotLight(
		0xcc0033,
		800,
		300,
		Math.PI / 3,
		0.8,
		1,
	);
	bottomLight.position.set(10, -40, 10);
	bottomLight.target = bassGroup;
	scene.add(bottomLight);
	scene.add(bottomLight.target);
	scene.add(new THREE.SpotLightHelper(bottomLight, 2, 0xcc0033));
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();

	bounce(bassGroup, 1, 0.0015, 2, "y");
	vibration(stringMeshes, basePositions);
	parabola();

	renderer.render(scene, camera);
}

loadBassModel();
setupLights();
stringMeshes = setUpBassStringInteraction(bassGroup, camera, basePositions);
for (const mesh of stringMeshes) {
	bassGroup.add(mesh);
}
scene.add(bassGroup);

startBounceAnimation();
animate();
