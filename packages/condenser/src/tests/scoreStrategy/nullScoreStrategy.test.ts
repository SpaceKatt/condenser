import { tokenGenerator } from '../resources';
import { AdjacencyMatrixBuilder, Edge, NullScoreStrategy } from '../../';

describe('NullScoreStrategy', () => {
    it('NullScoreStrategy performs NOP', () => {
        const adjMatrix = AdjacencyMatrixBuilder.newBuilder()
            .withNodes(tokenGenerator(2))
            .withEdges(Edge.getMatrixFromScoreMatrix([[1, 2], [3, 4]]))
            .build();

        const nullStrategy = NullScoreStrategy.create();

        const scoredMatrix = nullStrategy.scoreIsomorph(adjMatrix.clone());

        expect(adjMatrix.equalScore(scoredMatrix)).toBe(true);
    });
});
