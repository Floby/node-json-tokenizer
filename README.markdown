[![Build Status](https://travis-ci.org/Floby/node-json-tokenizer.png)](https://travis-ci.org/Floby/node-json-tokenizer)

# node-json-tokenizer

Tokenize JSON documents

## Installation

    npm install --save json-tokenizer

## Usage

The tokenizer is a transform stream which takes a JSON document as input and outputs tokens.
Tokens are JavaScript objects which behave most usually like strings except they have a `token`
attribute which identifies their role.

**WARNING! the tokenizer only tokenizes. It doesn't care about the order of these tokens.**

```javascript
var tokenizer = require('json-tokenizer');


var t = tokenizer();

t.on('data', function (token) {
  console.log("%s (%s)", token, token.type);
});
t.end('[8, {}]');

// [ (begin-array)
// 8 (number)
// , (comma)
// { (begin-object)
// } (end-object)
// ] (end-array)

```

more usually you have a readable stream with a json document that you pipe to this.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
