// ============================================================
// BUBBLES
// ============================================================

let homeBubblesStarted = false;
let detailBubblesStarted = false;

function createBubble(containerId = 'bubbleContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  const size = Math.random() * 40 + 10;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = Math.random() * 100 + '%';

  const duration = Math.random() * 7 + 8;
  bubble.style.animation = `bubbleFloat ${duration}s ease-in-out`;

  bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
  container.appendChild(bubble);
}

function startHomeBubbleSystem() {
  if (homeBubblesStarted) return;
  homeBubblesStarted = true;

  for (let i = 0; i < 30; i++) {
    setTimeout(() => createBubble('bubbleContainer'), i * 150);
  }

  setTimeout(() => {
    setInterval(() => createBubble('bubbleContainer'), 800);
  }, 30 * 150 + 200);
}

function startDetailBubbleSystem() {
  if (detailBubblesStarted) return;
  detailBubblesStarted = true;

  for (let i = 0; i < 25; i++) {
    setTimeout(() => createBubble('detailBubbleContainer'), i * 120);
  }

  setTimeout(() => {
    setInterval(() => createBubble('detailBubbleContainer'), 900);
  }, 25 * 120 + 200);
}

/**
 * Starts each bubble layer once for the lifetime of the app.
 * Navigation only changes which layer is visible, so existing bubbles keep
 * their animation phase instead of restarting from the bottom of the screen.
 */
function initializeBubbles() {
  startHomeBubbleSystem();
  startDetailBubbleSystem();
  showHomeBubbles();
}

function setBubbleLayerVisibility(containerId, isVisible) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.classList.toggle('bubble-layer-visible', isVisible);
  container.classList.toggle('bubble-layer-hidden', !isVisible);
}

function showHomeBubbles() {
  setBubbleLayerVisibility('bubbleContainer', true);
  setBubbleLayerVisibility('detailBubbleContainer', false);
}

function showDetailBubbles() {
  setBubbleLayerVisibility('bubbleContainer', false);
  setBubbleLayerVisibility('detailBubbleContainer', true);
}

function startBubbles() {
  startHomeBubbleSystem();
  showHomeBubbles();
}

function startDetailBubbles() {
  startDetailBubbleSystem();
  showDetailBubbles();
}
