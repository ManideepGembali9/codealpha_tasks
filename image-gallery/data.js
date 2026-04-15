// ── IMAGE DATA ──
// Using picsum.photos with seeds for consistent, beautiful AI-like photos
const galleryData = [
  // NATURE
  { id: 1,  title: "Misty Forest Dawn",       category: "nature",       seed: 10,  desc: "Ancient trees emerge from morning fog in a primordial forest." },
  { id: 2,  title: "Arctic Aurora",           category: "nature",       seed: 20,  desc: "Northern lights dance above a frozen tundra landscape." },
  { id: 3,  title: "Desert Dunes",            category: "nature",       seed: 30,  desc: "Wind-sculpted sand dunes stretch into the horizon at golden hour." },
  { id: 4,  title: "Bioluminescent Shore",    category: "nature",       seed: 40,  desc: "Glowing waves crash on a dark beach under a starlit sky." },
  { id: 5,  title: "Volcanic Eruption",       category: "nature",       seed: 50,  desc: "Lava flows meet ocean water in an explosive encounter." },
  { id: 6,  title: "Waterfall Veil",          category: "nature",       seed: 60,  desc: "A silken waterfall plunges into a turquoise jungle pool." },
  { id: 7,  title: "Cherry Blossom Storm",    category: "nature",       seed: 70,  desc: "Petals swirl through the air in a sakura snowstorm." },
  { id: 8,  title: "Glacier Bay",             category: "nature",       seed: 80,  desc: "Electric blue ice cliffs tower above frigid arctic waters." },
  { id: 9,  title: "Monsoon Lightning",       category: "nature",       seed: 90,  desc: "Jagged lightning forks over a rain-soaked savanna." },

  // ARCHITECTURE
  { id: 10, title: "Brutalist Cathedral",     category: "architecture", seed: 101, desc: "Raw concrete cathedral soars against a dramatic sky." },
  { id: 11, title: "Floating City",           category: "architecture", seed: 111, desc: "A vertical metropolis levitates above the clouds." },
  { id: 12, title: "Ancient Ziggurat",        category: "architecture", seed: 121, desc: "Moss-covered stepped pyramid rises from a jungle clearing." },
  { id: 13, title: "Glass Spire",             category: "architecture", seed: 131, desc: "Crystalline tower reflects a blood-orange sunset." },
  { id: 14, title: "Underground Temple",      category: "architecture", seed: 141, desc: "Carved stone chambers glow with sacred light." },
  { id: 15, title: "Orbital Station",         category: "architecture", seed: 151, desc: "Modular space habitat orbits a distant blue world." },
  { id: 16, title: "Desert Monastery",        category: "architecture", seed: 161, desc: "White-domed structures cling to sandstone cliffs." },
  { id: 17, title: "Underwater Dome",         category: "architecture", seed: 171, desc: "A submerged glass sphere houses an entire city." },
  { id: 18, title: "Neon Pagoda",             category: "architecture", seed: 181, desc: "Traditional pagoda transformed by cyberpunk lighting." },

  // PORTRAIT
  { id: 19, title: "Celestial Guardian",      category: "portrait",     seed: 202, desc: "A figure cloaked in starlight stands at the edge of time." },
  { id: 20, title: "Forest Witch",            category: "portrait",     seed: 212, desc: "A mysterious sage communes with ancient woodland spirits." },
  { id: 21, title: "Chrome Samurai",          category: "portrait",     seed: 222, desc: "Futuristic warrior clad in liquid metal armor." },
  { id: 22, title: "Desert Oracle",           category: "portrait",     seed: 232, desc: "A veiled seer gazes into the infinite sands of time." },
  { id: 23, title: "Bioluminescent Diver",    category: "portrait",     seed: 242, desc: "A diver glows with marine light in abyssal darkness." },
  { id: 24, title: "Arctic Shaman",           category: "portrait",     seed: 252, desc: "A spirit caller adorned with frost and bone totems." },
  { id: 25, title: "Quantum Alchemist",       category: "portrait",     seed: 262, desc: "A scientist surrounded by swirling quantum phenomena." },
  { id: 26, title: "Volcanic Empress",        category: "portrait",     seed: 272, desc: "A ruler crowned with obsidian and liquid fire." },
  { id: 27, title: "Rain Dancer",             category: "portrait",     seed: 282, desc: "A figure lost in motion beneath a monsoon downpour." },

  // COSMOS
  { id: 28, title: "Nebula Cradle",           category: "cosmos",       seed: 303, desc: "New stars ignite within a vast interstellar gas cloud." },
  { id: 29, title: "Black Hole Event",        category: "cosmos",       seed: 313, desc: "Light bends catastrophically around a stellar singularity." },
  { id: 30, title: "Pulsar Storm",            category: "cosmos",       seed: 323, desc: "Magnetar beams sweep through a field of asteroids." },
  { id: 31, title: "Galactic Collision",      category: "cosmos",       seed: 333, desc: "Two spiral galaxies merge in slow cosmic violence." },
  { id: 32, title: "Europa Ocean",            category: "cosmos",       seed: 343, desc: "Alien ocean churns beneath the ice shell of Europa." },
  { id: 33, title: "Comet Trail",             category: "cosmos",       seed: 353, desc: "A sungrazer blazes across the inner solar system." },
  { id: 34, title: "Dark Matter Web",         category: "cosmos",       seed: 363, desc: "The invisible scaffold of the universe revealed." },
  { id: 35, title: "Quasar Jet",              category: "cosmos",       seed: 373, desc: "Relativistic plasma jets fire from a distant quasar." },
  { id: 36, title: "Lunar Prism",             category: "cosmos",       seed: 383, desc: "Moonlight diffracts through atmospheric ice crystals." },

  // ABSTRACT
  { id: 37, title: "Fractal Depths",          category: "abstract",     seed: 404, desc: "Infinite recursive geometry dissolves into color." },
  { id: 38, title: "Quantum Foam",            category: "abstract",     seed: 414, desc: "The seething substrate of spacetime visualized." },
  { id: 39, title: "Neural Bloom",            category: "abstract",     seed: 424, desc: "Synaptic firings bloom like flowers in digital space." },
  { id: 40, title: "Chromatic Flux",          category: "abstract",     seed: 434, desc: "Pure color and form collide in an explosion of sensation." },
  { id: 41, title: "Time Crystal",            category: "abstract",     seed: 444, desc: "A phase of matter that repeats in time, not space." },
  { id: 42, title: "Tessellation Storm",      category: "abstract",     seed: 454, desc: "Geometric tiles multiply and warp across the canvas." },
  { id: 43, title: "Void Bloom",              category: "abstract",     seed: 464, desc: "Organic shapes emerge from the emptiness of dark space." },
  { id: 44, title: "Data River",              category: "abstract",     seed: 474, desc: "Information flows in luminous streams of pure data." },
  { id: 45, title: "Topological Knot",        category: "abstract",     seed: 484, desc: "A surface with no inside or outside twists endlessly." },

  // FANTASY
  { id: 46, title: "Dragon Kingdom",          category: "fantasy",      seed: 505, desc: "Ancient dragons circle a fortress built from their bones." },
  { id: 47, title: "Elven Archives",          category: "fantasy",      seed: 515, desc: "A vast library of living wood holds all written knowledge." },
  { id: 48, title: "Storm Citadel",           category: "fantasy",      seed: 525, desc: "Lightning-powered towers jut above the permanent storm." },
  { id: 49, title: "Ocean Leviathan",         category: "fantasy",      seed: 535, desc: "An ancient sea creature surfaces beneath a wooden ship." },
  { id: 50, title: "Sky Whale",               category: "fantasy",      seed: 545, desc: "Colossal creatures drift peacefully through cloud cities." },
  { id: 51, title: "Crystal Caves",           category: "fantasy",      seed: 555, desc: "Gem-encrusted caverns pulse with inner magical light." },
  { id: 52, title: "Undead Armada",           category: "fantasy",      seed: 565, desc: "Ghost ships sail an ocean of souls toward the horizon." },
  { id: 53, title: "Phoenix Rising",          category: "fantasy",      seed: 575, desc: "A firebird is reborn from its own smoldering ashes." },
  { id: 54, title: "Moonlit Werewolf",        category: "fantasy",      seed: 585, desc: "A shapeshifter howls atop a crag beneath a bloated moon." },
];

// Build image URL from seed
function imgUrl(seed, w = 600, h = 450) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
