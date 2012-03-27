var arduino = require('../');


// console.log( board );
exports['ping'] = function(test) {
  test.expect(3);

  var board = new arduino.Board({
    debug: true
  });

  var ping = new arduino.Ping({
    board: board,
    pin: 9
  });

  ping.on('read', function(err, data) {

    test.equal(this.microseconds, 300, "microseconds");
    test.equal(this.inches, 2.027027027027027, "inches");
    test.equal(this.centimeters, 5.172413793103448, "centimeters");

    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });

  board.on('ready', function() {
    board.serial.emit('data', '09::read::300\r');
  });
};
