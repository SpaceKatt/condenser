export interface TokenOpts {
    kind: symbol;
    id: string;
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

export const WORD: unique symbol = Symbol('WORD');
export type WORD = typeof WORD;

export interface WordTokenOpts extends TokenOpts {
    word: string;
}

export class WordToken extends Token {
    readonly word: string;

    constructor(opts: WordTokenOpts) {
        super(opts);

        this.word = opts.word;
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

export const NUMBER: unique symbol = Symbol('WORD');
export type NUMBER = typeof WORD;

export interface NumberTokenOpts extends TokenOpts {
    num: number;
}

export class NumberToken extends Token {
    readonly num: number;

    constructor(opts: NumberTokenOpts) {
        super(opts);

        this.num = opts.num;
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
