import { MovableObject } from "./movable-object.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Represents the final boss enemy.
 * Handles alert, hurt, attack and death animations,
 * as well as health, damage and sound behavior.
 *
 * @extends MovableObject
 */
export class Endboss extends MovableObject {

    /** Height of the endboss in pixels. */
    height = 400;

    /** Width of the endboss in pixels. */
    width = 250;

    /** Vertical position of the endboss. */
    y = 60;

    /** Current health of the endboss. */
    energy = 100;

    /** Indicates whether the endboss is dead. */
    isDead = false;

    /** Identifies this enemy as the endboss. */
    isEndboss = true;

    /** Time when the endboss died. */
    deadTime = 0;

    /** Indicates whether the death animation has finished. */
    deadanimationPlayed = false;

    /** Prevents the approach sound from playing more than once. */
    approachSoundPlayed = false;

    /** Indicates whether the endboss is currently hurt. */
    isHurt = false;

    /** Indicates whether the endboss is currently attacking. */
    attacking = false;

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
     * Images used for the alert animation.
     *
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Images used for the attack animation.
     *
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Images used for the hurt animation.
     *
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Images used for the death animation.
     *
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /** Current image index of the death animation. */
    DeadAnimationIndex = 0;

    /**
     * Interval ID used for the death animation.
     *
     * @type {number|undefined}
     */
    DeadAnimationInterval;

    /**
     * Creates a new endboss.
     * Loads all animation images and starts the animation loop.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2200;
        this.animate();
    }

    /**
     * Starts the animation loop and selects an animation
     * depending on the current state of the endboss.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.attacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.playApproachSound();
            }
        }, 150);
    }

    /**
     * Plays the approach sound once.
     *
     * @returns {void}
     */
    playApproachSound() {
        if (!this.approachSoundPlayed) {
            sounds.playSound(sounds.endBossCall);
            this.approachSoundPlayed = true;
        }
    }

    /**
     * Reduces the endboss health and starts the hurt
     * and attack states.
     *
     * @returns {void}
     */
    getHit() {
        this.energy -= 20;
        this.isHurt = true;

        setTimeout(() => {
            this.isHurt = false;
            this.attacking = true;

            setTimeout(() => {
                this.attacking = false;
            }, 800);
        }, 500);

        if (this.energy <= 0) {
            this.die();
        }
    }

    /**
     * Changes the endboss to the dead state and
     * starts the death animation.
     *
     * @returns {void}
     */
    die() {
        if (this.isDead) return;

        this.isDead = true;
        this.deadTime = new Date().getTime();
        this.deadanimationPlayed = false;
        this.DeadAnimationIndex = 0;
        this.speed = 0;
        this.startDeadAnimation();
    }

    /**
     * Plays all death images once and marks the
     * death animation as completed.
     *
     * @returns {void}
     */
    startDeadAnimation() {
        this.DeadAnimationInterval = setInterval(() => {
            this.DeadAnimationIndex++;

            if (this.DeadAnimationIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[this.DeadAnimationIndex]);
            } else {
                clearInterval(this.DeadAnimationInterval);
                this.deadanimationPlayed = true;
            }
        }, 300);
    }
}