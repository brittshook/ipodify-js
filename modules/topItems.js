import { currentToken } from "./token.js";

const topTracksEndpoint = "https://api.spotify.com/v1/me/top/tracks";
const topArtistsEndpoint = "https://api.spotify.com/v1/me/top/artists";

async function getTopTracks() {
  try {
    const response = await fetch(topTracksEndpoint, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const topTracksObj = await getTopTracks();
export const topTracks = topTracksObj.items;

async function getTopArtists() {
  try {
    const response = await fetch(topArtistsEndpoint, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const topArtistsObj = await getTopArtists();
export const topArtists = topArtistsObj.items;
