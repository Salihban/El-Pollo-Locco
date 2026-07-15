import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a collectible coin in the game.
 * Coins play an animation and can be collected by the player.
 *
 * @extends MovableObject
 */
export class Coins extends MovableObject {

    /** Vertical position of the coin. */
    y = 370;

    /** Width of the coin in pixels. */
    width = 100;

    /** Height of the coin in pixels. */
    height = 100;

    /**
     * Collision box offset.
     * @type {{top:number,right:number,bottom:number,left:number}}
     */
    offset = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    /**
     * Images used for the coin animation.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new coin.
     *
     * @param {number} x - Horizontal position of the coin.
     * @param {number} y - Vertical position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts the coin animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}
