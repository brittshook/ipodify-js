import { currentToken } from "./modules/auth/token.js";
import { getToken, refreshToken } from "./modules/auth/auth.js";
import { goToMenu } from "./modules/navigate.js";

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
  window.open("./ipodify.html", "_self");
}

setInterval(() => {
  if (currentToken.access_token && currentToken.isExpired()) {
    console.log("is expired");
    refreshToken()
      .then((token) => currentToken.save(token))
      .catch((er) => console.log("Error refreshing token:", er));
  }
}, 60000);
