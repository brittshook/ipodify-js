import { renderTemplate } from "./modules/template.js";
import { currentToken } from "./modules/token.js";
import { getUserData } from "./modules/user.js";
import { getToken } from "./modules/auth.js";
import { getAlbumItems, updateSlider } from "./modules/components/slider.js";

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

if (currentToken.access_token) {
  const userData = await getUserData();
  const albumItems = await getAlbumItems();
  renderTemplate("main", "ipodify-home", userData);
  renderTemplate("screen-content", "home-screen", albumItems);
  updateSlider();
  renderTemplate("oauth", "oauth-template", currentToken);
}

if (!currentToken.access_token) {
  renderTemplate("main", "login");
}
