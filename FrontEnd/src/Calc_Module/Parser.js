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
          PRECEDENCE[tk.value] <= PRECEDENCE[this.operator.top()]
        ) {
          this.operands.push(this.operator.top());
        }
        this.operands.push(tk);
      } else if (tk.type == "KEYWORD") {
        this.operator.push(tk);
      }
    }
    for (let tkn of this.operands) {
      console.log(tkn);
    }
    return this.operands;
  }
  Ast() {
    const operands = this.rpn();
    let i = operands.length - 1;
    function tree_parse() {
      const t = operands[i--];
      if (t.type == "LITERAL") {
        return { type: "LITERAL", value: t.value };
      } else if (t.type == "U_OPERATOR") {
        let operand = tree_parse();
        return { type: "U_BINARY", op: t.value, arg: operand };
      } else if (t.type == "B_OPERATOR") {
        let right = tree_parse();
        let left = tree_parse();
        return { type: "B_OPERATOR", op: t.value, left, right };
      } else if (t.type == "KEYWORD") {
        let right = tree_parse();
        let left = tree_parse();

        if (right.type == "LITERAL" && left.type == "LITERAL") {
          return { type: "KEYWORD", func: t.value, left, right };
        } else if (right.type == "LITERAL" && left.type !== "LITERAL") {
          return { type: "KEYWORD", func: t.value, right };
        } else if (right.type !== "LITERAL" && left.type == "LITERAL") {
          return { type: "KEYWORD", func: t.value, left };
        }
      }
      throw new Error("Unknown token:" + JSON.stringify(t));
    }

    return tree_parse();
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
const A = new AST("3+4*2+sin(10)");
console.log(R.postfix_Converter("3+4*2+sin(10)"));
const tree = A.Ast();
console.log(JSON.stringify(tree, null, 2));
