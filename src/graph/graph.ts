import { AdjacencyMatrix, MatrixPath } from './';

export interface PathStrategy {
    findPath(matrix: AdjacencyMatrix): IterableIterator<MatrixPath>;
}

export interface ScoreStrategy {
    scoreMatrix(matrix: AdjacencyMatrix): AdjacencyMatrix;
}

export abstract class Graph {
    abstract id: string;
    abstract adjMatrix: AdjacencyMatrix;
    abstract scoreStrategy: ScoreStrategy;
    abstract pathStrategy: PathStrategy;
    // To test `score`, mock scoreStrategy. See if the spy has been caught
    abstract score(): void;
    // TO test `getPaths`, mock adjMatrix.
    abstract getPaths(): IterableIterator<MatrixPath>;
}

//export class TokenGraph implements Graph {
    //private constructor(
        //readonly id: string,
        //readonly scoreStrategy: ScoreStrategy,
        //readonly pathStrategy: PathStrategy,
    //) {
        //adjMatrix = 
    //} 

    //score = () => {

    //}
//}
