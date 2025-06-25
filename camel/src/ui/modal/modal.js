import { createElement } from "../../utils/document";
import "./modal.css";

document.addEventListener("DOMContentLoaded", async () => {
  const helpBtn = createElement("button", {
    class: "help-modal-open-btn",
  });
  helpBtn.innerHTML =
    "<img src='/assets/icon/tooltip.svg' alt='도움말' style='width:100%; '>";

  document.body.appendChild(helpBtn);

  const modalTemplate = document.createElement("template");
  modalTemplate.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-backdrop-wrapper" style="display:flex;align-items:center;justify-content:center;height:100vh;">
      </div>
    </div>
  `;
  document.body.appendChild(modalTemplate);
  document.body.appendChild(document.createElement("div")).id =
    "help-modal-root";
  document
    .getElementById("help-modal-root")
    .appendChild(modalTemplate.content.cloneNode(true));

  const htmlText = await (await fetch("/src/ui/modal/modal.html")).text();
  document.querySelector(".modal-backdrop-wrapper").innerHTML = htmlText;

  function openHelpModal() {
    const backdrop = document.querySelector(".modal-backdrop");
    const modal = document.querySelector(".modal-container");
    backdrop.style.display = "block";
    setTimeout(() => {
      backdrop.style.opacity = "1";
      modal.style.transform = "translateY(0)";
      modal.style.opacity = "1";
    }, 10);
    window.addEventListener("keydown", escCloseHandler);
  }

  function closeHelpModal() {
    const backdrop = document.querySelector(".modal-backdrop");
    const modal = document.querySelector(".modal-container");
    backdrop.style.opacity = "0";
    modal.style.transform = "translateY(100px)";
    modal.style.opacity = "0";
    setTimeout(() => {
      backdrop.style.display = "none";
    }, 400);
    window.removeEventListener("keydown", escCloseHandler);
  }

  function escCloseHandler(e) {
    if (e.key === "Escape") {
      closeHelpModal();
    }
  }

  document.body.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("close-button") ||
      (e.target.closest && e.target.closest(".close-button")) ||
      e.target.classList.contains("start-button") ||
      e.target.classList.contains("modal-backdrop-wrapper")
    ) {
      closeHelpModal();
    }
  });

  helpBtn.addEventListener("click", openHelpModal);

  setTimeout(() => {
    openHelpModal();
  }, 500);
});
