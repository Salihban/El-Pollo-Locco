import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the player's health status bar.
 * Displays the current health percentage using different images.
 *
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject {

    /**
     * Images used for the different health states.
     *
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Current health percentage.
     *
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new health status bar.
     * Loads all images and sets the initial health to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the displayed health percentage.
     *
     * @param {number} percentage - Current health percentage.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the correct image index for the current health value.
     *
     * @returns {number} Image index between 0 and 5.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}