import { ASTNode, NodeType } from '../src/builder'

export default function printRaw(arg: ASTNode) {
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
      output += arg;

        break;
    }

    return output;
  }