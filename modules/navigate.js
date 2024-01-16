import { displaySliderItems } from "./slider.js";

export async function goToMenu() {
  const menuTemplate = document.querySelector("#ipod-menu");
  const templateContent = menuTemplate.content.cloneNode(true);
  const screenContent = document.querySelector("#screen-content");
  screenContent.innerHTML = "";
  screenContent.appendChild(templateContent);
  displaySliderItems();
}
