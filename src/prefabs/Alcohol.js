//Alcohol prefabs
class Alcohol extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width+Phaser.Math.Between(game.config.width, game.config.width*2), Phaser.Math.Between(100, 350), 'alcohol'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);                    
        this.score = 1;
        this.hp = 0;
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new alcohol when existing alcohol is over left-side picked
        // if(this.x < 0-game.config.width && this.newAlcohol){
        //     this.newAlcohol = false;
        //     this.scene.addAlcohol(this.parent, this.velocity);
        // }
        if (this.x < -51){
            this.destroy();
        }
    }   
}