export const HERO_IMAGES = {
  wizard: require("../../pictures/Heroes/wizard.png"),
  knight: require("../../pictures/Heroes/knight.png"),
};

export const HERO_BASE_STATS = {
  wizard:  { strength: 3, health: 45, magic: 50 },
  knight:  { strength: 15, health: 55, magic: 3 },
  default: { strength: 3, health: 12, magic: 3 },
};

// optional tiny helper
export const getHeroImage = (hero) => HERO_IMAGES[hero?.image] ?? null;