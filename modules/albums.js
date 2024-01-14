import { currentToken } from "./auth/token.js";

const searchEndpoint = "https://api.spotify.com/v1/search";

export async function getAlbumsByArtist(artist) {
  try {
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
  } catch (er) {
    console.log("Error fetching albums by artist:", er);
  }

  const albumsObj = await response.json();
  const albums = albumsObj.albums.items;

  return albums;
}

export function getAlbumCover(arr) {
  return arr[0].album
    ? arr.map((track) => track.album.images[1].url)
    : arr.map((album) => album.images[1].url);
}
