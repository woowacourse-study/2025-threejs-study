import { setupLights } from "./rendering/lights.js";
import { setupEnvironment } from "./rendering/environment.js";
import { loadModel } from "./loaders/model.js";
import { animate } from "./interaction/animation.js";

const init = async () => {
  try {
    setupLights();
    setupEnvironment();
    await loadModel();
    animate();
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }
};

init();
