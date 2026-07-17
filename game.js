import { Character } from "./classOrder.js/Character.class.js";
import { Chicken } from "./classOrder.js/chicken.class.js";
import { World } from "./classOrder.js/world.class.js";
import { MovableObject } from "./classOrder.js/movable-object.class.js";
import { Keyboard } from "./classOrder.js/keyboard.class.js";
import { StatusBar } from "./classOrder.js/status-bar.class.js";
import { sounds } from "./classOrder.js/Sounds.class.js";

let canvas;
let world;
let keyboard = new Keyboard();
const imprintDialog = document.getElementById('imprintDialog');
const openImprintButton = document.getElementById('openImprint');
const closeImprintButton = document.getElementById('closeImprint');
const controlsDialog = document.getElementById('controlsDialog');
const openControlsButton = document.getElementById('openControls');
const closeControlsButton = document.getElementById('closeControls');
const soundButton = document.getElementById('soundButton');

/**
 * Initializes the game canvas.
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
}
init();
bindMobilControls();

/**
 * Creates and starts a new game.
 *
 * @returns {Promise<void>}
 */
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

document.getElementById("homeScreenWon").addEventListener("click", async () => {
    location.reload();
});

document.getElementById('resetGameWon').addEventListener('click', () => {
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

/**
 * Binds all mobile control buttons.
 *
 * @returns {void}
 */
function bindMobilControls() {
    const mobileLeft = document.getElementById('mobileLeft');
    const mobileRight = document.getElementById('mobileRight');
    const mobileJump = document.getElementById('mobileJump');
    const mobileThrow = document.getElementById('mobileThrow');

    mobileLeft.addEventListener('pointerdown', () => {
        keyboard.LEFT = true;
    });

    mobileLeft.addEventListener('pointerup', () => {
        keyboard.LEFT = false;
    });

    mobileRight.addEventListener('pointerdown', () => {
        keyboard.RIGHT = true;
    });

    mobileRight.addEventListener('pointerup', () => {
        keyboard.RIGHT = false;
    });

    mobileJump.addEventListener('pointerdown', () => {
        keyboard.SPACE = true;
    });

    mobileJump.addEventListener('pointerup', () => {
    keyboard.SPACE = false;
    });

    mobileThrow.addEventListener('pointerdown', () => {
        keyboard.C = true;
    });

    mobileThrow.addEventListener('pointerup', () => {
    keyboard.C = false;
    });
}

    /**
    * Updates the sound button according to the current mute state.
    *
    * @returns {void}
    */
    function updateSoundButton() {
    soundButton.textContent = sounds.isMuted ? '🔇' : '🔊';
    soundButton.title = sounds.isMuted
        ? 'Turn sound on'
        : 'Turn sound off';
    }

    soundButton.addEventListener('click', () => {
    sounds.toggleMute();
    updateSoundButton();
    });

/**
 * Opens the imprint dialog.
 *
 * @returns {void}
 */
function openImprint() {
    imprintDialog.style.display = 'flex';
}

/**
 * Closes the imprint dialog.
 *
 * @returns {void}
 */
function closeImprint() {
    imprintDialog.style.display = 'none';
}

openImprintButton.addEventListener('click', openImprint);
closeImprintButton.addEventListener('click', closeImprint);

imprintDialog.addEventListener('click', (event) => {
    if (event.target === imprintDialog) {
        closeImprint();
    }
});