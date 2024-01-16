import { currentToken } from "./auth/token.js";
import { displayList } from "./list.js";

const userPodcastsEndpoint = "https://api.spotify.com/v1/me/shows";

export async function getPodcasts() {
  try {
    const params = {
      limit: 50,
    };

    const url = new URL(userPodcastsEndpoint);
    url.search = new URLSearchParams(params);

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (er) {
    console.log("Error fetching podcasts:", er);
  }
}

export async function displayPodcasts() {
  const userPodcastsObj = await getPodcasts();
  const userPodcasts = userPodcastsObj.items;

  let podcasts = [];
  let eventHandlers = [];

  for (const podcast of userPodcasts) {
    podcasts.push(podcast.show.name);
    eventHandlers.push(() => console.log(podcast.show));
  }

  displayList(podcasts, eventHandlers);
}
