import { currentToken } from "./token.js";

const searchEndpoint = "https://api.spotify.com/v1/search";

export async function getAlbumsByArtist(artist) {
  const params = {
    q: `artist:${artist}`,
    type: "album",
  };

  const url = new URL(searchEndpoint);
  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  const albumsObj = await response.json();
  const albums = albumsObj.albums.items;

  return albums;
}

export function getAlbumCover(arr) {
  return arr[0].album
    ? arr.map((track) => track.album.images[1].url)
    : arr.map((album) => album.images[1].url);
}
