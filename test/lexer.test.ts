import * as assert from 'assert';
import lexer from '../src/lexer';

describe('lexer', function() {
  describe('toknenize', function() {
    it('tokenization should be uniform', function() {
      assert.equal(lexer.tokenize("foo 1 ;;  \"bar\" 2").map((ele:any)=>ele.type).join(),"identifier,integer,atom,string,integer");
    });
  });
});
