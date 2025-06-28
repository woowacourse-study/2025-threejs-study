import { camera } from "../core/scene.js";

let activeBubble = null;

function addSpeechBubbleStyles() {
  if (document.getElementById("speech-bubble-styles")) return;

  const style = document.createElement("style");
  style.id = "speech-bubble-styles";
  style.textContent = `
    .speech-bubble {
      position: fixed;
      background: #ffffff;
      border: 3px solid #2F4F2F;
      border-radius: 20px;
      padding: 12px 16px;
      font-family: 'Arial', sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: #2F4F2F;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
      animation: bubbleAppear 0.3s ease-out;
      transform-origin: bottom center;
    }
    
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 12px solid #ffffff;
    }
    
    .speech-bubble::before {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid #2F4F2F;
    }
    
    @keyframes bubbleAppear {
      0% {
        opacity: 0;
        transform: scale(0.5) translateY(10px);
      }
      70% {
        transform: scale(1.1) translateY(-5px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    @keyframes bubbleDisappear {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.8) translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);
}

function worldToScreen(worldPosition) {
  const vector = worldPosition.clone();
  vector.project(camera);

  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

  return { x, y };
}

const randomMessages = [
  "으아아...",
  "어지러워! 😵",
  "정신이 혼미해..",
  "빙글빙글~ 🌪️",
  "상추신 돌아간다아아아아아아앙아ㅏ🥬🥬🥬",
  "점뭐먹 점뭐먹 🍴",
  "그만 괴롭혀!! 분무기 뿌린다!! 💦 ",
  "현기증이... 💫",
];

function getRandomMessage() {
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
}

export function showSpeechBubble(modelPosition, text = null) {
  if (activeBubble) {
    hideSpeechBubble();
  }

  const bubbleText = text || getRandomMessage();

  addSpeechBubbleStyles();

  const bubbleWorldPosition = modelPosition.clone();
  bubbleWorldPosition.y += 1;

  const screenPosition = worldToScreen(bubbleWorldPosition);

  activeBubble = document.createElement("div");
  activeBubble.className = "speech-bubble";
  activeBubble.textContent = bubbleText;

  activeBubble.style.left = `${screenPosition.x}px`;
  activeBubble.style.top = `${screenPosition.y - 60}px`;
  activeBubble.style.transform = "translateX(-50%)";

  document.body.appendChild(activeBubble);

  setTimeout(() => {
    hideSpeechBubble();
  }, 2000);
}

export function hideSpeechBubble() {
  if (!activeBubble) return;

  activeBubble.style.animation = "bubbleDisappear 0.3s ease-in forwards";

  setTimeout(() => {
    if (activeBubble) {
      activeBubble.parentNode.removeChild(activeBubble);
    }
    activeBubble = null;
  }, 400);
}
