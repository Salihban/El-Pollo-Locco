import { MovableObject } from "./movable-object.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Represents a normal chicken enemy.
 * Handles movement, walking animation and death behavior.
 *
 * @extends MovableObject
 */
export class Chicken extends MovableObject{
    /** Vertical position of the chicken. */
y = 370;

/** Height of the chicken. */
height = 70;

/** Indicates whether the chicken is dead. */
isDead = false;

/** Time when the chicken died. */
deadTime = 0;

/** Prevents the death sound from playing multiple times. */
deadSoundPlayed = false;

    /**
    * Collision box offset.
    * @type {{top:number,right:number,bottom:number,left:number}}
    */
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    
    /**
    * Walking animation images.
    * @type {string[]}
    */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
    * Creates a new chicken.
    * Loads images, sets a random position and speed,
    * and starts the animation.
    */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 300 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
    * Starts the movement and walking animation.
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
 * Kills the chicken.
 * Stops its movement, changes the image
 * and stores the death time.
 */
die() {
    this.isDead = true;
    this.playDeadSound();
    this.deadTime = new Date().getTime();
    this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    this.speed = 0;
}

/**
 * Plays the chicken death sound once.
 */
playDeadSound() {
    if (!this.deadSoundPlayed) {
        sounds.playSound(sounds.chickenDead);
        this.deadSoundPlayed = true;
    }
}
}