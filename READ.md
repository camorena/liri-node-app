# LIRI Bot

## Overview

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Highlights

To retrieve the data that will power the app, we use the `axios` package to search for concerts, Spotify package for songs and OMDB API for movies.

- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

- [Axios](https://www.npmjs.com/package/axios)

  - We use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

## Usage

from terminal type:

node liri.js <enter>

## Actions

#A menu will be displayed as shown.

? Choose an option (Use arrow keys)
❯ Search Concert
Search Song
Search Movie
Do what It says

#After the option have been select;

? Choose an option Search Song
? What would you like to search...

# Enter the name of concert, song or movie to search.

? Choose an option Search Song
? What would you like to search... ddd
? Are you sure (Y/N) ? (Y/n)

# Enter the confirmation.
