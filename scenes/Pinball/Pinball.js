class Pinball extends Phaser.Scene {
    constructor(){
      super({ key: 'Pinball' });
    }

    preload() {
        this.load.json('shapes', 'assets/sprites/flipper_shapes.json');
        this.load.atlas('sheet', 'assets/sprites/flippers.png', 'assets/sprites/flippers.json')
        this.load.image('ball', 'assets/sprites/ball.png');
        this.load.image('paddle', './../../assets/sprites/flipperShape.png');
        this.load.image('flipperRight', './../../assets/sprites/flipper-right.png');
        console.log('Matter: ', this.matter)
    }

    create() {
        const shapes = this.cache.json.get('shapes');
        gameState.cursors = this.input.keyboard.createCursorKeys();
        this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);

        const collisionCategoryFlippers = this.matter.world.nextCategory();
        const collisionCategoryBall = this.matter.world.nextCategory();

        gameState.paddleLeft = this.matter.add.image(100, 600, 'paddle')
        .setStatic(true)

        gameState.paddleRight = this.matter.add.image(300, 600, 'paddle')
        .setStatic(true)

        //FLIPPER
        gameState.flipperTest = this.matter.add.image(300, 100, 'paddle')
        this.matter.add.worldConstraint(gameState.flipperTest, 0, 0, {
			pointA: { x: 300, y: 380 }, 
            pointB: { x: 50, y: -5 }
        });
        
        gameState.paddleTest2 = this.matter.add.image(300, 480, 'paddle')
        .setStatic(true)
        
        gameState.ball = this.matter.add.image(220, 10, 'ball')
        gameState.ball.setBounce(150)
        gameState.ball.setFriction(0.15)
        gameState.ball.setCircle()

        gameState.rightFlipper = this.matter.add.sprite(300, 720, 'sheet', 'flipperRight', {shape: shapes.flipper_right})
        // .setIgnoreGravity(true)
        // .setInteractive()
        // .setDensity(50)
        // .setMass(50)
        .setStatic(true)

        gameState.leftFlipper = this.matter.add.sprite(80, 720, 'sheet', 'flipperLeft', {shape: shapes.flipper_left})
        // .setIgnoreGravity(true)
        // .setInteractive()
        // .setDensity(50)
        // .setMass(50)
        .setStatic(true)

        gameState.rightFlipper.setCollisionCategory(collisionCategoryBall);
        gameState.leftFlipper.setCollisionCategory(collisionCategoryBall);
        gameState.ball.setCollisionCategory(collisionCategoryFlippers);
    }

    update() {
        if (gameState.cursors.left.isDown) {
            gameState.leftFlipper.angle = -30;
            gameState.paddleLeft.angle = -20;
            gameState.flipperTest.angle = 20;
        }
        if (gameState.cursors.left.isUp) {
            gameState.leftFlipper.angle = 0;
            gameState.paddleLeft.angle = 20;
        }
        if (gameState.cursors.right.isDown) {
            gameState.rightFlipper.angle = 30;
            gameState.paddleRight.angle = 20;
        }
        if (gameState.cursors.right.isUp) {
            gameState.rightFlipper.angle = 0;
            gameState.paddleRight.angle = -20;
        }
    }
}