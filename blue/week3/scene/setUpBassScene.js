import * as THREE from "three";
import { STRING_CONSTANTS } from "../constants/systemConstants";
import { createBassString } from "../public/util/createBassString";
import { startStringVibration } from "../animation/vibration";

export const setupBassScene = (bassGroup, camera, basePositions) => {
	// 생성된 각 줄을 담을 배열
	const stringMeshes = [];

	// 상수를 돌면서 각 줄을 생성
	for (const { start, end, scale } of STRING_CONSTANTS) {
		const string = createBassString(start, end, scale);

		//원래 줄의 위치를 저장, 외부에서 설정한 basePositions라는 변수에 저장 (애니메이션에서 초기 상태로 돌아오는 데에 필요함)
		const cloned = string.geometry.attributes.position.clone();
		basePositions.set(string, cloned);

		stringMeshes.push(string);
	}

	// 마우스 클릭 → 베이스 클릭되면 진동 시작
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	window.addEventListener("click", (event) => {
		const { clientX, clientY } = event;
		// 마우스 좌표를 -1 ~ 1 사이로 변환 (rayCaster가 실제로 사용하는 좌표계)
		mouse.x = (clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		// intersects -> 어디를 클릭했을 때 반응할 것인가 (true 속성은 )
		const intersects = raycaster.intersectObject(bassGroup, true);

		// intersects가 존재한다 (클릭됐다) -> 애니메이션 시작
		if (intersects.length > 0) startStringVibration();
	});

	return stringMeshes;
};
