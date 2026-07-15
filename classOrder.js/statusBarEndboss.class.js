import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the endboss health status bar.
 * Displays the current health percentage of the endboss.
 *
 * @extends DrawableObject
 */
export class StatusBarEndboss extends DrawableObject {

    /**
     * Images used for the different endboss health states.
     *
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Current endboss health percentage.
     *
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new endboss status bar.
     * Loads all images and initializes the health to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the displayed endboss health percentage.
     *
     * @param {number} percentage - Current endboss health percentage.
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