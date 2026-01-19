const DASH_URL = "/dash";

/* Elements */
const popupBackdrop = document.getElementById("popup-backdrop");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupButton = document.getElementById("popup-button");

/* Popup helpers */
function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popupBackdrop.classList.remove("hidden");
}

popupButton.addEventListener("click", () => {
  window.location.replace(DASH_URL);
});

function redirectDash() {
  window.location.replace(DASH_URL);
}

/* Parse request based on NEW format */
function parseRequest() {
  const url = new URL(window.location.href);
  
  const id = url.searchParams.get("id");
  const path = url.searchParams.get("path") || "";
  
  if (!id) return null;
  
  return { id, path };
}

/* Resolve GitHub user by ID */
async function resolveUser(id, path) {
  try {
    const res = await fetch(`https://api.github.com/user/${id}`);
    
    if (res.status === 200) {
      const data = await res.json();
      const username = data.login;
      
      const target = path ?
        `https://github.com/${username}/${path}` :
        `https://github.com/${username}`;
      
      window.location.replace(target);
      return;
    }
    
    if (res.status === 404) {
      showPopup(
        "User not found",
        "GitHub user with this ID does not exist."
      );
      return;
    }
    
    if (res.status === 403 || res.status === 429) {
      showPopup(
        "Rate limited",
        "GitHub API rate limit exceeded on your IP. Please try again later."
      );
      return;
    }
    
    showPopup(
      "GitHub error",
      `GitHub API returned status ${res.status}.`
    );
    
  } catch {
    showPopup(
      "Network error",
      "Unable to reach GitHub API. Please try again later."
    );
  }
}

/* Main */
(function main() {
  const parsed = parseRequest();
  
  if (!parsed) {
    redirectDash();
    return;
  }
  
  const { id, path } = parsed;
  
  if (!/^\d+$/.test(id)) {
    showPopup(
      "Invalid ID",
      "GitHub user ID must be numeric."
    );
    return;
  }
  
  resolveUser(id, path);
})();
