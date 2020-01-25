import { AdjacencyMatrix, AdjacencyMatrixParams, Edge, EdgeCoordinates } from '../graph';
import { Token } from '../';

import { v4 as uuid } from 'uuid';

export const newZeroEdge = (): Edge => { return new Edge(0); };

export function* cloneNodes(adjMatrix: AdjacencyMatrix): IterableIterator<Token> {
    for (const node of adjMatrix.getNodes()) {
        yield node.clone();
    }
}

export function* cloneEdges(adjMatrix: AdjacencyMatrix): IterableIterator<EdgeCoordinates> {
    const length = adjMatrix.getNumberNodes();
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            yield {
                fro: i,
                to: j,
                edge: adjMatrix.getEdge(i, j).clone(),
            };
        }
    }
}

export const numberArrayToEdges = (mat: number[][]): Edge[][] => {
    const length =  mat.length;
    const edges: Edge[][] = [];

    for (let i = 0; i < length; i++) {
        edges.push([]);
        for (let j = 0; j < length; j++) {
            edges[i].push(new Edge(mat[i][j]));
        }
    }
    
    return edges;
}

/**
 * boundsCheck
 * Checks if two values are within a lower and (exclusive) upper bound
 * @param fro number The node an edge is coming from
 * @param to number The node an edge is going to
 * @param lower number The inclusive lower bound
 * @param upper number The exclusive upper bound
 *
 * @return true if fro and to are within lower and upper bounds
 */
// TODO: tests
export const isOutsideBounds = (
    fro: number,
    to: number,
    lower: number,
    upper: number
): boolean => {
    return fro < lower || to < lower || fro >= upper || to >= upper;
}

export function* generateId(): IterableIterator<string> {
    while (true) {
        yield uuid();
    }
}
