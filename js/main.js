"use strict";

const GIPHY_API_KEY = "ZIh9N4xcNThV4CUBhoSdi9UyOnUMK542";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const statusEl = document.getElementById("status");

console.log("JS connected:", form, input, resultsGrid, statusEl);

function setStatus(message) {
  if (!statusEl) return;
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
  img.alt = altText || "GIF result";
  img.loading = "lazy";

  item.appendChild(img);
  resultsGrid.appendChild(item);
}

async function searchGiphy(query) {
  const params = new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: query,
    limit: "24",
    rating: "g",
  });

  const url = `https://api.giphy.com/v1/gifs/search?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Giphy request failed: ${response.status}`);
  }

  return await response.json();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  clearResults();
  setStatus("wait...");

  try {
    const payload = await searchGiphy(query);
    const results = payload.data;

    if (!results || results.length === 0) {
      setStatus("Nothing matches.");
      return;
    }

    setStatus(`Results for: ${query}`);

    for (const gif of results) {
      const url = gif?.images?.fixed_width?.url;
      if (!url) continue;

      const altText = gif.title || `GIF result for ${query}`;
      renderGif(url, altText);
    }
  } catch (err) {
    console.error(err);
    setStatus("Something's off. see console.");
  }
});
