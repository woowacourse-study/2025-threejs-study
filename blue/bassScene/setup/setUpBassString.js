import * as THREE from "three";
import { createBassStrings } from "../public/util/createBassString";
import { startStringVibration } from "../animation/vibration";
import { createNotes } from "../public/util/createNote";
import { startParabolaAnimation } from "../animation/parabola";

export const setUpBassStringInteraction = (
	bassGroup,
	camera,
	basePositions,
) => {
	const stringMeshes = createBassStrings(basePositions);

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	window.addEventListener("click", (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(bassGroup, true);

		if (intersects.length > 0) {
			startStringVibration();
			// TODO : 소리 삽입
			createNotes(2).then((notes) => {
				bassGroup.add(...notes);
				notes.map((note) => startParabolaAnimation(note));
			});
		}
	});

	return stringMeshes;
};
