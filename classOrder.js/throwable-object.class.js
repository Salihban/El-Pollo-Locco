import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
isThrowable = true;

IMAGES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
];
hasSplashed = false;
removeBottle = false;

    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;
        this.trow();
        this.animate();
    }

    trow() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 20;
            } else {
                this.x += 20;
            }
        }, 25);
    }

    animate() {
        setInterval(() => {
            if (this.hasSplashed) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 80);
    }

    splash() {
        this.hasSplashed = true;
        this.speedY = 0;
        this.speed = 0;
        
        setTimeout(() => {
            this.removeBottle = true;
        }, 200);
    }
}