import evaluate from './evaluate'
import { ASTNode, NodeType } from './builder'
import  print  from './print';

function assocOperater(fun: any) {
  return function () {
    let result = [].slice.call(arguments).map((element: any) => evaluate(element, this)).reduce(fun);
    return result;
  }
}

function relationalOperater(fun: any) {
  return function () {
    let convertedArray = [].slice.call(arguments).map((element: any) => evaluate(element, this));

    for (let i = 0; i < convertedArray.length-1; i++) {
      const element = convertedArray[i];
      const element2 = convertedArray[i+1];

      if(!fun(element,element2))
        return false;
    }

    if(convertedArray.length==1)
      return false;

      return true;

    
  }
}


function functionWrapper(functi: any) {


  return function () {
    var context = builtinContext;
    let evaledArguments = [].slice.call(arguments).map((arg: ASTNode) => {
      return evaluate(arg, context);
    });

    return functi.apply(context,evaledArguments);
  }

}








let builtinContext: any = {
  '+': assocOperater((a: any, b: any) => a + b),
  '*': assocOperater((a: any, b: any) => a * b),
  '-': assocOperater((a: any, b: any) => a - b),
  '/': assocOperater((a: any, b: any) => a / b),
  '>': relationalOperater((a: any, b: any) => a > b),
  '<': relationalOperater((a: any, b: any) => a < b),
  '==': relationalOperater((a: any, b: any) => a == b),
  'set': function (astName: ASTNode, content: any) {
    this[astName.atom.content] = evaluate(content, this);
    return this[astName.atom.content];
  },
  'eval': functionWrapper(function  evalfun(arg: ASTNode) {
    return evaluate(arg, this)
  }),
  'print': functionWrapper(function  printfun(arg: ASTNode) {
    return print(arg)
  })
}



export default builtinContext;