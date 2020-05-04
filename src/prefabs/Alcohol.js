//Alcohol prefabs
class Alcohol extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), Phaser.Math.Between(120, 370), 'alcohol'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.newAlcohol = true;                    // custom property to control barrier spawning
        this.pick = false;                      // pick for new alcohol
        this.score = 5;
        this.hp = 1;

       //没有重力，在水平线
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new alcohol when existing alcohol is picked
        if(!this.newAlcohol && this.pick) {
            this.newAlcohol = true;
            // call parent scene method from this context
            this.scene.addAlcohol(this.parent, this.velocity);
        }

        // eliminate alcohol if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }   
}