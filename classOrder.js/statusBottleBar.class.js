import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the bottle status bar.
 * Displays the percentage of collected bottles.
 *
 * @extends DrawableObject
 */
export class StatusBottleBar extends DrawableObject {

    /**
     * Images used for the different bottle states.
     *
     * @type {string[]}
     */
    IMAGES_BOTTLE_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * Current bottle percentage.
     *
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates a new bottle status bar.
     * Loads all images and initializes the value to 0%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.x = 500;
        this.y = 45;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Updates the displayed bottle percentage.
     *
     * @param {number} percentage - Current bottle percentage.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const path = this.IMAGES_BOTTLE_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the correct image index for the current bottle percentage.
     *
     * @returns {number} Image index between 0 and 5.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}