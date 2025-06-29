import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * 씬, 카메라, 렌더러, 컨트롤, 컴포저 등 초기 3D 설정을 모두 초기화합니다.
 */
export function init() {
  // ✅ 씬
  const scene = new THREE.Scene();

  // ✅ 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // ✅ 렌더러
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ✅ 컨트롤
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  // ✅ 조명
  const ambientLight = new THREE.AmbientLight('#ffffff', 4);
  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(ambientLight, directionalLight);

  // ✅ UnrealBloomPass
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    1.0, // radius
    0.5 // threshold
  );
  composer.addPass(bloomPass);

  return {
    scene,
    camera,
    renderer,
    controls,
    composer,
  };
}
