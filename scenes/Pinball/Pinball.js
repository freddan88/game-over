class Pinball extends Phaser.Scene {
  constructor(){
    super({ key: 'Pinball' });
  }

  preload() {
    this.load.image('flipperPaddleR', 'assets/sprites/flipperPaddle.png');
    this.load.image('flipperPaddleL', 'assets/sprites/flipperPaddle.png');
    this.load.image('ball', 'assets/sprites/ball.png');
    this.load.json('shapes', 'assets/game-area-sprites/game-area.json');
    this.load.atlas('sheet', 'assets/game-area-sprites/game-area-sprites.png', 'assets/game-area-sprites/game-area-sprites.json');
  }

  create() {
    const shapes = this.cache.json.get('shapes');
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);

    gameState.flipperPaddleR = this.matter.add.image(315, 665, 'flipperPaddleR')
    .setFrictionAir(0.25)
    this.matter.add.worldConstraint(gameState.flipperPaddleR, 0, 0, {
      pointA: { x: 310, y: 670 },
      pointB: { x: 50, y: 0 },
    });

    gameState.flipperPaddleL = this.matter.add.image(100, 600, 'flipperPaddleL')
    .setFrictionAir(0.25)
    .setPosition(0,0)
    this.matter.add.worldConstraint(gameState.flipperPaddleL, 0, 0, {
      pointA: { x: 70, y: 670 },
      pointB: { x: 50, y: 0 },
    });

    this.matter.add.image(320, 660, 'ball')
    .setFriction(0)
    .setScale(1.3)
    .setCircle(10)
    .setStatic(true)

    this.matter.add.image(60, 660, 'ball')
    .setFriction(0)
    .setScale(1.3)
    .setCircle(10)
    .setStatic(true)

    gameState.ball = this.matter.add.image(300, 200, 'ball')
    .setFrictionAir(0)
    .setFriction(0)
    .setScale(1.2)
    .setCircle(10)
    gameState.ball.body.restitution = 0.5;

    gameState.scoreDisplay = this.add.text(200, 300, 'score: 0', { fontSize: '32px', fill: '#83ff00' });

    gameState.topDome = this.matter.add.image(200, 80, 'sheet', 'top_dome', {shape: shapes.top_dome})
    gameState.topDome.body.label = 'topDome';

    gameState.leftSideBumper = this.matter.add.image(20, 480, 'sheet', 'left_side_bumper', {shape: shapes.left_side_bumper})
    gameState.leftSideBumper.body.label = 'leftSideBumper';

    gameState.ballShootWall = this.matter.add.image(370, 500, 'sheet', 'ball_shoot_wall', {shape: shapes.ball_shoot_wall})
    gameState.ballShootWall.body.label = 'ballShootWall';

    gameState.leftBumper = this.matter.add.image(330, 700, 'sheet', 'right_bumper', {shape: shapes.right_bumper})
    gameState.leftBumper.body.label = 'leftBumper';

    gameState.rightBumper = this.matter.add.image(50, 700, 'sheet', 'left_bumper', {shape: shapes.left_bumper})
    gameState.rightBumper.body.label = 'rightBumper';

    gameState.twentyBumper = this.matter.add.image(180, 250, 'sheet', '20_bumper', {shape: shapes.twenty_bumper})
    .setCircle(25)
    .setStatic(true)
    gameState.twentyBumper.body.label = 'twentyBumper';

    gameState.fifteenBumper = this.matter.add.image(100, 320, 'sheet', '15_bumper', {shape: shapes.fifteen_bumper})
    .setCircle(25)
    .setStatic(true)
    gameState.fifteenBumper.body.label = 'fifteenBumper';

    gameState.tenBumper = this.matter.add.image(290, 300, 'sheet', '10_bumper', {shape: shapes.ten_bumper})
    .setCircle(25)
    .setStatic(true)
    gameState.tenBumper.body.label = 'tenBumper';

    gameState.fiveBumper = this.matter.add.image(210, 370, 'sheet', '5_bumper', {shape: shapes.five_bumper})
    .setCircle(25)
    .setStatic(true)
    gameState.fiveBumper.body.label = 'fiveBumper';

    this.matter.world.on('collisionstart', function (event) {
      if (event.pairs[0].bodyB.label === 'twentyBumper'){
        // console.log("20");
        gameState.score = gameState.score + 20;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'fifteenBumper'){
        // console.log("15");
        gameState.score = gameState.score + 15;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'tenBumper'){
        // console.log("10");
        gameState.score = gameState.score + 10;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'fiveBumper'){
        // console.log("5");
        gameState.score = gameState.score + 5;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      //console.log(gameState.score)
      gameState.scoreDisplay.setText('Score: ' + gameState.score);
    });
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.flipperPaddleL.setVelocityY(-25)
    }
    if (gameState.cursors.left.isUp) {
      gameState.flipperPaddleL.setVelocityY(5)
    }
    if (gameState.cursors.right.isDown) {
      gameState.flipperPaddleR.setVelocityY(-25)
    }
    if (gameState.cursors.right.isUp) {
      gameState.flipperPaddleR.setVelocityY(5)
    }
  }
}
