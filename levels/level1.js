import { Level } from "../classOrder.js/level.class.js";
import { Chicken } from "../classOrder.js/chicken.class.js";
import { SmallChicken } from "../classOrder.js/smallChicken.class.js";
import { Cloud } from "../classOrder.js/Cloud.class.js";
import { BackgroundObject } from "../classOrder.js/background-Object.class.js";
import { Endboss } from "../classOrder.js/endboss.class.js";
import { Coins } from "../classOrder.js/coin.class.js";
import { Bottle } from "../classOrder.js/bottle.class.js";

/**
 * Creates the first game level.
 *
 * The level contains:
 * - Enemies
 * - Collectible coins
 * - Collectible bottles
 * - Clouds
 * - Background layers
 *
 * @returns {Level} A fully initialized Level instance.
 */
export function createLevel1() {
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Coins(500, 300),
            new Coins(800, 250),
            new Coins(1200, 320),
            new Coins(1900, 280),
            new Coins(2100, 350)
        ],
        [
            new Bottle(400, 350),
            new Bottle(800, 350),
            new Bottle(1200, 350),
            new Bottle(1600, 350),
            new Bottle(2000, 350)
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4)
        ]
    );
}