// ============================================================
// SPECIES DATA
// All organism data: descriptions, characteristics, and uses
// ============================================================

const algaeSpecies = [
  {
    id: 1,
    name: "Diatom (Bacillariophyceae)",
    emoji: "💎",
    color: "bg-amber-500",
    habitat: "Aquatic environments",
    size: "Unicellular",
    description: "Diatoms are golden-brown unicellular algae with silica, or glass-like, cell walls. They are essential for ecological balance and have significant industrial, biomedical, and agricultural applications. Their unique properties make them valuable across multiple sectors, contributing to sustainability and environmental health.",
    characteristics: [
      "Golden-brown coloration",
      "Silica (glass-like) cell walls",
      "Unicellular structure",
      "Essential for ecological balance"
    ],
    uses: [
      "Industrial applications",
      "Biomedical uses",
      "Agricultural applications",
      "Environmental sustainability"
    ]
  },
  {
    id: 2,
    name: "Green Algae (Ulvophyceae)",
    emoji: "🟢",
    color: "bg-green-500",
    habitat: "Freshwater, saltwater, land",
    size: "Unicellular to multicellular",
    description: "Green algae are a diverse group of photosynthetic organisms found in freshwater, saltwater, and even on land. They can be unicellular or multicellular. They play a crucial role as primary producers in ecosystems, forming the base of many food webs. Green algae are also useful in several industries, including fertilizer production, wastewater treatment, biofuel development, and construction materials.",
    characteristics: [
      "Diverse photosynthetic organisms",
      "Can be unicellular or multicellular",
      "Primary producers in ecosystems",
      "Form base of many food webs"
    ],
    uses: [
      "Fertilizer production",
      "Wastewater treatment",
      "Biofuel development",
      "Construction materials"
    ]
  },
  {
    id: 3,
    name: "Flatworms (Platyhelminthes sp.)",
    emoji: "🪱",
    color: "bg-orange-500",
    habitat: "Wet soil, saltwater, freshwater",
    size: "Microscopic to 130 feet",
    description: "Flatworms live in wet soil, saltwater, and freshwater habitats, with some species living parasitically inside other animals. They range in size from microscopic to 130 feet (40 meters) long. Flatworms have remarkable regenerative abilities: when cut in half, each half can grow into a new individual. They help decompose organic matter and recycle nutrients back into their environment.",
    characteristics: [
      "Remarkable regenerative abilities",
      "Can regenerate from cut pieces",
      "Wide size range variation",
      "Some species are parasitic"
    ],
    uses: [
      "Decompose organic matter",
      "Recycle nutrients in environment",
      "Scientific research subjects",
      "Ecological balance maintenance"
    ]
  },
  {
    id: 4,
    name: "Seed Shrimp (Ostracoda sp.)",
    emoji: "🌰",
    color: "bg-blue-500",
    habitat: "Ocean floors, freshwater",
    size: "Microscopic",
    description: "Ostracods are small relatives of shrimp named for their shell that goes over them like a seed. They make up a lot of the bottom of the food chain in the ocean and are eaten by everything from baby fish to giant whale sharks. These seed shrimp have been found in fossils dated to over 200 million years old.",
    characteristics: [
      "Oval shaped bodies",
      "Fast moving",
      "Form the base of marine food chains",
      "Eat algae, bacteria, and other microscopic creatures"
    ],
    uses: [
      "Fossil ageing",
      "Water quality assessments",
      "Fish food",
      "Toxicology research"
    ]
  },
  {
    id: 5,
    name: "Ciliate (Ciliophora sp.)",
    emoji: "🔬",
    color: "bg-purple-500",
    habitat: "Wherever water exists",
    size: "Microscopic",
    description: "Ciliates are tiny single-celled protists found wherever water exists. They are common in both freshwater and saltwater environments and play important ecological roles. Inside the stomachs of ruminants such as goats, sheep, and cows, ciliates help with digestion.",
    characteristics: [
      "Single-celled protists",
      "Found wherever water exists",
      "Important ecological roles",
      "Help with ruminant digestion"
    ],
    uses: [
      "Digestive aid in ruminants",
      "Ecological balance",
      "Water quality indicators",
      "Scientific research"
    ]
  },
  {
    id: 6,
    name: "Java Moss (Hypnaceae)",
    emoji: "🌿",
    color: "bg-red-500",
    habitat: "Southeast Asia, river rocks and logs",
    size: "Small green leaves in clumps",
    description: "Java moss is a common plant in the aquarium hobby used to give fish hiding spots and to clean water. It is easy to grow and maintain and holds onto food to feed creatures like shrimp and snails. It is found in Southeast Asia growing in rivers on rocks and logs.",
    characteristics: [
      "Small green leaves",
      "Grows in clumps or strings",
      "Hardy in different ecosystems",
      "Thick growth supports fish and shrimp"
    ],
    uses: [
      "Aquarium cover",
      "Fish food",
      "Baby fish nursery",
      "Water cleaner"
    ]
  },
  {
    id: 7,
    name: "Rotifer (Rotifera sp.)",
    emoji: "⚙️",
    color: "bg-teal-500",
    habitat: "Freshwater, less often saltwater",
    size: "Microscopic to near-microscopic",
    description: "Rotifers are microscopic or near-microscopic animals commonly found in freshwater and less often in saltwater. They feed on dead bacteria and algae and are often added to aquariums to help keep water clean and clear. Rotifers are highly resilient—scientists have revived frozen specimens that were over 24,000 years old.",
    characteristics: [
      "Microscopic animals",
      "Feed on dead bacteria and algae",
      "Highly resilient organisms",
      "Can survive freezing for millennia"
    ],
    uses: [
      "Aquarium water cleaning",
      "Water clarity maintenance",
      "Scientific research",
      "Longevity studies"
    ]
  },
  {
    id: 8,
    name: "Nematode (Nematode sp.)",
    emoji: "🐛",
    color: "bg-yellow-600",
    habitat: "Soil, freshwater, saltwater",
    size: "Microscopic to 30 feet",
    description: "Nematodes are invertebrate animals that live in soil, freshwater, saltwater, and sometimes parasitically inside other animals. They range in size from microscopic to nearly 30 feet (9 meters) long. They are the most common animals on Earth, making up about 80% of all animal species. They play a vital role in ecosystems by breaking down and recycling nutrients in soil, supporting plant and fungal growth.",
    characteristics: [
      "Most common animals on Earth",
      "Make up 80% of all animal species",
      "Extreme size variation",
      "Some parasitic, others free-living"
    ],
    uses: [
      "Nutrient recycling in soil",
      "Support plant growth",
      "Support fungal growth",
      "Ecosystem maintenance"
    ]
  }
];

