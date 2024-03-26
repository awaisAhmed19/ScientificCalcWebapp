import {RPN}from "./Parser.mjs";
import Tokenizer from "./Tokenizer.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import math from "./Math_Module/Math.mjs"
let tk=new Tokenizer();
let r=new RPN();
let m=new math();
let Ec=new ExpressionChecker()
class Eval{
    constructor(){
        this.output=[];
    }

    evalulator(exp){
        exp=r.postfix_Converter(exp);
        let op1,op2=0;
        for (let i of exp){
            if (Ec.isNumber(i)){
                this.output.push(parseFloat(i))
            }
            else if(Ec.isOperator(i)){
                if(i=='-' && this.output.length>=2){
                    op1=this.output.pop();
                    op2=this.output.pop();
                    this.output.push(m.operations(op2,op1,i))
                }
                else if(i=='-' && this.output.length==1){
                    let op=this.output.pop();
                    this.output.push(m.negation(op));
                }
                else{
                    op1=this.output.pop();
                    op2=this.output.pop();
                    this.output.push(m.operations(op2,op1,i))
                    
                }
            }
            else if(i=='!'){
                op=this.output.pop();
                this.output.push(this.fact(op));
            }
            else if(Ec.isFunc(i)){
                let value=parseFloat(this.output.pop())
                let func= i;
                this.output.push(m.funcEval(func,value));
            }
        }
        return this.output.pop();
    }
}

let e=new Eval();
let exp="sin(45)"
console.log(tk.tokenize(exp))
console.log(r.postfix_Converter(exp))
console.log(e.evalulator(exp));