import * as THREE from "three";
import { createCamera } from "./camera/Camera";
import { createKeyboardControls } from "./controls/KeyboardControls";
import { createRaycasterControls } from "./controls/RaycasterControls";
import { setupLights } from "./lights/Lights";
import { createModelLoader } from "./models/ModelLoader";
import { createScene } from "./scene/Scene";
import { createSpeechBubble } from "./ui/SpeechBubble";

import { createElement } from "./utils/document";

const SUPPORTED_CHARACTERS = [
  "camel",
  "drMartin",
  "hwama",
  "boseUltra",
  "pasta",
  "deadpool",
];

const CHARACTER_AUDIO = {
  camel: new Audio("/assets/audio/camel.mp3"),
  drMartin: new Audio("/assets/audio/drMartin.mp3"),
  hwama: new Audio("/assets/audio/hwama.mp3"),
  boseUltra: new Audio("/assets/audio/boseUltra.mp3"),
  pasta: new Audio("/assets/audio/pasta.mp3"),
  deadpool: new Audio("/assets/audio/deadpool.mp3"),
};

const init = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.getElementById("app").appendChild(renderer.domElement);

  const scene = createScene();
  const { camera, controls, update: updateCamera } = createCamera(renderer);
  setupLights(scene);
  const { loadModel, update: updateModels } = createModelLoader(scene);
  const { update: updateKeyboard } = createKeyboardControls(camera, controls);
  const { showSpeech } = createSpeechBubble();

  const cleanupRaycaster = createRaycasterControls(
    scene,
    camera,
    (objectName) => {
      if (SUPPORTED_CHARACTERS.includes(objectName)) {
        const audio = CHARACTER_AUDIO[objectName];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
        showSpeech(objectName);
      }
    }
  );

  loadModels(loadModel);

  animate();

  function animate() {
    requestAnimationFrame(animate);

    updateKeyboard();
    updateModels();
    updateCamera();

    renderer.render(scene, camera);
  }

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
      { x: -0.5, y: -2.5, z: 0 }
    );

    await loadModel(
      "/assets/dr-martin.glb",
      "drMartin",
      { x: -20, y: 10, z: 4 },
      { x: -0.5, y: -2.5, z: 0 }
    );

    await loadModel(
      "/assets/hwama.glb",
      "hwama",
      { x: 20, y: -14, z: 6 },
      { x: -0.5, y: -2.5, z: 0 }
    );

    await loadModel(
      "/assets/bose-ultra.glb",
      "boseUltra",
      { x: 40, y: -14, z: -30 },
      { x: -0.5, y: -2.5, z: 0 }
    );

    await loadModel(
      "/assets/deadpool.glb",
      "deadpool",
      { x: -10, y: 10, z: 40 },
      { x: -0.5, y: -2.5, z: 20 }
    );

    await loadModel(
      "/assets/pasta.glb",
      "pasta",
      { x: 5, y: -5, z: -30 },
      { x: -0.5, y: -2.5, z: 0 }
    );
  } catch (error) {
    console.error("모델 로딩 실패:", error);
  }
};

init();
