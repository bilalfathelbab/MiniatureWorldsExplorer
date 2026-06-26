// ============================================================
// BUBBLES
// Manages the floating bubble background animation on both
// the home view and the detail view.
// ============================================================

// Interval reference so detail bubbles can be stopped when leaving the view
let detailBubbleInterval = null;

/**
 * Creates a single bubble element and appends it to a container.
 * The bubble removes itself from the DOM after its animation ends.
 * @param {string} containerId - ID of the container element
 */
function createBubble(containerId = 'bubbleContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  // Random size between 10px and 50px
  const size = Math.random() * 40 + 10;
  bubble.style.width  = size + 'px';
  bubble.style.height = size + 'px';

  // Random horizontal start position
  bubble.style.left = Math.random() * 100 + '%';

  // Random animation duration between 8s and 15s
  bubble.style.animationDuration = (Math.random() * 7 + 8) + 's';

  container.appendChild(bubble);

  // Clean up after animation to prevent DOM bloat
  setTimeout(() => {
    if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
  }, 15000);
}

/**
 * Starts bubble generation for the home screen.
 * Creates an initial burst then a steady trickle.
 */
function startBubbles() {
  // Initial burst
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createBubble('bubbleContainer'), i * 150);
  }

  // Steady trickle
  setInterval(() => {
    createBubble('bubbleContainer');
  }, Math.random() * 600 + 400);
}

/**
 * Starts bubble generation for the detail view.
 * Clears any leftover bubbles from a previous visit first.
 */
function startDetailBubbles() {
  const container = document.getElementById('detailBubbleContainer');
  if (container) container.innerHTML = '';

  // Initial burst
  for (let i = 0; i < 25; i++) {
    setTimeout(() => createBubble('detailBubbleContainer'), i * 120);
  }

  // Steady trickle
  detailBubbleInterval = setInterval(() => {
    createBubble('detailBubbleContainer');
  }, Math.random() * 700 + 500);
}

/**
 * Stops the detail view bubble generation and clears the container.
 * Called when navigating back to the home grid.
 */
function stopDetailBubbles() {
  if (detailBubbleInterval) {
    clearInterval(detailBubbleInterval);
    detailBubbleInterval = null;
  }

  const container = document.getElementById('detailBubbleContainer');
  if (container) {
    setTimeout(() => { container.innerHTML = ''; }, 500);
  }
}
