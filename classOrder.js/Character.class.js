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
    * Idle animation images.
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
            'img/2_character_pepe/1_idle/idle/I-10.png',
            'img/2_character_pepe/1_idle/long_idle/I-11.png',
            'img/2_character_pepe/1_idle/long_idle/I-12.png',
            'img/2_character_pepe/1_idle/long_idle/I-13.png',
            'img/2_character_pepe/1_idle/long_idle/I-14.png',
            'img/2_character_pepe/1_idle/long_idle/I-15.png',
            'img/2_character_pepe/1_idle/long_idle/I-16.png',
            'img/2_character_pepe/1_idle/long_idle/I-17.png',
            'img/2_character_pepe/1_idle/long_idle/I-18.png',
            'img/2_character_pepe/1_idle/long_idle/I-19.png',
            'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

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
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_Dead);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }


    /**
    * Starts all movement and animation intervals.
    * Handles keyboard input, movement, sounds and character animations.
    */
    animate() {
        // Movement and keyboard handling
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.otherDirection = false;
                sounds.startRunSound();
            } else if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                sounds.startRunSound();
            } else {
                sounds.stopRunSound();
            }
            
            if (this.world.keyboard.LEFT && this.x > 0){
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 25);

        // Animation handling
        setInterval(() => {
            if (this.isDead()) {
                sounds.stopSound(sounds.characterSnoring);
                this.snoringPlayed = false;
                if (!this.gameOver) {
                    this.gameOver = true;
                    this.playAnimation(this.IMAGES_Dead);
                    setTimeout(() => {
                        this.world.gameOver = true;
                    }, 1500);} return;
            } else if (this.isHurt()) {
                sounds.stopSound(sounds.characterSnoring);
                this.snoringPlayed = false;
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                sounds.stopSound(sounds.characterSnoring);
                this.snoringPlayed = false;
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                sounds.stopSound(sounds.characterSnoring);
                this.snoringPlayed = false;
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                if (!this.snoringPlayed) {
                    sounds.playSound(sounds.characterSnoring);
                    this.snoringPlayed = true;
                }
            }
        }, 80);
    }
}