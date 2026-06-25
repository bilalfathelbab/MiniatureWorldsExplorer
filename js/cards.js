// ============================================================
// CARDS
// Builds HTML for the home grid species cards
// Depends on: data.js (algaeSpecies, gradients, borderColors, getSpeciesImage)
// ============================================================

/**
 * Creates the HTML string for a single species card
 * @param {Object} species - A species object from algaeSpecies
 * @returns {string} HTML string
 */
function createAlgaeCard(species) {
  const imageUrl = getSpeciesImage(species.id);
  const gradient = gradients[species.color];
  const border = borderColors[species.id];

  // Format name so the scientific name in brackets is italicised
  const formattedName = species.name.replace(/\(([^)]+)\)/, '<em>($1)</em>');

  return `
    <div class="algae-card rounded-xl shadow-lg p-3 md:p-5 cursor-pointer border-2 border-transparent hover:border-white/30"
         onclick="showDetail(${species.id})">
      <div class="text-center h-full flex flex-col items-center justify-center">
        <div class="circle-icon bg-gradient-to-br ${gradient} rounded-full mx-auto mb-2 md:mb-4 flex items-center justify-center text-3xl md:text-6xl shadow-lg overflow-hidden border-4 ${border}">
          <img
            src="${imageUrl}"
            alt="${species.name}"
            class="w-full h-full object-cover rounded-full scale-125"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          >
          <span style="display:none;">${species.emoji}</span>
        </div>
        <h3 class="text-sm md:text-xl lg:text-2xl font-bold leading-tight line-clamp-2"
            style="font-family: 'Arial Black', Arial, sans-serif; color: #d5e042;">
          ${formattedName}
        </h3>
      </div>
    </div>
  `;
}

/**
 * Renders all species cards into the #homeView grid
 */
function renderCards() {
  const homeView = document.getElementById('homeView');
  homeView.innerHTML = algaeSpecies.map(createAlgaeCard).join('');
}
