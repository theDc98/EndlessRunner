class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load Audio
        /* this.load.audio('bgm', './assets/audio/XXX');
        this.load.audio('select', './assets/audio/XXX'); */

        //load background
        this.load.image('background', './assets/imgs/background.png');
        this.load.image('ground', './assets/imgs/ground.png');
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);
        this.ground = this.add.sprite(game.config.width, game.config.height, 'ground', '0').setOrigin(1.1);

        //play bgm
        /* this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 2,
            rate: 1,
            loop: true
        });
        this.bgm.play(); */

        // 改字体 颜色 UI
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
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
        this.add.text(centerX, centerY + textSpacer, 'Type SPACE to start', menuConfig).setOrigin(0.5);

    }

    update(){
        //scroll the background
        this.background.tilePositionX -= 3;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.sound.play('select');
            this.scene.start("instruScene");
        }
    }
}