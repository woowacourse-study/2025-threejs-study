import * as THREE from "three";
import { createScene } from "./scene/Scene";
import { createCamera } from "./camera/Camera";
import { setupLights } from "./lights/Lights";
import { createModelLoader } from "./models/ModelLoader";
import { createKeyboardControls } from "./controls/KeyboardControls";
import { createSpeechBubble } from "./ui/SpeechBubble";
import { createRaycasterControls } from "./controls/RaycasterControls";

const init = () => {
  // 렌더러 설정
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.getElementById("app").appendChild(renderer.domElement);

  // 씬 설정
  const scene = createScene();
  const { camera, controls, update: updateCamera } = createCamera(renderer);
  setupLights(scene);
  const { loadModel, update: updateModels } = createModelLoader(scene);
  const { update: updateKeyboard } = createKeyboardControls(camera, controls);
  const { showSpeech } = createSpeechBubble();

  // Raycaster 설정
  const cleanupRaycaster = createRaycasterControls(scene, camera, (objectName) => {
    if (objectName === 'camel') {
      showSpeech('camel');
    } else if (objectName === 'drMartin') {
      showSpeech('drMartin');
    }
  });

  // 모델 로딩
  loadModels(loadModel);

  // 애니메이션 시작
  animate();

  function animate() {
    requestAnimationFrame(animate);

    updateKeyboard();
    updateModels();
    updateCamera();

    renderer.render(scene, camera);
  }

  // 컴포넌트 언마운트 시 클린업
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
      { x: -2, y: 2, z: 1 },
      { x: -0.5, y: -2.5, z: 0 }
    );
  } catch (error) {
    console.error("모델 로딩 실패:", error);
  }
};

// 앱 시작
init();
