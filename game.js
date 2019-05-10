'use strict';

// gameState = {}

function preload() {
  this.load.image('r-paddle-bumper', 'assets/images/r-paddle-bumper.png');
  this.load.image('l-paddle-bumper', 'assets/images/l-paddle-bumper.png');
}

function create() {
  let scoreboard = this.add.rectangle(200, 37.5, 500, 75, 0x555555);
  let ballshoot = this.add.rectangle(369, 500, 3, 450, 0xFFFFFF)
  let circle4 = this.add.circle(265.6, 301, 25, 0xFFFFFF);
  let circle1 = this.add.circle(115.2, 326, 25, 0xFFFFFF);
  let circle2 = this.add.circle(182.4, 266, 25, 0xFFFFFF);
  let circle3 = this.add.circle(202.4, 370, 25, 0xFFFFFF);
  let r_paddle_bumper = this.add.sprite(300, 700,'r-paddle-bumper');
  let l_paddle_bumper = this.add.sprite(100, 700,'l-paddle-bumper');
}

const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 800,
	backgroundColor: "#000000",
	scene: {
    create,
    preload
	}
}

const game = new Phaser.Game(config);