let isBouncing = false;

export const startBounceAnimation = () => {
	isBouncing = true;
};

export const bounce = (mesh, amplitude, speed, offset, axis) => {
	if (!isBouncing) return;

	const t = performance.now() * 0.0015 * speed + offset;
	mesh.position[axis] = Math.sin(t) * amplitude;
};
