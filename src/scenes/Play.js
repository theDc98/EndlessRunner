class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load Audio
        /* this.load.path = './assets/audio/';
        this.load.audio('jump', 'XXX');
        this.load.audio('pick', 'XXX');
        this.load.audio('fire', 'XXX');
        this.load.audio('die', 'XXX');
        this.load.audio('infected', 'XXX'); */

        //load ground
        //this.load.atlas('ground', 'ground.png', 'ground.json');
        //this.load.image('ground', './assets/imgs/ground.png');
        
        //load player
        //this.load.atlas('player', 'image.png', 'atlas.json');
        //this.load.image('player', './assets/img/character.png');
        this.load.animation('player', 'assets/img/character.json');
        this.load.atlas('run', 'assets/img/character.png', 'assets/img/character.json');
        //load item

        //load animation of kill-virus
        //this.load.spritesheet('kill', './assets/imgs/XXX', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //some parameters
        this.level = this.initialLevel;
        this.score = 0;
        let centerX = game.config.width/2;

        //随机数  game.rnd.integerInRange(min, max);
        //var value = Phaser.Math.Between(min, max);
        let a = Phaser.Math.Between(600, 1000); //maskX
        let b = Phaser.Math.Between(1200, 2000); //alcoholX
        let c = Phaser.Math.Between(800, 1200); //sanitizerX
        let d = Phaser.Math.Between(350, 1200); //virus1X
        let e = Phaser.Math.Between(500, 1000);  //virus2X
        let height1 = Phaser.Math.Between(200, 600); //maskY
        let height2 = Phaser.Math.Between(200, 600); //alcoholY
        let height3 = Phaser.Math.Between(200, 800); //sanitizerY  

        //jump input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);

        //add ground
        this.platform = this.physics.add.staticGroup();
        this.ground = this.platform.create(centerX, game.config.height-25, 'ground').setScale(1.8).refreshBody().setOrigin(0.5);
        this.ground.body.immovable = true;
    
        //add player and physics system
        this.player = this.physics.add.sprite(30, 300, 'run').play('player').setOrigin(0.5);
        
        this.physics.add.collider(this.player, this.ground);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.25);

        //add items
        this.mask = new Mask(this, game.config.width+a, height1, 'mask', 5).setOrigin(0, 5);
        this.alcohol = new Alcohol(this, game.config.width+b, height2, 'alcohol', 7).setOrigin(0, 5);
        this.sanitizer = new Sanitizer(this, game.config.width+c, height3, 'sanitizer', 10).setOrigin(0, 5);
        
        //add virus
        this.virus1 = new Virus1(this, game.config.width+d, 350, 'virus1', 3).setOrigin(0.5);
        this.virus2 = new Virus2(this, game.config.width+e, 350, 'virus2', 5).setOrigin(0.5);
    }
    
    //uncompleted
    update(){
        //some parameters
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        //scroll the background
        this.background.tilePositionX += 5; 
        
        //player status
        this.checkDeath(this.hp);
        
        //player alive and keep running
        if(!this.Death){
            //check key input for jump
            if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.player.update();
            }
            /* if(Phaser.Input.Keyboard.JustDown(keyF)){
                //kill virus
            } */

        }else{
            this.add.text(centerX, centerY*0.8, 'Game Over', textConfig).setOrigin(0.5);
            this.add.text(centerX, centerY * 1.3 , 'SPACE to restart OR F to return Mene', textConfig).setOrigin(0.5);
            //check key input for restart
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.restart("playScene");
            }
            //check key input for exit
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.start("menuScene");
            }
        }

        //infected by virus
        if(this.checkVirus(this.player, this.Virus1)){
            this.elementDisappear(this.virus1);
            hp -= 2;
            //this.sound.play('infected', {volume: 0.5});
            this.checkDeath(this.hp);
        }
        if(this.checkVirus(this.player, this.Virus2)){
            this.elementDisappear(this.virus2);
            hp -= 4;
            //this.sound.play('infected', {volume: 0.5});
            this.checkDeath(this.hp);
        }

        //pick up items
        if(this.checkPick(this.player, this.mask)){
            this.elementDisappear(this.mask);
            this.hp += 1;
            this.score += mask.points;
        }
        if(this.checkPick(this.player, this.sanitizer)){
            this.elementDisappear(this.sanitizer);
            this.hp += 2;
            this.score += sanitizer.points;
        }
        if(this.checkPick(this.player, this.alcohol)){
            this.elementDisappear(this.alcohol);
            // this.bullet++;
            this.score += alcohol.points;
        }

        //kill virus

        //speed up
        game.time.events.repeat(5000, 10, speedUp(), this);
        
    }

    speedUp(){
        level++;
        this.initialSpeed += level;
    }

    checkPick(player, item){
        //pick up items
        if(player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.height + player.y > item.y){
                return true;
         }else{
             return false;
         }
    }

    checkVirus(player, virus){
        //killed by virus
        if(player.x < virus.x + virus.width &&
            player.x + player.width > virus.x &&
            player.y < virus.y + virus.height &&
            player.height + player.y > virus.y){
                return true;
         }else{
             return false;
         }
    }

    checkDeath(hp){
        if(hp<=0){
            return this.isDead = true;
        }else{
            return this.isDead = false;
        }
    }
    
    /* elementDisappear(element){


    } */
}