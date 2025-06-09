function toElement<K extends keyof HTMLElementTagNameMap>(
  template: string,
  tag: K
): HTMLElementTagNameMap[K] {
  const container = document.createElement("div");
  container.innerHTML = template;

  const el = container.firstElementChild;
  if (!el) {
    throw new Error("toElement 유틸 에러: element가 없습니다.");
  }

  return el as HTMLElementTagNameMap[K];
}

interface IArguments {
  id?: string;
  class?: string;
  type?: string;
  name?: string;
  value?: string;
  src?: string;
  alt?: string;
  style?: string;
  for?: string;
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  args: IArguments,
  ...children: string[] | Element[]
): HTMLElementTagNameMap[K] {
  const attribute = Object.entries(args)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  const template = `<${tag} ${attribute}></${tag}>`;
  const element = toElement(template, tag);

  children.forEach((child) => {
    if (typeof child === "string") element.textContent = child;
    else element.appendChild(child);
  });

  return element;
}

export function getElement(target: string) {
  return document.querySelector(target);
}

export function getAllElement(target: string) {
  return document.querySelectorAll(target);
}
