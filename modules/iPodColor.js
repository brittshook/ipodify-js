export const setIpodColor = (e) => {
  const color = e.currentTarget.classList;
  const mainBody = document.querySelector("#main-body");
  const topBody = document.querySelector("#top-body");

  const applyColor = (el) => {
    el.classList.forEach((className) => {
      el.classList.remove(className);
    });
    el.classList.add(color);
  };

  [mainBody, topBody].forEach(applyColor);
};
