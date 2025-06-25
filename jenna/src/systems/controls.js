import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  controls.enablePan = false;
  controls.enableZoom = true;

  return controls;
}
