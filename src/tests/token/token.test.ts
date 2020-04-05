import { NUMBER, NumberToken, WORD, WordToken } from '../token';

describe('Token', () => {
    it('NumberToken clone', () => {
        const num = new NumberToken({
            kind: NUMBER,
            id: '2',
            num: 2,
        });

        const numTwo = num.clone();

        expect(numTwo.num).toEqual(2);
    });

    it('WordToken clone', () => {
        const word = new WordToken({
            kind: WORD,
            id: '2',
            word: 'reee',
        });

        const wordTwo = word.clone();

        expect(wordTwo.word).toEqual('reee');
    });

    it('NumberToken throws on bad input', () => {
        expect(() => {
            new NumberToken({
                kind: WORD,
                id: '2',
                word: 'reee',
            });
        }).toThrow();
    });

    it('WordToken throws on bad input', () => {
        expect(() => {
            new WordToken({
                kind: NUMBER,
                id: '2',
                num: 2,
            });
        }).toThrow();
    });
});
