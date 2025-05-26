let isVibrating = false;
let time = 0;

// 트리거 함수
export const startStringVibration = () => {
	isVibrating = true;
	time = 0;
};

//실제 애니메이션
// 사인파 형태의 진동이 줄 양끝으로  퍼지느 ㄴ것
export const vibration = (stringMeshes, basePositions) => {
	if (!isVibrating) return;

	//이 값을 키우면 → 시간 더 빨리 흐름 → 진동 주기 더 짧아지고 전체 애니메이션 빨라짐
	// 간편하게 애니메이션 속도라 생각
	time += 0.02;

	// 줄이 1초에 몇 번 진동하는가
	const frequency = 6;
	const intensity = 3; // 진동 강도 설정

	const wave = Math.sin(time * 2 * Math.PI * frequency);
	const damping = Math.exp(-time * 2); // 감쇠 함수 시간이 지날 수록 진동이 점점 약해지는 효과 - 감쇠 진동 모델
	const amplitude = wave * damping * intensity; // 진동 진폭
	// 감쇠 진동의 공식... (진동학) sin 함수 맨 앞에 amplitude를 붙이면 진폭이 됨

	for (const mesh of stringMeshes) {
		//현재 줄의 vector 위치 정보
		const attr = mesh.geometry.attributes.position;
		//원래 위치 get
		const baseAttr = basePositions.get(mesh);
		// vertex 개수 = segment의 개수 + 1
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
