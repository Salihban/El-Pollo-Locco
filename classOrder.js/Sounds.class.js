/**
 * Manages all game sounds.
 * Provides methods for playing, stopping and configuring audio effects.
 */
export class Sounds {

    /** Character running sound. */
    characterRun = new Audio('sounds/sounds/character/characterRun.mp3');

    /** Character jump sound. */
    characterJump = new Audio('sounds/sounds/character/characterJump.wav');

    /** Character damage sound. */
    characterDamage = new Audio('sounds/sounds/character/characterDamage.mp3');

    /** Character death sound. */
    characterDEAD = new Audio('sounds/sounds/character/characterDead.wav');

    /** Character snoring sound. */
    characterSnoring = new Audio('sounds/sounds/character/characterSnoring.mp3');

    /** Normal chicken death sound. */
    chickenDead = new Audio('sounds/sounds/chicken/chickenDead.mp3');

    /** Small chicken death sound. */
    chickenDead2 = new Audio('sounds/sounds/chicken/chickenDead2.mp3');

    /** Endboss approach sound. */
    endBossCall = new Audio('sounds/sounds/endboss/endbossApproach.wav');

    /** Coin collection sound. */
    coinCollect = new Audio('sounds/sounds/collectibles/collectSound.wav');

    /** Bottle collection sound. */
    bottleCollect = new Audio('sounds/sounds/collectibles/bottleCollectSound.wav');

    /** Bottle breaking sound. */
    bottleBreak = new Audio('sounds/sounds/throwable/bottleBreak.mp3');

    /** Game start sound. */
    gameStart = new Audio('sounds/sounds/game/gameStart.mp3');

    /**
     * Creates the sound manager.
     * Sets all sound volumes and configures looping sounds.
     */
    constructor() {
        this.setVolumes();

        this.characterRun.loop = true;
    }

    /**
     * Sets the default volume for all sounds.
     *
     * @returns {void}
     */
    setVolumes() {
        this.characterRun.volume = 0.25;
        this.characterJump.volume = 0.35;
        this.characterDamage.volume = 0.4;
        this.characterDEAD.volume = 0.4;
        this.characterSnoring.volume = 0.4;
        this.chickenDead.volume = 0.4;
        this.chickenDead2.volume = 0.4;
        this.endBossCall.volume = 0.4;
        this.coinCollect.volume = 0.35;
        this.bottleCollect.volume = 0.35;
        this.bottleBreak.volume = 0.4;
        this.gameStart.volume = 0.4;
    }

    /**
     * Plays a sound from the beginning.
     *
     * @param {HTMLAudioElement} sound - Sound to play.
     * @returns {void}
     */
    playSound(sound) {
        sound.currentTime = 0;

        sound.play().catch((error) => {
            console.log('Sound konnte nicht abgespielt werden', error);
        });
    }

    /**
     * Stops a sound and resets its playback position.
     *
     * @param {HTMLAudioElement} sound - Sound to stop.
     * @returns {void}
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Starts the running sound if it is not already playing.
     *
     * @returns {void}
     */
    startRunSound() {
        if (this.characterRun.paused) {
            this.characterRun.play().catch((error) => {
                console.log('Lauf-Sound konnte nicht abgespielt werden:', error);
            });
        }
    }

    /**
     * Stops the running sound.
     *
     * @returns {void}
     */
    stopRunSound() {
        if (!this.characterRun.paused) {
            this.stopSound(this.characterRun);
        }
    }
}

/**
 * Global sound manager instance.
 *
 * @type {Sounds}
 */
export const sounds = new Sounds();