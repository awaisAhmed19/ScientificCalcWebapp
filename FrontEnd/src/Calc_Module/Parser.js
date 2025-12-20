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

class AST {
  constructor(exp) {
    this.Tokens = tk.tokenize(exp);
    this.cursor = 0;
    this.operands = [];
    this.operator = new Stack();
    this.rpn();
    this.print();
  }
  print() {
    let tokens = this.operands;
    for (let t of tokens) {
      console.log(t);
    }
  }
  rpn() {
    for (let tk of this.Tokens) {
      if (tk.type == "LITERAL" || tk.type == "IDENTIFIER") {
        this.operands.push(tk);
      } else if (tk.type == "LPAREN") {
        this.operator.push(tk);
      } else if (tk.type == "RPAREN") {
        while (
          !this.operator.isEmpty() &&
          this.operator.top().type !== "LPAREN"
        ) {
          this.operands.push(this.operator.pop());
        }
        this.operator.pop();
      } else if (tk.type == "B_OPERATOR" || tk.type == "U_BINARY") {
        while (
          !this.operator.isEmpty() &&
          PRECEDENCE[tk.value] <= PRECEDENCE[this.operator.top().value]
        ) {
          this.operands.push(this.operator.pop());
        }
        this.operands.push(tk);
      } else if (tk.type == "KEYWORD") {
        this.operator.push(tk);
      }
    }
    while (!this.operator.isEmpty()) {
      this.operands.push(this.operator.pop());
    }
  }
  Ast() {
    this.rpn();
    let operands = this.operands;
    let i = operands.length - 1;
    function tree_parse() {
      const t = operands[i--];

      if (t.type == "U_OPERATOR") {
        const operand = tree_parse();
        return { type: "U_BINARY", op: t.value, arg: operand };
      }

      if (t.type == "B_OPERATOR") {
        const right = tree_parse();
        const left = tree_parse();
        return { type: "B_OPERATOR", op: t.value, left, right };
      }

      if (t.type == "KEYWORD") {
        const right = tree_parse();
        const left = tree_parse();
        return { type: "KEYWORD", func: t.value, left, right };
      }

      // Move literal check last
      if (t.type == "LITERAL") {
        return { type: "LITERAL", value: t.value };
      }

      throw new Error("Unknown token: " + JSON.stringify(t));
    }
    const result = tree_parse();
    return JSON.stringify(result, null, 2);
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
      if (token.type === "LITERAL" || token.type === "IDENTIFIER") {
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
      } else if (token.type === "B_OPERATOR" || token.type === "U_BINARY") {
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
const A = new AST("3+4*2");
console.log(R.postfix_Converter("3+4*2"));
const tree = A.Ast();
console.log(tree);
