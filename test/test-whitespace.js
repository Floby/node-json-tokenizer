var tokenizer = require('../');
var sink = require('stream-sink');

exports['test whitespace default behavior'] = function (test) {
  var input = ' \n ';
  var t = tokenizer();
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(0, tokens.length, 'There should be no tokens');
    test.done();
  });

  t.end(input);
}

exports['test simple whitespace'] = function (test) {
  var input = ' \n ';
  var t = tokenizer({whitespace: true});
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(1, tokens.length, 'There should be only one token');
    test.equal(' \n ', tokens[0].content);
    test.equal('whitespace', tokens[0].type, 'token should be of type whitespace');
    test.equal(input, tokens[0].toString());
    test.done();
  });

  t.end(input);
}

exports['test whitespace with other tokens'] = function (test) {
  var input = '["I am",  "a string"]';
  var t = tokenizer({whitespace: true});
  t.pipe(sink({objectMode: true})).on('data', function (tokens) {
    test.equal(6, tokens.length, 'There should be six tokens');
    test.equal('  ', tokens[3].content);
    test.equal('whitespace', tokens[3].type, 'space token should be of type whitespace');
    test.equal('  ', tokens[3].toString(), 'token should stringify back to two spaces');

    var reconstructedInput = tokens.map(function(token){
      return token.toString();
    }).join('');
    test.equal(input, reconstructedInput, 'input roundtrips through tokenizer');

    test.done();
  });

  t.end(input);
}
