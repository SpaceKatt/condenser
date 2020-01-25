import {
    Edge,
} from '../src/graph';

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

    it('clone', () => {
        const edge = new Edge(2);

        const cloneWar = edge.clone();

        expect(cloneWar.getScore()).toEqual(2);

        edge.setScore(6);
        expect(cloneWar.getScore()).toEqual(2);
    });
});
