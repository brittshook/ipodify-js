import { currentToken } from "./token.js";
import { userData } from "./user.js";

const userId = userData.id;
console.log(userId);
const userPlaylistsEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists/`;

export async function getPlaylists() {
  const response = await fetch(userPlaylistsEndpoint, {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
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
  const playlistId = playlist.id;
  const itemURIs = trackArr
    .slice(0, 100)
    .map(
      (item) =>
        `spotify:${item.type == "track" ? "track" : "episode"}:${item.id}`
    );
  const addPlaylistItemsEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  console.log(JSON.stringify({ uris: itemURIs }));

  const response = await fetch(addPlaylistItemsEndpoint, {
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
