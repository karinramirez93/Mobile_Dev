export const HERO_IMAGES = {
  wizard: require("../../pictures/Heroes/wizard.png"),
  knight: require("../../pictures/Heroes/knight.png"),
};

export const HERO_BASE_STATS = {
  wizard:  { strength: 2, health: 12, magic: 6 },
  knight:  { strength: 5, health: 16, magic: 2 },
  default: { strength: 3, health: 12, magic: 3 },
};

// optional tiny helper
export const getHeroImage = (hero) => HERO_IMAGES[hero?.image] ?? null;