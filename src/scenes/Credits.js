class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    preload(){
        //load imgs
        this.load.path = './assets/img/';
        this.load.image([
            //load background
            { key: 'background' },
        ]);
        
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);
        
        //UI and text
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#000000',
            align: 'left',
        }
        let text1Config = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#000000',
            align: 'right',
        }
        let text2Config = {
            fontFamily: 'Courier',
            fontSize: '22px',
            color: '#000000',
            align: 'right',
        }
        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Courier',
            fontSize: '22px',
            stroke: '#FFFFFF', 
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }

        
        //add credits
        this.add.text(centerX/4, centerY/3, 'Game By:', titleConfig).setOrigin(0.5);
        this.add.text(centerX/2, centerY-100, 'Jenny Xu, Rene Ding', text1Config).setOrigin(0.5);
        this.add.text(centerX/4, centerY, 'Music By:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+55, 'Cabled_mess [https://freesound.org/people/cabled_mess/]', text2Config).setOrigin(0.5);
        
        //type space to play
        this.add.text(centerX, centerY+160, '[ Press (SPACE) to Return ]', creditConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 3;
    
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("menuScene");
        }
    }
}