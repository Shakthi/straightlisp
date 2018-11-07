import evaluate from '../src/evaluate'
import build from '../src/builder'
import lexer from '../src/lexer'

import context from '../src/builtin'

import * as assert from 'assert';



describe('Builder', function () {
    describe('eval function', function () {
        
      it('function should eval integer', function () {

        assert.equal(evaluate(build(lexer.tokenize('1'))),1);
        
      });

      it('function should eval string', function () {

        assert.equal(evaluate(build(lexer.tokenize('"one"'))),"one");
        
      });


      it('function should eval integer calc', function () {
        
       

        assert.equal(evaluate(build(lexer.tokenize('[+ 1 2 5]')),context),8);
        assert.equal(evaluate(build(lexer.tokenize('[+ [- 3 2] 7]')),context),8);
        
      });


      it('function should eval relational op', function () {
       
        assert.equal(evaluate(build(lexer.tokenize('[== 1 1]')),context),true);
        assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1]]')),context),true);
        assert.equal(evaluate(build(lexer.tokenize('[== 5 [+ 1 1]]')),context),false);
        assert.equal(evaluate(build(lexer.tokenize('[> 3 2]')),context),true);

        assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 1]')),context),true);

        assert.equal(evaluate(build(lexer.tokenize('[> 30 200 2 1]')),context),false);
        assert.equal(evaluate(build(lexer.tokenize('[> 30 20 2 3]')),context),false);

        assert.equal(evaluate(build(lexer.tokenize('[== 2 [+ 1 1] [- 4 2 ]]')),context),true);







        
      });


      it('Should skipping eval quotedlist', function () {
        assert.notEqual(evaluate(build(lexer.tokenize('{+ 1 3}')),context),4);
      });

      it('Should double eval should eval quoted list', function () {
        assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3}]')),context),4);
      });


      

      // it('Should handled unquoted  list', function () {        
      //   assert.equal(evaluate(build(lexer.tokenize('[eval {+ 2  $[+ 1 100] }]')),context),103);
      // });

      // it('Should handled unquoted symbol list', function () {        
      //     assert.equal(evaluate(build(lexer.tokenize('[eval {+ 1 3 $x}]')),context),105);
      // });

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
