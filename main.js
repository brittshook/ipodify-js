import { renderTemplate } from "./modules/template.js";
import { currentToken } from "./modules/auth/token.js";
import { getUserData } from "./modules/user.js";
import { getToken, refreshToken } from "./modules/auth/auth.js";
import { displaySliderItems } from "./modules/slider.js";

const args = new URLSearchParams(window.location.search);
const code = args.get("code");

if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

if (currentToken.access_token && currentToken.isExpired()) {
  const token = await refreshToken();
  currentToken.save(token);
}

if (currentToken.access_token) {
  const userData = await getUserData();

  renderTemplate("main", "ipodify-home", userData);
  renderTemplate("screen-content", "home-screen");
  displaySliderItems();
} else if (!currentToken.access_token) {
  renderTemplate("main", "login");
}

setInterval(() => {
  if (currentToken.access_token && currentToken.isExpired()) {
    console.log("is expired");
    refreshToken()
      .then((token) => currentToken.save(token))
      .catch((er) => console.log("Error refreshing token:", er));
  }
}, 60000);
