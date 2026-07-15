import { MovableObject } from "./movable-object.class.js";
import { sounds } from "./Sounds.class.js";

export class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    energy = 100;
    isDead = false;
    isEndboss = true;
    deadTime = 0;
    showFrame = true;
    deadTime = 0;
    deadanimationPlayed = false;
    approachSoundPlayed = false;
    isHurt = false;
    attacking = false;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

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

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    DeadAnimationIndex = 0;
    DeadAnimationInterval;

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
        }, 150); }

        playApproachSound() {
            if (!this.approachSoundPlayed) {
                sounds.playSound(sounds.endBossCall);
                this.approachSoundPlayed = true;
            }
        }

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

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.deadTime = new Date().getTime();
        this.deadanimationPlayed = false;
        this.DeadAnimationIndex = 0;
        this.speed = 0;
        this.startDeadAnimation();
}

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