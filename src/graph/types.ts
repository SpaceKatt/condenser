import { Edge } from './';

export interface MatrixPath {
    path: number[];
}

export interface EdgeCoordinates {
    fro: number;
    to: number;
    edge: Edge;
}
