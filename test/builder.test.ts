import * as assert from 'assert';
import build, { NodeType } from '../src/builder'

import lexer from '../src/lexer'


describe('Builder', function () {
  describe('main function', function () {
    it('function should parse integer', function () {
      assert.equal(build(lexer.tokenize('1')).atom.type , "integer");
      assert.ok(true);
    });

    it('function should parse arbitory atom', function () {
      assert.equal(build(lexer.tokenize('erer')).atom.type , "symbol");

      assert.ok(true);
    });

    it('function should parse string', function () {
      assert.equal(build(lexer.tokenize('\"sdsd\"')).type , NodeType.atom);
      assert.equal(build(lexer.tokenize('\"sdsd\"')).atom.type , "string");

    });

    it('function should run', function () {
      build(lexer.tokenize('[]'));
      assert.ok(true);
    });

    
    it('function should run', function () {
      build(lexer.tokenize('[ 1 ]'));
      assert.ok(true);
    });

    it('function should run', function () {
      build(lexer.tokenize('[ 1 1 ]'));
      assert.ok(true);
    });

    
    it('function should throw', function () {
      function f() {
        build(lexer.tokenize('1 1'));
      }

      assert.throws(f, "Expected eof received integer")
    });

  });
});



