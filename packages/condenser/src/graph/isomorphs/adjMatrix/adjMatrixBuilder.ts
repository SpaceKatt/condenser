import { AdjacencyMatrix, AdjacencyMatrixParams } from './';

import { Edge, EdgeCoordinates } from '../../';
import {
    isOutsideBounds,
    cloneNodes,
    cloneEdges,
    newZeroEdge,
} from '../../../utils';
import { Token } from '../../../token';

export class AdjacencyMatrixBuilder {
    private nodes: Token[];
    private edges: Edge[][];

    private constructor() {
        this.nodes = [];
        this.edges = [];
    }

    public withNodes(nodes: IterableIterator<Token>): AdjacencyMatrixBuilder {
        for (const node of nodes) {
            this.nodes.push(node.clone());
            this.createNewEdges();
        }

        return this;
    }

    private createNewEdges(): void {
        const previousNumEdges = this.edges.length;

        this.edges.push([]);

        for (let i = 0; i < previousNumEdges; i++) {
            this.edges[previousNumEdges][i] = newZeroEdge();
        }

        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i][this.edges.length - 1] = newZeroEdge();
        }
    }

    public withEdge(
        edge: Edge,
        fro: number,
        to: number,
    ): AdjacencyMatrixBuilder {
        if (isOutsideBounds(fro, to, 0, this.nodes.length)) {
            throw new Error('withEdge received out of bounds edge');
        }

        this.edges[fro][to] = edge.clone();

        return this;
    }

    public withEdgeCoords(
        coords: IterableIterator<EdgeCoordinates>,
    ): AdjacencyMatrixBuilder {
        for (const edgeCoord of coords) {
            this.withEdge(edgeCoord.edge, edgeCoord.fro, edgeCoord.to);
        }

        return this;
    }

    public withEdges(edges: Edge[][]): AdjacencyMatrixBuilder {
        if (!edges || !edges[0] || edges.length !== edges[0].length) {
            throw new Error('withEdges received invalid edges');
        }

        if (this.edges.length !== edges.length) {
            throw new Error('withEdges received invalid dimensions');
        }

        for (let i = 0; i < edges.length; i++) {
            for (let j = 0; j < edges.length; j++) {
                this.edges[i][j] = edges[i][j];
            }
        }

        return this;
    }

    public build(): AdjacencyMatrix {
        const params: AdjacencyMatrixParams = {
            array: this.nodes.values(),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(params);

        const length = this.nodes.length;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                adjMatrix.setEdge(this.edges[i][j], i, j);
            }
        }

        return adjMatrix;
    }

    static newBuilder(): AdjacencyMatrixBuilder {
        return new AdjacencyMatrixBuilder();
    }

    static clone(adjMatrix: AdjacencyMatrix): AdjacencyMatrix {
        const matrixBuilder = this.newBuilder();

        matrixBuilder.withNodes(cloneNodes(adjMatrix));
        matrixBuilder.withEdgeCoords(cloneEdges(adjMatrix));

        return matrixBuilder.build();
    }
}
