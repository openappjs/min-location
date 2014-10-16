var extend = require('xtend/mutable');
var EventTarget = require('min-event-target');

module.exports = Window;

function Window () {
  if (!(this instanceof Window)) {
    return new Window();
  }

  this.location = require('./')(this);
}

extend(Window.prototype, EventTarget);
