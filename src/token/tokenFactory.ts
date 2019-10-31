import {
    NUMBER,
    NumberToken,
    NumberTokenOpts,
    numberTokenFactoryDetails,
    Token,
    TokenOpts,
    TokenContructor,
    TokenContructorDetails,
    WORD,
    WordToken,
    WordTokenOpts,
    wordTokenFactoryDetails,
} from '.';

export interface TokenFactoryOpts {
    constructors: IterableIterator<TokenContructorDetails>;
}

function* defaultTokenConstructorDetails(): IterableIterator<TokenContructorDetails> {
    const defaultOpts = [
        numberTokenFactoryDetails,
        wordTokenFactoryDetails,
    ].values();

    for (const opt of defaultOpts) {
        yield opt;
    }
}

export class TokenFactory {
    readonly ctorMap: Map<symbol, TokenContructor>;

    constructor(tokenFactoryOpts: TokenFactoryOpts) {
        this.ctorMap = new Map<symbol, TokenContructor>();

        for (const ctorDetails of tokenFactoryOpts.constructors) {
            this.ctorMap.set(ctorDetails.kind, ctorDetails.ctor);
        }

        // Load defaults
        for (const defaultCtorDetails of defaultTokenConstructorDetails()) {
            this.ctorMap.set(defaultCtorDetails.kind, defaultCtorDetails.ctor);
        }
    }

    createToken(kind: symbol, tokenOpts: TokenOpts): Token {
        const tokenCtor = this.ctorMap.get(kind);

        if (tokenCtor !== undefined) {
            return new tokenCtor(tokenOpts);
        } else {
            throw new TypeError('TokenFactory: Unknown token type detected')
        }
    }
}
