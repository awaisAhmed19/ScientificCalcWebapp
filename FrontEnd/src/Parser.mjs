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
        this.value-value;
    }
}

class Parser{
    constructor(){
        this.tokens=[];
        this.index=0;
        this.nodeStack=[];
        
    }
    parser(expression){
        let tk=new Tokenizer();
        this.tokens=tk.tokenize(expression);
        let minOperator
        
    }
    minPrecedence(Exp) {
        let minPrecedence = Infinity;
        let index;
        for (let oper = 0; oper < Exp.length; oper++) {
            const currentPrecedence = PRECEDENCE[Exp[oper]];
            if (currentPrecedence <= minPrecedence && LEFT_ASSOCIATIVE[Exp[oper]]) {
                minPrecedence = currentPrecedence;
                index=oper
            }
        }
        return index
    }
}

let pr=new Parser();
console.log(pr.minPrecedence("1-20-34*22"));