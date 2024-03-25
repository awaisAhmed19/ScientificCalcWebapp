class ExpressionChecker {
    static isNumber(token) {
        return token.match(/^\d+(\.\d+)?|\.\d+/);
    }

    static isOperator(token) {
        return token.match(/^[\+\-\*\/\^]/);
    }

    static isLeftParen(token) {
        return token.match(/^\(/);
    }

    static isRightParen(token) {
        return token.match(/^\)/);
    }

    static isVar(token) {
        return token.match(/^(a|b|c|p|r|s|q|x|y|z|m|n|)+/);
    }

    static isFunc(token) {
        return token.match(/^(sin|cos|tan|log|exp|sqrt|log2|log10|log|cbrt)/);
    }

    static isConst(token) {
        return token.match(/^(pi|e)/);
    }
}

export default ExpressionChecker;
