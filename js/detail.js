// ============================================================
// DETAIL VIEW
// Clones #detail-template and fills it with species data.
// All HTML structure lives in index.html; this file only
// touches values and classes.
// Depends on: data.js, bubbles.js
// ============================================================

/**
 * Clones the detail template, populates it, and shows the detail view.
 * @param {number} speciesId
 */
function showDetail(speciesId) {
  const species = getSpeciesById(speciesId);
  if (!species) return;

  const imageUrl = species.speciesImage;
  const gradient = getGradientForColor(species.color);

  const clone = buildDetailFragment(species, imageUrl, gradient);

  const detailContent = document.getElementById('detailContent');
  detailContent.innerHTML = '';
  detailContent.appendChild(clone);

  const detailView = document.getElementById('detailView');
  const homeView = document.getElementById('homeView');

  detailView.classList.remove('hidden');
  detailView.classList.add('overlay-fade-in');
  homeView.classList.add('hidden');

  startDetailBubbles();
}

/**
 * Returns to the home grid from the detail view with closing animation.
 */
function showHome() {
  const detailView = document.getElementById('detailView');
  const homeView = document.getElementById('homeView');
  const detailContent = document.querySelector('.detail-view');

  detailView.classList.remove('overlay-fade-in');
  detailView.classList.add('overlay-fade-out');

  if (detailContent) {
    detailContent.classList.replace('detail-view', 'detail-view-closing');
  }

  stopDetailBubbles();

  setTimeout(() => {
    detailView.classList.add('hidden');
    detailView.classList.remove('overlay-fade-out');
    homeView.classList.remove('hidden');

    if (detailContent) {
      detailContent.classList.replace('detail-view-closing', 'detail-view');
    }
  }, 400);
}

// ============================================================
// TEMPLATE BUILDER
// ============================================================

/**
 * Clones #detail-template and fills every named slot with species data.
 * @param {Object} species
 * @param {string} imageUrl
 * @param {string} gradient - space-separated Tailwind gradient classes
 * @returns {DocumentFragment}
 */
function buildDetailFragment(species, imageUrl, gradient) {
  const template = document.getElementById('detail-template');
  const clone = template.content.cloneNode(true);

  // Header background gradient.
  const header = clone.querySelector('.detail-header');
  header.classList.add('bg-gradient-to-br', ...gradient.split(' '));

  // Species image.
  const img = clone.querySelector('.detail-img');
  img.src = imageUrl;
  img.alt = species.name;

  // Fullscreen click on image wrapper.
  const imgWrapper = clone.querySelector('.detail-img-wrapper');
  imgWrapper.addEventListener('click', () => openFullscreen(imageUrl, species.name));

  // Name, habitat, and size.
  const title = clone.querySelector('.detail-name');

title.innerHTML = species.name.replace(
    /\(([^)]+)\)/,
    '<span class="detail-scientific-name">($1)</span>'
);
  clone.querySelector('.detail-habitat').textContent = '📍 ' + species.habitat;
  clone.querySelector('.detail-size').textContent = '📏 ' + species.size;

  // About card colors match the species gradient.
  const aboutBar = clone.querySelector('.detail-about-bar');
  const aboutIcon = clone.querySelector('.detail-about-icon');
  aboutBar.classList.add('bg-gradient-to-r', ...gradient.split(' '));
  aboutIcon.classList.add('bg-gradient-to-r', ...gradient.split(' '));

  // Description text.
 const description = clone.querySelector('.detail-description');

description.textContent = species.description;

requestAnimationFrame(() => {
    fitDescription(description);
});

  // Characteristics list.
  const charList = clone.querySelector('.detail-characteristics');
  species.characteristics.forEach((text, i) => {
    charList.appendChild(buildListItem(text, i + 1, 'from-emerald-400 to-teal-500'));
  });

  // Uses list.
  const usesList = clone.querySelector('.detail-uses');
  species.uses.forEach((text, i) => {
    usesList.appendChild(buildListItem(text, i + 1, 'from-blue-400 to-indigo-500'));
  });

  return clone;
}

/**
 * Clones #list-item-template and fills it with a number and text.
 * @param {string} text    - The list item label
 * @param {number} number  - The badge number
 * @param {string} colors  - Tailwind gradient color classes for the badge
 * @returns {DocumentFragment}
 */
function buildListItem(text, number, colors) {
  const template = document.getElementById('list-item-template');
  const clone = template.content.cloneNode(true);

  const badge = clone.querySelector('.item-number');
  badge.textContent = number;
  badge.classList.add('bg-gradient-to-r', ...colors.split(' '));

  clone.querySelector('.item-text').textContent = text;

  return clone;
}

// ============================================================
// FULLSCREEN MODAL
// ============================================================

/**
 * Opens the fullscreen image modal.
 * @param {string} imageSrc
 * @param {string} caption
 */
function openFullscreen(imageSrc, caption) {
  const modal = document.getElementById('fullscreenModal');
  const image = document.getElementById('fullscreenImage');
  const capEl = document.getElementById('fullscreenCaption');

  image.src = imageSrc;
  image.alt = caption;
  capEl.textContent = caption;

  modal.classList.remove('hidden');
  modal.classList.add('fullscreen-fade-in');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the fullscreen image modal.
 */
function closeFullscreen() {
  const modal = document.getElementById('fullscreenModal');
  modal.classList.replace('fullscreen-fade-in', 'fullscreen-fade-out');

  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('fullscreen-fade-out');
    document.body.style.overflow = 'auto';
  }, 250);
}

/**
 * Wires up the close button, backdrop click, and Escape key for the modal.
 */
function initFullscreen() {
  const modal = document.getElementById('fullscreenModal');

  document.getElementById('closeFullscreen')
    .addEventListener('click', closeFullscreen);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeFullscreen();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeFullscreen();
    }
  });
}
