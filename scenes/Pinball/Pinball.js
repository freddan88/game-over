class Pinball extends Phaser.Scene {
    constructor(){
      super({ key: 'Pinball' });
    }
  
    preload() {
        this.load.image('flipperPaddleR', 'assets/sprites/flipperPaddle.png');
        this.load.image('flipperPaddleL', 'assets/sprites/flipperPaddle.png');
        this.load.image('ball', 'assets/sprites/ball.png');
    }
  
    create() {
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