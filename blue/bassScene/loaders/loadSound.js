import { AudioLoader, PositionalAudio } from "three";

const audioLoader = new AudioLoader();

export const loadSound = (url, listener) => {
	return new Promise((resolve) => {
		const sound = new PositionalAudio(listener);
		audioLoader.load(url, (buffer) => {
			sound.setBuffer(buffer);
			sound.setRefDistance(10);
			sound.setVolume(1);
			resolve(sound);
		});
	});
};
