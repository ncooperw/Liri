require("dotenv").config();

//Load keys from key.js file
var keys = require("./keys.js");


// npms called
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var client = new Twitter(keys.twitterKeys);

var fs = require("fs");

//var spotify = new Spotify(keys.spotify);

//Stored argument's array
var nodeArgv = process.argv;
var input = process.argv[2];


//movie or song
var userRequest = process.argv[3];





//switch case
if (input == "my-tweets") {
  console.log("tweet");
  showTweets();
} else if (input == "spotify-this-song") {
  console.log("you chose song")
  if (userRequest) {
    spotifySong(userRequest);
  } else {
    spotifySong("I Will Always Love You");
  }
} else if (input == "movie-this") {
  console.log("You chose movie!")
  if (userRequest) {
    omdbData(userRequest);
  } else {
    omdbData("Mr. Nobody")
  }

} else if (input == "do-what-it-says") {
  doThing();
} else if (input == null) {
  console.log("{Please enter a input: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
}


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

  function spotifySong(userRequest) {
    //loop through if song is longer than 1 word
    //for (var i = 3; i < input.length; i++) {
      //song = userRequest + " " + input[i];
      
      console.log(userRequest);
    //}
    var spotify = new Spotify(keys.spotify);
    // var spotify = new spotify({
    //   id: process.env.SPOTIFY_ID,
    //   secret: process.env.SPOTIFY_SECRET
    // });

    spotify.search({
      type: "track",
      query: userRequest,
    }, function (err, data) {
      if (err) {
        console.log("error occurred" + err);
        return;
      }if(data.tracks.items.length>0){
        var songData = data.tracks.items[0];
        console.log(" ");
        console.log("========== Song Info ==========");
        console.log("Link to song: " + songData.artists[0].external_urls.spotify);
          //artist
          console.log("Artist: " + songData.artists[0].name);

          //song name
          console.log("Song: " + songData.name);

          //spotify preview link
          console.log("Preview URL: " + songData.preview_url);

          //album name
          console.log("Album: " + songData.album.name);
          console.log("---------------------------")
          console.log(" ");

        

      } else {
        console.log("No song data found.");
      }
      
      
      // else {
    
      //   for (var i = 0; i < data.tracks.items.length; i++) {
      //    var songData = data.tracks.items[i];
      //    // console.log("song object " + JSON.stringify(songData, null, 2));
      //   console.log("Link to song: " + data.tracks.items[0].artists[0].external_urls.spotify);
      //     //artist
      //     console.log("Artist: " + songData.artists[0].name);

      //     //song name
      //     console.log("Song: " + songData.name);

      //     //spotify preview link
      //     console.log("Preview URL: " + songData.preview_url);

      //     //album name
      //     console.log("Album: " + songData.album.name);
      //     console.log("---------------------------")

          //adds text to log.txt
          fs.appendFile("log.txt", songData.artists[0].name, (err)=>{
            if (err) throw err;
            console.log(songData.artists[0].name + " was appended to file!");
          });

          fs.appendFile("log.txt", songData.name, (err)=>{
            if (err) throw err;
            console.log(songData.name + " was appended to file!");
          });

          fs.appendFile("log.txt", songData.preview_url, (err)=>{
            if (err) throw err;
            console.log(songData.preview_url+ " was appended to file!");
          });

          fs.appendFile("log.txt", songData.album.name, (err)=>{
            if (err) throw err;
            console.log(songData.album.name + " was appended to file!");
          });
          console.log("---------------------------")
        })
  //     }
  //   })
   }

  function omdbData(userRequest) {
    //if movie name is longer than one work, join the words together
    for (var i = 3; input.length; i++) {
      if (i > 2 && i < input.length) {
        userRequest = userRequest + " " + input[i];
      }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy"

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