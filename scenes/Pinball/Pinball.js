class Pinball extends Phaser.Scene {
    constructor(){
      super({ key: 'Pinball' });
    }

    preload() {
        this.load.image('flipperRight', 'assets/sprites/flipper-right.png');
        this.load.image('flipperLeft', 'assets/sprites/flipper-left.png');
        this.load.json('shapes', 'assets/sprites/flipper_shapes.json');
        this.load.atlas('sheet', 'assets/sprites/flippers.png', 'assets/sprites/flippers.json')
        this.load.image('ball', 'assets/sprites/ball.png');
    }

    create() {
        const shapes = this.cache.json.get('shapes');
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        gameState.scoreBoard = this.add.rectangle(0, 0, 400, 80, 0x555555)
        .setOrigin(0,0);

        gameState.ballLauncherWall = this.add.rectangle(370, 500, 2, 500, 0xFFFFFF)

        gameState.scoreCircleT1 = this.add.circle(165, 165, 20, 0xFFFFFF);
        gameState.scoreCircleR2 = this.add.circle(245, 225, 20, 0xFFFFFF);
        gameState.scoreCircleL3 = this.add.circle(85, 225, 20, 0xFFFFFF);
        gameState.scoreCircleB4 = this.add.circle(165, 300, 20, 0xFFFFFF);

        //gameState.ball = this.matter.add.image(100, 200, 'ball')
        //.setOrigin(0, 0)
        //.setBounceY(2)

        //gameState.rightFlipper = this.matter.add.image(340, 703, 'flipperRight')
        gameState.rightFlipper = this.matter.add.sprite(300, 720, 'sheet', 'flipperRight', {shape: shapes.flipper_right})
        .setIgnoreGravity(true)
        .setInteractive()
        //.setOrigin(1, 0)
        .setDensity(50)
        .setMass(50)
        .setCollidesWith(gameState.ball);

        //gameState.leftFlipper = this.matter.add.image(40, 700, 'flipperLeft')
        gameState.leftFlipper = this.matter.add.sprite(80, 720, 'sheet', 'flipperLeft', {shape: shapes.flipper_left})
        .setIgnoreGravity(true)
        .setInteractive()
        //.setOrigin(0, 0)
        .setDensity(50)
        .setMass(50)
        .setCollidesWith(gameState.ball);

        gameState.ball.circle(100, 200, 20, {render: {fillStyle: blueColor}})
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