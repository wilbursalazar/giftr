const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const statusEl = document.getElementById("status");

console.log("we looking gud: JS Connected", form, input, resultsGrid);

function setStatus(message) {
  statusEl.textContent = message;
}

function clearResults() {
  resultsGrid.innerHTML = "";
}

function renderGif(url, altText) {
  const item = document.createElement("div");
  item.className = "grid-item";

  const img = document.createElement("img");
  img.src = url;
  img.alt = altText;
  img.loading = "lazy";

  item.appendChild(img);
  resultsGrid.appendChild(item);
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

  renderGif(
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhjZzRpc21mMG5zcXptaWl6czA5dDltbnUwbTZ5b3M0MmcxenBiayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/olAik8MhYOB9K/giphy.gif",
    `Result for ${query}`
  );
});
