import { createElement } from "../../utils/document";
import "./objectCount.css";

export function createObjectCountUI() {
  const container = createElement("div", {
    class: "object-count-ui",
  });

  const label = createElement(
    "div",
    {
      class: "object-count-label",
    },
    "찾은 오브젝트"
  );

  const count = createElement(
    "div",
    {
      class: "object-count-number",
    },
    "0/6"
  );

  container.appendChild(label);
  container.appendChild(count);

  document.body.appendChild(container);

  return {
    setCount: (current, total) => {
      count.textContent = `${current}/${total}`;
    },
  };
}
