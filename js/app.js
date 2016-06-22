// Character class, parent class for enemies and player
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
  return xDiff <= 80 && xDiff >= -75 && yDiff === 0;
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

// Player class, the user is going to use this character
var Player = function() {
  Character.call(this, 'images/char-boy.png', 200, 380, 0);
  this.xStep = 100;
  this.yStep = 80;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
// Reset the position of the player
Player.prototype.restartPosition = function() {
  this.x = this.initialX;
  this.y = this.initialY;
};
Player.prototype.reset = function() {
  this.restartPosition();
};

// Gem class, collectable gems
var Gem = function(sprite, x, y, points) {
  Character.call(this, sprite, x, y, 0);
  this.points = points;
};
Gem.prototype = Object.create(Character.prototype);
Gem.prototype.constructor = Gem;
// Draw the character on the screen, required method for game
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 70);
};
// Collition detection of the character with gems
// Parameter: object, check if the character collides with it
Gem.prototype.checkCollition = function(object) {
  var xDiff = this.x - 25 - object.x;
  var yDiff = this.y - 80 - object.y;
  return xDiff === 0 && yDiff === 0;
};

// Update position based on input
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
};

// Check if the player has won
Player.prototype.hasWon = function() {
  return this.y <= -20;
};

// Class to mantain the score
var Scorer = function() {
  this.score = 0;
  this.x = 10;
  this.y = 550;
};

// clear the score
Scorer.prototype.clear = function() {
  this.score = 0;
};
// update the score by adding value
Scorer.prototype.add = function(value) {
  this.score += value;
};
// update the score by substracting value
Scorer.prototype.sub = function(value) {
  this.score -= value;
};

// Draw the scorer on the screen
Scorer.prototype.render = function() {
  ctx.fillText('Score: ' + this.score, this.x, this.y);
};

// All enemy objects in an array called allEnemies
var allEnemies = [];
// function to populate allEnemies
var createEnemies = function() {
  allEnemies = [];
  for(var lane=0; lane<3; lane++) {
    for(var i=0; i<2; i++) {
      var speed = Math.random() * 250 + 50;
      allEnemies.push(new Enemy(60 + 80 * lane, speed));
    }
  }
};
// All gems that can be collected by the player
var gems = [];
// function to populate gems
var createGems = function() {
  gems = [];
  var positionX = Math.round(Math.random() * 4);
  var positionY = Math.round(Math.random() * 2) + 1;
  var positionX2 = positionX;
  var positionY2 = positionY;
  while(positionX === positionX2 && positionY === positionY2){
    positionX2 = Math.round(Math.random() * 4);
    positionY2 = Math.round(Math.random() * 2) + 1;
  }
  gems.push(new Gem('images/Gem Blue.png', 25 + 100 * positionX, 60 + 80 * positionY, 5));
  gems.push(new Gem('images/Gem Green.png', 25 + 100 * positionX2, 60 + 80 * positionY2, 10));
};
// The player object in a variable called player
var player = new Player();
// The object to show the scores
var scorer = new Scorer();


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
