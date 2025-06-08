let isVibrating = false;
let time = 0;

export const startStringVibration = () => {
	isVibrating = true;
	time = 0;
};

export const vibration = (stringMeshes, basePositions) => {
	if (!isVibrating) return;

	time += 0.02;

	const frequency = 6;
	const intensity = 3;

	const wave = Math.sin(time * 2 * Math.PI * frequency);
	const damping = Math.exp(-time * 2);
	const amplitude = wave * damping * intensity;

	for (const mesh of stringMeshes) {
		const attr = mesh.geometry.attributes.position;
		const baseAttr = basePositions.get(mesh);
		const count = attr.count;

		for (let i = 0; i < count; i++) {
			const ratio = i / (count - 1);
			const baseY = baseAttr.getY(i);
			const baseZ = baseAttr.getZ(i);

			if (ratio < 0.22 || ratio > 0.88) {
				attr.setY(i, baseY);
				attr.setZ(i, baseZ);
				continue;
			}

			const strength = Math.sin(((ratio - 0.22) / 0.66) * Math.PI);
			const offset = amplitude * strength;

			attr.setY(i, baseY + offset);
			attr.setZ(i, baseZ + offset * 0.3);
		}

		attr.needsUpdate = true;
	}

	if (damping < 0.01) {
		isVibrating = false;
	}
};
