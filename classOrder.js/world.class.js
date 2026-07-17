import { Character } from "./Character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./Cloud.class.js";
import { BackgroundObject } from "./background-Object.class.js";
import { StatusBar } from "./status-bar.class.js";
import { StatusBarEndboss } from "./statusBarEndboss.class.js";
import { StatusBarCoin } from "./statusBarCoin.class.js";
import { StatusBottleBar } from "./statusBottleBar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Bottle } from "./bottle.class.js";
import { sounds } from "./Sounds.class.js";

/**
 * Represents the complete game world.
 * Controls game objects, collisions, status bars,
 * drawing, game states and the main game loop.
 */
export class World {

    /**
     * Main player character.
     *
     * @type {Character}
     */
    character = new Character();

    /** Current game level. */
    level;

    throwableObjects = [];
    canThrowBottle = true;

    /**
     * Canvas element used to display the game.
     *
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Rendering context of the canvas.
     *
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /** Current keyboard input object. */
    keyboard;

    /** Horizontal camera position. */
    camera_x = 0;

    /** Player health status bar. */
    statusBar = new StatusBar();

    /** Endboss health status bar. */
    statusBarEndboss = new StatusBarEndboss();

    /** Coin collection status bar. */
    statusBarCoin = new StatusBarCoin();

    /** Bottle collection status bar. */
    StatusBottleBar = new StatusBottleBar();

    /**
     * Currently thrown bottles.
     *
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Game-over image.
     *
     * @type {HTMLImageElement}
     */
    gameOverImage = new Image();

    /** Indicates whether the player has lost. */
    gameOver = false;

    /**
     * Game-won image.
     *
     * @type {HTMLImageElement}
     */
    gameWonImage = new Image();

    /** Indicates whether the player has won. */
    gameWon = false;

    /**
     * Stores interval IDs belonging to the world.
     *
     * @type {number[]}
     */
    intervalls = [];

    /**
     * ID of the current animation frame.
     *
     * @type {number|null}
     */
    animationFrameId = null;


