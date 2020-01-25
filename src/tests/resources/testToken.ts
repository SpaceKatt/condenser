import {
    Token,
    TokenOpts,
    TokenContructorDetails,
} from '../../';

export const TESTTOKEN: unique symbol = Symbol('TESTTOKEN');
export type TESTTOKEN = typeof TESTTOKEN;

export interface TestTokenOpts extends TokenOpts {
    foo: string;
}

function isTestTokenOpts(opts: TokenOpts): opts is TestTokenOpts {
    return opts.kind === TESTTOKEN ? true : false;
}

export class TestToken extends Token {
    readonly foo: string;

    constructor(opts: TokenOpts) {
        super(opts);

        if (isTestTokenOpts(opts)) {
            this.foo = opts.foo;
        } else {
            throw new TypeError('TestToken handed bad opts in ctor');
        }
    }

    clone(): TestToken {
        return new TestToken(this.cloneTestOpts());
    }

    cloneTestOpts(): TestTokenOpts {
        return {
            ...super.cloneOpts(),
            foo: this.foo,
        };
    }
}

export const testTokenFactoryDetails: TokenContructorDetails = {
    kind: TESTTOKEN,
    ctor: TestToken,
}


