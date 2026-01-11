const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");

console.log("JS connected:", form, input, resultsGrid);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value.trim();
  console.log("User searched:", query);

  if (query === "") {
    return;
  }
});