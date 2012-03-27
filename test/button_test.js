var arduino = require('../');


// console.log( board );
exports['button'] = function(test) {
  test.expect(2);

  var board = new arduino.Board({
    debug: true
  });

  var button = new arduino.Button({
    board: board,
    pin: 9
  });

  button.on('down', function() {
    test.ok(true, 'down');
    test.ok(button.down, 'state');
    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });

  board.on('ready', function() {
    board.serial.emit('data', '09::01\r');
  });
};
