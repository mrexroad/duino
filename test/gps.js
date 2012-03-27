var arduino = require('../');


// console.log( board );
exports['gps'] = function(test) {
  test.expect(1);

  var board = new arduino.Board({
    debug: true
  });

  var gps = new arduino.GPS({
    board: board,
    pin: 9
  });

  var expecting = {
    time: '024322.000',
    latitude: '4221.1928',
    longitude: '07108.7770',
    hemisphere: { latitude: 'N', longitude: 'W' },
    quality: '2',
    satellites: 7,
    hdop: 1.2,
    altitude: '6.2M'
  };

  gps.on('locate', function(err, data) {
    test.deepEqual( data, expecting, "data object matches expected ");

    console.log( data, expecting );

    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });

  board.on('ready', function() {
    board.serial.emit('data', '$GPGGA,024322.000,4221.1928,N,07108.7770,W,2,07,1.2,6.2,M,-33.7,M,1.8,0000*4B\r');
  });
};
