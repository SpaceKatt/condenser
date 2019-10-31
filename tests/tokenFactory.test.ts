import {
    NUMBER,
    NumberToken,
    NumberTokenOpts,
    TokenFactory,
    WORD,
    WordToken,
    WordTokenOpts,
} from '../src';

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
});
