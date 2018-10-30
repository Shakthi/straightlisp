import { Token } from 'canto34'
import { start } from 'repl';


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

    constructor(public type: NodeType, public children?: ASTNode[]) {

    }

}

export default function builder(params: Token[]) {

    var current: Token = null;
    var parsed: Token[]=[];
    var ast:ASTNode=null;


    function next() {
        if (!params.length)
            current = null;
        else {
            if (current)
                parsed.push(current);
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
            return;

        if (current.type === name)
            return true;
        return false;
    }


    function expect(name: string) {
        if (accept(name))
            return true;
        throw (`Expected ${name} received ${current.type}`)
    }

    function start() {
        if (accept("integer")) {
            expect("eof")
        }

    }





}