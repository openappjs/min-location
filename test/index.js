var test = require('tape');
var Window = require('../window');
var url = require('url');
var testUrl = 'http://localhost:8080/things/0/stuff/0?whatsits=1#madoodle';
var urlParts = url.parse(testUrl);

test('set location', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.toString(), testUrl);

  t.end();
});

test('set location from pathname', function (t) {
  var win = new Window();
  win.location.href = urlParts.pathname;

  t.equal(win.location.toString(), urlParts.pathname);

  t.end();
});

test('pathname sets', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.pathname, urlParts.pathname);

  t.end();
});

test('set pathname resolves to url', function (t) {
  var win = new Window();
  win.location.href = testUrl;
  win.location.pathname = '/stuff';

  t.equal(win.location.toString(), urlParts.protocol + '//' + urlParts.host + '/stuff' + urlParts.search + urlParts.hash);

  t.end();
});

test('set pathname style href resolves to url', function (t) {
  var win = new Window();
  win.location.href = testUrl;
  win.location.href = '/stuff';

  t.equal(win.location.toString(), urlParts.protocol + '//' + urlParts.host + '/stuff');

  t.end();
});

test('get pathname from pathname', function (t) {
  var win = new Window();
  win.location.href = url.parse(testUrl).pathname;

  t.equal(win.location.pathname, urlParts.pathname);

  t.end();
});

test('get port', function (t) {
  var win = new Window();

  win.location.href = testUrl;

  t.equal(win.location.port, urlParts.port);

  t.end();
});

test('get protocol', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.protocol, urlParts.protocol);

  t.end();
});

test('get hostname', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.hostname, urlParts.hostname);

  t.end();
});

test('get search', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.search, urlParts.search);

  t.end();
});

test('get hash', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  t.equal(win.location.hash, urlParts.hash);

  t.end();
});

test('addEventListener hashchange', function (t) {
  var win = new Window();
  win.location.href = testUrl;

  win.addEventListener('hashchange', function () {
    t.end();
  });

  win.location.hash = 'things';
});
