import { isEqualPaths, tokenGenerator } from './resources';

import { AdjacencyMatrixBuilder, DijkstraLongestPath, Path, Edge } from '../';

describe('DijkstraLongestPath', () => {
    it('Picks the best path', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(3))
            .withEdges(
                Edge.getMatrixFromScoreMatrix([
                    [0, 1, 0],
                    [0, 0, 1],
                    [0, 0, 0],
                ]),
            )
            .build();

        const knownBestPath: Path = [0, 1, 2];

        const pathStrategy = DijkstraLongestPath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        const bestPath = pathIterator.next().value;

        expect(isEqualPaths(bestPath, knownBestPath)).toBeTruthy();
    });

    it('Picks best path, again', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(4))
            .withEdges(
                Edge.getMatrixFromScoreMatrix([
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0],
                ]),
            )
            .build();

        const knownBestPath: Path = [0, 2, 1, 3];

        const pathStrategy = DijkstraLongestPath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        const bestPath = pathIterator.next().value;

        expect(isEqualPaths(bestPath, knownBestPath)).toBeTruthy();
    });

    it('Picks best path among options', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(4))
            .withEdges(
                Edge.getMatrixFromScoreMatrix([
                    [0, 1, 3, 0],
                    [0, 0, 1, 1],
                    [0, 0, 0, 2],
                    [0, 0, 0, 0],
                ]),
            )
            .build();

        const knownBestPath: Path = [0, 2, 3];

        const pathStrategy = DijkstraLongestPath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        const bestPath = pathIterator.next().value;

        expect(isEqualPaths(bestPath, knownBestPath)).toBeTruthy();
    });

    it('Picks best path among more options', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(6))
            .withEdges(
                Edge.getMatrixFromScoreMatrix([
                    [0, 1, 33, 98, 0, 0],
                    [0, 0, 0, 3, 0, 1],
                    [0, 0, 0, 0, 17, 0],
                    [0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0],
                ]),
            )
            .build();

        const knownBestPath: Path = [0, 3, 5];

        const pathStrategy = DijkstraLongestPath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        const bestPath = pathIterator.next().value;

        expect(isEqualPaths(bestPath, knownBestPath)).toBeTruthy();
    });

    it('Only picks one path', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(3))
            .withEdges(
                Edge.getMatrixFromScoreMatrix([
                    [0, 1, 0],
                    [0, 0, 1],
                    [0, 0, 0],
                ]),
            )
            .build();

        const pathStrategy = DijkstraLongestPath.create();

        const pathIterator = pathStrategy.findPaths(adjMatrix);

        expect(pathIterator.next().value).toBeDefined();
        expect(pathIterator.next().value).toBeUndefined();
    });
});
