require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
//const notes = require("./log.js");

// Created a series of questions
inquirer
  .prompt([{
      type: "list",
      name: "reqType",
      message: "Choose an option ",
      choices: [
        "Search Concert",
        "Search Song",
        "Search Movie",
        "Do what It says"
      ]
    },

    {
      type: "input",
      name: "reqData",
      message: "What would you like to search..."
    },

    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure (Y/N) ? "
    }
  ])
  .then(function (data) {
    if (data.confirm) {
      processRequest(data.reqType, data.reqData);
    }
  });

function processRequest(reqType, reqData) {
  console.log("reqType ", reqType);
  var choice = reqType.toLowerCase();
  switch (choice) {
    case "search concert":
      bands(reqData);
      break;
    case "search song":
      songs(reqData);
      break;
    case "spotify this song":
      songs(reqData);
      break;
    case "search movie":
      movies(reqData);
      break;
    case "do what it says":
      doWhatItSays(reqData);
      break;
  }
}

function bands(band) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
      band +
      "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      var data = response.data[0];
      //console.log(data);
      console.log(chalk.green("Name of the venue : " + data.venue.name));
      console.log(chalk.green("Venue location : " + data.venue.country));
      var date = data.datetime.slice(0, 10);
      console.log(chalk.green("Date of the Event : " + date));
    })
    .catch(function (err) {
      console.log("omdbapi error ", err);
    });
}

function movies(movie) {
  axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      var data = response.data;
      console.log("Title of the movie : ", chalk.magenta(data.Title));
      console.log("Year the movie came out : ", chalk.magenta(data.Year));
      console.log(
        "IMDB Rating of the movie : ",
        chalk.magenta(data.imdbRating)
      );
      console.log("Rotten Tomatoes Rating of the movie : ", chalk.magenta());
      console.log(
        "Country where the movie was produced : ",
        chalk.magenta(data.Country)
      );
      console.log("Language of the movie : ", chalk.magenta(data.Language));
      console.log("Plot of the movie : ", chalk.magenta(data.Plot));
      console.log("Actors in the movie : ", chalk.magenta(data.Actors));
    })
    .catch(function (err) {
      console.log("omdbapi error ", err);
    });
}

//consume Spotify search API
function songs(song) {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  spotify
    .search({
      type: "track",
      query: song,
      limit: 5,
      market: "US",
      offset: 0
    })
    .then(function (response) {
      console.log(
        chalk.yellow("Artist name", response.tracks.items[0].artists[0].name)
      );
      console.log(chalk.yellow("Song Name ", response.tracks.items[0].name));
      console.log(
        chalk.yellow(
          "Song Preview URL :",
          response.tracks.items[0].external_urls.spotify
        )
      );
      console.log(
        chalk.yellow("Album Name", response.tracks.items[0].album.name)
      );
    })
    .catch(function (err) {
      console.log(chalk.red("spotify error ", err));
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log("Error reading random.txt file ", error);
    }
    var dataArr = data.split(",");
    var reqType = dataArr[0];
    var reqData = dataArr[1];
    console.log(reqType);
    reqType = reqType.replace(/-/g, ' ');
    console.log(reqType);
    reqData = reqData.replace(/-/g, ' ');
    processRequest(reqType, reqData);
  });
}