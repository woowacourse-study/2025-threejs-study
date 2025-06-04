import * as THREE from "three";

export const parabola = (noteMesh, startTime = performance.now()) => {
  const duration = 1000;
  const startPos = noteMesh.position.clone();
  const velocity = new THREE.Vector3(0, 20, 30);

  const animate = (now) => {
    const t = now - startTime;
    if (t > duration) {
      noteMesh.parent?.remove(noteMesh);
      return;
    }

    const time = t / 1000;
    noteMesh.position.set(
      startPos.x + velocity.x * time,
      startPos.y + velocity.y * time - 4.9 * time * time,
      startPos.z + velocity.z * time
    );
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};
