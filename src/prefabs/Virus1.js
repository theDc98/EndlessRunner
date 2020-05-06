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
        this.score = 10;
        this.hp = 4;
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();
        if(this.x < -this.width) {
            this.destroy();
        }
    }   
      
}