import Tokenizer from "../Tokenizer.mjs";
import RPN from "../Parser.mjs";

let r = new RPN();
let testExpressions = {
    1: "1 + 2 * 3",                           // Simple arithmetic expression
    2: "sin(30) + cos(45)",                   // Trigonometric functions
    3: "log(100) / sqrt(4)",                  // Logarithmic and square root functions
    4: "5 * pi + e",                          // Constants (pi and e)
    5: "x^2 + 3*x - 5",                       // Algebraic expression with variable
    6: "123 + abc * 45",                      // Expression with a variable and numbers
    7: "   1   +   2 * 3   ",                 // Expression with extra white spaces
    8: "sin(30) + cos(45) - tan(60)",         // Trigonometric functions
    9: "log(100) / sqrt(4) * exp(2)",         // Logarithmic and exponential functions
    10: "5 * pi + e - sqrt(25) / log(10)",    // Constants and functions combined
    11: "(x^2 + 3*x - 5) / (2*x + 1)",        // Polynomial expression
    12: "123 + abc * 45 - log2(8)",           // Complex expression with variable and function
    13: "sin(cos(tan(x)))",                   // Nested trigonometric functions
    14: "log10(exp(sqrt(9)))",                // Nested logarithmic and exponential functions
    15: "2^3 + sqrt(16) - sin(pi/2)",         // Combined operations with constants
    16: "log(100) / sqrt(4) + sqrt(25) * exp(2)", 
    17: "1.1+1.3",
    18: "1.2+1.22+32.88286263665635"
};

//console.log(testExpressions);
let tk=new Tokenizer()

for (let serialNumber in testExpressions) {
    let result=0;
    console.log(`Expression ${serialNumber}: ${testExpressions[serialNumber]}`);
    result=tk.tokenize(testExpressions[serialNumber]);
    console.log(`Postfix Notation: ${result}`);
    console.log("-------------------------------------");
}
