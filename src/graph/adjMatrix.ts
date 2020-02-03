import { AdjacencyMatrixBuilder, Edge, EdgeCoordinates, GraphIsomorph } from './';
import {
    isOutsideBounds,
    Token,
} from '../';

export interface  AdjacencyMatrixParams {
    array?: IterableIterator<Token>;
    edges?: IterableIterator<EdgeCoordinates>;
}

export class AdjacencyMatrix implements GraphIsomorph{
    private nodes: Token[];
    private edges: Edge[][];

    private constructor(nodes: IterableIterator<Token>) {
        this.nodes = [];

        for (const node of nodes) {
            this.nodes.push(node.clone());
        }

        this.edges = [];

        for (let i = 0; i < this.nodes.length; i++) {
            this.edges.push([]);

            for (let j = 0; j < this.nodes.length; j++) {
                this.edges[i].push(new Edge(0));
            }
        }

    }

    equalScore(other: GraphIsomorph): boolean {
        if (other.getNumberNodes() !== this.nodes.length) {
            return false;
        }

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes.length; j++) {
                if (this.getEdge(i, j).getScore() !== other.getEdge(i, j).getScore()) {
                    return false;
                }
            }
        }

        return true;
    }

    getEdgeCoordinates(): IterableIterator<EdgeCoordinates> {
        const edgeCoords: EdgeCoordinates[] = [];

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes.length; j++) {
                edgeCoords.push({
                    fro: i,
                    to: j,
                    edge: this.getEdge(i, j),
                });
            }
        }

        return edgeCoords.values();
    }

    getEdge(fro: number, to: number): Edge {
        if (isOutsideBounds(fro, to, 0, this.nodes.length)) {
            throw new Error('Out of bound access in AdjacencyMatrix::getEdge');
        }
        return this.edges[fro][to];
    }

    setEdge(edge: Edge, fro: number, to: number): Edge {
        if (isOutsideBounds(fro, to, 0, this.nodes.length)) {
            throw new Error('Out of bound access in AdjacencyMatrix::setEdge');
        }
        const oldEdge = this.getEdge(fro, to);

        this.edges[fro][to] = edge;

        return oldEdge;
    }

    getNode(index: number): Token {
        if (index < 0 || index >= this.nodes.length) {
            throw new Error('Out of bound access in AdjacencyMatrix::getNode');
        }

        return this.nodes[index];
    }

    getNumberNodes(): number {
        return this.nodes.length;
    }

    getNodes(): IterableIterator<Token> {
        return this.nodes.values();
    }

    setNode(node: Token, index: number): Token {
        if (index < 0 || index >= this.nodes.length) {
            throw new Error('Out of bound access in AdjacencyMatrix::setNode');
        }
        const oldNode = this.getNode(index);

        this.nodes[index] = node;

        return oldNode;
    }

    swapNodes(first: number, second: number): void {
        if (isOutsideBounds(first, second, 0, this.nodes.length)) {
            throw new Error('Out of bound access in AdjacencyMatrix::swapNodes');
        }

        if (first === second) {
            return;
        }

        const firstNode = this.getNode(first);
        const secondNode = this.setNode(firstNode, second);

        this.setNode(secondNode, first);

        this.swapEdges(first, second);
    }

    private swapEdges(indexOne: number, indexTwo: number) {
        const smaller = indexOne < indexTwo ? indexOne : indexTwo;
        const larger = indexOne > indexTwo ? indexOne : indexTwo;

        // swap columns
        for (let i = 0; i < this.nodes.length; i++) {
            const temp = this.edges[i][smaller];
            this.edges[i][smaller] = this.edges[i][larger];
            this.edges[i][larger] = temp;
        }

        // swap rows
        for (let i = 0; i < this.nodes.length; i++) {
            const temp = this.edges[smaller][i];
            this.edges[smaller][i] = this.edges[larger][i];
            this.edges[larger][i] = temp;
        }
    }

    clone(): GraphIsomorph {
        return AdjacencyMatrix.getAdjacencyMatrix({ array: this.getNodes(), edges: this.getEdgeCoordinates() });
    }

    private static fromNodeGenerator(nodes: IterableIterator<Token>): AdjacencyMatrix {
        return new AdjacencyMatrix(nodes);
    }

    static getAdjacencyMatrix(params: AdjacencyMatrixParams): AdjacencyMatrix {
        if (params.array && params.edges) {
            return AdjacencyMatrixBuilder
                .newBuilder()
                .withNodes(params.array)
                .withEdgeCoords(params.edges)
                .build();
        }

        if (params.array) {
            return AdjacencyMatrix.fromNodeGenerator(params.array);
        }

        throw new TypeError('AdjacencyMatrix::getAdjacencyMatrix - Invalid parameters');
    }
}
