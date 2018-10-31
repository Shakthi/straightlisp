import { Token } from 'canto34'


export enum NodeType {
    list,
    quotedList,
    infix,
    quotedInfix,
    atom,
    empty,
    escapedAtom,
    escapedList,
    escapedInfix


}

export class ASTNode {

    public atom:Token|null;
    constructor(public type: NodeType, public children?: ASTNode[]) {

    }

}

export default function builder(params: Token[]):ASTNode {

    var current: Token = null;
    var parsed: Token[]=[];
    var ast:ASTNode=null;


    function next() {
        if (current)
                parsed.push(current);
        if (!params.length)
            current = null;
        else {            
            current = params.shift();
        }

    }

    function accept(name: string) {
        if (peak(name)) {
            next();
            return true;
        }
        return false;
    }

    function peak(name: string) {
        if (name === "eof" && current == null)
            return true;

        if (current.type === name)
            return true;
        return false;
    }


    function expect(name: string) {
        if (accept(name))
            return true;
        throw (`Expected ${name} received ${current.type}`)
    }

    /*
    
     [  ]
    
    */

    function start() {
        if (accept("integer")) {
            ast= new ASTNode(NodeType.atom);
            ast.atom = parsed[0];
            expect("eof")
            return;
        }else if(accept("string")) {
            ast= new ASTNode(NodeType.atom);
            ast.atom = parsed[0];
            expect("eof")
            return;
        }else if(accept("symbol")) {
            ast= new ASTNode(NodeType.atom);
            ast.atom = parsed[0];
            expect("eof")
            return;
        }
        throw "Syntax error";
        

    }

    
    next();
    start();
    return ast;





}