import { Edge, Token } from './';

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
            this.nodes.push(node);
        }

        this.edges = [];

        for (let i = 0; i < this.nodes.length; i++) {
            this.edges.push([]);

            for (let j = 0; j < this.nodes.length; j++) {
                this.edges[i].push({
                    score: 0,
                } as Edge);
            }
        }

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

    getNodes(): IterableIterator<Token> {
        return this.nodes.values();
    }

    setNode(index: number, node: Token): Token {
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



    }

    private static fromAdjacencyMatrix(adjMatrix: AdjacencyMatrix): AdjacencyMatrix {
        // TODO: Implement this!
        return new AdjacencyMatrix(adjMatrix.getNodes());
    }

    private static fromNodeGenerator(nodes: IterableIterator<Token>): AdjacencyMatrix {
        return new AdjacencyMatrix(nodes);
    }

    static getAdjacencyMatrix(params: AdjacencyMatrixParams) {
        if (params.adjMatrix) {
            AdjacencyMatrix.fromAdjacencyMatrix(params.adjMatrix);
        }

        if (params.array) {
            AdjacencyMatrix.fromNodeGenerator(params.array);
        }
    }
}
