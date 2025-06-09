import { createElement } from "../utils/document";

export const createSpeechBubble = () => {
    const talkBox = createElement("div", {
        class: "speech-bubble-container floating",
    });

    talkBox.innerHTML = `
      <div class="character-name">카멜행성이</div>
      <div class="speech-bubble">
        <p class="speech-text">
          말풍선을 띄워보자, <span class="highlight">히힣!</span>
          <span class="sparkle">✨</span>
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

    const screenUIBox = createElement(
        "div",
        {
            class: "screen-ui",
            id: "screen-ui",
        },
        talkContainer
    );

    document.getElementById("app").appendChild(screenUIBox);
}; 