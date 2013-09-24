var tokenizer = require('../');
var sink = require('stream-sink');

exports['test simple string'] = function (test) {
  var input = '"I am a string"';
  var t = tokenizer();
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(1, tokens.length, 'There should be only one token');
    test.equal('"I am a string"', tokens[0].content);
    test.equal('string', tokens[0].type, 'token should be of type string');
    test.equal('"I am a string"', tokens[0].toString());
    test.done();
  });

  t.end(input);
}

exports['test escaped string'] = function (test) {
  var input = '"I am \\\\ a string"';
  var t = tokenizer();
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(1, tokens.length, 'There should be only one token');
    test.equal(input, tokens[0].content);
    test.equal('string', tokens[0].type, 'token should be of type string');
    test.equal(input, tokens[0].toString());
    test.done();
  });

  t.end(input);
}

exports['test wrongly escaped string'] = function (test) {
  var input = '"I am a string\\"';
  var t = tokenizer();
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(1, tokens.length, 'There should be only one token');
    test.equal('maybe-string', tokens[0].type, 'token should not be an actual string');
    test.done();
  });

  t.end(input);
}
