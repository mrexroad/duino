var arduino = require('../'),
    board;

board = new arduino.Board({
  debug: true
});

exports['board'] = {
  'connected & message': function(test) {
    test.expect(3);

    board.on('connected', function() {
      test.ok(true, 'connected');
      board.write('foo');
    });

    board.on('ready', function() {
      test.ok(true, 'ready');
    });

    board.on('data', function(data) {
      test.ok(true, 'message');
      test.done();
    });
  }
};
