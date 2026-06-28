// ============================================================
// CARDS
// Clones the #card-template for each species and fills in data.
// All HTML structure lives in index.html; this file only
// touches values (src, textContent, classList).
// Depends on: data.js
// ============================================================

/**
 * Builds one card by cloning the template and filling in species data.
 * @param {Object} species
 * @returns {DocumentFragment}
 */
function createSpeciesCard(species) {
  const template = document.getElementById('card-template');
  const clone = template.content.cloneNode(true);


  
  const imageUrl = species.speciesImage || '';
  const gradient = getGradientForColor(species.color);
  const border = species.borderColor || 'border-white';

  // Connect each card to its detail view.
  const card = clone.querySelector('.species-card');
  card.addEventListener('click', () => showDetail(species.id));

  // Apply the image circle gradient and border color.
  const icon = clone.querySelector('.card-icon');
  icon.classList.add('bg-gradient-to-br', ...gradient.split(' '), border);

  // Species image with emoji fallback
  const img = clone.querySelector('.card-img');
  const emoji = clone.querySelector('.card-emoji');
  img.src = imageUrl;
  img.alt = species.name;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    emoji.style.display = 'block';
  });
  emoji.textContent = species.emoji;

// Put the scientific name on a new line and style it separately.
const nameEl = clone.querySelector('.card-name');
nameEl.innerHTML = species.name.replace(
    /\(([^)]+)\)/,
    '<br><span class="scientific-name">($1)</span>'
);

return clone;
}

/**
 * Renders all species cards into the #homeView grid.
 */
function renderSpeciesCards() {
  const homeView = document.getElementById('homeView');
  homeView.innerHTML = '';
  algaeSpecies.forEach(species => homeView.appendChild(createSpeciesCard(species)));
}
