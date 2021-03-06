//create a scoreboard class that will contain the points and the x and y values for the scoreboard
var Scoreboard = function() {
  this.point = 0;
  this.x = 30;
  this.y = 100;
};
//the scoreboard render function will contain how to draw the scoreboard and where to draw it
Scoreboard.prototype.render = function() {
  ctx.fillStyle = "white";
  ctx.font = "25pt Impact";
  ctx.fillText("Score: " + this.point.toString(), this.x, this.y);
};

//gems class -->random gems in the field
var Gems = function() {
  this.possibleGemsY = [40, 130, 220];
  this.possibleGemsX = [0, 100, 200, 300, 400];
  this.sprites = ['images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png'];
  this.x = this.possibleGemsX[Math.floor(Math.random() * 5)];
  this.y = this.possibleGemsY[Math.floor(Math.random() * 3)];
  this.sprite = this.sprites[Math.floor(Math.random() * 3)];
};

Gems.prototype.render = function() {
  //gems will start appearing after the player gains 5 points
  if (score.point > 5) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};


Gems.prototype.update = function() {
  if ((this.x === player.x) && (this.y - 50 <= player.y) && (this.y + 50 >= player.y)) {
    this.x = this.possibleGemsX[Math.floor(Math.random() * 5)];
    this.y = this.possibleGemsY[Math.floor(Math.random() * 3)];
    if (this.sprite === 'images/gem-blue.png') {
      score.point += 1;
    } else if (this.sprite === 'images/gem-green.png') {
      score.point += 2;
    } else if (this.sprite === 'images/gem-orange.png') {
      score.point += 4;
    };
    this.sprite = this.sprites[Math.floor(Math.random() * 3)];
  };
};

// Enemies our player must avoid
var Enemy = function() {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  //create an array of all the possible locations for the enemy to start from
  this.possibleEnemyY = [40, 130, 220];
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  //randomly chooses one of the 3 options of locations
  this.y = this.possibleEnemyY[Math.floor(Math.random() * 3)];
  //the speed of each bug needs to be random. However, should not be to fast or to slow
  //could add a difficulty level which changes the speed(in the future)
  this.speed = Math.floor(Math.random() * 300) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //checks if the x value is greater than the canvas and if it isnt then moves the enemy
  //the dt parameter makes sure that the game runs at the same speed for all computers
  //if it is then it brings the enemy back to one of the random locations
  if (this.x < 500) {
    this.x += this.speed * dt;
  } else {
    this.x = 0;
    this.y = this.possibleEnemyY[Math.floor(Math.random() * 3)];
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  //This should be changed in order for the player to have a choice
  this.characterSprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
  this.sprite = this.characterSprites[0]; //set to default sprite
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function(dt) {
  if (this.y < 0) {
    this.reset();
    score.point += 1;
  };
  for (var i = 0; i < allEnemies.length; i++) {
    if ((this.y <= allEnemies[i].y + 50) && (this.y >= allEnemies[i].y - 50) && (this.x >= allEnemies[i].x - 50) && (this.x <= allEnemies[i].x + 50)) {
      this.reset();
      score.point -= 1;
    };
  };
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//resets the player location to the start
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var score = new Scoreboard();
var gem = new Gems();

//player movement should be made in order for it to be possible to collide with
//the enemies

//the handleInput will handle player movement and character change
//will also check to see if the character/player does not go out of bounds
Player.prototype.handleInput = function(key) {

  if (key === 'left' && this.x > 50) {
    this.x -= 100;
  } else if (key === 'up') {
    this.y -= 90;
  } else if (key === 'right' && this.x < 400) {
    this.x += 100;
  } else if (key === 'down' && this.y !== 400) {
    this.y += 90;
  } else if (typeof key === "number") {
    this.sprite = this.characterSprites[key];

  }

};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    49: 0,
    50: 1,
    51: 2,
    52: 3,
    53: 4,
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
