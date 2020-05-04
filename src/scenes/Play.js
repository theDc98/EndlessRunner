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
        this.load.atlas('character', 'character.png', 'character.json');
        //this.load.spritesheet('character','character01.png');
        //this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('background', 'background.png');
        //,{
        //     frameWideth:53.5, 
        //     frameHeight:64
        // });
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
        currentScene = 3;
        this.physics.world.gravity.y = 2600;
        /*
        this.itemSpeed = -30;
        this.itemSpeedMax = -100;
        this.level = 0; 
        this.player.death = falsh;
        */

        // add background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);

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
        this.character = this.physics.add.sprite(120, game.config.height/2-tileSize, 'character', 'side').setScale(SCALE);

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

        // // add arrow key graphics as UI
        // this.upKey = this.add.sprite(64, 32, 'arrowKey');
		// this.leftKey = this.add.sprite(32, 64, 'arrowKey');
		// this.downKey = this.add.sprite(64, 64, 'arrowKey');
		// this.rightKey = this.add.sprite(96, 64, 'arrowKey');
		// this.leftKey.rotation = Math.PI/2*3;
		// this.downKey.rotation = Math.PI;
        // this.rightKey.rotation = Math.PI/2;
        // this.leftKey.tint = 0x333333;
        // this.downKey.tint = 0x333333;
        // this.rightKey.tint = 0x333333;

        
       
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.character, this.ground);

        /* 
        this.itemGroup = this.add.group(){
            runChildUpdate: true    // make sure update runs on group children
        }); 
        this.physics.add.collider(this.mask, this.ground);
        this.addMask();
        */
    }

    /*
    addMask(){
        let mask = new Mask(this, this.itemSpeed);     // create new mask
        this.itemGroup.add(mask);                         // add it to existing group
    }
    */

    update(){
        // update tile sprites (tweak for more "speed")
        this.background.tilePositionX += this.SCROLL_SPEED;
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
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.character.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	        //this.upKey.tint = 0xFACADE;
	    } else {
	    	//this.upKey.tint = 0xFFFFFF;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }

    //check pick up items
    /* itemsCollision(){
        //this.sound.play('pick', { volume: 0.5 });  // play pickup sound
        this.score += this.mask.score;          //add bonus score
        this.hp += this.mask.hp;                //add bonus hp
        mask.pick();              
    }
    */
}
//     
//     create(){
//         //some parameters
//         this.level = this.initialLevel;
//         this.score = 0;
//         let centerX = game.config.width/2;

//         //随机数  game.rnd.integerInRange(min, max);
//         //var value = Phaser.Math.Between(min, max);
//         let a = Phaser.Math.Between(600, 1000); //maskX
//         let b = Phaser.Math.Between(1200, 2000); //alcoholX
//         let c = Phaser.Math.Between(800, 1200); //sanitizerX
//         let d = Phaser.Math.Between(350, 1200); //virus1X
//         let e = Phaser.Math.Between(500, 1000);  //virus2X
//         let height1 = Phaser.Math.Between(200, 600); //maskY
//         let height2 = Phaser.Math.Between(200, 600); //alcoholY
//         let height3 = Phaser.Math.Between(200, 800); //sanitizerY  

//         //jump input
//         keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//         //place background
//         this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);

//         //add ground
//         this.platform = this.physics.add.staticGroup();
//         this.ground = this.platform.create(centerX, game.config.height-25, 'ground').setScale(1.8).refreshBody().setOrigin(0.5);
//         this.ground.body.immovable = true;
    
//         //add player and physics system
//         this.player = this.physics.add.sprite(30, 300, 'run').play('player').setOrigin(0.5);
        
//         this.physics.add.collider(this.player, this.ground);
//         this.player.setCollideWorldBounds(true);
//         this.player.setBounce(0.25);

//         //add items
//         this.mask = new Mask(this, game.config.width+a, height1, 'mask', 5).setOrigin(0, 5);
//         this.alcohol = new Alcohol(this, game.config.width+b, height2, 'alcohol', 7).setOrigin(0, 5);
//         this.sanitizer = new Sanitizer(this, game.config.width+c, height3, 'sanitizer', 10).setOrigin(0, 5);
        
//         //add virus
//         this.virus1 = new Virus1(this, game.config.width+d, 350, 'virus1', 3).setOrigin(0.5);
//         this.virus2 = new Virus2(this, game.config.width+e, 350, 'virus2', 5).setOrigin(0.5);
//     }
    
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