const axios = require("axios");

const geolocate = searchLocation => {
  const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
  const loc = searchLocation;
  const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;

  axios.get(queryUrl).then(response => {
    const coords = response.data.results[0].locations[0].latLng;
    const lat = coords.lat;
    const long = coords.lng;
    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
  });
  // $.ajax({
  //   url: queryUrl,
  //   method: "GET"
  // }).done(function(locData) {
  //   //JSON Obj Initialization
  //   console.log(locData);
  // });
};

module.exports = geolocate;
