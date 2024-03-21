import Tokenizer from "./Tokenizer.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import { PRECEDENCE , LEFT_ASSOCIATIVE} from "./Precedence.mjs";

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

            if (!ExpressionChecker.isOperator(token) && !ExpressionChecker.isLeftParen(token) && !ExpressionChecker.isRightParen(token)) {
                this.outputStack.push(token);

            } else if (ExpressionChecker.isLeftParen(token)) {
                this.operatorStack.push(token);

            } else if (ExpressionChecker.isRightParen(token)) {
                while (!this.operatorStack.isEmpty() && this.operatorStack.top() !== '(') {
                    this.outputStack.push(this.operatorStack.pop());
                }
                this.operatorStack.pop(); // Pop the left parenthesis
            
            }else if (ExpressionChecker.isOperator(token)) {
                while (!this.operatorStack.isEmpty() &&
                    PRECEDENCE[token]<=PRECEDENCE[this.operatorStack.top()]){
                    this.outputStack.push(this.operatorStack.pop());
                }
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


