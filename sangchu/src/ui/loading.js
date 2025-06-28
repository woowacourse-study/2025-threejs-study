let overlay = null;
let icon = null;
let text = null;
let progressBar = null;
let percentText = null;
let progressContainer = null;

function addStyles() {
  if (document.getElementById("loading-styles")) return;

  const style = document.createElement("style");
  style.id = "loading-styles";
  style.textContent = `
    @keyframes bounce {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-10px) rotate(5deg); }
    }
  `;
  document.head.appendChild(style);
}

function createLoadingElements() {
  overlay = document.createElement("div");
  overlay.style.cssText = `
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

  icon = document.createElement("div");
  icon.innerHTML = "🥬";
  icon.style.cssText = `
    font-size: 4rem;
    animation: bounce 1s infinite alternate;
    margin-bottom: 1rem;
  `;

  text = document.createElement("div");
  text.textContent = "상추신이 깨어나는 중...";
  text.style.cssText = `
    font-size: 1.5rem;
    color: #2F4F2F;
    margin-bottom: 1rem;
    font-weight: bold;
  `;

  progressContainer = document.createElement("div");
  progressContainer.style.cssText = `
    width: 300px;
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #2F4F2F;
  `;

  progressBar = document.createElement("div");
  progressBar.style.cssText = `
    height: 100%;
    background: linear-gradient(90deg, #90EE90, #32CD32);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 8px;
  `;

  percentText = document.createElement("div");
  percentText.textContent = "0%";
  percentText.style.cssText = `
    margin-top: 0.5rem;
    color: #2F4F2F;
    font-weight: bold;
  `;

  progressContainer.appendChild(progressBar);
  overlay.appendChild(icon);
  overlay.appendChild(text);
  overlay.appendChild(progressContainer);
  overlay.appendChild(percentText);
}

export function showLoading() {
  if (overlay) return;

  addStyles();
  createLoadingElements();
  document.body.appendChild(overlay);
}

export function updateProgress(percent) {
  if (!progressBar || !percentText || !text) return;

  const roundedPercent = Math.round(percent);
  progressBar.style.width = `${roundedPercent}%`;
  percentText.textContent = `${roundedPercent}%`;

  if (roundedPercent < 50) {
    text.textContent = "상추신이 깨어나는 중... 😴";
  } else if (roundedPercent < 100) {
    text.textContent = "상추신이 거의 준비됐어요... 🌟";
  } else {
    text.textContent = "상추신 등장! 🎉";
  }
}

export function hideLoading() {
  if (!overlay) return;

  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }
    overlay = null;
    icon = null;
    text = null;
    progressBar = null;
    percentText = null;
    progressContainer = null;
  }, 500);
}
