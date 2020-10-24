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
    }).catch(err => {
      console.log("error");
    });
  });
});
