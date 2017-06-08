var Game = function (opts) {
console.log('Initializing game');
  this.width = opts.width;
  this.height = opts.height;
  this.game_id = opts.game_id;

  this.grid = {
    snakes: []
  };
};

var proto = Game.prototype;

proto.setBoard = function (myId, snakes, food) {
  this.grid.food = food;
  this.grid.snakes.length = 0;

  var curSnake;
  for (var i = 0; i < snakes; i++) {
    curSnake = snakes[i];
    if (snakes[i].id === myId) {
      this.grid.me = snakes[i];
    } else {
      this.grid.snakes.push(curSnake);
    }
  }
};

proto.moveOk = function (direction) {
console.log('moveok start');
  switch (direction) {
    case 'left':
console.log('try left');
      var newX = this.grid.me.coords[0][0] - 1;
      if (newX < 0) {
        return false;
      }
      return checkSpot(newX);
    case 'right':
      var newX = this.grid.me.coords[0][0] - 1;
      if (newX > this.width - 1) {
        return false;
      }
      return checkSpot(newX);
    case 'up':
      var newY = this.grid.me.coords[0][1] - 1;
      if (newY < 0) {
        return false;
      }
      return checkSpot(newY);
    case 'down':
      var newY = this.grid.me.coords[0][1] - 1;
      if (newY > this.height - 1) {
        return false;
      }
      return checkSpot(newY);
  }
  return true;
};

proto.checkSpot = function (x, y) {
console.log('Can I move to: ' + x + ', ' + y + '?');
  // check me
  for (var i = 0 ; i < this.grid.me.coords.length; i++) {
    if (this.grid.me.coords[i][0] == x && this.grid.me.coords[i][1] == y) {
console.log('... no. I am in my own way');
      return false;
    }
  }

  // check others
  for (var i = 0; i < this.grid.snakes.length; i++) {
    for (var j = 0 ; j < this.grid.me.coords.length; j++) {
      if (this.grid.snakes[i].coords[j][0] == x && this.grid.snakes[i].coords[j][1] == y) {
console.log('... no. ' + this.grid.snakes[i].name + ' is in the way');
        return false;
      }
    }
  }
 
console.log('... should be okay I think');
  return true;
};

// factory method for returning new ClientDb obj
module.exports = function (opts) {
    return new Game(opts);
};

