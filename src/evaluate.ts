
import builder, { ASTNode, NodeType } from './builder'


function lookup(param: string, context: any):any {
    let res= context[param];
    if(res !== undefined)
        return res;

    if( context["___super____"]){
        return lookup(param, context["___super____"])
    }

    return undefined;
}

/*

[[{$1 $  [ /2 ]  45 22]


*/

let lexicalContext = new WeakMap();

function callList(node: ASTNode,items:ASTNode[]):ASTNode{
    let localContext:any={};
    localContext["___super____"] = lexicalContext.get(node);


    items.forEach((element,index)=>{
        localContext["$"+(index+1)] = element;
    })

    return evaluate(node,localContext);
    
}


export function evaluateQuoted(node: ASTNode, context: any = {}): ASTNode {

    function expand(innode: ASTNode) {

        if (innode.type == NodeType.quotedList) {
            throw Error("Nested quoting not supported");
        }
        if (innode.type == NodeType.escapedList) {

            return evaluate(new ASTNode(NodeType.list, innode.children), context);


        }

        if (innode.type == NodeType.atom) {
            if(innode.atom.type == "symbol")
            {
                let escapedIdRegex = /\$([a-zA-Z][a-zA-Z0-9]*)/
                  let res= escapedIdRegex.exec(innode.atom.content);
                  if(res){
                    innode.atom.content = res[1];
                    return evaluate(innode, context);

                  }

                
            }
            
        }

        if (innode.children)
            innode.children = innode.children.map(expand)

        return innode;
    }

    let outchildrens = node.children ? node.children.map(expand) : null;

    let  res = new ASTNode(NodeType.list, outchildrens);
    lexicalContext.set(res,context);
    return res;

}

export default function evaluate(node: ASTNode, context: any = {}) {

    switch (node.type) {
        case NodeType.atom:
            switch (node.atom.type) {
                case "identifier":
                case "symbol":
                    return lookup(node.atom.content, context)

                default:
                    return node;
            }

        case NodeType.escapedList:
            throw Error("error $ appeared on non quoted list")


        case NodeType.quotedList:
            return evaluateQuoted(node, context);

        case NodeType.list:
            if (node.children.length == 0) {
                return null;
            }
            else {
                let items = node.children.slice();
                let first = items.shift();
                let res: any = evaluate(first, context);

                if (res instanceof ASTNode && res.type == NodeType.list) {
                    return callList(res, items);

                }
                else if (typeof (res) === "function") {

                    return res.apply(context, items);
                }
                else {

                    throw Error("Cannot funccall" +res);

                }


            }

        default:
            throw Error(`Should not come here`);

        //debugger;


    }

}

/*
set {x} {+ $1 $2 } 

*/