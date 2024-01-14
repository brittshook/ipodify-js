import { refreshToken, redirectToSpotifyAuthorize } from "./auth/auth.js";
import { currentToken } from "./auth/token.js";
import { redirectUrl } from "./auth/config.js";
import { setIpodColor } from "./iPodColor.js";
import { displayTopSongs, displayTopArtists } from "./topItems.js";
import { displayPlaylists } from "./playlists.js";
import { displayPodcasts } from "./podcasts.js";
import { goHome } from "./navigate.js";

export function renderTemplate(targetId, templateId, data = null) {
  const template = document.getElementById(templateId);
  const clone = template.content.cloneNode(true);

  const elements = clone.querySelectorAll("*");
  elements.forEach((el) => {
    const bindingAttrs = [...el.attributes].filter((a) =>
      a.name.startsWith("data-bind")
    );

    bindingAttrs.forEach((attr) => {
      const target = attr.name
        .replace(/data-bind-/, "")
        .replace(/data-bind/, "");
      const targetType = target.startsWith("onclick") ? "HANDLER" : "PROPERTY";
      const targetProp = target === "" ? "innerHTML" : target;

      const prefix = targetType === "PROPERTY" ? "data." : "";
      const expression = prefix + attr.value.replace(/;\n\r\n/g, "");

      try {
        el[targetProp] =
          targetType === "PROPERTY"
            ? eval(expression)
            : (e) => {
                eval(expression);
              };
        el.removeAttribute(attr.name);
      } catch (er) {
        console.error(`Error binding ${expression} to ${targetProp}`, er);
      }
    });
  });

  const target = document.getElementById(targetId);
  target.innerHTML = "";
  target.appendChild(clone);
}

async function handleAuth() {
  await redirectToSpotifyAuthorize();
}

function logout() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

async function getRefreshToken() {
  const token = await refreshToken();
  currentToken.save(token);
  renderTemplate("oauth", "oauth-template", currentToken);
}
