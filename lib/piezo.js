
/*
 * Main Piezo constructor
 * Process options
 * Tell the board to set pin mode
 */
var Piezo = function (options) {
  if (!options || !options.board) {
    throw new Error("Must supply required options to Piezo");
  }

  this.board = options.board;
  this.pin = this.board.normalizePin(options.pin || 11);

  // Set pinMode for OUTPUT
  this.board.pinMode(this.pin, "out");

  // Module specific instance properties
  // Piezo buzzer brightness
  this.bright = false;

  this.playing = false;
  // Locked? This piezo"s current lock state,
  // this allows us to avoid potentially making way too
  // may serial writes
  this.isLocked = false;
  // Stores data about this piezo"s state
  // used to determine lock state
  this.state = {
    tone: null,
    note: null,
    lapse: null
  };
};

/*
 * Send a square wave to the speaker for a given duration
 */
Piezo.prototype.tone = function(tone, duration) {
  this.board.log("info", "starting tone " + tone.toString().green + " for " + duration.toString().green + " milliseconds");

  // timeHigh is in microseconds and our delay() function is in milliseconds
  var micro = Math.floor(tone / 1000),
      i = 0;

  setInterval(function(){
    if (this.bright) {
      this.board.digitalWrite(this.pin, this.board.LOW);
      this.bright = false;
    } else {
      this.board.digitalWrite(this.pin, this.board.HIGH);
      this.bright = true;
    }

    if (i++ >= duration) {
      clearInterval(this);

      this.board.log("info", "tone end");
    }
  }.bind(this), micro);

};

/*
 * Play a tone for a given duration to create a note
 *
 * timeHigh = period / 2 = 1 / (2 * toneFrequency)
 *
 * note   frequency   period   timeHigh
 *  c       261hz      3830      1915
 *  d       294hz      3400      1700
 *  e       329hz      3038      1519
 *  f       349hz      2854      1432
 *  g       392hz      2550      1275
 *  a       440hz      2272      1136
 *  b       493hz      2028      1014
 *  c       523hz      1912       956
 */
Piezo.prototype.note = function (note, duration) {
  this.board.log("info", "playing note " + note.green + " for " + duration.toString().green + " milliseconds");
  this.tone({
    "c": 1915,
    "d": 1700,
    "e": 1519,
    "f": 1432,
    "g": 1275,
    "a": 1136,
    "b": 1014
  }[ note ], duration);
};

module.exports = Piezo;
