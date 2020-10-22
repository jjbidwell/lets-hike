
const hikeBaseURL =
  "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
//lat=40.0274&lon=-105.2519&maxDistance=10&key=

var queryTerm = "";
acdb49766c84affdecd6c0426f677dafb09e8baa

//lat=40.0274&lon=-105.2519&maxDistance=10&key=
const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
let hikeBaseURL = "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
var queryTerm = "";

function hikeQuery(hikeBaseURL) {
  $.ajax({
    url: hikeBaseURL,
    method: "GET"
  }).done(function(hikeData) {
    //JSON Obj Initialization
    console.log("hikeData:", hikeData);
    console.log("QueryURL:", hikeBaseURL);
    console.log("===========================");

    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);
    console.log("trail", hikeData.trails.name);

    //URL base One Call
    const oneCallBaseURL = "" + latitude + longitude + distance + apiKey;
    // needs "imperial units"
    console.log(oneCallBaseURL);
  });
}
