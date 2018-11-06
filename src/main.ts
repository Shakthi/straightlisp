
import lexer from './lexer'
import build from './builder'
import evaluate from './evaluate';

import builtin from './builtin'
import print from './print'



const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("# ")
rl.prompt();
rl.on('line', (line: string) => {

    try {
        console.log("> "+print(evaluate(build(lexer.tokenize(line)),builtin)));    
    } catch (error) {
        console.error("! "+error);
    }
    
    rl.prompt();
});





