class ExpressionChecker {
    constructor() {}

    isNumber(token) {
        return typeof token==="string"&&token.match(/^\d+(\.\d+)?|\.\d+/);
    }

    isOperator(token) {
        return typeof token==="string"&&token.match(/^[\+\-\*\/\^]/);
    }

    isLeftParen(token) {
        return typeof token==="string"&&token.match(/^\(/);
    }

    isRightParen(token) {
        return typeof token==="string"&&token.match(/^\)/);
    }

    isVar(token) {
        return typeof token ==="string" && token.match(/^(a|b|c|p|r|s|q|x|y|z|m|n|)+/);
    }

    isFunc(token) {
        return typeof token==="string"&&token.match(/^(sin|cos|tan|log|exp|sqrt|log2|log10|log|cbrt)/);
    }

    isConst(token) {
        return typeof token==="string"&&token.match(/^(pi|e)/);
    }
}

export default ExpressionChecker;
