class GameArea extends Phaser.Scene {
  constructor(){
    super({ key: 'GameArea' });
  }

  preload() {
    this.load.image('ball', 'assets/sprites/ball.png');
    this.load.json('shapes', 'assets/game-area-sprites/game-area.json');
    this.load.atlas('sheet', 'assets/game-area-sprites/game-area-sprites.png', 'assets/game-area-sprites/game-area-sprites.json')
  }

  create() {
      const shapes = this.cache.json.get('shapes');
      gameState.cursors = this.input.keyboard.createCursorKeys();
      this.matter.world.setBounds(0, 0, 400, 800, 1, true, true, true, false);
      
      gameState.ball = this.matter.add.image(280, 200, 'ball')
      .setBounce(2)
      .setFriction(0)
      .setCircle();
      gameState.ball.body.restitution = 0.2;


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
            console.log("20");
            event.pairs[0].bodyA.gameObject.setVelocityY(-25);
        }
        if (event.pairs[0].bodyB.label === 'fifteenBumper'){
            console.log("15");
            event.pairs[0].bodyA.gameObject.setVelocityY(-25);
        }
        if (event.pairs[0].bodyB.label === 'tenBumper'){
            console.log("10");
            event.pairs[0].bodyA.gameObject.setVelocityY(-25);
        }
        if (event.pairs[0].bodyB.label === 'fiveBumper'){
            console.log("5");
            event.pairs[0].bodyA.gameObject.setVelocityY(-25);
        }
    });
    }
}