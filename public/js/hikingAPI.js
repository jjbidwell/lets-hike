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
        //curent trail data
        console.log("trail", hikeData.trails.name);
        console.log("Summary", hikeData.trails.summary);
        console.log("difficulty", hikeData.trails.difficulty);
        console.log("stars", hikeData.trails.stars);
        console.log("location", hikeData.trails.location);
        console.log("url", hikeData.trails.url);
        console.log("imgSqSmall", hikeData.trails.imgSqSmall);
        console.log("imgSmall", hikeData.trails.imgSmall);
        console.log("imgSmallMed", hikeData.trails.imgSmallMed);
        console.log("imgMedium", hikeData.trails.imgMedium);
        console.log("length", hikeData.trails.length);
        console.log("ascent", hikeData.trails.ascent);
        console.log("high", hikeData.trails.high);
        console.log("low", hikeData.trails.low);
        console.log("longitude", hikeData.trails.longitude);
        console.log("latitude", hikeData.trails.latitude);
        console.log("conditionStatus", hikeData.trails.conditionStatus);
        console.log("conditionDetails", hikeData.trails.conditionDetails);
        console.log("conditionDate", hikeData.trails.conditionDate);

        //dump info to HTML
        let trailName = $('<h2>').text(hikeData.trails.name + " " + hikeData.list[0].dt_txt);
        let trailLocation = $('<h3>').text(hikeData.list[0].main.location);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDifficulty = $('<p>').text("Difficulty: " + hikeData.list[0].main.difficulty);
        let trailRating = $('<p>').text("Rating: " + hikeData.list[0].main.stars);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailDescription = $('<p>').text("Summary: " + hikeData.list[0].main.summary);
        let trailLink = $('<p>').text("Learn more: " + hikeData.list[0].main.url);





        // longitude and latitude variables for url
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


