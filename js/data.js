// ============================================================
// JSON DATA LOADER
// Load all species records from JSON files and the gradient lookup.
// ============================================================

const speciesFiles = [
  'common/diatom.json',
  'common/greenAlgae.json',
  'common/flatworms.json',
  'common/seedShrimp.json',
  'common/ciliate.json',
  'common/javaMoss.json',
  'common/rotifer.json',
  'common/nematode.json'
];

const gradientsFile = 'common/gradients.json';

let algaeSpecies = [];
let gradients = {};

/**
 * Fetches JSON content from a file and returns parsed data.
 * @param {string} path
 * @returns {Promise<any>}
 */
async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Loads species JSON and gradient lookups before rendering the app.
 * @returns {Promise<void>}
 */
async function loadSpeciesData() {
  const [speciesRecords, gradientMap] = await Promise.all([
    Promise.all(speciesFiles.map(fetchJson)),
    fetchJson(gradientsFile)
  ]);

  algaeSpecies = speciesRecords
    .filter(record => record && record.id)
    .sort((a, b) => a.id - b.id);

  gradients = gradientMap || {};
}

/**
 * Finds a species object by ID.
 * @param {number} speciesId
 * @returns {Object|undefined}
 */
function getSpeciesById(speciesId) {
  return algaeSpecies.find(s => s.id === speciesId);
}

/**
 * Returns the Tailwind gradient classes for a species color key.
 * @param {string} colorKey
 * @returns {string}
 */
function getGradientForColor(colorKey) {
  return gradients[colorKey] || '';
}
