import { DrawableObject } from "./drawable-object.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Base class for all movable game objects.
 * Handles movement, gravity, collision detection, health and animations.
 *
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {

    /** Default horizontal movement speed. */
    speed = 0.15;

    /** Current vertical movement speed. */
    speedY = 0;

    /** Gravity strength applied to the object. */
    acceleration = 1.5;

    /** Indicates whether the object faces the opposite direction. */
    otherDirection = false;

    /** Controls whether the collision frame is displayed. */
    showFrame = false;

    /** Current energy value of the object. */
    energy = 100;

    /** Timestamp of the last received hit. */
    lastHit = 0;

    /** Indicates whether the object is throwable. */
    isThrowable = false;

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
     * Applies gravity to the object.
     * Continuously changes its vertical position and speed.
     *
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * Checks whether the object is currently above the ground.
     * Throwable objects are always treated as being above ground.
     *
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround() {
        if (this.isThrowable) {
            return true;
        }

        return this.y < 160;
    }

    /**
     * Calculates the real collision frame using the configured offset.
     *
     * @returns {void}
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Checks whether this object collides with another movable object.
     *
     * @param {MovableObject} mo - The object to check for collision.
     * @returns {boolean} True if both collision frames overlap.
     */
    isColliding(mo) {
        this.getRealFrame();
        mo.getRealFrame();

        return this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH;
    }

    /**
     * Reduces the energy of the object and stores the hit time.
     *
     * @returns {void}
     */
    hit() {
        this.energy -= 5;
        sounds.playSound(sounds.characterDamage);

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object was hit during the last second.
     *
     * @returns {boolean} True if the object is currently hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;

        return timePassed < 1;
    }

    /**
     * Checks whether the object has no energy left.
     *
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Moves the object to the right.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     *
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump and plays the jump sound.
     *
     * @returns {void}
     */
    jump() {
        this.speedY = 25;
        sounds.playSound(sounds.characterJump);
    }

    /**
     * Displays the next image of an animation.
     *
     * @param {string[]} images - Image paths used for the animation.
     * @returns {void}
     */
    playAnimation(images) {
        const index = this.currentImages % images.length;
        const path = images[index];

        this.img = this.imageCache[path];
        this.currentImages++;
    }
}