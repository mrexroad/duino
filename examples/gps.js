" arduino = require('../'),
    board, gps;

board = new arduino.Board({
  debug: true
});

gps = new arduino.GPS({
  board: board,
  pin: 2
});

// watchLocation
gps.on('locate', function( err, data ) {

  console.log( data );

/*

Looks like:

{
  time: '033355.000',
  latitude: '4221.1902',
  longitude: '07108.7709',
  hemisphere: { latitude: 'N', longitude: 'W' },
  quality: '2',
  satellites: 6,
  hdop: 1.6,
  altitude: '8.0M'
}

*/


});
