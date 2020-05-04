//virus2 prehabs
class Virus2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), game.config.height-tileSize, 'virus2').setOrigin(1.1); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newVirus2 = true;                    // custom property to control barrier spawning
        this.collide = false;                      // pick for new mask
        this.score = 5;
        this.hp = 1;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new virus2 when existing virus2 is over left-side picked
        if(this.x < 0-game.config.width && this.newVirus2){
            this.newVirus2 = false;
            this.scene.addVirus2(this.parent, this.velocity);
        }
    }   
}