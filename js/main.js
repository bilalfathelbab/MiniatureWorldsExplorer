// ============================================================
// MAIN
// Entry point: initializes the app once the DOM is ready.
// Load order in index.html must be:
//   data.js -> cards.js -> bubbles.js -> detail.js -> main.js
// ============================================================

/**
 * Full app initialisation:
 * 1. Render the species card grid
 * 2. Attach the back-button listener
 * 3. Start the home-screen bubbles
 * 4. Set up the fullscreen image modal listeners
 */
async function initialize() {
  await loadSpeciesData();
  renderSpeciesCards();
  document.getElementById('backButton').addEventListener('click', showHome);
  startBubbles();
  initFullscreen();
alert("Initialize finished");
showDebugInfo();
}

// Wait for the DOM if needed, otherwise run immediately.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}


//debug info
function showDebugInfo() {
    alert("showDebugInfo() called");

    const box = document.createElement("div");

    box.style.position = "fixed";
    box.style.bottom = "10px";
    box.style.right = "10px";
    box.style.background = "rgba(0,0,0,.8)";
    box.style.color = "white";
    box.style.padding = "8px";
    box.style.borderRadius = "8px";
    box.style.font = "14px Arial";
    box.style.zIndex = "99999";

    function update() {
        box.innerHTML =
            `Viewport: ${window.innerWidth} × ${window.innerHeight}<br>` +
            `Screen: ${screen.width} × ${screen.height}<br>` +
            `DPR: ${window.devicePixelRatio}`;
    }

    update();
    window.addEventListener("resize", update);

    document.body.appendChild(box);
}
