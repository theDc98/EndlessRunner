//Group Name: HDH.org
//Group Members: Huazhen(Jenny) XU, Rene Ding
//Game Title: Covid-19 Run!
//Date completed: 5/6/2020
//Creative title:
//For our endless runner project, we spent a lot of time on progamming techniques. 
//Due to one of our teammate dropped the course at the end of last week, we had a hard time to finish everything.
//We had some problems about how to adjust the time of item-generate and how to change the game level by increasing the number of objects.
//For the problem, we add some parameters to affect the generation function and the level function later.//
//Additionally, we add a special animation--particle emitter to create a Death animation effect.
//The design of rolling-cities background is brilliant. The scene of travelling between different cities create a sense of escape.
//For this project, all artwork in the game is designed by Jenny.
//Our endless runner form is player can control the movement (jumping)of the character to collect items and avoid obstacles. Players can also kill the obstacles by collecting items to release the character’s skills. The player's ultimate goal is to score higher.
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    audio: {
        context: audioContext
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 230
            }
        }
    },
    scene: [Load, Menu, Credits, Instru, Play ],
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyUP, keyDOWN, keyF, keyR, keyQ;

//define Game Settings
game.settings = {
    initialLevel: 0,
    initialSpeed: 1,

    
}

// define globals
let cursors;
let currentScene = 0;
const SCALE = 1;
const tileSize = 27;
let playMusic;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 50;
let level;
let score;
let health;
let highScore;
let alcohol;
let newHighScore = false;
let Gameover;
