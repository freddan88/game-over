const gameState = {
    onColor: 0xaaffaa,
    offColor: 0xffaaaa,
    score: 0,
  };
  
  const config = {
    width: 400,
    height: 800,
    backgroundColor: 0X000000,
    title: 'WU18 - DinoBall',
    scene: [Pinball],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: true,
        enableBody: true,
      }
    }
  };
  
const game = new Phaser.Game(config)