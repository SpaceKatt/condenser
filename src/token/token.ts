export interface TokenOpts {
    kind: symbol;
    id: string;
}

export interface TokenContructor {
    new (opts: TokenOpts): Token;
}

export interface TokenContructorDetails {
    kind: symbol;
    ctor: TokenContructor;
}

export abstract class Token {
    readonly kind: symbol;
    readonly id: string;

    constructor(opts: TokenOpts) {
        this.kind = opts.kind;
        this.id = opts.id;
    };

    abstract clone(): Token;

    cloneOpts(): TokenOpts {
        return {
            kind: this.kind,
            id: this.id,
        };
    }
}

///////////////////////////////////////////////////////////////////////////////
//                         ////////////////////////////////////////////////////
//  Word Token Definition /////////////////////////////////////////////////////
//                       //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const WORD: unique symbol = Symbol('WORD');
export type WORD = typeof WORD;

export interface WordTokenOpts extends TokenOpts {
    word: string;
}

function isWordTokenOpts(opts: TokenOpts): opts is WordTokenOpts {
    return opts.kind === WORD ? true : false;
}

export class WordToken extends Token {
    readonly word: string;

    constructor(opts: TokenOpts) {
        super(opts);

        if (isWordTokenOpts(opts)) {
            this.word = opts.word;
        } else {
            throw new TypeError('WordToken handed bad opts in ctor');
        }
    }

    clone(): WordToken {
        return new WordToken(this.cloneWordOpts());
    }

    cloneWordOpts(): WordTokenOpts {
        return {
            ...super.cloneOpts(),
            word: this.word,
        };
    }
}

export const wordTokenFactoryDetails: TokenContructorDetails = {
    kind: WORD,
    ctor: WordToken,
}

///////////////////////////////////////////////////////////////////////////////
//                          ///////////////////////////////////////////////////
// Number Token Definition ////////////////////////////////////////////////////
//                        /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const NUMBER: unique symbol = Symbol('WORD');
export type NUMBER = typeof NUMBER;

export interface NumberTokenOpts extends TokenOpts {
    num: number;
}

function isNumberTokenOpts(opts: TokenOpts): opts is NumberTokenOpts {
    return opts.kind === NUMBER ? true : false;
}

export class NumberToken extends Token {
    readonly num: number;

    constructor(opts: TokenOpts) {
        super(opts);

        if (isNumberTokenOpts(opts)) {
            this.num = opts.num;
        } else {
            throw new TypeError('NumberToken handed bad opts in ctor');
        }
    }

    clone(): NumberToken {
        return new NumberToken(this.cloneNumberOpts());
    }

    cloneNumberOpts(): NumberTokenOpts {
        return {
            ...super.cloneOpts(),
            num: this.num,
        };
    }
}

export const numberTokenFactoryDetails: TokenContructorDetails = {
    kind: NUMBER,
    ctor: NumberToken,
}
