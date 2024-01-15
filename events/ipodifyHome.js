import { redirectUrl } from "../modules/auth/config.js";
import { setIpodColor } from "../modules/iPodColor.js";
import { goToMenu } from "../modules/navigate.js";
import { displayPlaylists } from "../modules/playlists.js";
import { displayPodcasts } from "../modules/podcasts.js";
import { displaySliderItems } from "../modules/slider.js";
import { displayTopArtists, displayTopSongs } from "../modules/topItems.js";

const colorBtns = document.querySelectorAll("#color-settings button");
colorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    setIpodColor(e);
  });
});

const menuBtn = document.querySelector("#menu");
menuBtn.addEventListener("click", goToMenu);

const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = redirectUrl;
});

const screenContent = document.querySelector("#screen-content");
screenContent.addEventListener("click", function(event) {
  const targetId = event.target.id;
  
  switch (targetId) {
    case "songs":
      displayTopSongs();
      break;
    case "artists":
      displayTopArtists();
      break;
    case "podcasts":
      displayPodcasts();
      break;
    case "playlists":
      displayPlaylists();
      break;
  }
});

displaySliderItems();
