var arduino = require('../');


// console.log( board );
exports['sensor'] = function(test) {
  test.expect(1);

  var board = new arduino.Board({
    debug: true
  });

  var sensor = new arduino.Sensor({
    board: board,
    pin: 'A0'
  });

  sensor.on('read', function(err, data) {

    test.ok(!!data, "mock data");
    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });

  board.on('ready', function() {
    board.serial.emit('data', 'A0::300\r');
  });
};
