import * as THREE from 'three';

export function createCircleTexture() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 64;
  canvas.height = 64;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function getRandomSpherePoint(radius) {
  const phi = Math.random() * Math.PI * 2;
  const cosTheta = 2 * Math.random() - 1;
  const theta = Math.acos(cosTheta);

  return {
    x: Math.sin(theta) * Math.cos(phi) * radius,
    y: Math.cos(theta) * radius,
    z: Math.sin(theta) * Math.sin(phi) * radius,
    normal: {
      x: Math.sin(theta) * Math.cos(phi),
      y: Math.cos(theta),
      z: Math.sin(theta) * Math.sin(phi),
    },
  };
}

export function easeOutQuad(t) {
  return 1 - Math.pow(1 - t, 2);
}