// ============================================================
// LOOKUP MAPS
// ============================================================

// Maps color class names to Tailwind gradient classes
const gradients = {
  'bg-amber-500':  'from-cyan-400 via-cyan-500 to-blue-600',
  'bg-green-500':  'from-emerald-400 via-green-500 to-teal-600',
  'bg-orange-500': 'from-teal-400 via-teal-500 to-cyan-600',
  'bg-blue-500':   'from-blue-400 via-blue-500 to-indigo-600',
  'bg-purple-500': 'from-indigo-400 via-purple-500 to-blue-600',
  'bg-red-500':    'from-sky-400 via-blue-500 to-cyan-600',
  'bg-teal-500':   'from-emerald-400 via-teal-500 to-green-600',
  'bg-yellow-600': 'from-cyan-400 via-sky-500 to-blue-600'
};

// Maps species ID to image URL
const speciesImages = {
  1: "images/Diatom.png",
  2: "images/Green algae.png",
  3: "images/Flat Worm.png",
  4: "images/Ostracod.png",
  5: "images/Ciliate.png",
  6: "images/Java Moss.png",
  7: "images/Rotifer.png",
  8: "images/Nematode.png"
};

// Maps species ID to border color class
const borderColors = {
  1: 'border-amber-300',
  2: 'border-yellow-300',
  3: 'border-purple-300',
  4: 'border-amber-300',
  5: 'border-lime-300',
  6: 'border-orange-300',
  7: 'border-purple-300',
  8: 'border-green-300'
};

/**
 * Returns the image URL for a given species ID
 * @param {number} speciesId
 * @returns {string}
 */
function getSpeciesImage(speciesId) {
  return speciesImages[speciesId] || '';
}
