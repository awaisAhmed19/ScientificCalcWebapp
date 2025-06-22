import { RPN } from "./Parser.js";
import ExpressionChecker from "./ExpressionChecker.js";
import math from "./Math.js";

const r = new RPN();
const m = new math();
const Ec = new ExpressionChecker();

export class Eval {
  constructor() {
    this.output = [];
  }

  evalulator(exp) {
    exp = r.postfix_Converter(exp);
    let op1,
      op2 = 0;
    for (let i of exp) {
      console.log(i);
      if (Ec.isNumber(i)) {
        this.output.push(parseFloat(i));
      } else if (Ec.isOperator(i)) {
        if (i == "-" && this.output.length >= 2) {
          op1 = this.output.pop();
          op2 = this.output.pop();
          this.output.push(m.operations(op2, op1, i));
        } else if (i == "-" && this.output.length == 1) {
          let op = this.output.pop();
          this.output.push(m._negation_(op));
        } else {
          op1 = this.output.pop();
          op2 = this.output.pop();
          this.output.push(m.operations(op2, op1, i));
        }
      } else if (i == "!") {
        op = this.output.pop();
        this.output.push(this.fact(op));
      } else if (Ec.isFunc(i)) {
        let value = this.output.pop();
        if (typeof value === "undefined" || Ec.isVar(value)) {
          throw new Error("Invalid expression: Unexpected end of input");
        }
        let func = i;
        this.output.push(m.funcEval(func, parseFloat(value)));
      }
    }
    return this.output.pop();
  }
}

const EL = new Eval();
console.log(EL.evalulator(r.postfix_Converter("55+5")));
console.log(r.postfix_Converter("55-5"));

export default Eval;
