$(document).ready(() => {
  const searchForm = $("#search-form");
  const searchInput = $("#search-input");

  searchForm.on("submit", event => {
    event.preventDefault();
    const searchArea = searchInput.val().trim();
    if (!searchArea) {
      return;
    }

    $.ajax({
      url: "/search",
      method: "POST",
      data: { searchArea: searchArea }
    })
      .done(() => {
        location.replace("/search");
      })
      .catch(err => {
        console.log("error");
      });
  });
});
