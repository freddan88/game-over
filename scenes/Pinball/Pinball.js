class Pinball extends Phaser.Scene {
    constructor(){
      super({ key: 'Pinball' });
    }

    preload() {
        this.load.json('shapes', 'assets/sprites/flipper_shapes.json');
        this.load.atlas('sheet', 'assets/sprites/flippers.png', 'assets/sprites/flippers.json')
        this.load.image('ball', 'assets/sprites/ball.png');
        this.load.image('paddle', 'assets/sprites/flipperShape.png');
        this.load.image('flipperRight', 'assets/sprites/flipper-right.png');
    }

    create() {
        const shapes = this.cache.json.get('shapes', {});
        gameState.cursors = this.input.keyboard.createCursorKeys();
        this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);

        gameState.ball = this.matter.add.image(280, 10, 'ball')
        .setBounce(5)
        .setFriction(0)
        .setCircle();
        gameState.ball.body.restitution = 5;

        gameState.rightFlipper = this.matter.add.sprite(300, 720, 'sheet', 'flipperRight', {shape: shapes.flipper_right})
        .setStatic(true);

        gameState.leftFlipper = this.matter.add.sprite(80, 720, 'sheet', 'flipperLeft', {shape: shapes.flipper_left})
        .setStatic(true);

        const cat1 = this.matter.world.nextCategory();
        const cat2 = this.matter.world.nextCategory();

        gameState.ball.setCollisionCategory(cat1);
        gameState.rightFlipper.setCollisionCategory(cat1);
        gameState.leftFlipper.setCollisionCategory(cat2);
        gameState.ball.setCollidesWith([ cat1, cat2 ]);

        this.matter.world.on('collisionstart', function (event) {
            event.pairs[0].bodyA.gameObject.setTint(0xff0000);
            event.pairs[0].bodyB.gameObject.setTint(0x00ff00);
        });
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