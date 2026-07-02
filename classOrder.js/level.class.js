export class Level{
    enemies;
    coins;
    clouds;
    BackgroundObjects;
    level_end_x = 2700;

    constructor(enemies,coins, clouds, BackgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;

    }
}