import * as assert from 'assert';
import lexer from '../src/lexer';

describe('lexer', function() {
  describe('toknenize', function() {
    it('tokenization should be uniform', function() {
      assert.equal(lexer.tokenize("foo 1 ;;  \"bar\" 2").map((ele:any)=>ele.type).join(),"identifier,integer,symbol,string,integer");
    });


    it('Parse ( 1 2)', function() {
      assert.equal(lexer.tokenize("( 1 2)").map((ele:any)=>ele.type).join(),"open paren,integer,integer,close paren");
    });

    it('Parse (1   2)', function() {
      assert.equal(lexer.tokenize("(1   2)").map((ele:any)=>ele.type).join(),"open paren,integer,integer,close paren");
    });

    it('Parse (  1 2 )', function() {
      assert.equal(lexer.tokenize("(  1 2 )").map((ele:any)=>ele.type).join(),"open paren,integer,integer,close paren");
    });

    

    it('Parse [1   2]', function() {
      assert.equal(lexer.tokenize("[1   2]").map((ele:any)=>ele.type).join(),"open square bracket,integer,integer,close square bracket");
    });

    it('Parse {[}', function() {
      assert.equal(lexer.tokenize("{[}").map((ele:any)=>ele.type).join(),"open bracket,open square bracket,close bracket");
    });


    it('Parse $[1   2]', function() {
      assert.equal(lexer.tokenize("$[1   2]").map((ele:any)=>ele.type).join(),"doller,open square bracket,integer,integer,close square bracket");
    });

    it('parse $1', function() {
      assert.equal(lexer.tokenize("$1").map((ele:any)=>ele.type).join(),"doller,integer");
    });

    it('parse [x  $x x]', function() {
      assert.equal(lexer.tokenize("[x  $x x]").map((ele:any)=>ele.type).join(),"open square bracket,identifier,doller,identifier,identifier,close square bracket");
    });

    it('parse [x  "$x" x]', function() {
      assert.equal(lexer.tokenize("[x  \"$x\" x]").map((ele:any)=>ele.type).join(),"open square bracket,identifier,string,identifier,close square bracket");
    });

    
  });
});

