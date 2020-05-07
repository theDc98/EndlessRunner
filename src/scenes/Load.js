class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        //load imgs
        this.load.path = './assets/img/';
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
        //load sounds
        this.load.path = './assets/audio/';
        this.load.audio('bgm', 'bgm2.mp3');
        
    }
    
    create() {
        
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}