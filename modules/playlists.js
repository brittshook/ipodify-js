import { currentToken } from "./auth/token.js";
import { getUserData } from "./user.js";
import { displayList } from "./list.js";

const userData = await getUserData();
const userId = () => (userData.id != "undefined" ? userData.id : undefined);
console.log(userId());
const userPlaylistsEndpoint = `https://api.spotify.com/v1/users/${userId()}/playlists/`;
const playlistItemsEndpoint = (playlist) =>
  `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;

export async function getPlaylists() {
  const params = {
    limit: 50,
  };

  const url = new URL(userPlaylistsEndpoint);
  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

export async function getPlaylistItems(playlist, offset = 0) {
  const items = [];
  const limit = 50;

  const params = {
    limit: limit,
    offset: offset,
  };

  const url = new URL(playlistItemsEndpoint(playlist));
  url.search = new URLSearchParams(params);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    const data = await response.json();
    const newItems = data.items;

    if (newItems.length > 0) {
      items.push(...newItems);
      offset += limit;
      await getPlaylistItems(playlist, offset);
    }
  } catch (er) {
    console.log("Error fetching playlist items:", er);
  }
}

export async function createPlaylist(playlistName, playlistDescription) {
  const response = await fetch(userPlaylistsEndpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + currentToken.access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playlistName,
      description: playlistDescription,
      public: false,
    }),
  });

  return await response.json();
}

export async function addPlaylistItems(playlist, trackArr) {
  const itemURIs = trackArr
    .slice(0, 100)
    .map(
      (item) =>
        `spotify:${item.type == "track" ? "track" : "episode"}:${item.id}`
    );

  console.log(JSON.stringify({ uris: itemURIs }));

  const response = await fetch(playlistItemsEndpoint(playlist), {
    method: "POST",
    headers: {
      Authorization: "Bearer " + currentToken.access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: itemURIs,
    }),
  });

  return await response.json();
}

export async function displayPlaylists() {
  const userPlaylistsObj = await getPlaylists();
  const userPlaylists = userPlaylistsObj.items;

  let playlists = [];
  let eventHandlers = [];

  for (const playlist of userPlaylists) {
    playlists.push(playlist.name);
    eventHandlers.push(() => console.log(playlist));
  }

  displayList(playlists, eventHandlers);
}
