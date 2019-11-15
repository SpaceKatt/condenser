import {
    AdjacencyMatrix,
    Edge,
} from '../../src';

import {
    Token,
    TokenOpts,
    TokenFactory,
} from '../../src/token';

import {
    TESTTOKEN,
    TestToken,
    testTokenFactoryDetails,
}from './testToken';

export const isZeroMatrix = (adjMatrix: AdjacencyMatrix): boolean => {
    const length = adjMatrix.getNumberNodes();
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (adjMatrix.getEdge(i, j).getScore() !== 0) {
                return false;
            }
        }
    }

    return true;
}

export const numberArrayToEdges = (mat: number[][]): Edge[][] => {
    const length =  mat.length;
    const edges: Edge[][] = [];

    for (let i = 0; i < length; i++) {
        edges.push([]);
        for (let j = 0; j < length; j++) {
            edges[i].push(new Edge(mat[i][j]));
        }
    }
    
    return edges;
}

const tokenFactory = TokenFactory.createTokenFactory([testTokenFactoryDetails].values());

export function* tokenGenerator(num: number): IterableIterator<Token> {
    let i = 0;

    while (i++ < num) {
        yield tokenFactory.createToken({
            kind: TESTTOKEN,
            id: String(i),
            word: String(i),
        } as TokenOpts);
    }
}
