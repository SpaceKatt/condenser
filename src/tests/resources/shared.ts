import { TESTTOKEN, TestTokenOpts, testTokenFactoryDetails } from './testToken';

import { AdjacencyMatrix, Path } from '../../';
import { generateId } from '../../utils';
import { Token, TokenFactory } from '../../token';

export const isEqualPaths = (a: Path, b: Path): boolean => {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

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
};

export const testTokenFactory = TokenFactory.createTokenFactory(
    [testTokenFactoryDetails].values(),
);

export function* tokenGenerator(num: number): IterableIterator<Token> {
    let i = 0;
    const idGenerator = generateId();

    while (i++ < num) {
        yield testTokenFactory.createToken({
            kind: TESTTOKEN,
            id: idGenerator.next().value,
            foo: String(i - 1),
        } as TestTokenOpts);
    }
}
