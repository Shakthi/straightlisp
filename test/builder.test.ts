import * as assert from 'assert';
import build, { NodeType } from '../src/builder'

import lexer from '../src/lexer'


describe('Builder', function () {
  describe('main function', function () {
    it('function should parse integer', function () {
      assert.equal(build(lexer.tokenize('1')).atom.type, "integer");
      assert.ok(true);
    });

    it('function should parse arbitory atom', function () {
      assert.equal(build(lexer.tokenize('erer')).atom.type, "identifier");

      assert.ok(true);
    });

    it('function should parse string', function () {
      assert.equal(build(lexer.tokenize('\"sdsd\"')).type, NodeType.atom);
      assert.equal(build(lexer.tokenize('\"sdsd\"')).atom.type, "string");

    });

    it('function should run []', function () {
      build(lexer.tokenize('[]'));
      assert.ok(true);
    });


    it('function should run [ 1 ]', function () {
      build(lexer.tokenize('[ 1 ]'));
      assert.ok(true);
    });

    it('should build on [ 1 1 ]', function () {
      build(lexer.tokenize('[ 1 1 ]'));
      assert.ok(true);
    });

    it('should build on [ www 1 ]', function () {
      build(lexer.tokenize('[ www 1 ]'));
      assert.ok(true);
    });

    it('should build on [ [www] 1 ]', function () {
      build(lexer.tokenize('[ [www] 1 ]'));
      assert.ok(true);
    });


    it('should build on [ "[www] 1" ]', function () {
      let ast = build(lexer.tokenize('[ "[www] 1" ]'));
      assert.equal(ast.children.length, 1);
    });


    it('should build on [ [www] [][] ]', function () {
      let ast = build(lexer.tokenize('[ [www] [][] ]'));
      assert.equal(ast.children.length, 3);
      assert.equal(ast.children[1].children.length, 0);
    });


    it('should build on { "[www] [][]" }', function () {
      let ast = build(lexer.tokenize('{ "[www] [][]" }'));
      assert.equal(ast.children.length, 1);
    });

    it('should build on {a}', function () {
      let ast = build(lexer.tokenize('{a}'));
      assert.equal(ast.children.length, 1);
    });

    it('should throw on {a]', function () {

      function f() {
        let ast = build(lexer.tokenize('{a]'));
      }
      assert.throws(f, "Expected close bracket received close square bracket")

    });

    it('should build on  [{www} [][]]', function () {
      let ast = build(lexer.tokenize('[{www} [{}][]]'));
      assert.equal(ast.children.length, 3);
    });

    
    it('should build on  [print %1 %2]', function () {
      let ast = build(lexer.tokenize('[print %1 %2]'));
      assert.equal(ast.children.length, 3);
    });
    

    it('should build on  [a {b c d}]', function () {
      let ast = build(lexer.tokenize('[a {b c d}]'));
      assert.equal(ast.children.length, 2);
    });

    

    it('Should handled unquoted  list', function () {        
      build(lexer.tokenize('  $[+ 1 100] '));
      assert.ok(true);
    });

    it('Should handled unquoted symbol list', function () {        
        build(lexer.tokenize('$x'));
        
      assert.ok(true);
    });







    it('function should throw', function () {
      function f() {
        build(lexer.tokenize('1 1'));
      }

      assert.throws(f, "Expected eof received integer")
    });

    it('function should throw', function () {
      function f() {
        build(lexer.tokenize('[1 '));
      }

      assert.throws(f, "Expected close sqaure bracket received eof")
    });

    it('function should throw', function () {
      function f() {
        build(lexer.tokenize('[ '));
      }

      assert.throws(f, "Expected close sqaure bracket received eof")
    });



  });
});



