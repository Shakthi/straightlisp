
import lexer from './lexer'
import build from './builder'
import evaluate from './evaluate';

import builtin from './builtin'



const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line: string) => {

    evaluate(build(lexer.tokenize(line)),builtin);
    
    
});





