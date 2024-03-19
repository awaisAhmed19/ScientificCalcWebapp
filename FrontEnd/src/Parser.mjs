import Tokenizer from "./Tokenizer.mjs";
//import Node from "./Node.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import { PRECEDENCE ,OPERATORS,LEFT_ASSOCIATIVE } from "./Precedence.mjs";
let tk=new Tokenizer()
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class LiteralNode{
    constructor(value){
        this.value=value;
    }
}

class Parser{
    constructor(){
        this.tokens=[];
        this.nodeStack=[];
        
    }
    //Logical issue with parathesis need to be resolved
    parser(expression){
        this.tokens=expression;
        const ast =this.buildAST();
        return ast;
    }

    buildAST(){
        
        const minOperatorindex=this.minPrecedence(this.tokens);
        if (minOperatorindex!==-1){
            const Operator=this.tokens[minOperatorindex];
            const leftExpression=this.tokens.slice(0,minOperatorindex);
            const rightExpression=this.tokens.slice(minOperatorindex+1);
            const node=new Node(Operator);
            node.left=this.parser(leftExpression);
            node.right=this.parser(rightExpression);
            return node;
        }
        else{
            return new LiteralNode(this.tokens.join(' '))
        }
        
    }
    minPrecedence(Exp) {
        //Exp=Exp.replace(" ",'')
        let minPrecedence = Infinity;
        let index=-1;
        for (let oper = 0; oper < Exp.length; oper++) {
            const currentPrecedence = PRECEDENCE[Exp[oper]];
            if (currentPrecedence <= minPrecedence && LEFT_ASSOCIATIVE[Exp[oper]]) {
                minPrecedence = currentPrecedence;
                index=oper
            }
        }
        return index;
    }
}

export default Parser;

const parser = new Parser();
let exp=tk.tokenize("3 + 5 * (7 - 2)");
// Parse the expression
const ast = parser.parser(exp);

// Output the abstract syntax tree (AST)
console.log(ast);