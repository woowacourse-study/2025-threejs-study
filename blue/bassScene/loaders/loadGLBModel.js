import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadGLBModel = (url, onLoad) => {
  new GLTFLoader().load(url, (gltf) => {
    onLoad(gltf.scene);
  });
};
