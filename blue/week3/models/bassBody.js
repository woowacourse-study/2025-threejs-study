import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { SYSTEM_CONSTANTS } from "../constants/systemConstants";

export async function createBassBody() {
  return new Promise((resolve) => {
    const loader = new SVGLoader();
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load("/texture/body-texture.jpg", (texture) => {
      loader.load("/bass-body.svg", (data) => {
        const paths = data.paths;
        const meshes = [];

        paths.forEach((path) => {
          const shapes = path.toShapes(true);

          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: SYSTEM_CONSTANTS.BODY_DEPTH,
              bevelEnabled: false,
            });

            geometry.computeBoundingBox();
            const bbox = geometry.boundingBox;
            geometry.setAttribute("uv", computeUVs(geometry, bbox));

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);

            const material = new THREE.MeshStandardMaterial({
              map: texture,
              color: 0xffffff,
              side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(
              SYSTEM_CONSTANTS.MESH_SCALE,
              SYSTEM_CONSTANTS.MESH_SCALE,
              SYSTEM_CONSTANTS.MESH_SCALE
            );
            mesh.rotation.x = -Math.PI / 2;

            meshes.push(mesh);
          });
        });
        resolve(meshes);
      });
    });
  });
}

function computeUVs(geometry, bbox) {
  const positions = geometry.attributes.position.array;
  const uvs = [];

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];

    const u = (x - bbox.min.x) / (bbox.max.x - bbox.min.x);
    const v = (y - bbox.min.y) / (bbox.max.y - bbox.min.y);

    uvs.push(u, v);
  }

  return new THREE.Float32BufferAttribute(uvs, 2);
}
