/**
 * A monster set up to play against the player
 * and will help for implementing more monster later on
 */

const MONSTER = {
    name: "Goblin",
    image: require("../../pictures/enemies/magicGoblin.png"),
    health: 100,        // starting health level
    strength: 5,      // fixed damage per attack
};

export default MONSTER;