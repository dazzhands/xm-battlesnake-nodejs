var express = require('express')
var router  = express.Router()


var step = -1;

// Handle POST request to '/start'
var width = 0;
var height = 0;
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
var payload = req.body;
width = payload.width;
height = payload.height;

  // Response data
  var data = {
    "color": "#FF0000",
    "secondary_color": "#EE0000",
    "head_url": "http://i.imgur.com/KHK6N99.png",
    "name": "Robotlove",
    "taunt": "My heart, my aching heart",
    "head_type": "regular",
    "tail_type": "regular"
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {

  // return res.json(circle());

  // Request
  var payload = req.body;
  console.log(payload);

  // Find me
  var me = payload.you;
  console.log(me);
  if (me === undefined) {
    return up();
  }

  // Where am I
  var snakes = payload.snakes;
  var meSnake;
  console.log(JSON.stringify(snakes));
  for (i in snakes) {
    console.log(snakes[i]);
    if (snakes[i].id == me) {
      meSnake = snakes[i];
    }
  }
  console.log("This is me: " + JSON.stringify(meSnake));
  console.log("This is where I am: " + meSnake.coords);

  // Where is food
  var food = payload.food;
  console.log('Food location: ' + food);

  // Response data
setBoard(me, snakes, food); // (myId, snakes, food)
  var data = goToFood(food, meSnake.coords);

  return res.json(data)
})

function goToFood(food, meSnake) {
  var food_x = food[0][0];
  var snake_x = meSnake[0][0];
  console.log(food_x);
  console.log(snake_x);

console.log('trying move');
  if (moveOk('right')) {
    var data = right();
  } else if (moveOk('left')) {
    var data = left();
  } else if (moveOk('up')) {
    var data = up();
  } else {
    var data = down();
  }
  return data;

/*
  if ( food_x > snake_x) {
    return right();
  }
  else if (food_x < snake_x) {
    return left();
  }

  var food_y = food[0][1];
  var snake_y = meSnake[0][1];
  if (food_y < snake_y) {
    return up();
  }

  return down();
*/
}

function up() {
  return {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }
}

function down() {
  return {
    move: 'down', // one of: ['up','down','left','right']
    taunt: 'Kiss my *ss, snake!', // optional, but encouraged!
  }
}

function left() {
  return {
    move: 'left', // one of: ['up','down','left','right']
    taunt: 'Kiss my *ss, snake!', // optional, but encouraged!
  }
}

function right() {
  return {
    move: 'right', // one of: ['up','down','left','right']
    taunt: 'Kiss my *ss, snake!', // optional, but encouraged!
  }
}

function circle() {
  if (step == 3) {
    step = -1;
  }

  step = step + 1;
  if (step == 0) {
    return up();
  }
  if (step == 1) {
    return right();
  }
  if (step == 2) {
    return down();
  }

  return left();
}


var grid = {
  food: [],
  snakes: []
};

function setBoard(myId, snakes, food) {
  grid.food = food;
  grid.snakes.length = 0;

console.log('myId: '+myId);
console.log('snakes: '+snakes);
  var curSnake;
  for (var i = 0; i < snakes.length; i++) {
console.log('snake id is: '+snakes[i].id);
    curSnake = snakes[i];
    if (snakes[i].id === myId) {
      grid.me = snakes[i];
    } else {
      grid.snakes.push(curSnake);
    }
  }
console.log('board is: '+ JSON.stringify(grid));
}

function moveOk(dir) {
console.log('moveok start, dir == ' + dir);
  var curX = grid.me.coords[0][0];
  var curY = grid.me.coords[0][1];
  switch (dir) {
    case 'left':
      var newX = curX - 1;
      if (newX < 0) {
        return false;
      }
      return checkSpot(newX, curY);
    case 'right':
      var newX = curX + 1;
      if (newX > width - 1) {
        return false;
      }
      return checkSpot(newX, curY);
    case 'up':
      var newY = curY - 1;
      if (newY < 0) {
        return false;
      }
      return checkSpot(curX, newY);
    case 'down':
      var newY = curY + 1;
      if (newY > height - 1) {
        return false;
      }
      return checkSpot(curX, newY);
  }
  return true;
};

function checkSpot(x, y) {
console.log('Can I move to: ' + x + ', ' + y + '?');
  // check me
  for (var i = 0 ; i < grid.me.coords.length; i++) {
    if (grid.me.coords[i][0] == x && grid.me.coords[i][1] == y) {
console.log('... no. I am in my own way');
      return false;
    }
  }

  // check others
  for (var i = 0; i < grid.snakes.length; i++) {
    for (var j = 0 ; j < grid.me.coords.length; j++) {
      if (grid.snakes[i].coords[j][0] == x && grid.snakes[i].coords[j][1] == y) {
console.log('... no. ' + grid.snakes[i].name + ' is in the way');
        return false;
      }
    }
  }
 
console.log('... should be okay I think');
  return true;
}



module.exports = router
