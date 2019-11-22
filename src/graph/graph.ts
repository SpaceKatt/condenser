import {
    AdjacencyMatrix,
    Edge,
    PathStrategy,
    ScoreStrategy,
    MatrixPath
} from './';

import {
    Token,
} from '../token';
import {
    generateId,
} from '../utils';

export class Graph {
    id: string;

    private constructor(
        readonly adjMatrix: AdjacencyMatrix,
        readonly scoreStrategy: ScoreStrategy,
        readonly pathStrategy: PathStrategy)
    { 
        this.id = generateId().next().value;
    }

    // To test `score`, mock scoreStrategy. See if the spy has been caught
    score(): void {
        this.scoreStrategy.scoreMatrix(this.adjMatrix);
    }

    // TO test `getPaths`, mock adjMatrix.
    getPaths(): IterableIterator<MatrixPath> {
        return this.pathStrategy.findPath(this.adjMatrix);
    }

    getNodes(): IterableIterator<Token> {
        return this.adjMatrix.getNodes();
    }

    getNode(index: number): Token {
        return this.adjMatrix.getNode(index);
    }

    setNode(node: Token, index: number): Token {
        return this.adjMatrix.setNode(node, index);
    }

    getEdge(fro: number, to: number): Edge {
        return this.adjMatrix.getEdge(fro, to);
    }

    setEdge(edge: Edge, fro: number, to: number): void {
        this.adjMatrix.setEdge(edge, fro, to);
    }

    getNumberNodes(): number {
        return this.adjMatrix.getNumberNodes();
    }

    swapNodes(first: number, second: number): void {
        this.adjMatrix.swapNodes(first, second);
    }
}
