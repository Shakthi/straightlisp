
import lexer from './lexer'
import {Token} from 'canto34'
import build from './builder'


console.log(build(lexer.tokenize('1')))

