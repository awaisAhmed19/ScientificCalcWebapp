import Tokenizer from "./Tokenizer.mjs";
import Node from "./Node.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import { PRECEDENCE ,OPERATORS,LEFT_ASSOCIATIVE } from "./Precedence.mjs";

class Parser{
    constructor(){
        this.tokens=[];
        this.index=0;
        this.nodeStack=[];
    }
    parser(expression){
        let tk=new Tokenizer();
        let ec=new ExpressionChecker();
        this.tokens=this.tk.tokenize(expression);
        for (let token in this.tokens){
            if( ec.isNumber(this.tokens[token])||
                ec.isVar(this.tokens[token])||
                ec.isConst(this.tokens[token])){
                    this.nodeStack.push(new Node(this.tokens[token]));                
            }
            else if(ec.isOperator(this.tokens[token])){
                let op = new Node(this.tokens[token]);
                while(this.nodeStack.length>0){
                    let top=this.nodeStack[this.nodeStack.length-1];
                    if(ec.isOperator(top.value)){
                        if((LEFT_ASSOCIATIVE[op.value] && PRECEDENCE[op.value]<=PRECEDENCE[top.value])||
                            (!LEFT_ASSOCIATIVE[op.value] && PRECEDENCE[op.value]<PRECEDENCE[top.value])){
                                this.nodeStack.pop();
                                op.left=top;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }

            }
            
            else if(ec.isLeftParen(this.tokens[token])){
                this.nodeStack.push(new Node(this.tokens[token]));
            }

            else if(ec.isRightParen(this.tokens[token])){
                while(this.nodeStack.length>0){
                    let top=this.nodeStack[this.nodeStack.length-1];
                    if(ec.isLeftParen(top.value)){
                        this.nodeStack.pop();
                        break;
                    }else{
                        this.nodeStack.pop();
                    }
                }
            }
        }
    }
}

let pr=new Parser();
pr.parser("1+11+111");