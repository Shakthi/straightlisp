import evaluate from '../src/evaluate'
import build from '../src/builder'
import lexer from '../src/lexer'

import context from '../src/builtin'

import * as assert from 'assert';



describe('Builder', function () {
    describe('eval function', function () {
        
      it('function should eval integer', function () {

        assert.equal(evaluate(build(lexer.tokenize('1'))).atom.content,1);
        
      });

      it('function should eval string', function () {

        assert.equal(evaluate(build(lexer.tokenize('"one"'))).atom.content,"one");
        
      });


      it('function should eval nested integer calc', function () {
   
        assert.equal(evaluate(build(lexer.tokenize('[+ [- 3 2] 7]')),context).atom.content,8);
        
      });


      it('function should eval integer calc', function () {
        
       

        assert.equal(evaluate(build(lexer.tokenize('[+ 1 2 5]')),context).atom.content,8);
        
      });



      it('function should eval relational op', function () {
       
        assert.equal(evaluate(build(lexer.tokenize('[== 1 1]')),context).atom.content,true);
        assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1]]')),context).atom.content,true);
        assert.equal(evaluate(build(lexer.tokenize('[== 5 [+ 1 1]]')),context).atom.content,false);
        assert.equal(evaluate(build(lexer.tokenize('[> 3 2]')),context).atom.content,true);

        assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 1]')),context).atom.content,true);

        assert.equal(evaluate(build(lexer.tokenize('[> 30 200 2 1]')),context).atom.content,false);
        assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 3]')),context).atom.content,false);

        assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1] [- 4 2 ]]')),context).atom.content,true);







        
      });


      it('Should skipping eval quotedlist', function () {
        assert.notEqual(evaluate(build(lexer.tokenize('{+ 1 3}')),context),4);
      });

      it('Should double eval should eval quoted list', function () {
        assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3}]')),context),4);
      });


      
      it('Should throw missplaced $', function () {        
        assert.throws(()=>evaluate(build(lexer.tokenize(' $[+ 1 100] '))))
      });

      it('Should throw missplaced $ on symbol', function () {        
        assert.throws(()=>evaluate(build(lexer.tokenize(' $a '))))
      });

      it('Should handled unquoted  list', function () {        
        assert.equal(evaluate(build(lexer.tokenize(' {+ 2  $[+ 1 100] }')),context),103);
      });

      it('Should handled unquoted symbol list', function () {        
          assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3 $x}]')),context),105);
      });

      /*
      mac (defcall type params ... body)
      `(defcoerce ,type function
        (fn(,car.params)
          (fn ,cdr.params
            ,@body)))

      [set {x} (34 + 34)]
      [mac {defcall type params ... body}
      {defcoerce $type function 
       [fn [$car.params] 
        (fn ,cdr.params 

      }
    ]


      */


      


      
  
    })
});
