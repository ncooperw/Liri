require("dotenv").config();

//Load keys from key.js file
var keys = require("./keys.js");


// npms called
var request = require("request");
var Twitter = require("twitter");
var spotify = require("node-spotify-api");

var client = new Twitter(keys.twitterKeys);

var fs = require("fs");

//var spotify = new Spotify(keys.spotify);

//Stored argument's array
var nodeArgv = process.argv;
var input = process.argv[2];


//movie or song
var movieName = "";
var songName = "";




//switch case
if (input == "my-tweets") {
  console.log("tweet");
  showTweets();
} else if (input == "spotify-this-song") {
  console.log("you chose song")
  if (songName) {
    spotifySong(songName);
  } else {
    spotifySong("I Will Always Love You");
  }
} else if (input == "movie-this") {
  console.log("You chose movie!")
  if (movieName) {
    omdbData(movieName);
  } else {
    omdbData("Mr. Nobody")
  }

}
// case "movie-this":
//       if (movieName) {
//         console.log("you chose movie");
//         omdbData(movieName)
//       } else {
//         omdbData("Mr. Nobody")
//       }

//   switch (input) {
//     case "my-tweets":
//       showTweets();
//       break;

//     case "spotify-this-song":
//       if (songName) {
//         console.log("you chose song")
//         spotifySong(songName);
//       } else {
//         spotifySong("I Will Always Love You");
//       }
//       break;

//     case "movie-this":
//       if (movieName) {
//         console.log("you chose movie");
//         omdbData(movieName)
//       } else {
//         omdbData("Mr. Nobody")
//       }
//       break;

//     case "do-what-it-says":
//       doThing();
//       break;

//     default:
//       console.log("{Please enter a input: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
//       break;
//   }

function showTweets() {
  //Display last 20 Tweets
  var params = {
    screen_name: "NicoleAC10",
  };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    console.log(tweets);

    if (error) {
      console.log("Error occurred" + error);
    } else { //if there is no error
     console.log("My 20 Most Recent Tweets");
      for (var i = 0; i < tweets.length; i++) {
 
      console.log("");
      console.log("@NicoleAC: " + tweets[i].text);
      console.log("Created At: " + tweets[i].created_at);
      console.log("----------------------------")

      //adds text to log.txt file
      fs.appendFile("log.txt", "@NicoleAC: " + tweets[i].text + " Created At: " + tweets[i].created_at);
      fs.appendFile("log.txt", "----------------------------");
    }
    }
  })
}

function spotifySong(songName) {
  //loop through if song is longer than 1 word
  for (var i = 3; i < input.length; i++) {
    songName = songName + " " + input[i];
  }
  var spotify = new spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({
    type: "track",
    query: songName,
  }, function (err, data) {
    if (err) {
      console.log("error occurred" + err);
    } else {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);

        //song name
        console.log("Song: " + songData.name);

        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);

        //album name
        console.log("Album: " + songData.preview.name);
        console.log("---------------------------")

        //adds text to log.txt
        fs.appendFile("log.txt", songData.artists[0].name);
        fs.appendFile("log.txt", songData.name);
        fs.appendFile("log.txt", songData.preview_url);
        fs.appendFile("log.txt", songData.album.name);
        console.log("---------------------------")
      }
    }
  })
}

function omdbData(movieName) {
  //if movie name is longer than one work, join the words together
  for (var i = 3; input.length; i++) {
    if (i > 2 && i < input.length) {
      movieName = movieName + " " + input[i];
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

  request(queryUrl, function (error, response, body) {
    //If the request is successful
    if (!error && response.statusCode == 200) {
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to the log.txt
      fs.appendFile("log.txt", "Title: " + body.Title);
      fs.appendFile("log.txt", "Release Year: " + body.Year);
      fs.appendFile("log.txt", "IMdB Rating: " + body.imdbRating);
      fs.appendFile("log.txt", "Country: " + body.Country);
      fs.appendFile("log.txt", "Language: " + body.Language);
      fs.appendFile("log.txt", "Plot: " + body.Plot);
      fs.appendFile("log.txt", "Actors: " + body.Actors);
      fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile("log.txt", "Rotten Tomatoes URL: " + body.tomatoURL);
    }
    if (movie === "Mr. Nobody") {
      console.log("--------------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "------------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");

      fs.appendFile("log.txt", "It's on Netflix!");

    }
  });
}

function doThing() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    var txt = data.split(" , ");
    spotifySong(txt[1]);
  });
}