
import builder, { ASTNode, NodeType } from './builder'

export default function evaluate(node: ASTNode, context: any = {}) {

    switch (node.type){
     case NodeType.atom :
        switch (node.atom.type) {
            case "identifier":
                return context[node.atom.content]

            default:
                return node.atom.content;
        }

    case NodeType.list :
        if(node.children.length==0)
            return null;

    }

}