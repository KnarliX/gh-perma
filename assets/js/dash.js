const DOMAIN = window.location.origin;

/* Elements */
const input = document.getElementById("input");
const generateBtn = document.getElementById("generate");
const resultBox = document.getElementById("result");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalOk = document.getElementById("modal-ok");

/* Modal helpers */
function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

modalOk.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/* Extract username + path */
function extractUserAndPath(value) {
  value = value.trim();
  if (!value) return null;
  
  // Full GitHub URL
  if (value.startsWith("http")) {
    try {
      const url = new URL(value);
      if (url.hostname !== "github.com") return null;
      
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length === 0) return null;
      
      return {
        username: parts[0],
        path: parts.slice(1).join("/")
      };
    } catch {
      return null;
    }
  }
  
  // username or username/path
  const parts = value.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  
  return {
    username: parts[0],
    path: parts.slice(1).join("/")
  };
}

/* Generate handler */
generateBtn.addEventListener("click", async () => {
  const parsed = extractUserAndPath(input.value);
  
  if (!parsed) {
    showModal("Invalid input", "Enter a valid GitHub username or URL.");
    return;
  }
  
  const { username, path } = parsed;
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    
    if (res.status === 404) {
      showModal("User not found", "GitHub user does not exist.");
      return;
    }
    
    if (res.status !== 200) {
      showModal(
        "GitHub error",
        "Unable to fetch user data. Please try again later."
      );
      return;
    }
    
    const data = await res.json();
    const id = data.id;
    
    const permanentUrl = path ?
      `${DOMAIN}?id=${id}&path=${path}` :
      `${DOMAIN}?id=${id}`;
    
    output.value = permanentUrl;
    resultBox.classList.remove("hidden");
    
  } catch {
    showModal(
      "Network error",
      "Unable to reach GitHub API. Try again later."
    );
  }
});

/* Copy */
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value);
  copyBtn.textContent = "Copied";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
});
