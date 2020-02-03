import { isZeroMatrix, tokenGenerator } from './resources/shared';
import { TESTTOKEN } from './resources/testToken';

import { AdjacencyMatrixBuilder } from '../graph/adjMatrixBuilder';
import { Edge, newZeroEdge, numberArrayToEdges } from '../';

describe('AdjacencyMatrixBuilder', () => {
    it('Builds a one node matrix', () => {
        const numberOfNodes = 1;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(TESTTOKEN);
        expect(() => {
            /* tslint:disable-next-line:no-unused-expression */
            adjMatrix.getNode(numberOfNodes).kind;
        }).toThrow(Error);
    });

    it('Builds a two node matrix', () => {
        const numberOfNodes = 2;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(TESTTOKEN);
        expect(() => {
            /* tslint:disable-next-line:no-unused-expression */
            adjMatrix.getNode(numberOfNodes).kind;
        }).toThrow(Error);
    });

    it('Builds a three node matrix', () => {
        const numberOfNodes = 3;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(adjMatrix.getNode(numberOfNodes - 1).kind).toEqual(TESTTOKEN);
        expect(() => {
            /* tslint:disable-next-line:no-unused-expression */
            adjMatrix.getNode(numberOfNodes).kind;
        }).toThrow(Error);
    });

    it('Adj Matrix is initialized to zero', () => {
        const numberOfNodes = 5;
        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(numberOfNodes));

        const adjMatrix = builder.build();

        expect(isZeroMatrix(adjMatrix)).toBe(true);
    });

    it('Is set with custom edges', () => {
        const mat: number[][] = [[1, 2], [9, 4]];

        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(mat.length));
        builder.withEdges(numberArrayToEdges(mat));

        const adjMatrix = builder.build();

        expect(adjMatrix.getEdge(0, 0).getScore()).toEqual(1);
        expect(adjMatrix.getEdge(0, 1).getScore()).toEqual(2);
        expect(adjMatrix.getEdge(1, 0).getScore()).toEqual(9);
        expect(adjMatrix.getEdge(1, 1).getScore()).toEqual(4);
    });

    it('Is clonable', () => {
        const mat: number[][] = [[7, 2], [8, 3]];

        const builder = AdjacencyMatrixBuilder.newBuilder();

        builder.withNodes(tokenGenerator(mat.length));
        builder.withEdges(numberArrayToEdges(mat));

        const adjMatrix = builder.build();

        expect(adjMatrix.getEdge(0, 0).getScore()).toEqual(7);
        expect(adjMatrix.getEdge(0, 1).getScore()).toEqual(2);
        expect(adjMatrix.getEdge(1, 0).getScore()).toEqual(8);
        expect(adjMatrix.getEdge(1, 1).getScore()).toEqual(3);
    });

    it('Fails when given invalid edges', () => {
        const builder = AdjacencyMatrixBuilder.newBuilder();

        const edges: Edge[][] = [];

        expect(() => {
            builder.withEdges(edges);
        }).toThrow(Error);
    });

    it('Fails when given out of bounds edges', () => {
        const builder = AdjacencyMatrixBuilder.newBuilder();

        expect(() => {
            builder.withEdgeCoords(
                [
                    {
                        fro: 0,
                        to: 666,
                        edge: newZeroEdge(),
                    },
                ].values(),
            );
        }).toThrow(Error);
    });

    it('Fails when given no initialized nodes', () => {
        const builder = AdjacencyMatrixBuilder.newBuilder();

        const edges: Edge[][] = numberArrayToEdges([[1, 2], [2, 1]]);

        expect(() => {
            builder.withEdges(edges);
        }).toThrow(Error);
    });
});
