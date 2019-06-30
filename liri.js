require("dotenv").config();

var axios = require('axios');
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); // var spotify = new Spotify({ id: <your spotify client id>, secret: <your spotify client secret>});
var userChoice = process.argv[2];
var userInput = process.argv[3];

//-----------------------------------------------------------------------------------------------------------------------------------------

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertInfo(artist) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(function (response) {

    if (response.status === 200) {
      var concerts = response.data;

      for (var i = 0; i < concerts.length; i++) {
        console.log("Name of the Venue: " + concerts[i].venue.name);
        fs.appendFileSync("log.txt", "Venue Name: " + concerts[i].venue.name+"\n");
        console.log("Venue Location: " + concerts[i].venue.city) + "\n";
        fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
        console.log("Date of the Event: " + concerts[i].datetime + "\n" + "\n");
        fs.appendFileSync("log.txt", "Event Date: " + concerts[i].datetime + "\n" + "\n");
        console.log("---------------------------------------------------------------------------------------------------------------------------------------\n\n");
        fs.appendFileSync("log.txt", "---------------------------------------------------------------------------------------------------------------------------------------\n\n");
      }
    } else {
      console.log('An error has occured.');
    }
  });
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
function songInfo(song) {
  if (song === undefined) {
    song = "The Sign";
  }
  spotify.search(
    {
      type: "track",
      query: song
    },
    function (err, data) {
      if (err) {
        console.log(err + "error has occurred");
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
        fs.appendFileSync("log.txt", "---------------------------------------------------------------------------------------------------------------------------------------\n\n");
      }
      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {

        console.log("\n" + "\n" + "Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync("log.txt", "Artist(s): " + songs[i].artists[0].name + "\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "Song name: " + songs[i].name + "\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync("log.txt", "Preview song: " + songs[i].preview_url + "\n");
        console.log("Album: " + songs[i].album.name + "\n" + "\n");
        fs.appendFileSync("log.txt", "Album: " + songs[i].album.name + "\n" + "\n");

        // fs.appendFileSync("\n" + "\n" + "log.txt", "Artist(s): " + "\n"+ songs[i].artists[0].name + "\n"+
        // songs[i].name+ "\n"+ songs[i].preview_url+ "\n"+songs[i].album.name + "\n" );


        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
        fs.appendFileSync("log.txt", "---------------------------------------------------------------------------------------------------------------------------------------\n\n");
      }
    }
  );
};

//-----------------------------------------------------------------------------------------------------------------------------------------

function movieInfo(movieTitle) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=b3c0b435";
  //Default results
  if (movieTitle === undefined) {
    movieTitle = "Mr. Nobody"
    console.log("You intered an undefined movie title. Here are the details of the movie by default ('Mr. Nobody')");
    fs.appendFileSync("You intered an undefined movie title. Here are the details of the movie by default ('Mr. Nobody')");
  }
  //* Title of the movie.
  //* Year the movie came out.
  //* IMDB Rating of the movie.
  //* Rotten Tomatoes Rating of the movie.
  //* Country where the movie was produced.
  //* Language of the movie.
  //* Plot of the movie.
  //* Actors in the movie.
  axios.get(queryUrl).then(function (response) {
    // console.log(response);

    if (response.status === 200) {
      var movies = response.data;
      console.log("\n" + "\n" + "Title: " + movies.Title);
      fs.appendFileSync("\n" + "\n" + "log.txt", "Title: " + movies.Title + "\n");
      console.log("Release Year: " + movies.Year);
      fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
      console.log("IMDB Rating: " + movies.imdbRating);
      fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
      console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
      fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
      console.log("Country of Production: " + movies.Country);
      fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
      console.log("Language: " + movies.Language);
      fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
      console.log("Plot: " + movies.Plot);
      fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
      console.log("Actors: " + movies.Actors + "\n" + "\n");
      fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n" + "\n");
      console.log("---------------------------------------------------------------------------------------------------------------------------------------");
      fs.appendFileSync("log.txt" + "---------------------------------------------------------------------------------------------------------------------------------------\n\n");
    } else {
      console.log('An error has occurred.');
      console.log("---------------------------------------------------------------------------------------------------------------------------------------");
      fs.appendFileSync("log.txt", "---------------------------------------------------------------------------------------------------------------------------------------");
    }
  });

  //function for Rotten Tomatoes Rating
  function getRottenTomatoesRatingObject(data) {
    return data.Ratings.find(function (item) {
      return item.Source === "Rotten Tomatoes";
    });
  }
  function getRottenTomatoesRatingValue(data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

}

//function that reads the random.txt file  
function doWhatItSaysInfo() {
  // console.log("do what it says")
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArray = data.split(',');
    console.log(dataArray);
    if (dataArray[0] !== "do-what-it-says") {
      run(dataArray[0], dataArray[1]);
    } else {
      console.log("do-what-it-says not valid for random.txt")
    }
  });
}

function run(userChoice, userInput) {
  switch (userChoice.toLowerCase()) {
    case "concert-this":
      return concertInfo(userInput);

    case "spotify-this-song":
      return songInfo(userInput);

    case "movie-this":
      return movieInfo(userInput);

    case "do-what-it-says":
      return doWhatItSaysInfo();

    default:
      return console.log("Please, choose a valid option")

  }
}

run(userChoice, userInput);
