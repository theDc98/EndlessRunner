//player prefabs
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, hp){
        super(scene, x, y, texture, hp);
        scene.add.existing(this);  //add object to existing, displayList, updateList
        this.isDead = false;  //track player's death status
        this.jump = scene.sound.add('jump');  //add jump sfx
    }
    
    update(){
        this.jump.play();
        this.player.setVelocityY(-280);
    }
}