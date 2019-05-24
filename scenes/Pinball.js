class Pinball extends Phaser.Scene {
  constructor(){
    super({ key: 'Pinball' });
  }

  spawnBall() {
    gameState.ball = this.matter.add.image(406, 560, 'ball').setFrictionAir(0).setFriction(0).setCircle();
    gameState.ball.body.label = 'playball';
    gameState.ball.body.restitution = 0.5;
  }

  preload() {
    this.load.image('ball', 'assets/sprites/ball.png');
    this.load.image('gameWall', 'assets/sprites/wall.png');
    this.load.image('gameCeiling', 'assets/sprites/topWall.png');
    this.load.image('scoreCircle', 'assets/sprites/scoreCircle.png');
    this.load.image('launcherWall', 'assets/sprites/launcherWall.png');
    this.load.image('flipperPaddle', 'assets/sprites/flipperPaddle.png');
    this.load.image('bodyBackground', 'assets/images/bodyBackground.png');
    this.load.image('launcherSpring', 'assets/sprites/launcherSpring.png');
    this.load.image('launcherBlocker', 'assets/sprites/launcherBlocker.png');
    this.load.image('image', 'assets/images/image.png');

    this.load.json('shapes', 'assets/sprites/spriteShapes.json');

    this.load.atlas('sheet', 'assets/sprites/spriteSheet.png', 'assets/sprites/spriteAtlas.json');

    this.load.audio('rawr', 'assets/sounds/Monster2.wav');
    // this.load.audio('roar', 'assets/sounds/Monster03.wav');
    // this.load.audio('snarl', 'assets/sounds/Monster01.wav');
    // this.load.audio('growl', 'assets/sounds/growl_01.flac');
    this.load.audio('music', 'assets/sounds/GameMusic2.ogg');
  }

  create() {
    const shapes = this.cache.json.get('shapes');
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, 440, 720, 1, true, true, true, false);

    // Add soundeffects
    game.sound.add('rawr');
    game.sound.add('music');

    // Add Images to world
    this.add.image(0, 0, 'bodyBackground').setOrigin(0,0);
    this.matter.add.image(10, 370, 'gameWall').setStatic(true);
    this.matter.add.image(430, 370, 'gameWall').setStatic(true);
    this.matter.add.image(220, 10, 'gameCeiling').setStatic(true);
    this.matter.add.image(384, 430, 'launcherWall').setStatic(true);
    this.add.image(210, 500, 'image');

    // Add Shapes to world
    this.matter.add.image(220, 35, 'sheet', 'shapeTop.png', {shape: shapes.shapeTop});
    this.matter.add.image(69, 672, 'sheet', 'shapeBumperL.png', {shape: shapes.shapeBumperL});
    this.matter.add.image(325, 672, 'sheet', 'shapeBumperR.png', {shape: shapes.shapeBumperR});
    this.matter.add.image(35, 360, 'sheet', 'shapeBumperLW.png', {shape: shapes.shapeBumperLW});

    // Add main ball to game
    this.spawnBall();

    // this.sound.play('music', {
    //   loop:true,
    //   volume: 2
    // });

    // Add main flipperpaddles to game
    gameState.flipperPaddleR = this.matter.add.image(325, 625, 'flipperPaddle').setFrictionAir(0.25)
    gameState.flipperPaddleR.body.label = 'flipperPaddleR'
    this.matter.add.worldConstraint(gameState.flipperPaddleR, 0, 0, {
      pointA: { x: 325, y: 625},
      pointB: { x: 50, y: 0 },
    });

    gameState.flipperPaddleL = this.matter.add.image(68, 625, 'flipperPaddle').setFrictionAir(0.25).setPosition(0,0)
    gameState.flipperPaddleL.body.label = 'flipperPaddleL'
    this.matter.add.worldConstraint(gameState.flipperPaddleL, 0, 0, {
      pointA: { x: 68, y: 625 },
      pointB: { x: 50, y: 0 },
    });

    // Add sprites with actions to game
    gameState.launcherBlocker = this.matter.add.image(407, 20, 'launcherBlocker').setStatic(true);
    gameState.launcherBlocker.body.label = 'launcherBlocker';
    gameState.launcherBlocker.body.restitution = 0.5;

    gameState.launcher = this.matter.add.image(407, 660, 'launcherSpring').setStatic(true);
    gameState.livesDisplay = this.add.text(340 , 20, 'Lives: 3', { fontSize: '16px', fill: '#000' });
    gameState.scoreDisplay = this.add.text(20 , 20, 'Score: ' + gameState.score, { fontSize: '16px', fill: '#000' });

    gameState.twentyBumper = this.matter.add.image(220, 180, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.twentyBumper.body.label = 'twentyBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.fifteenBumper = this.matter.add.image(120, 270, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.fifteenBumper.body.label = 'fifteenBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.tenBumper = this.matter.add.image(300, 280, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.tenBumper.body.label = 'tenBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    gameState.fiveBumper = this.matter.add.image(210, 360, 'scoreCircle').setCircle(25).setFriction(0).setStatic(true);
    gameState.fiveBumper.body.label = 'fiveBumper';
    gameState.twentyBumper.body.frictionStatic = 0;

    this.add.rectangle(410, 660, 70, 125, 0x998354);

    const blockerPositionY = () => {
      gameState.launcherBlocker.y = 100;
    }

    const bumperCollisionActions = (score, velocity, event) => {
      gameState.score = gameState.score + score;
      event.pairs[0].bodyA.gameObject.setVelocityY(velocity);
      blockerPositionY();
    }


    // Check for collisions
    this.matter.world.on('collisionstart', function (event) {
      if ((event.pairs[0].bodyB.label === 'twentyBumper' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'twentyBumper')){
        bumperCollisionActions(20, -5, event);
        //this.sound.play('rawr');
      }

      if ((event.pairs[0].bodyB.label === 'fifteenBumper' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'fifteenBumper')){
        bumperCollisionActions(15, -10, event);
        //this.sound.play('rawr');
      }

      if ((event.pairs[0].bodyB.label === 'tenBumper' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'tenBumper')){
        bumperCollisionActions(10, -10, event);
        //this.sound.play('rawr');
      }

      if ((event.pairs[0].bodyB.label === 'fiveBumper' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'fiveBumper')){
        bumperCollisionActions(5, -10, event);
        //this.sound.play('rawr');
      }

      if ((event.pairs[0].bodyB.label === 'flipperPaddleL' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleL')){
        blockerPositionY();
      }

      if ((event.pairs[0].bodyB.label === 'flipperPaddleR' && event.pairs[0].bodyA.label === 'playball') ||
      (event.pairs[0].bodyB.label === 'playball' && event.pairs[0].bodyA.label === 'flipperPaddleR')){
        blockerPositionY();
      }
      gameState.scoreDisplay.setText('Score: ' + gameState.score);
    });
  }

  update() {
    if(gameState.gameOver == false){
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

      if(gameState.ball.y > 720 && gameState.lives >= 1 ){
        gameState.lives = gameState.lives -= 1;
        gameState.livesDisplay.setText('Lives: ' + gameState.lives);
        gameState.scoreDisplay.setText('Score: '+ gameState.score)
        gameState.launcherBlocker.y = 20;
        this.sound.play('rawr')
        this.spawnBall();

      } else if(gameState.lives <= 0){
        gameState.gameOver = true;
        this.scene.stop('Pinball');
        this.scene.transition({
          target: "Gameover",
          duration: 100
        });
      }
    }
  }
}
