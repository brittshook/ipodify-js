import { currentToken } from "./auth/token.js";

export async function getUserData() {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (er) {
    console.log("Error fetching user data:", er);
  }
}
