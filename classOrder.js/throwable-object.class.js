import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a throwable bottle.
 * Handles flying, rotation animation, splash animation
 * and removal after impact.
 *
 * @extends MovableObject
 */
export class ThrowableObject extends MovableObject {

    /** Indicates that this object is throwable. */
    isThrowable = true;

    /**
     * Images used for the bottle rotation animation.
     *
     * @type {string[]}
     */
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Images used for the splash animation.
     *
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /** Indicates whether the bottle has already splashed. */
    hasSplashed = false;

    /** Indicates whether the bottle should be removed from the game. */
    removeBottle = false;

    /**
     * Creates a new throwable bottle.
     *
     * @param {number} x - Horizontal start position.
     * @param {number} y - Vertical start position.
     * @param {boolean} otherDirection - Throw direction of the character.
     */
    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;

        this.throwBottle();
        this.animate();
    }

    /**
     * Throws the bottle and applies gravity.
     *
     * @returns {void}
     */
    throwBottle() {
        this.speedY = 25;
        this.applyGravity();

        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 20;
            } else {
                this.x += 20;
            }
        }, 25);
    }

    /**
     * Starts the bottle animation.
     * Displays either the rotation or splash animation.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (this.hasSplashed) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 80);
    }

    /**
     * Starts the splash animation and schedules
     * the bottle for removal.
     *
     * @returns {void}
     */
    splash() {
        this.hasSplashed = true;
        this.speedY = 0;
        this.speed = 0;

        setTimeout(() => {
            this.removeBottle = true;
        }, 200);
    }
}