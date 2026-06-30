import { Character } from "./Character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./Cloud.class.js";
import { BackgroundObject } from "./background-Object.class.js";
import { level1 } from "../levels/level1.js";


export class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    BackgroundObjects = level1.BackgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;

        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.BackgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
        }
}