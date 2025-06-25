import { createElement } from "../utils/document";

const SPEECHES = {
  camel:
    "안녕하세요! 저는 카멜행성이에요! 이 곳을 돌아다니며 제 최애들을 모아주세요✨",
  drMartin: "안녕! 나는 닥터마틴이야. 카멜의 최애 신발이야 🥾",
  hwama: "뿌직...",
  boseUltra: "나는 카멜의 최애 헤드폰...자꾸 머리 안 감고 써...",
  pasta: "카멜의 소울푸드 파스타야! 면은 안 질린다나 🍝",
  deadpool: "나는 카멜의 최애 슈퍼히어로! 언제나 유머러스하지!",
};

const CHARACTER_NAMES = {
  camel: "카멜",
  drMartin: "닥터마틴",
  hwama: "화마",
  boseUltra: "헤드폰",
  pasta: "파스타",
  deadpool: "데드풀",
};

export const createSpeechBubble = () => {
  const screenUIBox = createElement("div", {
    class: "screen-ui",
    id: "screen-ui",
  });

  document.getElementById("app").appendChild(screenUIBox);

  const showSpeech = (character) => {
    const existingBubble = document.querySelector(".speech-bubble-container");
    if (existingBubble) {
      existingBubble.remove();
    }

    const talkBox = createElement("div", {
      class: "speech-bubble-container floating",
    });

    talkBox.innerHTML = `
      <div class="character-name">${CHARACTER_NAMES[character]}</div>
      <div class="speech-bubble">
        <p class="speech-text">
          ${SPEECHES[character]}
        </p>
      </div>
    `;

    const talkContainer = createElement(
      "div",
      {
        class: "talk-container",
      },
      talkBox
    );

    screenUIBox.appendChild(talkContainer);

    setTimeout(() => {
      talkBox.style.opacity = "0";
      setTimeout(() => {
        talkContainer.remove();
      }, 500);
    }, 3000);
  };

  return {
    showSpeech,
  };
};
