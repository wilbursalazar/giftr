const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const statusEl = document.getElementById("status");
const GIPHY_API_KEY = "hbKRRknTnybZGCmqXqtDdfI140XSzdKg";

console.log("JS Connected", form, input, resultsGrid);

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

function renderGifResults(gifs) {
  for (const gif of gifs) {
    const url = gif.images.fixed_width.url;
    const altText = gif.title || "GIF result";
    renderGif(url, altText);
  }
}

function showNoResults(query) {
  clearResults();
  setStatus(`Nothing Matches: ${query}`);
}


async function searchGiphy(query) {
  const url =
    "https://api.giphy.com/v1/gifs/search" +
    "?api_key=" + GIPHY_API_KEY +
    "&q=" + encodeURIComponent(query) +
    "&limit=10";

  const response = await fetch(url);

  const data = await response.json();
  return data;
}


form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const query = input.value.trim();
  if (query === "") return;

  clearResults();
  setStatus("Loading...");

  try {
    const data = await searchGiphy(query);

    const gifs = data.data; // array
    if (!gifs || gifs.length === 0) {
      showNoResults(query);
      return;
    }

    setStatus(`Results for: ${query}`);
    renderGifResults(gifs);
  } catch (error) {
    console.error(error);
    setStatus("Something went wrong. Check the console.");
  }
});
