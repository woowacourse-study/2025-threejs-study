import * as THREE from 'three';

const SCREEN_IMAGE = [
  '/v1740585635/woowacourse/web-wiki/sydney5.jpg',
  '/v1740585635/woowacourse/web-wiki/sydney.jpg',
  '/v1740585631/woowacourse/web-wiki/sydney7.jpg',
  '/v1740589241/woowacourse/web-wiki/sydney10.jpg',
  '/v1748972031/Study/Three.js/study_attendance.jpg',
  '/v1748972275/Study/Three.js/dining.jpg',
  '/v1748972069/Study/Three.js/grow_Graph.jpg',
  '/v1748973468/Study/Three.js/seolleung.jpg',
  '/v1748973453/Study/Three.js/bossam.jpg',
  '/v1748973446/Study/Three.js/fe_hangsungee.jpg',
  '/v1749379638/Study/Three.js/ramen.jpg',
  '/v1749379638/Study/Three.js/pairRoom.jpg',
  '/v1749379639/Study/Three.js/ground.jpg',
  '/v1749379638/Study/Three.js/portrait.jpg',
  '/v1749379639/Study/Three.js/bottle.jpg',
  '/v1749379639/Study/Three.js/takeoff.jpg',
  '/v1749379910/Study/Three.js/techotalk.png',
];

export class TextureManager {
  loadingScreen;

  constructor(loadingScreen) {
    this.loadingScreen = loadingScreen;
    this.textures = [];
    this.loadingManager = new THREE.LoadingManager();
    this.loader = new THREE.TextureLoader(this.loadingManager);
    this.baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';
  }

  loadTextures(onLoadComplete) {
    const totalItems = SCREEN_IMAGE.length;
    let loadedItems = 0;

    SCREEN_IMAGE.forEach((imagePath) => {
      const url = this.baseUrl + imagePath;

      this.loader.load(
        url,
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = true;

          this.textures.push(texture);
          loadedItems++;

          this.loadingScreen.updateCurrentImage(imagePath);
          this.loadingScreen.updateProgress(loadedItems, totalItems);

          if (loadedItems === totalItems) {
            onLoadComplete(this.textures);
          }
        },

        undefined,
        (err) => {
          this.loadingScreen.showError(err.message);
        }
      );
    });
  }

  getTexture(index) {
    return this.textures[index % this.textures.length];
  }

  getAllTextures() {
    return this.textures;
  }

  getTextureCount() {
    return this.textures.length;
  }

  dispose() {
    this.textures.forEach((texture) => {
      texture.dispose();
    });
    this.textures = [];
  }
}
