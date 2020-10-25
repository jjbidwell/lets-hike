$(document).ready(() => {
  const searchForm = $("#search-form");
  const searchInput = $("#search-input");

  searchForm.on("submit", event => {
    event.preventDefault();
    const searchArea = searchInput.val().trim();
    if (!searchArea) {
      return;
    }
    const key = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
    const queryUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchArea}`;

    $.ajax({
      url: "/search",
      method: "POST",
      data: { searchArea: searchArea }
    })

      .done(() => {
        console.log("TEST2");
        location.replace("/search");
      })
      .catch(err => {
        console.log("error");
      });
  });

  // $(".weather-link").on("click", getWeather);

  // function getWeather() {
  //   const weatherId;
  //   const weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={API key}""
  //   const trailLocation = $(this).data("location");
  //   const trailId = $(this).data("id");
  //   console.log(trailId, trailLocation);

  //   $.ajax({
  //     url: "/search",
  //     method: "GET",
  //     data: trail
  //   })
  //     .done(() => {
  //       console.log("TEST2");
  //       location.replace("/search");
  //     })
  //     .catch(err => {
  //       console.log("error");
  //     });
  // }
});
