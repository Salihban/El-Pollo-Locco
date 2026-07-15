import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a cloud in the background.
 * Clouds move slowly from right to left to create a scrolling background.
 *
 * @extends MovableObject
 */
export class Cloud extends MovableObject {

    /** Vertical position of the cloud. */
    y = 20;

    /** Height of the cloud in pixels. */
    height = 250;

    /** Width of the cloud in pixels. */
    width = 500;

    /** Movement speed of the cloud. */
    speed = 0.15;

    /**
     * Creates a new cloud with a random horizontal position
     * and starts its movement.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1800;
        this.animate();
    }

    /**
     * Starts the cloud animation.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud continuously to the left.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}