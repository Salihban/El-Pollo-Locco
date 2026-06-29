import { Character } from "./classOrder.js/Character.class.js";
import { Chicken } from "./classOrder.js/chicken.class.js";
import { MovableObject } from "./classOrder.js/movable-object.class.js";
import { World } from "./classOrder.js/world.class.js";

let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}
init();