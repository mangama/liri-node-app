# liri-node-app


1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)

   LIRI is a command line node app that takes in parameters and gives you back data. The user can only use the following command: 
   * concert-this
   * spotify-this-song
   * movie-this
   * do-what-it-says


2. Give a high-level overview of how the app is organized

   This program is a Language Interpretation and Recognition Interface. The application from the command line takes input parameters such as:
   * artist/band name and provide a list of venues with the following information:
      - Name of the venue
      - Venue location
      - Date of the Event (use moment to format this as "MM/DD/YYYY")  
   * song title and provide a list every song with this title with the following information:
      - Artist(s)
      - The song's name
      - A preview link of the song from Spotify
      - The album that the song is from
   * movie title and provide some information about the movie and "Rotten Tomatoes":
      - Title of the movie.
      - Year the movie came out.
      - IMDB Rating of the movie.
      - Rotten Tomatoes Rating of the movie.
      - Country where the movie was produced.
      - Language of the movie.
      - Plot of the movie.
      - Actors in the movie.
   * a command that uses the contents of a txt file to execute


3. Give start-to-finish instructions on how to run the app. Include screenshots, gifs or videos of the app functioning.

   Instructions:

   Navigate to the liri-node-app folder that contains the liri.js and run the command of your choice
      * If the user types node liri.js concert-this <name of artist or band>, here an exmaple of output:

         ![concert-this The Betales ](https://github.com/mangama/liri-node-app/blob/master/images/concert-this.png)

      If an error occurs, the following message will display: 'An error has occured.'

      * If the user enters node liri.js spotify-this-song <song name here>, here an exmaple of output:
         ![spotify-this-son  ](https://github.com/mangama/liri-node-app/blob/master/images/concert-this.png)


      If an error occurs, the following displays: err + "error has occurred"
      * If the user types node liri.js movie-this <movie name here>, here an exmaple of output:
      movie-this.png

      If an error occurs, the following message will display: 'An error has occured.'
      But, if a user enters a mispelled or a movie that is not available in OMDb, the movie Mr. Nobody" will be used by default. Below is a screenshot:
      

      * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's command 'node liri.js               do-what-it-says' §which should run spotify-this-song for "I Want it That Way,". Hereis a screenshot of terminal.

      * If the wrong a command other than the ones listed above is called, the message "Please, choose a valid option" will display.


4. Contain a link to a deployed version of the app



5. Clearly list the technologies used in the app

   * GitHub
   * Javascript
   * Nodejs
   * Node packages:
      - Node-Spotify-API
      - Request
      - Moment
      - DotEnv
   * APIs used:
      - Bands in Town
      - OMDB

