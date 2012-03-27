var arduino = require('../');


// console.log( board );
exports['pir'] = function(test) {
  test.expect(3);

  var board = new arduino.Board({
    debug: true
  });

  var pir = new arduino.PIR({
    board: board,
    pin: 9
  });

  pir.on('calibrated', function(err, data) {
    test.ok(true, 'calibrated');

    pir.on('motionstart', function(err, data) {
      test.ok(true, data);

      board.serial.emit('data', '09::00\r');
    });

    pir.on('motionend', function(err, data) {

      test.ok(true, data);
      test.done();

      process.nextTick(function() {
        process.exit();
      });
    });

    board.serial.emit('data', '09::01\r');
  });
};
