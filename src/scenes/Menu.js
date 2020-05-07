class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    // preload(){
    //     //load 
    //     this.load.path = './assets/img';
    
    //     //load background
    //     this.load.image('background', '/background.png');
    //     this.load.image('ground', '/ground.png');
    // }

    create(){
        if (playMusic){
        this.bgm = this.sound.add('bgm',{mute: false, volume: 1, rate: 1, loop: true });
        this.bgm.play();
        }
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);
        //UI
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#CD00CD',
            stroke: '#FFFFFF', 
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text UI
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'Covid-19 Run!', menuConfig).setOrigin(0.5);
        let menu1Config = {fontFamily: 'Courier',fontSize: '32px',color: '#000000',stroke: '#FFFFFF', strokeThickness: 3,padding: {top: 5,bottom: 5,},fixedWidth: 0}
        this.add.text(centerX, centerY + textSpacer, 'Press (SPACE) to Start', menu1Config).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Press (↑) to Instruction', menu1Config).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*3, 'Press (↓) to Credit', menu1Config).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 3;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.bgm.stop();
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            playMusic = false;
            this.scene.start("instruScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            playMusic = false;
            this.scene.start("creditScene");
        }
    }
}