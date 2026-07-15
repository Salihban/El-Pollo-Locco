import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background image in the game world.
 * Background objects are static and only serve as scenery.
 * @extends MovableObject
 */
export class BackgroundObject extends MovableObject {

     /** Width of the background image in pixels. */
    width = 720;
    /** Height of the background image in pixels. */
    height = 480;

    /**
     * Creates a new background object.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background object.
     * @param {number} y - Vertical position (currently not used).
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}