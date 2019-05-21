class Pinball extends Phaser.Scene {
  constructor(){
    super({ key: 'Pinball' });
  }

  preload() {
    this.load.image('flipperPaddleR', 'assets/sprites/flipperPaddle.png');
    this.load.image('flipperPaddleL', 'assets/sprites/flipperPaddle.png');
    this.load.image('stoppers', 'assets/sprites/stoppers.png');
    this.load.image('playball', 'assets/sprites/playball.png');
    this.load.image('launcher', 'assets/sprites/launcher.png');
    this.load.image('blocker', 'assets/sprites/blocker.png');
    this.load.json('shapes', 'assets/game-area-sprites/game-area.json');
    this.load.atlas('sheet', 'assets/game-area-sprites/game-area-sprites.png', 'assets/game-area-sprites/game-area-sprites.json');
  }

  create() {
    const shapes = this.cache.json.get('shapes');
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);

    gameState.flipperPaddleR = this.matter.add.image(315, 665, 'flipperPaddleR')
    .setFrictionAir(0.25)
    gameState.flipperPaddleR.body.label = 'flipperPaddleR'
    this.matter.add.worldConstraint(gameState.flipperPaddleR, 0, 0, {
      pointA: { x: 310, y: 670 },
      pointB: { x: 50, y: 0 },
    });

    gameState.flipperPaddleL = this.matter.add.image(100, 600, 'flipperPaddleL')
    .setFrictionAir(0.25)
    .setPosition(0,0)
    gameState.flipperPaddleL.body.label = 'flipperPaddleL'
    this.matter.add.worldConstraint(gameState.flipperPaddleL, 0, 0, {
      pointA: { x: 70, y: 670 },
      pointB: { x: 50, y: 0 },
    });

    this.matter.add.image(320, 660, 'stoppers')
    .setFriction(0)
    .setScale(1.3)
    .setCircle(10)
    .setStatic(true)

    this.matter.add.image(60, 660, 'stoppers')
    .setFriction(0)
    .setScale(1.3)
    .setCircle(10)
    .setStatic(true)

    // gameState.blocker = this.matter.add.image(386.5, 225, 'blocker')
    gameState.blocker = this.matter.add.image(386.5, 125, 'blocker')
    .setFriction(0)
    .setStatic(true)
    // .visible = false

    gameState.launcher = this.matter.add.image(386.5, 680, 'launcher')
    .setFriction(0)
    .setStatic(true)

    gameState.ball = this.matter.add.image(386, 650, 'playball')
    .setFrictionAir(0)
    .setFriction(0)
    .setCircle()
    gameState.ball.body.label = 'playball'
    gameState.ball.body.restitution = 0.5;

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

    this.add.rectangle(386, 691, 30, 100, 0xC4C4C4);

    this.matter.world.on('collisionstart', function (event) {
      const BodyA = event.pairs[0].bodyA;
      const BodyB = event.pairs[0].bodyB;
      if (event.pairs[0].bodyB.label === 'twentyBumper'){
        console.log("20");
        gameState.blocker.y = 225;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'fifteenBumper'){
        console.log("15");
        gameState.blocker.y = 225;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'tenBumper'){
        console.log("10");
        gameState.blocker.y = 225;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if (event.pairs[0].bodyB.label === 'fiveBumper'){
        console.log("5");
        gameState.blocker.y = 225;
        event.pairs[0].bodyA.gameObject.setVelocityY(-25);
      }
      if ((event.pairs[0].bodyB.label === 'flipperPaddleL' && event.pairs[0].bodyA.label === 'playball') || (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleL')){
        gameState.blocker.y = 225;
      }
      if ((event.pairs[0].bodyB.label === 'flipperPaddleR' && event.pairs[0].bodyA.label === 'playball') || (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleR')){
        gameState.blocker.y = 225;
      }
    });
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.flipperPaddleL.setVelocityY(-25)
    } else {
      gameState.flipperPaddleL.setVelocityY(5)
    }

    if (gameState.cursors.right.isDown) {
      gameState.flipperPaddleR.setVelocityY(-25)
    } else {
      gameState.flipperPaddleR.setVelocityY(5)
    }

    if (gameState.cursors.space.isDown || gameState.cursors.down.isDown) {
      gameState.launcher.setVelocityY(-15)
    } else {
      gameState.launcher.setVelocityY(0)
    }
  }
}
