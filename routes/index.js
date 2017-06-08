var express = require('express')
var router  = express.Router()

var step = -1;

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

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
  console.log(food);

  // Response data
  var data = goToFood(food, meSnake.coords);

  return res.json(data)
})

function goToFood(food, meSnake) {
  console.log("food" + food[0]);
  console.log("meSnake" + meSnake[0]);

  var food_x = food[0][0];
  var snake_x = meSnake[0][0];
  console.log(food_x);
  console.log(snake_x);
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

module.exports = router
