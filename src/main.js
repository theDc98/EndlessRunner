//Group Name: HDH.org
//Group Members: Jenny XU, Henry Huang, Rene Ding
//Game Title: Covid-19 Run!
//Date completed: 
//Creative title:

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 230
            }
        }
    },
    scene: [ Menu, Instru, Play ],
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyF;

//define Game Settings
game.settings = {
    initialLevel: 0,
    initialSpeed: 2,
}