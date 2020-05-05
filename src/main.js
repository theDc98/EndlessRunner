//Group Name: HDH.org
//Group Members: Jenny XU, Henry Huang, Rene Ding
//Game Title: Covid-19 Run!
//Date completed: 
//Creative title:
let cursors;
let currentScene = 0;
const SCALE = 1;
const tileSize = 27;

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 230
            }
        }
    },
    scene: [ Menu, Instru, Play ],
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyF,keyR,keyQ;

//define Game Settings
game.settings = {
    initialLevel: 0,
    initialSpeed: 1,

    
}
// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 64;
// let paddle = null;
// const paddleWidth = 16;
// const paddleHeight = 128;
// const paddleVelocity = 150;
let level;
let score;
let health;
let highScore;
let newHighScore = false;
let Gameover;