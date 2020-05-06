//mask prehabs
class Mask extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), Phaser.Math.Between(200, 370), 'mask'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newMask = true;                    // custom property to control barrier spawning
        this.pick = false;                      // pick for new mask
        this.score = 5;
        this.hp = 1;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        if (this.x < -51){
            this.destroy();
        }
        // add new mask when existing mask is over left-side picked
        // if(this.x < 0-game.config.width && this.newMask){
        //     this.newMask = false;
        //     this.scene.addMask(this.parent, this.velocity);
        // }

        /*if(this.pick && this.newMask){
            this.newMask = false;
            // call parent scene method from this context
            this.scene.addMask(this.parent, this.velocity);
        }*/

        // eliminate mask if it reaches the left edge of the screen
        /*if(this.x < -this.width) {
            this.destroy();
        }*/
    }   
}