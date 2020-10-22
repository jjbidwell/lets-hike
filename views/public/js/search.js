$(document).ready(() => {
  const searchForm = $("#search-form");
  const searchInput = $("#search-input");

  searchForm.on("submit", event => {
    event.preventDefault();
    const searchArea = searchInput.val().trim();
    if (!searchArea) {
      return;
    }
    console.log(searchArea);
  });
});
