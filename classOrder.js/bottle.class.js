import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a collectible salsa bottle in the game.
 * Bottles can be picked up by the player and later thrown.
 * @extends MovableObject
 */
export class Bottle extends MovableObject {

    /** Vertical position of the bottle. */
    y = 370;

    /** Width of the bottle in pixels. */
    width = 100;

    /** Height of the bottle in pixels. */
    height = 100;

    /**
     * Collision offset used for more accurate collision detection.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 15,
        right: 15,
        bottom: 5,
        left: 30
    };

    /**
     * Images used for the bottle animation on the ground.
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a new bottle object.
     *
     * @param {number} x - Horizontal position of the bottle.
     * @param {number} y - Vertical position of the bottle.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
    }
}