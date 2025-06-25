export class LoadingScreen {
  constructor() {
    this.loadingElement = null;
    this.progressBar = null;
    this.loadingText = null;
    this.createLoadingScreen();
  }

  createLoadingScreen() {
    this.loadingElement = document.createElement('div');
    this.loadingElement.id = 'loading-screen';
    this.loadingElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right top, #051937, #02224f, #042a67, #123280, #253999);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
      color: white;
    `;

    this.loadingText = document.createElement('div');
    this.loadingText.textContent = '로딩 중...';
    this.loadingText.style.cssText = `
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    `;

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      width: 300px;
      height: 6px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 10px;
    `;

    this.progressBar = document.createElement('div');
    this.progressBar.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #4fc3f7, #29b6f6);
      border-radius: 3px;
      transition: width 0.3s ease;
    `;

    this.progressText = document.createElement('div');
    this.progressText.textContent = '0%';
    this.progressText.style.cssText = `
      font-size: 14px;
      opacity: 0.8;
    `;

    progressContainer.appendChild(this.progressBar);
    this.loadingElement.appendChild(this.loadingText);
    this.loadingElement.appendChild(progressContainer);
    this.loadingElement.appendChild(this.progressText);

    document.body.appendChild(this.loadingElement);
  }

  updateProgress(loadedItems, totalItems) {
    const percentage = Math.round((loadedItems / totalItems) * 100);

    this.progressBar.style.width = `${percentage}%`;
    this.progressText.textContent = `${percentage}% (${loadedItems}/${totalItems})`;

    if (loadedItems === totalItems) {
      this.loadingText.textContent = '로딩 완료! 시작 중...';
    }
  }

  updateCurrentImage(url) {
    const imageName = url.split('/').pop() || 'Unknown';
    this.loadingText.textContent = '로딩 중...';
  }

  hide() {
    if (this.loadingElement) {
      this.loadingElement.style.opacity = '0';
      this.loadingElement.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        if (this.loadingElement && this.loadingElement.parentNode) {
          this.loadingElement.parentNode.removeChild(this.loadingElement);
        }
      }, 500);
    }
  }

  showError(message) {
    this.loadingText.textContent = `오류 발생: ${message}`;
    this.loadingText.style.color = '#ff5252';
    this.progressBar.style.background = '#ff5252';
  }
}
