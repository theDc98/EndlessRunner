class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        // load 
        this.load.path = './assets/';
        // sounds
        this.load.audio('background_music', 'endless runner.wav');
        this.load.audio('jump_music', 'jump.wav');
        this.load.audio('death_music', 'dead1.wav');
        this.load.audio('kill_music', ['kill.mp3']);
        this.load.audio('spray_music', 'shoot2.wav');
        this.load.audio('pickup_music', 'pickup.wav');
        this.load.audio('hit_music', 'hit.wav');

        //imgs
        this.load.atlas('character', 'character.png', 'character.json');
        this.load.image('background', 'background.png');
        this.load.image('ghost', 'ghost.png');
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
        alcohol = 0;
        this.Spray = false;
        Gameover = false;
        this.levelup = true;
        this.addSpeed = 0;
        this.levelSpeed = 0;
        this.level2Speed = 0;

        //create background music
        this.backgroundMusic = this.sound.add('background_music',{mute: false, volume: 0.5, rate: 1,loop: true });
        this.backgroundMusic.play();
        //spray music
        this.sprayMusic = this.sound.add("spray_music",{volume:0.25 ,rate: 1,loop: true });

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

        this.anims.create({ 
            key: 'spray', 
            frames: this.anims.generateFrameNames('character', {      
                prefix: 'spray',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({ 
            key: 'death', 
            frames: this.anims.generateFrameNames('character', {      
                prefix: 'death',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#CD00CD' , 
            stroke: '#000000', 
            strokeThickness: 3 });
        this.ScoreText= this.add.text(600, 10, `Score: ${score}`, { 
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#CD00CD' , 
            stroke: '#000000', 
            strokeThickness: 3});
        this.AlcoholText= this.add.text(10, 50, `Alcohol #: ${alcohol}`, { 
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '30px', 
            color: '#CD00CD' , 
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
        this.background.PositionX += 0.5;
        this.city.tilePositionX += 1;
        this.groundScroll.tilePositionX += 1;
        //check game
        if(!Gameover){
            // check if character is grounded
            this.character.isGrounded = this.character.body.touching.down;
            // if so, we have jumps to spare
            if(this.character.isGrounded) {
                //this.character.anims.play('walk', true);
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
                if(alcohol > 0 && Phaser.Input.Keyboard.JustDown(keyF)){ 
                    this.sprayMusic.play();
                    alcohol -=1;
                    this.AlcoholText.setText('Alcohol #: ' + alcohol);
                    this.Spray = true;
                }
                if (this.Spray){
                    this.clock = this.time.delayedCall(2000, () => {this.Spray = false, this.sprayMusic.stop();}, null, this);
                    this.character.body.x = 65;
                    this.character.anims.play('spray', true);
                } else {
                    this.character.body.x = 65;
                    this.character.anims.play('walk', true);
                }
            } else {
                this.character.anims.play('side');
            }
        
            // allow steady velocity change up to a certain key down duration
            if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
                this.character.body.x = 65;
                this.character.body.velocity.y = this.JUMP_VELOCITY;
                this.jumping = true;
                this.sound.play('jump_music', { volume: 0.1 });
            } 
            // finally, letting go of the UP key subtracts a jump
            if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space)) {
                //this.character.body.x = 65;
                this.jumps--;
                this.jumping = false;
            }
        }
        //if not death,
        if (health>0){
            if(this.physics.overlap(this.character, this.virus1Group)) {
                    this.virus1 = this.virus1Group.getFirst(true);
                    this.virus1.destroy();
                    this.virusCollision(this.virus1);
                    //this.addVirus1();
                    console.log("readd virus1");
                    
            }
            if(this.physics.overlap(this.character, this.virus2Group)) {
                    this.virus2 = this.virus2Group.getFirst(true);
                    this.virus2.destroy();
                    this.virusCollision(this.virus2);
                    console.log("readd virus2");
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
         } else if ( Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.level);
        } else if(Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.scene.start('menuScene');
        }
    }

    levelBump(){
        level++;
        //make game start easy to hard
        if (level%60 == 0){
            this.addSpeed = 0;
            this.levelSpeed = 0;
        } else{
            if(level% 10 == 0){
                this.addSpeed ++;
                if(this.levelSpeed<4){
                    this.levelSpeed ++;
                }
                if (this.level2Speed<3){
                    this.level2Speed ++;
                }
            }
        }
        if(level % (5 + this.addSpeed) == 0){this.addMask();}
        if(level % (5 + this.addSpeed) == 0){this.addAlcohol();}
        if(level % (7 + this.addSpeed) == 0){this.addSanitizer();}
        if(level % (5 - this.levelSpeed) == 0){this.addVirus1();}
        if(level % (4-this.level2Speed) == 0){this.addVirus2();}
    }

    itemCollision(item) {
        this.sound.play("pickup_music",{volume:1});
        score += item.score;
        if (item == this.alcohol && alcohol < 5){
            alcohol ++;
            this.AlcoholText.setText('Alcohol #:' + alcohol);
        }
        if( health < 10 ) {
        health += item.hp;
        this.HealthText.setText('Health: ' + health);
        }
        this.ScoreText.setText('Score: ' + score);
       
    }

    virusCollision(item) {
        if(this.Spray) {
            this.sound.play('kill_music', { volume: 0.25 });
            score += item.score;
            this.ScoreText.setText('Score: ' + score);
        } else {
            if (health-item.hp <=0){
                Gameover = true;
                this.particles = this.add.particles('ghost');
                this.sound.play("death_music",{volume:1});
                this.emitter = this.particles.createEmitter({
                    speed: 50,
                    lifespan: 1000,
                    blendMode: 'Add',
                    scale: {
                        start: 1.5,
                        end: 0.5,
                    },
                    on: false,
                });
                this.particles.emitParticleAt(this.character.body.x+20, this.character.body.y+20, 300);
                this.character.destroy();
                this.GameOver();
                health -= item.hp;
            } else {
                this.sound.play("hit_music",{volume:0.6});
                health -= item.hp;
                this.HealthText.setText('Health: ' + health);
            }
        }
    }

    GameOver(){
        this.backgroundMusic.stop();
        //this.sound.play("pickup_music",{volume:1});
        this.virus1Group.clear();
        this.virus2Group.clear();
        this.maskGroup.clear();
        this.alcoholGroup.clear();
        this.sanitizerGroup.clear();
        this.HealthText.destroy();
        this.ScoreText.destroy();
        this.AlcoholText.destroy();
         // check for high score in local storage
        if (localStorage.getItem('highScore') != null){
            let storedScore = parseInt(localStorage.getItem('highScore'));
            // see if current score is higher than stored score
            if(score > storedScore) {
                localStorage.setItem('highScore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('highScore'));
                newHighScore = false;
            }
        } else {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
            newHighScore = true;
        }
         // Prints out New HighScore!
        if(newHighScore) {
            this.newHighScoreText = this.add.text(centerX, centerY -10, `Congratulation! New Hi-Score!!` , {
                backgroundColor: '#000000',
                fontFamily: 'Helvetica', 
                fontSize: '40px', 
                color: '#CD00CD', 
                strokeThickness: 3 
                }).setOrigin(0.5);
        }
        this.add.text(centerX, centerY - 160, `WOW! You ran for: ${level}S` , { 
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '34px', 
            color: '#CD00CD', 
            strokeThickness: 3 
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, `You score is: ${score}` , { 
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '34px', 
            color: '#CD00CD', 
            strokeThickness: 3 
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 80, `Your Hi-Score: ${highScore}`, { 
            backgroundColor: '#000000',
            fontFamily: 'Helvetica', 
            fontSize: '34px', 
            color: '#CD00CD', 
            strokeThickness: 3 
        }).setOrigin(0.5);

        this.clock = this.time.delayedCall(4000, () => { 
            if(newHighScore) {this.newHighScoreText.destroy();} 
            this.add.text(centerX, centerY - 40, `Press R to restart the game.`, { 
                backgroundColor: '#000000',
                fontFamily: 'Helvetica', 
                fontSize: '34px', 
                color: '#CD00CD', 
                strokeThickness: 3 
            }).setOrigin(0.5);
            this.add.text(centerX, centerY + 3, `Press Q to go back to main menu.`, { 
                backgroundColor: '#000000',
                fontFamily: 'Helvetica', 
                fontSize: '34px', 
                color: '#CD00CD', 
                strokeThickness: 3 
            }).setOrigin(0.5);
        }, null, this);
    }
}