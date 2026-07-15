/**
 * Represents a game level.
 * Stores all game objects that belong to the level,
 * such as enemies, collectibles and background objects.
 */
export class Level {

    /**
     * List of all enemies in the level.
     * @type {Array}
     */
    enemies;

    /**
     * List of all collectible coins.
     * @type {Array}
     */
    coins;

    /**
     * List of all collectible bottles.
     * @type {Array}
     */
    bottles;

    /**
     * List of all clouds.
     * @type {Array}
     */
    clouds;

    /**
     * List of all background objects.
     * @type {Array}
     */
    BackgroundObjects;

    /**
     * X-position where the level ends.
     * @type {number}
     */
    level_end_x = 2700;

    /**
     * Creates a new level.
     *
     * @param {Array} enemies - All enemies in the level.
     * @param {Array} coins - All collectible coins.
     * @param {Array} bottles - All collectible bottles.
     * @param {Array} clouds - All clouds.
     * @param {Array} BackgroundObjects - All background objects.
     */
    constructor(enemies, coins, bottles, clouds, BackgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
    }
}