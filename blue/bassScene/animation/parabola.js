import * as THREE from "three";

const animations = new Set();

export const startParabolaAnimation = (mesh) => {
	const now = performance.now();
	animations.add({
		mesh,
		startTime: now,
		startPos: mesh.position.clone(),
		velocity: new THREE.Vector3(0, 20, 30),
		duration: 1000,
	});
};

export const parabola = () => {
	if (animations.size === 0) return;

	const now = performance.now();

	for (const anim of animations) {
		const { mesh, startTime, startPos, velocity, duration } = anim;
		const t = now - startTime;

		if (t > duration) {
			mesh.parent?.remove(mesh);
			animations.delete(anim);
			continue;
		}

		const time = t / 1000;

		mesh.position.set(
			startPos.x + velocity.x * time,
			startPos.y + velocity.y * time - 4.9 * time * time,
			startPos.z + velocity.z * time,
		);
	}
};
