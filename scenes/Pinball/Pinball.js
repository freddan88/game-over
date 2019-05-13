class Pinball extends Phaser.Scene {
    constructor(){
      super({ key: 'Pinball' });
    }

    preload() {
        this.load.image('flipperRight', 'assets/sprites/flipper-right.png');
        this.load.image('flipperLeft', 'assets/sprites/flipper-left.png');
    }

    create() {
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.scoreBoard = this.add.rectangle(0, 0, 400, 80, 0x555555).setOrigin(0,0);
        gameState.ballLauncher = this.add.rectangle(370, 500, 2, 500, 0xFFFFFF)

        gameState.scoreCircleT1 = this.add.circle(165, 165, 20, 0xFFFFFF);
        gameState.scoreCircleR2 = this.add.circle(245, 225, 20, 0xFFFFFF);
        gameState.scoreCircleL3 = this.add.circle(85, 225, 20, 0xFFFFFF);
        gameState.scoreCircleB4 = this.add.circle(165, 300, 20, 0xFFFFFF);

        gameState.rightFlipper = this.add.sprite(340, 703, 'flipperRight').setOrigin(1, 0);
        // gameState.leftFlipper = this.add.sprite(40, 700, 'flipperLeft').setOrigin(0, 0);
        gameState.leftFlipper = this.physics.add.sprite(40, 700, 'flipperLeft').setOrigin(0, 0);
        gameState.leftFlipper.body.setAllowGravity(false);
        gameState.rightFlipper.setInteractive();
        gameState.leftFlipper.setInteractive();
    }

    update() {
        if (gameState.cursors.left.isDown) {
            gameState.leftFlipper.angle = -30;
        }
        if (gameState.cursors.left.isUp) {
            gameState.leftFlipper.angle = 0;
        }
        if (gameState.cursors.right.isDown) {
            gameState.rightFlipper.angle = 30;
        }
        if (gameState.cursors.right.isUp) {
            gameState.rightFlipper.angle = 0;
        }
    }
}