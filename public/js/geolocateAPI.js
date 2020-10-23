const axios = require("axios");

const apiCall = (searchLocation, minLength, maxLength, maxAscent) => {
  const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
  const loc = searchLocation;
  const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;

  const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
  const hikeBaseURL = "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
  var queryTerm = "";

  axios.get(queryUrl).then(response => {
    const coords = response.data.results[0].locations[0].latLng;
    const lat = coords.lat;
    const long = coords.lng;
    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
  });
};

function hikeQuery(lat, long, minLength, maxLength, maxAscent) {
  const hikingKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
  const hikeBase = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&minLength=${minLength}&maxDistance=20&key=${hikingKey}`;
}

module.exports = apiCall;
