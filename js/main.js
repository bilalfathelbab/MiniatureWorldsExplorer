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
 * 3. Start the app-lifetime bubble systems
 * 4. Set up the fullscreen image modal listeners
 */
async function initialize() {
  await loadSpeciesData();

  renderSpeciesCards();

  document.getElementById('microscopeCard')
    .addEventListener('click', showMicroscopeGuide);

  document.getElementById('backButton')
    .addEventListener('click', showHome);

  initializeBubbles();
  hideDetailView(document.getElementById('detailView'));
  initFullscreen();
  registerServiceWorker();
}

/**
 * Registers the native Service Worker after the app starts.
 * Registration is intentionally non-blocking so offline support never
 * changes the existing launch flow.
 */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const startRegistration = async () => {
    try {
      const registration = await navigator.serviceWorker.register('sw.js');

      await registration.update();

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

      const refreshCache = () => {
        const worker = registration.active || navigator.serviceWorker.controller;
        if (worker) worker.postMessage({ type: 'REFRESH_CACHE' });
      };

      if (navigator.serviceWorker.controller) {
        refreshCache();
      } else {
        navigator.serviceWorker.ready.then(refreshCache);
      }
    } catch (error) {
      console.warn('Offline support could not be initialized.', error);
    }
  };

  if (document.readyState === 'complete') {
    startRegistration();
  } else {
    window.addEventListener('load', startRegistration, { once: true });
  }
}

// Wait for the DOM if needed, otherwise run immediately.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

let lastTouchEnd = 0;

document.addEventListener('touchend', function (event) {
  const now = Date.now();

  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }

  lastTouchEnd = now;
}, { passive: false });
