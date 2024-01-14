import { getTopArtists, getTopTracks } from "../topItems.js";
import { currentToken } from "./auth/token.js";

const recommendationsEndpoint = "https://api.spotify.com/v1/recommendations";

const topTracksObj = await getTopTracks();
const topTracks = topTracksObj.items;
const topArtistsObj = await getTopArtists();
const topArtists = topArtistsObj.items;

const seedTracks = topTracks
  .slice(0, 3)
  .map((item) => item.id)
  .join(",");
const seedArtists = topArtists
  .slice(0, 2)
  .map((item) => item.id)
  .join(",");

export async function getRadioTracks() {
  const params = {
    limit: 50,
    seed_tracks: seedTracks,
    seed_artists: seedArtists,
    max_instrumentalness: 0.35,
  };

  const url = new URL(recommendationsEndpoint);
  url.search = new URLSearchParams(params);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });
  } catch (er) {
    console.log("Error fetching recommended items:", er);
  }

  return await response.json();
}

export function startRadio() {}
