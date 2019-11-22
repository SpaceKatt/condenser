import {
    AdjacencyMatrix,
    Edge,
} from './';

export interface MatrixPath {
    path: number[];
}

export interface PathStrategy {
    findPath(matrix: AdjacencyMatrix): IterableIterator<MatrixPath>;
}

export interface ScoreStrategy {
    scoreMatrix(matrix: AdjacencyMatrix): AdjacencyMatrix;
}

export interface EdgeCoordinates {
    fro: number;
    to: number;
    edge: Edge;
}
