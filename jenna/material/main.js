import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const SCREEN_IMAGE = [
  '/v1740585635/woowacourse/web-wiki/sydney5.jpg',
  '/v1740585635/woowacourse/web-wiki/sydney.jpg',
  '/v1740585631/woowacourse/web-wiki/sydney7.jpg',
  '/v1740589241/woowacourse/web-wiki/sydney10.jpg',
];

const SCREEN_WIDTH = 5;
const SCREEN_HEIGHT = 3;
const RADIUS = 5;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = RADIUS * 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(new THREE.AxesHelper(2 * RADIUS));
scene.add(new THREE.AmbientLight('#ffffff', 1.5));
const dirLight = new THREE.DirectionalLight('#ffffff', 2);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const loader = new THREE.TextureLoader();
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

function makePatch(texture, thetaStart, thetaLength, phiStart, phiLength) {
  const geo = new THREE.SphereGeometry(
    RADIUS,
    1,
    1,
    thetaStart,
    thetaLength,
    phiStart,
    phiLength
  );
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    emissive: '#111111',
    roughness: 0.8,
  });
  return new THREE.Mesh(geo, mat);
}

const screensGroup = new THREE.Group();
const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT);
const unitPhi = Math.PI / rows;
for (let i = 0; i < rows; i++) {
  const phiStart = i * unitPhi;
  const phiLength = unitPhi;

  const latitude = Math.sin(phiStart + phiLength / 2) * RADIUS;
  const cols = Math.ceil((2 * Math.PI * latitude) / SCREEN_WIDTH);
  if (cols < 1) continue;

  const thetaLength = (2 * Math.PI) / cols;
  for (let j = 0; j < cols; j++) {
    const thetaStart = j * thetaLength;
    const texture = textures[(i * cols + j) % textures.length];

    const patch = makePatch(
      texture,
      thetaStart,
      thetaLength,
      phiStart,
      phiLength
    );

    screensGroup.add(patch);
  }
}

scene.add(screensGroup);

window.addEventListener('resize', () => {
  const W = window.innerWidth,
    H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  composer.setSize(W, H);
});

function animate() {
  requestAnimationFrame(animate);
  screensGroup.rotation.y += 0.002;
  controls.update();
  composer.render();
}

animate();
