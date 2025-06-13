import * as THREE from "three";
import { COLORS, CAMERA_CONFIG } from "../config/constants.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);

export const camera = new THREE.PerspectiveCamera(
  CAMERA_CONFIG.fov,
  window.innerWidth / window.innerHeight,
  CAMERA_CONFIG.near,
  CAMERA_CONFIG.far
);
camera.position.set(
  CAMERA_CONFIG.position.x,
  CAMERA_CONFIG.position.y,
  CAMERA_CONFIG.position.z
);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
