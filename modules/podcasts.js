import { currentToken } from "./token.js";

const userPodcastsEndpoint = "https://api.spotify.com/v1/me/shows";

export async function getPodcasts() {
  const response = await fetch(userPodcastsEndpoint, {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

