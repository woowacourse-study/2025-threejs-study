import { animate } from "./interaction/animation.js";
import { setClickPlane, setupControls } from "./interaction/controls.js";
import { loadModel } from "./loaders/model.js";
import { setupEnvironment } from "./rendering/environment.js";
import { setupLights } from "./rendering/lights.js";

async function init() {
  try {
    setupLights();
    const { clickPlane } = setupEnvironment();
    setClickPlane(clickPlane);
    setupControls();

    await loadModel();
    animate();
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }
}

init();
