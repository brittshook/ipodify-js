import { renderTemplate } from "./template.js";
import { displaySliderItems } from "./slider.js";

export function goHome() {
  const menu = document.querySelector("#menu");
  renderTemplate("screen-content", "home-screen");
  displaySliderItems();
}
