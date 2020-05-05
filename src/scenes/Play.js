class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        // load 
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
        this.Speedup = 0;
        this.virusSpeedup = 0;
        this.physics.world.gravity.y = 2600;
        this.itemSpeed1 = -400;
        this.itemSpeed2 = -480;
        this.itemSpeed3 = -530;
        this.virus1Speed = -450;
        this.virus2Speed = -500;
        score = 0;
        level = 0;
        health = 10;

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
        this.character = this.physics.add.sprite(120, game.config.height-tileSize, 'character', 'side').setScale(SCALE).setOrigin(1);

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
        this.HealthText= this.add.text(10, 10, `Health: ${health}`, { 
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#083721' , 
            stroke: '#000000', 
            strokeThickness: 3
        });
        this.ScoreText= this.add.text(600, 10, `Score: ${score}`, { 
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#083721' , 
            stroke: '#000000', 
            strokeThickness: 3});
        
    }

    //add items
    addMask(){
        let mask = new Mask(this, this.itemSpeed1).setScale(1.5);
        this.maskGroup.add(mask);
    }
    addAlcohol(){
        let alcohol = new Alcohol(this, this.itemSpeed3).setScale(1.5);
        this.alcoholGroup.add(alcohol);
    }
    addSanitizer(){
        let sanitizer = new Sanitizer(this, this.itemSpeed2).setScale(1.5);
        this.sanitizerGroup.add(sanitizer);
    }
    //add virus
    addVirus1(){
        let virus1 = new Virus1(this, this.virus1Speed).setScale(1.1);
        this.virus1Group.add(virus1);
    }
    addVirus2(){
        let virus2 = new Virus2(this, this.virus2Speed).setScale(1.1);
        this.virus2Group.add(virus2);
    }
    
    update(){
        // update tile sprites (tweak for more "speed")
        this.background.tilePositionX += 0.5;
        this.city.tilePositionX += 1;
        this.groundScroll.tilePositionX += 1;

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
                this.virusCollision(this.virus1);
                
        }
        if(this.physics.overlap(this.character, this.virus2Group)) {
                this.virus2 = this.virus2Group.getFirst(true);
                this.virus2.destroy();
                this.virusCollision(this.virus2);
        }
        if(this.physics.overlap(this.character, this.maskGroup)) {
                this.mask = this.maskGroup.getFirst(true);
                this.mask.destroy();
                this.itemCollision(this.mask);
        }
        if(this.physics.overlap(this.character, this.sanitizerGroup)) {
                this.sanitizer = this.sanitizerGroup.getFirst(true);
                this.sanitizer.destroy();
                this.itemCollision(this.sanitizer);
        }
        if(this.physics.overlap(this.character, this.alcoholGroup)) {
                this.alcohol = this.alcoholGroup.getFirst(true);
                this.alcohol.destroy();
                this.itemCollision(this.alcohol);
        }

    }

    levelBump(){
        level++;
        if(level/20 == 1){
            this.Speedup += 1;
        }
        if(level/30 == 1 && this.virusSpeedup < 1.5){
            this.virusSpeedup += 0.5;
        }
        if(level % (5+ this.Speedup) == 1){
            this.addMask();
        }
        if(level % (8 + this.Speedup) == 1){
            this.addAlcohol();
        }
        if(level % (12+ this.Speedup) == 1){   
            this.addSanitizer();
        }
        if(level % (3-this.virusSpeedup) == 1){
            this.addVirus1();
        }
        if(level % (2-this.virusSpeedup) == 1){
            this.addVirus2();
        }
    }

    itemCollision(item) {
        this.sound.play("pickup_music",{volume:1});
        score += item.score;
        if(health<10){
        health += item.hp;
        this.HealthText.setText('Health: ' + health);
        }
        this.ScoreText.setText('Score: ' + score);
    }

    virusCollision(item) {
        this.sound.play("hit_music",{volume:1});
        if(health > 0){
        health -= item.hp;
        this.HealthText.setText('Health: ' + health);
        } else{
            GameOver();
        }
    }

    GameOver(){
        //this.sound.play("pickup_music",{volume:1});

    }
}