import * as THREE from 'three';

export class GameState {
  constructor() {
    this.texturesReady = false;
    this.lastTime = 0;
    this.isSpinning = false;
    this.spinStartTime = 0;
    this.clickPoint = new THREE.Vector3();
    this.floatingGroup = null;
    this.spawnData = [];
  }

  setTexturesReady() {
    this.texturesReady = true;
  }

  updateSpinState(currentTime, spinDuration) {
    if (this.isSpinning) {
      const elapsed = currentTime - this.spinStartTime;
      if (elapsed >= spinDuration) {
        this.isSpinning = false;
      }
    }
  }

  updateTime(newTime) {
    const dt = newTime - this.lastTime;
    this.lastTime = newTime;
    return dt;
  }

  reset() {
    this.isSpinning = false;
    this.spinStartTime = 0;
    this.clickPoint.set(0, 0, 0);
    this.spawnData = [];
  }
}
