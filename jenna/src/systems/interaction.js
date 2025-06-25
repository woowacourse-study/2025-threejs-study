import * as THREE from 'three';
import { PARTICLE_LIFE } from '../common/constants.js';
import { resetParticles } from './particles.js';
import { createSpawnItems, cleanupFloatingScreens } from './floatingScreens.js';

export function setupClickHandler(
  camera,
  screensGroup,
  particleSystem,
  scene,
  textures,
  gameState
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleClick = (event) => {
    if (!gameState.texturesReady) return;

    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(screensGroup.children, true);

    if (!hits.length) return;

    gameState.clickPoint.copy(hits[0].point);

    gameState.isSpinning = true;
    gameState.spinStartTime = performance.now() / 1000;

    particleSystem.visible = true;
    resetParticles(particleSystem);

    cleanupFloatingScreens(gameState.floatingGroup, scene);

    gameState.floatingGroup = new THREE.Group();
    scene.add(gameState.floatingGroup);

    gameState.spawnData = createSpawnItems(textures, gameState.spinStartTime);

    setTimeout(() => {
      particleSystem.visible = false;
    }, PARTICLE_LIFE * 1000);
  };

  window.addEventListener('click', handleClick);

  return handleClick;
}
