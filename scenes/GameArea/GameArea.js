class GameArea extends Phaser.Scene {
  constructor(){
    super({ key: 'GameArea' });
  }

  preload() {
      this.load.json('shapes', 'assets/game-area-sprites/game-area.json');
      this.load.atlas('sheet', 'assets/game-area-sprites/game-area-sprites.png', 'assets/game-area-sprites/game-area-sprites.json')
  }

  create() {
      const shapes = this.cache.json.get('shapes');
      gameState.cursors = this.input.keyboard.createCursorKeys();
      
      gameState.scoreBoard = this.add.rectangle(0, 0, 400, 80, 0x555555)
      .setOrigin(0,0);

      let generalConfig = {
      setIgnoreGravity: true,
      setInteractive: true,
      setDensity:50,
      setMass: 50
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
        setMass: 50
      }

      gameState.twentyBumper = this.matter.add.sprite(180, 250, 'sheet', '20_bumper', {shape: shapes.twenty_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      //.setOrigin(1, 0)
      .setDensity(50)
      .setMass(50)

      gameState.fifteenBumper = this.matter.add.sprite(100, 320, 'sheet', '15_bumper', {shape: shapes.fifteen_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      //.setOrigin(1, 0)
      .setDensity(50)
      .setMass(50)
      
      gameState.tenBumper = this.matter.add.sprite(290, 300, 'sheet', '10_bumper', {shape: shapes.ten_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      //.setOrigin(1, 0)
      .setDensity(50)
      .setMass(50)

      gameState.fiveBumper = this.matter.add.sprite(210, 370, 'sheet', '5_bumper', {shape: shapes.five_bumper})
      .setCircle(25)
      .setIgnoreGravity(true)
      .setInteractive()
      //.setOrigin(1, 0)
      .setDensity(50)
      .setMass(50)

    }
}