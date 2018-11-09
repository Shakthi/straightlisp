import evaluate from './evaluate'
import { ASTNode, NodeType } from './builder'
import  print  from './print';

function assocOperater(fun: any) {
  return function () {
    let evalresult = [].slice.call(arguments).map((element: any) => evaluate(element, this))
    let result= evalresult.map((i:ASTNode)=>i.atom.content).reduce(fun);
    return new ASTNode(NodeType.atom,undefined,ASTNode.TokenCreate(result,evalresult[0].atom.type));
  }
}

function relationalOperater(fun: any) {
  return function () {
    let convertedArray = [].slice.call(arguments).map((element: any) => evaluate(element, this));

    for (let i = 0; i < convertedArray.length-1; i++) {
      const element = convertedArray[i];
      const element2 = convertedArray[i+1];

      if(!fun(element.atom.content,element2.atom.content))
         return new ASTNode(NodeType.atom,undefined,ASTNode.TokenCreate(false,"boolean"));
    }

    if(convertedArray.length==1)
      return new ASTNode(NodeType.atom,undefined,ASTNode.TokenCreate(false,"boolean"));

      return new ASTNode(NodeType.atom,undefined,ASTNode.TokenCreate(true,"boolean"));

    
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
  '>=': relationalOperater((a: any, b: any) => a >= b),
  '<=': relationalOperater((a: any, b: any) => a <= b),
  '!=': relationalOperater((a: any, b: any) => a != b),
  '<': relationalOperater((a: any, b: any) => a < b),
  '==': relationalOperater((a: any, b: any) => a == b),
  'set': functionWrapper(function (astName: ASTNode, content: any) {
    this[astName.children[0].atom.content] =content;
    return content;
  }),
  'eval': functionWrapper(function  (arg: ASTNode) {
    return evaluate(arg, this)
  }),
  'print': functionWrapper(function  (arg: ASTNode) {
    return print(arg)
  })
}



export default builtinContext;