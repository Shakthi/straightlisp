import evaluate from '../src/evaluate'
import build from '../src/builder'
import lexer from '../src/lexer'

import * as assert from 'assert';



describe('Builder', function () {
    describe('eval function', function () {
        
      it('function should eval integer', function () {

        assert.equal(evaluate(build(lexer.tokenize('1'))),1);
        
      });

      it('function should eval string', function () {

        assert.equal(evaluate(build(lexer.tokenize('"one"'))),"one");
        
      });


      
  
    })
});
