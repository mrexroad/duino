var events = require("events"),
    util = require("util");

/*
 * Main GPS constructor
 * Process options
 * Tell the board to set it up
 */

function ToDecimalDegrees() {
}

var GPS = function (options) {
  if (!options || !options.board) {
    throw new Error("Must supply required options to GPS");
  }
  this.board = options.board;
  this.pin = this.board.normalizePin(options.pin || 2);

  this.board.on("ready", function () {
    this.board.log("info", "initializing gps");
    this.init();
  }.bind(this));

  this.board.on("data", function (message) {
    var m = message.slice(0, -1), //m = message.slice(0, -1).split("::"),
        err = null,
        data = {
          time: null,
          latitude: null,
          longitude: null,
          hemisphere: {
            latitude: null,
            longitude: null
          },
          quality: null,
          satellites: null,
          hdop: null,
          altitude: null
        },
        pin, fields;

    if (!m.length) {
      return;
    }

    // pin = m[0];

    // Refer to
    // http://aprs.gids.nl/nmea/#gga
    // http://www.gpsinformation.org/dale/nmea.htm#position


    if ( m.indexOf("$GPGGA") === 0 ) {
      // console.log( "valid" );
      // console.log( message );

      fields = m.split(",");

      // TODO: make time less shitty.
      data.time = fields[1];
      data.latitude = fields[2];
      data.longitude = fields[4];

      data.hemisphere = {
        latitude: fields[3],
        longitude: fields[5]
      };

      data.quality = fields[6];
      data.satellites = +fields[7];
      data.hdop = +fields[8];
      data.altitude = fields[9] + fields[10];

      // TODO: Do something usefull with err
      //$GPGGA,024322.000,4221.1928,N,07108.7770,W,2,07,1.2,6.2,M,-33.7,M,1.8,0000*4B
      this.emit("locate", err, data);
    }
  }.bind(this));
};

util.inherits(GPS, events.EventEmitter);

GPS.prototype.command = function () {
  var msg = "96" + this.pin + ([].slice.call(arguments).join(""));

  // this.board.log( "info", "command", msg );
  this.board.write(msg);
};

GPS.prototype.init = function () {
  this.command("01");
};

GPS.prototype.setPosition = function () {
  // Reserved 02 code
  // this.command("02");
};

GPS.prototype.getPosition = function () {
  this.command("03");
};


module.exports = GPS;
