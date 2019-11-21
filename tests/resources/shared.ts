import {
    AdjacencyMatrix,
    Edge,
} from '../../src';
import {
    generateTokenId,
} from '../../src/utils';

import {
    Token,
    TokenOpts,
    TokenFactory,
} from '../../src/token';

import {
    TESTTOKEN,
    TestToken,
    TestTokenOpts,
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

export const testTokenFactory = TokenFactory.createTokenFactory([testTokenFactoryDetails].values());

export function* tokenGenerator(num: number): IterableIterator<Token> {
    let i = 0;
    const idGenerator = generateTokenId();

    while (i++ < num) {
        yield testTokenFactory.createToken({
            kind: TESTTOKEN,
            id: idGenerator.next().value,
            foo: String(i - 1),
        } as TestTokenOpts);
    }
}
