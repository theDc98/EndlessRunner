//virus1 prehabs
class Virus1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), game.config.height-tileSize-20, 'virus1'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newVirus1 = true;                    // custom property to control barrier spawning
        this.collide = false;                      // pick for new mask
        this.score = 5;
        this.hp = 4;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new virus1 when existing virus1 is over left-side picked
        // if(this.x < -50 && this.newVirus1){
        //     this.newVirus1 = false;
        //     this.scene.addVirus1(this.parent, this.velocity);
        // }
        if (this.x < -51){
            this.destroy();
        }
    }   
}