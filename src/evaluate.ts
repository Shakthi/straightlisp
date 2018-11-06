
import builder, { ASTNode, NodeType } from './builder'


function lookup(param:string,context:any) {
    return context[param];
}

export default function evaluate(node: ASTNode, context: any = {}) {

    switch (node.type){
     case NodeType.atom :
        switch (node.atom.type) {
            case "identifier":
                return lookup(node.atom.content,context)

            default:
                return node.atom.content;
        }
    

    case NodeType.quotedList:
        return new ASTNode(NodeType.list,node.children);


    case NodeType.list :
        if(node.children.length==0){
            return null;
        }
        else{
            let items = node.children.slice();
            let first = items.shift();
            
            switch (first.atom.type) {
                case "identifier":
                case "symbol":
                    let res:any = lookup(first.atom.content,context)
                    return res.apply(context,items);
                    
                default:
                    throw `Non symbol - ${first.atom.type} on calling position`;
            }
            //debugger;


        }

    }

}