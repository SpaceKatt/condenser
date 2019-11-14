import {
    AdjacencyMatrix,
    Edge,
} from '../../src';

export const isZeroMatrix = (adjMatrix: AdjacencyMatrix): boolean => {
    const length = adjMatrix.getNumberNodes();
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (adjMatrix.getEdge(i, j).score !== 0) {
                return false;
            }
        }
    }

    return true;
}

export const numberArrayToEdges = (mat: number[][]): Edge[][] => {
    const length =  mat.length;
    const edges: Edge[][] = [];

    for (let i = 0; i < length; i++) {
        edges.push([]);
        for (let j = 0; j < length; j++) {
            edges[i].push({ score: mat[i][j] });
        }
    }
    
    return edges;
}
