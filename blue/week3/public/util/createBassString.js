import * as THREE from "three";

// 양쪽 끝을 잡고 특정 지점만 진동하게 한다 - BufferGeometry 사용
// Tube Geometry는 내부적으로 BufferGeometry를 사용
export const createBassString = (start, end, scale = 0.1) => {
  const startVector = new THREE.Vector3(start.x, start.y, start.z);
  const endVector = new THREE.Vector3(end.x, end.y, end.z);

  const mid = new THREE.Vector3()
    .addVectors(startVector, endVector)
    .multiplyScalar(0.5);
  const curve = new THREE.CatmullRomCurve3([
    startVector.clone(),
    mid, // 애니메이션 진동
    endVector.clone(),
  ]);
  //20 개의 segment, 반지름 0.02
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

// 기본적으로 Y축 방향으로 생성
