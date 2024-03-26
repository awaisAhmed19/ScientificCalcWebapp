import Tokenizer from "./Tokenizer.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import { PRECEDENCE , LEFT_ASSOCIATIVE} from "./Precedence.mjs";
let Ec=new ExpressionChecker();
let tk = new Tokenizer();
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0) {
            return "Underflow";
        }
        return this.items.pop();
    }

    top() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class RPN {
    constructor() {
        this.tokens = [];
        this.operatorStack = new Stack();
        this.outputStack = [];
    }

    postfix_Converter(Expression) {
        this.tokens = tk.tokenize(Expression);

        for (let token of this.tokens) {

            if (!Ec.isOperator(token) && !Ec.isLeftParen(token) && !Ec.isRightParen(token)&&!Ec.isFunc(token)) {
                this.outputStack.push(token);

            } else if (Ec.isLeftParen(token)) {
                this.operatorStack.push(token);

            } else if (Ec.isRightParen(token)) {
                while (!this.operatorStack.isEmpty() && this.operatorStack.top() !== '(') {
                    this.outputStack.push(this.operatorStack.pop());
                }
                this.operatorStack.pop(); 

            }else if (Ec.isOperator(token)) {
                while (!this.operatorStack.isEmpty() &&
                    PRECEDENCE[token]<=PRECEDENCE[this.operatorStack.top()]){
                    this.outputStack.push(this.operatorStack.pop());
                }
                this.operatorStack.push(token);
            }else if(Ec.isFunc(token)){
                this.operatorStack.push(token);
            }
        }
    
        while (!this.operatorStack.isEmpty()) {
            this.outputStack.push(this.operatorStack.pop());
        }
    
        return this.outputStack
    }
    
}

export {RPN,Stack};


