import {
    Edge,
} from '../graph';

describe('Edge', () => {
    it('getScore', () => {
        const edge = new Edge(5);

        expect(edge.getScore()).toEqual(5);
    });

    it('setScore', () => {
        const edge = new Edge(0);

        expect(edge.getScore()).toEqual(0);

        edge.setScore(5);
        expect(edge.getScore()).toEqual(5);
    });

    it('equal values equal', () => {
        expect((new Edge(7)).equal(new Edge(7))).toBeTruthy();
    });

    it('unequal values do not equal', () => {
        expect((new Edge(7)).equal(new Edge(6))).toBeFalsy();
    });

    it('clone', () => {
        const edge = new Edge(2);

        const cloneWar = edge.clone();

        expect(cloneWar.getScore()).toEqual(2);

        edge.setScore(6);
        expect(cloneWar.getScore()).toEqual(2);
    });

    it('Creates Edge matrix from number matrix', () => {
        const scoreMatrix = [
            [1, 2],
            [7, 5]
        ];

        const resultMatrix = Edge.getMatrixFromScoreMatrix(scoreMatrix);

        expect(resultMatrix[0][0].equal(new Edge(1))).toBeTruthy();
        expect(resultMatrix[0][1].equal(new Edge(2))).toBeTruthy();
        expect(resultMatrix[1][0].equal(new Edge(7))).toBeTruthy();
        expect(resultMatrix[1][1].equal(new Edge(5))).toBeTruthy();

        expect(resultMatrix.length === 2).toBeTruthy();
        expect(resultMatrix[0].length === 2).toBeTruthy();
    });
});
