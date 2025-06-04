import * as THREE from "three";
import { STRING_CONSTANTS } from "../constants/systemConstants";
import { createBassString } from "../public/util/createBassString";
import { startStringVibration } from "../animation/vibration";
import { createNote } from "../public/util/createNote";
import { parabola } from "../animation/parabola";

export const setupBassScene = (bassGroup, camera, scene, basePositions) => {
  const stringMeshes = [];

  for (const { start, end, scale } of STRING_CONSTANTS) {
    const string = createBassString(start, end, scale);
    const cloned = string.geometry.attributes.position.clone();
    basePositions.set(string, cloned);
    stringMeshes.push(string);
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(bassGroup, true);

    if (intersects.length > 0) {
      startStringVibration();

      // 4번 반복
      for (let i = 0; i < 2; i++) {
        createNote().then((note) => {
          note.position.set(i * 2, i * 10, 0);
          scene.add(note);
          parabola(note);
        });
      }
    }
  });

  return stringMeshes;
};
