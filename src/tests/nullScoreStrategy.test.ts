import {
    AdjacencyMatrix,
    AdjacencyMatrixBuilder,
    AdjacencyMatrixParams,
    Edge,
    GraphIsomorph,
    NullScoreStrategy,
} from '../';

import {
    tokenGenerator,
} from './resources';

describe('NullScoreStrategy', () => {
    it('NullScoreStrategy performs NOP', () => {
        const adjMatrix = AdjacencyMatrixBuilder
            .newBuilder()
            .withNodes(tokenGenerator(2))
            .withEdges(Edge.getMatrixFromScoreMatrix([
                [1, 2],
                [3, 4]
            ]))
            .build();

        const nullStrategy = NullScoreStrategy.create();

        const scoredMatrix = nullStrategy.scoreIsomorph(adjMatrix.clone());

        expect(adjMatrix.equalScore(scoredMatrix)).toBe(true);
    });
});
