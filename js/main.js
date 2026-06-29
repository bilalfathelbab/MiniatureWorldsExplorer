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
}

// Wait for the DOM if needed, otherwise run immediately.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
