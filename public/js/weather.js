// const api = {
//     key: "5f349aa6ada756ec606e796bb760b7e7",
//     base: "https://api.openweathermap.org/data/2.5/"
//   }

const queryURL = "http://api.openweathermap.org/data/2.5/forecast?" + apiKey;

//variable to limit number of days pulled into forecast
const numDays = 7;
// tracks search history
const searchHistoryCounter = 0;
//api key
const apiKey = "5f349aa6ada756ec606e796bb760b7e7";
// search params
var queryTerm = "";

function runQuery(numDays, queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(weatherData) {
    //JSON Obj Initialization
    console.log("WeatherData:", weatherData);
    console.log("QueryURL:", queryURL);
    console.log("===========================");

    //Current Day Data
    console.log("City Name:", weatherData.city.name);
    console.log("Date:", weatherData.list[0].dt_txt);
    console.log("Temp:", weatherData.list[0].main.temp + " F");
    console.log("Humidity:", weatherData.list[0].main.humidity + " %");
    console.log("Wind Speed:", weatherData.list[0].wind.speed + "MPH");
    //Data for One Call from 7-Day
    console.log("Latitude", weatherData.city.coord.lat);
    console.log("Longitude", weatherData.city.coord.lon);

    //Start Dumping to HTML
    const dayPreviewTitle = $("<h2>").text(
      weatherData.city.name + " " + weatherData.list[0].dt_txt
    );
    const dayPreviewTemp = $("<p>").text(
      "Temperature: " + weatherData.list[0].main.temp + " F"
    );
    const dayPreviewHumidity = $("<p>").text(
      "Humidity: " + weatherData.list[0].main.humidity + " %"
    );
    const dayPreviewWindSpeed = $("<p>").text(
      "Wind Speed: " + weatherData.list[0].wind.speed + " MPH"
    );

    //let dayPreviewUVIndex = $('<p>').text();
    $("#dayPreview").append(dayPreviewTitle);
    $("#dayPreview").append(dayPreviewTemp);
    $("#dayPreview").append(dayPreviewHumidity);
    $("#dayPreview").append(dayPreviewWindSpeed);

    //Seven Day Data -- create appending loop to attach 5-day li ==== weatherData.list.length
    for (let i = 0; i < numDays; i++) {
      console.log("7-Day DATE:", weatherData.list[i].dt_txt);
      console.log("7-day TEMP", weatherData.list[i].main.temp + " F");
      console.log("7-DAY HUMIDITY:", weatherData.list[i].main.humidity + " %");
    }

    // longitude and latitude vars
    const longitude = "&lon=" + weatherData.city.coord.lon;
    console.log(longitude);
    const latitude = "lat=" + weatherData.city.coord.lat;
    console.log(latitude);

    //URL base One Call
    const oneCallBaseURL =
      "https://api.openweathermap.org/data/2.5/onecall?" +
      latitude +
      longitude +
      "&exclude=hourly,minutely&" +
      "&units=imperial&" +
      apiKey;
    // needs "imperial units"
    console.log(oneCallBaseURL);
  });
}

// MAIN PROCESSES
// =======================================

$("#searchBtn").on("click", function() {
  //target input search value
  queryTerm = $("#search")
    .val()
    .trim();
  //add search value end of q=
  var newURL = queryBaseURL + "&q=" + queryTerm + "&units=imperial";
  //test for correct api link
  console.log("NEW URL:", newURL);
  //send new URL to AJAX call
  runQuery(10, newURL);

  //testing user search input
  console.log("Query Term:", queryTerm);
  return false;
});
