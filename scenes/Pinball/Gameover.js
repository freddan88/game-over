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

    gameState.finalScore = this.add.text(200, 340, 'You got ' + gameState.score + ' points', {
      font: "15px",
      align: 'center',
    });
    gameState.finalScore.setOrigin(0.5);

    gameState.playAgainMessage = this.add.text(200, 400, 'Press _space_ to play again', {
      font: "15px",
      align: 'center',
    });
    gameState.playAgainMessage.setOrigin(0.5);

    gameState.cursors = this.input.keyboard.createCursorKeys();

  }

  update(){
    if (gameState.cursors.space.isDown){
      window.location.reload();
      // gameState.gameOver = false;
      // this.scene.start('Pinball');
      // gameState.score = 0;
    }
  }

}
