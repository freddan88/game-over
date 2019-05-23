class Gameover extends Phaser.Scene {
  constructor(){
    super({ key: 'Gameover' });
  }

  create(){
    gameState.gameOverMessage = this.add.text(200, 300, 'Game Over!', {
      font: "40px",
      align: 'center',
    });
    gameState.gameOverMessage.setOrigin(0.5);

    gameState.playAgainMessage = this.add.text(200, 400, 'Press _enter_ to play again', {
      font: "15px",
      align: 'center',
    });
    gameState.playAgainMessage.setOrigin(0.5);
  }

}
