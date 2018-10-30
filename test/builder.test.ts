import * as assert from 'assert';
import build from '../src/builder'

import lexer from '../src/lexer'


describe('Builder', function() {
  describe('main function', function() {
    it('function should run', function() {
        build(lexer.tokenize('1'));
        assert.ok(true);
    });
  });
});



