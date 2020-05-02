class Instru extends Phaser.Scene{
    constructor(){
        super("instruScene");
    }
    preload(){
        //load images
        this.load.path = './assets/imgs/';
        this.load.image([
            //load background
            { background: 'background' },
            //load player
            { player: 'player' },
            //load items
            { mask: 'mask' },
            { alcohol: 'alcohol' },
            { sanitizer: 'sanitizer' },
            { virus1: 'virus1' },
            { virus2: 'virus2' },
        ]);
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);

        //UI and text
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
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'Covid-19 Run!', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Type SPACE to start', menuConfig).setOrigin(0.5);
        
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);
        //console.log(this);
        this.add.text(20, 20, "Roecket Patrol Menu");

    }

    update(){
        //scroll the background
        this.background.tilePositionX -= 4;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.sound.play('select');
            this.scene.start("playScene");
        }
    }
}