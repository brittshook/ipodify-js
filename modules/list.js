export async function displayList(itemArr, eventHandlerArr) {
  const listTemplate = document.querySelector("#ipod-list");
  const templateContent = listTemplate.content.cloneNode(true);
  const screenContent = document.querySelector("#screen-content");
  screenContent.innerHTML = "";
  screenContent.appendChild(templateContent);

  if (itemArr.length > 20) {
    for (let i = 20; i < itemArr.length; i++) {
      const screenContent = document.querySelector("#screen-content");
      const option = screenContent.querySelector(".option");
      const clone = option.cloneNode(true);
      screenContent.appendChild(clone);
    }
  }

  const options = document.querySelectorAll(".option .text");
  options.forEach((option, index) => {
    option.innerHTML = itemArr[index];
    option.addEventListener("click", eventHandlerArr[index]);
  });
}
