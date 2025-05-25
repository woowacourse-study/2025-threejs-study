import * as THREE from "three";
import { STRING_CONSTANTS } from "../constants/systemConstants";
import { createBassString } from "../public/util/createBassString";
import { startStringVibration } from "../animation/vibration";

export const setupBassScene = (bassGroup, camera, basePositions) => {
  const stringMeshes = [];

  for (const { start, end, scale } of STRING_CONSTANTS) {
    const string = createBassString(start, end, scale);

    const cloned = string.geometry.attributes.position.clone();
    basePositions.set(string, cloned);

    stringMeshes.push(string);
  }

  // 마우스 클릭 → 베이스 클릭되면 진동 시작
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    const { clientX, clientY } = event;
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(bassGroup, true);

    if (intersects.length > 0) startStringVibration();
  });

  return stringMeshes;
};
