import * as THREE from "three";
import { createBassStrings } from "../scene/createBassString";
import { startStringVibration } from "../animation/vibration";
import { createNotes } from "../scene/createNote";
import { startParabolaAnimation } from "../animation/parabola";
import { loadSound } from "../loaders/loadSound";
import { getRandomElement } from "../util/getRandomElement";
import { SOUND_FILE_ARRAY } from "../constants/systemConstants";

export const setUpBassStringInteraction = (
	bassGroup,
	camera,
	basePositions,
) => {
	const stringMeshes = createBassStrings(basePositions);

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	window.addEventListener("click", async (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(bassGroup, true);

		if (intersects.length > 0) {
			startStringVibration();
			const listener = new THREE.AudioListener();
			camera.add(listener);
			const randomRoute = getRandomElement(SOUND_FILE_ARRAY);
			const soundRoute = `./sounds/${randomRoute}.mp3`;
			const sound = await loadSound(soundRoute, listener);
			sound.play();

			createNotes(2).then((notes) => {
				bassGroup.add(...notes);
				notes.map((note) => startParabolaAnimation(note));
			});
		}
	});

	return stringMeshes;
};
