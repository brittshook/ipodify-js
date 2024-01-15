import { redirectToSpotifyAuthorize } from "../modules/auth/auth.js";

const loginBtn = document.querySelector("#login");
console.log(loginBtn);
loginBtn.addEventListener("click", redirectToSpotifyAuthorize);
