var express = require('express')
var router  = express.Router()

<<<<<<< HEAD
var game = require('../lib/game');
=======
var step = -1;
>>>>>>> eedb6462d8edcce3a58d518a93c88f657e1fa3ec

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

  return res.json(circle());

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
<<<<<<< HEAD
console.log('trying move');
  if (game.moveOk('down')) {
    var data = down();
  } else if (game.moveOk('up')) {
    var data = up();
  } else if (game.moveOk('left')) {
    var data = left();
  } else {
    var data = right();
  }
=======
  var data = goToFood(food, meSnake.coords);
>>>>>>> eedb6462d8edcce3a58d518a93c88f657e1fa3ec

  return res.json(data)
})

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

function goToFood(food, meSnake) {
  console.log("food" + food[0]);
  console.log("meSnake" + meSnake)

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

module.exports = router
