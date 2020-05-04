//virus1 prehabs
class Virus1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), game.config.height-tileSize, 'virus1').setOrigin(1.1); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newVirus1 = true;                    // custom property to control barrier spawning
        this.collide = false;                      // pick for new mask
        this.score = 5;
        this.hp = 1;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new virus1 when existing virus1 is picked
        if(!this.newVirus1 && this.pick) {
            this.newVirus1 = true;
            // call parent scene method from this context
            this.scene.addVirus1(this.parent, this.velocity);
        }

        // eliminate virus1 if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }   
}