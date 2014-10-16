var Url = require('url');

module.exports = Location;

var properties = [
  'host',
  'hostname',
  'href',
  'origin',
  'pathname',
  'port',
  'protocol',
  'search',
  'hash',
];

function Location (win) {
  if (!(this instanceof Location)) {
    return new Location(win);
  }

  var location = this;
  location.__updating = false;

  properties.forEach(function (prop) {
    var propValue = '';

    Object.defineProperty(location, prop, {
      get: function () {
          return propValue || '';
      },
      set: function (value) {
        if (prop === 'href') {
          value = Url.resolve(location.href, value);
        }

        if (prop === 'hash') {
          var oldUrl = location.href;
          var oldHash = propValue;
        }

        propValue = value;
        onUpdate(location, prop);

        if (prop === 'hash') {
          if (oldHash === location.hash)
            return;

          var ev = {
            target: win,
            type: "hashchange",
            bubbles: true,
            cancelable: false,
            oldUrl: oldUrl,
            newUrl: location.href,
          }
          win.dispatchEvent(ev);
        }
      }
    });
  });
}


Location.prototype.toString = function () {
  return this.href;
};

function onUpdate (location, propertyName) {
  if (location.__updating) {
    return;
  }
  location.__updating = true;

  if (propertyName === 'href') {

    var parts = Url.parse(location.href);
    if (parts) {
      for (var key in parts) {
        if (parts.hasOwnProperty(key)) {
          location[key] = parts[key];
        }
      }
    }

  } else {

    var host = location.hostname + (location.port ? ':' + location.port : '');

    location.origin = location.protocol + '//' + host;

    location.path = location.pathname + location.search + location.hash;

    location.href = location.origin + location.path;
  }

  location.__updating = false;
}
