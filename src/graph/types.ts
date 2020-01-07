import {
    Edge,
    GraphIsomorph,
} from './';

export interface MatrixPath {
    path: number[];
}

export interface PathStrategy {
    findPath(matrix: GraphIsomorph): IterableIterator<MatrixPath>;
}

export interface ScoreStrategy {
    scoreIsomorph(matrix: GraphIsomorph): GraphIsomorph;
}

export interface EdgeCoordinates {
    fro: number;
    to: number;
    edge: Edge;
}
