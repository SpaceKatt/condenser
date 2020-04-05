import { GraphIsomorph, Edge, PathStrategy, ScoreStrategy, Path } from './';

import { Token } from '../token';
import { generateId } from '../utils';

// TODO: GraphBuilder class
export class Graph {
    private id: string;

    private constructor(
        private readonly isomorph: GraphIsomorph,
        private readonly scoreStrategy: ScoreStrategy,
        private readonly pathStrategy: PathStrategy,
    ) {
        this.id = generateId().next().value;
    }

    // To test `score`, mock scoreStrategy. See if the spy has been caught
    score(): void {
        this.scoreStrategy.scoreIsomorph(this.isomorph);
    }

    // TO test `getPaths`, mock isomorph.
    getPaths(): IterableIterator<Path> {
        return this.pathStrategy.findPaths(this.isomorph);
    }

    getNodes(): IterableIterator<Token> {
        return this.isomorph.getNodes();
    }

    getNode(index: number): Token {
        return this.isomorph.getNode(index);
    }

    setNode(node: Token, index: number): Token {
        return this.isomorph.setNode(node, index);
    }

    getEdge(fro: number, to: number): Edge {
        return this.isomorph.getEdge(fro, to);
    }

    setEdge(edge: Edge, fro: number, to: number): Edge {
        const old = this.isomorph.getEdge(fro, to);
        this.isomorph.setEdge(edge, fro, to);

        return old;
    }

    getNumberNodes(): number {
        return this.isomorph.getNumberNodes();
    }

    swapNodes(first: number, second: number): void {
        this.isomorph.swapNodes(first, second);
    }

    clone(): Graph {
        const newGraph = new Graph(
            this.isomorph.clone(),
            this.scoreStrategy,
            this.pathStrategy,
        );

        return newGraph;
    }
}
