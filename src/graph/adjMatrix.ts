import { AdjacencyMatrixBuilder, Edge } from './';
import { Token } from '../';

export interface  AdjacencyMatrixParams {
    adjMatrix?: AdjacencyMatrix;
    array?: IterableIterator<Token>;
}

export class AdjacencyMatrix {
    nodes: Token[];
    edges: Edge[][];

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

    equalScore(other: AdjacencyMatrix): boolean {
        if (other.nodes.length !== this.nodes.length) {
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

    getEdge(fro: number, to: number): Edge {
        if (fro < 0
            || fro >= this.nodes.length
            || to < 0
            || to >= this.nodes.length
        ) {
            throw new Error('Out of bound access in AdjacencyMatrix::getEdge');
        }
        return this.edges[fro][to];
    }

    setEdge(edge: Edge, fro: number, to: number): Edge {
        if (fro < 0
            || fro >= this.nodes.length
            || to < 0
            || to >= this.nodes.length
        ) {
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
        if (first < 0
            || first >= this.nodes.length
            || second < 0
            || second >= this.nodes.length
        ) {
            throw new Error('Out of bound access in AdjacencyMatrix::swapNodes');
        }




        // TODO: Implement this!
    }

    private static fromNodeGenerator(nodes: IterableIterator<Token>): AdjacencyMatrix {
        return new AdjacencyMatrix(nodes);
    }

    static getAdjacencyMatrix(params: AdjacencyMatrixParams): AdjacencyMatrix {
        if (params.adjMatrix) {
            return AdjacencyMatrixBuilder.clone(params.adjMatrix);
        }

        if (params.array) {
            return AdjacencyMatrix.fromNodeGenerator(params.array);
        }

        throw new TypeError('AdjacencyMatrix::getAdjacencyMatrix - Invalid parameters');
    }
}
