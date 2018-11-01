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

    public atom: Token | null;
    constructor(public type: NodeType, public children?: ASTNode[]) {

    }

}

export default function builder(params: Token[]): ASTNode {

    var current: Token = null;
    var lastAccepted: Token = null;
    var ast: ASTNode = null;


    function next() {
        if (!params.length)
            current = null;
        else {
            current = params.shift();
        }

    }

    function accept(name: string) {
        if (peak(name)) {
            lastAccepted = current;
            next();
            return true;
        }
        return false;
    }

    function peak(name: string) {
        if (name === "eof" && current == null)
            return true;

        if (current == null) {
            return null;
        }

        if (current.type === name)
            return true;
        return false;
    }


    function expect(name: string) {
        if (accept(name))
            return true;
        throw (`Expected ${name} received ${current ? current.type : "eof"}`)
    }


    function list(): ASTNode[] {

        let items: ASTNode[] = [];

        do {

            let element = listElement();
            if (element == null)
                break;
            else
                items.push(element);



        } while (true);

        return items;
    }


    /*

    start => listElement
    listElement => atom|list 
    list => listElement*




    */

    function atom(): Token {
        if (accept("integer")) {
            return lastAccepted;
        }
        else if (accept("string")) {
            return lastAccepted;
        } else if (accept("identifier")) {
            return lastAccepted;
        } else if (accept("symbol")) {
            return lastAccepted;
        }

        return null;

    }

    function listElement() {

        if (accept("open bracket")) {
            const ast = new ASTNode(NodeType.quotedList);
            ast.children = list();
            expect("close bracket");
            return ast;

        }

        else if (accept("open square bracket")) {

            const ast = new ASTNode(NodeType.list);
            ast.children = list();
            expect("close square bracket");

            return ast;
        } else {

            let token = atom();
            if (token != null) {
                const astatom: ASTNode = new ASTNode(NodeType.atom);
                astatom.atom = token;
                return astatom;
            }

        }
        return null;

    }



    function start() {
        let result = listElement();
        if (result == null) {
            throw (`Expected list or atom found  ${current?current.type:"eof"}`);
        }
        expect("eof")
        return result;
    }


    next();
    return start();





}