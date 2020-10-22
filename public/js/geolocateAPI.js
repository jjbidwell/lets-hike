const geolocate = () => {
  const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
  const loc = "San Diego, Ca";
  const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(locData) {
    //JSON Obj Initialization
    console.log(locData);
  });
};

module.exports = geolocate;
