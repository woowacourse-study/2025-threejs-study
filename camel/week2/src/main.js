import * as THREE from "three";
import { createRockSphere } from "./objects/texture";
import { createMeshBasicMaterialObject } from "./objects/MeshBasicMaterialObject";
import { createGlassBall } from "./objects/GlassBall";
import { createPavingStones } from "./objects/PavingStones";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const rock = createRockSphere();
rock.position.x = -1.5;
scene.add(rock);

const MeshBasicMaterialObject = createMeshBasicMaterialObject();
MeshBasicMaterialObject.position.x = 1.5;
scene.add(MeshBasicMaterialObject);

const pavingStones = createPavingStones();
scene.add(pavingStones);

let glassBall;

async function init() {
  glassBall = await createGlassBall();
  scene.add(glassBall);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  rock.rotation.x += 0.001;
  rock.rotation.y += 0.003;

  pavingStones.rotation.x += 0.001;
  pavingStones.rotation.y += 0.003;

  MeshBasicMaterialObject.rotation.x += 0.003;
  MeshBasicMaterialObject.rotation.y += 0.005;

  renderer.render(scene, camera);
}

init();
