export interface Token {
    type: symbol;
}

export interface Node {
    id: string;
    token: Token;
}

export interface Edge {
    score: number;
}

export interface AdjacencyMatrix {
    nodes: Node[];
    edges: Edge[][];
    getEdge(from: number, to: number): Edge;
    setEdge(edge: Edge, from: number, to: number): Edge;
    getNode(index: number): Node;
    setNode(node: Node): Node;
    swapNodes(first: number, second: number): void;
}

//export class AdjacencyMatrixBuilder {
    //nodes:
    //constructor() {}
//}

export interface MatrixPath {
    path: number[];
}

export interface PathStrategy {
    findPath(matrix: AdjacencyMatrix): IterableIterator<MatrixPath>;
}

export interface ScoreStrategy {
    scoreMatrix(matrix: AdjacencyMatrix): AdjacencyMatrix;
}

//export


export interface Graph {
    id: string;
    adjMatrix: AdjacencyMatrix;
    scoreStrategy: ScoreStrategy;
    pathStrategy: PathStrategy;
    // To test `score`, mock scoreStrategy. See if the spy has been caught
    score(): void;
    // TO test `getPaths`, mock adjMatrix.
    getPaths(): IterableIterator<MatrixPath>;
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
