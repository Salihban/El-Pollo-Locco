import { Character } from "./classOrder.js/Character.class.js";
import { Chicken } from "./classOrder.js/chicken.class.js";
import { MovableObject } from "./classOrder.js/movable-object.class.js";
import { World } from "./classOrder.js/world.class.js";
import { Keyboard } from "./classOrder.js/keyboard.class.js";
import { StatusBar } from "./classOrder.js/status-bar.class.js";
import { sounds } from "./classOrder.js/Sounds.class.js";

let canvas;
let world;
let keyboard = new Keyboard();
const controlsDialog = document.getElementById('controlsDialog');
const openControlsButton = document.getElementById('openControls');
const closeControlsButton = document.getElementById('closeControls');

function init() {
    canvas = document.getElementById('canvas');
}
init();

async function startNewGame() {
    const levelModul = await import("./levels/level1.js");
    const freshLevel = levelModul.createLevel1();

    keyboard = new Keyboard();
    world = new World(canvas, keyboard, freshLevel);
}

document.getElementById("startGame").addEventListener("click", async () => {
    sounds.playSound(sounds.gameStart);
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    await startNewGame();
});

openControlsButton.addEventListener('click', () => {
    controlsDialog.style.display = 'flex';
});

closeControlsButton.addEventListener('click', () => {
    controlsDialog.style.display = 'none';
});

controlsDialog.addEventListener('click', (event) => {
    if (event.target === controlsDialog) {
        controlsDialog.style.display = 'none';
    }
})

window.showYouLoseScreen = function () {
    document.getElementById("YouLoseScreen").style.display = "block";
}

document.getElementById("homeScreen").addEventListener("click", async () => {
    location.reload();
});

document.getElementById('resetGame').addEventListener('click', () => {
    sessionStorage.setItem('restartGame', 'true');
    location.reload();
});

window.addEventListener('load', async () => {
    const shouldRestart = sessionStorage.getItem('restartGame');
    if (shouldRestart === 'true') {
        sessionStorage.removeItem('restartGame');
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        document.getElementById('YouLoseScreen').style.display = 'none';

        await startNewGame();
    }
    
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