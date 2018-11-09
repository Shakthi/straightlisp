
import builder, { ASTNode, NodeType } from './builder'


function lookup(param: string, context: any) {
    return context[param];
}


export function evaluateQuoted(node: ASTNode, context: any = {}) {

    return null;
    function expand(innode: ASTNode) {
        if (innode.type == NodeType.escapedList) {

            let k = evaluate(new ASTNode(NodeType.list,innode.children), context);

            //return new ASTNode()

        }

        if (innode.type == NodeType.escapedAtom) {
            debugger;

            let k=  evaluate(innode, context);
        }

        if (innode.children)
            innode.children = innode.children.map(expand)

        return innode;
    }

    let outnode: any = node.children?node.children.map(expand):null;

    return new ASTNode(NodeType.list, outnode.children);

}


export default function evaluate(node: ASTNode, context: any = {}) {

    switch (node.type) {
        case NodeType.atom:
            switch (node.atom.type) {
                case "identifier":
                    return lookup(node.atom.content, context)

                default:
                    return node;
            }

        case NodeType.escapedList:
        case NodeType.escapedAtom:
            throw "error $ appeared on non quoted list"


        case NodeType.quotedList:
            return evaluateQuoted(node, context);

        case NodeType.list:
            if (node.children.length == 0) {
                return null;
            }
            else {
                let items = node.children.slice();
                let first = items.shift();

                switch (first.atom.type) {
                    case "identifier":
                    case "symbol":
                        let res: any = lookup(first.atom.content, context)
                        return res.apply(context, items);

                    default:
                        throw `Non symbol - ${first.atom.type} on calling position`;
                }
                //debugger;


            }

    }

}