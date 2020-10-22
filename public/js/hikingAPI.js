let hikeBaseURL = "https://www.hikingproject.com/data/get-trails?" + hikeApiKey;
//lat=40.0274&lon=-105.2519&maxDistance=10&key=

var queryTerm = "";

const hikeApiKey = "200954275-61d35dbb141f7d0585437ea6275153f0";

function hikeQuery(hikeBaseURL) {
    $.ajax({
        url: hikeBaseURL,
        method: "GET"
    }).done(function (hikeData) {
        //JSON Obj Initialization
        console.log("hikeData:", hikeData);
        console.log("QueryURL:", hikeBaseURL);
        console.log("===========================");

        console.log("trail", hikeData.trails.name);
        console.log("Summary", hikeData.trails.summary)
        console.log("difficulty", hikeData.trails.difficulty)
        console.log("trail", hikeData.trails.name)
        console.log("trail", hikeData.trails.name)
        console.log("trail", hikeData.trails.name)
        console.log("trail", hikeData.trails.name)
        console.log("trail", hikeData.trails.name)

        let longitude = "&lon=" + hikeData.trails.longitude;
        console.log(longitude);
        let latitude = "lat=" + hikeData.trails.latitude;
        console.log(latitude);


        //URL base One Call
        let hikeCallBaseURL = "https://www.hikingproject.com/data/get-trails?" + latitude + longitude + distance + apiKey;
        // needs "imperial units"
        console.log(hikeCallBaseURL);

    });

}


