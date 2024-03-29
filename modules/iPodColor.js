export const setIpodColor = (e) => {
  const color = e.currentTarget.className;
  const mainBody = document.querySelector("#main-body");
  const topBody = document.querySelector("#top-body");
  const bottomBody = document.querySelector("#bottom-body");
  const controls = document.querySelector("#controls svg");

  const applyColor = (el) => {
    el.classList.forEach((className) => {
      el.classList.remove(className);
    });
    el.classList.add(color);
  };

  if (color === "gray") {
    controls.style.fill = "#111";
  } else {
    controls.style.fill = "#fff";
  }

  [mainBody, topBody, bottomBody].forEach(applyColor);
};
