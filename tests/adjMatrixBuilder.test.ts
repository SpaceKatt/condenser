import {
    AdjacencyMatrixBuilder,
} from '../src/graph/adjMatrixBuilder';

import {
    Token,
    TokenOpts,
    TokenFactory,
    WORD,
    WordToken
} from '../src/token';

const tokenFactory = TokenFactory.createTokenFactory();

function* tokenGenerator(num: number): IterableIterator<Token> {
    let i = 0;

    while (i++ < num) {
        yield tokenFactory.createToken({
            kind: WORD,
            id: String(i),
            word: String(i),
        } as TokenOpts);
    }
}

describe('Reee', () => {
    it('Builds a one node matrix', () => {
        const numberOfNodes = 1;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(WORD);
        expect(() => {
            adjMatrix.getNode(numberOfNodes).kind
        }).toThrow(Error);
    });

    it('Builds a two node matrix', () => {
        const numberOfNodes = 2;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(WORD);
        expect(() => {
            adjMatrix.getNode(numberOfNodes).kind
        }).toThrow(Error);
    });

    it('Builds a three node matrix', () => {
        const numberOfNodes = 3;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(WORD);
        expect(() => {
            adjMatrix.getNode(numberOfNodes).kind
        }).toThrow(Error);
    });
});
