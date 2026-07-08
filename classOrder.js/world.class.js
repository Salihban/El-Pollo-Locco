import { Character } from "./Character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./Cloud.class.js";
import { BackgroundObject } from "./background-Object.class.js";
import { level1 } from "../levels/level1.js";
import { StatusBar } from "./status-bar.class.js";
import { StatusBarEndboss } from "./statusBarEndboss.class.js";
import { StatusBarCoin } from "./StatusBarCoin.class.js";
import { StatusBottleBar } from "./statusBottleBar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";



export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    statusBarCoin = new StatusBarCoin();
    StatusBottleBar = new StatusBottleBar();
    throwableObjects = [];
    gameOverImage = new Image();
    gameOver = false;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.gameOverImage.src = 'img/You won, you lost/You lost.png';
        this.setWorld();
        this.run();
        this.draw();
        this.checkCollisions();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
        this.removeDeadEnemies();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBottleHitsEndboss();
            this.checkCoinsCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.removeDeadEnemies();
        }, 50);
        if (this.character.isDead()){
            this.gameOver = true;
        }
    }

    checkThrowObjects() {
        if (this.keyboard.C && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);

            this.character.bottles--;
            this.StatusBottleBar.setPercentage(this.character.bottles * 20);
        }
    }

    checkBottleHitsEndboss() {
        this.throwableObjects.forEach((bottle, index) => {
            let endboss = this.level.enemies.find(enemy => enemy.isEndboss === true);
            if (endboss && bottle.isColliding(endboss)) {
                this.throwableObjects.splice(index, 1);
                endboss.energy -= 20;
                this.statusBarEndboss.setPercentage(endboss.energy);
            if (endboss.energy <= 0) {
                endboss.die();
            }
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) return;
            if(this.character.isColliding(enemy)){
            if (this.character.speedY < 0 && enemy.die && !enemy.isEndboss) {
                enemy.die();
                this.character.speedY =15;
            } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);}}
        });
    }

    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (!enemy.isDead) return true;
            let now = new Date().getTime();
            if (enemy.isEndboss) {
                return now - enemy.deadTime < 2000;
            } else {
                return now - enemy.deadTime < 100;
            }
        });
    }

    checkCoinsCollisions() {
        this.level.coins.forEach((coins, index) => {
            if(this.character.isColliding(coins)) {
                this.level.coins.splice(index, 1);
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 20);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottles, index) => {
            if(this.character.isColliding(bottles)) {
                this.level.bottles.splice(index, 1);
                this.character.bottles++;
                this.StatusBottleBar.setPercentage(this.character.bottles * 20);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects -------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.StatusBottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        if (this.gameOver) {
            this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
        }
        this.ctx.translate(-this.camera_x, 0);
        // draw() is called repeatedly
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
        }

        addObjectsToMap(objects){
            objects.forEach(o => {
                this.addToMap(o);
            })
        }
        addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        }

        flipImage(mo) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        flipImageBack(mo) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
}