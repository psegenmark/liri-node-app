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

  var inquirer = require("inquirer");
  
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Who's your POTUS?",
      name: "username"
    }
  ])

var twitterKeys = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'N8Y3I958JIqgsIRDBSKZe2Rtc',
    consumer_secret: 'HKssDCO78I4tvGpaJ5tIyZKBqhJUzWMefLRkP1fIBZiiEVCt36',
    access_token_key: '931324642496622592-Kayi5UE9L206bC0Uzj3FzBu1VJcngYx',
    access_token_secret: 'BqUOeOCwm5YCVA5z3qssJo1KkszOT4DjsgmkUw5LTGSVf',
});


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
};

// calling on spotify

function spotify(value){

if (value === null){
    value = 'The Sign';
}

var spotifyKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "ade4c2468b124149b85c0ee03310fd2c",
  secret: "9be9e3876e164620ab53f4f9159ecd95"
});

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

  if (value == null){
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