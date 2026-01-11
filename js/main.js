const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const statusEl = document.getElementById("status");

console.log("JS connected:", form, input, resultsGrid);

function setStatus(message) {
  statusEl.textContent = message;
}

function clearResults() {
  resultsGrid.innerHTML = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value.trim();
  console.log("User searched:", query);

  if (query === "") {
    return;
  }

  clearResults();
  setStatus(`Searching for: ${query}`);
});
