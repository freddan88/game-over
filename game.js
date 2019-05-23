const gameState = {
  score: 0,
  lives: 1,
  gameOver: false
};

const config = {
  width: 400,
  height: 800,
  backgroundColor: 0X000000,
  title: 'WU18 - DinoBall',
  scene: [Pinball, Gameover],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.4 },
      debug: false,
      enableBody: true,
    }
  }
};
const game = new Phaser.Game(config)
