import Tokenizer from "../Tokenizer.mjs";
import RPN from "../Parser.mjs";

// Define test expressions
const testExpressions = [
    "1 + 2 * 3",                           // Simple arithmetic expression
    "sin(30) + cos(45)",                   // Trigonometric functions
    "log(100) / sqrt(4)",                  // Logarithmic and square root functions
    "5 * pi + e",                          // Constants (pi and e)
    "x^2 + 3*x - 5",                       // Algebraic expression with variable
    "123 + abc * 45",                      // Expression with a variable and numbers
    " 1 +   2 * 3   ",                     // Expression with extra white spaces
    "sin(30) + cos(45) - tan(60)",         // Trigonometric functions
    "log(100) / sqrt(4) * exp(2)",         // Logarithmic and exponential functions
    "5 * pi + e - sqrt(25) / log(10)",     // Constants and functions combined
    "(x^2 + 3*x - 5) / (2*x + 1)",         // Polynomial expression
    "123 + abc * 45 - log2(8)",            // Complex expression with variable and function
    "sin(cos(tan(x)))",                    // Nested trigonometric functions
    "log10(exp(sqrt(9)))",                 // Nested logarithmic and exponential functions
    "2^3 + sqrt(16) - sin(pi/2)",          // Combined operations with constants
    "log(100) / sqrt(4) + sqrt(25) * exp(2)", 
    "1.1 + 1.3",                           // Floating point numbers
    "1.2 + 1.22 + 32.88286263665635"       // Floating point numbers
];

// Initialize Tokenizer and RPN
const tokenizer = new Tokenizer();
const rpn = new RPN();

// Perform tests
for (let expression of testExpressions) {
    console.log(`Expression: ${expression}`);
    
    // Tokenize the expression
    const tokens = tokenizer.tokenize(expression);
    console.log("Tokenized expression:", tokens);
    
    // Convert to postfix notation
    const postfixExpression = rpn.postfix_Converter(expression);
    console.log("Postfix expression:", postfixExpression);
    
    console.log("-------------------------------------");
}
