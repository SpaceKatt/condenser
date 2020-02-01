import {
    AdjacencyMatrix,
    AdjacencyMatrixBuilder,
    DijkstraSinglePath,
    Path,
    Edge,
} from '../';

import {
    isEqualPaths,
    tokenGenerator,
} from './resources';

describe('DijkstraSinglePath', () => {
    it('Picks the best path', () => {
        const adjMatrix = AdjacencyMatrixBuilder
            .newBuilder()
            .withNodes(tokenGenerator(3))
            .withEdges(Edge.getMatrixFromScoreMatrix([
                [0, 1, 0],
                [0, 0, 1],
                [0, 0, 0]
            ]))
            .build();

        const knownBestPath: Path = [1, 2, 3];

        const pathStrategy = DijkstraSinglePath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        const bestPath = pathIterator.next().value;

        expect(isEqualPaths(bestPath, knownBestPath)).toBeTruthy();
    });

    it('Picks best path, again', () => {
    });

    it('Only picks one path', () => {
        const adjMatrix = AdjacencyMatrixBuilder
            .newBuilder()
            .withNodes(tokenGenerator(3))
            .withEdges(Edge.getMatrixFromScoreMatrix([
                [0, 1, 0],
                [0, 0, 1],
                [0, 0, 0]
            ]))
            .build();

        const pathStrategy = DijkstraSinglePath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        expect(pathIterator.next()).toBeDefined();
        expect(pathIterator.next()).toBeUndefined();
    });
});
