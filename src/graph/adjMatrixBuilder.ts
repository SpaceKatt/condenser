import { AdjacencyMatrix, AdjacencyMatrixParams, Edge } from './';
import { Token } from '../';

const newZeroEdge = (): Edge => { return { score: 0 } };

export class AdjacencyMatrixBuilder {
    private nodes: Token[];
    private edges: Edge[][];

    private constructor() {
        this.nodes = [];
        this.edges = [];
    }

    public withNodes(nodes: IterableIterator<Token>): void {
        for (const node of nodes) {
            this.nodes.push(node);
            this.createNewEdges();
        }
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

    public withEdges(edges: Edge[][]): boolean {
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

        return true;
    }

    public build(): AdjacencyMatrix {
        const params: AdjacencyMatrixParams = {
            array: this.nodes.values(),
        };

        const adjMatrix = AdjacencyMatrix.getAdjacencyMatrix(params);

        const length = this.nodes.length;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                adjMatrix.setEdge(this.edges[i][j], i, j)
            }
        }

        return adjMatrix;
    }

    
    static newBuilder(): AdjacencyMatrixBuilder {
        return new AdjacencyMatrixBuilder();
    }

    static clone(adjMatrix: AdjacencyMatrix): AdjacencyMatrix {
        function* cloneNodes(): IterableIterator<Token> {
            for (const node of adjMatrix.getNodes()) {
                yield node.clone();
            }
        }

        const newMatrixBuilder = this.newBuilder();

        newMatrixBuilder.withNodes(cloneNodes());

        return newMatrixBuilder.build();
    }
}
