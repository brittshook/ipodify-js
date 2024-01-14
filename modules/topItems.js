import { currentToken } from "./auth/token.js";
import { displayList } from "./list.js";

const topTracksEndpoint = "https://api.spotify.com/v1/me/top/tracks";
const topArtistsEndpoint = "https://api.spotify.com/v1/me/top/artists";

export async function getTopTracks() {
  try {
    const response = await fetch(topTracksEndpoint, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (er) {
    console.log("Error fetching top tracks:", er);
  }
}

export async function getTopArtists() {
  try {
    const response = await fetch(topArtistsEndpoint, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (er) {
    console.log("Error fetching top artists:", er);
  }
}

export async function displayTopSongs() {
  const topTracksObj = await getTopTracks();
  const topTracks = topTracksObj.items;

  let tracks = [];
  let eventHandlers = [];

  for (const track of topTracks) {
    tracks.push(track.name);
    eventHandlers.push(() => console.log(track));
  }

  displayList(tracks, eventHandlers);
}

export async function displayTopArtists() {
  const topArtistsObj = await getTopArtists();
  const topArtists = topArtistsObj.items;

  let artists = [];
  let eventHandlers = [];

  for (const artist of topArtists) {
    artists.push(artist.name);
    eventHandlers.push(() => console.log(artist));
  }
  displayList(artists, eventHandlers);
}
