import {
    AdjacencyMatrix,
    AdjacencyMatrixBuilder,
    AdjacencyMatrixParams,
    Edge,
} from '../src/graph';
import {
    TokenFactory,
} from '../src/token';
import {
    newZeroEdge,
    numberArrayToEdges,
} from '../src/utils';
import {
    testTokenFactory,
    tokenGenerator,
} from './resources/shared';
import {
    TESTTOKEN,
    TestTokenOpts,
} from './resources/testToken';

describe('AdjacencyMatrix', () => {
    it('creates a matrix from a generator of tokens', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        expect(adjMatrix).toBeDefined();
    })

    it('getEdge gets an Edge', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);
        const edge = adjMatrix.getEdge(0, 2);

        expect(edge).toBeInstanceOf(Edge);
    });

    it('getEdge throws on out of bounds', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        expect(() => {
            adjMatrix.getEdge(4, 7);
        }).toThrow(Error);
    });

    it('setEdge sets an Edge', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);
        const edge = adjMatrix.getEdge(0, 2);

        expect(edge).toBeInstanceOf(Edge);
    });

    it('setEdge throws on out of bounds', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        expect(() => {
            adjMatrix.setEdge(newZeroEdge(), 932, 7);
        }).toThrow(Error);
    });


    it('getNumberNodes gets correct number of nodes', () => {
        for (let numberNodes = 0; numberNodes < 25; numberNodes++) {
            const opts: AdjacencyMatrixParams = {
                array: tokenGenerator(numberNodes),
            };

            const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

            expect(adjMatrix.getNumberNodes()).toEqual(numberNodes);
        }
    });

    it('getNode gets a node', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        expect(adjMatrix.getNode(2).id).toEqual('2');
    });

    it('getNode throws when out of bounds', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        expect(() => {
            adjMatrix.getNode(7);
        }).toThrow(Error);
    });

    it('setNode sets a node', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        const id = 'reeeee';
        const node = testTokenFactory.createToken({
            kind: TESTTOKEN,
            id,
            foo: 'bar',
        } as TestTokenOpts);
        
        const result = adjMatrix.setNode(node, 2);

        // Expect we get the old node back
        expect(result.id).toEqual('2');

        // Expect the node we set exists
        expect(adjMatrix.getNode(2).id).toEqual(id);
    });

    it('setNode throws when out of bounds', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        const node = tokenGenerator(1).next().value;

        expect(() => {
            adjMatrix.setNode(node, 7);
        }).toThrow(Error);

        expect(() => {
            adjMatrix.setNode(node, 3);
        }).toThrow(Error);

        expect(() => {
            adjMatrix.setNode(node, -1);
        }).toThrow(Error);

        expect(() => {
            adjMatrix.setNode(node, -5);
        }).toThrow(Error);
    });

    it('swapNodes swaps two nodes', () => {
        const beforeBuilder = AdjacencyMatrixBuilder.newBuilder();

        const before = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        beforeBuilder.withNodes(tokenGenerator(3));
        beforeBuilder.withEdges(numberArrayToEdges(before));

        const afterBuilder = AdjacencyMatrixBuilder.newBuilder();

        const after = [
            [1, 3, 2],
            [7, 9, 8],
            [4, 6, 5],
        ];

        afterBuilder.withNodes(tokenGenerator(3));
        afterBuilder.withEdges(numberArrayToEdges(after));

        const beforeMatrix = beforeBuilder.build();
        const afterMatrix = afterBuilder.build();

        beforeMatrix.swapNodes(1, 2);

        expect(beforeMatrix.equalScore(afterMatrix)).toBeTruthy();

        const secondBeforeMatrix = beforeBuilder.build();

        secondBeforeMatrix.swapNodes(2, 1);

        expect(secondBeforeMatrix.equalScore(afterMatrix)).toBeTruthy();
    });

    it('swapNodes swaps two nodes, with bigger matrix', () => {
        const beforeBuilder = AdjacencyMatrixBuilder.newBuilder();

        const before = [
            [ 1,  2,  3,  4,  5],
            [ 6,  7,  8,  9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ];

        beforeBuilder.withNodes(tokenGenerator(5));
        beforeBuilder.withEdges(numberArrayToEdges(before));

        const afterBuilder = AdjacencyMatrixBuilder.newBuilder();

        const after = [
            [ 1,  4,  3,  2,  5],
            [16, 19, 18, 17, 20],
            [11, 14, 13, 12, 15],
            [ 6,  9,  8,  7, 10],
            [21, 24, 23, 22, 25],
        ];

        afterBuilder.withNodes(tokenGenerator(5));
        afterBuilder.withEdges(numberArrayToEdges(after));

        const beforeMatrix = beforeBuilder.build();
        const afterMatrix = afterBuilder.build();

        beforeMatrix.swapNodes(1, 3);

        expect(beforeMatrix.equalScore(afterMatrix)).toBeTruthy();

        const secondBeforeMatrix = beforeBuilder.build();

        secondBeforeMatrix.swapNodes(3, 1);

        expect(secondBeforeMatrix.equalScore(afterMatrix)).toBeTruthy();
    });

    it('equalScore returns true for equal matrices', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const optsTwo: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);
        const adjMatrixTwo = AdjacencyMatrix.getAdjacencyMatrix(optsTwo);

        expect(adjMatrix.equalScore(adjMatrixTwo)).toBeTruthy();
        expect(adjMatrixTwo.equalScore(adjMatrix)).toBeTruthy();

        adjMatrix.setEdge(new Edge(3), 0, 2);
        expect(adjMatrix.equalScore(adjMatrixTwo)).toBeFalsy();
        expect(adjMatrixTwo.equalScore(adjMatrix)).toBeFalsy();

        adjMatrixTwo.setEdge(new Edge(3), 0, 2);
        expect(adjMatrix.equalScore(adjMatrixTwo)).toBeTruthy();
        expect(adjMatrixTwo.equalScore(adjMatrix)).toBeTruthy();
    });

    it('equalScore returns false for matrices of differing size', () => {
        const opts: AdjacencyMatrixParams = {
            array: tokenGenerator(3),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(opts);

        const optsTwo: AdjacencyMatrixParams = {
            array: tokenGenerator(5),
        };

        const adjMatrixTwo = AdjacencyMatrix.getAdjacencyMatrix(optsTwo);

        expect(adjMatrix.equalScore(adjMatrixTwo)).toBeFalsy();
        expect(adjMatrixTwo.equalScore(adjMatrix)).toBeFalsy();
    });

    it('', () => {
    });

    it('', () => {
    });
})
