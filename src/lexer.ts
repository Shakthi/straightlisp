import * as canto34 from 'canto34';

var lexer = new canto34.Lexer({ languageName: "lisplike" });

// bring in some predefined types for commas, period, and integers.
var types = canto34.StandardTokenTypes;
lexer.addTokenType(types.JsonString());
lexer.addTokenType(types.integer());
lexer.addTokenType(types.real());
lexer.addTokenType(types.openParen());
lexer.addTokenType(types.closeParen());
lexer.addTokenType(types.closeSquareBracket());
lexer.addTokenType(types.openSquareBracket());
lexer.addTokenType(types.closeParen());

lexer.addTokenType(types.closeBracket());
lexer.addTokenType(types.openBracket());


// add a token for whitespace
lexer.addTokenType({ 
  name: "identifier",       // give it a name
  regexp: /[a-zA-Z][a-zA-Z0-9]*/, // match spaces and tabs
});




// add a token for whitespace
lexer.addTokenType({ 
  name: "ws",       // give it a name
  regexp: /[ \t]+/, // match spaces and tabs
  ignore: true      // don't return this token in the result
});


lexer.addTokenType({ 
  name: "atom",       // give it a name
  regexp: /[^ ]+/, // match spaces and tabs
});




export default lexer;