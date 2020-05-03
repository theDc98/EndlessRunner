class Instru extends Phaser.Scene{
    constructor(){
        super("instruScene");
    }
    preload(){
        //load images
        this.load.path = './assets/';
        this.load.image([
            //load background
            //{ key: 'background' },
            //load player
            //{ key: 'character' },
            //load items
            { key: 'mask' },
            { key: 'alcohol' },
            { key: 'sanitizer' },
            { key: 'virus1' },
            { key: 'virus2' },
        ]);
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);

        //UI and text
        let instruConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            align: 'left',
            fixedWidth: 0,
        }
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        /* this.add.text(centerX, centerY - textSpacer, 'Covid-19 Run!', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Type SPACE to start', menuConfig).setOrigin(0.5);
        
        this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5); */
        //console.log(this);

        //add instructions
        this.add.text(centerX, 30, 'Instruction', instruConfig).setOrigin(0.5);
        this.add.image(centerX/4, 80, 'mask').setScale(1.5).setOrigin(0.5);
        this.add.text(centerX+50, 80, ' Mask will add 1 HP & 5 points', instruConfig).setOrigin(0.5);
        this.add.image(centerX/4, 140, 'alcohol').setScale(1.5).setOrigin(0.5);
        this.add.text(centerX+50, 140, ' Alcohol can kill Virus once & 7 points', instruConfig).setOrigin(0.5);
        this.add.image(centerX/4, 200, 'sanitizer').setScale(1.5).setOrigin(0.5);
        this.add.text(centerX+50, 200, ' Sanitizer will add 2 hp & 10 points', instruConfig).setOrigin(0.5);
        this.add.image(centerX/4, 260, 'virus1').setScale(1.5).setOrigin(0.5);
        this.add.text(centerX+50, 260, ' Virus1 will reduce 2 hp ', instruConfig).setOrigin(0.5);
        this.add.image(centerX/4, 320, 'virus2').setScale(1.5).setOrigin(0.5);
        this.add.text(centerX+50, 320, ' Virus2 will reduce 4 hp ', instruConfig).setOrigin(0.5);
        
        //type space to play
        this.add.text(centerX, 400, 'Type SPACE to Play', instruConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 4;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.sound.play('select');
            this.scene.start("playScene");
        }
    }
}