export function setupCustomCursor() {
  const style = document.createElement("style");
  style.textContent = `
    *, *::before, *::after {
      cursor: none !important;
    }
    
    html, body {
      cursor: none !important;
    }
    
    canvas {
      cursor: none !important;
    }
    
    button, a, input, textarea, select {
      cursor: none !important;
    }
    
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      background-image: url('./assets/images/cursor.png');
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-25px, -25px);
    }
    
    .custom-cursor.with-effects {
      transition: transform 0.1s ease, filter 0.1s ease;
    }
    
    .custom-cursor.clicking {
      transform: translate(-25px, -25px) scale(0.8) rotate(15deg);
      filter: brightness(1.5) saturate(1.3);
    }
    
    .custom-cursor.click-burst {
      animation: clickBurst 0.3s ease-out;
    }
    
    @keyframes clickBurst {
      0% {
        transform: translate(-25px, -25px) scale(1);
      }
      50% {
        transform: translate(-25px, -25px) scale(1.3) rotate(5deg);
        filter: brightness(1.8) hue-rotate(90deg);
      }
      100% {
        transform: translate(-25px, -25px) scale(1);
        filter: brightness(1) hue-rotate(0deg);
      }
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.body.style.cursor = "none";
  document.documentElement.style.cursor = "none";

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("with-effects", "clicking");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicking");
    cursor.classList.add("click-burst");
    setTimeout(() => {
      cursor.classList.remove("click-burst", "with-effects");
    }, 300);
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("clicking", "with-effects");
  });
}
