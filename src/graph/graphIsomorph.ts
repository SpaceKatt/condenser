import {
    Edge,
} from './';

import {
    Token,
} from '../token';

export interface GraphIsomorph {
    getEdge(fro: number, to: number): Edge;
    setEdge(edge: Edge, fro: number, to: number): Edge;
    getNodes(): IterableIterator<Token>;
    getNode(index: number): Token;
    setNode(node: Token, index: number): Token;
    getNumberNodes(): number;
    swapNodes(first: number, second: number): void;
    clone(): GraphIsomorph;
    equalScore(other: GraphIsomorph): boolean;
}
