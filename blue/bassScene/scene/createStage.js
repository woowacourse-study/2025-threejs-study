import * as THREE from "three";

export const createStage = () => {
	const stageGroup = new THREE.Group();

	const stageGeometry = new THREE.BoxGeometry(100, 10, 150);
	const stageTexture = new THREE.TextureLoader().load(
		"./texture/stage-texture.jpg",
	);
	const stageMaterial = new THREE.MeshBasicMaterial({ map: stageTexture });

	const stage = new THREE.Mesh(stageGeometry, stageMaterial);
	stage.position.set(0, -50, 0);
	stageGroup.add(stage);

	const backgroundGeometry = new THREE.PlaneGeometry(150, 150, 150);
	const backgroundTexture = new THREE.TextureLoader().load(
		"./texture/background-texture.png",
	);
	const backgroundMaterial = new THREE.MeshBasicMaterial({
		map: backgroundTexture,
	});
	const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
	background.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
	background.position.set(-50, 30, 0);

	stageGroup.add(background);

	return stageGroup;
};
