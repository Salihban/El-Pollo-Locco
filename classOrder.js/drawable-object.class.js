/**
 * Base class for all drawable objects in the game.
 * Provides properties and methods for loading and drawing images.
 */
export class DrawableObject {

    /** Horizontal position of the object. */
    x = 120;

    /** Vertical position of the object. */
    y = 280;

    /** Width of the object in pixels. */
    width = 100;

    /** Height of the object in pixels. */
    height = 150;

    /**
     * Currently displayed image.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Stores all loaded images for animations.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /** Current animation frame index. */
    currentImages = 0;

    /**
     * Loads a single image.
     *
     * @param {string} path - Path to the image.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache.
     *
     * @param {string[]} arr - Array containing image paths.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image onto the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the collision frame for debugging.
     * The frame is only shown if showFrame is enabled.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    drawFrame(ctx) {
        if (this.showFrame) {
            this.getRealFrame();

            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }
}