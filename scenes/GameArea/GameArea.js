class GameArea extends Phaser.Scene {
  constructor(){
    super({ key: 'GameArea' });
  }

  preload() {
      this.load.json('shapes', 'assets/game-area-sprites/game-area.json');
      this.load.atlas('sheet', 'assets/game-area-sprites/game-area-sprites.png', 'assets/game-area-sprites/game-area-sprites.json')
      this.load.image('flipperPaddleR', 'assets/sprites/flipperPaddle.png');
      this.load.image('flipperPaddleL', 'assets/sprites/flipperPaddle.png');
      this.load.image('ball', 'assets/sprites/ball.png');
  }

  create() {
      const shapes = this.cache.json.get('shapes');
      gameState.cursors = this.input.keyboard.createCursorKeys();
      this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);
      
      gameState.scoreBoard = this.add.rectangle(0, 0, 400, 80, 0x555555)
      .setOrigin(0,0);

      let generalConfig = {
      setIgnoreGravity: true,
      setStatic: true,
      setDensity: 50,
      setMass: 300,
      };

      gameState.topDome = this.matter.add.sprite(200, 80, 'sheet', 'top_dome', {shape: shapes.top_dome}, generalConfig)

      gameState.leftSideBumper = this.matter.add.sprite(20, 410, 'sheet', 'left_side_bumper', {shape: shapes.left_side_bumper}, generalConfig)

      gameState.ballShootWall = this.matter.add.sprite(370, 480, 'sheet', 'ball_shoot_wall', {shape: shapes.ball_shoot_wall}, generalConfig)

      gameState.leftBumper = this.matter.add.sprite(330, 700, 'sheet', 'right_bumper', {shape: shapes.right_bumper}, generalConfig)

      gameState.rightBumper = this.matter.add.sprite(50, 700, 'sheet', 'left_bumper', {shape: shapes.left_bumper}, generalConfig)

      let circleConfig = {
        setCircle: 25,
        setIgnoreGravity: true,
        setInteractive: true,
        setDensity: 50,
        setMass: 20
      }

      gameState.twentyBumper = this.matter.add.sprite(180, 250, 'sheet', '20_bumper', {shape: shapes.twenty_bumper})
      .setCircle(25)
      .setFriction(0)
      .setBounce(10)
      .setStatic(true)
      .setIgnoreGravity(true)
      console.log(gameState.twentyBumper.friction);

      gameState.fifteenBumper = this.matter.add.sprite(100, 320, 'sheet', '15_bumper', {shape: shapes.fifteen_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      .setDensity(50)
      .setMass(50)
      .setStatic(true)
      
      gameState.tenBumper = this.matter.add.sprite(290, 300, 'sheet', '10_bumper', {shape: shapes.ten_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      .setDensity(50)
      .setMass(50)
      .setStatic(true)

      gameState.fiveBumper = this.matter.add.sprite(210, 370, 'sheet', '5_bumper', {shape: shapes.five_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      .setDensity(50)
      .setMass(50)
      .setStatic(true)

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