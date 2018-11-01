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


      it('function should eval string', function () {
        
        let context={
          '+':function(a:any,b:any){
            let result = [].slice.call(arguments).map((element:any)=>evaluate(element,this)).reduce((a:any,b:any)=> a + b,0);            
            return result;            
          },
          '-':function(a:any,b:any){
            let temparray = [].slice.call(arguments);
            const first = temparray.shift()
            let result = temparray.map((element:any)=>evaluate(element,this)).reduce((a:any,b:any)=> a - b,evaluate(first,this) );            
            return result;            
          },
          '*':function(a:any,b:any){
            let result = [].slice.call(arguments).map((element:any)=>evaluate(element,this)).reduce((a:any,b:any)=> a * b,0);            
            return result;            
          },
          '/':function(a:any,b:any){
            let temparray = [].slice.call(arguments);
            const first = temparray.shift()
            let result = temparray.map((element:any)=>evaluate(element,this)).reduce((a:any,b:any)=> a / b,evaluate(first,this) );            
            return result;            
          }

        };

        assert.equal(evaluate(build(lexer.tokenize('[+ 1 2 5]')),context),8);
        assert.equal(evaluate(build(lexer.tokenize('[+ [- 3 2] 7]')),context),8);
        
      });


      
  
    })
});
