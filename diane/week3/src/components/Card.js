import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadCardModel = async () => {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      '/card.glb', // public 폴더 기준 경로
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.7, 0.7, 0.7); // 크기 조절 (필요 시)
        model.position.set(0, 0, 0);
        resolve(model);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
