export class Sounds {
    characterRun = new Audio('sounds/sounds/character/characterRun.mp3');
    characterJump = new Audio('sounds/sounds/character/characterJump.wav');
    characterDamage = new Audio('sounds/sounds/character/characterDamage.mp3');
    characterDEAD = new Audio('sounds/sounds/character/characterDead.wav');

    chickenDead = new Audio('sounds/sounds/chicken/chickenDead.mp3');
    chickenDead2 = new Audio('sounds/sounds/chicken/chickenDead2.mp3');

    coinCollect = new Audio('sounds/sounds/collectibles/collectSound.wav');
    bottleCollect = new Audio('sounds/sounds/collectibles/bottleCollectSound.wav');
    bottleBreak = new Audio('sounds/sounds/throwable/bottleBreak.mp3');
    gameStart = new Audio('sounds/sounds/game/gameStart.mp3');

    constructor() {
        this.setVolums();

        this.characterRun.loop = true;
    }

    setVolums() {
        this.characterRun.volume = 0.25;
        this.characterJump.volume = 0.35;
        this.characterDamage.volume = 0.4;
        this.characterDEAD.volume = 0.4;
        this.chickenDead.volume = 0.4;
        this.chickenDead2.volume = 0.4;
        this.coinCollect.volume = 0.35;
        this.bottleCollect.volume = 0.35;
        this.bottleBreak.volume = 0.4;
        this.gameStart.volume = 0.4;
    }

    playSound(sound) {
        sound.currentTime = 0;

        sound.play().catch((error) => {
            console.log('Sound konnte nicht abgespielt werden', error);
        });
    }
        
    stopSound(sound) {
            sound.pause();
            sound.currentTime = 0;
        }

    startRunSound() {
            if (this.characterRun.paused) {
                this.characterRun.play().catch((error) => {
                    console.log('Lauf-Sound konnte nicht abgespielt werden:', error);
                });
            }
        }
    
    stopRundSound() {
        if (!this.characterRun.paused) {
            this.stopSound(this.characterRun);
        }
    }
}
export const sounds = new Sounds();