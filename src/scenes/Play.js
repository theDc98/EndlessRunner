class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //         //load Audio
        //         /* this.load.path = './assets/audio/';
        //         this.load.audio('jump', 'XXX');
        //         this.load.audio('pick', 'XXX');
        //         this.load.audio('fire', 'XXX');
        //         this.load.audio('die', 'XXX');
        //         this.load.audio('infected', 'XXX'); */
        
        // load ground
        this.load.path = './assets/';
        this.load.audio('background_music', 'endless runner.wav');
        this.load.audio('pickup_music', 'pickup.wav');
        this.load.audio('hit_music', 'hit.wav');
        this.load.atlas('character', 'character.png', 'character.json');
        this.load.image('background', 'background.png');
        this.load.image('city','cities.png');

        this.load.image('block', 'block.png',{
            frameWideth:25, 
            frameHeight:27
        });
        this.load.image('ground', 'ground.png');

        }
        
    create(){
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;
        this.itemSpeed1 = -400;
        this.itemSpeed2 = -480;
        this.itemSpeed3 = -530;
        this.virus1Speed = -450;
        this.virus2Speed = -500;
        level = 0;

        //creat background music
        this.backgroundMusic = this.sound.add('background_music',{
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true 
        });
        this.backgroundMusic.play();
        // add tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);
        this.city = this.add.tileSprite(0, -5, game.config.width, game.config.height, 'city').setOrigin(0);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);

        // set up character👦
        this.character = this.physics.add.sprite(120, game.config.height-tileSize, 'character', 'side').setScale(SCALE).setOrigin(1.1);

        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('character', {      
                prefix: 'walk',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: 'side',
            defaultTextureKey: 'character',
            frames: [
                { frame: 'side' }
            ],
        });
        
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.character, this.ground);

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        //add items
        this.maskGroup = this.add.group({
            runChildUpdate: true
        });
        this.alcoholGroup = this.add.group({
            runChildUpdate: true
        });
        this.sanitizerGroup = this.add.group({
            runChildUpdate: true
        });

        //add virus
        this.virus1Group = this.add.group({
            runChildUpdate: true
        });
        this.virus2Group = this.add.group({
            runChildUpdate: true
        });

        //ADD text
        this.HealthText= this.add.text(10, 10, `Health: ${level}`, { 
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#083721' , 
            stroke: '#000000', 
            strokeThickness: 3
        });
        this.ScoreText= this.add.text(600, 10, `Score: ${level}`, { 
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#083721' , 
            stroke: '#000000', 
            strokeThickness: 3});
        
    }

    //add items
    addMask(){
        let mask = new Mask(this, this.itemSpeed1);
        this.maskGroup.add(mask);
    }
    addAlcohol(){
        let alcohol = new Alcohol(this, this.itemSpeed3);
        this.alcoholGroup.add(alcohol);
    }
    addSanitizer(){
        let sanitizer = new Sanitizer(this, this.itemSpeed2);
        this.sanitizerGroup.add(sanitizer);
    }
    //add virus
    addVirus1(){
        let virus1 = new Virus1(this, this.virus1Speed);
        this.virus1Group.add(virus1);
    }
    addVirus2(){
        let virus2 = new Virus2(this, this.virus2Speed);
        this.virus2Group.add(virus2);
    }
    
    update(){
        // update tile sprites (tweak for more "speed")
        this.background.tilePositionX += 3;
        this.city.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

		// check if character is grounded
	    this.character.isGrounded = this.character.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.character.isGrounded) {
            this.character.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.character.anims.play('side');
	    }
        // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
	        this.character.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space)) {
	    	this.jumps--;
	    	this.jumping = false;
        }

        if(this.physics.overlap(this.character, this.virus1Group)) {
                this.virus1 = this.virus1Group.getFirst(true);
                this.virus1.destroy();
                this.addVirus1();
                this.sound.play("hit_music",{volume:1});
        }

    }

    levelBump(){
        level++;

        if(level == 2){
            this.addMask();
            this.addAlcohol();
            this.addSanitizer();
            this.addVirus1();
            this.addVirus2();
        }
    }

    /*checkItemStatus(item){
        if(item.pick || item.x<0-game.config.width){
            this.addMask();
        }
    }*/

}


//     //uncompleted
//     update(){
//         //some parameters
//         let centerX = game.config.width/2;
//         let centerY = game.config.height/2;

//         //scroll the background
//         this.background.tilePositionX += 5; 
        
//         //player status
//         this.checkDeath(this.hp);
        
//         //player alive and keep running
//         if(!this.Death){
//             //check key input for jump
//             if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(keySPACE)){
//                 this.player.update();
//             }
//             /* if(Phaser.Input.Keyboard.JustDown(keyF)){
//                 //kill virus
//             } */

//         }else{
//             this.add.text(centerX, centerY*0.8, 'Game Over', textConfig).setOrigin(0.5);
//             this.add.text(centerX, centerY * 1.3 , 'SPACE to restart OR F to return Mene', textConfig).setOrigin(0.5);
//             //check key input for restart
//             if(Phaser.Input.Keyboard.JustDown(keySPACE)){
//                 this.scene.restart("playScene");
//             }
//             //check key input for exit
//             if(Phaser.Input.Keyboard.JustDown(keyF)){
//                 this.scene.start("menuScene");
//             }
//         }

//         //infected by virus
//         if(this.checkVirus(this.player, this.Virus1)){
//             this.elementDisappear(this.virus1);
//             hp -= 2;
//             //this.sound.play('infected', {volume: 0.5});
//             this.checkDeath(this.hp);
//         }
//         if(this.checkVirus(this.player, this.Virus2)){
//             this.elementDisappear(this.virus2);
//             hp -= 4;
//             //this.sound.play('infected', {volume: 0.5});
//             this.checkDeath(this.hp);
//         }

//         //pick up items
//         if(this.checkPick(this.player, this.mask)){
//             this.elementDisappear(this.mask);
//             this.hp += 1;
//             this.score += mask.points;
//         }
//         if(this.checkPick(this.player, this.sanitizer)){
//             this.elementDisappear(this.sanitizer);
//             this.hp += 2;
//             this.score += sanitizer.points;
//         }
//         if(this.checkPick(this.player, this.alcohol)){
//             this.elementDisappear(this.alcohol);
//             // this.bullet++;
//             this.score += alcohol.points;
//         }

//         //kill virus

//         //speed up
//         game.time.events.repeat(5000, 10, speedUp(), this);
        
//     }

//     speedUp(){
//         level++;
//         this.initialSpeed += level;
//     }

//     checkPick(player, item){
//         //pick up items
//         if(player.x < item.x + item.width &&
//             player.x + player.width > item.x &&
//             player.y < item.y + item.height &&
//             player.height + player.y > item.y){
//                 return true;
//          }else{
//              return false;
//          }
//     }

//     checkVirus(player, virus){
//         //killed by virus
//         if(player.x < virus.x + virus.width &&
//             player.x + player.width > virus.x &&
//             player.y < virus.y + virus.height &&
//             player.height + player.y > virus.y){
//                 return true;
//          }else{
//              return false;
//          }
//     }

//     checkDeath(hp){
//         if(hp<=0){
//             return this.isDead = true;
//         }else{
//             return this.isDead = false;
//         }
//     }
    
//     /* elementDisappear(element){


//     } */
// }