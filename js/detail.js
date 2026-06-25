// ============================================================
// DETAIL VIEW
// Handles showing/hiding the species detail panel and the
// fullscreen image modal.
// Depends on: data.js, bubbles.js
// ============================================================

/**
 * Builds and displays the detail view for a given species ID
 * @param {number} speciesId
 */
function showDetail(speciesId) {
  const species = algaeSpecies.find(s => s.id === speciesId);
  if (!species) return;

  const imageUrl = getSpeciesImage(species.id);
  const gradient = gradients[species.color];

  document.getElementById('detailContent').innerHTML = buildDetailHTML(species, imageUrl, gradient);

  const detailView = document.getElementById('detailView');
  const homeView   = document.getElementById('homeView');

  detailView.classList.remove('hidden');
  detailView.classList.add('overlay-fade-in');
  homeView.classList.add('hidden');

  startDetailBubbles();
}

/**
 * Returns to the home grid from the detail view, with closing animation
 */
function showHome() {
  const detailView    = document.getElementById('detailView');
  const homeView      = document.getElementById('homeView');
  const detailContent = document.querySelector('.detail-view');

  detailView.classList.remove('overlay-fade-in');
  detailView.classList.add('overlay-fade-out');

  if (detailContent) {
    detailContent.classList.remove('detail-view');
    detailContent.classList.add('detail-view-closing');
  }

  stopDetailBubbles();

  setTimeout(() => {
    detailView.classList.add('hidden');
    detailView.classList.remove('overlay-fade-out');
    homeView.classList.remove('hidden');

    if (detailContent) {
      detailContent.classList.remove('detail-view-closing');
      detailContent.classList.add('detail-view');
    }
  }, 400);
}

// ============================================================
// FULLSCREEN MODAL
// ============================================================

/**
 * Opens the fullscreen image modal
 * @param {string} imageSrc - Image URL
 * @param {string} caption  - Caption / alt text
 */
function openFullscreen(imageSrc, caption) {
  const modal   = document.getElementById('fullscreenModal');
  const image   = document.getElementById('fullscreenImage');
  const capEl   = document.getElementById('fullscreenCaption');

  image.src     = imageSrc;
  image.alt     = caption;
  capEl.textContent = caption;

  image.style.cssText = '';
  image.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl';

  modal.classList.remove('hidden');
  modal.classList.add('fullscreen-fade-in');

  document.body.style.overflow = 'hidden';
}

/**
 * Closes the fullscreen image modal
 */
function closeFullscreen() {
  const modal = document.getElementById('fullscreenModal');

  modal.classList.remove('fullscreen-fade-in');
  modal.classList.add('fullscreen-fade-out');

  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('fullscreen-fade-out');
    document.body.style.overflow = 'auto';
  }, 250);
}

/**
 * Attaches close button and keyboard/backdrop listeners to the modal
 */
function initFullscreen() {
  const closeButton = document.getElementById('closeFullscreen');
  const modal       = document.getElementById('fullscreenModal');

  closeButton.addEventListener('click', closeFullscreen);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeFullscreen();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeFullscreen();
    }
  });
}

// ============================================================
// DETAIL HTML BUILDER
// Kept here so detail.js is self-contained
// ============================================================

/**
 * Builds the inner HTML string for the detail content panel
 * @param {Object} species
 * @param {string} imageUrl
 * @param {string} gradient  - Tailwind gradient classes string
 * @returns {string} HTML string
 */
