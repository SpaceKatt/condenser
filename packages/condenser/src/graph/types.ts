import { Edge, GraphIsomorph } from './';

export type Path = number[];

export interface PathStrategy {
    findPaths(matrix: GraphIsomorph): IterableIterator<Path>;
}

export interface ScoreStrategy {
    scoreIsomorph(matrix: GraphIsomorph): GraphIsomorph;
}

export interface EdgeCoordinates {
    fro: number;
    to: number;
    edge: Edge;
}
