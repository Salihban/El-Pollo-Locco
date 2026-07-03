export class Level{
    enemies;
    coins;
    bottles;
    clouds;
    BackgroundObjects;
    level_end_x = 2700;

    constructor(enemies,coins, bottles, clouds, BackgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;

    }
}