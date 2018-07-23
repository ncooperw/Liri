require("dotenv").config();

var keys = require(".keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var client = new Twitter(keys.twitter);

var fs = require("fs");

//var spotify = new Spotify(keys.spotify);

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];

//movie or song
var x = "";

//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if (i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x= x + nodeArgv[i];
  }
}

//switch case

switch(command){
  case "my-tweets":
  showTweets();
  break;

  case "spotify-this-song":
  if(x){
    spotifySong(x);
  } else{
    spotifySong("I Will Always Love You");
  }
  break;

  case "movie-this":
  if(x){
    omdbData(x)
  }else{
    omdbData("Mr. Nobody")
  }
  break;

  case "do-what-it-says":
  doThing();
  break;

  default:
  console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

