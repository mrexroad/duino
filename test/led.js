var arduino = require('../');


// console.log( board );
exports['led'] = function(test) {
  test.expect(4);

  var board = new arduino.Board({
    debug: true
  });

  var led = new arduino.Led({
    board: board,
    pin: 9
  });

  var api = [ 'on', 'off', 'blink', 'fade' ];

  board.on('ready', function() {

    api.forEach(function(method) {
      test.ok(method in led, method);
    });

    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });
};
