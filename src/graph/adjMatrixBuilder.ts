import { AdjacencyMatrix, Token } from './';

export class AdjacencyMatrixBuilder {
    private nodes: Token[];

    private constructor() {
        this.nodes = [];
    }

    public withNodes(nodes: IterableIterator<Token>): void {
        for (const node of nodes) {
            this.nodes.push(node);
        }
    }

    public build(): AdjacencyMatrix {
        //return {};
    }

    
    public static newBuilder(): AdjacencyMatrixBuilder {
        return new AdjacencyMatrixBuilder();
    }

    public static clone(adjMatrix: AdjacencyMatrix) {
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

