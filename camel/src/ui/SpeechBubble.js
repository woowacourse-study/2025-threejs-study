import { createElement } from "../utils/document";

const SPEECHES = {
  camel: "안녕하세요! 저는 카멜행성이에요. 히힣! ✨",
  drMartin: "안녕! 나는 닥터마틴이야. 멋지지 않아? 👢",
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
      <div class="character-name">${
        character === "camel" ? "카멜행성이" : "닥터마틴"
      }</div>
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
