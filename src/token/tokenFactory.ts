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

function* defaultTokenConstructorDetails(): IterableIterator<
    TokenContructorDetails
    > {
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

    private constructor() {
        this.ctorMap = new Map<symbol, TokenContructor>();
    }

    addConstructors(
        tokenFactoryCtors: IterableIterator<TokenContructorDetails>,
    ): void {
        for (const ctorDetails of tokenFactoryCtors) {
            this.ctorMap.set(ctorDetails.kind, ctorDetails.ctor);
        }
    }

    createToken(tokenOpts: TokenOpts): Token {
        const tokenCtor = this.ctorMap.get(tokenOpts.kind);

        if (tokenCtor !== undefined) {
            return new tokenCtor(tokenOpts);
        } else {
            throw new TypeError('TokenFactory: Unknown token type detected');
        }
    }

    static createTokenFactory(
        tokenCtorDetails?: IterableIterator<TokenContructorDetails>,
    ): TokenFactory {
        const tokenFactory = new TokenFactory();

        tokenFactory.addConstructors(defaultTokenConstructorDetails());

        if (tokenCtorDetails) {
            tokenFactory.addConstructors(tokenCtorDetails);
        }

        return tokenFactory;
    }
}
