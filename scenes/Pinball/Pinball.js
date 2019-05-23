class Pinball extends Phaser.Scene {
  constructor(){
    super({ key: 'Pinball' });
  }

  preload() {
    this.load.image('ball', 'assets/sprites/ball.png');
    this.load.image('gameWall', 'assets/sprites/wall.png');
    this.load.image('gameCeiling', 'assets/sprites/topWall.png');
    this.load.image('launcherWall', 'assets/sprites/launcherWall.png');
    this.load.image('launcherSpring', 'assets/sprites/launcherSpring.png');
    this.load.image('bodyBackground', 'assets/sprites/bodyBackground.png');
    this.load.image('flipperPaddle', 'assets/sprites/flipperPaddle.png');
    this.load.image('scoreCircle', 'assets/sprites/scoreCircle.png');
    this.load.json('shapes', 'assets/sprites/spriteShapes.json');
    this.load.atlas('sheet', 'assets/sprites/spriteSheet.png', 'assets/sprites/spriteAtlas.json');
    this.load.image('launcherBlocker', 'assets/sprites/launcherBlocker.png');
    this.load.image('image', 'assets/sprites/image.png');
  }

  create() {
    const shapes = this.cache.json.get('shapes');
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 440, 720, 1, true, true, true, false);

    // Add Images to world
    this.add.image(0, 0, 'bodyBackground').setOrigin(0,0);
    this.matter.add.image(10, 370, 'gameWall').setStatic(true);
    this.matter.add.image(430, 370, 'gameWall').setStatic(true);
    this.matter.add.image(220, 10, 'gameCeiling').setStatic(true);
    this.matter.add.image(384, 430, 'launcherWall').setStatic(true);
    this.add.image(210, 500, 'image');

    // Add Shapes to world
    this.matter.add.image(37, 350, 'sheet', 'shapeBumperLW.png', {shape: shapes.shapeBumperLW});
    this.matter.add.image(70, 672, 'sheet', 'shapeBumperL.png', {shape: shapes.shapeBumperL});
    this.matter.add.image(325, 672, 'sheet', 'shapeBumperR.png', {shape: shapes.shapeBumperR});
    this.matter.add.image(220, 35, 'sheet', 'shapeTop.png', {shape: shapes.shapeTop});

    // Add main ball to game
    gameState.ball = this.matter.add.image(406, 560, 'ball').setFrictionAir(0).setFriction(0).setCircle();
    gameState.ball.body.label = 'playball';
    gameState.ball.body.restitution = 0.6;

    // Add main flipperpaddles to game
    gameState.flipperPaddleR = this.matter.add.image(317, 630, 'flipperPaddle').setFrictionAir(0.25)
    gameState.flipperPaddleR.body.label = 'flipperPaddleR'
    this.matter.add.worldConstraint(gameState.flipperPaddleR, 0, 0, {
      pointA: { x: 325, y: 625},
      pointB: { x: 50, y: 0 },
    });

    gameState.flipperPaddleL = this.matter.add.image(80, 625, 'flipperPaddle').setFrictionAir(0.25).setPosition(0,0)
    gameState.flipperPaddleL.body.label = 'flipperPaddleL'
    this.matter.add.worldConstraint(gameState.flipperPaddleL, 0, 0, {
      pointA: { x: 68, y: 625 },
      pointB: { x: 50, y: 0 },
    });

    // Add sprites with actions to game
    gameState.launcher = this.matter.add.image(407, 660, 'launcherSpring').setStatic(true);
    gameState.scoreDisplay = this.add.text(20 , 20, 'score:', { fontSize: '16px', fill: '#000' });

    gameState.launcherBlocker = this.matter.add.image(407, 20, 'launcherBlocker').setStatic(true);
    gameState.launcherBlocker.body.label = 'launcherBlocker';
    
    gameState.twentyBumper = this.matter.add.image(220, 180, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.twentyBumper.body.label = 'twentyBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.fifteenBumper = this.matter.add.image(120, 280, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.fifteenBumper.body.label = 'fifteenBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.tenBumper = this.matter.add.image(300, 280, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.tenBumper.body.label = 'tenBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.fiveBumper = this.matter.add.image(210, 360, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.fiveBumper.body.label = 'fiveBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    // Check for collisions
    this.matter.world.on('collisionstart', function (event) {
      if (event.pairs[0].bodyB.label === 'twentyBumper'){
        gameState.launcherBlocker.y = 150;
        gameState.score = gameState.score + 20;
        event.pairs[0].bodyA.gameObject.setVelocityY(-8);
      }
      if (event.pairs[0].bodyB.label === 'fifteenBumper'){
        gameState.launcherBlocker.y = 150;
        gameState.score = gameState.score + 15;
        event.pairs[0].bodyA.gameObject.setVelocityY(-8);
      }
      if (event.pairs[0].bodyB.label === 'tenBumper'){
        gameState.launcherBlocker.y = 150;
        gameState.score = gameState.score + 10;
        event.pairs[0].bodyA.gameObject.setVelocityY(-8);
      }
      if (event.pairs[0].bodyB.label === 'fiveBumper'){
        gameState.launcherBlocker.y = 150;
        gameState.score = gameState.score + 5;
        event.pairs[0].bodyA.gameObject.setVelocityY(-10);
      }
      if (event.pairs[0].bodyB.label === 'launcherBlocker'){
        event.pairs[0].bodyA.gameObject.setVelocityX(-10);
      }
      if ((event.pairs[0].bodyB.label === 'flipperPaddleL' && event.pairs[0].bodyA.label === 'playball') || (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleL')){
        gameState.launcherBlocker.y = 150;
      }
      if ((event.pairs[0].bodyB.label === 'flipperPaddleR' && event.pairs[0].bodyA.label === 'playball') || (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleR')){
        gameState.launcherBlocker.y = 150;
      }
      gameState.scoreDisplay.setText('Score: ' + gameState.score);
    });
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.flipperPaddleL.setVelocityY(-15)
    } else {
      gameState.flipperPaddleL.setVelocityY(10)
    }

    if (gameState.cursors.right.isDown) {
      gameState.flipperPaddleR.setVelocityY(-15)
    } else {
      gameState.flipperPaddleR.setVelocityY(10)
    }

    if (gameState.cursors.space.isDown || gameState.cursors.down.isDown) {
      gameState.launcher.setVelocityY(-15)
    } else {
      gameState.launcher.setVelocityY(0)
    }
  }
}