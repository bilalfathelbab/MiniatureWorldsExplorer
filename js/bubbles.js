// ============================================================
// BUBBLES
// ============================================================

let detailBubbleInterval = null;
let homeBubbleInterval = null;
let homeBubbleTimeouts = [];
let detailBubbleTimeouts = [];

function clearBubbleTimers(timerIds) {
  timerIds.forEach(id => clearTimeout(id));
  timerIds.length = 0;
}

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

function stopHomeBubbles() {
  if (homeBubbleInterval) {
    clearInterval(homeBubbleInterval);
    homeBubbleInterval = null;
  }
  clearBubbleTimers(homeBubbleTimeouts);
}

function stopDetailBubbles() {
  if (detailBubbleInterval) {
    clearInterval(detailBubbleInterval);
    detailBubbleInterval = null;
  }
  clearBubbleTimers(detailBubbleTimeouts);
  const container = document.getElementById('detailBubbleContainer');
  if (container) {
    container.querySelectorAll('.bubble').forEach(b => b.classList.add('bubble-removing'));
    setTimeout(() => { if (container) container.innerHTML = ''; }, 400);
  }
}

function startBubbles() {
  stopHomeBubbles();
  for (let i = 0; i < 30; i++) {
    const id = setTimeout(() => createBubble('bubbleContainer'), i * 150);
    homeBubbleTimeouts.push(id);
  }
  const trickleId = setTimeout(() => {
    homeBubbleInterval = setInterval(() => createBubble('bubbleContainer'), 800);
  }, 30 * 150 + 200);
  homeBubbleTimeouts.push(trickleId);
}

function startDetailBubbles() {
  stopDetailBubbles();
  for (let i = 0; i < 25; i++) {
    const id = setTimeout(() => createBubble('detailBubbleContainer'), i * 120);
    detailBubbleTimeouts.push(id);
  }
  const trickleId = setTimeout(() => {
    detailBubbleInterval = setInterval(() => createBubble('detailBubbleContainer'), 900);
  }, 25 * 120 + 200);
  detailBubbleTimeouts.push(trickleId);
}