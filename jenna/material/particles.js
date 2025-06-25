import * as THREE from 'three';
import {
  PARTICLE_COUNT,
  PARTICLE_SPEED,
  PARTICLE_LIFE,
  RADIUS,
} from './constants.js';
import { getRandomSpherePoint } from './utils.js';

export function createParticleSystem(circleTexture) {
  const particleGeometry = new THREE.BufferGeometry();

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const lifeTimes = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const initialPositions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const spherePoint = getRandomSpherePoint(RADIUS);

    positions[i3] = spherePoint.x;
    positions[i3 + 1] = spherePoint.y;
    positions[i3 + 2] = spherePoint.z;

    initialPositions[i3] = spherePoint.x;
    initialPositions[i3 + 1] = spherePoint.y;
    initialPositions[i3 + 2] = spherePoint.z;

    velocities[i3] = spherePoint.normal.x * PARTICLE_SPEED;
    velocities[i3 + 1] = spherePoint.normal.y * PARTICLE_SPEED;
    velocities[i3 + 2] = spherePoint.normal.z * PARTICLE_SPEED;

    lifeTimes[i] = Math.random() * PARTICLE_LIFE;

    colors[i3] = 1.0;
    colors[i3 + 1] = 1.0;
    colors[i3 + 2] = 1.0;

    sizes[i] = Math.random() * 0.15 + 0.1;
  }

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute(
    'velocity',
    new THREE.BufferAttribute(velocities, 3)
  );
  particleGeometry.setAttribute(
    'lifeTime',
    new THREE.BufferAttribute(lifeTimes, 1)
  );
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particleGeometry.setAttribute(
    'initialPosition',
    new THREE.BufferAttribute(initialPositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    alphaTest: 0.5,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    map: circleTexture,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  particleSystem.visible = false;

  return particleSystem;
}

export function updateParticles(particleSystem, dt) {
  if (!particleSystem.visible) return;

  const positions = particleSystem.geometry.attributes.position.array;
  const velocities = particleSystem.geometry.attributes.velocity.array;
  const lifeTimes = particleSystem.geometry.attributes.lifeTime.array;
  const colors = particleSystem.geometry.attributes.color.array;
  const initialPositions =
    particleSystem.geometry.attributes.initialPosition.array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    lifeTimes[i] += dt;

    if (lifeTimes[i] < PARTICLE_LIFE) {
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;

      velocities[i3 + 1] -= 0.5 * dt;

      const alpha = Math.max(0.3, 1 - lifeTimes[i] / PARTICLE_LIFE);
      colors[i3] = alpha;
      colors[i3 + 1] = alpha;
      colors[i3 + 2] = alpha;
    } else {
      const spherePoint = getRandomSpherePoint(RADIUS);

      positions[i3] = spherePoint.x;
      positions[i3 + 1] = spherePoint.y;
      positions[i3 + 2] = spherePoint.z;

      initialPositions[i3] = spherePoint.x;
      initialPositions[i3 + 1] = spherePoint.y;
      initialPositions[i3 + 2] = spherePoint.z;

      lifeTimes[i] = 0;

      velocities[i3] = spherePoint.normal.x * PARTICLE_SPEED;
      velocities[i3 + 1] = spherePoint.normal.y * PARTICLE_SPEED;
      velocities[i3 + 2] = spherePoint.normal.z * PARTICLE_SPEED;
    }
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;
  particleSystem.geometry.attributes.color.needsUpdate = true;
}

export function resetParticles(particleSystem) {
  const positions = particleSystem.geometry.attributes.position.array;
  const initialPositions =
    particleSystem.geometry.attributes.initialPosition.array;
  const lifeTimes = particleSystem.geometry.attributes.lifeTime.array;
  const velocities = particleSystem.geometry.attributes.velocity.array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const spherePoint = getRandomSpherePoint(RADIUS);

    positions[i3] = spherePoint.x;
    positions[i3 + 1] = spherePoint.y;
    positions[i3 + 2] = spherePoint.z;

    initialPositions[i3] = spherePoint.x;
    initialPositions[i3 + 1] = spherePoint.y;
    initialPositions[i3 + 2] = spherePoint.z;

    velocities[i3] = spherePoint.normal.x * PARTICLE_SPEED;
    velocities[i3 + 1] = spherePoint.normal.y * PARTICLE_SPEED;
    velocities[i3 + 2] = spherePoint.normal.z * PARTICLE_SPEED;

    lifeTimes[i] = 0;
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;
  particleSystem.geometry.attributes.initialPosition.needsUpdate = true;
  particleSystem.geometry.attributes.velocity.needsUpdate = true;
  particleSystem.geometry.attributes.lifeTime.needsUpdate = true;
}
