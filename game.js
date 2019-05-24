const gameState = {
  score: 0,
  lives: 3,
  gameOver: false,
};

const config = {
  width: 440,
  height: 720,
  backgroundColor: 0X000000,
  title: 'WU18 - DinoBall',
  scene: [Pinball, Gameover],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.5 },
      debug: false,
      enableBody: true,
    }
  }
};
const game = new Phaser.Game(config)
