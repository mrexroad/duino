var arduino = require('../');


// console.log( board );
exports['piezo'] = function(test) {
  test.expect(2);

  var board = new arduino.Board({
    debug: true
  });

  var piezo = new arduino.Piezo({
    board: board,
    pin: 9
  });

  var api = [ 'tone', 'note' ];

  board.on('ready', function() {

    api.forEach(function(method) {
      test.ok(method in piezo, method);
    });

    test.done();

    process.nextTick(function() {
      process.exit();
    });
  });
};
