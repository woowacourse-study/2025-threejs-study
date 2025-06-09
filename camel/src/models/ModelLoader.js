import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const createModelLoader = (scene) => {
    const models = {};

    const loadModel = async (url, name, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, scale = 1) => {
        const loader = new GLTFLoader();
        try {
            const gltf = await new Promise((resolve, reject) => {
                loader.load(url, resolve, undefined, reject);
            });

            const model = gltf.scene;
            model.name = name;
            model.scale.set(scale, scale, scale);
            model.position.set(position.x, position.y, position.z);
            model.rotation.set(rotation.x, rotation.y, rotation.z);

            scene.add(model);
            models[name] = model;
            return model;
        } catch (error) {
            console.error(`모델 로딩 실패 (${name}):`, error);
            throw error;
        }
    };

    const update = () => {
        if (models.camel) {
            models.camel.rotation.y += 0.01;
            models.camel.rotation.x += 0.01;
        }

        if (models.drMartin) {
            models.drMartin.rotation.y -= 0.001;
            models.drMartin.rotation.x += 0.001;
            models.drMartin.rotation.z -= 0.001;
        }
    };

    return {
        loadModel,
        update
    };
}; 