import { getAlbumCover } from "./albums.js";
import { getTopTracks } from "./topItems.js";

export function animateSlider() {
  const slideTrack = document.querySelector("#slide-track");
  const slideItems = slideTrack.querySelectorAll("img");

  slideItems.forEach((item) => {
    const cloneItem = item.cloneNode(true);
    slideTrack.appendChild(cloneItem);
    slideTrack.style.animation = "scroll 20s linear infinite";
  });
}

export async function getAlbumItems() {
  const topTracksObj = await getTopTracks();
  const topTracks = topTracksObj.items;

  return getAlbumCover(topTracks)
    .slice(0, 10)
    .map((value) => value);
}

export async function displaySliderItems() {
  const items = await getAlbumItems();
  const slideItemEls = document.querySelectorAll("#slider img");

  slideItemEls.forEach((el, index) => (el.src = items[index]));

  animateSlider();
}
