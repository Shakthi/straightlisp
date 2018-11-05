import evaluate from '../src/evaluate'
import { ASTNode, NodeType } from '../src/builder'

function assocOperater(fun: any) {
  return function () {
    let result = [].slice.call(arguments).map((element: any) => evaluate(element, this)).reduce(fun);
    return result;
  }
}


function functionWrapper(functi: any) {


  return function () {
    var context = builtinContext;
    let evaledArguments = [].slice.call(arguments).map((arg: ASTNode) => {
      return evaluate(arg, context);
    });

    console.log();
  }

}








let builtinContext: any = {
  '+': assocOperater((a: any, b: any) => a + b),
  '*': assocOperater((a: any, b: any) => a * b),
  '-': assocOperater((a: any, b: any) => a - b),
  '/': assocOperater((a: any, b: any) => a / b),
  '>': assocOperater((a: any, b: any) => a > b),
  '<': assocOperater((a: any, b: any) => a < b),
  '==': assocOperater((a: any, b: any) => a == b),
  'set': function (astName: ASTNode, content: any) {
    this[astName.atom.content] = evaluate(content, this);
    return this[astName.atom.content];
  },
  'printRaw': function printRaw(arg: ASTNode) {
    var output: string = "";
    switch (arg.type) {
      case NodeType.atom:
        output = arg.atom.content;
        break;

      case NodeType.list:
        output += "["
        output += arg.children.map(printRaw).join(" ");
        output += "]"
        break;



      default:
        break;
    }

    return output;
  }
}



export default builtinContext;