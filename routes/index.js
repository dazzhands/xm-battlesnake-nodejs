var express = require('express')
var router  = express.Router()

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
