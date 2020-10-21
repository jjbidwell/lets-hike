let hikeBaseURL = "http://api.openweathermap.org/data/2.5/forecast?" + hikeApiKey;

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
}


