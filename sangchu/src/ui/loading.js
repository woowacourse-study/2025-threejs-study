export class LoadingUI {
  constructor() {
    this.createLoadingElement();
  }

  createLoadingElement() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
    `;

    this.icon = document.createElement("div");
    this.icon.innerHTML = "🥬";
    this.icon.style.cssText = `
      font-size: 4rem;
      animation: bounce 1s infinite alternate;
      margin-bottom: 1rem;
    `;

    this.text = document.createElement("div");
    this.text.textContent = "상추신이 깨어나는 중...";
    this.text.style.cssText = `
      font-size: 1.5rem;
      color: #2F4F2F;
      margin-bottom: 1rem;
      font-weight: bold;
    `;

    this.progressContainer = document.createElement("div");
    this.progressContainer.style.cssText = `
      width: 300px;
      height: 20px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid #2F4F2F;
    `;

    this.progressBar = document.createElement("div");
    this.progressBar.style.cssText = `
      height: 100%;
      background: linear-gradient(90deg, #90EE90, #32CD32);
      width: 0%;
      transition: width 0.3s ease;
      border-radius: 8px;
    `;

    this.percentText = document.createElement("div");
    this.percentText.textContent = "0%";
    this.percentText.style.cssText = `
      margin-top: 0.5rem;
      color: #2F4F2F;
      font-weight: bold;
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes bounce {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-10px) rotate(5deg); }
      }
    `;
    document.head.appendChild(style);

    this.progressContainer.appendChild(this.progressBar);
    this.overlay.appendChild(this.icon);
    this.overlay.appendChild(this.text);
    this.overlay.appendChild(this.progressContainer);
    this.overlay.appendChild(this.percentText);

    document.body.appendChild(this.overlay);
  }

  updateProgress(percent) {
    const roundedPercent = Math.round(percent);
    this.progressBar.style.width = `${roundedPercent}%`;
    this.percentText.textContent = `${roundedPercent}%`;

    if (roundedPercent < 50) {
      this.text.textContent = "상추신이 깨어나는 중... 😴";
    } else if (roundedPercent < 100) {
      this.text.textContent = "상추신이 거의 준비됐어요... 🌟";
    } else {
      this.text.textContent = "상추신 등장! 🎉";
    }
  }

  hide() {
    this.overlay.style.opacity = "0";
    this.overlay.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
    }, 500);
  }
}
