import Tokenizer from "./Tokenizer.js";
import ExpressionChecker from "./ExpressionChecker.js";
import { PRECEDENCE, LEFT_ASSOCIATIVE } from "./Precedence.js";
let Ec = new ExpressionChecker();
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
      if (token.type === "NUMBER" || token.type === "IDENTIFIER") {
        this.outputStack.push(token.value);
      } else if (token.type === "LPAREN") {
        this.operatorStack.push(token.value);
      } else if (token.type === "RPAREN") {
        while (
          !this.operatorStack.isEmpty() &&
          this.operatorStack.top() !== "("
        ) {
          this.outputStack.push(this.operatorStack.pop());
        }
        this.operatorStack.pop();
      } else if (token.type === "OPERATOR") {
        while (
          !this.operatorStack.isEmpty() &&
          PRECEDENCE[token.value] <= PRECEDENCE[this.operatorStack.top()]
        ) {
          this.outputStack.push(this.operatorStack.pop());
        }
        this.operatorStack.push(token.value);
      } else if (Ec.isFunc(token.value)) {
        this.operatorStack.push(token.value);
      }
    }

    while (!this.operatorStack.isEmpty()) {
      this.outputStack.push(this.operatorStack.pop());
    }
    return this.outputStack;
  }
}

export { RPN, Stack };
const R = new RPN();
console.log(R.postfix_Converter("3+4*2"));
