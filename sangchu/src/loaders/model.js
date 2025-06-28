import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { scene } from "../core/scene.js";
import { LoadingUI } from "../ui/loading.js";

export let model = null;
let loadingUI = null;

export const loadModel = () => {
  const loader = new GLTFLoader();

  loadingUI = new LoadingUI();

  return new Promise((resolve, reject) => {
    loader.load(
      "./assets/sangchu-god.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(-0.5, -2.5, 0);
        scene.add(model);

        loadingUI.updateProgress(100);
        setTimeout(() => {
          loadingUI.hide();
        }, 1000);

        resolve(model);
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total) * 100;
          loadingUI.updateProgress(percent);
        }
      },
      (error) => {
        loadingUI.hide();
        console.error("상추신이 나타나지 못했어요:", error);
        reject(error);
      }
    );
  });
};

export const getModel = () => model;
