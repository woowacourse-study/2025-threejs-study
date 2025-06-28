import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { scene } from "../core/scene.js";
import { enableShadowsForModel } from "../rendering/shadows.js";
import { hideLoading, showLoading, updateProgress } from "../ui/loading.js";

export let model = null;

export async function loadModel() {
  showLoading();

  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      "./assets/sangchu-god.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(-0.5, -2.5, 0);

        enableShadowsForModel(model);

        scene.add(model);

        updateProgress(100);
        setTimeout(() => hideLoading(), 500);
        resolve(model);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        updateProgress(percent);
      },
      (error) => {
        console.error("모델 로딩 실패:", error);
        hideLoading();
        reject(error);
      }
    );
  });
}

export function getModel() {
  return model;
}
