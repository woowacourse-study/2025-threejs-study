import * as THREE from 'three';
import { RADIUS, SPIN_SPEED, SPIN_DURATION } from './common/constants.js';
import { createCircleTexture } from './common/utils.js';
import {
  createRenderer,
  createComposer,
  setupLights,
} from './core/renderer.js';
import { createScreensSphere } from './core/screens.js';
import { createParticleSystem, updateParticles } from './systems/particles.js';
import { GameState } from './systems/gameState.js';
import { setupClickHandler } from './systems/interaction.js';
import {
  processSpawnItems,
  updateFloatingScreens,
} from './systems/floatingScreens.js';
import { TextureManager } from './core/textureLoader.js';
import { LoadingScreen } from './loading/loadingScreen.js';
import { createControls } from './systems/controls.js';

let scene, camera, renderer, composer, controls;
let sceneContainer;
let screensGroup, particleSystem;
let gameState;
let textures = [];

function loadTextures(loadingScreen) {
  const textureManager = new TextureManager(loadingScreen);
  gameState = new GameState();

  textureManager.loadTextures((loadedTextures) => {
    textures = loadedTextures;
    gameState.setTexturesReady();

    loadingScreen.hide();

    sceneContainer.style.display = 'block';
    initScene();
  });
}

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#001155');

  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  camera.position.z = RADIUS * 3;

  renderer = createRenderer();
  sceneContainer.appendChild(renderer.domElement);

  composer = createComposer(renderer, scene, camera);
  controls = createControls(camera, renderer.domElement);

  setupLights(scene);

  scene.add(new THREE.AxesHelper(2 * RADIUS));

  screensGroup = createScreensSphere(textures);
  scene.add(screensGroup);

  const circleTexture = createCircleTexture();
  particleSystem = createParticleSystem(circleTexture);
  scene.add(particleSystem);

  setupClickHandler(
    camera,
    screensGroup,
    particleSystem,
    scene,
    textures,
    gameState
  );

  animate();
}

function animate(time = 0) {
  requestAnimationFrame(animate);

  const now = time / 1000;
  const dt = gameState.updateTime(now);

  if (gameState.isSpinning) {
    screensGroup.rotation.y += SPIN_SPEED * dt;
    updateParticles(particleSystem, dt);
    gameState.updateSpinState(now, SPIN_DURATION);

    processSpawnItems(
      gameState.spawnData,
      now,
      gameState.clickPoint,
      gameState.floatingGroup
    );
  }

  updateFloatingScreens(gameState.spawnData, now, gameState.clickPoint, camera);

  if (!gameState.isSpinning && gameState.floatingGroup) {
    gameState.floatingGroup.rotation.y += 0.002;
    gameState.floatingGroup.children.forEach((mesh) =>
      mesh.lookAt(camera.position)
    );
  }

  screensGroup.rotation.y += 0.002;

  controls.update();
  composer.render();
}

function init() {
  const loadingScreen = new LoadingScreen();

  sceneContainer = document.createElement('div');
  sceneContainer.id = 'scene-container';
  sceneContainer.style.cssText = `
    width:100%; height:100%;
    position:fixed; top:0; left:0;
    display:none; /* 로딩 끝나기 전까지 숨김 */
  `;
  document.body.appendChild(sceneContainer);

  loadTextures(loadingScreen);
}

function handleResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
}

window.addEventListener('resize', handleResize);

init();
