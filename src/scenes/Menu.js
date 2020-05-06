class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load bgm
        this.load.path = './assets/img';
    
        //load background
        this.load.image('background', '/background.png');
        this.load.image('ground', '/ground.png');
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);
        //UI
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#CD00CD',
            align: 'right',
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
        this.add.text(centerX, centerY + textSpacer, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 3;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.sound.play('select');
            this.scene.start("creditScene");
        }
    }
}