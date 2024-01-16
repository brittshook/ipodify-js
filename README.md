# iPodify.js
**[View Demo](https://ipodify.netlify.app/)**

A web app to view your Spotify listening history on an iPod Nano interface, nostalgically. Built with the Spotify Web API and Vanilla JavaScript. This project was created as a part of Per Scholas Software Engineering bootcamp to showcase data fetching with APIs, utilzing async/await functions, promises, and the fetch API. 

## Current State 
This project serves as a mini-preview into a React app I would like to build out utilizing the Spotify Web Playback SDK to allow users to listen from the iPod Nano interface. At the current moment, I have written extensive data fetching functions to interactive with the Spotify Web API, but not all have been linked to the UI. For example, I have functions written that allow me to create playlists and add items to the playlist, so users can add their top songs to a playlist or add new songs they find utilizing the 'radio' to their library, but this is not yet integrated into the UI.

Currently, the following functionality exists:
- **Users can use their cursor to navigate the iPod Nano screen. The iPod controls are not set except for the menu button** which brings you back to the iPod menu.
- Users can select 'Songs' and will be presented with their top 20 songs from the past 6 months. Selecting a song will print that song object to the console.
- Users can select 'Artists' and will be presented with their top 20 artists from the past 6 months. Selecting an artist will print that artist object to the console.
- Users can select 'Podcasts' and will be presented with their up to 50 of their saved podcasts. Selecting a podcast will print that show object to the console.
- Users can select 'Playlists' and will be presented all their playlists. Selecting an playlist will print that playlist object to the console.
- Users can select the color they wish their iPod to be at any time, and the iPod will change dynamically.
- Users can select the 'Menu' control to return back to the iPod menu.

## Project Files 
- main.js: This file handles checking authentication on page load, loading the login vs iPodify page based on if an access token is found, as well as checking expiration of access token to initate refresh token process as needed.
- events: This folder contains event listeners, broken down into each respective html page.
- modules: This file contains the rest of my JavaScript files response for data fetching and DOM manipulation.
    - /auth: A subdirectory contains all the files related to OAuth (utilizing PKCE), including config.js which holds key variables needed during authentication, token.js which contains a token object used to cache access/refresh tokens to local storage, and auth.js which includes functions to handle redirecting to Spotify for user authentication, and handling refresh tokens.
    - topItems.js, user.js, playlists.js, podcasts.js, radio.js: All contain various functions to fetch these items from the Spotify Web API and a function to display them onto the UI

## Next Steps 
As aforementioned, I plan to built this project out further as a React app. The functionality I plan to add includes:
- Song playback utilizing the Spotify Web Playback
- Now Playing UI to utilize existing data fetching of songs, albums by artists, and recommended songs (seeded from top artist & top songs, meant to mimic the 'Radio' of iPod Nanos)
- Settings UI and functionality to adjust time period for top songs/artists (short term, medium term, long term)
- Shuffle songs functionality which will showcase Now Playing UI and pull songs from 'radio' (recommended songs), user playlists, top songs, and top artist albums.

## Run Locally 
In order to run locally, you should use port 5500 as this application is still in development mode with the Spotify API. If you wish to use another port, you must update the redirectUrl variable in the auth config file (modules/auth/config.js).