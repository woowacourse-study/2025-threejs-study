import * as THREE from "three";

// 양쪽 끝을 잡고 특정 지점만 진동하게 한다 - BufferGeometry 사용
// Tube Geometry는 내부적으로 BufferGeometry를 사용
//시작 지점, 끝지점, 크기를 외부에서 입력받은 후
export const createBassString = (start, end, scale = 0.1) => {
	//시작 지점 (좌표를 벡터 형태로 변경)
	const startVector = new THREE.Vector3(start.x, start.y, start.z);
	//끝 지점
	const endVector = new THREE.Vector3(end.x, end.y, end.z);

	const mid = new THREE.Vector3()
		.addVectors(startVector, endVector)
		//크기를 절반으로 조정 근데 이럴바에는 그냥 처음부터 적절한 크기를 주면 되지 않냐
		.multiplyScalar(0.5);
	const curve = new THREE.CatmullRomCurve3([
		startVector.clone(),
		mid, // 애니메이션 진동
		endVector.clone(),
	]);
	//20 개의 segment (지점, 추후에 애니메이션 적용 지점 선택 가능), 반지름 0.02
	const stringGeometry = new THREE.TubeGeometry(curve, 20, scale, 8, false);
	const stringMaterial = new THREE.MeshStandardMaterial({
		color: 0xcccccc,
		metalness: 1,
		roughness: 0.3,
	});
	const stringMesh = new THREE.Mesh(stringGeometry, stringMaterial);

	const radians = THREE.MathUtils.degToRad(-2);
	const radians2 = THREE.MathUtils.degToRad(-3);
	stringMesh.rotation.set(radians2, radians2, radians);

	return stringMesh;
};
