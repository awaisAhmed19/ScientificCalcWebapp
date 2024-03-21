import Tokenizer from "./Tokenizer.mjs";
//import Node from "./Node.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import { PRECEDENCE ,OPERATORS,LEFT_ASSOCIATIVE } from "./Precedence.mjs";
let tk=new Tokenizer()
//let ch=new ExpressionChecker()
class RPN{
    constructor(){
        this.tokens=[];
        this.operatorStack=[];
        this.outputStack=[];
    }

    postfix_Convertor(Expression){
        this.tokens = tk.tokenize(Expression);
    
        for (let token of this.tokens){
            if(ExpressionChecker.isNumber(token)){
                this.outputStack.push(token);
            }
            else if(ExpressionChecker.isOperator(token)){
                while(this.operatorStack.length > 0 && this.operatorStack[this.operatorStack.length-1] !== '(' && PRECEDENCE[token] <= PRECEDENCE[this.operatorStack[this.operatorStack.length-1]]){
                    this.outputStack.push(this.operatorStack.pop());
                }
                this.operatorStack.push(token);
            }
            else if(ExpressionChecker.isLeftParen(token)){
                this.operatorStack.push(token);
            }
            else if(ExpressionChecker.isRightParen(token)){
                while(this.operatorStack[this.operatorStack.length-1] !== '('){
                    this.outputStack.push(this.operatorStack.pop());
                }
                this.operatorStack.pop();
            }
        } 
    
        while (this.operatorStack.length > 0){
            this.outputStack.push(this.operatorStack.pop());
        }
    
        return this.outputStack;
    }
}

let r=new RPN();
let exp="3+4*2/(1-5)^2";
console.log(r.postfix_Convertor(exp))