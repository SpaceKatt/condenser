import { AdjacencyMatrix, AdjacencyMatrixParams, Edge } from './';
import { Token } from '../';

const zeroEdge: Edge = { score: 0 };

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
            this.edges[previousNumEdges][i] = zeroEdge;
        }

        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i][this.edges.length] = zeroEdge;
        }
    }

    public withEdges(edges: Edge[][]): boolean {
        if (!edges || !edges[0] || edges.length !== edges[0].length) {
            return false;
        }

        if (this.edges.length !== edges.length) {
            return false;
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

        return AdjacencyMatrix.getAdjacencyMatrix(params);
    }

    
    static newBuilder(): AdjacencyMatrixBuilder {
        return new AdjacencyMatrixBuilder();
    }

    public static clone(adjMatrix: AdjacencyMatrix): AdjacencyMatrix {
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
