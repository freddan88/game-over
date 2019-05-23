const gameState = {
  score: 0,
  scoreDisplay: '',
  lives: 3,
  livesDisplay: '',
  gameOver: false
};

const config = {
  width: 400,
  height: 800,
  backgroundColor: 0X000000,
  title: 'WU18 - DinoBall',
  scene: [Pinball],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.4 },
      debug: true,
      enableBody: true,
    }
  }
};
const game = new Phaser.Game(config)
