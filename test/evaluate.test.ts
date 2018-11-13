import evaluate from '../src/evaluate'
import build,{buildeListElements} from '../src/builder'
import lexer from '../src/lexer'

import context from '../src/builtin'

import * as assert from 'assert';



describe('Eval', function () {
  describe('eval function', function () {

    it('function should eval integer', function () {

      assert.equal(evaluate(build(lexer.tokenize('1'))).atom.content, 1);

    });

    it('function should eval string', function () {

      assert.equal(evaluate(build(lexer.tokenize('"one"'))).atom.content, "one");

    });


    it('function should eval nested integer calc', function () {

      assert.equal(evaluate(build(lexer.tokenize('[+ [- 3 2] 7]')), context).atom.content, 8);

    });


    it('function should eval integer calc', function () {



      assert.equal(evaluate(build(lexer.tokenize('[+ 1 2 5]')), context).atom.content, 8);

    });



    it('function should eval relational op', function () {

      assert.equal(evaluate(build(lexer.tokenize('[== 1 1]')), context).atom.content, true);
      assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1]]')), context).atom.content, true);
      assert.equal(evaluate(build(lexer.tokenize('[== 5 [+ 1 1]]')), context).atom.content, false);
      assert.equal(evaluate(build(lexer.tokenize('[> 3 2]')), context).atom.content, true);

      assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 1]')), context).atom.content, true);

      assert.equal(evaluate(build(lexer.tokenize('[> 30 200 2 1]')), context).atom.content, false);
      assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 3]')), context).atom.content, false);

      assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1] [- 4 2 ]]')), context).atom.content, true);



    });

  })


  describe('evalquoted function', function () {


    it('Should skipping eval quotedlist', function () {
      assert.equal(evaluate(build(lexer.tokenize('{+ 1 3}')), context).children.length, 3);
    });

    it('Should double eval should eval quoted list', function () {
      assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3}]')), context).atom.content, 4);
    });

  });

  describe('eval unquoted substitution', function () {



    it('Should throw missplaced $', function () {
      assert.throws(() => evaluate(build(lexer.tokenize(' $[+ 1 100] '))), "missplaced $")
    });


    it('Should handled unquoted  list', function () {
      assert.equal(evaluate(build(lexer.tokenize(' {+ 2  $[+ 1 100] }')), context).children[2].atom.content, 101);
    });

    it('Should handled unquoted symbol list', function () {

      evaluate(build(lexer.tokenize('[set {x} 102]')), context)
      assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3 $x}]')), context).atom.content, 106);
    });

  });


  describe('Extra', function () {
    describe('list execution', function () {

      it('Should handled list at function position', function () {
        assert.equal(evaluate(build(lexer.tokenize('[{+ 1  $1} 4]')), context).atom.content, 5);
      });

    });

  });


  describe('Multiline', function () {
    it('Should eval consequitive lists', function () {

      let statemets = buildeListElements(lexer.tokenize('[set {rrr} 34] [+ rrr 43]'));

      assert.equal(evaluate(statemets[0], context).atom.content, 34);
      assert.equal(evaluate(statemets[1], context).atom.content, 34+43);


        
    });


    it('Should eval consequitive lists with newlinews ', function () {

      let statemets = buildeListElements(lexer.tokenize('[set {k}   34] \n [* k 47]'));

      assert.equal(evaluate(statemets[0], context).atom.content, 34);
      assert.equal(evaluate(statemets[1], context).atom.content, 34*47);

    });



    it('Should eval consequitive lists with inbetween newlinews ', function () {

      let statemets = buildeListElements(lexer.tokenize('[set {k} \n  34] \n [- k 47]'));

      assert.equal(evaluate(statemets[0], context).atom.content, 34);
      assert.equal(evaluate(statemets[1], context).atom.content, 34-47);


        
    });



    it('Should eval consequitive lists with comments  ', function () {

      let statemets = buildeListElements(lexer.tokenize('//This is comment line \n [set {k} \n  45]//test \n [- k 47]'));

      assert.equal(evaluate(statemets[0], context).atom.content, 45);
      assert.equal(evaluate(statemets[1], context).atom.content, 45-47);


        
    });


  });



});
