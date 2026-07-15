import { MovableObject } from "./movable-object.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Represents a small chicken enemy.
 * Handles movement, walking animation, death behavior
 * and the small chicken death sound.
 *
 * @extends MovableObject
 */
export class SmallChicken extends MovableObject {

    /** Vertical position of the small chicken. */
    y = 390;

    /** Height of the small chicken in pixels. */
    height = 45;

    /** Width of the small chicken in pixels. */
    width = 45;

    /** Controls whether the collision frame is displayed. */
    showFrame = true;

    /** Indicates whether the small chicken is dead. */
    isDead = false;

    /** Timestamp of the small chicken's death. */
    deadTime = 0;

    /** Prevents the death sound from playing multiple times. */
    deadSoundPlayed = false;

    /**
     * Collision box offset.
     *
     * @type {{top:number, right:number, bottom:number, left:number}}
     */
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    /**
     * Images used for the walking animation.
     *
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Creates a new small chicken.
     * Loads the walking images, sets a random position and speed,
     * and starts the animation.
     */
    constructor() {
        super();
        this.loadImage(
            'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
        );
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts movement and walking animation.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Kills the small chicken.
     * Stops its movement, plays the death sound
     * and displays the dead image.
     *
     * @returns {void}
     */
    die() {
        this.isDead = true;
        this.playDeadSound();
        this.deadTime = new Date().getTime();

        this.loadImage(
            'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
        );

        this.speed = 0;
    }

    /**
     * Plays the small chicken death sound once.
     *
     * @returns {void}
     */
    playDeadSound() {
        if (!this.deadSoundPlayed) {
            sounds.playSound(sounds.chickenDead2);
            this.deadSoundPlayed = true;
        }
    }
}