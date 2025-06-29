import * as THREE from 'three';
import createMiniSphere from '../MiniSphere';
import { createTorus } from '../Torus';

const createMiniTorus = () => {
  const group = new THREE.Group();

  const miniSphere = createMiniSphere();
  miniSphere.position.set(0, 1.8, 0); // Z축으로 약간 이동
  const miniTours = createTorus(1.8, 0.02, '#ffffff');

  group.add(miniSphere);
  group.add(miniTours);

  return group;
};

export default createMiniTorus;
