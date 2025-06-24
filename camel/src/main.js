import * as THREE from "three";
import { createCamera } from "./camera/Camera";
import { createKeyboardControls } from "./controls/KeyboardControls";
import { createRaycasterControls } from "./controls/RaycasterControls";
import { setupLights } from "./lights/Lights";
import { createModelLoader } from "./models/ModelLoader";
import { createScene } from "./scene/Scene";
import { createSpeechBubble } from "./ui/SpeechBubble";

const init = () => {
	// 렌더러 설정
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.getElementById("app").appendChild(renderer.domElement);

	// 씬 설정
	const scene = createScene();
	const { camera, controls, update: updateCamera } = createCamera(renderer);
	setupLights(scene);
	const { loadModel, update: updateModels } = createModelLoader(scene);
	const { update: updateKeyboard } = createKeyboardControls(camera, controls);
	const { showSpeech } = createSpeechBubble();

	// Raycaster 설정
	const cleanupRaycaster = createRaycasterControls(
		scene,
		camera,
		(objectName) => {
			if (objectName === "camel") {
				showSpeech("camel");
			} else if (objectName === "drMartin") {
				showSpeech("drMartin");
			} else if (objectName === "hwama") {
				showSpeech("hwama");
			}
		},
	);

	// 모델 로딩
	loadModels(loadModel);

	// 애니메이션 시작
	animate();

	function animate() {
		requestAnimationFrame(animate);

		updateKeyboard();
		updateModels();
		updateCamera();

		renderer.render(scene, camera);
	}

	// 컴포넌트 언마운트 시 클린업
	return () => {
		cleanupRaycaster();
	};
};

const loadModels = async (loadModel) => {
	try {
		await loadModel(
			"/assets/camel-hangseong.glb",
			"camel",
			{ x: 0, y: 0, z: 0 },
			{ x: -0.5, y: -2.5, z: 0 },
		);

		await loadModel(
			"/assets/dr-martin.glb",
			"drMartin",
			{ x: -20, y: 10, z: 4 },
			{ x: -0.5, y: -2.5, z: 0 },
		);

		await loadModel(
			"/assets/hwama.glb",
			"hwama",
			{ x: 20, y: -14, z: 6 },
			{ x: -0.5, y: -2.5, z: 0 },
		);

		await loadModel(
			"/assets/bose-ultra.glb",
			"boseUltra",
			{ x: 10, y: -10, z: -6 },
			{ x: -0.5, y: -2.5, z: 0 },
		);

		await loadModel(
			"/assets/deadpool.glb",
			"deadpool",
			{ x: -10, y: 10, z: 4 },
			{ x: -0.5, y: -2.5, z: 0 },
		);

		await loadModel(
			"/assets/pasta.glb",
			"pasta",
			{ x: 25, y: -5, z: 2 },
			{ x: -0.5, y: -2.5, z: 0 },
		);
	} catch (error) {
		console.error("모델 로딩 실패:", error);
	}
};

init();
