import evaluate from '../src/evaluate'
import build from '../src/builder'
import lexer from '../src/lexer'
import * as assert from 'assert';


import context from '../src/builtin'



describe('builtin', function () {
    describe('set', function () {

        it('set should work', function () {

            evaluate(build(lexer.tokenize('[set sum [ + 23 44]]')), context);
            assert.equal(evaluate(build(lexer.tokenize('sum')), context),23+44);

        });

    });

});