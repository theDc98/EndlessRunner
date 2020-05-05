//Sanitizer prefabs
class Sanitizer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), Phaser.Math.Between(100, 250), 'sanitizer'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newSanitizer = true;                    // custom property to control barrier spawning
        this.pick = false;                      // pick for new alcohol
        this.score = 5;
        this.hp = 1;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update(){
        // override physics sprite update()
        super.update();

        // add new sanitizer when existing sanitizer is over left-side picked
        // if(this.x < -50 && this.newSanitizer){
        //     this.newSanitizer = false;
        //     this.scene.addSanitizer(this.parent, this.velocity);
        // }
        if (this.x < -51){
            this.destroy();
        }
    }
}
