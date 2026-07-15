import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the coin status bar.
 * Displays the percentage of collected coins.
 *
 * @extends DrawableObject
 */
export class StatusBarCoin extends DrawableObject {

    /**
     * Images used for the different coin states.
     *
     * @type {string[]}
     */
    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Current coin percentage.
     *
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates a new coin status bar.
     * Loads all images and sets the initial value to 0%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.x = 40;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the displayed coin percentage.
     *
     * @param {number} percentage - Current coin percentage.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const path = this.IMAGES_COIN_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the correct image index for the current coin percentage.
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