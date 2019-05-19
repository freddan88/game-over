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
        this.load.image('flipperBrick28', 'assets/sprites/flipperBrick28.png');
        this.load.image('flipperBrick1', 'assets/sprites/flipperBrick.png');
        this.load.image('flipperBumperR', 'assets/sprites/flipperBumperRight.png');
        this.load.image('flipperBumperL', 'assets/sprites/flipperBumperRight.png');
    }

    create() {
        const shapes = this.cache.json.get('shapes', {});
        gameState.cursors = this.input.keyboard.createCursorKeys();
        this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);

        gameState.ball = this.matter.add.image(280, 10, 'ball')
        .setBounce(2)
        .setFriction(0)
        .setCircle();
        // gameState.ball.body.restitution = 11;
        gameState.ball.body.restitution = 0.2;

        gameState.flippR = this.matter.add.image(300, 680, 'flipperBumperR')
        .setFrictionAir(0.2)

        this.matter.add.worldConstraint(gameState.flippR, 1, 1, {
			pointA: { x: 300, y: 680 }, 
            pointB: { x: 42, y: 0 },
        });
        
        gameState.flippL = this.matter.add.image(80, 680, 'flipperBumperL')
        .setFrictionAir(0.2)

        this.matter.add.worldConstraint(gameState.flippL, 1, 0, {
			pointA: { x: 80, y: 680 }, 
            pointB: { x: 42, y: 0 },
		});

        
        gameState.flipperBrick1 = this.matter.add.image(325, 740, 'flipperBrick1').setCircle().setScale(0.8).setStatic(true);
        gameState.flipperBrick1.body.label = 'StopperR1';

        gameState.flipperBrick2 = this.matter.add.image(320, 670, 'flipperBrick1').setStatic(true);
        gameState.flipperBrick2.body.label = 'StopperR2';
        
        gameState.flipperBrick3 = this.matter.add.image(274, 740, 'flipperBrick1').setCircle().setScale(0.4).setStatic(true);
        gameState.flipperBrick3.body.label = 'StopperR3';

        gameState.flipperBrick4 = this.matter.add.image(258, 740, 'flipperBrick1').setCircle().setScale(0.2).setStatic(true);
        gameState.flipperBrick4.body.label = 'StopperR4';

        gameState.flipperBrick5 = this.matter.add.image(240, 740, 'flipperBrick1').setCircle().setScale(0.2).setStatic(true);
        gameState.flipperBrick5.body.label = 'StopperR5';
        
        gameState.rightFlipperL1 = this.matter.add.sprite(300, 720, 'sheet', 'flipperRight', {shape: shapes.flipper_right}).setStatic(true);
        gameState.rightFlipperL2 = this.matter.add.sprite(300, 720, 'sheet', 'flipperRight', {shape: shapes.flipper_right}).setStatic(true);
        gameState.leftFlipperL1 = this.matter.add.sprite(80, 720, 'sheet', null, {shape: shapes.flipper_left}).setStatic(true);
        gameState.leftFlipperL2 = this.matter.add.sprite(80, 720, 'sheet', 'flipperLeft', {shape: shapes.flipper_left}).setStatic(true);

        this.matter.world.on('collisionstart', function (event) {
            // event.pairs[0].bodyA.gameObject.setTint(0xff0000);
            // event.pairs[0].bodyB.gameObject.setTint(0x00ff00);
            // console.log(event.pairs[0].bodyB.gameObject.body.gameObject.texture.key)
            if (event.pairs[0].bodyB.label === 'StopperR1'){
                event.pairs[0].bodyA.gameObject.setVelocityY(-10);
            }
            if (event.pairs[0].bodyB.label === 'StopperR2'){
                event.pairs[0].bodyA.gameObject.setVelocityY(-15);
            }
            if (event.pairs[0].bodyB.label === 'StopperR3'){
                event.pairs[0].bodyA.gameObject.setVelocityY(-20);
            }
            if (event.pairs[0].bodyB.label === 'StopperR4'){
                event.pairs[0].bodyA.gameObject.setVelocityY(-25);
            }
        });
    }

    update() {
        if (gameState.cursors.left.isDown) {
            gameState.flipperBrick1.x -= 2;
        }
        if (gameState.cursors.left.isUp) {
            gameState.flippL.setVelocityY(-100)
        }
        if (gameState.cursors.right.isDown) {
            gameState.flipperBrick1.x += 2;
            gameState.flippR.setVelocityY(-25)
        }
        if (gameState.cursors.right.isUp) {
            gameState.flippR.setVelocityY(5)
        }
    }
}