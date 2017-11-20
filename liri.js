var userFunction = process.argv[2];
var userInput1 = process.argv.slice(3);
var userInput = userInput1.join(" ");

switch (userFunction) {
  case "my-tweets":
    twitter();
    break;

  case "spotify-this-song":
    spotify(userInput);
    break;

  case "movie-this":
    omdb(userInput);
    break;

  case "do-what-it-says":
    doWhatISay();
    break;
}

function twitter(){

var keyImport = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter(keyImport.twitterKeys);


var params = {screen_name: 'realDonaldTrump',
              count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error && response.statusCode == 200) {
  }
  for (var i = 0; i <tweets.length; i++) {
    // console.log each result.
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);

   
    
  }
});
var inquirer = require("inquirer");

inquirer
.prompt([
  // Here we create a basic text prompt.
  {
    message: "Who's your POTUS?",
    name: "username"
  }
])
};

// calling on spotify

function spotify(value){

if (value === ""){
    value = 'The Sign';
}

var keyImport = require("./keys.js");
var Spotify = require('node-spotify-api');

// console.log(keyImport.spotifyKeys);


var spotify = new Spotify(keyImport.spotifyKeys);

spotify.search({ type: 'track', query: value, limit:'1' }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }
 //      * Artist(s)
console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
//      * The song's name
console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
//      * A preview link of the song from Spotify
console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));   
//      * The album that the song is from
console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));

});
};

// calling OMDB

function omdb(value){

  if (value == ""){
    value = 'jaws';
  }  

var request = require("request");

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // * Title of the movie.
    console.log(JSON.parse(body).Title);
//        * Year the movie came out.    
    console.log(JSON.parse(body).Year);
//        * IMDB Rating of the movie.    
    console.log(JSON.parse(body).imdbRating);
//        * Rotten Tomatoes Rating of the movie.    
    console.log(JSON.parse(body).Ratings[1].Value);
 
//        * Language of the movie.   
    console.log(JSON.parse(body).Language);
//        * Plot of the movie.    
    console.log(JSON.parse(body).Plot);
  }
});
} 

// 4. `node liri.js do-what-it-says`

function doWhatISay(){

var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);
  var dataArr = data.split(",");
  
  spotify(dataArr[1]);

});
}