// ===============================
// CONFIG
// ===============================

const API_BASE = "https://script.google.com/macros/s/AKfycbz2GtHUrhsFcQBshvLr9kfNAvX1m0WusmrhYeLQah27qq_vo2_tLGYecbjkFOhaQKE-/exec";
const API_URL = API_BASE + "?action=getLinks";

const CACHE_KEY = "cachedLinks";
const CACHE_TIME_KEY = "cachedLinksTime";
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

// ===============================
// INIT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  renderFromCache();
  refreshInBackground();
});

// ===============================
// FETCH API
// ===============================

async function getLinks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Network response error");
  return await response.json();
}

// ===============================
// CACHE RENDER
// ===============================

function renderFromCache() {
  const container = document.getElementById("linksContainer");
  const cached = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (!cached || !cachedTime) {
    container.innerHTML = "<p class='text-white'>Loading...</p>";
    return;
  }

  const isExpired = Date.now() - cachedTime > CACHE_DURATION;

  renderLinks(JSON.parse(cached));

  if (isExpired) {
    refreshInBackground();
  }
}

// ===============================
// BACKGROUND REFRESH
// ===============================

async function refreshInBackground() {
  try {
    const links = await getLinks();

    localStorage.setItem(CACHE_KEY, JSON.stringify(links));
    localStorage.setItem(CACHE_TIME_KEY, Date.now());

    renderLinks(links);

  } catch (err) {
    console.log("API sleep / lambat:", err.message);
  }
}

// ===============================
// RENDER LINKS
// ===============================

function renderLinks(links) {
  const container = document.getElementById("linksContainer");
  container.innerHTML = "";

  if (!links || links.length === 0) {
    container.innerHTML = "<p class='text-white'>Belum ada link</p>";
    return;
  }

  links.forEach(link => {

    if (!link.title || !link.url) return;

    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";

    a.className = `
      block w-full text-center py-3 rounded-2xl mb-4
      bg-white/10 backdrop-blur-lg
      border border-white/20
      hover:scale-105 hover:bg-white/20
      transition duration-300 text-white font-semibold
    `;

    a.innerText = link.title;

    container.appendChild(a);
  });
}