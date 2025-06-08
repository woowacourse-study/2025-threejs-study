import * as THREE from "three";
import { STRING_CONSTANTS } from "../../constants/systemConstants";

const createBassString = (start, end, scale = 0.1) => {
	const startVector = new THREE.Vector3(start.x, start.y, start.z);
	const endVector = new THREE.Vector3(end.x, end.y, end.z);

	const mid = new THREE.Vector3()
		.addVectors(startVector, endVector)
		.multiplyScalar(0.5);
	const curve = new THREE.CatmullRomCurve3([
		startVector.clone(),
		mid,
		endVector.clone(),
	]);

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

export const createBassStrings = (basePositions) => {
	const stringMeshes = [];

	for (const { start, end, scale } of STRING_CONSTANTS) {
		const string = createBassString(start, end, scale);
		const cloned = string.geometry.attributes.position.clone();
		basePositions.set(string, cloned);
		stringMeshes.push(string);
	}

	return stringMeshes;
};
