import {RPN,Stack}from "./Parser.mjs";
import ExpressionChecker from "./ExpressionChecker.mjs";
import math from "./MathModule.mjs"
//import Stack from "./Parser.mjs";
let r=new RPN();
class Eval{
    constructor(){
        this.output=new Stack();
    }

    evalulator(exp){
        exp=r.postfix_Converter(exp);
        
        for (let i of exp){
            if (ExpressionChecker.isNumber(i)){
                this.output.push(parseFloat(i))
            }
            else if(ExpressionChecker.isOperator(i)){
                if(i=='-' && this.output.length>=2){
                    let op1=this.output.pop();
                    let op2=this.output.pop();
                    this.output.push(this.operations(op2,op1,i))
                }
                else if(i=='-' && this.output.length==1){
                    let op=this.output.pop();
                    this.output.push(this.negation(op));
                }
                else{
                    op1=this.output.pop();
                    op2=this.output.pop();
                    this.output.push(this.operations(op2,op1,i))
                    
                }
            }
            else if(i=='!'){
                op=this.output.pop();
                this.output.push(this.fact(op));
            }
            else if(ExpressionChecker.isFunc(i)){
                let value=parseFloat(this.output.pop())
                let func= i;
                this.output.push(this.function_eval(func,value));
            }
            return this.output;
        }
    }
}

let e=new Eval();
console.log(e.evalulator("1+22+4"));