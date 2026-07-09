import { Character } from "./classOrder.js/Character.class.js";
import { Chicken } from "./classOrder.js/chicken.class.js";
import { MovableObject } from "./classOrder.js/movable-object.class.js";
import { World } from "./classOrder.js/world.class.js";
import { Keyboard } from "./classOrder.js/keyboard.class.js";
import { StatusBar } from "./classOrder.js/status-bar.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
}
init();

document.getElementById("startGame").addEventListener("click", async () => {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    const levelModul = await import("./levels/level1.js");
    world = new World(canvas, keyboard, levelModul.level1);
});

window.showYouLoseScreen = function () {
    document.getElementById("YouLoseScreen").style.display = "block";
}

document.getElementById("homeScreen").addEventListener("click", async () => {
    location.reload();
});


window.toggleFullscreen = function() {
    let canvas = document.getElementById('canvas');

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38){
        keyboard.UP = true;
    }
    if (e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32){
        keyboard.SPACE = true;
    }

    if (e.keyCode == 67){
        keyboard.C = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38){
        keyboard.UP = false;
    }
    if (e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if (e.keyCode == 67){
        keyboard.C = false;
    }
});