class ExpressionChecker {
    constructor() {}

    isNumber(token) {
        return token.match(/^\d+(\.\d+)?|\.\d+/);
    }

    isOperator(token) {
        return token.match(/^[\+\-\*\/\^]/);
    }

    isLeftParen(token) {
        return token.match(/^\(/);
    }

    isRightParen(token) {
        return token.match(/^\)/);
    }

    isVar(token) {
        return token.match(/^(a|b|c|p|r|s|q|x|y|z|m|n|)+/);
    }

    isFunc(token) {
        return token.match(/^(sin|cos|tan|log|exp|sqrt|log2|log10|log|cbrt)/);
    }

    isConst(token) {
        return token.match(/^(pi|e)/);
    }
}

export default ExpressionChecker;
