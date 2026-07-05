import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject  extends DrawableObject{
    speed = 0.15;
    speedY = 0;
    acceleration = 1.5;
    otherDirection = false;
    showFrame = false;
    energy = 100;
    lastHit = 0;
    isThrowable = false;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this.isThrowable) {
            return true;
        } else {
            return this.y < 160;
        }
    }

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    //Character.isColiding(Chicken)
    isColliding(mo) {
        this.getRealFrame();
        mo.getRealFrame();
        return  this.rX + this.rW > mo.rX &&
                this.rY + this.rH > mo.rY &&
                this.rX < mo.rX + mo.rW &&
                this.rY < mo.rY + mo.rH;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImages % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImages++;
    }
}