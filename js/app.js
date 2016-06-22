var Character = function(sprite, x, y, speed) {
  this.sprite = sprite;
  this.x = x;
  this.initialX = x;
  this.y = y;
  this.initialY = y;
  this.speed = speed;
};

// Update the character's position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {

};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Collition detection of the character with object
// Parameter: object, check if the character collides with it
Character.prototype.checkCollition = function(object) {
  var xDiff = this.x - object.x;
  var yDiff = this.y - object.y;
  if(xDiff <= 95 && xDiff >= -95 && yDiff === 0) {
    return true;
  }
  return false;
};

// Enemies our player must avoid
var Enemy = function(y, speed) {
  Character.call(this, 'images/enemy-bug.png', -105, y, speed);
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if(this.x >= 505) {
    this.x = this.initialX;
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  Character.call(this, 'images/char-boy.png', 200, 380, 0);
  this.xStep = 100;
  this.yStep = 80;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.restartPosition = function() {
  this.x = this.initialX;
  this.y = this.initialY;
};
Player.prototype.reset = function() {
  this.restartPosition();
};

//update position based
Player.prototype.handleInput = function(input) {
  switch (input) {
    case 'left':
      this.x -= this.x <= 0 ? 0 : this.xStep;
      break;
    case 'right':
      this.x += this.x >= 400 ? 0 : this.xStep;
      break;
    case 'up':
      this.y -= this.y <= -20 ? 0 : this.yStep;
      break;
    case 'down':
      this.y += this.y >= 380 ? 0 : this.yStep;
      break;
  }
  if(this.y <= -20){
    this.restartPosition();
  }
};

// All enemy objects in an array called allEnemies
var allEnemies = [new Enemy(60, 60), new Enemy(140, 80), new Enemy(220, 50)];
// The player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
