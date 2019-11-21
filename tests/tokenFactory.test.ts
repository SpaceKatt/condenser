import {
    NUMBER,
    NumberToken,
    NumberTokenOpts,
    TokenFactory,
    TokenOpts,
    WORD,
    WordToken,
    WordTokenOpts,
} from '../src';

import {
    TESTTOKEN,
    TestToken,
    TestTokenOpts,
    testTokenFactoryDetails,
} from './resources';

describe('Token Factory', () => {
    it('Constructs default WORD Tokens', () => {
        const tokenFactory = TokenFactory.createTokenFactory();

        const wordTokenOpts: WordTokenOpts = {
            kind: WORD,
            id: '1',
            word: 'reee',
        };

        const wordToken = tokenFactory.createToken(wordTokenOpts);

        expect(wordToken instanceof WordToken);
    });

    it('Constructs default NUMBER Tokens', () => {
        const tokenFactory = TokenFactory.createTokenFactory();

        const numTokenOpts: NumberTokenOpts = {
            kind: NUMBER,
            id: '1',
            num: 123,
        };

        const numberToken = tokenFactory.createToken(numTokenOpts);

        expect(numberToken instanceof NumberToken);
    });

    it('Adds new constructors to factory', () => {
        const ctorIter = [testTokenFactoryDetails].values();

        const tokenFactory = TokenFactory.createTokenFactory(ctorIter);

        const testTokenOpts: TestTokenOpts = {
            kind: TESTTOKEN,
            id: '1',
            foo: 'ree',
        }

        expect(tokenFactory.createToken(testTokenOpts)).toBeInstanceOf(TestToken);
    });

    it('Throws on unknown symbol', () => {
        const tokenFactory = TokenFactory.createTokenFactory();

        expect(() => {
            tokenFactory.createToken({
                kind: Symbol('DNE'),
                id: '-66',
            } as TokenOpts);
        }).toThrow(TypeError);
    });
});