function buildDetailHTML(species, imageUrl, gradient) {
  const characteristicItems = species.characteristics.map((char, i) => `
    <li class="flex items-start group">
      <span class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mr-2 flex items-center justify-center text-white text-xs md:text-sm font-bold mt-0.5 group-hover:scale-110 transition-transform shadow-md flex-shrink-0">${i + 1}</span>
      <span class="text-gray-800 group-hover:text-gray-900 transition-colors font-medium flex-1 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-snug">${char}</span>
    </li>
  `).join('');

  const useItems = species.uses.map((use, i) => `
    <li class="flex items-start group">
      <span class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2 flex items-center justify-center text-white text-xs md:text-sm font-bold mt-0.5 group-hover:scale-110 transition-transform shadow-md flex-shrink-0">${i + 1}</span>
      <span class="text-gray-800 group-hover:text-gray-900 transition-colors font-medium flex-1 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-snug">${use}</span>
    </li>
  `).join('');

  return `
    <div class="h-full flex flex-col">

      <!-- Header: image + species name + habitat/size tags -->
      <div class="flex-shrink-0 relative h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-br ${gradient} flex items-center overflow-hidden">
        <div class="absolute inset-0 bg-black bg-opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

        <div class="relative z-10 flex items-center w-full px-3 sm:px-4 md:px-8">
          <div class="flex items-center flex-col sm:flex-row flex-1 gap-3 sm:gap-4 md:gap-10">

            <!-- Clickable species image -->
            <div class="relative">
              <div class="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 sm:border-6 border-white/50 shadow-2xl overflow-hidden bg-white/15 backdrop-blur-sm transform hover:scale-110 transition-transform duration-300 ring-4 ring-white/20 cursor-pointer group"
                   onclick="openFullscreen('${imageUrl}', '${species.name}')">
                <img src="${imageUrl}" alt="${species.name}"
                     class="w-full h-full object-cover scale-125 group-hover:brightness-110 transition-all duration-300"
                     loading="lazy">
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-full">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </div>
              </div>
              <div class="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-medium border border-white/30 shadow-lg whitespace-nowrap">
                  Tap the image to view up close
                </div>
              </div>
            </div>

            <!-- Species name and tags -->
            <div class="text-white flex-1">
              <h2 class="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 drop-shadow-lg">${species.name}</h2>
              <div class="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm md:text-base flex-wrap">
                <span class="bg-white/25 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full font-medium border border-white/20 shadow-lg">📍 ${species.habitat}</span>
                <span class="bg-white/25 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full font-medium border border-white/20 shadow-lg">📏 ${species.size}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative animated dots -->
        <div class="absolute top-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
        <div class="absolute top-16 right-12 w-2 h-2 bg-white/50 rounded-full animate-ping" style="animation-delay:1s;"></div>
        <div class="absolute bottom-12 left-16 w-4 h-4 bg-white/30 rounded-full animate-ping" style="animation-delay:2s;"></div>
        <div class="absolute bottom-6 right-6 w-2 h-2 bg-white/45 rounded-full animate-ping" style="animation-delay:0.5s;"></div>
      </div>

      <!-- Three info columns -->
      <div class="flex-1 p-2 sm:p-3 md:p-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden touch-none">
        <div class="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">

          <!-- About -->
          <div class="bg-white rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-gray-200 relative overflow-visible transform hover:scale-105 transition-all duration-300 min-h-full flex flex-col"
               style="box-shadow:0 10px 25px rgba(0,0,0,0.1),0 4px 10px rgba(0,0,0,0.04);">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>
            <div class="relative z-10 flex flex-col h-full">
              <h3 class="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center flex-shrink-0">
                <span class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r ${gradient} rounded-full mr-2 md:mr-3 flex items-center justify-center text-white text-xs md:text-base shadow-lg">ℹ️</span>
                <span class="line-clamp-1">About This Species</span>
              </h3>
              <div class="flex-1 overflow-hidden">
                <p class="text-gray-800 font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">${species.description}</p>
              </div>
            </div>
          </div>

          <!-- Key Characteristics -->
          <div class="bg-white rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-gray-200 relative overflow-visible transform hover:scale-105 transition-all duration-300 min-h-full flex flex-col"
               style="box-shadow:0 10px 25px rgba(0,0,0,0.1),0 4px 10px rgba(0,0,0,0.04);">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-teal-50 opacity-40"></div>
            <div class="relative z-10 flex flex-col h-full">
              <h3 class="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center flex-shrink-0">
                <span class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mr-2 md:mr-3 flex items-center justify-center text-white text-xs md:text-base shadow-lg">🔬</span>
                <span class="line-clamp-1">Key Characteristics</span>
              </h3>
              <div class="flex-1 overflow-hidden">
                <ul class="space-y-2 sm:space-y-3 md:space-y-4 w-full">${characteristicItems}</ul>
              </div>
            </div>
          </div>

          <!-- Common Uses -->
          <div class="bg-white rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-gray-200 relative overflow-visible transform hover:scale-105 transition-all duration-300 min-h-full flex flex-col"
               style="box-shadow:0 10px 25px rgba(0,0,0,0.1),0 4px 10px rgba(0,0,0,0.04);">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 opacity-40"></div>
            <div class="relative z-10 flex flex-col h-full">
              <h3 class="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center flex-shrink-0">
                <span class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2 md:mr-3 flex items-center justify-center text-white text-xs md:text-base shadow-lg">🌟</span>
                <span class="line-clamp-1">Common Uses</span>
              </h3>
              <div class="flex-1 overflow-hidden">
                <ul class="space-y-2 sm:space-y-3 md:space-y-4 w-full">${useItems}</ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}