    /**
     * Creates a new game world.
     *
     * @param {HTMLCanvasElement} canvas - Canvas used to display the game.
     * @param {Keyboard} keyboard - Current keyboard input.
     * @param {Level} level - Level that should be loaded.
     */
    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.loadEndScreenImages();
        this.run();
        this.draw();
    }

    /**
     * Loads the images for the win and lose screens.
     *
     * @returns {void}
     */
    loadEndScreenImages() {
        this.gameOverImage.src =
            "img/You won, you lost/You lost.png";

        this.gameWonImage.src =
            "img/You won, you lost/You won A.png";
    }

    /**
    * Connects the character and all enemies to the game world.
    *
    * @returns {void}
    */
    setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
        enemy.world = this;
    });
}

    /**
     * Starts the main game logic interval.
     *
     * @returns {void}
     */
    run() {
        const interval = setInterval(() => {
            this.updateGameLogic();
        }, 50);

        this.intervalls.push(interval);
    }

    /**
     * Executes all continuously required game checks.
     *
     * @returns {void}
     */
    updateGameLogic() {
        this.checkCollisions();
        this.checkBottleHitsEndboss();
        this.checkCoinsCollisions();
        this.checkBottleCollisions();
        this.checkThrowObjects();
        this.checkBottleRespawn();
        this.updateGameState();
        this.removeDeadEnemies();
    }

    /**
     * Updates the win and lose states.
     *
     * @returns {void}
     */
    updateGameState() {
        const endboss = this.level.enemies.find(
            enemy => enemy.isEndboss
        );
        if (endboss?.isDead && endboss.deadanimationPlayed) {
            this.gameWon = true;
        }
        if (this.character.isDead()) {
            this.gameOver = true;
        }
    }

    /**
    * Checks whether the character can throw a bottle.
    *
    * @returns {void}
    */
    checkThrowObjects() {
    if (
        this.keyboard.C &&
        this.character.bottles > 0 &&
        this.canThrowBottle) {
        this.canThrowBottle = false;
    let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
    this.character.bottles--;
    this.StatusBottleBar.setPercentage(this.character.bottles * 20);
    }
    if (!this.keyboard.C) {
        this.canThrowBottle = true;
    }
}

    /**
     * Creates a new throwable bottle at the character position.
     *
     * @returns {ThrowableObject} Newly created throwable bottle.
     */
    createThrowableBottle() {
        return new ThrowableObject(
            this.character.x + 100,
            this.character.y + 100,
            this.character.otherDirection
        );
    }

    /**
     * Removes one bottle from the character inventory.
     *
     * @returns {void}
     */
    reduceBottleInventory() {
        this.character.bottles--;

        this.StatusBottleBar.setPercentage(
            this.character.bottles * 20
        );
    }

    /**
     * Checks whether thrown bottles hit the endboss.
     *
     * @returns {void}
     */
    checkBottleHitsEndboss() {
        const endboss = this.findEndboss();

        this.throwableObjects.forEach((bottle) => {
            if (this.isValidEndbossHit(bottle, endboss)) {
                this.handleEndbossHit(bottle, endboss);
            }
        });

        this.removeBrokenBottles();
    }

    /**
     * Finds the endboss inside the enemy array.
     *
     * @returns {Endboss|undefined} Endboss or undefined.
     */
    findEndboss() {
        return this.level.enemies.find(
            enemy => enemy.isEndboss === true
        );
    }

    /**
     * Checks whether a bottle can damage the endboss.
     *
     * @param {ThrowableObject} bottle - Bottle being checked.
     * @param {Endboss|undefined} endboss - Current endboss.
     * @returns {boolean} True if the bottle hits the endboss.
     */
    isValidEndbossHit(bottle, endboss) {
        return Boolean(
            endboss &&
            bottle.isColliding(endboss) &&
            !bottle.hasSplashed
        );
    }

    /**
     * Handles a successful bottle hit on the endboss.
     *
     * @param {ThrowableObject} bottle - Bottle that hit.
     * @param {Endboss} endboss - Endboss receiving damage.
     * @returns {void}
     */
    handleEndbossHit(bottle, endboss) {
        bottle.splash();
        sounds.playSound(sounds.bottleBreak);
        endboss.getHit();

        this.statusBarEndboss.setPercentage(
            endboss.energy
        );
    }

    /**
     * Removes bottles after their splash animation.
     *
     * @returns {void}
     */
    removeBrokenBottles() {
        this.throwableObjects = this.throwableObjects.filter(
            bottle => !bottle.removeBottle
        );
    }

    /**
     * Checks collisions between the character and enemies.
     *
     * @returns {void}
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) {
                return;
            }

            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    /**
     * Handles a collision between the character and an enemy.
     *
     * @param {MovableObject} enemy - Colliding enemy.
     * @returns {void}
     */
    handleEnemyCollision(enemy) {
        if (this.canJumpOnEnemy(enemy)) {
            enemy.die();
            this.character.speedY = 15;
        } else {
            this.damageCharacter();
        }
    }

    /**
    * Spawns a new collectible bottle in front of the character.
    *
    * @returns {void}
    */
    spawnBottle() {
    const x = Math.min(
        this.character.x + 500,
        this.level.level_end_x - 100
    );
    const bottle = new Bottle(x, 350);
    this.level.bottles.push(bottle);
    }

    /**
    * Spawns a new bottle when the character has no bottles left.
    *
    * @returns {void}
    */
    checkBottleRespawn() {
    if (this.character.bottles === 0 && this.level.bottles.length === 0) {
        this.level.bottles.push(new Bottle(2400, 360));
    }
    }

    /**
    * Removes broken bottles and spawns a replacement
    * when a thrown bottle disappears.
    *
    * @returns {void}
    */
    removeBrokenBottles() {
    const bottleWasRemoved = this.throwableObjects.some(
        bottle => bottle.removeBottle
    );
    this.throwableObjects = this.throwableObjects.filter(
        bottle => !bottle.removeBottle
    );
    if (bottleWasRemoved) {
        this.spawnBottle();
    }
    }

    /**
    * Checks whether the character can defeat an enemy by jumping on it.
     *
     * The character must be falling, hit the enemy from above,
     * and the enemy must not be the endboss.
     *
     * @param {MovableObject} enemy - The enemy being checked.
     * @returns {boolean} True if the enemy can be defeated by jumping on it.
     */
    canJumpOnEnemy(enemy) {
    const characterBottom = this.character.rY + this.character.rH;
    const enemyTop = enemy.rY;

    const characterIsFalling = this.character.speedY < 0;
    const characterIsAboveEnemy = characterBottom <= enemyTop + 35;

    return (
        characterIsFalling &&
        characterIsAboveEnemy &&
        !enemy.isEndboss &&
        typeof enemy.die === 'function'
    );
}

    /**
     * Damages the character and updates the health bar.
     *
     * @returns {void}
     */
    damageCharacter() {
        this.character.hit();

        this.statusBar.setPercentage(
            this.character.energy
        );
    }

    /**
     * Removes defeated enemies after their configured delay.
     *
     * @returns {void}
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(
            enemy => this.shouldKeepEnemy(enemy)
        );
    }

    /**
     * Determines whether an enemy should remain in the level.
     *
     * @param {MovableObject} enemy - Enemy being checked.
     * @returns {boolean} True if the enemy should remain.
     */
    shouldKeepEnemy(enemy) {
        if (!enemy.isDead) {
            return true;
        }

        const elapsedTime = Date.now() - enemy.deadTime;
        const removalDelay = enemy.isEndboss ? 2000 : 100;

        return elapsedTime < removalDelay;
    }

    /**
     * Checks whether the character collects a coin.
     *
     * @returns {void}
     */
    checkCoinsCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    /**
     * Collects a coin and updates the coin status bar.
     *
     * @param {number} index - Index of the collected coin.
     * @returns {void}
     */
    collectCoin(index) {
        sounds.playSound(sounds.coinCollect);
        this.level.coins.splice(index, 1);

        this.statusBarCoin.setPercentage(
            this.statusBarCoin.percentage + 20
        );
    }

    /**
     * Checks whether the character collects a bottle.
     *
     * @returns {void}
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(index);
            }
        });
    }

    /**
     * Collects a bottle and updates the bottle inventory.
     *
     * @param {number} index - Index of the collected bottle.
     * @returns {void}
     */
    collectBottle(index) {
        sounds.playSound(sounds.bottleCollect);
        this.level.bottles.splice(index, 1);
        this.character.bottles++;

        this.StatusBottleBar.setPercentage(
            this.character.bottles * 20
        );
    }

    /**
     * Draws the current game frame.
     *
     * @returns {void}
     */
    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawFixedObjects();
        this.drawGameObjects();

        if (this.showEndScreen()) {
            return;
        }

        this.resetCameraTranslation();
        this.requestNextFrame();
    }

    /**
     * Clears the complete canvas.
     *
     * @returns {void}
     */
    clearCanvas() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    /**
     * Draws background objects and clouds.
     *
     * @returns {void}
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws status bars that should not move with the camera.
     *
     * @returns {void}
     */
    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.StatusBottleBar);
    }

    /**
     * Draws all movable game objects.
     *
     * @returns {void}
     */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Displays the appropriate end screen.
     *
     * @returns {boolean} True if an end screen is displayed.
     */
    showEndScreen() {
        if (this.gameOver) {
            return this.showScreen("YouLoseScreen");
        }

        if (this.gameWon) {
            return this.showScreen("YouWonScreen");
        }

        return false;
    }

    /**
     * Displays an HTML screen by its element ID.
     *
     * @param {string} screenId - ID of the screen element.
     * @returns {boolean} Always returns true.
     */
    showScreen(screenId) {
        const screen = document.getElementById(screenId);
        screen.style.display = "block";

        return true;
    }

    /**
     * Resets the camera translation after drawing game objects.
     *
     * @returns {void}
     */
    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame.
     *
     * @returns {void}
     */
    requestNextFrame() {
        this.animationFrameId = requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws multiple objects onto the canvas.
     *
     * @param {DrawableObject[]} objects - Objects to draw.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Draws a single object onto the canvas.
     *
     * @param {DrawableObject} movableObject - Object to draw.
     * @returns {void}
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips an object's canvas representation horizontally.
     *
     * @param {DrawableObject} movableObject - Object to flip.
     * @returns {void}
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x *= -1;
    }

    /**
     * Restores an object after horizontal flipping.
     *
     * @param {DrawableObject} movableObject - Flipped object.
     * @returns {void}
     */
    flipImageBack(movableObject) {
        movableObject.x *= -1;
        this.ctx.restore();
    }

    /**
     * Stops the main interval and animation frame.
     *
     * @returns {void}
     */
    stopGame() {
        this.intervalls.forEach((id) => {
            clearInterval(id);
        });

        this.intervalls = [];
        this.cancelDrawLoop();
    }

    /**
     * Cancels the current drawing animation frame.
     *
     * @returns {void}
     */
    cancelDrawLoop() {
        if (!this.animationFrameId) {
            return;
        }

        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
}