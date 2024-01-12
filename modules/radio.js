import { topArtists, topTracks } from "./topItems.js";
import { currentToken } from "./token.js";

const recommendationsEndpoint = "https://api.spotify.com/v1/recommendations";
const seedTracks = topTracks
  .slice(0, 3)
  .map((item) => item.id)
  .join(",");
const seedArtists = topArtists
  .slice(0, 2)
  .map((item) => item.id)
  .join(",");

async function getRadioTracks() {
  const params = {
    limit: 50,
    seed_tracks: seedTracks,
    seed_artists: seedArtists,
    max_instrumentalness: 0.35,
  };

  const url = new URL(recommendationsEndpoint);
  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

const radioTracksObj = await getRadioTracks();
export const radioTracks = radioTracksObj.tracks;
