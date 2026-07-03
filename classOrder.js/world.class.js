import { Character } from "./Character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./Cloud.class.js";
import { BackgroundObject } from "./background-Object.class.js";
import { level1 } from "../levels/level1.js";
import { StatusBar } from "./status-bar.class.js";
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
    statusBarCoin = new StatusBarCoin();
    StatusBottleBar = new StatusBottleBar();
    throwableObjects = [];

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.run();
        this.draw();
        this.checkCollisions();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinsCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.C) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
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
                this.StatusBottleBar.setPercentage(this.statusBarCoin.percentage + 20);
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
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.StatusBottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        
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