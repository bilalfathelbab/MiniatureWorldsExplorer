// ============================================================
// BUBBLES
// Manages the floating bubble background animation on both
// the home view and the detail view.
// ============================================================

// Interval references so bubble generation can be stopped cleanly
let detailBubbleInterval = null;
let homeBubbleInterval = null;
let homeBubbleTimeouts = [];
let detailBubbleTimeouts = [];

function clearBubbleTimers(timerIds) {
  timerIds.forEach((timerId) => clearTimeout(timerId));
  timerIds.length = 0;
}

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

  const size = Math.random() * 40 + 10;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = Math.random() * 100 + '%';

  const duration = Math.random() * 7 + 8;
  bubble.style.animation = `bubbleFloat ${duration}s ease-in-out`;

  // Remove exactly when animation ends — no timing gap
  bubble.addEventListener('animationend', () => {
    bubble.remove();
  }, { once: true });

  container.appendChild(bubble);
}

function stopHomeBubbles() {
  if (homeBubbleInterval) {
    clearInterval(homeBubbleInterval);
    homeBubbleInterval = null;
  }

  clearBubbleTimers(homeBubbleTimeouts);
}

/**
 * Starts bubble generation for the home screen.
 * Creates an initial burst then a steady trickle.
 */
function startBubbles() {
  stopHomeBubbles();

  for (let i = 0; i < 30; i++) {
    const id = setTimeout(() => createBubble('bubbleContainer'), i * 150);
    homeBubbleTimeouts.push(id);
  }

  const trickleStartId = setTimeout(() => {
    homeBubbleInterval = setInterval(() => createBubble('bubbleContainer'), 800);
  }, 30 * 150 + 200);

  homeBubbleTimeouts.push(trickleStartId);
}g

/**
 * Starts bubble generation for the detail view.
 * Clears any leftover bubbles from a previous visit first.
 */
function startBubbles() {
  stopHomeBubbles();

  // Initial burst — track each timeout so stop() can cancel them
  for (let i = 0; i < 30; i++) {
    const id = setTimeout(() => createBubble("bubbleContainer"), i * 150);
    homeBubbleTimeouts.push(id); // ← was missing
  }

  // Delay the trickle until AFTER the burst finishes (~4.5s + buffer)
  const trickleStartId = setTimeout(
    () => {
      homeBubbleInterval = setInterval(() => {
        createBubble("bubbleContainer");
      }, 800); // ← fixed rate, not random (random causes drift)
    },
    30 * 150 + 200,
  ); // start trickle after burst completes

  homeBubbleTimeouts.push(trickleStartId);
}

function startDetailBubbles() {
  // Same pattern — stop first, track burst timeouts, delay trickle
  stopDetailBubbles();

  for (let i = 0; i < 25; i++) {
    const id = setTimeout(() => createBubble("detailBubbleContainer"), i * 120);
    detailBubbleTimeouts.push(id); // ← was missing
  }

  const trickleStartId = setTimeout(
    () => {
      detailBubbleInterval = setInterval(() => {
        createBubble("detailBubbleContainer");
      }, 900);
    },
    25 * 120 + 200,
  );

  detailBubbleTimeouts.push(trickleStartId);
}
clearBubbleTimers(detailBubbleTimeouts);

const container = document.getElementById("detailBubbleContainer");
if (container) {
  container.querySelectorAll(".bubble").forEach((bubble) => {
    bubble.classList.add("bubble-removing");
  });

  setTimeout(() => {
    if (container) container.innerHTML = "";
  }, 400);
}
