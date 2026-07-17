import { MovableObject } from "./movable-object.class.js";
import { StatusBar } from "./status-bar.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Represents the main player character (Pepe).
 * Handles movement, jumping, animations, sounds and keyboard input.
 *
 * @extends MovableObject
 */
export class Character extends MovableObject {
    /** Character height in pixels. */
height = 280;

/** Vertical position. */
y = 160;

/** Movement speed. */
speed = 10;

/** Number of collected bottles. */
bottles = 0;

/** Indicates whether the game is over. */
gameOver = false;

/** Prevents the death sound from playing multiple times. */
deadSoundPlayed = false;

/** Prevents the snoring sound from playing multiple times. */
snoringPlayed = false;

/**
 * Collision box offset.
 * @type {{top:number,right:number,bottom:number,left:number}}
 */
    offset = {
        top: 90,
        right: 20,
        bottom: 10,
        left: 20
    };

    /**
    * Walking animation images.
    * @type {string[]}
    */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
        ];

        /**
 * Jumping animation images.
 * @type {string[]}
 */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
        ];

    /**
    * Death animation images.
    * @type {string[]}
    */
    IMAGES_Dead = [
            'img/2_character_pepe/5_dead/D-51.png',
            'img/2_character_pepe/5_dead/D-52.png',
            'img/2_character_pepe/5_dead/D-53.png',
            'img/2_character_pepe/5_dead/D-54.png',
            'img/2_character_pepe/5_dead/D-55.png',
            'img/2_character_pepe/5_dead/D-56.png',
            'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
    * Hurt animation images.
    * @type {string[]}
    */
    IMAGES_HURT = [
            'img/2_character_pepe/4_hurt/H-41.png',
            'img/2_character_pepe/4_hurt/H-42.png',
            'img/2_character_pepe/4_hurt/H-43.png'
    ]

    /**
    * Normal idle animation images.
    *
    * @type {string[]}
    */
    IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
    * Long idle animation images used when the character falls asleep.
    *
    * @type {string[]}
    */
    IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
 * Name of the currently playing animation.
 * @type {string}
 */
currentAnimation = '';

/**
 * Timestamp of the last player action.
 * @type {number}
 */
lastActionTime = new Date().getTime();

    /**
    * Reference to the current game world.
    * @type {World}
    */
    world;


    /**
    * Creates the main character.
    * Loads all images, applies gravity and starts the animation loops.
    */
    constructor(){
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_Dead);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
    * Changes the current animation and resets the animation frame.
    *
    * @param {string} animationName - Name of the animation.
    * @returns {void}
    */
    setAnimation(animationName) {
    if (this.currentAnimation !== animationName) {
        this.currentAnimation = animationName;
        this.currentImages = 0;
    }
    }

    /**
    * Plays an animation once and stays on its final image.
    *
    * @param {string[]} images - Image paths of the animation.
    * @returns {void}
     */
    playAnimationOnce(images) {
    if (this.currentImages < images.length) {
        const path = images[this.currentImages];
        this.img = this.imageCache[path];
        this.currentImages++;
    } else {
        const lastImage = images[images.length - 1];
        this.img = this.imageCache[lastImage];
    }
    }

    /**
    * Stores the current time as the last player action.
    *
    * @returns {void}
    */
    registerAction() {
    this.lastActionTime = new Date().getTime();
    }

    /**
    * Checks whether the character has been inactive for 15 seconds.
    *
    * @returns {boolean} True if the character has been inactive long enough.
    */
    isLongIdle() {
    return new Date().getTime() - this.lastActionTime >= 15000;
    }


    animate() {
    this.startMovement();
    this.startAnimations();
    }

    /**
    * Starts the movement loop.
    *
    * @returns {void}
    */
    startMovement() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.registerAction();
            this.moveRight();
            this.otherDirection = false;
            sounds.startRunSound();
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.registerAction();
            this.moveLeft();
            this.otherDirection = true;
            sounds.startRunSound();
        } else {
            sounds.stopRunSound();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.registerAction();
            this.jump();}
        this.world.camera_x = -this.x + 100;
        }, 1000 / 25); }

    /**
    * Starts the animation loop.
    *
    * @returns {void}
    */
    startAnimations() {
    setInterval(() => {
        if (this.isDead()) {
            this.handleDeadAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpAnimation();
        } else if (this.isWalking()) {
            this.handleWalkingAnimation();
        } else if (this.isLongIdle()) {
            this.handleLongIdleAnimation();
        } else {
            this.handleIdleAnimation();
        }
    }, 80);
    }

    /**
    * Checks whether the character is currently walking.
    *
    * @returns {boolean} True if the left or right key is pressed.
    */
    isWalking() {
    return (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT
    );
    }

    /**
    * Stops the snoring sound and resets its playback flag.
    *
    * @returns {void}
    */
    stopSnoring() {
    sounds.stopSound(sounds.characterSnoring);
    this.snoringPlayed = false;
    }

    /**
    * Plays the jumping animation from its first frame.
    *
    * @returns {void}
    */
    handleJumpAnimation() {
    this.stopSnoring();
    this.setAnimation('jumping');
    this.playAnimationOnce(this.IMAGES_JUMPING);
    }

    /**
    * Plays the walking animation.
    *
    * @returns {void}
    */
    handleWalkingAnimation() {
    this.stopSnoring();
    this.setAnimation('walking');
    this.playAnimation(this.IMAGES_WALKING);
    }

    /**
    * Plays the normal idle animation.
    *
    * @returns {void}
    */
    handleIdleAnimation() {
    this.stopSnoring();
    this.setAnimation('idle');
    this.playAnimation(this.IMAGES_IDLE);
    }

    /**
    * Plays the long idle animation and starts the snoring sound.
    *
    * @returns {void}
    */
    handleLongIdleAnimation() {
    this.setAnimation('longIdle');
    this.playAnimation(this.IMAGES_LONG_IDLE);

    if (!this.snoringPlayed) {
        sounds.playSound(sounds.characterSnoring);
        this.snoringPlayed = true;
    }
    }


    /**
    * Plays the hurt animation.
    *
    * @returns {void}
    */
    handleHurtAnimation() {
    this.stopSnoring();
    this.setAnimation('hurt');
    this.playAnimation(this.IMAGES_HURT);
    }

    /**
    * Plays the death animation and activates the game-over state.
     *
    * @returns {void}
     */
    handleDeadAnimation() {
    this.stopSnoring();
    this.setAnimation('dead');
    this.playAnimationOnce(this.IMAGES_Dead);

    if (!this.gameOver) {
        this.gameOver = true;

        setTimeout(() => {
            this.world.gameOver = true;
        }, 1500);
    }
    }
}