import { MovableObject } from "./movable-object.class.js";


export class Bottle extends MovableObject {
    y = 370;
    width = 100;
    height = 100;

    offset = {
        top: 15,
        right: 15,
        bottom: 5,
        left: 30
    };

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
    }
}