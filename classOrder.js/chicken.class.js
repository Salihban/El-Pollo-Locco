import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject{
    y = 370;
    height = 70;
    showFrame = true;
    isDead = false;
    deadTime = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 300 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
        this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
}

die() {
    this.isDead = true;
    this.deadTime = new Date().getTime();
    this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    this.speed = 0;
}
}