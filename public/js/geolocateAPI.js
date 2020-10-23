const axios = require("axios");

const apiCall = (searchLocation, minLength, maxLength, maxAscent) => {
  const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
  const loc = searchLocation;
  const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;

  axios.get(queryUrl).then(response => {
    const coords = response.data.results[0].locations[0].latLng;
    const lat = coords.lat;
    const long = coords.lng;
    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
    hikeQuery(lat, long, minLength, maxLength, maxAscent);
  });
};

function hikeQuery(lat, long, minLength, maxLength, maxAscent) {
  const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";
  const hikeBaseUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&minLength=${minLength}&maxDistance=25&maxResults=50&key=${hikeApiKey}`;
  //console.log(hikingUrl);
  axios.get(hikeBaseUrl).then(response => {
    //console.log(maxAscent);
    const trailList = response.data.trails;
    trailList.forEach(element => {
      if (element.length <= maxLength && element.ascent <= maxAscent) {
        console.log("Name: " + element.name);
        console.log("Length: " + element.length);
        console.log("Ascent: " + element.ascent);
        console.log("URL: " + element.url);
      }
    });
  });
}

module.exports = apiCall;
