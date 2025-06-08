import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const SCREEN_IMAGE = [
  '/v1740585635/woowacourse/web-wiki/sydney5.jpg',
  '/v1740585635/woowacourse/web-wiki/sydney.jpg',
  '/v1740585631/woowacourse/web-wiki/sydney7.jpg',
  '/v1740589241/woowacourse/web-wiki/sydney10.jpg',
  '/v1748972031/Study/Three.js/study_attendance.jpg',
  '/v1748972275/Study/Three.js/dining.jpg',
  '/v1748972069/Study/Three.js/grow_Graph.jpg',
  '/v1748973468/Study/Three.js/seolleung.jpg',
  '/v1748973453/Study/Three.js/bossam.jpg',
  '/v1748973446/Study/Three.js/fe_hangsungee.jpg',
  '/v1749379638/Study/Three.js/ramen.jpg',
  '/v1749379638/Study/Three.js/pairRoom.jpg',
  '/v1749379639/Study/Three.js/ground.jpg',
  '/v1749379638/Study/Three.js/portrait.jpg',
  '/v1749379639/Study/Three.js/bottle.jpg',
  '/v1749379639/Study/Three.js/takeoff.jpg',
  '/v1749379910/Study/Three.js/techotalk.png',
];

const RADIUS = 5;
const PLANE_HEIGHT = 2;
const SPIN_DURATION = 1;
const SPIN_SPEED = 20;
const SPAWN_DURATION = 1;
const MARGIN = 4;

const loadingManager = new THREE.LoadingManager();
let texturesReady = false;

loadingManager.onLoad = () => {
  texturesReady = true;
  initScene();
};

const loader = new THREE.TextureLoader(loadingManager);
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

textures.forEach((tex) => {
  tex.anisotropy =
    loader.manager.handlers[0].capabilities?.getMaxAnisotropy() || 1;
  tex.encoding = THREE.sRGBEncoding;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.generateMipmaps = true;
});

function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#00023a');

  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.z = RADIUS * 3;

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.toneMappingWhitePoint = 1.8;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AxesHelper(2 * RADIUS));
  scene.add(new THREE.AmbientLight('#f2f2ff', 2.0));

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight),
    0.6,
    0.4,
    0.85
  );
  composer.addPass(bloomPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.uniforms['resolution'].value.set(1 / innerWidth, 1 / innerHeight);
  composer.addPass(fxaaPass);

  const screensGroup = new THREE.Group();
  {
    const SCREEN_WIDTH = 5,
      SCREEN_HEIGHT = 3;
    const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT) + 2;
    const unitΘ = Math.PI / rows;
    for (let i = 1; i < rows - 1; i++) {
      const θ0 = i * unitΘ,
        θLen = unitΘ;
      const lat = Math.sin(θ0 + θLen / 2) * RADIUS;
      const cols = Math.ceil((2 * Math.PI * lat) / SCREEN_WIDTH);
      if (cols < 1) continue;
      const φLen = (2 * Math.PI) / cols;
      for (let j = 0; j < cols; j++) {
        const φ0 = j * φLen;
        const tex = textures[(i * cols + j) % textures.length];
        const geo = new THREE.SphereGeometry(RADIUS, 1, 1, φ0, φLen, θ0, θLen);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          side: THREE.DoubleSide,
          emissive: '#111111',
          emissiveIntensity: 1,
          roughness: 0.8,
          metalness: 0.1,
        });
        screensGroup.add(new THREE.Mesh(geo, mat));
      }
    }
  }
  scene.add(screensGroup);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let lastTime = 0;
  let isSpinning = false;
  let spinStartTime = 0;
  let clickPoint = new THREE.Vector3();
  let floatingGroup = null;
  let spawnData = [];

  window.addEventListener('click', (e) => {
    if (!texturesReady) return;

    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(screensGroup.children, true);
    if (!hits.length) return;
    clickPoint.copy(hits[0].point);

    isSpinning = true;
    spinStartTime = performance.now() / 1000;

    if (floatingGroup) {
      scene.remove(floatingGroup);
      floatingGroup.children.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
    }
    floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    spawnData = textures.map((tex, i) => {
      const φ = Math.random() * Math.PI * 2;
      const cosθ = 2 * Math.random() - 1;
      const θ = Math.acos(cosθ);
      const dir = new THREE.Vector3(
        Math.sin(θ) * Math.cos(φ),
        Math.cos(θ),
        Math.sin(θ) * Math.sin(φ)
      );
      const targetPos = dir.multiplyScalar(RADIUS + MARGIN);
      const delay = (i / textures.length) * SPIN_DURATION;
      return {
        tex,
        targetPos,
        spawnTime: spinStartTime + delay,
        mesh: null,
        startTime: null,
      };
    });
  });

  function animate(time) {
    requestAnimationFrame(animate);
    const now = time / 1000;
    const dt = now - lastTime;
    lastTime = now;

    if (isSpinning) {
      const elapsed = now - spinStartTime;
      screensGroup.rotation.y += SPIN_SPEED * dt;
      if (elapsed >= SPIN_DURATION) {
        isSpinning = false;
      }
      spawnData.forEach((data) => {
        if (now >= data.spawnTime && !data.mesh) {
          const img = data.tex.image;
          const aspect = img.width && img.height ? img.width / img.height : 1;
          const geo = new THREE.PlaneGeometry(
            aspect * PLANE_HEIGHT,
            PLANE_HEIGHT
          );
          const mat = new THREE.MeshStandardMaterial({
            map: data.tex,
            side: THREE.DoubleSide,
            roughness: 0.5,
            metalness: 0.1,
          });
          const m = new THREE.Mesh(geo, mat);
          m.position.copy(clickPoint);
          floatingGroup.add(m);
          data.mesh = m;
          data.startTime = now;
        }
      });
    }

    spawnData.forEach((data) => {
      if (data.mesh && data.startTime !== null) {
        const t = (now - data.startTime) / SPAWN_DURATION;
        const p = Math.min(Math.max(t, 0), 1);
        const ease = 1 - Math.pow(1 - p, 2);
        data.mesh.position.lerpVectors(clickPoint, data.targetPos, ease);
        data.mesh.lookAt(camera.position);
        if (p >= 1) data.startTime = null;
      }
    });

    if (!isSpinning && floatingGroup) {
      floatingGroup.rotation.y += 0.001;
      floatingGroup.children.forEach((m) => m.lookAt(camera.position));
    }

    controls.update();
    composer.render();
  }

  requestAnimationFrame(animate);
}
