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
      url: "/api/user_preferences",
      method: "POST",
      data: { searchArea: searchArea }
    });
  });
});
