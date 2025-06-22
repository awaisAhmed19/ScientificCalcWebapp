import { ExpressionChecker } from "./ExpressionChecker.js";
const ec = new ExpressionChecker();
export class Tokenizer {
  constructor() {
    this.tokens = [];

    this.TOKEN_TYPE = {
      KEYWORD: "KEYWORD",
      LITERAL: "LITERAL",
      OPERATOR: "OPERATOR",
      B_OPERATOR: "B_OPERATOR",
      U_OPERATOR: "U_OPERATOR",
      IDENTIFIER: "IDENTIFIER",
      LPAREN: "LPAREN",
      RPAREN: "RPAREN",
      VARIABLE: "VARIABLE",
      COMMA: "COMMA",
      WHITESPACE: "WHITESPACE",
    };
  }

  tokenize(expression) {
    this.tokens = [];
    let i = 0;
    while (i < expression.length) {
      const char = expression[i];
      if (/\s/.test(char)) {
        i++;
        continue;
      }
      if (/[0-9.]/.test(char)) {
        let num = char;
        i++;
        while (/[0-9.]/.test(expression[i])) {
          num += expression[i];
          i++;
        }
        this.tokens.push({
          type: this.TOKEN_TYPE.LITERAL,
          value: num,
        });
        continue;
      }
      if (char === ",") {
        this.tokens.push({ type: this.TOKEN_TYPE.COMMA, value: char });
        i++;
        continue;
      }
      if (/[a-zA-Z]/.test(char)) {
        let buff = char;
        i++;
        while (/[a-zA-Z0-9_]/.test(expression[i])) {
          buff += expression[i];
          i++;
        }
        if (ec.isFunc(buff)) {
          this.tokens.push({ type: this.TOKEN_TYPE.KEYWORD, value: buff });
        } else {
          this.tokens.push({ type: this.TOKEN_TYPE.IDENTIFIER, value: buff });
        }
        continue;
      }
      if ("+-*/^".includes(char)) {
        if (
          (this.tokens.length === 0 && char == "-") ||
          ((this.tokens[this.tokens.length - 1].type ==
            this.TOKEN_TYPE.LPAREN ||
            this.tokens[this.tokens.length - 1].type ==
              this.TOKEN_TYPE.B_OPERATOR) &&
            char == "-")
        ) {
          this.tokens.push({ type: this.TOKEN_TYPE.U_OPERATOR, value: char });
        } else {
          this.tokens.push({ type: this.TOKEN_TYPE.B_OPERATOR, value: char });
        }
        i++;
        continue;
      }
      if (char === "(") {
        this.tokens.push({ type: this.TOKEN_TYPE.LPAREN, value: char });
        i++;
        continue;
      }

      if (char === ")") {
        this.tokens.push({ type: this.TOKEN_TYPE.RPAREN, value: char });
        i++;
        continue;
      } else {
        throw new Error(`Unregonised character: ${char}`);
      }
    }
    return this.tokens;
  }
}

const Tok = new Tokenizer();
const formulas = [
  "2 + 3",
  "4.5 * 7",
  "(1 + 2) * 3",
  "x + 5",
  "y / 3.14",
  "x1 + y2",
  "sin(30)",
  "cos(x) + 2",
  "sqrt(9) + pow(2, 3)",
  "log(10) + ln(e)",
  "(x + y) * (a - b)",
  "abs(-5) + 3",
  "3.14159 * radius^2",
  "((3 + 4) * 2) / (7 - 5)",
  "((x1 + y1) / 2) + ((x2 + y2) / 2)",
  "tan(theta) - 1 / 2",
  "pow((a + b), 2)",
  "x^y^z",
  "0.5 * (base * height)",
];

/*let test = "2*-x + 5";
let testres = Tok.tokenize(test);
let t;
for (t of testres) {
  console.log(t);
  console.log(t.type);
  console.log(t.value);
}
formulas.forEach((expr) => {
  try {
    const res = Tok.tokenize(expr);
    console.log(`✅ ${expr} →`, res);
  } catch (err) {
    console.log(`❌ ${expr} →`, err.message);
  }
});*/
export default Tokenizer;
