export class Tokenizer{
    constructor(){
        this.tokens=[];

        this.pattern_Dictionary = {
            //'DECIMAL': /^\d*\.?\d+/,
            'DECIMAL1': /^\d+(\.\d+)?|\.\d+/,
            'NUMBER': /^\d+/,
            'PLUS': /^\+/,
            'MINUS': /^\-/,
            'MULTIPLY': /^\*/,
            'DIVIDE': /^\//,
            'LPAREN': /^\(/,
            'RPAREN': /^\)/,
            'SIN': /^sin/,
            'COS': /^cos/,
            'TAN': /^tan/,
            'LOG': /^log/,
            'EXP': /^exp/,
            'SQRT': /^sqrt/,
            'PI': /^pi/,
            'E': /^e/,
            'X': /^x/,
            'POWER': /^\^/,
            'FACTORIAL': /^\!/,
            'COMMA': /^\,/,
            'VARIABLE': /^[a-zA-Z0-9]+/,
            'LOG2': /^log2/,
            'LOG10': /^log10/,
        };
        
    }

    tokenize(expression){
        expression=expression.replace(/\s/g, '');
        this.tokens=[];
        while(expression.length>0){
            let matched=false;
            for(let pattern_Key in this.pattern_Dictionary){
                const pattern=this.pattern_Dictionary[pattern_Key];
                const match=expression.match(pattern);
                if(match && match.index===0){
                    this.tokens.push(match[0]);
                    expression=expression.slice(match[0].length);
                    matched=true;
                    break;
                }
            }
            if(!matched){
                cosole.log("invalid expresssion"+expression)
                throw new Error(`Unrecognized token: ${expression}`);
            }
        }
        return this.tokens;
    }
    
    
}
export default Tokenizer;

//creating a test for tokenizer
const testexpression= "1.1+ 2344.4";
const tk = new Tokenizer();
console.log(tk.tokenize(testexpression));

