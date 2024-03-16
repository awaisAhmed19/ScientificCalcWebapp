export class Tokenizer{
    constructor(){
        this.tokens=[];

        this.pattern_dictionary = {
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
            'LOG10': /^log10/
        };
        
    }

    

tokenizer(expression){
    expression=expression.replace(/\s+/g, '');
    this.tokens=[];
    while(expression.length>0){
        let matched=false;

        Object.keys(this.pattern_dictionary).forEach((patternKey)=>{
            const pattern=this.pattern_dictionary[patternKey];
            const match=expression.match(pattern);

            if(match && match.index===0){
                this.tokens.push(match[0]);
                expression=expression.slice(match[0].length);
                matched=true;

            }
        });
        if(!matched){
            console.log("Invalid token at "+expression);
            throw new Error('Unable to parse expression');
        }
    }
    return this.tokens;
}
}
export default Tokenizer;

