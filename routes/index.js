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

  // Where am I
  var snakes = payload.snakes;
  console.log(JSON.stringify(snakes));
  for (i in snakes) {
    console.log(snakes[i]);
  }

  // Response data
  var data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
